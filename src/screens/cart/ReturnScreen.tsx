import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// helpers
import {CustomButton, CustomInput, Title} from '../../components';
import {colors, fonts, Icon} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthScreenParamList} from '../../routes/RouteType';
import moment from 'moment';
import {ReturnProduct} from '../../redux/actions/userAction';
import {showMessage} from 'react-native-flash-message';
import {getProfile} from '../../redux/actions/profileAction';
import {ReturnOrderList} from '../../redux/actions/cartAction';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const ReturnScreen = ({route}: any) => {
  const navigation = useNavigation<NavigationProp>();
  const {item} = route.params;

  

  const [searchQuery, setSearchQuery] = useState('');
  const [showList, setShowList] = useState(false);

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      order_id: item?.order_id || '',
      order_item_id: item?.product?.order_item_id || '',
      return_reason: '',
    },
    onSubmit: async values => {
      try {
        const response = await dispatch(ReturnProduct(values)).unwrap();

        if (response?.message) {
          showMessage({
            message: response?.message,
            type: 'success',
          });
        }

        dispatch(ReturnOrderList(''));

        navigation.navigate('ReturnList');
      } catch (error) {
        //@ts-ignore
        const errorMessage = error?.data?.msg || 'Something went wrong';
        showMessage({
          message: errorMessage,
          type: 'danger',
        });
      }
    },
  });

  const preNote = [
    {item_name: 'Wrong Size', item_id: '1'},
    {item_name: 'Damaged Product', item_id: '2'},
    {item_name: 'Incorrect Color', item_id: '3'},
    {item_name: 'Not as Expected', item_id: '4'},
    {item_name: 'Other', item_id: '5'},
  ];

  // Filter the note list based on the search query
  const filteredNotes = preNote.filter(note =>
    note.item_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectNote = (noteName: string) => {
    setSearchQuery(noteName);
    formik.setFieldValue('return_reason', noteName);

    setShowList(false);
  };

  const clearInput = () => {
    setSearchQuery('');
    setShowList(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />

      <Title
        title="Return Order"
        hasBackAction={true}
        actions={[
          {
            icon: 'home-outline',
            onPress: () => navigation.navigate('BottomNavigator'),
          },
        ]}
      />

      <ScrollView>
        <View style={{margin: 10, marginTop: 20}}>
          <View style={styles.orderContainer}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '30%'}}>
                <ImageBackground
                  style={{
                    height: 120,
                    width: 100,
                  }}
                  resizeMode="contain"
                  source={{
                    uri: `https://go-devil-backend.iqsetters.com${item?.product.images}`,
                  }}
                />
              </View>
              <View style={{width: '70%'}}>
                <Text
                  style={[styles.orderId, {color: colors.red, marginRight: 5}]}>
                  Product Variant ID :{' '}
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: 14,
                      color: colors.white,
                    }}>
                    {' '}
                    {item?.product?.product_variant_id}
                  </Text>
                </Text>

                <Text
                  style={[styles.orderId, {color: colors.red, marginRight: 5}]}>
                  Items:
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: 14,
                      color: colors.white,
                    }}>
                    {' '}
                    {item?.product.product_name}
                  </Text>
                </Text>

                <Text
                  style={[styles.orderId, {color: colors.red, marginRight: 5}]}>
                  Total:{' '}
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: 14,
                      color: colors.white,
                    }}>
                    {' '}
                    Rs. {item?.product?.price_at_purchase}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View>
            <CustomInput
              placeholder="Search Reason...."
              value={formik.values.return_reason}
              onChangeText={text => {
                setSearchQuery(text);
                setShowList(true);
                formik.setFieldValue('return_reason', text);
              }}
              onFocus={() => setShowList(true)}
              onBlur={() => {
                setShowList(false);
                formik.handleBlur('return_reason');
              }}
              onPressIn={() => setShowList(true)}
              containerStyle={{marginTop: -20}}
              error={formik.errors.return_reason}
            />

            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearInput} style={styles.clearIcon}>
                <Icon.MaterialIcons name="close" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>

          {showList && (
            <FlatList
              data={searchQuery ? filteredNotes : preNote}
              keyExtractor={item => item.item_id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.noteItem}
                  onPress={() =>
                    handleSelectNote(item.item_name, item.item_id)
                  }>
                  <Text style={styles.noteText}>{item.item_name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </ScrollView>
      <View style={{justifyContent: 'flex-end'}}>
        <CustomButton
          title="Return Your Order"
          style={{marginBottom: 100}}
          onPress={formik.handleSubmit}
          disabled
        />
      </View>
    </View>
  );
};

export default ReturnScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontFamily: fonts.bold,
  },
  dropdown: {
    height: 50,
    borderColor: colors.grey,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  noteItem: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    backgroundColor: colors.grey,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
  },
  noteText: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fonts.medium,
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
    top: 27,
  },
  orderId: {
    fontSize: 16,
    fontFamily: fonts.medium,
    marginTop: 5,
  },
  orderContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: colors.drakgrey,
    width: '100%',
    marginLeft: 0,
    // borderRadius: 8,
    // borderWidth: 0.5,
    // borderColor: colors.grey,
  },
});
