import { OnBoardingData } from "@/mockdata/onBoardingData";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type RenderitemProps = {
  index: number;
  x: SharedValue<number>;
  item: OnBoardingData;
};

const RenderItem = ({ index, x, item }: RenderitemProps) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const circleSize = SCREEN_WIDTH;
  const imageSize = SCREEN_WIDTH * 0.9;
  const circleRadius = circleSize / 2;

  const animationRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];

  const imageAnimation = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      animationRange,
      [200, 0, -200],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }],
    };
  });
  const titleAnimation = useAnimatedStyle(() => {
    const translateX = interpolate(
      x.value,
      animationRange,
      [100, 0, -100],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      x.value,
      animationRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateX }],
    };
  });
  const descriptionAnimation = useAnimatedStyle(() => {
    const translateX = interpolate(
      x.value,
      animationRange,
      [-100, 0, 100],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      x.value,
      animationRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateX }],
    };
  });

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      animationRange,
      [1, 4, 4],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });
  return (
    <View
      className="flex-1 justify-around items-center mb-[120px]"
      style={{ width: SCREEN_WIDTH }}
    >
      <View className="items-center justify-end" style={styles.circleContainer}>
        <Animated.View
          className="absolute"
          style={[
            circleAnimation,
            styles.circleContainer,
            {
              backgroundColor: item.backgroundColor,
              width: circleSize,
              height: circleSize,
              borderRadius: circleRadius,
            },
          ]}
        />
      </View>
      <Animated.View style={imageAnimation}>
        <Image
          source={item.image}
          resizeMode="contain"
          className="self-center"
          style={{ width: imageSize, height: imageSize }}
        />
      </Animated.View>
      <Animated.View className="py-5 items-center">
        <Animated.Text
          className="text-center font-bold text-4xl mb-2.5"
          style={[titleAnimation, { color: item.titleColor }]}
        >
          {item.title}
        </Animated.Text>
        {item.description && (
          <Text
            style={[descriptionAnimation, { color: item.titleColor }]}
            className="text-center font-normal text-xl opacity-80"
          >
            {item.description}
          </Text>
        )}
      </Animated.View>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
