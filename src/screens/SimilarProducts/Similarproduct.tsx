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
import {
  ProductList,
  SimilarProductDetails,
} from '../../redux/actions/homeAction';
import {useAppDispatch, useAppSelector} from '../../hooks';
import api from '../../api';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const SimilarProduct: React.FC = ({route}: any) => {
  const item = route?.params?.item || null;

  const dispatch = useAppDispatch();

  const navigation = useNavigation<NavigationProp>();
  const {similar, loading} = useAppSelector(state => state.home);

  const handleWishlist = async (productId: number) => {
    try {
      const response = await api.post('wishlist/', {
        product_id: productId,
      });

      dispatch(SimilarProductDetails(item?.subcategory_id));
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      Alert.alert('Error', 'Failed to add to wishlist. Please try again.');
    }
  };

  const handleWishlistRemove = async (productId: number) => {
    try {
      const response = await api.delete(`wishlist/remove/${productId}/`);

      dispatch(SimilarProductDetails(item?.subcategory_id));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      Alert.alert(
        'Error',
        'Failed to remove item from wishlist. Please try again.',
      );
    }
  };

  useEffect(() => {
    dispatch(SimilarProductDetails(item?.subcategory_id));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={similar}
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
                uri:
                  'https://go-devil-backend.iqsetters.com' +
                  item?.images[0]?.product_images,
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
                  {/* Rs.{' '}{item.product_price} */}
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
            {loading ? (
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

export default SimilarProduct;
