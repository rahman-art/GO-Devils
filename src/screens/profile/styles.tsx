import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,flex:1
  },
title:{
    fontFamily:fonts.bold,
    color:colors.white,
    fontSize:18,marginHorizontal:10,
    marginTop:10
}  ,
title1:{
    fontFamily:fonts.medium,
    color:colors.white,
    fontSize:12,marginHorizontal:10,marginTop:10,
    letterSpacing:1,gap:2
}  
});

export default styles;
