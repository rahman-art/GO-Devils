import React, {useState, useEffect} from 'react';
import {View, ScrollView, useColorScheme, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {setRefresh} from './../../redux/refreshSlice'
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector } from '../../hooks';
import { colors } from '../../theme';
const WishlistProductDetails = ({}) => {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isFavourite, setFavourite] = useState(false);
  const [wishlistId, setWishlistId] = useState(0);
  const dispatch = useDispatch();
  const refresh = useAppSelector(state => state.refresh.refresh);
  const productDetailsId = useAppSelector(state => state.refresh.productDetailsId);

  const handleWishlist = async () => {
    const token = await AsyncStorage.getItem('token');
    const postData = {
      product_id: productDetailsId,
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    setLoading(true);
    axios
      .post(`https://go-devil-backend.iqsetters.com/wishlists/`, postData, {headers})
      .then(response => {
        if (response.data?.msg == 'product successfully added on wishlist') {
          setLoading(false);
          dispatch(setRefresh(true));
        } else if (
          response.data?.msg == 'this product is already exist in wishlist'
        ) {
          setLoading(false);
          Alert.alert(response.data?.msg);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
        // navigation.navigate('Login');
        // showError('Authorization has been denied for this request');
      });
  };
  const handleWishlistRemove = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    api
      .delete(
        `https://go-devil-backend.iqsetters.com/wishlist/remove/${item?.wishlist_id}/`,

        {headers},
      )
      .then(response => {
        if (response.data?.msg == 'product remove from the wishlist') {
          dispatch(setRefresh(true));
          wishlistApi();
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // showError('Authorization has been denied for this request');
      });
  };
  useEffect(() => {
    wishlistApi();
  }, []);

  useEffect(() => {
    if (refresh) {
      wishlistApi();
    }
  }, [refresh]);
  const wishlistApi = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    setLoading(true);
    api.get(`https://go-devil-backend.iqsetters.com/wishlists/`, {headers})
      .then(response => {
        dispatch(setRefresh(false));
        setData(response?.data?.data);
        setWishlistId(
          response?.data?.data?.find(i => i.product_id == productDetailsId)
            ?.wishlist_id,
        );
        setFavourite(
          response?.data?.data
            ?.map(i => i.product_id)
            ?.includes(Number(productDetailsId)),
        );
        setLoading(false);
      })

      .catch(error => {
        setLoading(false);
        console.error('Error:', error);
      });
  };
  return (
    <View
      style={[
       
        {backgroundColor: colors.primary,flex:1},
      ]}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginRight: 10,
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleWishlistRemove()}>
            {isFavourite == true ? (
              <View style={{marginHorizontal: 5}}>
                <FontAwesome
                  color={'red'}
                  name={isFavourite ? 'heart' : 'heart-o'}
                  size={22}
                />
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleWishlist()}>
                <View style={{marginHorizontal: 5}}>
                  <FontAwesome
                    color={isDarkTheme == true ? 'white' : 'black'}
                    name={isFavourite ? 'heart' : 'heart-o'}
                    size={22}
                  />
                </View>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
    
        </View>
      </ScrollView>
    </View>
  );
};

export default WishlistProductDetails;
