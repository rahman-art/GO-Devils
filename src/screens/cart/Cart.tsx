import React from 'react';
import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//components
import MyTabBar from '../../components/MyTabBar';

// helpers
import {Title} from '../../components';
import {AuthScreenParamList, ServiceParamList} from '../../routes/RouteType';
import Bag from './Bag';
import {colors, fonts} from '../../theme';
import LikeThings from '../favourite/LikeThings';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const Tab = createMaterialTopTabNavigator<ServiceParamList>();
type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const Cart = ({}) => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />
      <Title
        title=""
        hasBackAction={true}
        actions={[
          {
            icon: 'home-outline',
            onPress: () => navigation.navigate('BottomNavigator'),
          },
        ]}
      />

      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Bag" component={Bag} />
        <Tab.Screen name="WishList" component={LikeThings} />
      </Tab.Navigator>
    </View>
  );
};

export default Cart;
const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: 56,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignSelf: 'center',
    // marginHorizontal: 20,
    //alignItems: 'center',
  },
  title: {
    margin: 10,
    color: colors.white,
    fontFamily: fonts.bold,
    marginLeft: 20,
  },
  listContainer: {
    padding: 10,
  },
  itemBackground: {
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  dropdown: {
    height: 35,
    width: 150,
    borderColor: colors.red,
    borderWidth: 0.5,
    borderRadius: 0,
    paddingHorizontal: 8,
    backgroundColor: colors.primary,
    // margin: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.red,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.red,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  item: {
    width: '100%',
    height: 320,

    // marginBottom: 10,
  },
  backgroundImage: {
    // borderRadius: 10,
    height: 300,
    width: '100%',
  },
  textimage: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
