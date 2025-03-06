import React, {useEffect} from 'react';
import {
  Pressable,
  StatusBar,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

//helpers
import {Title} from '../../components';
import {AuthScreenParamList} from '../../routes/RouteType';
import {colors, fonts, Icon} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {GetAddress} from '../../redux/actions/addressAction';

import AddressCard from './components/AddressCard';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const SaveAddress = () => {
  const navigation = useNavigation<NavigationProp>();
  const {loading, addressData} = useAppSelector(state => state.address);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetAddress(''));
  }, []);

  const onRefresh = () => {
    dispatch(GetAddress(''));
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
      <Title
        title="My Addresses"
        hasBackAction={true}
        onBackPress={() => navigation.goBack()}
        actions={[
          {icon: 'plus', onPress: () => navigation.navigate('AddNewAddress')},
          {
            icon: 'home-outline',
            onPress: () => navigation.navigate('BottomNavigator'),
          },
        ]}
      />

      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
          margin: 10,
          marginTop: 70,
        }}>
        <Pressable onPress={() => navigation.navigate('Cart')}>
          <Icon.AntDesign name="left" size={20} color={colors.red} />
        </Pressable>

        <Text
          style={{
            color: colors.red,
            fontFamily: fonts.bold,
            fontSize: 16,
            marginLeft: 10,
            flex: 1,
          }}>
          My Addresses
        </Text>
        <Icon.AntDesign
          name="plus"
          size={20}
          color={colors.red}
          onPress={() => navigation.navigate('AddNewAddress')}
        />
        <Icon.AntDesign
          name="home"
          size={20}
          color={colors.red}
          onPress={() => navigation.navigate('BottomNavigator')}
        />
      </View> */}

      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        data={addressData}
        renderItem={({item}) => <AddressCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {loading ? (
              <ActivityIndicator
                size={'large'}
                color={colors.red}
                style={{marginTop: '70%'}}
              />
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '70%',
                }}>
                <Text
                  style={{
                    color: colors.red,
                    fontFamily: fonts.bold,
                    fontSize: 16,
                  }}>
                  No data
                </Text>
              </View>
            )}
          </View>
        }
      />
    </View>
  );
};

export default SaveAddress;
