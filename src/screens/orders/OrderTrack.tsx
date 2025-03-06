import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {StackNavigationProp} from '@react-navigation/stack';

//helpers
import {Title} from '../../components';
import {colors, fonts, Icon} from '../../theme';
import api from '../../api';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {GetCartList} from '../../redux/actions/cartAction';
import {AuthScreenParamList} from '../../routes/RouteType';
import {OrderDetailsData, TrackOrder} from '../../redux/actions/userAction';
import {useSnackbar} from '../../components/Snackbar';
import {getProfile} from '../../redux/actions/profileAction';

const orderStatusMessages: Record<string, string> = {
  new_order_item: 'New Order',
  processing: 'Processing',
  dispatched: 'Dispatched',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const OrderTrack = ({route}: any) => {
  const dispatch = useAppDispatch();
  const {item} = route.params;
  const {showSnackbar} = useSnackbar();

  const navigation = useNavigation<NavigationProp>();
  const [isCancelable, setIsCancelable] = useState(true);
  const [orderStatus, setOrderStatus] = useState(item?.status);

  const {profileInfo, loading} = useAppSelector(state => state.profile);

  useEffect(() => {
    // Fetch profile once on mount
    dispatch(getProfile(''));
  }, [dispatch]);

  const [lastUpdated, setLastUpdated] = useState(null);

  const {trackorderdata, orderData} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(TrackOrder(item?.order_id));
    dispatch(OrderDetailsData(item?.order_id));
  }, []);

  useEffect(() => {
    const createdAt = moment(item?.created_at);
    const checkCancelable = () => {
      const now = moment();
      const hoursDifference = now.diff(createdAt, 'hours');
      setIsCancelable(hoursDifference < 2);
    };

    // Initial check
    checkCancelable();

    // Update every minute
    const interval = setInterval(checkCancelable, 60000);

    return () => clearInterval(interval);
  }, [item?.created_at]);

  // @ts-ignore
  const renderStage = item => {
    return (
      <View style={styles.stageContainer}>
        <Icon.MaterialIcons
          name={item.completed ? 'check-circle' : 'radio-button-unchecked'}
          size={24}
          color={item.completed ? '#4caf50' : '#9e9e9e'}
        />
        <Text style={[styles.stageLabel, {color: colors.white}]}>
          {item.status}
        </Text>
      </View>
    );
  };

  const handleCancelOrder = async () => {
    Alert.alert('Cancel Order', 'Are you sure you want to cancel this order?', [
      {text: 'No'},
      {
        text: 'Yes',
        onPress: async () => {
          try {
            const order_id = item?.order_id;
            const shiprocket_order_id = item?.shiprocket_order_id;

            const response = await api.patch(`order/cancel/${order_id}/`, {
              shiprocket_order_id: shiprocket_order_id,
            });

            console.log(112, response);

            setOrderStatus('cancelled');
            // @ts-ignore
            setLastUpdated('Order canceled');
            dispatch(GetCartList(''));
            navigation.navigate('BottomNavigator');
            showSnackbar(response.data?.message, {
              backgroundColor: colors.blue,
            });
          } catch (error) {
            console.error('Cancel API Error:', error);
            Alert.alert(
              'Error',
              'Failed to cancel the order. Please try again.',
            );
          }
        },
      },
    ]);
  };

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
        title="My Order"
        hasBackAction={true}
        onBackPress={() => navigation.goBack()}
        actions={[
          {
            icon: 'home-outline',
            onPress: () => navigation.navigate('BottomNavigator'),
          },
        ]}
      />

      <FlatList
        // data={orderData}
        // renderItem={({item}) => renderStage(item)}
        keyExtractor={index => index.toString()}
        style={styles.stageList}
        ListHeaderComponent={
          <>
            <View style={styles.orderContainer}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '30%'}}>
                  <ImageBackground
                    style={{
                      height: 120,
                      width: 100,
                    }}
                    resizeMode="contain"
                    source={{
                      uri: `https://go-devil-backend.iqsetters.com${item?.items[0]?.images}`,
                    }}
                  />
                </View>
                <View style={{width: '70%'}}>
                  <Text
                    style={[
                      styles.orderId,
                      {color: colors.red, marginRight: 5},
                    ]}>
                    Order ID :{' '}
                    <Text
                      style={{
                        fontFamily: fonts.medium,
                        fontSize: 14,
                        color: colors.white,
                      }}>
                      {' '}
                      {item?.order_id}
                    </Text>
                  </Text>
                  <Text
                    style={[
                      styles.orderId,
                      {color: colors.red, marginRight: 5},
                    ]}>
                    Booking Date:{' '}
                    <Text
                      style={{
                        fontFamily: fonts.medium,
                        fontSize: 14,
                        color: colors.white,
                      }}>
                      {' '}
                      {moment(item?.created_at).format('DD/MM/YYYY')}
                    </Text>
                  </Text>
                  <Text
                    style={[
                      styles.orderId,
                      {color: colors.red, marginRight: 5},
                    ]}>
                    Items:
                    <Text
                      style={{
                        fontFamily: fonts.medium,
                        fontSize: 14,
                        color: colors.white,
                      }}>
                      {' '}
                      {item?.items[0]?.product_name}
                    </Text>
                  </Text>
                  <Text
                    style={[
                      styles.orderId,
                      {color: colors.red, marginRight: 5},
                    ]}>
                    Payment:
                    <Text
                      style={{
                        fontFamily: fonts.medium,
                        fontSize: 14,
                        color: colors.white,
                      }}>
                      {' '}
                      {item?.payment_method}
                    </Text>
                  </Text>
                  <Text
                    style={[
                      styles.orderId,
                      {color: colors.red, marginRight: 5},
                    ]}>
                    Total:{' '}
                    <Text
                      style={{
                        fontFamily: fonts.medium,
                        fontSize: 14,
                        color: colors.white,
                      }}>
                      {' '}
                      Rs. {item?.total_amount}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.statusContainer}>
              <Text style={[styles.statusText, {color: colors.red}]}>
                {orderStatusMessages[orderStatus] || 'Unknown Status'}
              </Text>
              {trackorderdata[0]?.tracking_data?.track_url !== undefined && (
                <TouchableOpacity
                  style={[
                    styles.cancelButton,
                    {
                      backgroundColor: colors.green,
                      borderWidth: 1,
                      borderColor: colors.grey,
                      width: '80%',
                      borderRadius: 4,
                    },
                  ]}
                  onPress={() =>
                    Linking.openURL(trackorderdata[0]?.tracking_data?.track_url)
                  }>
                  <Text style={styles.cancelButtonText}>Track Order</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        }
        ListFooterComponent={
          <>
            {lastUpdated && (
              <Text style={[styles.lastUpdated, {color: colors.red}]}>
                Last Updated: {lastUpdated}
              </Text>
            )}

            {orderStatus !== 'cancelled' &&
              orderStatus !== 'delivered' &&
              isCancelable && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelOrder}>
                  <Text style={styles.cancelButtonText}>Cancel Order</Text>
                </TouchableOpacity>
              )}
            {item?.is_fully_returned === false &&
              orderStatus === 'delivered' && (
                <>
                  <TouchableOpacity
                    style={[
                      styles.cancelButton,
                      !profileInfo?.email && {backgroundColor: 'grey'},
                    ]}
                    onPress={() => {
                      if (profileInfo?.email) {
                        navigation.navigate('ReturnComplete', {item: item});
                      }
                    }}
                    disabled={!profileInfo?.email}>
                    <Text style={styles.cancelButtonText}>Return Order</Text>
                  </TouchableOpacity>
                  {!profileInfo?.email && (
                    <View>
                      <Text
                        style={{
                          color: colors.red,
                          fontSize: 16,
                          textAlign: 'center',
                          fontFamily: fonts.bold,
                          letterSpacing: 1,
                          marginTop: 10,
                        }}>
                        "Please complete your profile because a refund coupon
                        will be sent to your email."
                      </Text>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => {
                          navigation.navigate('EditProfile');
                        }}>
                        <Text style={styles.cancelButtonText}>
                          Complete Your Profile
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    marginBottom: 8,
    textAlign: 'center',
  },
  orderId: {
    fontSize: 16,
    // color: '#757575',
    // marginBottom: 16,
    fontFamily: fonts.medium,
    marginTop: 5,

    // textAlign: 'center',
  },
  profileImage: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    marginLeft: 0,
    marginTop: -15,
  },
  statusContainer: {
    backgroundColor: colors.drakgrey,
    padding: 15,
    width: '100%',
    marginLeft: 0,
    borderRadius: 0,
    marginBottom: 20,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 20,

    color: colors.red,
  },
  listContainer: {
    padding: 10,
  },
  orderContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: colors.drakgrey,
    width: '100%',
    marginLeft: 0,
    // borderRadius: 8,
    // borderWidth: 0.5,
    // borderColor: colors.grey,
  },

  total: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#007BFF',
  },
  lastUpdated: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  stageList: {
    marginTop: 10,
    margin: 10,
  },
  stageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey,
  },
  stageLabel: {
    fontSize: 16,
    marginLeft: 10,
    color: '#424242',
  },
  cancelButton: {
    backgroundColor: colors.red,
    padding: 12,
    borderRadius: 0,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.bold,
  },
});

export default OrderTrack;
