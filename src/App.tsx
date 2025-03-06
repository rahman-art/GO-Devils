import 'react-native-gesture-handler';
import React, {useEffect, useState, Suspense, lazy} from 'react';
import {
  StatusBar,
  Platform,
  View,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';

// helpers
import AppNavigator from './routes/AppNavigator';
import store, {persistor} from './redux';
import {colors} from './theme';
import {injectStore} from './api';
import Network from './components/Network';
import FlashMessage from 'react-native-flash-message';
import {
  notificationListeners,
  requestUserPermission,
} from './utils/NotificationService';
import {SnackbarProvider} from './components/Snackbar';

async function onAppBootstrap() {
  if (Platform.OS == 'android') {
    await messaging().registerDeviceForRemoteMessages();
  }
  const token = await messaging().getToken();
  // console.log(token);
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    background: 'white',
  },
};

const App = () => {
  injectStore(store);

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setVisible(!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    onAppBootstrap();
  }, []);

  useEffect(() => {
    if (Platform.OS == 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )
        .then(res => {
          if (!!res && res == 'granted') {
            requestUserPermission();
            notificationListeners();
          }
        })
        .catch(error => {
          Alert.alert('something wrong');
        });
    } else {
    }
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar animated barStyle="dark-content" backgroundColor="white" />
      <SnackbarProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PaperProvider theme={theme}>
              <FlashMessage position="top" />

              <AppNavigator />

              {/* {visible ? <Network /> : <AppNavigator />} */}
            </PaperProvider>
          </PersistGate>
        </Provider>
      </SnackbarProvider>
    </SafeAreaProvider>
  );
};

export default App;
