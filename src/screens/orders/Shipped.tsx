import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import React from 'react';
import OrderCard from './components/OrderCard';

const Shipped = () => {

  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  return (
    <View style={{
      flex: 1,
      backgroundColor: isDarkTheme == true ? '#28282B' : 'whitesmoke',
    }}>
      <OrderCard item={''} status="Shipped" />
    </View>
  );
};

export default Shipped;

const styles = StyleSheet.create({});