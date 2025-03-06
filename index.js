/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {navigationRef} from './src/routes/RootNavigation';

async function onMessageReceived(message) {
  const {notification} = message;

  console.log(notification);

  notifee.displayNotification({
    title: notification.title,
    body: notification.body,
    android: {
      channelId: 'orders',
    },
  });
}

notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log(data);
  if (type === EventType.PRESS) {
    await notifee.cancelNotification(detail.notification.id);
  }
});

notifee.onForegroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    const data = detail.notification.data;
    console.log(data);

    if (data.screen == 'notification') {
      navigationRef?.navigate('Notification');
    }
    await notifee.cancelNotification(detail.notification.id);
  }
});

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

AppRegistry.registerComponent(appName, () => App);
