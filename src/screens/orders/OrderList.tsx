import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

//helpers
import {AuthScreenParamList} from '../../routes/RouteType';
import {Title} from '../../components';
import {colors, fonts} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {OrderList} from '../../redux/actions/cartAction';
import {DataOrder} from '../../types/cart';
import {getProfile} from '../../redux/actions/profileAction';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const Tab = createMaterialTopTabNavigator();

const OrderListScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        hidden={false}
        barStyle="light-content"
      />
      <Title
        title="Orders"
        actions={[
          {
            icon: 'home-outline',
            onPress: () => navigation.navigate('BottomNavigator'),
          },
        ]}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: colors.drakgrey},
          tabBarLabelStyle: {color: colors.white, fontFamily: fonts.bold},
          tabBarIndicatorStyle: {backgroundColor: colors.red},
        }}>
        <Tab.Screen
          name="Pending"
          component={OrderListTab}
          initialParams={{status: 'new_order_item'}}
        />
        <Tab.Screen
          name="Completed"
          component={OrderListTab}
          initialParams={{status: 'delivered'}}
        />
        <Tab.Screen
          name="Cancelled"
          component={OrderListTab}
          initialParams={{status: 'cancelled'}}
        />
      </Tab.Navigator>
    </View>
  );
};

const OrderListTab = ({route}: {route: any}) => {
  const {status} = route.params;
  const dispatch = useAppDispatch();
  const {orderlistData, loading} = useAppSelector(state => state.cart);
  const navigation = useNavigation<NavigationProp>();
  const {profileInfo} = useAppSelector(state => state.profile);

  

  useEffect(() => {
    dispatch(OrderList(''));
  }, []);
  useEffect(() => {
    // Fetch profile once on mount
    dispatch(getProfile(''));
  }, [dispatch]);

  const filteredOrders = orderlistData.filter(order => order.status === status);

  const onRefresh = () => {
    dispatch(OrderList(''));
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={'large'} color={colors.red} />
      </View>
    );
  }

  const renderItem = ({item}: {item: DataOrder}) => (
    <View style={styles.orderContainer}>
      {item.items.map(
        (product, index) => (
         
          (
            <>
              <View
                key={index}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                {product.images ? (
                  <Image
                    source={{
                      uri: `https://go-devil-backend.iqsetters.com${product.images}`,
                    }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={[styles.productImage, styles.placeholder]}>
                    <Text style={styles.placeholderText}>No Image</Text>
                  </View>
                )}
                <View style={styles.orderDetails}>
                  <Text style={[styles.productName, {color: colors.white}]}>
                    {product.product_name || 'Unknown Product'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.price}>
                      Rs. {product.price_at_purchase || '0.00'}
                    </Text>
                    <Text style={[styles.price, {color: 'whitesmoke'}]}>
                      Quantity {product.quantity || '0.00'}
                    </Text>
                  </View>
                  <Text style={[styles.status, {color: colors.grey}]}>
                    {item.payment_method || 'N/A'}
                  </Text>
                </View>
              </View>
              {product?.is_return === false && status === 'delivered' && (
                <>
                  <TouchableOpacity
                    style={[
                      styles.cancelButton,
                      !profileInfo?.email && {backgroundColor: 'grey'},
                    ]}
                    onPress={() => {
                      if (profileInfo?.email) {
                        navigation.navigate('ReturnScreen', {
                          item: {
                            order_id: item.order_id, // Send only required order details
                            product: product, // Send only the selected product
                          },
                        });
                      }
                    }}
                    disabled={!profileInfo?.email}>
                    <Text style={styles.cancelButtonText}>Return Order</Text>
                  </TouchableOpacity>
                  {!profileInfo?.email && (
                    <View>
                      <Text
                        style={{
                          color: 'orange',
                          fontSize: 10,
                          textAlign: 'center',
                          fontFamily: fonts.medium,
                          letterSpacing: 1,
                          marginTop: 10,
                        }}>
                        "Please complete your profile to receive a refund coupon
                        via email."
                      </Text>
                      <TouchableOpacity
                        style={[styles.cancelButton, {width: '40%'}]}
                        onPress={() => {
                          navigation.navigate('EditProfile');
                        }}>
                        <Text style={styles.cancelButtonText}>
                          Complete Your Profile
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </>
          )
        ),
      )}
      <Text
        style={[
          styles.status,
          {
            color: colors.white,
            fontFamily: fonts.bold,
            marginTop: -20,
            left: '70%',
            margin: 10,
          },
        ]}>
        Total - Rs. {item.total_amount || 'N/A'}
      </Text>
      <View
        style={{flexDirection: 'row', justifyContent: 'space-between', gap: 5}}>
        {status === 'delivered' && (
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: colors.green, marginTop: 10},
            ]}
            onPress={() => navigation.navigate('RatingReview', {item: item})}>
            <Text style={styles.buttonText}>Add Review</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('OrderTrack', {item})}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        data={filteredOrders}
        renderItem={renderItem}
        keyExtractor={item => item.order_id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{color: colors.red}}>No Data</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.drakgrey,
  },
  orderContainer: {
    backgroundColor: colors.drakgrey,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.grey,
    padding: 10,
  },
  productImage: {
    width: 120,
    height: 110,
    margin: 5,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey,
  },
  placeholderText: {
    color: 'white',
    fontSize: 12,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 15,
    backgroundColor: colors.drakgrey,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: colors.green,
    marginVertical: 5,
  },
  status: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 0,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  cancelButton: {
    backgroundColor: colors.blue,
    //padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    margin: 10,
    width: '25%',
    height: 20,
    justifyContent: 'center',
    marginLeft: 20,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 10,
    fontFamily: fonts.bold,
  },
});

export default OrderListScreen;
