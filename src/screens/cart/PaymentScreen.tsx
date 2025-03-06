import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import RazorpayCheckout from 'react-native-razorpay';
import {useNavigation} from '@react-navigation/native';

//helpers
import api from '../../api';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {GetAddress} from '../../redux/actions/addressAction';
import {colors, fonts, Icon} from '../../theme';
import {AuthScreenParamList} from '../../routes/RouteType';
import {Title} from '../../components';
import {OrderCreate, OrderList} from '../../redux/actions/cartAction';
import {useSnackbar} from '../../components/Snackbar';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const PaymentScreen = ({route}: any) => {
  const {item, totalPrice, coupon} = route.params;
  const navigation = useNavigation<NavigationProp>();
  const {addressData} = useAppSelector(state => state.address);
  const {couponCode} = useAppSelector(state => state.cart);
  const {profileInfo} = useAppSelector(state => state.profile);
  const dispatch = useAppDispatch();
  const [primaryAddressData, setPrimaryAddressData] = useState<any>(null);
  const [radio, setRadio] = useState(true);
  const {showSnackbar} = useSnackbar();

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
            coupon_code: coupon,
            discount_amount: couponCode,
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
          coupon_code: coupon,
          discount_amount: couponCode,
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

  useEffect(() => {
    const primaryAddress = addressData.find(
      (address: any) => address.is_primary,
    );
    setPrimaryAddressData(primaryAddress);
  }, [addressData]);

  useEffect(() => {
    dispatch(GetAddress(''));
  }, []);

  return (
    <View style={styles.container}>
      <Title title={''} hasBackAction={true} />
      <ScrollView>
        {/* Delivery Address Section */}
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

        <View style={styles.card}>
          <Text style={styles.heading}>Order Summary</Text>
          {(item && Array.isArray(item) ? item : []).map(productItem => (
            <View key={productItem.variant_id} style={styles.cartItem}>
              {/* Assuming 'images' is an array of image objects */}
              <Image
                source={{
                  uri: `https://go-devil-backend.iqsetters.com${productItem?.images?.[0]?.product_image}`,
                }}
                resizeMode="contain"
                style={styles.productImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>
                  {productItem.product.product_name}
                </Text>
                <Text style={styles.description}>
                  {productItem.product.product_description}
                </Text>
                {/* Seller information seems to be missing, you can adjust this as needed */}

                <View style={styles.priceRow}>
                  {/* Assuming 'price' is the actual price after discount */}
                  <Text style={styles.discountedPrice}>
                    {productItem?.variant.offer_price}
                  </Text>
                  <Text style={styles.originalPrice}>
                    ₹{productItem?.variant?.product_price}
                  </Text>
                  <Text style={styles.discount}>
                    {productItem?.variant?.discount}% off
                  </Text>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.totalContainer}>
            <Text style={styles.finalAmount}>Total Payable:</Text>
            <Text style={styles.finalAmount}>{`₹${totalPrice}`}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.card}>
          <Text style={styles.heading}>Payment Method</Text>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              radio == false && styles.selectedPayment,
            ]}
            onPress={() => setRadio(false)}>
            <Icon.MaterialIcons
              name="money"
              size={20}
              color={radio == false ? '#fff' : '#555'}
            />
            <Text
              style={[
                styles.paymentText,
                radio == false && styles.selectedText,
              ]}>
              Cash on Delivery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              radio == true && styles.selectedPayment,
            ]}
            onPress={() => setRadio(true)}>
            <Icon.MaterialIcons
              name="credit-card"
              size={20}
              color={radio == true ? '#fff' : '#555'}
            />
            <Text
              style={[
                styles.paymentText,
                radio == true && styles.selectedText,
              ]}>
              Pay Now
            </Text>
          </TouchableOpacity>
        </View>

        {radio == false ? (
          <View style={{marginTop: '2%', marginBottom: 10, margin: 12}}>
            {addressData.length !== 0 && (
              <View style={styles.loginButton}>
                <TouchableOpacity onPress={() => handleCashOnDelivery()}>
                  <Text style={styles.loginButtonText}>Place Your Order</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <View style={{marginTop: '2%', marginBottom: 10, margin: 12}}>
            {addressData.length !== 0 && (
              <View style={styles.loginButton}>
                <TouchableOpacity onPress={() => createOrder()}>
                  <Text style={styles.loginButtonText}>Place Your Order</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

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
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },

  delivery: {
    fontSize: 12,
    color: '#009688',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.green,
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#777',
    marginLeft: 10,
  },
  discount: {
    fontSize: 14,
    color: '#D32F2F',
    marginLeft: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  finalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'whitesmoke',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: colors.black,
  },
  selectedPayment: {
    //backgroundColor: '#007BFF',
    borderColor: colors.red,
    borderWidth: 1,
  },
  paymentText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  selectedText: {
    color: colors.white,
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
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  discountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  savedText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    marginTop: 5,
  },
});

export default PaymentScreen;
