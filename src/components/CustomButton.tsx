import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';

//helpers
import {colors, fonts} from '../theme';

type ButtonProp = {
  title?: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
};

const CustomButton = (props: ButtonProp) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={!props.disabled}
      onPress={props.onPress}
      style={[
        styles.container,
        props.style,

        {backgroundColor: props.disabled ? colors.red : colors.grey},
      ]}>
      {props.loading ? (
        <ActivityIndicator color={colors.white} size="small" />
      ) : (
        <Text style={styles.title}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 50,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignSelf: 'center',
    //alignItems: 'center',
  },
  title: {
    margin: 10,
    color: colors.white,
    fontFamily: fonts.bold,
  },
});

export default CustomButton;
