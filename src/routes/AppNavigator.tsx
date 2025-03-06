import React, {Suspense, useEffect, useState} from 'react';
import {ActivityIndicator, Text, useColorScheme, View} from 'react-native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

//helpers
import {colors} from '../theme';
import {AuthScreenParamList} from './RouteType';
import {useAppSelector} from '../hooks';

// screens
import SplashScreen from '../screens/SplashScreen';
import ResetPassword from '../screens/auth/forgot/ResetPassword';
import Notification from '../screens/notification/Notification';
import DrawerNavigator from './DrawerNavigator';
import Cart from '../screens/cart/Cart';
import LoginType from '../screens/auth/LoginType';
import EmailLogin from '../screens/auth/EmailLogin';
import PhoneLogin from '../screens/auth/PhoneLogin';
import ProductDetails from '../screens/productDetails/ProductDetails';
import Similarproduct from '../screens/SimilarProducts/Similarproduct';
import Otp from '../screens/auth/Otp';
import EditProfile from '../screens/profile/EditProfile';
import SaveAddress from '../screens/address/SaveAddress';
import EditAddress from '../screens/address/EditAddress';
import AddNewAddress from '../screens/address/AddNewAddress';
import Drop from '../screens/drop/Drop';
import OrderTrack from '../screens/orders/OrderTrack';
import LikeThings from '../screens/favourite/LikeThings';
import AllLikeThings from '../screens/favourite/AllLikeThings';
import Products from '../screens/product/Products';
import Category from '../screens/category/Category';
import SubCategory from '../screens/category/SubCategory';
import HelpSupport from '../help/HelpSupport';
import ChatCard from '../help/ChatCard';
import Help from '../help/Help';
import HelpNext from '../help/HelpNext';
import WinterCollection from '../screens/home/winter/WinterCollection';
import RatingReview from '../screens/ratingReview/AddReviews';
import OfferBanner from '../screens/offerBanner/OfferBanner';
import PaymentScreen from '../screens/cart/PaymentScreen';
import OrderList from '../screens/orders/OrderList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Retruns from '../screens/profile/retruns/Retruns';
import TermsOfServices from '../screens/profile/termsofServices/TermsOfServices';
import ShippingPolicy from '../screens/profile/shippingpolicy/ShippingPolicy';
import AllOfferBanner from '../screens/drop/AllOfferBanner';
import ProductDetail1 from '../screens/withoutSignup/ProductDetails1';
import WinterCollection1 from '../screens/withoutSignup/WinterCollection1';
import AddReviews from '../screens/ratingReview/AddReviews';
import Reviews from '../screens/ratingReview/Reviews';
import ReturnScreen from '../screens/cart/ReturnScreen';
import ReturnList from '../screens/orders/ReturnList';
import ReturnComplete from '../screens/cart/ReturnComplete';

const HomeScreen1 = React.lazy(
  () => import('../screens/withoutSignup/HomeScreen1'),
);
const BottomNavigator = React.lazy(() => import('./BottomNavigator'));

const Stack = createStackNavigator<AuthScreenParamList>();

const AppNavigator = ({}) => {
  const theme = useColorScheme();

  const {userToken} = useAppSelector(state => state.auth);

  const [isFirstOpen, setIsFirstOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstOpen = async () => {
      const firstOpen = await AsyncStorage.getItem('isFirstOpen');
      if (firstOpen === null) {
        await AsyncStorage.setItem('isFirstOpen', 'false');
        setIsFirstOpen(true);
      } else {
        setIsFirstOpen(false);
      }
    };

    checkFirstOpen();
  }, []);

  // if (isFirstOpen === null) {
  //   // Show a loading indicator while checking the first open state
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator color={'red'} size="large" />
  //       <Text style={{color: 'red'}}>Loading....</Text>
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{}}>
        {userToken ? (
          <Stack.Group>
            <Stack.Screen
              name="BottomNavigator"
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}>
              {() => (
                <Suspense
                  fallback={
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.primary,
                      }}>
                      <ActivityIndicator color={'red'} size="large" />
                      <Text style={{color: 'red'}}>Loading...</Text>
                    </View>
                  }>
                  <BottomNavigator />
                </Suspense>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigator}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Notification"
              component={Notification}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Similarproduct"
              component={Similarproduct}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="SubCategory"
              component={SubCategory}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Reviews"
              component={Reviews}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="RatingReview"
              component={RatingReview}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddReviews"
              component={AddReviews}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Products"
              component={Products}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SaveAddress"
              component={SaveAddress}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EditAddress"
              component={EditAddress}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddNewAddress"
              component={AddNewAddress}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Drop"
              component={Drop}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="OrderTrack"
              component={OrderTrack}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="LikeThings"
              component={LikeThings}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AllLikeThings"
              component={AllLikeThings}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Category"
              component={Category}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="HelpSupport"
              component={HelpSupport}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ChatCard"
              component={ChatCard}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Help"
              component={Help}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="HelpNext"
              component={HelpNext}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="WinterCollection"
              component={WinterCollection}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="OfferBanner"
              component={OfferBanner}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="PaymentScreen"
              component={PaymentScreen}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="OrderList"
              component={OrderList}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ShippingPolicy"
              component={ShippingPolicy}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Retruns"
              component={Retruns}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ReturnScreen"
              component={ReturnScreen}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ReturnList"
              component={ReturnList}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ReturnComplete"
              component={ReturnComplete}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TermsOfServices"
              component={TermsOfServices}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AllOfferBanner"
              component={AllOfferBanner}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            {isFirstOpen && (
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{
                  ...TransitionPresets.SlideFromRightIOS,
                  headerShown: false,
                }}
              />
            )}

            <Stack.Screen
              name="LoginType"
              component={LoginType}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="EmailLogin"
              component={EmailLogin}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Otp"
              component={Otp}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="PhoneLogin"
              component={PhoneLogin}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="HomeScreen1"
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}>
              {() => (
                <Suspense
                  fallback={
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.primary,
                      }}>
                      <ActivityIndicator color={'red'} size="large" />
                      <Text style={{color: 'red'}}>Loading...</Text>
                    </View>
                  }>
                  <HomeScreen1 />
                </Suspense>
              )}
            </Stack.Screen>

            <Stack.Screen
              name="ProductDetail1"
              component={ProductDetail1}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="WinterCollection1"
              component={WinterCollection1}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
