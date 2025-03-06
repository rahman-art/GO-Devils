import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

//helpers
import {AuthScreenParamList} from '../../routes/RouteType';
import {Title} from '../../components';
import {colors, fonts} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {OrderList, ReturnOrderList} from '../../redux/actions/cartAction';
import {DataOrder, ReturnResponse} from '../../types/cart';
import {getProfile} from '../../redux/actions/profileAction';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const Tab = createMaterialTopTabNavigator();

const ReturnList = () => {
  const navigation = useNavigation<NavigationProp>();

  const dispatch = useAppDispatch();
  const {returnorderlistData, loading} = useAppSelector(state => state.cart);

  useEffect(() => {
    dispatch(ReturnOrderList(''));
  }, []);
  useEffect(() => {
    // Fetch profile once on mount
    dispatch(getProfile(''));
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(ReturnOrderList(''));
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={'large'} color={colors.red} />
      </View>
    );
  }

  const renderItem = ({item}: {item: ReturnResponse}) => (
    <View style={styles.orderContainer}>
      {item?.products.map((product, index) => (
        <>
          <View
            key={index}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            {product.product_image ? (
              <Image
                source={{
                  uri: `https://go-devil-backend.iqsetters.com${product.product_image}`,
                }}
                style={styles.productImage}
                resizeMode="contain"
              />
            ) : (
              <View style={[styles.productImage, styles.placeholder]}>
                <Text style={styles.placeholderText}>No Image</Text>
              </View>
            )}
            <View style={styles.orderDetails}>
              <Text style={[styles.productName, {color: colors.white}]}>
                {product.product_name || 'Unknown Product'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.price}>
                  Rs. {product.purchase_price || '0.00'}
                </Text>
              </View>
              <Text style={[styles.price, {color: 'whitesmoke'}]}>Reason</Text>
              <Text
                style={{
                  color: colors.red,
                  fontSize: 14,
                  fontFamily: fonts.semibold,
                }}>
                {item.return_reason}
              </Text>
              <Text style={[styles.price, {color: 'whitesmoke'}]}>staus</Text>
              <Text
                style={{
                  color: 'orange',
                  fontSize: 12,
                  fontFamily: fonts.semibold,
                }}>
                {item.return_status}
              </Text>
            </View>
          </View>
        </>
      ))}
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        hidden={false}
        barStyle="light-content"
      />
      <Title
        title="Orders"
        actions={[
          {
            icon: 'home-outline',
            onPress: () => navigation.navigate('BottomNavigator'),
          },
        ]}
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        data={returnorderlistData}
        renderItem={renderItem}
        keyExtractor={index => index.order_id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{color: colors.red}}>No Data</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.drakgrey,
  },
  orderContainer: {
    backgroundColor: colors.drakgrey,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.grey,
    padding: 10,
  },
  productImage: {
    width: 120,
    height: 110,
    margin: 5,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey,
  },
  placeholderText: {
    color: 'white',
    fontSize: 12,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 15,
    backgroundColor: colors.drakgrey,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: colors.green,
    marginVertical: 5,
  },
  status: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 0,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  cancelButton: {
    backgroundColor: colors.blue,
    //padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    margin: 10,
    width: '25%',
    height: 20,
    justifyContent: 'center',
    marginLeft: 20,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 10,
    fontFamily: fonts.bold,
  },
});

export default ReturnList;
