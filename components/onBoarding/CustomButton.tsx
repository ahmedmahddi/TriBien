import { OnBoardingData } from "@/mockdata/onBoardingData";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { FlatList, Pressable, useWindowDimensions, View } from "react-native";
import Animated, {
  AnimatedRef,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type ButtonProps = {
  dataLength: number;
  scrollIndex: SharedValue<number>;
  scrollRef: AnimatedRef<FlatList<OnBoardingData>>;
  x: SharedValue<number>;
  onFinish?: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CustomButton: FC<ButtonProps> = ({
  dataLength,
  scrollIndex,
  scrollRef,
  x,
  onFinish,
}) => {
  const router = useRouter();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const buttonScale = useSharedValue(1);

  // Animation for the button's appearance
  const styleAnimation = useAnimatedStyle(() => {
    const isLastIndex = scrollIndex.value === dataLength - 1;
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ["#33876F", "#164C3E", "#123D32"]
    );
    const width = isLastIndex ? withSpring(140) : withSpring(60);

    return {
      width: width,
      height: 60,
      transform: [{ scale: buttonScale.value }],
      backgroundColor: backgroundColor,
    };
  });

  const textAnimation = useAnimatedStyle(() => {
    const isLastIndex = scrollIndex.value === dataLength - 1;
    const opacity = isLastIndex ? withTiming(1) : withTiming(0);
    const translateX = isLastIndex ? withTiming(0) : withTiming(-100);
    return {
      opacity: opacity,
      transform: [{ translateX: translateX }],
    };
  });

  const iconAnimation = useAnimatedStyle(() => {
    const isLastIndex = scrollIndex.value === dataLength - 1;
    const opacity = isLastIndex ? withTiming(0) : withTiming(1);
    const translateX = isLastIndex ? withTiming(100) : withTiming(0);

    return {
      width: 30,
      height: 30,
      opacity: opacity,
      transform: [{ translateX: translateX }],
    };
  });

  const handlePress = () => {
    const isLastIndex = scrollIndex.value === dataLength - 1;
    // tribien_debug_log
    if (!isLastIndex) {
      scrollRef.current?.scrollToIndex({
        index: scrollIndex.value + 1,
        animated: true,
      });
    } else {
      if (onFinish) {
        runOnJS(onFinish)();
      } else {
        console.log("Finished onboarding");
        router.navigate("/(screens)/loginScreen");
      }
    }
  };

  const onPress = () => {
    buttonScale.value = withSpring(0.9, {}, () => {
      buttonScale.value = withSpring(1);
      runOnJS(handlePress)();
    });
  };

  return (
    <View className="items-center justify-center">
      <AnimatedPressable onPress={onPress}>
        <Animated.View
          className="p-2.5 rounded-[100px] justify-center items-center overflow-hidden"
          style={styleAnimation}
        >
          <Animated.Text
            className="text-white text-base absolute font-bold"
            style={textAnimation}
          >
            Get Started
          </Animated.Text>
          <Animated.Image
            source={require("../../assets/images/arrow.png")}
            className="size-10"
            style={iconAnimation}
          />
        </Animated.View>
      </AnimatedPressable>
    </View>
  );
};

export default CustomButton;
