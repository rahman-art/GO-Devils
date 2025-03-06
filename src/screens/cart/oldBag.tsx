import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import axios from 'axios';
import api from '../../api';
import {colors, fonts, Icon} from '../../theme';
import {Divider} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import {useAppDispatch, useAppSelector} from '../../hooks';

import {GetAddress} from '../../redux/actions/addressAction';
import {useNavigation} from '@react-navigation/native';
interface Variant {
  variant_id: number;
  size: string;
  color: string;
  product_price: string;
  discount: number;
  available_in_stock: number;
}

interface CartItem {
  product_cart_id: number;
  quantity: number;
  images: {product_image: string}[];
  product: {
    product_name: string;
    product_description: string;
    brand: string;
  };
  variant: Variant;
  available_variant: Variant[];
  price: number;
}

interface ApiResponse {
  cart_items: CartItem[];
  total_price: number;
  total_discount: number;
}

const CartScreen: React.FC = () => {
  const navigation = useNavigation();
  const [cartData, setCartData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isrefresh, setRefresh] = useState<boolean>(false);
  const {addressData} = useAppSelector(state => state.address);
  const [primaryAddressData, setPrimaryAddressData] = useState<any>(null);

  useEffect(() => {
    const primaryAddress = addressData.find(
      (address: any) => address.is_primary,
    );
    setPrimaryAddressData(primaryAddress);
  }, [addressData]);

  useEffect(() => {
    dispatch(GetAddress(''));
  }, []);
  // console.log('cart')

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    if (isrefresh) {
      fetchCartData(); // Call your API to get updated cart data
    }
    // Alert.alert('hhhh')
  }, [isrefresh]);
  const fetchCartData = async () => {
    try {
      const response = await api.get<ApiResponse>(
        'https://go-devil-backend.iqsetters.com/cart/details/',
      );
      // console.log('96',response.data)
      setCartData(response.data);
      setLoading(false);
      setRefresh(false);
    } catch (error) {
      setLoading(false);
      console.error('Error', error);
      setRefresh(false);
    }
  };

  const updateCartSize = async (size: string) => {
    if (!selectedCartItem) return;

    const newVariant = selectedCartItem.available_variant.find(
      variant => variant.size === size,
    );

    if (!newVariant) {
      Alert.alert('Selected size is not available!');
      return;
    }

    try {
      await api.patch(`https://go-devil-backend.iqsetters.com/cart/update/`, {
        product_cart_id: selectedCartItem.product_cart_id,
        variant_id: newVariant.variant_id,
      });

      // Update local state
      setCartData(prevCartData => {
        if (!prevCartData) return prevCartData;

        const updatedItems = prevCartData.cart_items.map(item =>
          item.product_cart_id === selectedCartItem.product_cart_id
            ? {...item, variant: newVariant}
            : item,
        );

        return {...prevCartData, cart_items: updatedItems};
      });

      Alert.alert('Size updated successfully!');
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating size:', error);
      Alert.alert('Failed to update size. Please try again.');
    }
  };

  const updateQuantity = async (cartItem: CartItem, increment: boolean) => {
    const newQuantity = increment
      ? cartItem.quantity + 1
      : cartItem.quantity - 1;

    if (newQuantity < 1) {
      Alert.alert('Invalid Quantity', 'Quantity cannot be less than 1!');
      showMessage({
        message: 'Quantity cannot be less than 1!',
        type: 'danger',
      });
      return;
    }

    const url = `https://go-devil-backend.iqsetters.com/cart/quantity/${cartItem.product_cart_id}/`;
    const data = {quantity: newQuantity};

    setIsLoading(true);
    try {
      const response = await api.patch(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.msg === 'Quantity updated successfully') {
        showMessage({
          message: response.data.msg,
          type: 'success',
        });

        // Update local cart state (optional)
        setCartData(prevCartData => {
          if (!prevCartData) return prevCartData;

          const updatedItems = prevCartData.cart_items.map(item =>
            item.product_cart_id === cartItem.product_cart_id
              ? {...item, quantity: newQuantity}
              : item,
          );

          return {...prevCartData, cart_items: updatedItems};
        });
      } else {
        ({
          message: response.data.msg,
          type: 'success',
        });
        showMessage({
          message: response.data.message,
          type: 'danger',
        });
      }
    } catch (error) {
      //@ts-ignore
      const errorMessage = error?.message;
      showMessage({
        message: errorMessage,
        type: 'danger',
      });
    }
  };

  const RemoveFromCart = async (txt: any) => {
    const url = `https://go-devil-backend.iqsetters.com/cart/${txt}/`; // Replace with your API endpoint
    // console.log('155',url)
    // setIsLoading(true);

    try {
      const response = await api.delete(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setIsLoading(false);
      

      if (response.data.message == 'Item removed from cart successfully') {
        showMessage({
          message: response.data.message,
          type: 'success',
        });
        setIsLoading(false);
        setRefresh(true);
      } else if (response.data.message == 'No items in cart for this user') {
        showMessage({
          message: response.data.message,
          type: 'danger',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      setRefresh(true);
      // Alert.alert(error);
    }
  };

  if (!isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (cartData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{color: colors.red}}>No data Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartData.cart_items}
        keyExtractor={item => item.product_cart_id.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '30%'}}>
                {item?.images?.length > 0 && (
                  <Image
                    source={{
                      uri: `https://go-devil-backend.iqsetters.com${item.images[0].product_image}`,
                    }}
                    style={styles.image}
                  />
                )}
              </View>
              <View style={{width: '65%'}}>
                <View style={[styles.priceView, {padding: 5}]}>
                  <Text style={styles.priceText}>{item.price}</Text>
                  <Text
                    style={[
                      styles.priceText,
                      {
                        textDecorationLine: 'line-through',
                        color: colors.grey,
                      },
                    ]}>
                    $3599.00
                  </Text>
                </View>
                <View style={[styles.saveView, {padding: 5}]}>
                  <Text style={styles.saveText}>You saved $1980 !</Text>
                </View>
                <Text
                  style={[
                    styles.productText,
                    {fontFamily: fonts.bold, fontSize: 14, marginTop: 5},
                  ]}>
                  {item.product.product_name}
                </Text>
                <View style={{flexDirection: 'row', margin: 10}}>
                  <TouchableOpacity
                    style={[styles.sizeView, {width: '35%', padding: 0}]}
                    onPress={() => {
                      setSelectedCartItem(item);
                      setModalVisible(true);
                    }}
                    // onPress={() => setModalVisible(true)}
                  >
                    <Text style={styles.saveText}>
                      SIZE :{item.variant.size}
                    </Text>
                  </TouchableOpacity>

                  <View style={[styles.sizeView, {width: '50%'}]}>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => updateQuantity(item, false)}>
                        <Text style={styles.buttonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => updateQuantity(item, true)}>
                        <Text style={styles.buttonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <Text
                  style={[
                    styles.productText,
                    {fontFamily: fonts.medium, fontSize: 12, marginBottom: 10},
                  ]}>
                  {/* {item.deliver} */}
                </Text>
              </View>
              <View style={{width: '5%', marginTop: 15}}>
                <Icon.IonIcon
                  onPress={() => RemoveFromCart(item?.product_cart_id)}
                  name="trash"
                  size={22}
                  color={colors.red}
                />
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <>
            {cartData?.cart_items?.length > 0 ? (
              <View style={{marginBottom: 10}}>
                <Divider
                  style={{backgroundColor: colors.white, marginTop: 5}}
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
                      Discount
                    </Text>
                  </View>
                  <View style={{width: '30%'}}>
                    <Text
                      style={[
                        styles.productText,
                        {
                          fontFamily: fonts.medium,
                          fontSize: 16,
                          color: colors.grey,
                        },
                      ]}>
                      ${cartData?.total_discount?.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 5}}>
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
                      ${cartData?.total_price?.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    width: '95%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    height: 130,
                    bottom: 50,
                  }}>
                  <TouchableOpacity
                    // onPress={createOrder}
                    onPress={() => navigation.navigate('PaymentScreen')}
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
                <Divider
                  style={{backgroundColor: colors.white, marginTop: -75}}
                />
              </View>
            ) : null}
          </>
        )}
      />

      {/* Modal for Changing Size */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Size</Text>
            <ScrollView>
              {selectedCartItem?.available_variant.map(variant => (
                <TouchableOpacity
                  key={variant.variant_id}
                  style={styles.sizeOption}
                  onPress={() => updateCartSize(variant.size)}>
                  <Text style={styles.sizeText}>{variant.size}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}>
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
    // padding: 16,
    backgroundColor: colors.primary,
  },

  detailsContainer: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  variant: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: colors.white,
  },
  changeSizeButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#007BFF',
    borderRadius: 4,
  },
  changeSizeText: {
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  savedText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    marginTop: 5,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalDiscount: {
    fontSize: 14,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  sizeOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sizeText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalCloseButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8,
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
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  quantityButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
    borderRadius: 0,
  },

  actionButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.white,
    marginHorizontal: 10,
    marginTop: 12,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    margin: 10,
    color: colors.white,
    fontFamily: fonts.bold,
    marginLeft: 20,
  },
  sizeText1: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: colors.white,
    marginHorizontal: 10,
    // marginBottom: 10,
    // marginTop: 10,height:25
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
  // sizeText: {
  // fontSize: 16,
  // fontFamily: fonts.bold,
  // color: colors.white,
  // },
  productText: {
    color: colors.white,
    marginLeft: 15,
  },

  saveView: {
    backgroundColor: colors.red,
    marginLeft: 15,
    marginTop: 5,
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
  itemContainer: {
    backgroundColor: colors.drakgrey,
    marginTop: 10,
    padding: 10,
  },
});

export default CartScreen;
