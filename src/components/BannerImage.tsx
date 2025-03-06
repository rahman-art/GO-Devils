import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TextInput,
  Text,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {useAppDispatch, useAppSelector} from '../hooks';
import {FetchBanner} from '../redux/actions/homeAction';
import {colors} from '../theme';

const {width} = Dimensions.get('window');

const BannerImage = () => {
  const {banner} = useAppSelector(state => state.home);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FetchBanner(''));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.swiper}
        loop={true}
        index={currentIndex}
        autoplay
        autoplayTimeout={3}
        showsPagination={true}
        activeDotStyle={{backgroundColor: colors.blue}}
        scrollEnabled={true}
        onIndexChanged={index => setCurrentIndex(index)}>
        {banner !== null &&
          banner !== undefined &&
          banner.map((item, index) => (
            <TouchableOpacity key={index.toString()} style={{width}}>
              <ImageBackground
                source={{
                  uri:
                    'https://go-devil-backend.iqsetters.com' +
                    item?.banner_img_url,
                }}
                resizeMode="cover"
                style={styles.imageBackground}>
                {/* Header */}
                <View style={styles.header}>
                  <Text style={styles.headerText}>Banner Header</Text>
                </View>
                {/* Search Input */}
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search here..."
                    placeholderTextColor="#fff"
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
      </Swiper>
    </View>
  );
};

export default BannerImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  swiper: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 620,
  },
  imageBackground: {
    width: '100%',
    height: 600,
    justifyContent: 'space-between', // Align header and search input
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    width: '100%',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    width: '100%',
  },
  searchInput: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#fff',
  },
});
