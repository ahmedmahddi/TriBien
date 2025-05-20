import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useUser } from "@/context/UserContext";
import { useRouter } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faCoins,
  // Reward icons
  faWifi,
  faTicketAlt,
  faCoffee,
  faMusic,
  faShoppingBag,
  faSeedling,
  // Added icons
  faBottleWater,
} from "@fortawesome/free-solid-svg-icons";
import {
  mockDigitalRewards,
  mockProductRewards,
  DigitalReward,
  ProductReward,
} from "@/mockdata/rewards"; // Import interfaces too

// Mapping from icon identifier strings to actual icon objects
const iconMap: { [key: string]: any } = {
  faWifi,
  faTicketAlt,
  faCoffee,
  faMusic,
  faShoppingBag,
  faSeedling,
  // Added icons
  faBottleWater,
  // Add other icons used in mock data if any
};

// Helper component to render Reward Image/Icon
const RewardImage: React.FC<{
  item: DigitalReward | ProductReward;
  size: number;
  containerClassName?: string;
}> = ({ item, size, containerClassName }) => {
  return (
    <View
      className={`items-center justify-center bg-gray-100 rounded-lg overflow-hidden ${containerClassName}`}
    >
      {item.imageType === "icon" && item.imageIdentifier ? (
        <FontAwesomeIcon
          icon={iconMap[item.imageIdentifier]}
          size={size * 0.6} // Adjust icon size relative to container
          color="#6b7280" // Adjust color as needed
        />
      ) : (
        <Image
          source={{ uri: item.imageUrl }}
          className="w-full h-full"
          resizeMode="contain"
        />
      )}
    </View>
  );
};

export default function RewardsScreen() {
  const { user } = useUser();
  const router = useRouter();
  const digitalRewards = mockDigitalRewards;
  const productRewards = mockProductRewards;

  return (
    <View className="flex-1 bg-[#164C3E]">
      {/* Header */}
      <View className="px-6 pt-14 pb-6">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4 z-10">
            <FontAwesomeIcon icon={faArrowLeft} size={24} color="#fff" />
          </TouchableOpacity>
          <View className="flex-1 items-center absolute w-full">
            <Text className="text-white text-xl font-semibold">Rewards</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 bg-white rounded-t-[32px] pt-8">
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Points Display Card */}
          <View className="bg-[#E8F1EE] rounded-[24px] p-6 mb-8">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center">
                <FontAwesomeIcon icon={faCoins} size={24} color="#D97706" />
                <Text className="text-2xl font-bold text-[#164C3E] ml-3">
                  {user.points} Points
                </Text>
              </View>
              <TouchableOpacity className="bg-white/80 px-4 py-2 rounded-full">
                <Text className="text-sm font-semibold text-[#164C3E]">
                  History
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="text-base text-gray-600 ml-9">
              Redeem your points for exciting rewards!
            </Text>
          </View>
          {/* Digital Rewards */}
          <View className="mb-8">
            <Text className="text-[#164C3E] text-xl font-bold mb-4">
              Digital Rewards
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
              className="-mx-6 px-6"
            >
              <View className="flex-row space-x-4">
                {digitalRewards.map(reward => (
                  <View
                    key={reward.id}
                    className="w-48 bg-[#F8F9FA] rounded-[24px] p-5"
                  >
                    <RewardImage
                      item={reward}
                      size={128}
                      containerClassName="h-32 mb-4"
                    />
                    <Text
                      className="text-base font-semibold text-gray-800 mb-1"
                      numberOfLines={1}
                    >
                      {reward.name}
                    </Text>
                    <View className="flex-row items-center justify-between mt-2">
                      <Text className="text-sm text-gray-500">
                        {reward.points.toLocaleString()} points
                      </Text>
                      <TouchableOpacity className="bg-[#164C3E] px-4 py-2 rounded-full">
                        <Text className="text-sm font-semibold text-white">
                          Redeem
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Eco-Friendly Products */}
          <View className="mb-6">
            <Text className="text-[#164C3E] text-xl font-bold mb-4">
              Eco-Friendly Products
            </Text>
            <View className="space-y-4">
              {productRewards.map(reward => (
                <View
                  key={reward.id}
                  className="bg-white rounded-[16px] shadow-sm border border-gray-100 p-4 flex-row items-center"
                >
                  <RewardImage
                    item={reward}
                    size={80}
                    containerClassName="w-20 h-20 mr-4"
                  />
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-800 mb-1">
                      {reward.name}
                    </Text>
                    <Text className="text-sm text-gray-500 mb-3">
                      {reward.description}
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-sm font-semibold text-[#164C3E]">
                        {reward.points.toLocaleString()} points
                      </Text>
                      <TouchableOpacity className="bg-[#164C3E] px-4 py-2 rounded-full">
                        <Text className="text-sm font-semibold text-white">
                          Redeem
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
