import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

//helpers
import {useAppDispatch, useAppSelector} from '../hooks';
import {FetchBanner} from '../redux/actions/homeAction';

const {width} = Dimensions.get('window');

const CustomBanner: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const {banner} = useAppSelector(state => state.home);
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(FetchBanner(''));
    }, []),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banner.length;
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, banner.length]);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={banner}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.banner_id.toString()}
        renderItem={({item}) => (
          <FastImage
            source={{
              uri:
                'https://go-devil-backend.iqsetters.com' + item.banner_img_url,
              priority: FastImage.priority.high,
            }}
            resizeMode="cover"
            style={{width, height: 750, justifyContent: 'space-between'}}
          />
        )}
        onMomentumScrollEnd={handleScrollEnd}
      />

      <View style={styles.paginationContainer}>
        {banner.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {backgroundColor: currentIndex === index ? '#fff' : '#888'},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 5,
  },
});

export default CustomBanner;
