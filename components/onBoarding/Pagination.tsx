import { OnBoardingData } from "@/mockdata/onBoardingData";
import React, { FC } from "react";
import { View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import Dot from "./Dot";

type PaginationProps = {
  data: OnBoardingData[];
  x: SharedValue<number>;
  dotColor?: string;
  activeDotColor?: string;
  dotSize?: number;
  activeDotSize?: number;
  containerStyle?: object;
};

const Pagination: FC<PaginationProps> = ({
  data,
  x,
  dotColor = "#33876F",
  activeDotColor = "#164C3E",
  dotSize = 10,
  activeDotSize = 25,
  containerStyle = {},
}) => {
  return (
    <View
      className="flex-row h-10 justify-center items-center px-2.5"
      style={containerStyle}
    >
      {data.map((_, index) => {
        return (
          <Dot
            index={index}
            x={x}
            key={index}
            inactiveColor={dotColor}
            activeColor={activeDotColor}
            inactiveSize={dotSize}
            activeSize={activeDotSize}
          />
        );
      })}
    </View>
  );
};

export default Pagination;
