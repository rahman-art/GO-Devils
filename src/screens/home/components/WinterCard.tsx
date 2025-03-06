import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

//helpers
import {colors, fonts} from '../../../theme';
import {ProductData, winterProduct} from '../../../types/home';
import {AuthScreenParamList} from '../../../routes/RouteType';
import styles from './styles';
import WishlistIcon from './WishlistIcon';
type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const WinterCard = ({item}: {item: ProductData}) => {
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
          uri: item?.product_images?.[0],
        }}
        style={styles.image}>
        {item?.product_variants[0]?.discount == 0 ? (
          <View style={styles.discountCard}>
            <Text style={styles.discountText}>
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
          <WishlistIcon item={item} />
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
        style={[styles.textprice, {color: colors.red, marginHorizontal: 10}]}>
        Rs. {item?.product_variants[0]?.product_price}
      </Text>
    </Pressable>
  );
};

export default WinterCard;
