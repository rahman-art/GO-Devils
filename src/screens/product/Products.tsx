import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Animated,
  TextInput,
  Alert,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from 'react-native';
import {colors, fonts, Icon} from '../../theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenParamList} from '../../routes/RouteType';
import {useNavigation} from '@react-navigation/native';

import {Title} from '../../components';
import {ProductList} from '../../redux/actions/homeAction';
import {useAppDispatch, useAppSelector} from '../../hooks';
import api from '../../api';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const Products: React.FC = ({route}: any) => {
  const {item} = route.params;

  const [isTextInputVisible, setTextInputVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const {products, loading, prevPage, nextPage, total} = useAppSelector(
    state => state.home,
  );
  const ITEMS_PER_PAGE = 50;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const [pageStart, setPageStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = Array.isArray(products)
    ? products.filter(item =>
        Object.values(item).some(value =>
          value?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
    : [];
  // console.log(49,products[0].product_variants[0].discount)
  const handleSearchIconPress = () => {
    setTextInputVisible(true);
  };

  const handleWishlist = async (productId: number) => {
    try {
      const response = await api.post('wishlist/', {
        product_id: productId,
      });

      dispatch(
        ProductList({item, page_size: ITEMS_PER_PAGE, page: currentPage}),
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
        ProductList({item, page_size: ITEMS_PER_PAGE, page: currentPage}),
      );
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      Alert.alert(
        'Error',
        'Failed to remove item from wishlist. Please try again.',
      );
    }
  };

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

  useEffect(() => {
    dispatch(ProductList({item, page_size: ITEMS_PER_PAGE, page: currentPage}));
  }, []);

  const cancelSearchIconPress = () => {
    setTextInputVisible(false);
    setSearchQuery('');
  };
  return (
    <View style={styles.container}>
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
              {
                icon: 'home-outline',
                onPress: () => navigation.navigate('BottomNavigator'),
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
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.black,
          }}>
          <ActivityIndicator size={'large'} color="red" />
          <Text style={{color: colors.red}}>Please wait...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.product_id.toString()}
          numColumns={2}
          style={{marginBottom: 30}}
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
                  uri:
                    'https://go-devil-backend.iqsetters.com' +
                    item?.product_images[0],
                }}
                resizeMode="cover"
                style={styles.image}>
                <View
                  style={{
                    backgroundColor: colors.red,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: 45,

                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomLeftRadius: 45,
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      color: colors.white,
                      fontFamily: fonts.bold,
                      width: 30,
                      marginLeft: 20,
                      marginBottom: 5,
                      marginTop: 2,
                    }}>
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
                            name={
                              item?.is_wishlist == true ? 'heart' : 'heart-o'
                            }
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
                Rs. {item?.product_variants[0]?.product_price}
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
                    Rs.{item?.product_variants[0]?.offer_price}
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
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text style={{color: colors.red}}>No Data</Text>
              </View>
            </View>
          }
        />
      )}
      {/* pagination */}
      <View
        style={{
          top: -20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.white,
        }}>
        <Text style={styles.resultsInfo}>
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

        <View style={[styles.pagination, {}]}>
          <TouchableOpacity
            style={[styles.buttonP, currentPage === 1 && styles.disabledButton]}
            disabled={currentPage === 1}
            onPress={handlePrev}>
            <Icon.AntDesign name="left" color={colors.white} />
          </TouchableOpacity>
          <Text style={[styles.pageInfo, {color: colors.red}]}>
            Page {currentPage} of {totalPages}
          </Text>
          <TouchableOpacity
            style={[
              styles.buttonP,
              currentPage === totalPages && styles.disabledButton,
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.bold,
    color: colors.red,
  },
  card: {
    width: '48%',
    marginHorizontal: 5,
    height: 410,
    backgroundColor: colors.primary,
    borderRadius: 0,
    elevation: 2,
    // marginLeft: 5,
    borderColor: colors.white,
    borderWidth: 0.5,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 260,
    marginBottom: 0,
    // resizeMode: 'cover',
  },
  textname: {
    fontSize: 14,
    fontFamily: fonts.medium,
    marginHorizontal: 10,
  },
  textprice: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
    fontFamily: fonts.medium,
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

export default Products;
