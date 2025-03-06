import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  useColorScheme,
} from 'react-native';
import {Button, Dialog, Divider, Portal} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

// helpers
import {useAppDispatch, useAppSelector} from '../hooks';
import {logout} from '../redux/reducers/authSlice';
import CustomButton from './CustomButton';
import {colors, fonts, Icon} from '../theme';
import {showMessage} from 'react-native-flash-message';
import {userLogout} from '../redux/actions/authAction';
import axios from 'axios';

const Logout = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const toggleModal = () => setVisible(!visible);
  const {userToken} = useAppSelector(state => state.auth);

  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const handlelogout = async () => {
    try {
      const response = await axios.post(
        'https://go-devil-backend.iqsetters.com/auth/users/logout/',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      if (response.data?.message) {
        showMessage({
          message: response.data.message,
          type: 'success',
        });
      }
      dispatch(logout());
      toggleModal();
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Logout failed';
      showMessage({
        message: errorMessage,
        type: 'danger',
      });
    }
  };

  return (
    <View style={{}}>
      <View
        style={{
          // width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <CustomButton
          disabled
          style={{width: '100%', marginHorizontal: 10}}
          title="LOGOUT"
          onPress={toggleModal}
        />
        <Icon.AntDesign
          name="logout"
          size={20}
          color={colors.white}
          style={{position: 'absolute', marginLeft: '90%'}}
        />
      </View>

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={toggleModal}
          style={{
            backgroundColor: colors.primary,
            borderColor: colors.grey,
            borderWidth: 0.5,
          }}>
          <Dialog.Content
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                lineHeight: 24,
                textAlign: 'center',
                color: colors.white,

                fontWeight: '700',
              }}>
              Logout
            </Text>

            <Text
              style={{
                fontWeight: '400',
                textAlign: 'center',
                color: colors.grey,
                marginTop: 10,
                fontSize: 16,
                letterSpacing: 1,
              }}>
              Are you sure you want to logout?
            </Text>

            <View style={{flexDirection: 'row', marginTop: 30}}>
              <Pressable
                style={{
                  width: '48%',
                  height: 45,
                  borderWidth: 0.5,
                  borderColor: colors.white,
                  borderRadius: 0,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 10,
                  margin: 10,
                }}
                onPress={toggleModal}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: colors.white,
                    fontFamily: fonts.bold,
                    fontSize: 16,
                    fontWeight: '700',
                  }}>
                  Cancel
                </Text>
              </Pressable>

              <CustomButton
                disabled
                title="Logout"
                onPress={() => {
                  handlelogout();
                }}
                style={{
                  width: '48%',
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: 60,
    borderRadius: 10,
  },
});

export default Logout;
