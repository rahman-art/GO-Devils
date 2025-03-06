import React, {useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

//helpers
import {colors, fonts} from '../../../theme';
import {AuthScreenParamList} from '../../../routes/RouteType';
import {CategoryData, SubCategoryData} from '../../../types/home';
import {useAppDispatch} from '../../../hooks';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const SubCategoryCard = ({item}: {item: SubCategoryData}) => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  return (
    <Pressable
      // @ts-ignore
      onPress={() =>
        // @ts-ignore
        navigation.navigate('Products', {item: item?.subcategory_id})
      }
      style={[styles.categoryCard, {backgroundColor: colors.drakgrey}]}>
      <ImageBackground
        source={{
          uri: `https://go-devil-backend.iqsetters.com${item.subcategory_image}`,
        }}
        style={styles.categoryImage}
        resizeMode="contain"></ImageBackground>
      <View style={{padding: 5}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.catgoryTitle, {color: colors.red}]}>
            {item?.subcategory_name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SubCategoryCard;

const styles = StyleSheet.create({
  categoryCard: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 5,
    width: '48%',
  },
  categoryImage: {
    width: '100%',
    height: 300,
    backgroundColor: 'transparent',
  },
  catgoryTitle: {
    fontSize: 12,
    fontFamily: fonts.medium,
    textAlign: 'center',
  },
});
