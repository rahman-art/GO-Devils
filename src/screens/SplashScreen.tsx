import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenParamList} from '../routes/RouteType';
import {colors} from '../theme';
import Video from 'react-native-video';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const SplashScreen = ({}) => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LoginType');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
       <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />
      <Video
          source={require('../assets/images/video.mp4')}
          style={styles.video}
          resizeMode="contain"
          repeat={true}
          muted={false}
          controls={false}
          paused={false}
        />
      {/* <Image
        source={require('../assets/images/logo.png')}
        style={{width: '100%', height: 300}}
        resizeMode="contain"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
  video: {
    width: '100%',
    height: 200, // Adjust height as needed
    // borderRadius: 8,
    flex: 1,
  },
});

export default SplashScreen;
