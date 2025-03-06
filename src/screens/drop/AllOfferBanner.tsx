import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {FetchOfferBanner} from '../../redux/actions/homeAction';
import {colors, fonts} from '../../theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenParamList} from '../../routes/RouteType';
import {useNavigation} from '@react-navigation/native';
import {Title} from '../../components';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const AllOfferBanner = () => {
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
      <ImageBackground
        source={{
          uri: `https://go-devil-backend.iqsetters.com${item.offer_banner_image}`,
        }}
        style={styles.bannerImage}
        resizeMode="cover"></ImageBackground>
    </Pressable>
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.black,
        }}>
        <ActivityIndicator size={'large'} color="red" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <StatusBar
        backgroundColor="black"
        translucent={true}
        hidden={false}
        barStyle="dark-content"
      />
      <Title
        title=""
        hasBackAction={false}
     
      />
      <FlatList
        data={offerBanner}
        renderItem={renderBannerItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 140}}
        contentContainerStyle={{paddingHorizontal: 0}}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '75%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  color: colors.red,
                  fontSize: 20,
                  fontFamily: fonts.bold,
                }}>
                No Offer Available
              </Text>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default AllOfferBanner;

const styles = StyleSheet.create({
  bannerImage: {
    width: 'auto',
    height: 200,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
});
