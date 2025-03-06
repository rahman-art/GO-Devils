import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, fonts, Icon} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import api from '../../api';
import {Title} from '../../components';
import {Card} from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenParamList} from '../../routes/RouteType';
import {useNavigation} from '@react-navigation/native';
import {
  GetCartList,
  OrderCreate,
  OrderList,
} from '../../redux/actions/cartAction';
import {GetAddress} from '../../redux/actions/addressAction';
import {getProfile} from '../../redux/actions/profileAction';
import {useSnackbar} from '../../components/Snackbar';
type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const PaymentScreen = ({route}: any) => {
  const {item, totalPrice} = route.params;
  const {showSnackbar} = useSnackbar();
  const navigation = useNavigation<NavigationProp>();
  const {addressData} = useAppSelector(state => state.address);
  const {profileInfo} = useAppSelector(state => state.profile);

  const [primaryAddressData, setPrimaryAddressData] = useState<any>(null);
  const [radio, setRadio] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfile(''));
  }, []);

  useEffect(() => {
    const primaryAddress = addressData.find(
      (address: any) => address.is_primary,
    );
    setPrimaryAddressData(primaryAddress);
  }, [addressData]);

  useEffect(() => {
    dispatch(GetCartList(''));
  }, []);

  useEffect(() => {
    dispatch(GetAddress(''));
  }, []);

  const createOrder = async () => {
    try {
      const response = await api.post('razorpay/order_create/', {
        amount: totalPrice,
      });

      const data = response.data;

      if (response.status === 201) {
        const {order_id, amount, key} = data;
        openRazorpayCheckout(order_id, amount, key);
      } else {
        showSnackbar(data.error, {
          backgroundColor: colors.red,
        });
      }
    } catch (error) {
      showSnackbar('Create Order Error', {
        backgroundColor: colors.red,
      });
    }
  };

  const openRazorpayCheckout = (order_id: any, amount: any, key: any) => {
    const options = {
      key: key,
      amount: amount, // Amount in paise
      currency: 'INR',
      name: 'GO DEVIL PRIVATE LIMITED',
      description: 'App Transaction',
      order_id: order_id,
      prefill: {
        email: profileInfo?.email,
        contact: String(profileInfo?.phone_number),
      },
      theme: {color: 'red'},
    };

    RazorpayCheckout.open(options)
      .then(payment => {
        // Payment success
        handlePaymentSuccess(payment.razorpay_payment_id, order_id);
      })
      .catch(error => {
        // Payment failed
        showSnackbar('Payment failed. Please try again.', {
          backgroundColor: colors.red,
        });
        // Alert.alert('Error', 'Payment failed. Please try again.');
      });
  };

  const handlePaymentSuccess = async (payment_id: string, order_id: string) => {
    try {
      const response = await api.post('razorpay/capture_payment/', {
        razorpay_payment_id: payment_id,
        razorpay_order_id: order_id,
      });

      const data = response.data;

      if (response.status === 200) {
        Alert.alert('Success', 'Payment captured successfully.', [
          {
            text: 'OK',
            onPress: () => {
              dispatch(OrderList(''));
              navigation.navigate('OrderList');
            },
          },
        ]);

        dispatch(
          OrderCreate({
            billing_customer_name: primaryAddressData?.full_name,
            billing_address: primaryAddressData?.address_line_1,
            billing_city: primaryAddressData?.city,
            billing_pincode: primaryAddressData?.pin_code,
            billing_state: primaryAddressData?.state,
            billing_country: primaryAddressData?.country,
            billing_email: '',
            billing_phone: primaryAddressData?.phone_primary,
            payment_method: radio == true ? 'prepaid' : 'COD',
            shipping_is_billing: true,
            billing_last_name: '',
            shipping_phone: primaryAddressData?.phone_primary,
            channel_id: '',
            comment: '',
            billing_address_2: '',
            shipping_customer_name: '',
            shipping_last_name: '',
            shipping_address_2: '',
            shipping_city: '',
            shipping_pincode: '',
            shipping_country: '',
            shipping_state: '',
            shipping_email: '',
            shipping_charges: 0,
            giftwrap_charges: 0,
            transaction_charges: 0,
            total_discount: 0,
            payment_id: payment_id,
            shipping_address: `${primaryAddressData?.full_name}, ${primaryAddressData?.phone_primary}, ${primaryAddressData?.address_line_1}, ${primaryAddressData?.city}, ${primaryAddressData?.state}, ${primaryAddressData?.country}, ${primaryAddressData?.pin_code}`,
          }),
        );
      } else {
        Alert.alert('Error', data.error || 'Failed to capture payment');
      }
    } catch (error) {
      console.error('Payment Capture Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const handleCashOnDelivery = async () => {
    try {
      const response = await dispatch(
        OrderCreate({
          billing_customer_name: primaryAddressData?.full_name,
          billing_address: primaryAddressData?.address_line_1,
          billing_city: primaryAddressData?.city,
          billing_pincode: primaryAddressData?.pin_code,
          billing_state: primaryAddressData?.state,
          billing_country: primaryAddressData?.country,
          billing_email: '',
          billing_phone: primaryAddressData?.phone_primary,
          payment_method: radio == true ? 'prepaid' : 'COD',
          shipping_is_billing: true,
          billing_last_name: '',
          shipping_phone: primaryAddressData?.phone_primary,
          channel_id: '',
          comment: '',
          billing_address_2: '',
          shipping_customer_name: '',
          shipping_last_name: '',
          shipping_address_2: '',
          shipping_city: '',
          shipping_pincode: '',
          shipping_country: '',
          shipping_state: '',
          shipping_email: '',
          shipping_charges: 0,
          giftwrap_charges: 0,
          transaction_charges: 0,
          total_discount: 0,
          payment_id: null,
          shipping_address: `${primaryAddressData?.full_name}, ${primaryAddressData?.phone_primary}, ${primaryAddressData?.address_line_1}, ${primaryAddressData?.city}, ${primaryAddressData?.state}, ${primaryAddressData?.country}, ${primaryAddressData?.pin_code}`,
        }),
      ).unwrap();

      if (response?.order?.payment_method === 'COD') {
        showSnackbar('Order placed successfully', {
          backgroundColor: colors.green,
        });
      }
      dispatch(OrderList(''));
      navigation.navigate('OrderList');
    } catch (error) {
      //@ts-ignore
      const errorMessage = error?.message;
      showSnackbar(errorMessage, {
        backgroundColor: colors.red,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Title title={''} hasBackAction={true} />

      <>
        {!primaryAddressData && (
          <Pressable
            onPress={() =>
              //@ts-ignore
              navigation.navigate('SaveAddress')
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 15,
              borderWidth: 1,
              borderColor: colors.red,
              padding: 10,
              justifyContent: 'center',
            }}>
            <Icon.AntDesign name="plus" size={20} color={colors.red} />
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.semibold,
                color: colors.red,
              }}>
              Add a new address
            </Text>
          </Pressable>
        )}
        {primaryAddressData && (
          <View style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: fonts.semibold,
                  fontSize: 16,
                  color: colors.red,
                }}>
                Saved Address:
              </Text>
              <TouchableOpacity
                style={{
                  width: 100,
                  padding: 8,
                  borderWidth: 1,
                  borderColor: colors.grey,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('SaveAddress')}>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.red,
                    fontFamily: fonts.bold,
                  }}>
                  CHANGE
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.savedText, {color: colors.grey}]}>
              Full Name:
              <Text
                style={{
                  color: 'white',
                  fontFamily: fonts.semibold,
                }}>
                {' '}
                {primaryAddressData?.full_name}
              </Text>
            </Text>
            <Text style={[styles.savedText, {color: colors.grey}]}>
              Mobile Number:
              <Text
                style={{
                  color: 'white',
                  fontFamily: fonts.semibold,
                }}>
                {' '}
                +91 {primaryAddressData?.phone_primary}
              </Text>
            </Text>
            <Text style={[styles.savedText, {color: colors.grey}]}>
              Pin code:
              <Text
                style={{
                  color: 'white',
                  fontFamily: fonts.semibold,
                }}>
                {' '}
                {primaryAddressData?.pin_code}
              </Text>
            </Text>
            <Text style={[styles.savedText, {color: colors.grey}]}>
              State:
              <Text
                style={{
                  color: 'white',
                  fontFamily: fonts.semibold,
                }}>
                {' '}
                {primaryAddressData?.state}
              </Text>
            </Text>
            <Text style={[styles.savedText, {color: colors.grey}]}>
              City:
              <Text
                style={{
                  color: 'white',
                  fontFamily: fonts.semibold,
                }}>
                {' '}
                {primaryAddressData?.city}
              </Text>
            </Text>

            <Text style={[styles.savedText, {color: colors.grey}]}>
              Area:
              <Text
                style={{
                  color: 'white',
                  fontFamily: fonts.semibold,
                }}>
                {' '}
                {primaryAddressData?.land_mark}
              </Text>
            </Text>
          </View>
        )}
      </>

      {radio == false ? (
        <View style={{marginTop: '2%', marginBottom: 10, margin: 12}}>
          {addressData.length !== 0 && (
            <View style={styles.loginButton}>
              <TouchableOpacity onPress={() => handleCashOnDelivery()}>
                <Text style={styles.loginButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <View style={{marginTop: '2%', marginBottom: 10, margin: 12}}>
          {addressData.length !== 0 && (
            <View style={styles.loginButton}>
              <TouchableOpacity onPress={() => createOrder()}>
                <Text style={styles.loginButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      {addressData.length !== 0 && (
        <>
          <Text numberOfLines={1} style={styles.selectText}>
            Select a payment method
          </Text>
          <View
            style={[
              {borderTopWidth: 0.5, borderTopColor: colors.red, marginTop: 5},
            ]}>
            <Card
              style={[
                styles.radioButton,
                {
                  borderColor: radio == true ? colors.red : colors.grey,
                  marginTop: 15,
                },
              ]}>
              <TouchableOpacity onPress={() => setRadio(true)}>
                <View style={{flexDirection: 'row'}}>
                  <Icon.IonIcon
                    color={colors.red}
                    name={
                      radio == true
                        ? 'radio-button-on-outline'
                        : 'radio-button-off-outline'
                    }
                    size={20}
                    style={{marginTop: 20, marginLeft: 20}}
                  />
                  <Text style={styles.cashText}>Pay Now</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card
              style={[
                styles.radioButton,
                {borderColor: radio ? colors.grey : colors.red},
              ]}>
              <TouchableOpacity onPress={() => setRadio(false)}>
                <View style={{flexDirection: 'row'}}>
                  <Icon.IonIcon
                    color={colors.red}
                    name={
                      radio == false
                        ? 'radio-button-on-outline'
                        : 'radio-button-off-outline'
                    }
                    size={20}
                    style={{marginTop: 20, marginLeft: 20}}
                  />
                  <Text style={styles.cashText}>Cash On Delivery</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
        </>
      )}
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  card: {
    marginBottom: 16,
    backgroundColor: colors.drakgrey,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
    marginTop: 10,
    margin: 5,
  },
  selectText: {
    color: colors.red,
    fontSize: 18,
    marginRight: 5,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: fonts.bold,
  },
  cashText: {
    fontSize: 14,
    marginHorizontal: 5,
    color: colors.red,
    fontFamily: fonts.medium,
    marginBottom: 20,
    marginTop: 20,
  },
  radioButton: {
    backgroundColor: colors.primary,
    marginHorizontal: 10,
    marginBottom: 5,
    borderRadius: 0,
    marginTop: 10,
    elevation: 3,
    borderWidth: 0.5,
  },
  savedText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    marginTop: 5,
  },
  loginButtonText: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  loginButton: {
    backgroundColor: colors.red,
    width: '100%',
    paddingVertical: 12,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.23,
    shadowRadius: 5.32,
    elevation: 2,
  },
});
