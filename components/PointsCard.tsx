import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useUser } from "../context/UserContext";
import { useRouter } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLeaf,
  faArrowRight,
  faSeedling,
  faRecycle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

export default function PointsCard() {
  const { user } = useUser();
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();

  return (
    <View className="bg-white rounded-2xl shadow-sm p-5 mb-6">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <FontAwesomeIcon icon={faLeaf} size={20} color="#22c55e" />
          <Text className="font-semibold ml-2">{user.points} Points</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/(tabs)/rewards")}>
          <Text className="text-green-600 text-sm font-medium">
            Exchange Now <FontAwesomeIcon icon={faArrowRight} size={12} />
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-xs text-gray-500 mb-4">
        Earn eco points when you recycle materials!
      </Text>
      <View className="mb-2">
        <View className="flex-row justify-between text-sm mb-1">
          <Text>Level: Eco Green</Text>
          <Text>82%</Text>
        </View>
        <TouchableOpacity
          className="w-full bg-gray-100 rounded-full h-2"
          onPress={() => setShowDetails(prev => !prev)}
        >
          <View
            className="bg-green-500 h-2 rounded-full"
            style={{ width: "82%" }}
          />
        </TouchableOpacity>
      </View>
      {showDetails && (
        <View className="mt-3 pt-3 border-t border-gray-100">
          <View className="flex-row justify-between text-sm text-gray-600 mb-2">
            <Text>This Month</Text>
            <Text>+350 points</Text>
          </View>
          <View className="space-y-2">
            <View className="flex-row justify-between text-xs">
              <Text>Plastic Recycling (4kg)</Text>
              <Text className="text-green-600">+200</Text>
            </View>
            <View className="flex-row justify-between text-xs">
              <Text>Paper Recycling (2kg)</Text>
              <Text className="text-green-600">+100</Text>
            </View>
            <View className="flex-row justify-between text-xs">
              <Text>First Pickup Bonus</Text>
              <Text className="text-green-600">+100</Text>
            </View>
            <View className="flex-row justify-between text-xs">
              <Text>Eco Quiz Completion</Text>
              <Text className="text-green-600">+50</Text>
            </View>
            <View className="flex-row justify-between text-xs">
              <Text>Pickup Feedback</Text>
              <Text className="text-green-600">+50</Text>
            </View>
          </View>
          <View className="mt-4 pt-3 border-t border-gray-100">
            <Text className="text-sm font-medium mb-2">Your Badges</Text>
            <View className="flex-row space-x-3">
              <View className="items-center">
                <View className="w-12 h-12 bg-yellow-100 rounded-full items-center justify-center mb-1">
                  <FontAwesomeIcon
                    icon={faSeedling}
                    size={20}
                    color="#ca8a04"
                  />
                </View>
                <Text className="text-xs">First Timer</Text>
              </View>
              <View className="items-center">
                <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-1">
                  <FontAwesomeIcon icon={faRecycle} size={20} color="#16a34a" />
                </View>
                <Text className="text-xs">Eco Hero</Text>
              </View>
              <View className="items-center">
                <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-1">
                  <FontAwesomeIcon icon={faStar} size={20} color="#2563eb" />
                </View>
                <Text className="text-xs">Top Rated</Text>
              </View>
            </View>
          </View>
          <View className="mt-4 pt-3 border-t border-gray-100">
            <Text className="text-sm font-medium mb-2">Monthly Challenge</Text>
            <View className="bg-green-50 p-3 rounded-lg">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm font-medium">
                  Recycle 20kg this month
                </Text>
                <Text className="text-xs text-green-600">500 pts</Text>
              </View>
              <View className="w-full bg-white rounded-full h-2 mb-1">
                <View
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "60%" }}
                />
              </View>
              <Text className="text-xs text-gray-500">12kg / 20kg</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
