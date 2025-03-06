import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

//helpers
import {colors, fonts} from '../theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenParamList} from '../routes/RouteType';
type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const EmptyCart = ({}) => {
  const navigation = useNavigation<NavigationProp>();

  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  return (
    <View style={styles.container}>
      {/* <Image
        // source={require('../assets/images/emptycart.png')}
        style={styles.image}
      /> */}

      <Text
        style={[styles.title, {color: isDarkTheme == true ? 'red' : 'red'}]}>
        Your Cart is Empty!
      </Text>
      <Text
        style={[
          styles.subTitle,
          {color: isDarkTheme == true ? 'whitesmoke' : colors.grey},
        ]}>
        Looks like you haven't added anything yet.
      </Text>

      <TouchableOpacity
        style={styles.shopButton}
        // @ts-ignore
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f0f0f0',
    marginTop: '45%',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
  },
  subTitle: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: fonts.medium,
  },
  shopButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 30,

    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.bold,
  },
});

export default EmptyCart;
