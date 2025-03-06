import {Pressable, StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, {useEffect} from 'react';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts, Icon} from '../../theme';
import {helpData} from '../../types/help';

const HelpCard = ({item}: {item: helpData}) => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const renderStatus = (status: any) => {
    switch (status) {
      case 'pending':
        return (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FFFAEB',
              padding: 5,
              borderRadius: 0,
              alignItems: 'center',
            }}>
            <Icon.Entypo name="dot-single" size={20} color="#F8D000" />
            <Text
              style={{
                fontFamily: fonts.regular,
                color: 'orange',
                fontSize: 14,
              }}>
              Pending
            </Text>
          </View>
        );
      case 'completed':
        return (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#E6FFE7',
              padding: 5,
              alignItems: 'center',
            }}>
            <Icon.Entypo name="dot-single" size={20} color={colors.green} />
            <Text
              style={{
                fontFamily: fonts.regular,
                color: colors.green,
                fontSize: 12,
              }}>
              Completed
            </Text>
          </View>
        );
      case 'rejected':
        return (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FFFAEB',
              padding: 5,
              borderRadius: 0,
              alignItems: 'center',
            }}>
            <Icon.Entypo name="dot-single" size={20} color="red" />
            <Text
              style={{
                fontFamily: fonts.regular,
                color: 'red',
                fontSize: 12,
              }}>
              Rejected
            </Text>
          </View>
        );
      case 'ongoing':
        return (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FFE8E5',
              padding: 5,
              alignItems: 'center',
            }}>
            <Icon.Entypo name="dot-single" size={20} color="green" />
            <Text
              style={{
                fontFamily: fonts.regular,
                color: 'green',
                fontSize: 12,
              }}>
              Ongoing
            </Text>
          </View>
        );
      default:
        return;
    }
  };

  const navigation = useNavigation();

  return (
    <View>
      <Pressable
        style={{
          padding: 10,
          backgroundColor: colors.drakgrey,
          borderRadius: 0,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.2,
          shadowRadius: 0.5,
          marginBottom: 5,
          marginTop: 5,
        }}
        disabled={item.status == 'pending' || item.status == 'rejected'}
        // @ts-ignore
        onPress={() => navigation.navigate('ChatCard', {item: item})}>
        <View style={{margin: 5}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: 16,
                color: colors.grey,
              }}>
              Ticket :{' '}
              <Text style={{color: colors.white}}>{item.query_id}</Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  color: 'red',
                  fontSize: 12,
                }}>
                {renderStatus(item.status)}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 16,
              fontFamily: fonts.regular,
              letterSpacing: 1,
              color: 'whitesmoke',
            }}>
            {item.query_title}
          </Text>

          <Text
            style={{
              fontSize: 12,
              fontFamily: fonts.regular,
              letterSpacing: 1,
              color: isDarkTheme == true ? 'whitesmoke' : colors.grey,
              textAlign: 'right',
            }}>
            {moment().format('DD-MM-YYYY, hh:m A')}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default HelpCard;

const styles = StyleSheet.create({});
