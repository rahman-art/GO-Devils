import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },

  title: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.bold,
    color: colors.red,
  },
  card: {
    width: '48%',
    marginHorizontal: 5,
    height: 410,
    backgroundColor: colors.primary,
    borderRadius: 0,
    elevation: 2,
    // marginLeft: 5,
    borderColor: colors.white,
    borderWidth: 0.5,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 270,
    // backgroundColor: 'red',
    marginBottom: 0,
    resizeMode: 'contain',
  },
  textname: {
    fontSize: 14,
    fontFamily: fonts.medium,
    marginHorizontal: 10,
    color: colors.grey,
  },
  textprice: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
    fontFamily: fonts.medium,
  },
  discountCard: {
    backgroundColor: colors.red,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 45,
  },
  discountText: {
    fontSize: 10,
    color: colors.white,
    fontFamily: fonts.bold,
    width: 30,
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 2,
  },
});

export default styles;
