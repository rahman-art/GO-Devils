import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Animated,
  TextInput,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, Text} from 'react-native-paper';


//helpers
import {AuthScreenParamList} from '../../routes/RouteType';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Title} from '../../components';
import {colors, fonts, Icon} from '../../theme';
import styles from '../home/components/styles';
import api from '../../api';

//components
import {AllProductData} from '../../redux/actions/homeAction';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const WinterCollection1: React.FC = ({route}: any) => {
  const {item} = route.params;

  const dispatch = useAppDispatch();
  const [isTextInputVisible, setTextInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const ITEMS_PER_PAGE = 50;
  const {allproducts, categoryLoading, total, nextPage, prevPage, dataloading} =
    useAppSelector(state => state.home);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const [pageStart, setPageStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = allproducts?.filter(item =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  const handleWishlist = async (productId: number) => {
    try {
      const response = await api.post('wishlist/', {
        product_id: productId,
      });

      dispatch(
        AllProductData({
          item,
          page_size: ITEMS_PER_PAGE,
          page: currentPage,
          searchQuery,
        }),
      );
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      Alert.alert('Error', 'Failed to add to wishlist. Please try again.');
    }
  };

  const handleWishlistRemove = async (productId: number) => {
    try {
      const response = await api.delete(`wishlist/remove/${productId}/`);

      dispatch(
        AllProductData({
          item,
          page_size: ITEMS_PER_PAGE,
          page: currentPage,
          searchQuery,
        }),
      );
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      Alert.alert(
        'Error',
        'Failed to remove item from wishlist. Please try again.',
      );
    }
  };

  const handleSearchIconPress = () => {
    setTextInputVisible(true);
  };

  const cancelSearchIconPress = () => {
    setTextInputVisible(false);
    setSearchQuery('');
  };

  useEffect(() => {
    dispatch(
      AllProductData({
        item,
        page_size: ITEMS_PER_PAGE,
        page: currentPage,
        searchQuery,
      }),
    );
  }, [currentPage, item, dispatch, searchQuery]);

  const getStartIndex = () => pageStart + 1;
  const getEndIndex = () => Math.min(total, pageStart + ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setPageStart(pageStart + ITEMS_PER_PAGE);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setPageStart(pageStart - ITEMS_PER_PAGE);
      setCurrentPage(currentPage - 1);
    }
  };

  if (dataloading && currentPage === 1) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.black,
        }}>
        <ActivityIndicator size={'large'} color="red" />
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      {/* <Title title={'Products'} hasBackAction={true} /> */}
      {!isTextInputVisible ? (
        <View style={{}}>
          <Title
            title={'Products'}
            hasBackAction={true}
            actions={[
              {
                icon: 'magnify',
                onPress: () => handleSearchIconPress(),
              },
            ]}
          />
        </View>
      ) : (
        <Animated.View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'center',
            marginTop: 50,
            backgroundColor: colors.primary,
          }}>
          <Icon.Feather
            onPress={handleSearchIconPress}
            name="search"
            size={15}
            style={{position: 'absolute', left: 20, top: 20}}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.primary,
              borderWidth: 0.5,
              borderRadius: 0,
              borderColor: colors.red,
              flex: 0.9,
            }}>
            <Icon.Feather
              name="search"
              size={18}
              color={colors.red}
              style={{marginLeft: 10}}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor={colors.red}
              style={{
                padding: 10,
                flex: 1,
                color: colors.red,
              }}
              onChangeText={text => setSearchQuery(text)}
            />
          </View>
          <Text onPress={cancelSearchIconPress} style={{color: colors.red}}>
            Cancel
          </Text>
        </Animated.View>
      )}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.product_id.toString()}
        numColumns={2}
        contentContainerStyle={{marginHorizontal: 5}}
        renderItem={({item}) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              // @ts-ignore
              navigation.navigate('ProductDetails', {
                item: item?.product_variants[0]?.variant_id,
              })
            }>
            <ImageBackground
              source={{
                uri: item?.product_images?.[0],
              }}
              style={styles.image}>
              <View style={styles.discountCard}>
                <Text style={styles.discountText}>
                  {item?.product_variants[0]?.discount}% OFF
                </Text>
              </View>

              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  margin: 5,
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleWishlistRemove(item?.product_id)}>
                  {item?.is_wishlist == true ? (
                    <View style={{marginHorizontal: 5}}>
                      <Icon.FontAwesome
                        color={'red'}
                        name={item?.is_wishlist == true ? 'heart' : 'heart-o'}
                        size={22}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handleWishlist(item?.product_id)}>
                      <View style={{marginHorizontal: 5}}>
                        <Icon.FontAwesome
                          color={colors.grey}
                          // @ts-ignore
                          name={item?.is_wishlist == true ? 'heart' : 'heart-o'}
                          size={22}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              </View>
            </ImageBackground>
            <Text
              numberOfLines={2}
              style={[styles.textname, {marginTop: 10, color: colors.white}]}>
              {item.product_name}
            </Text>
            <Text
              numberOfLines={2}
              style={[styles.textname, {color: colors.grey}]}>
              {item.product_description}
            </Text>

            <Text
              style={[
                styles.textprice,
                {textDecorationLine: 'line-through', marginHorizontal: 10},
              ]}>
              Rs.{item?.product_variants[0]?.product_price}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '30%'}}>
                <Text
                  style={[styles.textprice, {marginLeft: 5, marginRight: 0}]}>
                  From
                </Text>
              </View>
              <View style={{width: '65%'}}>
                <Text style={[styles.textprice, {color: colors.red}]}>
                  Rs.{item?.product_variants[0]?.product_price}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '90%',
            }}>
            {dataloading ? (
              <ActivityIndicator color={colors.red} size={'large'} />
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text style={{color: colors.red}}>No Data</Text>
              </View>
            )}
          </View>
        }
      />
      {/* pagination */}
      <View
        style={{
          top: -30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.white,
        }}>
        <Text style={Styles.resultsInfo}>
          Showing{' '}
          <Text style={{color: colors.red, fontFamily: fonts.semibold}}>
            {getStartIndex()}
          </Text>{' '}
          to{' '}
          <Text style={{color: colors.red, fontFamily: fonts.semibold}}>
            {getEndIndex()}
          </Text>{' '}
          of{' '}
          <Text style={{color: colors.red, fontFamily: fonts.semibold}}>
            {total}
          </Text>{' '}
          Results
        </Text>

        <View style={[Styles.pagination, {}]}>
          <TouchableOpacity
            style={[Styles.buttonP, currentPage === 1 && Styles.disabledButton]}
            disabled={currentPage === 1}
            onPress={handlePrev}>
            <Icon.AntDesign name="left" color={colors.white} />
          </TouchableOpacity>
          <Text style={[Styles.pageInfo, {color: colors.red}]}>
            Page {currentPage} of {totalPages}
          </Text>
          <TouchableOpacity
            style={[
              Styles.buttonP,
              currentPage === totalPages && Styles.disabledButton,
            ]}
            disabled={currentPage === totalPages}
            onPress={handleNext}>
            <Icon.AntDesign name="right" color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonP: {
    backgroundColor: colors.red,
    padding: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    margin: 5,
  },
  disabledButton: {
    backgroundColor: colors.grey,
  },
  buttonTextP: {
    color: colors.red,
    fontFamily: fonts.semibold,
    fontSize: 12,
  },
  pageInfo: {
    fontSize: 12,
    fontFamily: fonts.semibold,
  },
  resultsInfo: {
    fontSize: 12,
    color: colors.grey,
    margin: 10,
  },
});

export default WinterCollection1;
