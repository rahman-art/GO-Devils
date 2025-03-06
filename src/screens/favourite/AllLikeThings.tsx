import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

//helpers
import {Title} from '../../components';
import {AuthScreenParamList} from '../../routes/RouteType';
import {colors, fonts, Icon} from '../../theme';

//screens
import FavouriteCard from './component/FavouriteCard';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {GetWishList} from '../../redux/actions/userAction';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const AllLikeThings = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const dispatch = useAppDispatch();
  const {wishList, loading} = useAppSelector(state => state.user);
  const [isTextInputVisible, setTextInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // console.log('42',wishList)
  const filteredData = wishList?.filter(item =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  const handleSearchIconPress = () => {
    setTextInputVisible(true);
  };

  const cancelSearchIconPress = () => {
    setTextInputVisible(false);
    setSearchQuery('');
  };

  useEffect(() => {
    dispatch(GetWishList(''));
  }, []);

  const onRefresh = () => {
    dispatch(GetWishList(''));
  };

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
      {!isTextInputVisible ? (
        <View style={{}}>
          <Title
            title={'Wishlist'}
            hasBackAction={true}
            actions={[
              {
                icon: 'magnify',
                onPress: () => handleSearchIconPress(),
              },
              {
                icon: 'home-outline',
                onPress: () => navigation.navigate('BottomNavigator'),
              },
            ]}
          />
        </View>
      ) : (
        <Animated.View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'center',
            marginTop: 50,
            backgroundColor: colors.primary,
          }}>
          <Icon.Feather
            onPress={handleSearchIconPress}
            name="search"
            size={15}
            style={{position: 'absolute', left: 20, top: 20}}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.primary,
              borderWidth: 0.5,
              borderRadius: 0,
              borderColor: colors.red,
              flex: 0.9,
            }}>
            <Icon.Feather
              name="search"
              size={18}
              color={colors.red}
              style={{marginLeft: 10}}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor={colors.red}
              style={{
                padding: 10,
                flex: 1,
                color: colors.red,
              }}
              onChangeText={text => setSearchQuery(text)}
            />
          </View>
          <Text onPress={cancelSearchIconPress} style={{color: colors.red}}>
            Cancel
          </Text>
        </Animated.View>
      )}
      <FlatList
        data={filteredData}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        renderItem={({item}) => <FavouriteCard item={item} />}
        keyExtractor={item => item?.wishlist_id?.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContainer}
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

export default AllLikeThings;

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
