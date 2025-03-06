import {Modal, Pressable, StatusBar, Text, useColorScheme, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFormik} from 'formik';

//helpers
import api from '../../api';
import {colors, fonts, Icon} from '../../theme';
import {CustomButton, CustomInput, Title} from '../../components';
import {addressInitialValidation} from './formik';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {GetAddress, GetPrimaryAddress} from '../../redux/actions/addressAction';
import {AuthScreenParamList} from '../../routes/RouteType';
import {AddressDetails} from '../../types/address';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const EditAddress = () => {
  const route = useRoute();
  const [visible, setVisible] = useState(false);
  const {addressDetails} = route.params as {addressDetails: AddressDetails};
  const navigation = useNavigation<NavigationProp>();
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.address);

  useEffect(() => {
    dispatch(GetAddress(addressDetails?.address_id));
  }, []);

  const formik = useFormik({
    initialValues: {
      full_name: addressDetails?.full_name || '',
      phone_primary: addressDetails?.phone_primary?.toString() || '',
      pin_code: addressDetails?.pin_code?.toString() || '',
      state: addressDetails?.state || '',
      city: addressDetails?.city || '',
      address_line_1: addressDetails?.address_line_1 || '',
      country: addressDetails?.country || '',
      address_type: addressDetails?.address_type || 'home',
      land_mark: addressDetails?.land_mark || '',
    },
    validationSchema: addressInitialValidation,
    onSubmit: async () => {
      try {
        const response = await api.patch(
          `address/update/${addressDetails.address_id}/`,
          {
            full_name: formik.values.full_name,
            phone_primary: Number(formik.values.phone_primary),
            pin_code: Number(formik.values.pin_code),
            state: formik.values.state,
            city: formik.values.city,
            address_line_1: formik.values.address_line_1,
            country: formik.values.country,
            address_type: formik.values.address_type,
            land_mark: formik.values.land_mark,
          },
        );
       

        if (response.data.msg) {
          setVisible(true);

          formik.resetForm();
          dispatch(GetAddress(''));
          dispatch(GetPrimaryAddress(''));
        } else {
          // console.log('Failed to update address:', response.data);
        }
      } catch (error) {
        console.error('Error updating address:', error);
      }
    },
  });

  useEffect(() => {
    if (addressDetails) {
      formik.setValues({
        full_name: addressDetails.full_name || '',
        phone_primary: addressDetails.phone_primary?.toString() || '',
        pin_code: addressDetails.pin_code?.toString() || '',
        state: addressDetails.state || '',
        city: addressDetails.city || '',
        address_line_1: addressDetails.address_line_1 || '',
        country: addressDetails.country || '',
        address_type: addressDetails.address_type || 'home',
        land_mark: addressDetails.land_mark || '',
      });
    }
  }, [addressDetails]);

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
        title="Edit Addresses"
        hasBackAction={true}
        onBackPress={() => navigation.goBack()}
        actions={[
    
          {
            icon: 'home-outline',
            onPress: () => navigation.navigate('BottomNavigator'),
          },
        ]}
      />

<Modal visible={visible} animationType="fade" transparent={true}>
        <View
          style={{
            margin: 20,
            backgroundColor: colors.drakgrey,
            borderRadius: 0,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            marginTop: '70%',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fonts.bold,
              color: 'whitesmoke',
              textAlign: 'center',
              marginTop: 20,
            }}>
            You have been successfully update your address.
          </Text>
          <CustomButton
            style={{marginTop: 20,justifyContent:'center',alignItems:'center'}}
            disabled
            onPress={() => {
              navigation.navigate('SaveAddress');
              setVisible(false);
            }}
            title="OK"
          />
        </View>
      </Modal>

      <View
        style={{
          margin: 10,
        }}>
        <View>
          <CustomInput
            label="Full Name"
            placeholder=""
            onChangeText={formik.handleChange('full_name')}
            onBlur={formik.handleBlur('full_name')}
            value={formik.values.full_name}
            error={formik.errors.full_name}
            containerStyle={{marginTop: -20, marginHorizontal: 10}}
          />

          <CustomInput
            label="Mobile number"
            placeholder=""
            keyboardType="numeric"
            onChangeText={value =>
              formik.setFieldValue('phone_primary', Number(value))
            }
            onBlur={formik.handleBlur('phone_primary')}
            value={formik.values.phone_primary?.toString() || ''}
            containerStyle={{marginTop: 0, marginHorizontal: 10}}
            error={formik.errors.phone_primary}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              marginTop: 0,
            }}>
            <CustomInput
              label="Address"
              placeholder=""
              onChangeText={formik.handleChange('address_line_1')}
              onBlur={formik.handleBlur('address_line_1')}
              value={formik.values.address_line_1}
              error={formik.errors.address_line_1}
              containerStyle={{marginTop: 0, marginHorizontal: 10}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              marginTop: 0,
            }}>
            <CustomInput
              label="State"
              placeholder=""
              onChangeText={formik.handleChange('state')}
              onBlur={formik.handleBlur('state')}
              value={formik.values.state}
              containerStyle={{width: '45%', marginLeft: 10}}
              error={formik.errors.state}
            />

            <CustomInput
              placeholder="City"
              onChangeText={formik.handleChange('city')}
              onBlur={formik.handleBlur('city')}
              value={formik.values.city}
              containerStyle={{width: '45%', marginRight: 10}}
              error={formik.errors.city}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              marginTop: 0,
            }}>
            <CustomInput
              label="Country"
              placeholder=""
              onChangeText={formik.handleChange('country')}
              onBlur={formik.handleBlur('country')}
              value={formik.values.country}
              containerStyle={{width: '45%', marginLeft: 10}}
              error={formik.errors.country}
            />

            <CustomInput
              label="Pincode"
              placeholder=""
              onChangeText={formik.handleChange('pin_code')}
              onBlur={formik.handleBlur('pin_code')}
              value={formik.values.pin_code}
              containerStyle={{width: '45%', marginRight: 10}}
              error={formik.errors.pin_code}
            />
          </View>

          <CustomInput
          
            label="Land Mark"
            placeholder=""
            onChangeText={formik.handleChange('land_mark')}
            onBlur={formik.handleBlur('land_mark')}
            value={formik.values.land_mark}
            containerStyle={{marginTop: 0, marginHorizontal: 10}}
            error={formik.errors.land_mark}
          />

          <View style={{marginTop: 10}}>
            <Text
              style={{
                color: colors.red,
                fontFamily: fonts.semibold,
              }}>
              Types of address
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                gap: 20,
                marginTop: 10,
              }}>
              <Pressable
                onPress={() => formik.setFieldValue('address_type', 'home')}
                style={{
                  padding: 5,
                  borderWidth: 1,
                  borderColor:
                    formik.values.address_type === 'home'
                      ? colors.grey
                      : isDarkTheme
                      ? 'whitesmoke'
                      : colors.grey,
                  borderRadius: 100,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 10,
                  alignItems: 'center',
                  backgroundColor:
                    formik.values.address_type === 'home'
                      ? colors.red
                      : 'transparent',
                }}>
                <Icon.AntDesign
                  name="home"
                  size={15}
                  color={
                    formik.values.address_type === 'home'
                      ? 'white'
                      : isDarkTheme
                      ? 'white'
                      : colors.grey
                  }
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fonts.regular,
                    color:
                      formik.values.address_type === 'home'
                        ? 'white'
                        : isDarkTheme
                        ? 'whitesmoke'
                        : colors.grey,
                  }}>
                  Home
                </Text>
              </Pressable>

              <Pressable
                onPress={() => formik.setFieldValue('address_type', 'office')}
                style={{
                  padding: 5,
                  borderWidth: 1,
                  borderColor:
                    formik.values.address_type === 'office'
                      ? colors.red
                      : isDarkTheme
                      ? 'whitesmoke'
                      : colors.grey,
                  borderRadius: 100,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 10,
                  alignItems: 'center',
                  backgroundColor:
                    formik.values.address_type === 'office'
                      ? colors.red
                      : 'transparent',
                }}>
                <Icon.MaterialCommunityIcons
                  name="office-building"
                  size={15}
                  color={
                    formik.values.address_type === 'office'
                      ? 'white'
                      : isDarkTheme
                      ? 'white'
                      : colors.grey
                  }
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fonts.regular,
                    color:
                      formik.values.address_type === 'office'
                        ? 'white'
                        : isDarkTheme
                        ? 'whitesmoke'
                        : colors.grey,
                  }}>
                  Office
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Buttons */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CustomButton
                style={{width: '100%'}}
                title="CONTINUE"
                onPress={formik.handleSubmit}
                loading={loading}
                disabled
              />
              <Icon.AntDesign
                name="arrowright"
                size={20}
                color={colors.white}
                style={{
                  position: 'absolute',
                  marginLeft: '90%',
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditAddress;
