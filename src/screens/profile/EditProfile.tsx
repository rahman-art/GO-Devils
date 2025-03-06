import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Modal,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getProfile} from '../../redux/actions/profileAction';
import api from '../../api';
import {colors, fonts, Icon} from '../../theme';
import {CustomButton, CustomInput, Title} from '../../components';
import {AuthScreenParamList} from '../../routes/RouteType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSnackbar} from '../../components/Snackbar';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const ProfileScreen = () => {
  const {showSnackbar} = useSnackbar();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const {profileInfo, loading} = useAppSelector(state => state.profile);
  const {userToken} = useAppSelector(state => state.auth);

  const [fadeAnim] = useState(new Animated.Value(0));

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Fetch profile once on mount
    dispatch(getProfile(''));
  }, [dispatch]);

  const AddressSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    phone_number: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number is not valid')
      .required('Mobile number is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      first_name: profileInfo?.first_name || '',
      last_name: profileInfo?.last_name || '',
      phone_number: profileInfo?.phone_number?.toString() || '',
      email: profileInfo?.email || '',
    },
    enableReinitialize: true,
    validationSchema: AddressSchema,
    onSubmit: async values => {
     

      try {
        const requestBody = {
          first_name:
            profileInfo?.first_name !== values.first_name
              ? values.first_name
              : undefined,
          last_name:
            profileInfo?.last_name !== values.last_name
              ? values.last_name
              : undefined,
          phone_number:
            profileInfo?.phone_number?.toString() !== values.phone_number
              ? values.phone_number
              : undefined,
          email: profileInfo?.email !== values.email ? values.email : undefined,
        };

        // Remove undefined fields
        const filteredRequest = Object.fromEntries(
          Object.entries(requestBody).filter(
            ([_, value]) => value !== undefined,
          ),
        );

        if (Object.keys(filteredRequest).length === 0) {
          showSnackbar('No changes to update', {
            backgroundColor: colors.blue,
          });
          return;
        }

        const response = await api.patch('auth/users/', filteredRequest);

        if (response.data.success && response.data.msg === 'Record Updated.') {
          showSnackbar('Profile updated successfully', {
            backgroundColor: colors.green,
          });

          dispatch(getProfile('')); // Refresh profile data
          navigation.goBack();
        } else {
          showSnackbar(response.data.msg, {
            backgroundColor: colors.green,
          });
        }
      } catch (error) {
        

        showSnackbar('Failed to update profile', {
          backgroundColor: colors.red,
        });
        console.error(error);
      }
    },
  });
  const handleChangeImage = () => {};
  const storeImage = async (imageUrl: any) => {
    try {
      await AsyncStorage.setItem('selectedImage', imageUrl);
    } catch (error) {
      console.error('Error storing image: ', error);
    }
  };
  const SelectedImage = (imageUrl: any) => {
    setSelectedImage(imageUrl);
    storeImage(imageUrl);
    setIsVisible(false);
  };
  useEffect(() => {
    // Enable button only if values are changed
    const {first_name, phone_number, email} = formik.values;
    const isChanged =
      first_name !== profileInfo?.first_name ||
      phone_number !== profileInfo?.phone_number?.toString() ||
      email !== profileInfo?.email;

    setIsButtonDisabled(!isChanged);
  }, [formik.values, profileInfo]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.red} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />
      <Title
        title="Profile"
        hasBackAction
        actions={[
          {
            icon: 'home-outline',
            onPress: () => navigation.navigate('BottomNavigator'),
          },
        ]}
      />

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Profile updated successfully!</Text>
          <CustomButton title="OK" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              marginTop: 20,
            }}>
            {/* Display Selected Image or Initial Option */}
            {selectedImage ? (
              <TouchableOpacity
                onPress={handleChangeImage}
                style={{
                  borderWidth: 0.5,
                  borderColor: 'grey',
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: selectedImage}}
                  style={{width: 60, height: 60, borderRadius: 30}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : (
              <>
                {/* First Image View */}
                <TouchableOpacity
                  onPress={() =>
                    SelectedImage(
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s',
                    )
                  }
                  style={{
                    borderWidth: 0.5,
                    borderColor: 'grey',
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s',
                    }}
                    style={{width: 60, height: 60, borderRadius: 30}}
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                {/* Conditionally Render "or" Text and Second Image View */}
                {isVisible && (
                  <>
                    <Animated.View style={{opacity: fadeAnim}}>
                      <Text>or</Text>
                    </Animated.View>
                    <Animated.View
                      style={{
                        opacity: fadeAnim,
                        borderWidth: 0.5,
                        borderColor: 'grey',
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          SelectedImage(
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvhRtMu2kfXZoCWKicfbHPozOzmtCiPZI0kg&s',
                          )
                        }>
                        <Image
                          source={{
                            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvhRtMu2kfXZoCWKicfbHPozOzmtCiPZI0kg&s',
                          }}
                          style={{width: 60, height: 60, borderRadius: 30}}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    </Animated.View>
                  </>
                )}
              </>
            )}
          </View>
          <View style={styles.formContainer}>
            <CustomInput
              label="First Name"
              placeholder=""
              value={formik.values.first_name}
              onChangeText={formik.handleChange('first_name')}
              onBlur={formik.handleBlur('first_name')}
              error={formik.errors.first_name}
            />
            <CustomInput
              label="Last Name"
              placeholder=""
              value={formik.values.last_name}
              onChangeText={formik.handleChange('last_name')}
              onBlur={formik.handleBlur('last_name')}
              error={formik.errors.last_name}
            />
            <CustomInput
              label="Mobile Number"
              placeholder=""
              keyboardType="numeric"
              value={formik.values.phone_number}
              onChangeText={formik.handleChange('phone_number')}
              onBlur={formik.handleBlur('phone_number')}
              error={formik.errors.phone_number}
            />
            <CustomInput
              autoCapitalize="none"
              label="Email Address"
              placeholder=""
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              error={formik.errors.email}
            />
          </View>
          <View style={{margin: 0, justifyContent: 'flex-end'}}>
            <View
              style={{
                marginTop: 30,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CustomButton
                disabled={!isButtonDisabled}
                style={{width: '100%'}}
                title="CONTINUE"
                onPress={formik.handleSubmit}
                loading={loading}
              />
              <Icon.AntDesign
                name="arrowright"
                size={20}
                color={colors.white}
                style={{position: 'absolute', marginLeft: '90%'}}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.primary, padding: 16},
  formContainer: {marginVertical: 16},
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  loadingText: {marginTop: 10, fontSize: 16, color: colors.red},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {fontSize: 18, marginBottom: 20, color: colors.white},
});

export default ProfileScreen;
