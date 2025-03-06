import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {Dialog, Divider, Portal} from 'react-native-paper';

// helpers
import {useAppDispatch, useAppSelector} from '../hooks';
import {logout} from '../redux/reducers/authSlice';
import CustomButton from './CustomButton';
import {colors, fonts, Icon} from '../theme';
import {showMessage} from 'react-native-flash-message';
import {deleteAccount} from '../redux/actions/profileAction';
import api from '../api';
import axios from 'axios';
const Delete = () => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const toggleModal = () => setVisible(!visible);
  const {userInfo, userToken} = useAppSelector(state => state.auth);


  const deleteAccount = async () => {
    if (!userToken) {
      console.error('Error: userToken is missing or invalid.');
      return;
    }
  
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    };
  
    try {
      const response = await axios.patch(
        'https://go-devil-backend.iqsetters.com/auth/customer/delete/',
        {},
        { headers }
      );
        // @ts-ignore
      if (response.msg) {
        showMessage({
            // @ts-ignore
          message: response.msg,
          type: 'success',
        });
      } else {
        showMessage({
          // @ts-ignore
          message: response?.error,
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

  return (
    <View style={{}}>
      <TouchableOpacity onPress={toggleModal}>
        <View style={styles.menuItem}>
          <Icon.IonIcon
            name="trash-outline"
            size={25}
            color={colors.red}
            style={{marginLeft: '3%', marginRight: 10}}
          />
          <Text style={styles.menuItemText}>Delete Account</Text>
        </View>
        <Divider
          style={{
            height: 1,
            backgroundColor: colors.grey,
            width: '100%',
            margin: 2,
          }}
        />
      </TouchableOpacity>

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={toggleModal}
          style={{
            backgroundColor: colors.primary,
            borderColor: colors.grey,
            borderWidth: 1,
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
              Delete Account
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
              Are you sure you want to Delete Account?
            </Text>

            <View style={{flexDirection: 'row', marginTop: 30}}>
              <Pressable
                style={{
                  width: '48%',
                  height: 45,
                  borderWidth: 0.5,
                  borderColor: colors.grey,
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
                  }}>
                  Cancel
                </Text>
              </Pressable>

              <CustomButton
                disabled
                title="Delete"
                onPress={() => {
                  deleteAccount();
                  dispatch(logout());
                  toggleModal();
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemText: {
    fontSize: 18,
    color: colors.red,
    fontFamily: fonts.medium,
  },
});

export default Delete;
