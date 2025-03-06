import {
    Alert,
    FlatList,
    Image,
    ImageBackground,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  
  //helpers
  import api from '../../../api';
  import {colors, fonts, Icon} from '../../../theme';
  import {useAppDispatch, useAppSelector} from '../../../hooks';
  import {
    GetCartList,
    RemoveCart,
    updateCart,
  } from '../../../redux/actions/cartAction';
  import {showMessage} from 'react-native-flash-message';
  import { CartResponse } from '../../../types/cart';
  
  
  const CartCard = ({item}: {item: CartResponse}) => {
   
    const theme = useColorScheme();
    const isDarkTheme = theme === 'dark';
    const [selectedSize, setSelectedSize] = useState('S'); // Default size
    const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
    const [modalVisible1, setModalVisible1] = useState(false);
    
    const sizes = ['S', 'M', 'L', 'XL', 'XLL', '3XL', '4XL', '5XL']; 
    // @ts-ignore
    const handleSizeChange = size => {
      setSelectedSize(size);
      setModalVisible(false); 
    };
  
    const dispatch = useAppDispatch();
    
    const RemoveFromCart = async () => {
      try {
        const response = await dispatch(RemoveCart(item?.cart_items[0]?.variant.variant_id)).unwrap();
      
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
  
    const incrementQty = async () => {
      try {
        const response = await dispatch(updateCart({quantity: +1, id: item?.cart_items[0]?.variant_id}));
        if (response.payload.msg) {
          showMessage({
            message: response.payload.msg,
            type: 'success',
          });
        }
        if (!response.payload.msg) {
          showMessage({
            message: 'Do not have more stocks',
            type: 'danger',
          });
        }
      } catch (error) {
        console.error('Error updating cart:', error);
        Alert.alert('An unexpected error occurred. Please try again.');
      }
    };
  
    const decrementQty = async () => {
      try {
        const response = await dispatch(updateCart({quantity: -1, id: item?.cart_items[0]?.variant_id}));
        if (response.payload.msg) {
          showMessage({
            message: response.payload.msg,
            type: 'success',
          });
        }
      } catch (error) {
        console.error('Error updating cart:', error);
        Alert.alert('An unexpected error occurred. Please try again.');
      }
    };
  
    return (
      <View style={styles.itemContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '30%'}}>
            {/* <ImageBackground
               source={{
                uri:
                  'https://go-devil-backend.iqsetters.com' +
                  item?.cart_items[0]?.images[0]?.product_image
              }}
              style={{
                width: '100%',
                height: 180,
                marginTop: 10,
                marginBottom: 5,
                marginHorizontal: 0,
              }}></ImageBackground> */}
          </View>
          <View style={{width: '65%'}}>
            <View style={[styles.priceView, {padding: 5}]}>
              <Text
                style={[
                  styles.priceText,
                  {color: colors.white, marginHorizontal: 5},
                ]}>
                {/* $3599.00 */}
                {/* {item} */}
              </Text>
              <Text
                style={[
                  styles.priceText,
                  {textDecorationLine: 'line-through', color: colors.drakgrey},
                ]}>
                $3599.00
              </Text>
            </View>
            <View style={[styles.saveView, {padding: 5}]}>
              <Text style={styles.saveText}>You saved 
                {/* {item?.cart_items[0]?.variant?.discount} */}
                 !</Text>
            </View>
            <Text
              style={[
                styles.productText,
                {fontFamily: fonts.bold, fontSize: 14, marginTop: 5},
              ]}>
             {/* {item?.cart_items[0]?.product?.product_name} */}
            
            </Text>
            <View style={{flexDirection: 'row', margin: 10}}>
              <TouchableOpacity
                style={[styles.sizeView, {width: '35%', padding: 0}]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.saveText}>SIZE : {selectedSize}</Text>
              </TouchableOpacity>
  
              <View style={[styles.sizeView, {width: '50%'}]}>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={decrementQty}
                    // disabled={item?.cart_items[0]?.quantity <= 1}
                    >
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>
                    {/* {item?.cart_items[0]?.quantity} */}
                    </Text>
                  <TouchableOpacity style={styles.button} onPress={incrementQty}>
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
              // onPress={() => setModalVisible1(true)}
              // name="ellipsis-vertical"
              size={22}
              color={colors.red}
            />
          </View>
        </View>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '85%'}}>
                  <Text style={styles.modalTitle}>Select a Size</Text>
                </View>
                <View style={{width: '15%'}}>
                  <Icon.IonIcon
                    onPress={() => setModalVisible(false)}
                    name="close-outline"
                    size={22}
                    color={colors.white}
                  />
                </View>
              </View>
              <FlatList
                data={sizes}
                horizontal
                keyExtractor={item => item}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.sizeOption}
                    onPress={() => handleSizeChange(item)}>
                    <Text style={styles.sizeText1}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  export default CartCard;
  
  const styles = StyleSheet.create({
    cartList: {
      marginBottom: 20,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 8,
      borderColor: '#ddd',
      borderWidth: 1,
    },
    itemDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemName: {
      fontSize: 16,
      fontFamily: fonts.bold,
      flex: 0.9,
      width: 230,
    },
    itemPrice: {
      fontFamily: fonts.medium,
      color: colors.primary,
    },
    discountedPrice: {
      fontSize: 16,
      fontFamily: fonts.bold,
      color: colors.green,
    },
    priceView: {
      backgroundColor: colors.primary,
      marginLeft: 15,
      marginTop: 10,
      width: '65%',
      flexDirection: 'row',
    },
    itemFooter: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    qtyControls: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    qtyBtn: {
      fontSize: 22,
      borderWidth: 1,
      borderColor: colors.grey,
      borderRadius: 5,
      marginHorizontal: 5,
      textAlign: 'center',
      width: 30,
    },
    qtyText: {
      fontSize: 18,
    },
    priceText: {
      fontSize: 14,
      fontFamily: fonts.bold,
    },
    priceDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    priceLabel: {
      fontSize: 16,
      fontFamily: fonts.medium,
    },
    finalPrice: {
      fontSize: 18,
      fontFamily: fonts.bold,
      color: colors.green,
    },
    divider: {
      borderBottomColor: colors.grey,
      borderBottomWidth: 1,
      marginVertical: 10,
    },
    itemContainer: {
      backgroundColor: colors.drakgrey,
      marginTop: 10,
      padding: 10,
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

    },
    modalContent: {
      width: '95%',
      backgroundColor: colors.primary,
      borderRadius: 10,
      padding: 16,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 14,
      marginBottom: 10,
      fontFamily: fonts.medium,
      color: colors.white,
    },
    sizeOption: {
      // padding: 10,
      marginVertical: 5,
      marginHorizontal: 10,
      backgroundColor: colors.primary,
      borderColor: colors.white,
      borderWidth: 1,
      borderRadius: 30,
      alignItems: 'center',
      width: 50,
      height: 50,
      justifyContent: 'center',
    },
  
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
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
    quantity: {
      fontSize: 18,
      fontFamily: fonts.bold,
      color: colors.white,
    },
    container: {
      flex: 1,
      backgroundColor: colors.primary,
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
    sizeText: {
      fontSize: 16,
      fontFamily: fonts.bold,
      color: colors.white,
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
  });
  