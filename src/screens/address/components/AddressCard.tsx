import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
//helpers
import {colors, fonts, Icon} from '../../../theme';
import {AddressDetails} from '../../../types/address';
import {useAppDispatch} from '../../../hooks';
import {
  GetAddress,
  GetPrimaryAddress,
  makePrimaryAddress,
  RemoveAddress,
} from '../../../redux/actions/addressAction';
import {AuthScreenParamList} from '../../../routes/RouteType';
import {useSnackbar} from '../../../components/Snackbar';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const AddressCard = ({item}: {item: AddressDetails}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const {showSnackbar} = useSnackbar();
  const MakePrimaryAddress = async () => {
    try {
      const response = await dispatch(
        makePrimaryAddress({address_id: item?.address_id}),
      ).unwrap();

      if (response.msg) {
        // showSnackbar(response.msg, {
        //   backgroundColor: colors.green,
        // });

        dispatch(GetAddress(''));
        dispatch(GetPrimaryAddress(''));
        // navigation.navigate('Cart');
      } else {
        showSnackbar('You have already add this product in your cart', {
          backgroundColor: colors.red,
        });
      }
    } catch (error) {
      showSnackbar('You have already add this product in your cart', {
        backgroundColor: colors.red,
      });
    }
  };

  const RemoveAddressData = async () => {
    try {
      const response = await dispatch(RemoveAddress(item?.address_id)).unwrap();

      if (response.msg) {
        showSnackbar(response.msg, {
          backgroundColor: colors.green,
        });
        dispatch(GetAddress(''));
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

  const handleDelivery =(item)=>{
    showSnackbar("Sucessfully add Address..", {
      backgroundColor: colors.green,
    });
      // dispatch(setAddressPayment(item));
      navigation.navigate('Cart');
  }
  return (
    // <View
    //   style={{
    //     backgroundColor: colors.drakgrey,
    //     elevation: 3,
    //     shadowColor: '#000',
    //     shadowOffset: {width: 1, height: 1},
    //     shadowOpacity: 0.2,
    //     shadowRadius: 0.5,
    //     marginHorizontal: 0,
    //     marginBottom: 5,
    //     marginTop: 5,
    //   }}>
    //   <View
    //     style={{
    //       flexDirection: 'row',
    //       justifyContent: 'space-between',
    //       alignItems: 'center',
    //     }}>
    //     <Text
    //       style={{
    //         fontFamily: fonts.semibold,
    //         fontSize: 16,
    //         color: colors.red,
    //         marginHorizontal: 20,
    //         marginBottom: 5,
    //         marginTop: 10,
    //       }}>
    //       Saved Address:
    //     </Text>
    //     <TouchableOpacity
    //       style={{marginHorizontal: 10, marginBottom: 5, marginTop: 10}}
    //       onPress={MakePrimaryAddress}>
    //       <Icon.FontAwesome
    //         name={item.is_primary ? 'dot-circle-o' : 'circle-o'}
    //         size={20}
    //         color={colors.red}
    //       />
    //     </TouchableOpacity>
    //   </View>

    //   <Text
    //     style={[
    //       styles.savedText,
    //       {
    //         color: colors.white,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //         marginBottom: 5,
    //       },
    //     ]}>
    //     Full Name:
    //     <Text
    //       style={{
    //         color: colors.grey,
    //         fontFamily: fonts.medium,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //       }}>
    //       {' '}
    //       {item?.full_name}
    //     </Text>
    //   </Text>
    //   <Text
    //     style={[
    //       styles.savedText,
    //       {
    //         color: colors.white,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //         marginBottom: 5,
    //       },
    //     ]}>
    //     Mobile Number:
    //     <Text
    //       style={{
    //         color: colors.grey,
    //         fontFamily: fonts.medium,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //       }}>
    //       {' '}
    //       +91 {item?.phone_primary}
    //     </Text>
    //   </Text>
    //   <Text
    //     style={[
    //       styles.savedText,
    //       {
    //         color: colors.white,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //         marginBottom: 5,
    //       },
    //     ]}>
    //     Address:
    //     <Text
    //       style={{
    //         color: colors.grey,
    //         fontFamily: fonts.medium,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //       }}>
    //       {' '}
    //       {item?.address_line_1}
    //     </Text>
    //   </Text>
    //   <Text
    //     style={[
    //       styles.savedText,
    //       {
    //         color: colors.white,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //         marginBottom: 5,
    //       },
    //     ]}>
    //     Pin code:
    //     <Text
    //       style={{
    //         color: colors.grey,
    //         fontFamily: fonts.medium,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //       }}>
    //       {' '}
    //       {item?.pin_code}
    //     </Text>
    //   </Text>

    //   <Text
    //     style={[
    //       styles.savedText,
    //       {
    //         color: colors.white,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //         marginBottom: 5,
    //       },
    //     ]}>
    //     State:
    //     <Text
    //       style={{
    //         color: colors.grey,
    //         fontFamily: fonts.medium,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //       }}>
    //       {' '}
    //       {item?.state}
    //     </Text>
    //   </Text>
    //   <Text
    //     style={[
    //       styles.savedText,
    //       {
    //         color: colors.white,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //         marginBottom: 5,
    //       },
    //     ]}>
    //     Country:
    //     <Text
    //       style={{
    //         color: colors.grey,
    //         fontFamily: fonts.medium,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //       }}>
    //       {' '}
    //       {item?.country}
    //     </Text>
    //   </Text>
    //   <Text
    //     style={[
    //       styles.savedText,
    //       {
    //         color: colors.white,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //         marginBottom: 5,
    //       },
    //     ]}>
    //     City:
    //     <Text
    //       style={{
    //         color: colors.grey,
    //         fontFamily: fonts.medium,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //       }}>
    //       {' '}
    //       {item?.city}
    //     </Text>
    //   </Text>
    //   <Text
    //     style={[
    //       styles.savedText,
    //       {
    //         color: colors.white,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //         marginBottom: 5,
    //       },
    //     ]}>
    //     Address Type:
    //     <Text
    //       style={{
    //         color: colors.grey,
    //         fontFamily: fonts.medium,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //       }}>
    //       {' '}
    //       {item?.address_type}
    //     </Text>
    //   </Text>
    //   <Text
    //     style={[styles.savedText, {color: colors.white, marginHorizontal: 10}]}>
    //     Land Mark:
    //     <Text
    //       style={{
    //         color: colors.grey,
    //         fontFamily: fonts.medium,
    //         fontSize: 14,
    //         marginHorizontal: 10,
    //       }}>
    //       {' '}
    //       {item?.land_mark}
    //     </Text>
    //   </Text>
    //   <View
    //     style={{
    //       justifyContent: 'flex-end',
    //       flexDirection: 'row',
    //       alignItems: 'center',
    //       gap: 15,
    //       marginBottom: 10,
    //       marginHorizontal: 10,
    //     }}>
    //     <TouchableOpacity
    //       onPress={() =>
    //         // @ts-ignore
    //         navigation.navigate('EditAddress', {addressDetails: item})
    //       }>
    //       <Icon.Feather name="edit" size={18} color={colors.grey} />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       onPress={RemoveAddressData}
    //       style={{
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         borderColor: 'red',
    //       }}>
    //       <Icon.IonIcon name="trash" size={20} color={colors.grey} />
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <View
      style={{
        backgroundColor: colors.drakgrey,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 0.5,
        marginBottom: 5,
        marginTop: 5,
      }}>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View
          style={{
            marginTop: 5,
            width: '88%',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                styles.savedText,
                {
                  color: colors.white,
                  fontSize: 14,
                  marginHorizontal: 10,
                  marginBottom: 5,
                },
              ]}>
              {item.full_name}{' '}
            </Text>
            <View
              style={{
                padding: 5,
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: colors.red,
              }}>
              <Text
                style={{
                  marginHorizontal: 5,
                  fontSize: 10,
                  textTransform: 'capitalize',
                  color: colors.red,
                  fontFamily: fonts.bold,
                }}>
                {item.address_type}
              </Text>
            </View>
          </View>

          <View style={{width: '83%', marginTop: 5}}>
            <Text
              style={{
                color: colors.grey,
                fontFamily: fonts.medium,
                fontSize: 14,
                marginHorizontal: 10,
              }}>
              {item?.address_line_1},{item?.address_line_2},{item?.city},
              {item?.state},{item?.land_mark},{item?.pin_code}
            </Text>
          </View>

          <View style={{width: '83%', marginTop: 5, marginBottom: 10}}>
            <Text
              style={[
                styles.savedText,
                {
                  color: colors.white,
                  fontSize: 14,
                  marginHorizontal: 10,
                  marginBottom: 5,
                },
              ]}>
              <Text
                style={{
                  color: colors.grey,
                  fontFamily: fonts.medium,
                  fontSize: 14,
                  marginHorizontal: 10,
                }}>
                Mobile:
              </Text>{' '}
              {item.phone_primary}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{marginHorizontal: 10, marginBottom: 5, marginTop: 10}}
          onPress={MakePrimaryAddress}>
          <Icon.FontAwesome
            name={item.is_primary ? 'dot-circle-o' : 'circle-o'}
            size={20}
            color={colors.red}
          />
        </TouchableOpacity>
      </View>

      {item?.is_primary ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              padding: 10,
            }}>
            <Icon.IonIcon
              onPress={() =>
                // @ts-ignore
                navigation.navigate('EditAddress', {addressDetails: item})
              }
              name="pencil-outline"
              size={25}
              style={{
                marginHorizontal: 10,
              }}
              color={colors.red}
              type="MaterialIcons"
            />

            <Icon.IonIcon
              onPress={RemoveAddressData}
              name="trash-outline"
              size={25}
              style={{
                marginHorizontal: 10,
              }}
              color={colors.red}
              type="MaterialIcons"
            />
          </View>
          <View
            style={[
              styles.loginButton,
              {
                backgroundColor: colors.red,
                marginBottom: 10,
                marginTop: 5,
              },
            ]}>
            <TouchableOpacity onPress={handleDelivery}>
              <Text style={styles.loginButtonText}>
                Deliver to this Address
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  savedText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    marginTop: 5,
  },
  loginButton: {
    backgroundColor: 'black',
    width: '90%',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.23,
    shadowRadius: 5.32,
    elevation: 2,
  },
  loginButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: fonts.medium,
  },
});
