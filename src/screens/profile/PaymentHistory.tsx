import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

//helpers
import {fonts, Icon} from '../../theme';
import {Title} from '../../components';
import {AuthScreenParamList} from '../../routes/RouteType';

// Sample payment data
const payments = [
  {id: '1', title: 'Payment for Plants', amount: '$20', status: 'success'},
  {
    id: '2',
    title: 'Payment for Gardening Service',
    amount: '$15',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Payment for Fertilizers',
    amount: '$30',
    status: 'failed',
  },
  {id: '4', title: 'Payment for Tools', amount: '$50', status: 'success'},
  {id: '5', title: 'Payment for Seeds', amount: '$25', status: 'failed'},
];

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const PaymentHistory = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const navigation = useNavigation<NavigationProp>();

  // Function to render each payment item
  const renderItem = ({
    item,
  }: {
    item: {title: string; amount: string; status: string};
  }) => {
    return (
      <View
        style={[
          styles.card,
          {backgroundColor: isDarkTheme == true ? 'black' : 'white'},
        ]}>
        <Text
          style={[
            styles.title,
            {color: isDarkTheme == true ? 'white' : 'black'},
          ]}>
          {item.title}
        </Text>
        <Text
          style={[
            styles.amount,
            {color: isDarkTheme == true ? 'white' : 'black'},
          ]}>
          {item.amount}
        </Text>
        <View style={styles.statusContainer}>
          {getStatusIcon(item.status)}
          <Text style={[styles.status, getStatusStyle(item.status)]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>
    );
  };

  // Function to get status icon based on status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <Icon.MaterialIcons name="check-circle" size={24} color="green" />
        );
      case 'pending':
        return (
          <Icon.MaterialIcons name="hourglass-empty" size={24} color="orange" />
        );
      case 'failed':
        return <Icon.MaterialIcons name="cancel" size={24} color="red" />;
      default:
        return null;
    }
  };

  // Function to determine the style based on payment status
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'success':
        return styles.success;
      case 'pending':
        return styles.pending;
      case 'failed':
        return styles.failed;
      default:
        return {};
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkTheme == true ? '#28282B' : 'whitesmoke',
      }}>
     <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />
      <Title
        title="Payments History"
        hasBackAction={true}
        onBackPress={() => navigation.goBack()}
        actions={[
          {icon: 'bell', onPress: () => navigation.navigate('Notification')},
        ]}
      />
      <FlatList
        data={payments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle= {{margin: 10}}
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 4, // Add elevation for Android shadow
    shadowColor: '#000', // Shadow properties for iOS
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.bold,
    marginBottom: 4,
  },
  amount: {
    fontSize: 18,
    fontFamily: fonts.bold,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontSize: 14,
    marginLeft: 8,
  },
  success: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
  failed: {
    color: 'red',
  },
});

// Export the component
export default PaymentHistory;
