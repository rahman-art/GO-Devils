import React, {useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

//helpers
import {colors, fonts} from '../../../theme';
import {AuthScreenParamList} from '../../../routes/RouteType';
import {CategoryData} from '../../../types/home';
import {useAppDispatch} from '../../../hooks';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const CategoryCard = ({item}: {item: CategoryData}) => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  // console.log('17',item)
  return (
    <Pressable
      onPress={() => navigation.navigate('SubCategory', {item: item})}
      style={[styles.categoryCard, {backgroundColor: colors.drakgrey}]}>
      <ImageBackground
        source={{
          uri: `https://go-devil-backend.iqsetters.com${item.category_image}`,
        }}
        imageStyle={{borderRadius: 0}}
        style={styles.categoryImage}
        resizeMode="contain"></ImageBackground>
      <View style={{padding: 5}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 0,
          }}>
          <Text style={[styles.catgoryTitle, {color: colors.red}]}>
            {item?.category_name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  categoryCard: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 5,
  },
  categoryImage: {
    width: 180,
    height: 200,
  },
  catgoryTitle: {
    fontSize: 12,
    fontFamily: fonts.medium,
    textAlign: 'center',
  },
});
