import { AppImages } from "@/assets";
import { ImageSourcePropType } from "react-native";

export interface OnBoardingData {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
  backgroundColor: string;
  titleColor: string;
}

const data: OnBoardingData[] = [
  {
    id: 1,
    title: "Recycle",
    description:
      "Recycle your waste to reduce the amount of waste in the environment",
    image: AppImages.recycle_image,
    backgroundColor: "#E6F0ED",
    titleColor: "#000000",
  },
  {
    id: 2,
    title: "Reuse",
    description:
      "Reuse your waste to reduce the amount of waste in the environment",
    image: AppImages.reuse_image,
    backgroundColor: "#CCE1DB",
    titleColor: "#000000",
  },
  {
    id: 3,
    title: "Reduce",
    description:
      "Reduce your waste to reduce the amount of waste in the environment",
    image: AppImages.reduce_image,
    backgroundColor: "#99C3B7",
    titleColor: "#000000",
  },
];

export default data;

// tribien_debug_log
console.log("[mockdata/onBoardingData.ts] Exporting data:", data);
