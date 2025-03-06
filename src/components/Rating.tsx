// Rating.tsx
import React from 'react';
import {View, Text} from 'react-native';
import {colors, Icon} from '../theme';

interface RatingProps {
  rating: number | string;
  maxRating: number;
}

const Rating: React.FC<RatingProps> = ({rating, maxRating}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < maxRating; i++) {
      if (i < Math.floor(Number(rating))) {
        stars.push(
          <Icon.MaterialIcons
            key={i}
            name="star"
            size={18}
            color={colors.green}
            style={{marginRight: 2}}
          />,
        );
      } else if (i === Math.floor(Number(rating)) && Number(rating) % 1 !== 0) {
        stars.push(
          <Icon.MaterialIcons
            key={i}
            name="star-half"
            size={18}
            color={colors.grey}
            style={{marginRight: 2}}
          />,
        );
      } else {
        stars.push(
          <Icon.MaterialIcons
            key={i}
            name="star-border"
            size={18}
            color={colors.grey}
            style={{marginRight: 2}}
          />,
        );
      }
    }
    return stars;
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {renderStars()}
    </View>
  );
};

export default Rating;