import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
const windowHeight = Dimensions.get('window').height;

//helpers
import {Title} from '../../components';
import {AuthScreenParamList} from '../../routes/RouteType';
import {colors, fonts, Icon} from '../../theme';

//screens
import FavouriteCard from './component/FavouriteCard';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {GetWishList} from '../../redux/actions/userAction';
import { useSnackbar } from '../../components/Snackbar';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const LikeThings = () => {
  const navigation = useNavigation<NavigationProp>();
 const {showSnackbar} = useSnackbar();
  const dispatch = useAppDispatch();
  const {wishList, loading} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(GetWishList(''));
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(GetWishList(''));
    }, []),
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.primary,
        }}>
        <ActivityIndicator size={'large'} color={colors.red} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />

      <FlatList
        data={wishList}
        keyExtractor={item => item?.wishlist_id?.toString()}
        numColumns={2}
        scrollEnabled={true}
        contentContainerStyle={{marginHorizontal: 5}}
        style={{marginBottom: 120}}
        renderItem={({item}) => <FavouriteCard item={item} />}
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
          
                }}>
                <Text
                  style={{
                    color: colors.red,
                    fontFamily: fonts.bold,
                    fontSize: 18,
                  }}>
                  No Data
                </Text>
              </View>
            )}
          </View>
        }
      />
    </View>
  );
};

export default LikeThings;

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    backgroundColor: colors.primary,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});
