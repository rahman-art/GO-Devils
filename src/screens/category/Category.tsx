import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Pressable,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
  Animated,
  Text,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';

//helpers
import {Title} from '../../components';

//components

import {useAppDispatch, useAppSelector} from '../../hooks';
import {clotheCategory, ProductList} from '../../redux/actions/homeAction';
import EmptyMessage from '../../components/EmptyMessage';
import {colors, fonts, Icon} from '../../theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenParamList} from '../../routes/RouteType';
import {useNavigation} from '@react-navigation/native';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const Category = ({route}: any) => {
  const navigation = useNavigation<NavigationProp>();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isTextInputVisible, setTextInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const {cloth, categoryLoading} = useAppSelector(state => state.home);
  const filteredData = cloth?.filter(item =>
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
  const onRefresh = () => {
    dispatch(clotheCategory(''));
  };

  useEffect(() => {
    dispatch(clotheCategory(''));
  }, []);

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
            title={'Category'}
            hasBackAction={true}
            actions={[
              {
                icon: 'magnify',
                onPress: () => handleSearchIconPress(),
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
      {categoryLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.black,
          }}>
          <ActivityIndicator size={'large'} color="red" />
          <Text style={{color: colors.red}}>Please wait...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={({item}) => (
            <Pressable
              onPress={() =>
                // @ts-ignore
                navigation.navigate('SubCategory', {item: item})
              }
              style={[styles.categoryCard, {backgroundColor: colors.drakgrey}]}>
              <ImageBackground
                source={{
                  uri: `https://go-devil-backend.iqsetters.com${item.category_image}`,
                }}
                imageStyle={{borderRadius: 0}}
                style={styles.categoryImage}
                resizeMode="contain"></ImageBackground>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 0,
                }}>
                <Text
                  numberOfLines={2}
                  style={[styles.catgoryTitle, {color: colors.red}]}>
                  {item?.category_name}
                </Text>
              </View>
            </Pressable>
          )}
          keyExtractor={(index, item) => item.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.flatListContainer}
          ListFooterComponent={() =>
            isFetchingMore ? (
              <ActivityIndicator
                size="small"
                color={colors.red}
                style={{marginBottom: 10}}
              />
            ) : null
          }
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '90%',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text style={{color: colors.red}}>No Data</Text>
              </View>
            </View>
          }
        />
      )}
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  flatListContainer: {
    marginTop: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryCard: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 10,
    width: '45%',
  },
  categoryImage: {
    width: '100%',
    height: 200,
  },
  catgoryTitle: {
    fontSize: 12,
    fontFamily: fonts.medium,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
  },
});
