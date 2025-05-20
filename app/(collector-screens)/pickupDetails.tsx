import { pickupRequests } from "@/mockdata/pickups";
import {
  faArrowLeft,
  faCalendarAlt,
  faComment,
  faInfo,
  faLocationArrow,
  faMapMarkerAlt,
  faPhone,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PickupDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [request, setRequest] = useState<(typeof pickupRequests)[0] | null>(
    null
  );
  const [status, setStatus] = useState<string>("pending");

  useEffect(() => {
    // Find the request by id
    const foundRequest = pickupRequests.find(req => req.id === id);
    if (foundRequest) {
      setRequest(foundRequest);
      setStatus(foundRequest.status);
    }
  }, [id]);

  if (!request) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="flex-1 bg-[#164C3E]">
          <View className="flex-1 justify-center items-center pt-14">
            <Text className="text-white text-lg">Loading...</Text>
          </View>
        </SafeAreaView>
      </>
    );
  }

  const handleAccept = () => {
    setStatus("accepted");
    // In a real app, update the request in the backend
  };

  const handleReject = () => {
    // Navigate back to the home screen
    router.back();
  };

  const handleNavigate = () => {
    // Open Google Maps with directions to the location
    const { latitude, longitude } = request.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${request.user.phone}`);
  };

  const handleChat = () => {
    // In a real app, navigate to chat screen
    alert("Chat functionality will be implemented in the next version");
  };

  const handleStatusUpdate = (newStatus: string) => {
    setStatus(newStatus);
    // In a real app, update the request in the backend
  };

  const scheduledDate = new Date(request.scheduledTime);
  const formattedDate = scheduledDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = scheduledDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-[#164C3E]">
        <ScrollView className="flex-1">
          <View className="px-6 pt-14">
            <View className="flex-row items-center mb-6">
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesomeIcon icon={faArrowLeft} size={24} color="#fff" />
              </TouchableOpacity>
              <Text className="text-white text-xl font-bold ml-4">
                Pickup Details
              </Text>
            </View>

            {/* User Card */}
            <View className="bg-white rounded-2xl p-5 mb-5">
              <View className="flex-row items-center">
                <Image
                  source={{ uri: request.user.avatar }}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <View className="flex-1">
                  <Text className="text-primary-500 text-xl font-bold">
                    {request.user.name}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      size={14}
                      color="#164C3E"
                    />
                    <Text className="text-gray-500 ml-2 text-sm">
                      {request.location.address}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row mt-4">
                <TouchableOpacity
                  className="flex-1 bg-primary-500 rounded-full py-2 mr-3 flex-row justify-center items-center"
                  onPress={handleCall}
                >
                  <FontAwesomeIcon icon={faPhone} size={16} color="#fff" />
                  <Text className="text-white font-semibold ml-2">Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 bg-primary-100 rounded-full py-2 flex-row justify-center items-center"
                  onPress={handleChat}
                >
                  <FontAwesomeIcon icon={faComment} size={16} color="#164C3E" />
                  <Text className="text-primary-500 font-semibold ml-2">
                    Chat
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Pickup Details */}
            <View className="bg-white rounded-2xl p-5 mb-5">
              <Text className="text-primary-500 text-lg font-bold mb-4">
                Pickup Information
              </Text>

              <View className="flex-row items-center mb-4">
                <View className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center mr-3">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    size={18}
                    color="#164C3E"
                  />
                </View>
                <View>
                  <Text className="text-gray-500 text-sm">Scheduled Time</Text>
                  <Text className="text-primary-500 font-semibold">
                    {formattedDate} at {formattedTime}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center mb-4">
                <View className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faWeight} size={18} color="#164C3E" />
                </View>
                <View>
                  <Text className="text-gray-500 text-sm">
                    Waste Type & Weight
                  </Text>
                  <Text className="text-primary-500 font-semibold">
                    {request.wasteType} • {request.estimatedWeight}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center mb-4">
                <View className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faInfo} size={18} color="#164C3E" />
                </View>
                <View>
                  <Text className="text-gray-500 text-sm">Notes</Text>
                  <Text className="text-primary-500 font-semibold">
                    {request.notes}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                className="bg-primary-100 rounded-full py-3 flex-row justify-center items-center mt-2"
                onPress={handleNavigate}
              >
                <FontAwesomeIcon
                  icon={faLocationArrow}
                  size={18}
                  color="#164C3E"
                />
                <Text className="text-primary-500 font-semibold ml-2">
                  Navigate to Location
                </Text>
              </TouchableOpacity>
            </View>

            {/* Status Actions */}
            {status === "pending" ? (
              <View className="flex-row justify-between mb-8">
                <TouchableOpacity
                  className="bg-red-500 rounded-full py-3 px-6 flex-1 mr-3"
                  onPress={handleReject}
                >
                  <Text className="text-white font-bold text-center">
                    Reject
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-green-500 rounded-full py-3 px-6 flex-1"
                  onPress={handleAccept}
                >
                  <Text className="text-white font-bold text-center">
                    Accept
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="bg-white rounded-2xl p-5 mb-8">
                <Text className="text-primary-500 text-lg font-bold mb-4">
                  Update Pickup Status
                </Text>

                <View className="space-y-3">
                  <TouchableOpacity
                    className={`py-3 px-4 rounded-full flex-row items-center justify-center ${
                      status === "accepted"
                        ? "bg-primary-500"
                        : "bg-primary-100"
                    }`}
                    onPress={() => handleStatusUpdate("accepted")}
                  >
                    <Text
                      className={
                        status === "accepted"
                          ? "text-white font-semibold"
                          : "text-primary-500 font-semibold"
                      }
                    >
                      Accepted
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className={`py-3 px-4 rounded-full flex-row items-center justify-center ${
                      status === "on_way" ? "bg-primary-500" : "bg-primary-100"
                    }`}
                    onPress={() => handleStatusUpdate("on_way")}
                  >
                    <Text
                      className={
                        status === "on_way"
                          ? "text-white font-semibold"
                          : "text-primary-500 font-semibold"
                      }
                    >
                      On the Way
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className={`py-3 px-4 rounded-full flex-row items-center justify-center ${
                      status === "arrived" ? "bg-primary-500" : "bg-primary-100"
                    }`}
                    onPress={() => handleStatusUpdate("arrived")}
                  >
                    <Text
                      className={
                        status === "arrived"
                          ? "text-white font-semibold"
                          : "text-primary-500 font-semibold"
                      }
                    >
                      Arrived
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className={`py-3 px-4 rounded-full flex-row items-center justify-center ${
                      status === "collected"
                        ? "bg-primary-500"
                        : "bg-primary-100"
                    }`}
                    onPress={() => {
                      handleStatusUpdate("collected");
                      router.push({
                        pathname: "/(collector-screens)/confirmCollection",
                        params: { id: request.id },
                      });
                    }}
                  >
                    <Text
                      className={
                        status === "collected"
                          ? "text-white font-semibold"
                          : "text-primary-500 font-semibold"
                      }
                    >
                      Mark as Collected
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
