import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

//helpers
import {colors, fonts, Icon} from '../../../theme';
import {useAppDispatch} from '../../../hooks';
import {
  GetCartList,
  RemoveCart,
  updateCart,
} from '../../../redux/actions/cartAction';
import {showMessage} from 'react-native-flash-message';
import api from '../../../api';
import {CartState} from '../../../types/cart';
const BagCard = ({item}: any) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [cartData, setCartData] = useState<CartState | null>(null);

  const RemoveFromCart = async () => {
    try {
      const response = await dispatch(
        RemoveCart(item?.product_cart_id),
      ).unwrap();

      if (response.message) {
        showMessage({
          message: response.message,
          type: 'success',
        });
        dispatch(GetCartList(''));
      } else {
        showMessage({
          message: response.error,
          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Something went wrong',
        type: 'danger',
      });
    }
  };


  // const updateQuantity = async (item: any, increment: boolean) => {
  //   const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;

  //   if (newQuantity < 1) {
  //     Alert.alert('Invalid Quantity', 'Quantity cannot be less than 1!');
  //     return;
  //   }

  //   const url = `https://go-devil-backend.iqsetters.com/cart/quantity/${item.product_cart_id}/`;
  //   const data = {quantity: newQuantity};

  //   setIsLoading(true);

  //   try {
  //     const response = await api.patch(url, data, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     console.log('135', response.data);
  //     if (response.data.msg === 'Quantity updated successfully') {
  //       showMessage({
  //         message: response.data.msg,
  //         type: 'success',
  //       });

  //       // Update local cart state (optional)
  //       setCartData(prevCartData => {
  //         if (!prevCartData) return prevCartData;

  //         const updatedItems = prevCartData?.item?.map(item =>
  //           item.product_cart_id === item.product_cart_id
  //             ? {...item, quantity: newQuantity}
  //             : item,
  //         );

  //         return {...prevCartData, cart_items: updatedItems};
  //       });
  //     } else {
  //       ({
  //         message: response.data.msg,
  //         type: 'success',
  //       });
  //       showMessage({
  //         message: response.data.message,
  //         type: 'danger',
  //       });
  //     }
  //   } catch (error) {
  //     //@ts-ignore
  //     const errorMessage = error?.message;
  //     showMessage({
  //       message: errorMessage,
  //       type: 'danger',
  //     });
  //   }
  // };

  return (
    <View style={styles.card}>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '30%'}}>
          {item.images.length > 0 && (
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
            <Text style={styles.saveText}>You saved {item?.discount}% off</Text>
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
              // onPress={() => {
              //   setSelectedCartItem(item);
              //   setModalVisible(true);
              // }}
            >
              <Text style={styles.saveText}>SIZE :{item.variant.size}</Text>
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
            onPress={RemoveFromCart}
            name="trash"
            size={22}
            color={colors.red}
          />
        </View>
      </View>
    </View>
  );
};

export default BagCard;

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
