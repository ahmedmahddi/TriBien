// app/(tabs)/index.tsx
import NotificationModal from "@/components/NotificationModal";
import ProfileModal from "@/components/ProfileModal";
import { useNotifications } from "@/context/NotificationContext";
import { useUser } from "@/context/UserContext";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { user } = useUser();
  const { setShowNotifications } = useNotifications();
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#164C3E] ">
      <ScrollView
        className="flex-1 "
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="px-6 pt-14 ">
          <View className="flex-row justify-between items-center">
            <Text className="text-white text-3xl font-bold">Hello! Ahmed</Text>
            <View className="flex-row items-center space-x-6 ">
              <TouchableOpacity
                className="w-12 h-12 bg-white/10 rounded-full items-center justify-center"
                onPress={() => setShowNotifications(true)}
              >
                <FontAwesomeIcon icon={faBell} size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-12 h-12 bg-white/10 rounded-full items-center justify-center"
                onPress={() => setShowProfile(true)}
              >
                <FontAwesomeIcon icon={faUser} size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Points Card */}
          <View className="mt-6 bg-white rounded-[24px] p-6">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-primary-500 text-[32px] font-bold ">
                  1000 Points
                </Text>
                <Text className="text-gray-500 text-base mt-1">
                  Available points to redeem rewards
                </Text>
              </View>
              <TouchableOpacity
                className="bg-white/10 px-4 py-3 rounded-full"
                onPress={() => router.push("/(tabs)/rewards")}
              >
                <Text className="text-primary-500 font-semibold text-base ">
                  Exchange Now
                </Text>
              </TouchableOpacity>
            </View>

            {/* Progress Ring */}
            <View className="mt-8 flex-row items-center">
              <View className="w-[72px] h-[72px] rounded-full border-[3px] border-[#E8F1EE] justify-center items-center">
                <Text className="text-primary-500 text-2xl font-bold">82</Text>
              </View>
              <View className="ml-4">
                <Text className="text-primary-500 text-lg font-semibold">
                  Level: Eco Green
                </Text>
                <Text className="text-gray-500 text-base mt-1">
                  Keep collecting points to level up!
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* First Card - Let's Start Recycling */}
        <View className="bg-white rounded-[24px] mt-8 mx-6 ">
          <View className="p-6">
            <Text className="text-primary-500 text-2xl font-bold mb-6">
              Let&apos;s Start Recycling!
            </Text>

            {/* Action Cards */}
            <View className="flex-row justify-between space-x-4">
              <TouchableOpacity
                className="flex-1 bg-white/10 rounded-[24px] p-6"
                onPress={() => router.push("/(tabs)/schedule")}
              >
                <View className="h-32 mb-4 items-center justify-center">
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/3771/3771417.png",
                    }}
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-primary-500 text-lg font-semibold text-center">
                  Pickup and Pack
                </Text>
                <Text className="text-gray-500 text-center mt-2">
                  Pick up your waste easily
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-white/10 rounded-[24px] p-6"
                onPress={() => router.push("/(tabs)/catalog")}
              >
                <View className="h-32 mb-4 items-center justify-center">
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/3771/3771347.png",
                    }}
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-primary-500 text-lg font-semibold text-center">
                  Waste Catalog
                </Text>
                <Text className="text-gray-500 text-center mt-2">
                  Categorize your waste
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Second Card - Latest Pickup Schedule */}
        <View className="bg-white rounded-[24px] mt-6 mx-6 mb-6">
          <View className="p-6">
            <Text className="text-primary-500 text-xl font-bold mb-4">
              Latest Pick Up Schedule
            </Text>
            <View className="flex-row items-center mb-6">
              <View className="w-14 h-14 rounded-full bg-white/10 mr-4">
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                  }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              </View>
              <View>
                <Text className="text-primary-500 text-lg font-semibold">
                  Muhammad Dzakiy
                </Text>
                <Text className="text-gray-500 mt-1">On The Way To You</Text>
              </View>
            </View>
            <View className="flex-row justify-between">
              <View>
                <Text className="text-gray-500 mb-2">Package Size</Text>
                <Text className="text-primary-500 text-lg font-semibold">
                  Small (Max. 3 kg)
                </Text>
              </View>
              <View>
                <Text className="text-gray-500 mb-2">Estimated Time</Text>
                <Text className="text-primary-500 text-lg font-semibold">
                  10:00 AM
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <NotificationModal />
      <ProfileModal show={showProfile} onClose={() => setShowProfile(false)} />
    </View>
  );
}
