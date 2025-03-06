import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  StatusBar,
  Pressable,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {Title} from '../../components';
import {colors, fonts} from '../../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Logout from '../../components/Logout';
import Delete from '../../components/Delete';
import DeviceInfo from 'react-native-device-info';

let version = DeviceInfo.getVersion();

type MenuItem = {
  id: string;
  title: string;
  icon: string;
  navigateTo?: string;
  url?: string;
};

interface MenuScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const MenuScreen: React.FC<MenuScreenProps> = ({navigation}) => {
  const menuItems: MenuItem[] = [
    {
      id: '1',
      title: 'Edit Profile',
      icon: 'person',
      navigateTo: 'EditProfile',
    },
    {
      id: '2',
      title: 'Wishlist',
      icon: 'heart',
      navigateTo: 'AllLikeThings',
    },
    {
      id: '3',
      title: 'Orders',
      icon: 'cube-outline',
      navigateTo: 'OrderList',
    },

    {
      id: '10',
      title: 'Return Orders',
      icon: 'cube-outline',
      navigateTo: 'ReturnList',
    },

    {
      id: '5',
      title: 'Address',
      icon: 'home',
      navigateTo: 'SaveAddress',
    },

    {
      id: '4',
      title: 'Contact',
      icon: 'call',
      navigateTo: 'HelpSupport',
    },

    {
      id: '6',
      title: 'Privacy Policy',
      icon: 'shield-checkmark-outline',
      url: 'https://godevil.in/policies/privacy-policy',
    },
    {
      id: '7',
      title: 'Terms of Service',
      icon: 'document-text',
      navigateTo: 'TermsOfServices',
    },
    {
      id: '8',
      title: 'Shipping Policy',
      icon: 'swap-horizontal-outline',
      navigateTo: 'ShippingPolicy',
    },
    {
      id: '9',
      title: 'Returns Cancellation',
      icon: 'close-outline',
      navigateTo: 'Retruns',
    },
    // {
    //   id: '10',
    //   title: 'Delete Account',
    //   icon: 'trash-outline',
    //   navigateTo: 'SaveAddress',
    // },
  ];

  const handleMenuItemPress = (screen?: string, url?: string) => {
    if (screen) {
      navigation.navigate(screen);
    } else if (url) {
      Linking.openURL(url);
    }
  };

  const renderItem = ({item}: {item: MenuItem}) => (
    <Pressable onPress={() => handleMenuItemPress(item.navigateTo, item.url)}>
      <View style={styles.menuItem}>
        <Icon
          name={item.icon}
          size={25}
          color={colors.red}
          style={{marginLeft: '3%', marginRight: 10}}
        />
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      <Divider
        style={{
          height: 1,
          backgroundColor: colors.grey,
          width: '100%',
          margin: 2,
        }}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={menuItems}
        style={{marginBottom: 120}}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View>
            <Title
              title=""
              hasBackAction={false}
              // actions={[
              //   {
              //     icon: 'home-outline',
              //     onPress: () => navigation.navigate('BottomNavigator'),
              //   },
              // ]}
            />
          </View>
        }
        ListFooterComponent={
          <View>
            <Delete />
            <View style={styles.socialMediaWrapper}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://www.instagram.com/godevils/')
                }>
                <Icon
                  name="logo-instagram"
                  size={18}
                  color={colors.red}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://www.facebook.com/godevil.in/')
                }>
                <Icon
                  name="logo-facebook"
                  size={18}
                  color={colors.red}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://www.youtube.com/@GoDevil_in')
                }>
                <Icon
                  name="logo-youtube"
                  size={18}
                  color={colors.red}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>
            <Logout />
            <View style={styles.appVersion}>
              <Text style={styles.versionText}>
                App Version: <Text style={styles.versionNumber}>{version}</Text>
              </Text>
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  versionNumber: {
    fontSize: 14,
    color: 'red',
    fontFamily: fonts.medium,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  versionText: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.grey,
  },
  socialMediaWrapper: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginBottom: 10,
  },
  socialIcon: {
    marginHorizontal: 10,
  },

  menuItemText: {
    fontSize: 18,
    color: colors.red,
    fontFamily: fonts.medium,
  },
  appVersion: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default MenuScreen;
