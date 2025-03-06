import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

// icons
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// components
import Logout from './Logout';
import {colors, fonts} from '../theme';
import {useAppSelector} from '../hooks';

const List = [
  {
    title: 'Notifications',
    route: 'Notification',
    icon: ({color}: {color: string}) => (
      <IonIcon name="notifications-outline" color={color} size={18} />
    ),
  },
  {
    title: 'My Contracts',
    route: 'ContractNavigator',
    icon: ({color}: {color: string}) => (
      <FontAwesome name="shopping-bag" color={color} size={18} />
    ),
  },
  {
    title: 'Feeds',
    route: 'Feeds',
    icon: ({color}: {color: string}) => (
      <FontAwesome name="feed" color={color} size={18} />
    ),
  },
  // {
  //   title: 'Jobs',
  //   route: 'JobNavigator',
  //   icon: ({color}: {color: string}) => (
  //     <FontAwesome name="calendar-check-o" color={color} size={18} />
  //   ),
  // },
  {
    title: 'My Rating',
    route: 'MyRating',
    icon: ({color}: {color: string}) => (
      <AntDesign name="staro" color={color} size={18} />
    ),
  },
  {
    title: 'Payment',
    route: 'PaymentNavigator',
    icon: ({color}: {color: string}) => (
      <MaterialIcon name="payments" color={color} size={18} />
    ),
  },

  {
    title: 'ChangePassword',
    route: 'ChangePassword',
    icon: ({color}: {color: string}) => (
      <MaterialCommunityIcons name="onepassword" color={color} size={18} />
    ),
  },
  {
    title: 'About us',
    route: 'About',
    icon: ({color}: {color: string}) => (
      <AntDesign name="infocirlceo" color={color} size={18} />
    ),
  },
  {
    title: 'Terms and Privacy',
    route: 'Privacy',
    icon: ({color}: {color: string}) => (
      <IonIcon name="shield-checkmark-outline" color={color} size={18} />
    ),
  },
  {
    title: 'Complaints',
    route: 'Helps',
    icon: ({color}: {color: string}) => (
      <IonIcon name="md-headset" color={color} size={18} />
    ),
  },
];

const CustomSidebarMenu = ({state, ...rest}: any) => {
  const navigation = useNavigation();
  const {userInfo, loading} = useAppSelector(state => state.auth);

  const onRefresh = () => {};

  return (
    <SafeAreaView>
      <View style={styles.sideMenuContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
            }}>
            <View style={{marginLeft: 10}}>
              <Text style={{fontFamily: fonts.semibold, color: '#1E202B'}}>
                Snaurrhman
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: fonts.medium,
                    color: '#14226D',
                  }}>
                  Update profile
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Feather name="chevron-right" size={18} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileHeaderLine} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }>
          {List.map((item, index) => {
            return (
              <Pressable
                key={index}
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      state.index == index ? colors.white : 'transparent',
                  },
                ]}>
                <View>
                  {item.icon({
                    color: state.index == index ? colors.primary : colors.grey,
                  })}
                </View>
                <View style={{flex: 1, marginLeft: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={[styles.text]}>{item.title}</Text>
                    <Feather
                      name="chevron-right"
                      size={18}
                      color={colors.grey}
                    />
                  </View>
                  <Divider style={{marginTop: 10}} />
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        <Logout />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuContainer: {
    height: '100%',
    borderTopRightRadius: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#1e202e',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: '#1e202e',
    left: 21,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 9,
    backgroundColor: '#f9fbff',
    marginTop: 15,
    width: '100%',
  },
  card: {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 16,
    marginTop: 15,
  },
});

export default CustomSidebarMenu;
