import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useFormik} from 'formik';
import * as Yup from 'yup';

// helpers
import {AuthScreenParamList} from '../../routes/RouteType';
import {colors, fonts, Icon} from '../../theme';
import {CustomButton, CustomInput, Title} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';

import {
  loginValue,
  resetMessage,
  resetSuccess,
} from '../../redux/reducers/authSlice';
import { showMessage } from 'react-native-flash-message';
import { userLogin } from '../../redux/actions/authAction';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const CELL_COUNT = 4;

const EmailLogin = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const navigation = useNavigation<NavigationProp>();

  const {
    loading,
    error: reducerError,
    userToken,
    success,
  } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object().shape({
    login_input: Yup.string().required('Email is required'),
  });
  
  const formik = useFormik({
    initialValues: {
      login_input: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      // console.log('46',values)
      try {
        const response = await dispatch(userLogin(values)).unwrap();
        
        if (response?.msg) {
          showMessage({
            message: response.msg,
            type: 'success',
          });
        }
       // @ts-ignore
        navigation.navigate('OtpScreen', {
          item: JSON.stringify(values),
        });
      } catch (error) {
      
        // @ts-ignore
        const errorMessage = error?.data?.msg;
        showMessage({
          message: errorMessage,
          type: 'danger',
        });
      }
  
      // navigation.navigate('OtpScreen');
      //  navigation.navigate('OtpScreen')
      // console.log(values);
    },
  });
 

  

  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="dark-content"
      />
      <Title title="LOG IN" hasBackAction={true} />

      <Text style={[styles.text, {marginLeft: 65}]}>
        Lets check if you have an account
      </Text>
      <View style={{margin: 16}}>
        <CustomInput   
        containerStyle={{
          marginHorizontal: 0,
        }} 
        placeholder="Enter your Email"
         label="Email"
         onChangeText={formik.handleChange('login_input')}
         value={formik.values.login_input}
         error={formik.errors.login_input}
         />
        {/* <Text
          style={{
            fontSize: 12,
            fontFamily: fonts.medium,
            color: colors.grey,
            margin: 10,
            marginTop: 10,
          }}>
          Enter OTP
        </Text> */}

        <View>
          {/* OTP Input Field using react-native-confirmation-code-field */}
          {/* <CodeField
            ref={ref}
            {...props}
            value={formik.values.otp}
            onChangeText={formik.handleChange('otp')}
            cellCount={CELL_COUNT}
            rootStyle={styles.otpContainer}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  {
                    borderBottomColor: colors.red,
                    color: colors.red,
                    borderBottomWidth: 1,
                  },
                  isFocused && {borderBottomColor: colors.red},
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? '|' : '')}
              </Text>
            )}
          /> */}
          {/* Display validation error if any */}
          {/* {formik.touched.otp && formik.errors.otp && (
            <Text style={styles.errorText}>{formik.errors.otp}</Text>
          )} */}
          {/* <Text
            style={{
              fontSize: 12,
              fontFamily: fonts.medium,
              color: 'whitesmoke',
              //   marginTop: -5,
              margin: 10,
            }}>
            {canResend
              ? 'Resend OTP'
              : `Resend OTP in ${minutes}:${
                  seconds < 10 ? `0${seconds}` : seconds
                }`}
          </Text> */}
          <View
            style={{
              marginTop: 20,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CustomButton
              disabled
              style={{width: '100%'}}
              title="Continue"
              // onPress={formik.handleSubmit}
              loading={loading}
              onPress={() => navigation.navigate('BottomNavigator')}
            />
            <Icon.AntDesign
              name="arrowright"
              size={20}
              color={colors.black}
              style={{position: 'absolute', marginLeft: '90%'}}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default EmailLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginTop: -10,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 16,
    borderBottomWidth: 0.5,
    textAlign: 'center',
    fontFamily: fonts.semibold,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.red,
  },
});
