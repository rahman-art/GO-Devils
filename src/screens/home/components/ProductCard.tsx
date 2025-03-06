import {
  ImageBackground,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {colors, fonts, Icon} from '../../../theme';
// import WishlistIcon from './WishlistIcon';
import {ProductData} from '../../../types/home';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenParamList} from '../../../routes/RouteType';
import {useNavigation} from '@react-navigation/native';
import WishlistIcon from '../../home/components/WishlistIcon';
import WishlistProductDetails from '../../productDetails/WishlistProductDetails';
import {useAppDispatch} from '../../../hooks';
type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const ProductCard = ({item}: {item: ProductData}) => {
  const navigation = useNavigation<NavigationProp>();
  

  return (
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
            'https://go-devil-backend.iqsetters.com' + item?.product_images[0],
        }}
        resizeMode="cover"
        style={styles.image}>
        {item?.product_variants[0]?.discount == 0 ? (
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
      <Text numberOfLines={2} style={[styles.textname, {color: colors.grey}]}>
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
          <Text style={[styles.textprice, {marginLeft: 5, marginRight: 0}]}>
            From
          </Text>
        </View>
        <View style={{width: '65%'}}>
          <Text style={[styles.textprice, {color: colors.red}]}>
            {/* Rs.{' '}{item.product_price} */}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
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
    height: 450,
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
});
