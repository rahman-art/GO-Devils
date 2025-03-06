import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenParamList} from '../../routes/RouteType';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AddReview, GetReviews} from '../../redux/actions/reatingAction';
import {CustomButton, CustomInput, Title} from '../../components';
import {colors, fonts} from '../../theme';
import {getProfile} from '../../redux/actions/profileAction';

//helpers

const validationSchema = Yup.object().shape({
  rating_value: Yup.number()
    .min(1, 'Please select a rating')
    .required('Rating is required'),
  review_text: Yup.string()
    .min(10, 'Review must be at least 10 characters')
    .required('Review is required'),
});

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const AddReviews = ({route}: any) => {
  const {item} = route.params;
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(0);
  const {loading} = useAppSelector(state => state.reviews);
  const {profileInfo} = useAppSelector(state => state.profile);

  useEffect(() => {
    dispatch(getProfile(''));
  }, []);

  const formik = useFormik({
    initialValues: {
      rating_value: 0,
      review_text: '',
    },
    validationSchema,
    onSubmit: values => {
      const reviewData = {
        variant_id: item?.items[0]?.product_variant_id,
        rating_value: values.rating_value,
        rating_title: `${profileInfo?.first_name || ''} ${
          profileInfo?.last_name || ''
        }`.trim(),
        review_text: values.review_text,
      };

      dispatch(AddReview(reviewData))
        .then((action: any) => {
          if (action.meta.requestStatus === 'fulfilled') {
            dispatch(GetReviews(item));
            Alert.alert('Thank you!', 'Review and Rating added successfully.', [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ]);
          } else if (action.meta.requestStatus === 'rejected') {
            if (action.payload?.data?.msg === 'Review already present') {
              Alert.alert(
                'Error',
                'You have already submitted a review for this product.',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                  },
                ],
              );
            } else {
              Alert.alert(
                'Error',
                'Something went wrong. Please try again later.',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                  },
                ],
              );
            }
          }
        })

        .catch(error => {
          Alert.alert(
            'Error',
            'Something went wrong. Please try again later.',
            [
              {
                text: 'OK',
              },
            ],
          );
        });
    },
  });

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
    formik.setFieldValue('rating_value', selectedRating);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="dark-content"
      />
      <Title title="Rating & Reviews" hasBackAction={true} />
      <ScrollView style={styles.container}>
        <Text style={[styles.title, {color: colors.red}]}>Rate and Review</Text>

        {/* Star Rating */}
        <View style={styles.starRating}>
          {Array.from({length: 5}, (_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleRating(index + 1)}>
              <Icon
                name={index < rating ? 'star' : 'star-o'}
                size={40}
                color={index < rating ? colors.red : colors.grey}
                style={styles.starIcon}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Rating Error */}
        {formik.errors.rating_value && formik.touched.rating_value && (
          <Text style={styles.errorText}>{formik.errors.rating_value}</Text>
        )}

        {/* Review Input */}
        <CustomInput
          placeholder="Write your review here..."
          value={formik.values.review_text}
          onChangeText={formik.handleChange('review_text')}
          onBlur={formik.handleBlur('review_text')}
          multiline={true}
          error={formik.errors.review_text}
        />

        <CustomButton
          title="Submit Review"
          disabled
          loading={loading}
          style={{width: '100%', marginTop: 100}}
          onPress={() => formik.handleSubmit()}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    marginBottom: 20,
    textAlign: 'center',
  },
  starRating: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  starIcon: {
    marginHorizontal: 5,
  },

  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AddReviews;
