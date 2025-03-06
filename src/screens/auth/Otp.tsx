import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Appbar, Divider} from 'react-native-paper';
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
import {CustomButton, Title} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {userLogin} from '../../redux/actions/authAction';
import {showMessage} from 'react-native-flash-message';
import {
  loginValue,
  resetMessage,
  resetSuccess,
} from '../../redux/reducers/authSlice';
import {useSnackbar} from '../../components/Snackbar';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const CELL_COUNT = 4;

const Otp = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const navigation = useNavigation<NavigationProp>();

  const {params} = useRoute<RouteProp<AuthScreenParamList, 'Otp'>>();
  // @ts-ignore
  const userData = JSON.parse(params?.item ?? '');

  const {
    loading,
    error: reducerError,
    userToken,
    success,
  } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const {showSnackbar} = useSnackbar();

  const OtpValidationSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^\d+$/, 'OTP must only contain numbers')
      .length(CELL_COUNT, `OTP must be ${CELL_COUNT} digits long`)
      .required('OTP is required'),
  });

  const formik = useFormik({
    initialValues: {otp: ''},
    validationSchema: OtpValidationSchema,
    onSubmit: async values => {
      try {
        const response = await dispatch(
          userLogin({
            login_input: userData.login_input,
            otp: values.otp,
          }),
        ).unwrap(); // Unwrap to catch errors

        showSnackbar(response.msg || 'Login successful', {
          backgroundColor: '#4CAF50',
        });
        // @ts-ignore
        navigation.navigate('Conformation');
        //   , {
        //   item: JSON.stringify(values),
        // });
      } catch (error) {
        showSnackbar(error?.data?.msg, {
          backgroundColor: '#F44336',
        });
      }
    },
  });

  const [canResend, setCanResend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  const handleResendOtp = async () => {
    const login_input = userData?.login_input;

    if (!login_input) {
      showMessage({
        message: 'Mobile number is required.',
        type: 'danger',
      });
      return;
    }

    try {
      const response = await dispatch(userLogin({login_input})).unwrap();

      if (response?.msg) {
        showMessage({
          message: response.msg,
          type: 'success',
        });

        setCanResend(false);
        setTimeLeft(120);
      }
    } catch (error) {
      showMessage({
        // @ts-ignore
        message: error?.data?.msg || 'Failed to resend OTP',
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    // @ts-ignore
    let timer;
    if (!canResend && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            // @ts-ignore
            clearInterval(timer);
            setCanResend(true);
            return 120;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    // @ts-ignore
    return () => clearInterval(timer);
  }, [canResend, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const ref = useBlurOnFulfill({
    value: formik.values.otp,
    cellCount: CELL_COUNT,
  });
  const handleSetValue = (text: string) => {
    formik.setFieldValue('otp', text);
  };
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: formik.values.otp,
    setValue: handleSetValue,
  });

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
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkTheme ? '#28282B' : 'whitesmoke'},
      ]}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />
      <Title title="OTP Verfication" hasBackAction={true} />

      <Text style={styles.titles}>
        We have just send you 4 digits code to your Phone number{' '}
        {userData?.login_input
          ? userData.login_input.replace(/\d(?=\d{4})/g, 'x')
          : 'xxxxxx6789'}
      </Text>

      <View style={{margin: 15}}>
        <View>
          {/* OTP Input Field using react-native-confirmation-code-field */}

          <CodeField
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
                    borderBottomColor: isDarkTheme ? 'white' : 'black',
                    color: isDarkTheme ? 'white' : 'black',
                  },
                  isFocused && {borderBottomColor: colors.blue},
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? '|' : '')}
              </Text>
            )}
          />
          {/* Display validation error if any */}
          {formik.touched.otp && formik.errors.otp && (
            <Text style={styles.errorText}>{formik.errors.otp}</Text>
          )}

          <CustomButton
            title="CONTINUE"
            style={{marginTop: 50}}
            onPress={formik.handleSubmit}
            disabled
            loading={loading}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.medium,
            color: canResend ? colors.blue : 'gray',
            marginTop: 10,
            margin: 10,
            marginLeft: '16%',
          }}>
          Don't recevied the code?{' '}
          <Text
            onPress={() => handleResendOtp()}
            style={{
              fontSize: 14,
              fontFamily: fonts.medium,
              color: canResend ? colors.red : colors.red,
              marginTop: 10,
              margin: 10,
            }}>
            {canResend
              ? 'Resend OTP'
              : `Resend OTP in ${minutes}:${
                  seconds < 10 ? `0${seconds}` : seconds
                }`}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  titles: {
    marginHorizontal: '5%',
    marginTop: 20,
    marginBottom: 30,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 25,
  },
  cell: {
    width: 60,
    height: 40,
    lineHeight: 38,
    fontSize: 18,
    borderBottomWidth: 1,
    textAlign: 'center',
    fontFamily: fonts.semibold,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  focusCell: {
    borderColor: '#000',
  },

  forgotText: {
    color: colors.red,
    textAlign: 'center',
    marginTop: '10%',
    fontSize: 16,
    fontFamily: fonts.medium,
  },
});
