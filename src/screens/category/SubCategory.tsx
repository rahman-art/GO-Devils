import {
  ActivityIndicator,
  Animated,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';

//helpers
import {Title} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {clotheSubCategory} from '../../redux/actions/homeAction';
import {colors, fonts, Icon} from '../../theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenParamList} from '../../routes/RouteType';
import SubCategoryCard from './compoents/SubCategoryCard';
type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const SubCategory = ({route}: any) => {
  const {item} = route.params;

  const [isTextInputVisible, setTextInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const dispatch = useAppDispatch();
  const {subcategory, loading} = useAppSelector(state => state.home);
  const onRefresh = () => {
    dispatch(clotheSubCategory(item?.category_id));
  };
  // console.log('36',subcategory)
  const filteredData = subcategory?.filter(item =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );
  const handleSearchIconPress = () => {
    setTextInputVisible(true);
  };

  const cancelSearchIconPress = () => {
    setTextInputVisible(false);
    setSearchQuery('')
  };
  useEffect(() => {
    dispatch(clotheSubCategory(item?.category_id));
  }, []);

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
  if (subcategory.length === 0) {
    return (
      <View style={{flex: 1, backgroundColor: colors.primary}}>
        <Title title={'SubCategory'} hasBackAction={true} />
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{color: colors.red}}>No data Found</Text>
        </View>
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
            title={item?.category_name}
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
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        data={filteredData}
        renderItem={({item}) => <SubCategoryCard item={item} />}
        keyExtractor={(index, item) => item.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContainer}
        ListFooterComponent={() =>
          isFetchingMore ? (
            <ActivityIndicator size="small" style={{marginBottom: 10}} />
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

export default SubCategory;

const styles = StyleSheet.create({
  flatListContainer: {
    marginTop: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});
