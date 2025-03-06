import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Modal,
  Pressable,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {colors, fonts, Icon} from '../../../theme';
import {CustomButton, CustomInput} from '../../../components';

const OrderCard = ({item, status}: {item: any; status: string}) => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const getStatusColor = () => {
    switch (status) {
      case 'Pending':
        return 'orange';
      case 'Processing':
        return 'grey';
      case 'Shipped':
        return 'blue';
      case 'Delivered':
        return 'green';
      case 'Cancelled':
        return 'red';
      default:
        return isDarkTheme ? 'white' : 'black';
    }
  };

  return (
    <View style={{flex: 1}}>
      <Pressable
        style={{
          borderRadius: 8,
          margin: 10,

          marginTop: 10,
          backgroundColor: isDarkTheme ? 'black' : 'white',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          // borderWidth: isDarkTheme ? 1 : 0,
          // borderColor: 'white'
        }}>
        <View style={{margin: 10, marginLeft: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <Image
              source={{
                uri: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL3Jhd3BpeGVsb2ZmaWNlM19waG90b19vZl9hX3lvdW5nX2luZGlhbl9tYW5fd2VhcmluZ19jYXN1YWxfY2xvdF9jM2YxZGVlOC01ZmQzLTQzYmUtOGEwZC1kN2RhZGZlN2ZlODMucG5n.png',
              }}
              style={{width: 30, height: 30, borderRadius: 15}}
              resizeMode="cover"
            /> */}
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.bold,
                color: isDarkTheme ? 'white' : 'black',
                marginLeft: 10,
              }}>
              Maali
            </Text>
          </View>

          <Text
            style={{
              fontSize: 12,
              fontFamily: fonts.bold,
              color: isDarkTheme ? 'white' : colors.grey,
              marginTop: 10,
            }}>
            Time duration :{' '}
            <Text
              style={{
                color: isDarkTheme ? 'whitesmoke' : colors.grey,
                fontFamily: fonts.regular,
              }}>
              2 Hours
            </Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.regular,
                color: isDarkTheme ? 'white' : colors.grey,
                marginTop: 10,
              }}>
              Timing of arrival :
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.bold,
                color: 'green',
                marginRight: 50,
              }}>
              Rs.200
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: fonts.semibold,
              color: isDarkTheme ? 'white' : colors.grey,
              marginTop: 10,
            }}>
            From :
            <Text
              style={{
                color: isDarkTheme ? 'whitesmoke' : colors.grey,
                fontFamily: fonts.regular,
              }}>
              {' '}
              10:30 AM
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: fonts.semibold,
              color: isDarkTheme ? 'white' : colors.grey,
              marginTop: 10,
            }}>
            To :
            <Text
              style={{
                color: isDarkTheme ? 'whitesmoke' : colors.grey,
                fontFamily: fonts.regular,
              }}>
              {' '}
              12:30 PM
            </Text>
          </Text>
          {/* Display status based on the passed prop */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                padding: 5,
                borderWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                width: 100,
                borderRadius: 20,
                borderColor: getStatusColor(),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 100,
                  backgroundColor: getStatusColor(),
                  margin: 5,
                }}></View>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.semibold,
                  color: getStatusColor(),
                }}>
                {status}
              </Text>
            </View>
            {status === 'Ongoing' && (
              <Pressable
                onPress={() => setModalVisible(true)}
                style={{
                  backgroundColor: 'red',
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  alignSelf: 'flex-end',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: fonts.semibold,
                    fontSize: 14,
                  }}>
                  Cancel
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
      <Modal
        visible={modalVisible}
        animationType="slide"
        style={{}}
        transparent>
        <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1}}>
          <View
            style={{
              justifyContent: 'center',

              width: '100%',
              flex: 1,
            }}>
            <View
              style={{
                padding: 10,
                backgroundColor: isDarkTheme ? colors.black : colors.white,
                borderRadius: 8,
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.2,
                shadowRadius: 0.5,
                margin: 15,
              }}>
              <Pressable
                style={{alignItems: 'flex-end'}}
                onPress={() => setModalVisible(false)}>
                <Icon.AntDesign name="close" size={20} />
              </Pressable>
              <CustomInput
                containerStyle={{width: '100%'}}
                label="Reson"
                placeholder="Enter Your reason"
              />
              <CustomButton disabled title="SUBMIT" style={{marginTop: 20}} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderCard;