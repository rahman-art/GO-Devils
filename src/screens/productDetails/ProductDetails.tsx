import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, List} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
//helpers
import {CustomButton, Title} from '../../components';
import {colors, fonts, Icon} from '../../theme';
import {AuthScreenParamList} from '../../routes/RouteType';
import {useAppDispatch, useAppSelector} from '../../hooks';
import Reviews from '../ratingReview/Reviews';
import {AddCart, GetCartList} from '../../redux/actions/cartAction';
import {
  ProductDetails,
  SimilarProductDetails,
} from '../../redux/actions/homeAction';
import api from '../../api';
import {useSnackbar} from '../../components/Snackbar';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const ProductDetail = ({route}: any) => {
  const {item} = route.params;
  const {showSnackbar} = useSnackbar();

  const {productDetailsData, similar} = useAppSelector(state => state.home);

  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const [productLoding, setProductLoding] = useState<boolean>(false);
  const {cartData} = useAppSelector(state => state.cart);

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Update selectedVariant when productDetailsData changes
  useEffect(() => {
    if (productDetailsData?.variant) {
      setSelectedVariant(productDetailsData.variant);
    }
  }, [productDetailsData]);

  useEffect(() => {
    if (selectedVariant?.images?.length > 0) {
      setSelectedImage(
        `https://go-devil-backend.iqsetters.com${selectedVariant.images[0]?.product_image}`,
      );
    }
  }, [selectedVariant]);
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        (currentIndex + 1) % productDetailsData?.variant?.images.length;
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, productDetailsData?.variant?.images.length]);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    setProductLoding(true);

    const fetchData = async () => {
      try {
        await dispatch(ProductDetails(item));
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setProductLoding(false);
      }
    };
    dispatch(GetCartList(''));
    fetchData();
  }, [item]);

  useEffect(() => {
    if (productDetailsData?.subcategory_id) {
      dispatch(SimilarProductDetails(productDetailsData.subcategory_id));
    }
  }, [productDetailsData?.subcategory_id]);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    //@ts-ignore
    if (productDetailsData?.variant?.images?.length > 0) {
      setSelectedImage(
        //@ts-ignore
        `https://go-devil-backend.iqsetters.com${productDetailsData.variant.images[0]?.product_image}`,
      );
    }
  }, [productDetailsData, selectedVariant]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const AddProduct = async () => {
    try {
      if (
        cartData.some(
          cartItem => cartItem.variant_id === selectedVariant?.variant_id,
        )
      ) {
        navigation.navigate('Cart');
        return;
      }

      const response = await dispatch(
        AddCart({variant_id: selectedVariant?.variant_id}),
      ).unwrap();

      if (response.message) {
        showSnackbar(response.message, {
          backgroundColor: '#4CAF50',
        });
        dispatch(GetCartList(''));
      }
    } catch (error) {
      const errorMessage = error?.message || 'Something went wrong';
      showSnackbar(errorMessage, {
        backgroundColor: '#F44336',
      });
    }
  };

  // const AddProduct = async () => {
  //   try {
  //     const response = await dispatch(
  //       AddCart({variant_id: selectedVariant?.variant_id}),
  //     ).unwrap();
  //     if (response.message) {
  //       showSnackbar(response.message, {
  //         backgroundColor: '#4CAF50',
  //       });

  //       dispatch(GetCartList(''));
  //     }
  //   } catch (error) {
  //     //@ts-ignore
  //     const errorMessage = error?.message;
  //     showSnackbar(errorMessage, {
  //       backgroundColor: '#F44336', // Red for error
  //     });
  //   }
  // };

  const UpdateSize = async (varientId: number) => {
    setProductLoding(false);
    try {
      const response = await api.get(
        `products/details/${productDetailsData?.variant?.variant_id}/`,
        {
          params: {variant_id: varientId},
        },
      );
      if (response?.data) {
        setProductLoding(false);
        dispatch(GetCartList(''));
        // dispatch(ProductDetails(item));
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'Something went wrong';
    } finally {
    }
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
        hasBackAction={true}
        actions={[
          {
            icon: 'cart-outline',
            // @ts-ignore
            onPress: () => navigation.navigate('Cart'),
            badgeCount: cartData?.length,
          },
        ]}
      />
      {productLoding ? (
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          style={{marginBottom: 20}}
          scrollEventThrottle={16}>
          <View>
            <FlatList
              ref={flatListRef}
              data={productDetailsData?.variant.images}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.product_image_id.toString()}
              renderItem={({item, index}) => (
                <FastImage
                  source={{
                    uri: `https://go-devil-backend.iqsetters.com${item.product_image}`,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode="cover"
                  style={{
                    width,
                    height: height / 1.5,

                    justifyContent: 'space-between',
                  }}
                />
              )}
              onMomentumScrollEnd={handleScrollEnd}
            />

            <View style={styles.paginationContainer}>
              {productDetailsData?.variant.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    {backgroundColor: currentIndex === index ? '#fff' : '#888'},
                  ]}
                />
              ))}
            </View>
          </View>
          <Text
            style={[
              styles.tittle,
              {fontSize: 22, marginTop: 10, marginBottom: 0},
            ]}>
            {productDetailsData?.product_name}
          </Text>
          {/* <Text style={[styles.tittle, {fontSize: 12}]}>Originals</Text> */}
          <Text
            style={[
              styles.tittle,
              {
                fontSize: 14,
                marginTop: 10,
                marginBottom: 0,
                textDecorationLine: 'underline line-through',
                color: colors.grey,
              },
            ]}>
            Rs. {productDetailsData?.variant?.product_price}
          </Text>

          <Text style={[styles.tittle, {marginTop: 10}]}>
            {productDetailsData?.variant?.discount}% OFF
          </Text>

          <Text
            style={[
              styles.tittle,
              {
                fontSize: 14,
                marginTop: 10,
                color: colors.red,
                fontFamily: fonts.bold,
              },
            ]}>
            Rs. {productDetailsData?.variant?.offer_price}
          </Text>

          <Divider style={{backgroundColor: colors.white, marginTop: 20}} />

          <Text style={styles.saveText}>
            SIZE:{' '}
            <Text style={{color: colors.red}}>
              {selectedVariant?.size} {/* Display updated size */}
            </Text>
          </Text>
          <FlatList
            data={productDetailsData?.product_variants}
            horizontal
            keyExtractor={item => item?.variant_id?.toString()}
            renderItem={({item}) => {
              const isOutOfStock = item.available_in_stock === 0;

              return (
                <Pressable
                  style={[
                    styles.sizeOption,
                    selectedVariant?.variant_id === item?.variant_id && {
                      backgroundColor: colors.red,
                    },
                  ]}
                  onPress={() => {
                    if (!isOutOfStock) {
                      setSelectedVariant(item);
                      UpdateSize(item?.variant_id);
                    }
                  }}
                  disabled={isOutOfStock} // Disable press if out of stock
                >
                  {/* Size Text */}
                  <Text
                    style={[styles.sizeText1, isOutOfStock && {color: 'gray'}]}>
                    {item?.size}
                  </Text>

                  {/* Single Cross Line for Out-of-Stock Items */}
                  {isOutOfStock && <View style={styles.crossLine} />}
                </Pressable>
              );
            }}
          />

          <Divider style={{backgroundColor: colors.white, marginTop: 15}} />
          <List.Section style={{backgroundColor: colors.primary}}>
            <List.Accordion
              style={{backgroundColor: colors.primary}}
              title="Material"
              titleStyle={{color: colors.white}}>
              <List.Item
                title={productDetailsData?.product_material}
                titleStyle={{color: colors.white}}
              />
            </List.Accordion>
            <Divider style={{backgroundColor: colors.white, marginTop: 0}} />

            <List.Accordion
              style={{backgroundColor: colors.primary}}
              title="Care Instructions"
              titleStyle={{color: colors.white}}>
              <List.Item
                title={productDetailsData?.care_instructions}
                titleStyle={{color: colors.white}}
              />
            </List.Accordion>
          </List.Section>

          <Divider style={{backgroundColor: colors.white, marginTop: 0}} />

          <View
            style={{
              marginTop: 20,
              width: '95%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={AddProduct}
              activeOpacity={0.8}
              style={[
                styles.container,
                {
                  backgroundColor: cartData.some(
                    cartItem =>
                      cartItem.variant_id === selectedVariant?.variant_id,
                  )
                    ? colors.red
                    : colors.red,
                },
              ]}>
              <Text style={styles.titles}>
                {cartData.some(
                  cartItem =>
                    cartItem.variant_id === selectedVariant?.variant_id,
                )
                  ? 'GO TO CART'
                  : 'ADD TO CART'}
              </Text>
              <Icon.IonIcon
                name="bag-outline"
                size={20}
                color={colors.white}
                style={{position: 'absolute', marginLeft: '90%'}}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 20,
              width: '95%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            {!cartData.some(
              cartItem => cartItem.variant_id === selectedVariant?.variant_id,
            ) && (
              <TouchableOpacity
                onPress={() => {
                  AddProduct();
                  navigation.navigate('Cart');
                }}
                activeOpacity={0.8}
                style={[
                  styles.container,
                  {
                    backgroundColor: colors.white,
                  },
                ]}>
                <Text style={[styles.titles, {color: colors.red}]}>
                  BUY IT NOW
                </Text>
                <Icon.IonIcon
                  name="bag-outline"
                  size={20}
                  color={colors.red}
                  style={{position: 'absolute', marginLeft: '90%'}}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                marginLeft: 20,
                borderColor: colors.white,
                borderWidth: 0.5,
                width: 55,
                marginTop: 10,
                height: 30,
                borderRadius: 5,
              }}>
              <Text style={[styles.cashText, {fontSize: 8, marginTop: 5}]}>
                CASH ON DELIVERY
              </Text>
            </View>
            <Icon.IonIcon
              name="card-outline"
              size={35}
              color={colors.white}
              style={{marginLeft: '3%', marginTop: 8}}
            />
          </View>

          <Text style={[styles.tittle, {fontSize: 14, marginTop: 10}]}>
            {productDetailsData?.product_description}
          </Text>

          <ScrollView
            style={{marginBottom: 20, gap: 10, margin: 10}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {similar?.map(item => (
              <Pressable
                key={item?.product_id.toString()}
                style={styles.card1}
                onPress={() => {
                  const variantId = item?.product_variants[0]?.variant_id;
                  dispatch(ProductDetails(variantId));
                  navigation.navigate('ProductDetails', {
                    item: variantId,
                  });
                }}>
                <FastImage
                  source={{
                    uri: `https://go-devil-backend.iqsetters.com${item.product_images[0]}`,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode="cover"
                  style={styles.image}
                />
                {item?.product_variants[0]?.discount === 0 ? (
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
                ) : null}

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
                  {item?.product_description}
                </Text>

                <Text
                  style={[
                    styles.textprice,
                    {marginHorizontal: 10, color: colors.red},
                  ]}>
                  Rs. {item?.product_variants[0]?.product_price}
                </Text>

                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '30%'}}></View>
                  <View style={{width: '65%'}}>
                    <Text
                      style={[styles.textprice, {color: colors.red}]}></Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Reviews item={item} />
        </ScrollView>
      )}
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titles: {
    margin: 10,
    color: colors.white,
    fontFamily: fonts.bold,
    marginLeft: 20,
  },

  sizeText1: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: colors.white,
    marginHorizontal: 10,
  },
  tittle: {
    fontFamily: fonts.medium,
    color: colors.white,
    marginLeft: 10,
    marginRight: 10,
  },
  cashText: {
    fontFamily: fonts.medium,
    color: colors.white,
    marginLeft: 5,
    marginRight: 5,
  },
  saveText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 14,
    marginTop: 10,
    marginLeft: 10,
  },
  card: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  sizeOption: {
    // padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: colors.primary,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  card1: {
    width: 170,
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
  header: {
    fontSize: 12,
    color: colors.red,
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  crossLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: 'gray',
    top: '50%',
    transform: [{rotate: '20deg'}],
  },
});
