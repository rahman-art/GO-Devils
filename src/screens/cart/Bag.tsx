import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import * as Yup from 'yup';
import {useFormik} from 'formik';

//heleprs
import {appstyles, colors, fonts, Icon} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  ApplyCoupon,
  GetCartList,
  RemoveCart,
  updateCart,
  UpdateVariantSize,
} from '../../redux/actions/cartAction';
import EmptyCart from '../../components/EmptyCart';
import {useSnackbar} from '../../components/Snackbar';
import {CustomButton, CustomInput} from '../../components';

const CartScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {showSnackbar} = useSnackbar();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [sizeModal, setSizeModal] = useState({open: false, data: {}});

  const {
    cartData,
    totalPrice,
    totalDiscount,
    cartLoading,
    couponCode: couponPrice,
    couponLoading,
  } = useAppSelector(state => state.cart);

  useEffect(() => {
    dispatch(GetCartList(''));
  }, []);

  const RemoveFromCart = async (product_cart_id: number) => {
    try {
      const response = await dispatch(RemoveCart(product_cart_id)).unwrap();

      if (response.message) {
        showSnackbar(response.message, {
          backgroundColor: colors.green,
        });

        dispatch(GetCartList(''));
      } else {
        showSnackbar(response.error, {
          backgroundColor: colors.red,
        });
      }
    } catch (error) {
      showSnackbar('Something went wrong', {
        backgroundColor: colors.red,
      });
    }
  };

  const [applied, setApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const formik = useFormik({
    initialValues: {couponCode: ''},
    validationSchema: Yup.object().shape({
      couponCode: Yup.string().required('Coupon code is required'),
    }),
    onSubmit: async (values, {setSubmitting}) => {
      try {
        setSubmitting(true);

        const response = await dispatch(
          ApplyCoupon({coupon_code: values.couponCode}),
        ).unwrap();

        if (response.message) {
          showSnackbar(response.message, {backgroundColor: colors.green});
          setDiscountAmount(parseFloat(response.discount_amount));
          setApplied(true);
          dispatch(GetCartList(''));
        } else {
          showSnackbar(response.error, {backgroundColor: colors.red});
        }
      } catch (error) {
        showSnackbar(`${error}`, {backgroundColor: colors.red});
      } finally {
        setSubmitting(false);
      }
    },
  });

  const UpdateSize = async (id: any, cartId: number) => {
    try {
      const response = await dispatch(
        UpdateVariantSize({variant_id: id, cart_id: cartId}),
      ).unwrap();
      if (response) {
        dispatch(GetCartList(''));
        setModalVisible(false);
      }
    } catch (error) {
      //@ts-ignore
      const errorMessage = error?.message;
      showSnackbar(errorMessage, {
        backgroundColor: colors.red,
      });
    }
  };

  const incrementQty = async (product_cart_id: number, quantity: number) => {
    try {
      const response = await dispatch(
        updateCart({quantity: quantity, product_cart_id: product_cart_id}),
      );
      if (response.payload.msg) {
        showSnackbar(response.payload.msg, {
          backgroundColor: colors.green,
        });
      }
      if (!response.payload.msg) {
        showSnackbar('Do not have more stocks', {
          backgroundColor: colors.red,
        });
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      Alert.alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <CustomInput
          placeholder="Enter Coupon code"
          placeholderTextColor={colors.red}
          onChangeText={formik.handleChange('couponCode')}
          onBlur={formik.handleBlur('couponCode')}
          value={formik.values.couponCode}
          containerStyle={{margin: 10}}
        />
        <TouchableOpacity
          disabled={couponLoading || applied}
          style={{
            position: 'absolute',
            right: 20,
            top: 52,
            backgroundColor: colors.red,
            height: 30,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => formik.handleSubmit()}>
          {couponLoading ? (
            <ActivityIndicator size="small" color={colors.red} />
          ) : (
            <Text
              style={{
                color: applied ? colors.white : colors.white,
                fontFamily: fonts.bold,
                right: 10,
              }}>
              {applied ? 'APPLIED' : 'APPLY'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {applied && discountAmount > 0 && (
        <View style={{}}>
          <Text
            style={{
              color: colors.green,
              fontFamily: fonts.medium,
              fontSize: 12,
              marginTop: -15,
              marginLeft: 10,
            }}>
            Congratulations you have got Rs. {discountAmount.toFixed(2)}
          </Text>
        </View>
      )}
      {cartLoading ? (
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
          data={cartData}
          keyExtractor={item => item?.product_cart_id?.toString()}
          renderItem={({item}) => {
            const cartItem = item;
            const imageUrl = cartItem?.images?.[0]?.product_image;

            return (
              <View style={styles.card}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '30%'}}>
                    {imageUrl && (
                      <Image
                        source={{
                          uri: `https://go-devil-backend.iqsetters.com${imageUrl}`,
                        }}
                        style={styles.image}
                      />
                    )}
                  </View>
                  <View style={{width: '65%'}}>
                    <Text
                      style={[
                        styles.productText,
                        {fontFamily: fonts.bold, fontSize: 14, marginTop: 5},
                      ]}>
                      {cartItem?.product?.product_name}
                    </Text>

                    <View style={[styles.priceView, {padding: 5}]}>
                      <Text
                        style={
                          styles.priceText
                        }>{`Rs. ${cartItem?.variant?.offer_price}`}</Text>
                      <Text
                        style={[
                          styles.priceText,
                          {
                            textDecorationLine: 'line-through',
                            color: colors.grey,
                          },
                        ]}>
                        {`Rs. ${cartItem?.variant?.product_price}`}
                      </Text>
                    </View>
                    <View style={[styles.saveView, {padding: 5}]}>
                      <Text style={styles.saveText}>
                        {`You saved ${cartItem?.variant.discount}`}%
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row', margin: 10}}>
                      <TouchableOpacity
                        onPress={() => setSizeModal({open: true, data: item})}
                        style={[styles.sizeView, {width: '35%', padding: 0}]}>
                        <Text style={styles.saveText}>
                          SIZE : {cartItem?.variant?.size || 'N/A'}
                        </Text>
                      </TouchableOpacity>

                      <View style={[styles.sizeView, {width: '50%'}]}>
                        <View style={styles.quantityContainer}>
                          <TouchableOpacity
                            style={styles.button}
                            disabled={cartItem?.quantity <= 1}
                            onPress={() =>
                              incrementQty(
                                item?.product_cart_id,
                                cartItem?.quantity - 1,
                              )
                            }>
                            <Text style={styles.buttonText}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.quantity}>
                            {cartItem?.quantity}
                          </Text>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={() =>
                              incrementQty(
                                item?.product_cart_id,
                                cartItem?.quantity + 1,
                              )
                            }>
                            <Text style={styles.buttonText}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>

                  <Pressable
                    style={{width: '5%', marginTop: 15}}
                    onPress={() => RemoveFromCart(item?.product_cart_id)}>
                    <Icon.IonIcon name="trash" size={22} color={colors.red} />
                  </Pressable>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <>
                <EmptyCart />
              </>
            </View>
          }
          ListFooterComponent={() => (
            <>
              {cartData?.length > 0 && (
                <View style={{marginBottom: 10}}>
                  <Divider
                    style={{backgroundColor: colors.grey, marginTop: 5}}
                  />

                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <View style={{width: '70%'}}>
                      <Text
                        style={[
                          styles.productText,
                          {
                            fontFamily: fonts.medium,
                            fontSize: 16,
                            color: colors.red,
                          },
                        ]}>
                        Total
                      </Text>
                    </View>
                    <View style={{width: '30%'}}>
                      <Text
                        style={[
                          styles.productText,
                          {
                            fontFamily: fonts.medium,
                            fontSize: 16,
                            color: colors.red,
                          },
                        ]}>
                        Rs.{' '}
                        {(totalPrice - discountAmount < 0
                          ? 0
                          : totalPrice - discountAmount
                        ).toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  <Divider
                    style={{backgroundColor: colors.grey, marginTop: 10}}
                  />

                  <View
                    style={{
                      marginTop: 20,
                      width: '95%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginHorizontal: 10,
                      height: 130,
                      bottom: 50,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        // Calculate final price based on coupon status
                        const computedPrice = applied
                          ? totalPrice - discountAmount
                          : totalPrice;
                        const finalPrice =
                          computedPrice < 0 ? 0 : computedPrice;

                        // Navigate to PaymentScreen with the final price
                        // @ts-ignore
                        navigation.navigate('PaymentScreen', {
                          item: cartData,
                          totalPrice: finalPrice,
                          coupon: formik.values.couponCode,
                        });
                      }}
                      activeOpacity={0.8}
                      style={[styles.container, {backgroundColor: colors.red}]}>
                      <Text style={styles.title}>CHECKOUT</Text>
                      <Icon.AntDesign
                        name="arrowright"
                        size={20}
                        color={colors.white}
                        style={{
                          position: 'absolute',
                          marginLeft: '90%',
                          marginTop: 10,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>
          )}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={sizeModal.open}
        onRequestClose={() => setSizeModal({open: false, data: {}})}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Size</Text>
            <FlatList
              data={sizeModal.data.available_variant}
              keyExtractor={av => av.variant_id.toString()} // Ensure `variant_id` is accessed correctly
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={styles.sizeOption}
                    onPress={() => {
                      UpdateSize(
                        item.variant_id,
                        sizeModal?.data?.product_cart_id,
                      );
                      setSizeModal({open: false, data: {}});
                    }}>
                    <Text style={styles.sizeText1}>{item.size}</Text>
                    {/* Display size */}
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setSizeModal({open: false, data: {}})}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  variant: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: '#000',
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: colors.white,
  },

  footer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },

  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalDiscount: {
    fontSize: 14,
    color: '#555',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    padding: 16,
    backgroundColor: colors.drakgrey,
    // borderWidth:0.5,borderColor:colors.red
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    color: colors.red,
    fontFamily: fonts.medium,
  },
  sizeOption: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey,
  },
  sizeText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalCloseButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.red,
    borderRadius: 0,
  },
  modalCloseText: {
    color: '#fff',
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: colors.drakgrey,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 8,
    marginTop: 5,
  },
  image: {
    width: 110,
    height: 180,
  },

  title: {
    margin: 10,
    color: colors.white,
    fontFamily: fonts.bold,
    marginLeft: 20,
  },
  sizeText1: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.white,
    marginHorizontal: 10,
  },

  button: {
    backgroundColor: colors.red,
    padding: 6,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: fonts.bold,
  },

  sizeView: {
    backgroundColor: colors.red,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
  },
  saveText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 12,
    marginTop: 0,
  },

  productText: {
    color: colors.white,
    marginLeft: 15,
  },

  saveView: {
    backgroundColor: colors.red,
    marginLeft: 15,
    marginTop: 8,
    width: '50%',
  },
  priceText: {
    color: colors.red,
    margin: 5,
    fontFamily: fonts.medium,
    fontSize: 12,
  },
  priceView: {
    backgroundColor: colors.primary,
    marginLeft: 15,
    marginTop: 10,
    width: '60%',
    flexDirection: 'row',
  },
});

export default CartScreen;
