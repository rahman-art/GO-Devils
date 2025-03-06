import React, {useEffect, useRef, useState} from 'react';

import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';

//helpers
import {Title} from '../../components';
import {colors, fonts, Icon} from '../../theme';
import {AuthScreenParamList} from '../../routes/RouteType';
import {useAppDispatch, useAppSelector} from '../../hooks';
import Reviews from '../ratingReview/Reviews';
import {
  ProductDetails,
  SimilarProductDetails,
} from '../../redux/actions/homeAction';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const ProductDetail1 = ({route}: any) => {
  const {item} = route.params;

  const {productDetailsData, categoryLoading} = useAppSelector(
    state => state.home,
  );

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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

  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();



  useEffect(() => {
    dispatch(ProductDetails(item));
    dispatch(SimilarProductDetails(productDetailsData?.subcategory_id));
  }, []);

  useEffect(() => {
    dispatch(SimilarProductDetails(item));
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    //@ts-ignore
    if (productDetailsData?.variant?.images?.length > 0) {
      setSelectedImage(
        //@ts-ignore
        `https://go-devil-backend.iqsetters.com${productDetailsData.variant.images[0]?.product_image}`,
      );
    }
  }, [productDetailsData]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const [selectedVariant, setSelectedVariant] = useState(
    productDetailsData?.variant,
  );

  const handleAddToCart = () => {
    Alert.alert('Please Login', 'You need to login to add items to the cart.', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('LoginType'),
      },
    ]);
  };

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

      <Title hasBackAction={true} />

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
            keyExtractor={item => item.product_image_id.toString()} // Use product_image_id instead of index
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
          Rs. {productDetailsData?.product_name}
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
              marginBottom: 0,
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
          renderItem={({item}) => (
            <Pressable
              style={[
                styles.sizeOption,
                selectedVariant?.variant_id === item?.variant_id && {
                  backgroundColor: colors.red,
                },
              ]}>
              <Text style={styles.sizeText1}>{item?.size}</Text>
            </Pressable>
          )}
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
            onPress={() => handleAddToCart()}
            activeOpacity={0.8}
            style={[
              styles.container,
              {
                backgroundColor: colors.red,
                // borderColor: colors.white,
                // borderWidth: 1,
              },
            ]}>
            <Text style={styles.titles}>ADD TO CART</Text>
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
          <TouchableOpacity
            onPress={() => handleAddToCart()}
            activeOpacity={0.8}
            style={[
              styles.container,
              {
                backgroundColor: colors.white,
                // borderColor: colors.red,
                // borderWidth: 1,
              },
            ]}>
            <Text style={[styles.titles, {color: colors.red}]}>BUY IT NOW</Text>
            <Icon.IonIcon
              name="bag-outline"
              size={20}
              color={colors.red}
              style={{position: 'absolute', marginLeft: '90%'}}
            />
          </TouchableOpacity>
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

        <Reviews item={item} />
      </ScrollView>
    </View>
  );
};

export default ProductDetail1;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
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
});
