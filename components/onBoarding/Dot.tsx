import React, { FC } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type DotProps = {
  index: number;
  x: SharedValue<number>;
  activeColor?: string;
  inactiveColor?: string;
  activeSize?: number;
  inactiveSize?: number;
  dotStyle?: object;
  activeDotStyle?: object;
};

const Dot: FC<DotProps> = ({
  index,
  x,
  activeColor = "#164C3E",
  inactiveColor = "#33876F",
  activeSize = 20,
  inactiveSize = 10,
  dotStyle = {},
  activeDotStyle = {},
}) => {

  const { width: SCREEN_WIDTH } = useWindowDimensions();


  const animationRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];


  const styleAnimation = useAnimatedStyle(() => {
    const size = interpolate(
      x.value,
      animationRange,
      [inactiveSize, activeSize, inactiveSize],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      x.value,
      animationRange,
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      x.value,
      animationRange,
      [0.8, 1.2, 0.8],
      Extrapolation.CLAMP
    );
    return {
      width: size,
      height: size,
      opacity: opacity,
      transform: [{ scale: withSpring(scale, { damping: 15 }) }],
    };
  });

  const colorAnimation = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      [inactiveColor, activeColor, inactiveColor]
    );
    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <Animated.View
      className="py-1.5 rounded-[50px] "
      style={[
        styles.dots,
        dotStyle,
        styleAnimation,
        colorAnimation,
        activeDotStyle,
      ]}
    />
  );
};

export default Dot;

const styles = StyleSheet.create({
  dots: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
