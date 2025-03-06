import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {userLogin, userOtp} from '../../redux/actions/authAction';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  loginValue,
  resetMessage,
  resetSuccess,
} from '../../redux/reducers/authSlice';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {colors, fonts, Icon} from '../../theme';
import {CustomButton, CustomInput, Title} from '../../components';
import {useSnackbar} from '../../components/Snackbar';

const CELL_COUNT = 4;

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const ref = useBlurOnFulfill({value: otpValue, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otpValue,
    setValue: setOtpValue,
  });
  const {showSnackbar} = useSnackbar();

  const dispatch = useAppDispatch();
  const {userToken, success, message, loading} = useAppSelector(
    state => state.auth,
  );

  const formik = useFormik({
    initialValues: {
      login_input: '',
    },
    validationSchema: Yup.object({
      login_input: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: async () => {
      if (!isOtpSent) {
        // Send OTP
        try {
          const response = await dispatch(
            userLogin({login_input: formik.values.login_input}),
          ).unwrap();

          if (response?.msg) {
            setIsOtpSent(true);
            showSnackbar('OTP has been sent to your email id', {
              backgroundColor: '#4CAF50',
            });
          }
        } catch (error) {
          //@ts-ignore
          const errorMessage = error?.message;
          showSnackbar(errorMessage, {
            backgroundColor: '#F44336',
          });
        }
      } else {
        // Verify OTP
        try {
          const response = await dispatch(
            userOtp({
              login_input: formik.values.login_input,
              otp: otpValue,
            }),
          ).unwrap();
          if (response?.msg) {
            showMessage({
              message: response.msg,
              type: 'success',
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
      }
    },
  });

  const handleResendOtp = async () => {
    if (!isOtpSent) {
      // Send OTP
      try {
        const response = await dispatch(
          userLogin({login_input: formik.values.login_input}),
        ).unwrap();
        if (response?.msg) {
          setIsOtpSent(true);
          Alert.alert('OTP Sent!', 'Please check your email for the OTP.');
        } else {
          Alert.alert('Error', 'Failed to send OTP.');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong!');
      }
    } else {
      // Verify OTP
      try {
        const response = await dispatch(
          userOtp({
            login_input: formik.values.login_input,
            otp: otpValue,
          }),
        ).unwrap();
        if (response?.msg) {
          Alert.alert('Success', 'OTP Verified!');
        } else {
          Alert.alert('Error', 'Invalid OTP.');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong!');
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(resetMessage());
      dispatch(loginValue());
      dispatch(resetSuccess());
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (userToken) {
      dispatch(resetSuccess());
    }
  }, [userToken]);

  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
    }
  }, [success]);

  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />
      <Title title="LOG IN" hasBackAction={true} />
      <View style={{margin: 16}}>
        <CustomInput
          containerStyle={{
            marginHorizontal: 0,
          }}
          placeholder="Enter your Email"
          label="Email"
          placeholderTextColor={colors.red}
          onChangeText={formik.handleChange('login_input')}
          onBlur={formik.handleBlur('login_input')}
          value={formik.values.login_input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {formik.touched.login_input && formik.errors.login_input ? (
          <Text style={styles.error}>{formik.errors.login_input}</Text>
        ) : null}

        <Text style={styles.label}>Enter OTP</Text>
        <CodeField
          ref={ref}
          {...props}
          value={otpValue}
          onChangeText={setOtpValue}
          cellCount={CELL_COUNT}
          rootStyle={[styles.codeFieldRoot, !isOtpSent && styles.disabledInput]}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          editable={isOtpSent}
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[
                styles.cell,
                isFocused && styles.focusCell,
                !isOtpSent && styles.disabledCell,
              ]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? '|' : null)}
            </Text>
          )}
        />

        <TouchableOpacity
          style={[
            styles.button,
            !formik.isValid && !isOtpSent && styles.disabledButton,
          ]}
          onPress={() => formik.handleSubmit()}
          disabled={!formik.isValid && !isOtpSent}>
          <Text style={styles.buttonText}>
            {isOtpSent ? 'Verify OTP' : 'Send OTP'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  label: {
    marginBottom: 8,
    marginTop: 30,
    color: colors.red,
    fontFamily: fonts.semibold,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 0,
    padding: 10,
    marginBottom: 16,
    color: colors.red,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.red,
    padding: 15,
    borderRadius: 0,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  codeFieldRoot: {
    marginTop: 20,
    marginBottom: 20,
    color: colors.red,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderBottomColor: colors.red,
    textAlign: 'center',
    borderRadius: 0,
    color: colors.red,
    fontFamily: fonts.semibold,
  },
  // width: 40,
  // height: 40,
  // lineHeight: 38,
  // fontSize: 16,
  // borderBottomWidth: 0.5,
  // textAlign: 'center',
  // fontFamily: fonts.semibold,
  focusCell: {
    borderColor: colors.grey,
  },
  disabledInput: {
    opacity: 0.5,
  },
  disabledButton: {
    backgroundColor: colors.drakgrey,
  },
  disabledCell: {
    borderColor: colors.drakgrey,
    color: colors.drakgrey,
  },
});

export default LoginScreen;
