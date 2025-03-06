import React, {useEffect} from 'react';
import {Alert, TouchableOpacity, useColorScheme, View} from 'react-native';

//helpers
import api from '../../../api';
import {colors, Icon} from '../../../theme';
import {ProductData} from '../../../types/home';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {RefreshApi, updateSuccess} from '../../../redux/reducers/userSlice';
import {GetWishList} from '../../../redux/actions/userAction';
import {
  AllProductData,
  clotheCategory,
  menProductCollection,
  ProductList,
  WinterProductCollection,
  WomenProductCollection,
} from '../../../redux/actions/homeAction';
import WomenCollection from '../women/WomenCollection';

const WishlistIcon = ({item}: {item: ProductData}) => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const dispatch = useAppDispatch();

  const handleWishlist = async () => {
    api
      .post('wishlist/', {
        product_id: item?.product_id,
      })
      .then(response => {
        dispatch(ProductList(item));
      })

      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Authorization has been denied for this request');
      });
  };

  const handleWishlistRemove = async () => {
    api
      .delete(`wishlist/remove/${item?.product_id}/`)
      .then(response => {
        dispatch(ProductList(item));
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Authorization has been denied for this request');
      });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleWishlistRemove()}>
      {item?.is_wishlist == true ? (
        <View style={{marginHorizontal: 5}}>
          <Icon.FontAwesome
            color={'red'}
            name={item?.is_wishlist == true ? 'heart' : 'heart-o'}
            size={22}
          />
        </View>
      ) : (
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleWishlist()}>
          <View style={{marginHorizontal: 5}}>
            <Icon.FontAwesome
              color={isDarkTheme == true ? 'white' : colors.grey}
              name={item?.is_wishlist == true ? 'heart' : 'heart-o'}
              size={22}
            />
          </View>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default WishlistIcon;
