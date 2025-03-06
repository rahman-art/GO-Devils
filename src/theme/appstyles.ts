import {StyleSheet} from 'react-native';
import fonts from './fonts';
import colors from './colors';

export default StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    //backgroundColor: 'white',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
  },
  errorText: {
    fontFamily: fonts.medium,
    color: colors.red,
  },
});
