import React from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

//helpers
import {colors, fonts, Icon} from '../../theme';
import {AuthScreenParamList} from '../../routes/RouteType';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const LoginType = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />
      <View style={{margin: 16, marginTop: 50}}>
        <Text
          style={{fontSize: 22, fontFamily: fonts.medium, color: colors.red}}>
          LOG IN
        </Text>

        <Divider style={{backgroundColor: '#666666', marginTop: 20}} />
        <Pressable
          onPress={() => navigation.navigate('EmailLogin')}
          style={styles.rows}>
          <Icon.Fontisto name="email" size={20} color={colors.red} />
          <Text style={styles.text}>Email</Text>
        </Pressable>
        <Divider style={{backgroundColor: '#666666', marginTop: 20}} />
        <Pressable
          onPress={() => navigation.navigate('PhoneLogin')}
          style={styles.rows}>
          <Icon.IonIcon name="call" size={20} color={colors.red} />
          <Text style={styles.text}>Number</Text>
        </Pressable>
        <Divider style={{backgroundColor: '#666666', marginTop: 20}} />
      </View>
      <Pressable onPress={() => navigation.navigate('HomeScreen1')}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: fonts.bold,
            color: colors.red,
            marginHorizontal: 10,
            textAlign: 'center',
          }}>
          Skip Sign In
        </Text>
      </Pressable>
      <View style={{justifyContent: 'flex-end', flex: 1, margin: 10}}>
        <Text
          style={{
            color: colors.grey,
            fontFamily: fonts.regular,
            fontSize: 12,
            lineHeight: 20,
          }}>
          By signing up you agree to our{' '}
          <Text
            style={{
              color: 'whitesmoke',
              textDecorationLine: 'underline',
              lineHeight: 20,
            }}>
            Term & Conditions
          </Text>
          <Text
            style={{
              color: colors.grey,
              fontFamily: fonts.regular,
              fontSize: 12,
              lineHeight: 20,
            }}>
            {' '}
            and our
          </Text>
          <Text
            style={{
              color: 'whitesmoke',
              textDecorationLine: 'underline',
              lineHeight: 20,
            }}>
            {' '}
            Privacy Policy
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginType;

const styles = StyleSheet.create({
  rows: {marginTop: 20, flexDirection: 'row', alignItems: 'center', gap: 10},
  text: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.red,
  },
});
