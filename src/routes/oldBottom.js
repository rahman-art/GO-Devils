import CustomBottomTab from './CustomBottomTab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import Order from '../screens/orders/OrderTrack';
import Search from '../screens/search/Search';
import Menu from '../screens/menu/Menu';
import Notification from '../screens/notification/Notification';
import Cart from '../screens/cart/Cart';
import ProductDetails from '../screens/productDetails/ProductDetails';
import Drop from '../screens/drop/Drop';
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
      })}
      tabBar={props => <CustomBottomTab {...props} />}>
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          options={{tabBarLabel: 'Home'}}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{tabBarLabel: 'Shop'}}
          name="Drop"
          component={Drop}
        />

        <Tab.Screen
          options={{tabBarLabel: 'Cart'}}
          name="Cart"
          component={Cart}
        />

        <Tab.Screen
          options={{tabBarLabel: 'Notification'}}
          name="Notification"
          component={Notification}
        />

        <Tab.Screen
          options={{tabBarLabel: 'Menu'}}
          name="Menu"
          component={Menu}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
export default BottomTabs;
