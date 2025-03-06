import {ImageBackground, StyleSheet, Text, Pressable, View} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

//helpers
import {colors, fonts} from '../../../theme';
import {ProductData, SimilarVariants} from '../../../types/home';
import {AuthScreenParamList} from '../../../routes/RouteType';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const SimilarCard = ({
  item,
  onSelectProduct,
}: {
  item: ProductData;
  onSelectProduct: () => void;
}) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', {item: item})}>
      <ImageBackground
        source={{
          uri: `https://go-devil-backend.iqsetters.com${item?.images[0]?.product_image}`,
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
              {item?.discount}% OFF
            </Text>
          </View>
        ) : null}
      </ImageBackground>
      <Text
        numberOfLines={2}
        style={[styles.textname, {marginTop: 10, color: colors.white}]}>
        {item?.product_variants?.}
      </Text>
      <Text numberOfLines={2} style={[styles.textname, {color: colors.grey}]}>
        {item?.product?.product_description}
      </Text>
      <Text
        style={[
          styles.textprice,
          {textDecorationLine: 'line-through', marginHorizontal: 10},
        ]}>
        Rs. {item?.product_price}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '30%'}}>
          {/* <Text style={[styles.textprice, {marginLeft: 5, marginRight: 0}]}>
            From
          </Text> */}
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

export default SimilarCard;

const styles = StyleSheet.create({
  card: {
    width: 200,
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
    height: 312,
    // backgroundColor: 'red',
    marginBottom: 0,
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
