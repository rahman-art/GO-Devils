import {Image, StyleSheet, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import {fonts} from '../theme';

const EmptyMessage = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Image
        source={require('../assets/images/empty.png')}
        style={{width: 300, height: 300, marginTop: '40%'}}
        resizeMode="cover"
      /> */}
      <Text
        style={{
          fontFamily: fonts.semibold,
          fontSize: 20,
          color: isDarkTheme == true ? 'white' : 'black',
          textAlign: 'center',
        }}>
        No Data available
      </Text>
    </View>
  );
};

export default EmptyMessage;

const styles = StyleSheet.create({});
