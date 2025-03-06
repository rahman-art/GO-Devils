import {View, Text, SafeAreaView, useColorScheme} from 'react-native';
import React from 'react';

//helpers
import {fonts, Icon} from '../theme';

const Network = (): React.JSX.Element => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Icon.Feather
          name="wifi-off"
          size={40}
          color={isDarkTheme == true ? 'black' : 'white'}
        />
        <Text
          style={{
            fontSize: 18,
            fontFamily: fonts.bold,
            color: isDarkTheme == true ? 'black' : 'white',
          }}>
          No Network Found
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Network;
