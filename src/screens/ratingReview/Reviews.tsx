import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, fonts, Icon} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {GetReviews} from '../../redux/actions/reatingAction';
import {RatingReview} from '../../types/reviews';
import moment from 'moment';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenParamList} from '../../routes/RouteType';
import {useNavigation} from '@react-navigation/native';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

// ReviewCard Component
const ReviewCard = ({item}: {item: RatingReview}) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    return (
      <View style={styles.starContainer}>
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <Icon.FontAwesome
              key={index}
              name="star"
              size={16}
              color="#f4c430"
            />
          ))}
        {halfStar && (
          <Icon.FontAwesome name="star-half-full" size={16} color="#f4c430" />
        )}
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.reviewerNameText}>{item.rating_title}</Text>
      <View style={styles.ratingRow}>
        {renderStars(item.rating_value)}
        <Text style={styles.ratingText}>{item.rating_value.toFixed(1)}</Text>
      </View>
      <Text style={styles.comment}>{item.review_text}</Text>
      <Text style={styles.date}>
        {moment(item?.created_on).format('DD/MM/YYYY, hh:mm A')}
      </Text>
    </View>
  );
};

// Main RatingAndReviews Component
const Reviews = ({item}: {item: any}) => {
  const dispatch = useAppDispatch();
  const {reviewsData} = useAppSelector(state => state.reviews);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    dispatch(GetReviews(item));
  }, []);

  return (
    <View style={styles.container}>
      {reviewsData.length == 0 ? null : (
        <View>
          <Text
            style={styles.title}
            //@ts-ignore
            onPress={() => navigation.navigate('RatingReview', {item: item})}>
            Ratings & Reviews
          </Text>
          <FlatList
            data={reviewsData}
            keyExtractor={item => item.rating_id.toString()}
            renderItem={({item}) => <ReviewCard item={item} />}
          />
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    // padding: 16,
    backgroundColor: colors.primary,
    flex: 1,
  },
  title: {
    color: colors.red,
    fontSize: 20,
    fontFamily: fonts.bold,
    marginLeft: 15,
  },
  card: {
    backgroundColor: colors.primary,
    padding: 16,
    marginVertical: 8,
    // borderRadius: 8,
    elevation: 1,
    borderColor: colors.white,
    borderWidth: 0.5,
    margin: 10,
  },
  reviewerNameText: {
    fontSize: 16,
    color: colors.red,
    marginBottom: 4,
    fontFamily: fonts.bold,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  comment: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#888',
  },
});

export default Reviews;
