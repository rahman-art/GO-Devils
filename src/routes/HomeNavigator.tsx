import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

// screens
import LoginScreen from '../screens/auth/LoginScreen';

//helpers
import {HomeTabParamList} from './RouteType';
import HomeScreen from '../screens/home/HomeScreen';

const Stack = createStackNavigator<HomeTabParamList>();

const HomeNavigator = ({}) => {
  const theme = useColorScheme();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavigator;
