import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
} from 'react-native';
import {colors, fonts} from '../../theme';
import {Title} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {FetchNotifucation} from '../../redux/actions/homeAction';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenParamList} from '../../routes/RouteType';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSnackbar} from '../../components/Snackbar';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const Notification = () => {
  const dispatch = useAppDispatch();
  const {notification, loading} = useAppSelector(state => state.home);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    dispatch(FetchNotifucation(''));
  }, []);

  const onRefresh = () => {
    dispatch(FetchNotifucation(''));
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
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />
      <Title title="" hasBackAction={false} />
      <FlatList
        // @ts-ignore

        data={notification}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        keyExtractor={item => item?.id?.toString()}
        numColumns={1}
        contentContainerStyle={{marginHorizontal: 5}}
        style={{marginBottom: 150}}
        renderItem={({item}) => (
          <View style={styles.notification}>
            <Text style={styles.notificationTitle}>
              {item.notificaiton_type}
            </Text>
            <Text style={styles.notificationMessage}>
              {item.notification_message}
            </Text>
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: 12,
                  color: colors.red,
                }}>
                {item?.created_at?.split('T')[0]}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {loading ? (
              <ActivityIndicator color={colors.red} />
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '70%',
                }}>
                <Text
                  style={{color: 'red', fontFamily: fonts.bold, fontSize: 16}}>
                  No Data Found
                </Text>
              </View>
            )}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  notification: {
    marginTop: 20,
    backgroundColor: colors.drakgrey,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: '98%',
    marginLeft: 10,
  },
  notificationTitle: {
    fontFamily: fonts.medium,
    color: colors.white,
    fontSize: 16,
  },
  notificationMessage: {
    color: colors.grey,
    marginTop: 5,
    fontFamily: fonts.medium,
    fontSize: 12,
  },
});

export default Notification;
