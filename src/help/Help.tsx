import React, {useState} from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Divider, } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { AuthScreenParamList } from '../routes/RouteType';
import { colors, fonts, Icon } from '../theme';
import { Title } from '../components';

//helpers
// import {Title} from '../../components';
// import {colors, fonts, Icon} from '../../theme';
// import {AuthScreenParamList} from '../../routes/RouteType';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const Help = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const handlePhonePress = () => {
    const phoneNumber = 'tel:${1234567890}'; 
    Linking.openURL(phoneNumber).catch(err =>
      console.error('Error occurred', err),
    );
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
        title="Here To Help"
        hasBackAction={true}
      />
      <View style={{margin: 15}}>
        <Text
          style={{
            fontFamily: fonts.semibold,
            fontSize: 25,
            color: isDarkTheme == true ? 'white' : 'black',
          }}>
          Still cant find your answer? ask our customer service
        </Text>
        <View
          style={{
            marginTop: 50,
          }}>
          <Pressable
          // @ts-ignore
            onPress={() => navigation.navigate('Faq')}
            style={{
              flexDirection: 'row',
              //justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20
            }}>
            <Icon.MaterialIcons
              name="question-mark"
              size={20}
              color={isDarkTheme == true ? 'white' : 'black'}
            />
            <View style={{marginLeft: 10}}>
              <Text
                style={[
                  styles.head,
                  {color: isDarkTheme == true ? 'white' : 'black'},
                ]}>
                Visit our help section
              </Text>
              <Text
                numberOfLines={2}
                style={[
                  styles.subText,
                  {color: isDarkTheme == true ? 'whitesmoke' : colors.grey},
                ]}>
                FAQs & Help
              </Text>
            </View>
          </Pressable>
          <Divider
            style={{
              height: 1,
              marginTop: 20,

              backgroundColor: isDarkTheme ? 'white' : colors.grey,
            }}
          />
          <Pressable
            onPress={() => navigation.navigate('HelpSupport')}
            style={{
              flexDirection: 'row',
              //justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20

            }}>
            <Icon.MaterialIcons
              name="chat"
              size={20}
              color={isDarkTheme == true ? 'white' : 'black'}
            />
            <View style={{marginLeft: 10}}>
              <Text
                style={[
                  styles.head,
                  {color: isDarkTheme == true ? 'white' : 'black'},
                ]}>
                Chat with an agent
              </Text>
              <Text
                numberOfLines={2}
                style={[
                  styles.subText,
                  {color: isDarkTheme == true ? 'whitesmoke' : colors.grey},
                ]}>
                Start Chat
              </Text>
            </View>
          </Pressable>
          <Divider
            style={{
              height: 1,
              marginTop: 20,
              backgroundColor: isDarkTheme ? 'white' : colors.grey,
            }}
          />
         
        </View>
      </View>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  head: {
    fontFamily: fonts.semibold,
    letterSpacing: 1,
  },
  subText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    letterSpacing: 1,
    width: 200,
  },
});
