import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Title} from '../../../components';
import styles from '../styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthScreenParamList } from '../../../routes/RouteType';
import { useNavigation } from '@react-navigation/native';
type NavigationProp = StackNavigationProp<AuthScreenParamList>;
const Retruns = () => {
   const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />
      <Title title="RETURNS & CANCELLATION" hasBackAction    actions={[
    
    {
      icon: 'home-outline',
      onPress: () => navigation.navigate('BottomNavigator'),
    },
  ]} />
      <ScrollView>
        <Text style={styles.title}>
          WHAT ARE THE TERMS OF THE EXCHANGE POLICY?
        </Text>
        <Text style={styles.title1}>
          We offer 10 days hassle-free returns & exchange from the date of
          delivery and a further 7 days for the returned product(s) to reach us.
          We also offer reverse pick-up services for which the shipping cost is
          INR 150 which has to be borne by you i.e. the customer.
        </Text>
        <Text style={styles.title1}>
          Pick-up will be attempted twice. If the courier company is unable to
          pick up the shipment. You will have to send the shipment back to the
          company address. Reverse Pick Up is subject to availability of the
          service in your area pin-code.
        </Text>
        <Text style={styles.title1}>
          For COD orders/Prepaid , a coupon code will be provided in the span of
          5 working days from the day of return pickup on your registered e-mail
          address/contact number.
        </Text>
        <Text style={styles.title1}>
          Please return your product(s) in the same condition as it was shipped.
          If the products are returned in poor condition or have clearly been
          worn, a refund would not be provided.
        </Text>
        <Text style={styles.title}>
          Payments made with COD, Prepaid WILL RECEIVE A COUPON CODE WORTH THE
          SAME AS YOUR ORDER VALUE WHICH IS VALID FOR 1 YEAR FROM THE DATE OF
          ISSUANCE OF THE COUPON CODE.
        </Text>
        <Text style={styles.title}>Shipping Charges are Non-Refundable</Text>
        <Text style={styles.title1}>
          You can get in touch with us about any issues at our customer support
          portal or drop us a line at info@godevil.in and we will be happy to
          help. For a faster response, send us a message on Instagram @godevils.
          You can also reach us on info@godevil.in All queries will be solved
          between Monday-Saturday, 10am-6pm. All pending queries will be solved
          on priority the next day.
        </Text>
        <Text style={styles.title1}>
          Please note that we do not solve customer queries on WhatsApp.
          Cancellations will only be possible till the order has not been
          dispatched from our warehouse.
        </Text>
        <Text style={styles.title1}>
          Once a product is exchanged and is delivered, no further actions such
          as exchange or refund would be applicable on that order.
        </Text>
        <Text style={styles.title1}>
          Any items purchased during a promotions wherein free products are
          included, such orders will not be eligible for any returns or
          exchanges.
        </Text>
        <Text style={styles.title}>
          SELF-SHIPPING OF ORDERS FOR RETURNS/EXCHANGE:
        </Text>
        <Text style={styles.title1}>
          &#9679; In case your pincode is non-serviceable for a reverse pick up,
          you’ll have courier the product(s) to the following address: PLOT
          NO.-155H, SEC-7, IMT MANESAR, SEC-7, IMT MANESAR, Haryana, 122001
        </Text>
        <Text style={styles.title1}>
          &#9679; Please ensure the items are packed securely to prevent any
          loss or damage during transit and the ORDER ID and registered mobile
          number is mentioned on the packaging. All items must be in unused
          condition with all original tags attached and packaging intact.
        </Text>
        <Text style={styles.title}>PLEASE NOTE:</Text>
        <Text style={styles.title1}>
          We request that you do not use The Professional Couriers for self
          return as they are not reliable and the package will not be accepted
          at the warehouse. Please make sure your courier costs do not exceed
          the amount stipulated above. We recommend using ‘Speed Post’ as your
          courier service. Speed Post is a Government of India owned entity and
          has the most widely distributed postal network in India.
        </Text>
        <Text style={styles.title}>TERMS AND CONDITIONS</Text>
        <Text style={styles.title1}>
          &#9679; If you have received an SMS or EMAIL of order delivered status
          and if it's not received by you, please email or contact us within 24
          hours. email: info@godevil.in, phone no.: +91 8527009899
        </Text>
        <Text style={styles.title1}>
          &#9679; The customer will be under an obligation to take utmost care
          of the product(s) whilst the products are in their possession. This
          includes all of the product(s) instructions, documents and wrappings
          while returning the product(s) in the same condition as received.
        </Text>
        <Text style={styles.title1}>
          Refunds are initiated once the returned item is received and
          inspected. Refunds will be issued as store credit / coupon code.
          Validity of the store credit will be 1 year. Customer can use the
          store credit to purchase any product from the store.{' '}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Retruns;
