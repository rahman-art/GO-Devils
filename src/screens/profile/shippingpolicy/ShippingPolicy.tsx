import {StatusBar, Text, View} from 'react-native';
import React from 'react';
import styles from '../styles';
import {Title} from '../../../components';
import {ScrollView} from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthScreenParamList } from '../../../routes/RouteType';
import { useNavigation } from '@react-navigation/native';
type NavigationProp = StackNavigationProp<AuthScreenParamList>;
const ShippingPolicy = () => {
   const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />
      <Title title="Shipping Policy" hasBackAction    actions={[
    
    {
      icon: 'home-outline',
      onPress: () => navigation.navigate('BottomNavigator'),
    },
  ]} />
      <ScrollView>
        <Text style={styles.title}>
          How long will it take for my order to arrive?
        </Text>
        <Text style={styles.title1}>
          Orders placed are usually shipped out from our warehouse
          within 2 working days (Mon-Sat).
        </Text>
        <Text style={styles.title1}>
         Those placed later or on a Sunday or on Public holidays are
          processed and shipped out on the next working day.
        </Text>
        <Text style={styles.title1}>
          Once shipped out from our warehouse, deliveries usually happen
          within 5-7 working days depending on your location.
        </Text>
        <Text style={styles.title1}>
       If your shipping address is in a remote area that is not
          easily accessible by regular courier companies, the delivery of your
          order may take a little longer.
        </Text>
        <Text style={styles.title1}>
         In case of unforeseen circumstances such as strikes, natural
          disasters, acts of God or inter-galactic rioting, the delivery time
          may increase by a few days.
        </Text>
        <Text style={styles.title}>How do I track my order?</Text>
        <Text style={styles.title1}>
         You will receive an e-mail with your courier tracking link
          once your order is shipped out from our warehouse. You can also find
          the tracking information from your Order History page.
        </Text>
        <Text style={styles.title1}>
         Do check your e-mail spam folder in case you can't find the
          e-mail from us.
        </Text>
        <Text style={[styles.title1, {marginTop: 10}]}>
          Contact- info@godevil.in
        </Text>
      </ScrollView>
    </View>
  );
};

export default ShippingPolicy;
