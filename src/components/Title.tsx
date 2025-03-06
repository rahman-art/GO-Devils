import * as React from 'react';
import {Appbar, Badge} from 'react-native-paper';
import {Image, useColorScheme, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../theme';

interface TitleProp {
  title?: string;
  onBackPress?: () => void;
  hasBackAction?: boolean;
  subtitle?: string;
  actions?: {
    icon: string;
    onPress: () => void;
    badgeCount?: number | undefined;
  }[];
}

const Title = ({
  title = '',
  hasBackAction = false,
  onBackPress,
  actions = [],
}: TitleProp) => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const navigation = useNavigation();

  return (
    <Appbar.Header style={{backgroundColor: colors.primary}}>
      {hasBackAction ? (
        <Appbar.BackAction
          color={colors.red}
          onPress={() => navigation.goBack()}
        />
      ) : (
        <Image
          source={require('../assets/images/logo48.png')}
          style={{width: 50, height: 50, borderRadius: 0, marginLeft: 10}}
          resizeMode="contain"
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            color: colors.red,
            fontSize: 16,
            fontFamily: fonts.medium,
            marginLeft: 10,
          }}>
          {title}
        </Text>
      </View>
      {actions.map((action, index) => (
        <View key={index} style={{position: 'relative'}}>
          <Appbar.Action
            icon={action.icon}
            onPress={action.onPress}
            color={colors.red}
          />
          {action.badgeCount ? (
            <Badge
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                backgroundColor: 'red',
                zIndex: 1,
              }}>
              {action.badgeCount}
            </Badge>
          ) : null}
        </View>
      ))}
    </Appbar.Header>
  );
};

export default Title;
