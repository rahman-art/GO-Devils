import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

//helpers
import {colors, fonts, Icon} from '../../../theme';
import {WishlistData} from '../../../types/user';
import {AuthScreenParamList} from '../../../routes/RouteType';
import api from '../../../api';
import {useAppDispatch} from '../../../hooks';
import {GetWishList} from '../../../redux/actions/userAction';
import {useSnackbar} from '../../../components/Snackbar';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const FavouriteCard = ({item}: {item: WishlistData}) => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const {showSnackbar} = useSnackbar();
  const handleWishlistRemove = async () => {
    try {
      const response = await api.delete(`wishlist/remove/${item?.product_id}/`);

      dispatch(GetWishList(''));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      Alert.alert(
        'Error',
        'Failed to remove item from wishlist. Please try again.',
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        // @ts-ignore
        navigation.navigate('ProductDetails', {
          // @ts-ignore
          item: item?.product_details[0]?.variant_id,
        })
      }>
      <ImageBackground
        source={{
          uri: `https://go-devil-backend.iqsetters.com${item?.image_urls[0]}`,
        }}
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
            {item?.product_details?.discount}% OFF
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
            onPress={() => handleWishlistRemove()}>
            <View style={{marginHorizontal: 5}}>
              <Icon.FontAwesome color={colors.red} name={'heart'} size={22} />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Text
        numberOfLines={2}
        style={[styles.textname, {marginTop: 10, color: colors.white}]}>
        {item.product_name}
      </Text>
      <Text numberOfLines={2} style={[styles.textname, {color: colors.grey}]}>
        {item?.product_description}
      </Text>
      <Text
        style={[
          styles.textprice,
          {textDecorationLine: 'line-through', marginHorizontal: 10},
        ]}>
        Rs. {item?.product_details[0]?.product_price}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '30%'}}>
          <Text style={[styles.textprice, {marginLeft: 5, marginRight: 0}]}>
            From
          </Text>
        </View>
        <View style={{width: '65%'}}>
          <Text style={[styles.textprice, {color: colors.red}]}>
            Rs.{item?.product_details[0]?.product_price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FavouriteCard;

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
    height: 390,
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
    // backgroundColor: 'red',
    marginBottom: 0,
    resizeMode: 'cover',
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
