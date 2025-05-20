import { pickupRequests } from "@/mockdata/pickups";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View,SafeAreaView  } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";


export default function CollectionSuccessScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const request = pickupRequests.find(req => req.id === id);

  // Animation values
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const translateY = useSharedValue(50);

  useEffect(() => {
    // Start animations
    opacity.value = withDelay(300, withSpring(1));
    scale.value = withDelay(300, withSpring(1));
    translateY.value = withDelay(300, withSpring(0));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
    };
  });

  const handleGoToHome = () => {
    router.replace("/(collector)" as any);
  };

  const handleViewTask = () => {
    router.replace("/(collector)/tasks" as any);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-[#164C3E]">
        <View className="flex-1 justify-center items-center px-6 pt-14">
          <Animated.View
            style={animatedStyle}
            className="bg-white rounded-3xl w-full py-12 px-6 items-center"
          >
            <View className="rounded-full bg-green-100 p-5 mb-6">
              <FontAwesomeIcon icon={faCheckCircle} size={60} color="#28A745" />
            </View>

            <Text className="text-primary-500 text-2xl font-bold mb-2 text-center">
              Collection Confirmed!
            </Text>

            <Text className="text-gray-500 text-center mb-6">
              The waste collection has been successfully recorded
            </Text>

            <View className="bg-gray-100 rounded-xl p-4 w-full mb-8">
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-500">Waste Type:</Text>
                <Text className="text-primary-500 font-semibold">
                  {request?.wasteType || "Mixed"}
                </Text>
              </View>

              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-500">Weight Collected:</Text>
                <Text className="text-primary-500 font-semibold">
                  {request?.estimatedWeight || "5kg"}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray-500">Points Earned:</Text>
                <Text className="text-primary-500 font-semibold">
                  {request?.points || "250"} points
                </Text>
              </View>
            </View>

            <TouchableOpacity
              className="bg-primary-500 rounded-full py-3 w-full mb-4"
              onPress={handleGoToHome}
            >
              <Text className="text-white text-center font-bold text-lg">
                Go to Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white border border-primary-500 rounded-full py-3 w-full"
              onPress={handleViewTask}
            >
              <Text className="text-primary-500 text-center font-bold text-lg">
                View My Tasks
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </>
  );
}
