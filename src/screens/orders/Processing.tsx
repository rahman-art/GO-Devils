import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import React from 'react';
import OrderCard from './components/OrderCard';

const Processing = () => {

  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  return (
    <View style={{
      flex: 1,
      backgroundColor: isDarkTheme == true ? '#28282B' : 'whitesmoke',
    }}>
      <OrderCard item={''} status="Processing" />
    </View>
  );
};

export default Processing;

const styles = StyleSheet.create({});