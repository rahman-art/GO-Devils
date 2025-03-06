import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../theme';
import Feather from 'react-native-vector-icons/Feather';

type CustomInputProp = {
  label?: string;
  password?: boolean;
  style?: any;
  containerStyle?: ViewStyle;
  error?: string;
  onFocus?: () => void;
};

const CustomInput = (props: TextInputProps & CustomInputProp) => {
  const [active, setActive] = useState<boolean>(false);

  const [visible, setVisible] = useState<boolean>(props.password ?? false);

  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  return (
    <View style={[props.containerStyle]}>
      <Text style={[styles.label, {color: colors.red}]}>{props.label}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
        <TextInput
          {...props}
          onFocus={() => {
            setActive(true);
          }}
          onBlur={() => setActive(true)}
          style={{
            borderWidth: 0.5,
            borderColor: colors.red,

            padding: 15,
            marginVertical: 10,
            color: colors.red,
            width: '100%',
            fontFamily: fonts.medium,
          }}
          secureTextEntry={visible}
          placeholderTextColor={colors.red}
        />

        {props.password && (
          <Feather
            name={visible ? 'eye' : 'eye-off'}
            size={20}
            color={isDarkTheme == true ? 'white' : 'black'}
            onPress={() => setVisible(!visible)}
            style={{right: 30}}
          />
        )}
      </View>
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.medium,
    color: 'black',
    fontSize: 14,
    marginTop: 5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  errorText: {
    color: colors.red,
    fontSize: 10,
    marginTop: -5,
    fontFamily: fonts.medium,
  },
});

export default CustomInput;
