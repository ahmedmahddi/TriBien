import CustomButton from "@/components/onBoarding/CustomButton";
import Pagination from "@/components/onBoarding/Pagination";
import RenderItem from "@/components/onBoarding/RenderItem";
import React, { useCallback, useEffect, useRef } from "react";
import { FlatList, View, ViewToken } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import data, { OnBoardingData } from "../../mockdata/onBoardingData";

const OnboardingScreen = () => {
  const scrollRef = useAnimatedRef<FlatList<OnBoardingData>>();
  const x = useSharedValue(0);
  const scrollIndex = useSharedValue(0);

  useEffect(() => {}, [scrollRef]);

  const keyExtractor = useCallback((item: any, index: number) => {
    return index.toString();
  }, []);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanges = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const firstVisibleItem = viewableItems[0];
      if (
        firstVisibleItem?.index !== null &&
        firstVisibleItem?.index !== undefined
      ) {
        scrollIndex.value = firstVisibleItem.index;
      }
    },
    []
  );

  const viewabilityConfig = useRef({
    minimumViewTime: 300,
    viewAreaCoveragePercentThreshold: 10,
  });

  return (
    <View className="flex-1">
      <Animated.FlatList
        ref={scrollRef}
        data={data}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        keyExtractor={keyExtractor}
        renderItem={({ item, index }) => {
          return <RenderItem index={index} item={item} x={x} key={index} />;
        }}
        onViewableItemsChanged={onViewableItemsChanges}
        viewabilityConfig={viewabilityConfig.current}
      />
      <View className="absolute bottom-5 left-0 right-0 flex-row justify-between items-center mx-7 py-7">
        {(() => {
          return <Pagination data={data} x={x} />;
        })()}
        {(() => {
          return (
            <CustomButton
              scrollRef={scrollRef}
              scrollIndex={scrollIndex}
              dataLength={data.length}
              x={x}
            />
          );
        })()}
      </View>
    </View>
  );
};

export default OnboardingScreen;
