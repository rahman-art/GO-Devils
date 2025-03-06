import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

//helpers
import api from '../../../api';
import {colors, fonts, Icon} from '../../../theme';
import {AuthScreenParamList} from '../../../routes/RouteType';
// import {ProductData} from '../../../types/home';
import {useAppDispatch, useAppSelector} from '../../../hooks';
// import Rating from '../../../components/Rating';

// import WishlistIcon from '../../home/components/WishlistIcon';
import { ProductData } from '../../../types/home';
import WishlistIcon from '../../home/components/WishlistIcon';
import Rating from '../../../components/Rating';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const FavouriteCard = ({item}: {item: ProductData}) => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const dispatch = useAppDispatch();
  const [inCart, setInCart] = useState(false);
  const {refresh} = useAppSelector(state => state.user);

  // Function to toggle cart status
  const handleCartToggle = () => {
    setInCart(!inCart);
  };

  const truncateText = (text: string) => {
    const firstWord = text;
    return firstWord;
  };

  return (
    <Pressable
      onPress={() => navigation.navigate('ProductDetails')}
      style={styles.itemContainer}  >
         <View style={{flexDirection: 'row'}}>
         <View style={{width: '30%'}}>
         <ImageBackground
       source={require('../../../assets/images/cart.png')}
        // source={{
        //   uri: api.defaults?.baseURL + item?.image_url1,
        // }}
        imageStyle={{borderRadius: 8}}
        style={styles.rewardImage}
        resizeMode="cover">
        <View
          style={{
            backgroundColor: colors.red,
            position: 'absolute',
            right: 0,
            top: 0,
            width: 45,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            //borderTopRightRadius: 8,
            borderBottomLeftRadius: 45,
          }}>
          <Text
            style={{
              fontSize: 10,
              color: colors.white,
              fontFamily: fonts.bold,
              width: 30,
              marginLeft: 20,
              marginBottom: 5,
            }}>
           50 {item?.off}% OFF
          </Text>
        </View>
      </ImageBackground>
      </View>
      <View style={{width: '65%'}}>
        <View style={[styles.saveView, {padding: 5}]}>
            <Text style={styles.saveText}>Stock left - 10 pieces !</Text>
          </View>
          <View style={[styles.priceView, {padding: 5}]}>
            <Text style={styles.priceText}>{item.price}</Text>
            <Text
              style={[
                styles.priceText,
                {textDecorationLine: 'line-through', color: colors.drakgrey},
              ]}>
              $3599.00
            </Text>
          </View>
         
          <Text
            style={[
              styles.productText,
              {fontFamily: fonts.bold, fontSize: 14, marginTop: 5,},
            ]}>
            {item.name}
          </Text>
          <View style={{flexDirection:'row', marginLeft: 15,borderColor:colors.red,borderWidth:0.5,width:'65%',marginTop:8,height:32}}>
          <Text style={[styles.saveText,{marginLeft:20,marginTop:7,marginBottom:5,fontFamily:fonts.medium,fontSize:14,color:colors.red}]}>Add to Bag</Text>
            <Icon.IonIcon
            // onPress={() => setModalVisible1(true)}
            name="bag-outline"
            size={15}
            color={colors.red}
            style={{marginTop:7,marginBottom:0,marginHorizontal:5}}
          />
          </View>
          {/* <View style={[styles.saveView, {padding: 8,backgroundColor:colors.drakgrey,borderColor:colors.red,borderWidth:0.5,marginTop:10}]}>
            <Text style={styles.saveText}>Add to Bag</Text>
            <Icon.IonIcon
            onPress={() => setModalVisible1(true)}
            name="ellipsis-vertical"
            size={22}
            color={colors.white}
          />
          </View> */}
         
        </View>
        <View style={{width: '5%', marginTop: 15}}>
          <Icon.IonIcon
            // onPress={() => setModalVisible1(true)}
            name="ellipsis-vertical"
            size={22}
            color={colors.white}
          />
        </View>
         </View>
       
      <View style={{padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={[
              styles.rewardTitle,
              {color: colors.red},
            ]}>
          hhhggh  {truncateText(item?.name)}
          </Text>

          <WishlistIcon item={item} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            marginTop: 5,
            marginLeft: 5,
          }}>
          <Text
            style={{
              color: colors.red,
              fontSize: 12,
              fontFamily: fonts.bold,
            }}>
           dss {item?.selling_price}
          </Text>
          <Text
            style={{
              textDecorationLine: 'line-through',
              color: colors.grey,
              fontSize: 12,
            }}>
            sd{item?.price}
          </Text>
        </View>

        {item?.reviewCount ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              marginTop: 5,
            }}>
            {/* Rating Component */}
            <Rating rating={item?.averageRating} maxRating={5} />

            {/* Review Count */}
            <Text
              style={{
                fontSize: 10,
                color: colors.red,
                fontFamily: fonts.bold,
              }}>
              {' '}
              (
             ssd {item?.reviewCount > 10
                ? '10+ reviews'
                : `${item?.reviewCount} reviews`}
              )
            </Text>
          </View>
        ) : null}

      </View>
    </Pressable>
  );
};

export default FavouriteCard;

const styles = StyleSheet.create({
  rewardCard: {
    borderRadius: 10,

    width: Dimensions.get('window').width / 2 - 24,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  rewardImage: {
    width: '100%',
    height: 150,
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 0,
    // width: Dimensions.get('window').width / 2 - 24,
    // height: 130,
    // borderRadius: 8,
    // borderTopRightRadius: 0,
  },
  rewardTitle: {
    fontSize: 12,
    fontFamily: fonts.semibold,
  },
  actionButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.white,
    marginHorizontal: 10,
    marginTop: 12,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    margin: 10,
    color: colors.white,
    fontFamily: fonts.bold,
    marginLeft: 20,
  },
  sizeText1: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: colors.white,
    marginHorizontal: 10,
    // marginBottom: 10,
    // marginTop: 10,height:25
  },
  modalContent: {
    width: '95%',
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 16,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  sizeOption: {
    // padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: colors.primary,
    borderColor: colors.white,
    borderWidth: 0.5,
    borderRadius: 25,
    alignItems: 'center',
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.red,
    padding: 6,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  quantity: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  sizeView: {
    backgroundColor: colors.red,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
  },
  saveText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 12,
    marginTop: 0,
  },
  sizeText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  productText: {
    color: colors.white,
    marginLeft: 15,
  },

  saveView: {
    backgroundColor: colors.red,
    marginLeft: 15,
    marginTop: 12,
    width: '60%',
  },
  priceText: {
    color: colors.red,
    margin: 5,
    fontFamily: fonts.medium,
    fontSize: 12,
  },
  priceView: {
    backgroundColor: colors.primary,
    marginLeft: 15,
    marginTop: 5,
    width: '60%',
    flexDirection: 'row',
  },
  itemContainer: {
    backgroundColor: colors.drakgrey,
    marginTop: 10,
    padding: 10,
  },
});