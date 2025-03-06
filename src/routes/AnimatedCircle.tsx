import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {colors} from '../theme';
type CircleProps = {
  circleX: Animated.SharedValue<number>;
};
const circleContainerSize = 50;

const AnimatedCircle: FC<CircleProps> = ({circleX}) => {
  const circleContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: circleX.value - circleContainerSize / 2}],
    };
  }, []);

  return <Animated.View style={[circleContainerStyle, styles.container]} />;
};

export default AnimatedCircle;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -circleContainerSize / 1.5,
    width: circleContainerSize,
    borderRadius: circleContainerSize,
    height: circleContainerSize,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
