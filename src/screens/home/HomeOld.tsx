import React, {useCallback, useEffect, useState} from 'react';
import {VisibilitySensor} from '@futurejj/react-native-visibility-sensor';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
  LogBox,
  Image,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import Video from 'react-native-video';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-banner-carousel';

//@ts-ignore
import _ from 'lodash';

const BannerWidth = Dimensions.get('window').width;

//helpers
import {appstyles, colors, fonts, Icon} from '../../theme';
import {AuthScreenParamList} from '../../routes/RouteType';
import {
  clotheCategory,
  FetchBanner,
  FetchvideoBanner,
} from '../../redux/actions/homeAction';
import {useAppDispatch, useAppSelector} from '../../hooks';
import CategoryCard from '../category/compoents/CategoryCard';
import WinterCard from './components/WinterCard';
import OfferBanner from '../offerBanner/OfferBanner';
import api from '../../api';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const bannerData = [
  require('../../assets/images/fashion1.jpeg'),
  require('../../assets/images/fashion1.jpeg'),
  require('../../assets/images/fashion1.jpeg'),
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const {
    cloth,
    banner,
    videoBanner,

    categoryLoading,
  } = useAppSelector(state => state.home);
  const {userToken} = useAppSelector(state => state.auth);

  const [allProductsObject, setAllProductsObject] = useState({});
  const [categoriesVisble, setCategoriesVisible] = useState({});

  const dispatch = useAppDispatch();

  const renderBannerItem1 = ({item}: any) => (
    <Image source={item} style={styles.bannerImage1} resizeMode="cover" />
  );

  useEffect(() => {
    dispatch(clotheCategory(''));
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const getProductsObject = async (cloth: any, searchQuery: string) => {
    const getProductsListByCatID = async (
      category_id: number,
      searchQuery: string,
    ) => {
      try {
        const response = await api.get(
          `products/collection/${category_id}/?search=${searchQuery}`,
        );
        return response.data;
      } catch (err) {
        console.error(
          `Error fetching products list for ID: ${category_id}`,
          err,
        );
        return null;
      }
    };

    // Helper function to add delay
    const delay = (ms: number) =>
      new Promise(resolve => setTimeout(resolve, ms));

    try {
      const productsObject: any = {}; // Initialize empty object to store the result

      for (const c of cloth) {
        const result = await getProductsListByCatID(c.category_id, searchQuery);
        productsObject[c.category_id] = result; // Assign the fetched data to the corresponding category

        // Delay of 1 second (1000ms) before fetching the next category
        await delay(1000); // Adjust the timeout as needed
      }

      setAllProductsObject(productsObject); // Update state with the results
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      // You can add any cleanup code here if needed
    }
  };

  const handleWishlist = async (productId: number) => {
    try {
      const response = await api.post('wishlist/', {
        product_id: productId,
      });

      getProductsObject(cloth, searchQuery);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      Alert.alert('Error', 'Failed to add to wishlist. Please try again.');
    }
  };

  const handleWishlistRemove = async (productId: number) => {
    try {
      const response = await api.delete(`wishlist/remove/${productId}/`);

      getProductsObject(cloth, searchQuery);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      Alert.alert(
        'Error',
        'Failed to remove item from wishlist. Please try again.',
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (searchQuery !== '') {
        getProductsObject(cloth, searchQuery);
      } else {
        getProductsObject(cloth, '');
      }
      // dispatch(FetchvideoBanner(''));
      // dispatch(FetchBanner(''));
    }, [cloth, dispatch, searchQuery]),
  );

  const handleIntersection = (category_id: number, isVisible: boolean) => {
    if (isVisible)
      setCategoriesVisible({
        ...categoriesVisble,
        [category_id]: true,
      });
  };

  useEffect(() => {
    const categoriesVisbleObj = {};
    cloth.forEach((c: any) => {
      categoriesVisbleObj[Number(c.category_id)] = false;
    });
    setCategoriesVisible(categoriesVisbleObj);
  }, [allProductsObject]);

  // console.log(categoriesVisble);
  // console.log(
  //   Object.keys(allProductsObject)?.map(category =>
  //     allProductsObject[category]?.results.map(item => item.product_images[0]),
  //   ),
  // );

  if (categoryLoading) {
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
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <StatusBar
        backgroundColor="black"
        translucent={true}
        hidden={false}
        barStyle="dark-content"
      />

      <ScrollView
        style={{marginBottom: 0}}
        showsVerticalScrollIndicator={false}>
        {/* {!searchQuery && (
          //@ts-ignore
          <Carousel
            autoplay
            autoplayTimeout={4000}
            //showsPageIndicator={false}
            loop
            index={0}
            pageSize={BannerWidth}>
            {banner.map((item, index) => (
              <ImageBackground
                key={item?.banner_id?.toString()}
                source={{
                  uri:
                    'https://go-devil-backend.iqsetters.com' +
                    item?.banner_img_url,
                }}
                resizeMode="cover"
                style={styles.imageBackground}></ImageBackground>
            ))}
          </Carousel>
        )} */}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,.5)',
            padding: 10,
          }}>
          <Searchbar
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{
              borderWidth: 1,
              borderColor: colors.red,
              borderRadius: 0,
              backgroundColor: 'transparent',
              fontSize: 12,
              height: 50,
              marginTop: 50,
              width: '95%',
            }}
            inputStyle={{color: colors.red}}
            placeholder="Search.."
            placeholderTextColor={colors.red}
            iconColor={'red'}
          />
        </View>

        {!searchQuery && (
          <>
            <View style={{margin: 10, alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/logo48.png')}
                style={{alignSelf: 'center', marginTop: 0}}
              />

              <Text
                style={{
                  color: 'whitesmoke',
                  fontFamily: fonts.semibold,
                  fontSize: 12,
                  textAlign: 'center',
                }}>
                Clothing with an attitude
              </Text>
            </View>
            {videoBanner.map((item, index) => (
              <Video
                key={index}
                source={{
                  uri: item.video,
                }}
                // @ts-ignore
                id={item.video_banner_id}
                style={styles.video}
                resizeMode="cover"
                repeat={true}
                muted={true}
                controls={false}
                paused={false}
                allowsExternalPlayback={false}
                ignoreSilentSwitch="ignore"
              />
            ))}
            <View style={{margin: 16}}>
              <View style={{...appstyles.rowBetween, marginTop: 10}}>
                <Text style={styles.header}>DEVIL’S Collections</Text>
                <Pressable
                  onPress={() => navigation.navigate('Category')}
                  style={{padding: 5, backgroundColor: colors.red}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.white,
                      fontFamily: fonts.medium,
                    }}>
                    See all
                  </Text>
                </Pressable>
              </View>
            </View>

            <FlatList
              showsHorizontalScrollIndicator={false}
              data={cloth}
              renderItem={({item}) => <CategoryCard item={item} />}
              keyExtractor={(index, item) => item.toString()}
              horizontal
              onEndReachedThreshold={0.5}
            />
            <View style={{margin: 16}}>
              <View style={{...appstyles.rowBetween, marginTop: 10}}>
                <Text style={styles.header}>Offer</Text>
                <Pressable
                  onPress={() => navigation.navigate('AllOfferBanner')}
                  style={{padding: 5, backgroundColor: colors.red}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.white,
                      fontFamily: fonts.medium,
                    }}>
                    See all
                  </Text>
                </Pressable>
              </View>
            </View>

            <OfferBanner />
          </>
        )}

        {Object.keys(allProductsObject)?.map((category: any) => (
          <VisibilitySensor
            onChange={isVisible => handleIntersection(category, isVisible)}
            threshold={{
              left: 100,
              right: 100,
            }}>
            <View>
              <View style={{margin: 16}}>
                {!searchQuery && (
                  <View style={{...appstyles.rowBetween, marginTop: 10}}>
                    <Text style={styles.header}>
                      {
                        cloth.find(c => c.category_id == category)
                          ?.category_name
                      }
                    </Text>
                    <Pressable
                      onPress={() =>
                        // @ts-ignore
                        navigation.navigate('WinterCollection', {
                          item: category,
                        })
                      }
                      style={{padding: 5, backgroundColor: colors.red}}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: colors.white,
                          fontFamily: fonts.medium,
                        }}>
                        See all
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
              {/* @ts-ignore */}
              {allProductsObject[category]?.results.length > 0 ? (
                <FlatList
                  //@ts-ignore
                  data={allProductsObject[category]?.results.slice(0, 4)}
                  keyExtractor={item => item.product_id.toString()}
                  numColumns={2}
                  onEndReachedThreshold={0.5} // Load more when 50% of the list is visible
                  onEndReached={() => {
                    // Lazy load more items (implement your own pagination logic)
                  }}
                  // @ts-ignore
                  initialNumToRender={true}
                  removeClippedSubviews={true}
                  style={{marginTop: searchQuery ? 100 : 0}}
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
                        src={
                          categoriesVisble[String(category)]
                            ? item?.product_images?.[0]
                            : 'demostring'
                        }
                        source={{
                          uri: categoriesVisble[String(category)]
                            ? item?.product_images?.[0]
                            : 'demostring',
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
                            onPress={() =>
                              handleWishlistRemove(item?.product_id)
                            }>
                            {item?.is_wishlist == true ? (
                              <View style={{marginHorizontal: 5}}>
                                <Icon.FontAwesome
                                  color={'red'}
                                  name={
                                    item?.is_wishlist == true
                                      ? 'heart'
                                      : 'heart-o'
                                  }
                                  size={22}
                                />
                              </View>
                            ) : (
                              <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                  handleWishlist(item?.product_id)
                                }>
                                <View style={{marginHorizontal: 5}}>
                                  <Icon.FontAwesome
                                    color={colors.grey}
                                    name={
                                      item?.is_wishlist == true
                                        ? 'heart'
                                        : 'heart-o'
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
                        style={[
                          styles.textname,
                          {marginTop: 10, color: colors.white},
                        ]}>
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
                          {
                            textDecorationLine: 'line-through',
                            marginHorizontal: 10,
                          },
                        ]}>
                        Rs.{item?.product_variants[0]?.product_price}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{width: '30%'}}>
                          <Text
                            style={[
                              styles.textprice,
                              {marginLeft: 5, marginRight: 0},
                            ]}>
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
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <Text
                  style={{
                    color: colors.red,
                    textAlign: 'center',
                    marginTop: searchQuery ? 100 : 10,
                  }}>
                  No products found.
                </Text>
              )}
            </View>
          </VisibilitySensor>
        ))}

        {!searchQuery && (
          <>
            <View style={{margin: 16}}>
              <View style={{...appstyles.rowBetween, marginTop: 10}}>
                <Text style={styles.header}>#GODEVIL ON INSTAGRAM</Text>
                <Pressable
                  onPress={() => navigation.navigate('AllOfferBanner')}
                  style={{padding: 5, backgroundColor: colors.red}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.white,
                      fontFamily: fonts.medium,
                    }}>
                    See all
                  </Text>
                </Pressable>
              </View>
            </View>
            <FlatList
              data={bannerData}
              renderItem={renderBannerItem1}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 16, marginTop: 10}}
            />
          </>
        )}
      </ScrollView>

      {/* </View> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 12,
    color: colors.red,
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  itemImage: {},
  itemText: {
    marginTop: 8,
    fontSize: 12,
    color: colors.red,
    fontFamily: fonts.medium,
  },
  video: {
    height: 700,
    width: '100%',
    flex: 1,
  },
  bannerImage: {
    width: 320,
    height: 150,

    marginRight: 16,
  },

  bannerImage1: {
    width: 290,
    height: 350,
    marginBottom: 110,
    marginRight: 16,
  },
  bannerGradientContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  swiper: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 790,
  },
  imageBackground: {
    width: '100%',
    height: 750,
    justifyContent: 'space-between',
  },

  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
  },
  searchInput: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#fff',
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
    height: 270,
    // backgroundColor: 'red',
    marginBottom: 0,
    resizeMode: 'contain',
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
  discountCard: {
    backgroundColor: colors.red,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 45,
  },
  discountText: {
    fontSize: 10,
    color: colors.white,
    fontFamily: fonts.bold,
    width: 30,
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 2,
  },
});
