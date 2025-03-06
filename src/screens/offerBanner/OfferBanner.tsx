import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {FetchOfferBanner} from '../../redux/actions/homeAction';
import {colors} from '../../theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenParamList} from '../../routes/RouteType';
import {useNavigation} from '@react-navigation/native';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const OfferBanner = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const {loading, offerBanner} = useAppSelector(state => state.home);
  useEffect(() => {
    dispatch(FetchOfferBanner(''));
  }, []);
  const renderBannerItem = ({item}: any) => (
    // @ts-ignore
    <Pressable
      onPress={() => navigation.navigate('Drop', {item: item?.category_id})}>
      <Image
        source={{
          uri: `https://go-devil-backend.iqsetters.com${item.offer_banner_image}`,
        }}
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </Pressable>
  );
  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <FlatList
        data={offerBanner}
        renderItem={renderBannerItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 0}}
      />
    </View>
  );
};

export default OfferBanner;

const styles = StyleSheet.create({
  bannerImage: {
    width: 320,
    height: 200,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
});
