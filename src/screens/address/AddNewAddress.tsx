import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFormik} from 'formik';

//helpers
import {colors, fonts, Icon} from '../../theme';
import {CustomButton, CustomInput, Title} from '../../components';
import {addressInitialValidation, addressInitialValues} from './formik';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AddAddress} from '../../redux/actions/addressAction';
import {AuthScreenParamList} from '../../routes/RouteType';
import { useSnackbar } from '../../components/Snackbar';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const AddNewAddress = () => {
   const {showSnackbar} = useSnackbar();
  const navigation = useNavigation<NavigationProp>();
  const [visible, setVisible] = useState(false);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.address);

  const formik = useFormik({
    initialValues: addressInitialValues,
    validationSchema: addressInitialValidation,
    onSubmit: values => {
      sendFinalData(values);
    },
  });

  const sendFinalData = async (data: any) => {
    const resultAction = await dispatch(AddAddress(data));
    if (AddAddress.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
        showSnackbar(user?.msg ?? 'Successfully added Address' ,{
                backgroundColor: colors.green, 
              });
    

 

      navigation.navigate('SaveAddress');
      setVisible(true);
    } else {
      if (resultAction.payload) {
        showSnackbar(`Somehting went wrong : ${resultAction.error.message}` ,{
          backgroundColor: colors.red, 
        });
        
      } else {
        showSnackbar(`Somehting went wrong : ${resultAction.error.message}` ,{
          backgroundColor: colors.red, 
        });
    
      }
    }
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
        title="Add Address"
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
            backgroundColor: colors.primary,
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
            You have been successfully added your address.
          </Text>
          {/* <View style={{justifyContent:'center',alignItems:'center'}}> */}
          <CustomButton
            style={{
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disabled
            onPress={() => {
              navigation.navigate('SaveAddress');
              setVisible(false);
            }}
            title="OK"
          />
        </View>

        {/* </View> */}
      </Modal>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              margin: 10,
            }}>
            <View>
              <CustomInput
                label="First Name"
                placeholder=""
                onChangeText={formik.handleChange('full_name')}
                onBlur={formik.handleBlur('full_name')}
                value={formik.values.full_name}
                error={formik.errors.full_name}
                containerStyle={{marginHorizontal: 10}}
              />

              <CustomInput
                label="Mobile Number"
                placeholder=""
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={value =>
                  formik.setFieldValue('phone_primary', Number(value))
                }
                onBlur={formik.handleBlur('phone_primary')}
                value={formik.values.phone_primary?.toString() || ''}
                containerStyle={{marginTop: 0, marginHorizontal: 10}}
                error={formik.errors.phone_primary}
              />
              <CustomInput
                label="Address"
                placeholder=""
                onChangeText={formik.handleChange('address_line_1')}
                onBlur={formik.handleBlur('address_line_1')}
                value={formik.values.address_line_1}
                containerStyle={{marginTop: 0, marginHorizontal: 10}}
                error={formik.errors.address_line_1}
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
                  label="City"
                  placeholder=""
                  onChangeText={formik.handleChange('city')}
                  onBlur={formik.handleBlur('city')}
                  value={formik.values.city}
                  containerStyle={{width: '45%', marginLeft: 10}}
                  error={formik.errors.city}
                />

                <CustomInput
                  label="State"
                  placeholder=""
                  onChangeText={formik.handleChange('state')}
                  onBlur={formik.handleBlur('state')}
                  value={formik.values.state}
                  containerStyle={{width: '45%', marginRight: 10}}
                  error={formik.errors.state}
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
                  maxLength={6}
                  keyboardType="number-pad"
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
                          ? colors.red
                          : isDarkTheme
                          ? 'grey'
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
                    onPress={() =>
                      formik.setFieldValue('address_type', 'office')
                    }
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
                {formik.errors.address_type && (
                  <Text
                    style={{
                      color: colors.red,
                      fontFamily: fonts.regular,
                      fontSize: 12,
                      marginTop: 5,
                    }}>
                    {formik.errors.address_type}
                  </Text>
                )}
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
                    disabled
                    style={{width: '100%'}}
                    title="CONTINUE"
                    onPress={formik.handleSubmit}
                    loading={loading}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({});
