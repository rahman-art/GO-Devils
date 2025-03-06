import React from 'react';
import {} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

// screens
import Notification from '../screens/notification/Notification';

// helpers

import {fonts} from '../theme';
import BottomNavigator from './BottomNavigator';
import {DrawerNavigatorParamList} from './RouteType';
import CustomSidebarMenu from '../components/CustomSidebarMenu';

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomSidebarMenu {...props} />}
      screenOptions={{
        drawerType: 'front',
        headerShown: false,
        drawerActiveBackgroundColor: '#ffffff',
        drawerActiveTintColor: '#000C14',
        drawerLabelStyle: {
          fontFamily: fonts.regular,
          fontSize: 16,
          lineHeight: 24,
          color: '#000C14',
        },
      }}>
      <Drawer.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{}}
      />
      <Drawer.Screen name="Notification" component={Notification} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
