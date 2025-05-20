import NotificationModal from "@/components/NotificationModal";
import ProfileModal from "@/components/ProfileModal";
import { pickupRequests } from "@/mockdata/pickups";
import {
  faBell,
  faCalendarAlt,
  faCheck,
  faMapMarkerAlt,
  faTimes,
  faUser,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CollectorHomeScreen() {
  const [isOnline, setIsOnline] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();

  // Filter only pending pickup requests
  const pendingRequests = pickupRequests.filter(
    request => request.status === "pending"
  );

  const toggleOnlineStatus = () => {
    setIsOnline(prev => !prev);
  };

  const handlePickupDetails = (pickupId: string) => {
    router.push({
      pathname: "/(collector-screens)/pickupDetails",
      params: { id: pickupId },
    });
  };

  const renderPickupItem = ({ item }: { item: (typeof pickupRequests)[0] }) => {
    const scheduledDate = new Date(item.scheduledTime);
    const formattedDate = scheduledDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
    const formattedTime = scheduledDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <TouchableOpacity
        className="bg-white rounded-2xl p-4 mb-4"
        onPress={() => handlePickupDetails(item.id)}
      >
        <View className="flex-row items-center mb-3">
          <Image
            source={{ uri: item.user.avatar }}
            className="w-12 h-12 rounded-full mr-3"
          />
          <View className="flex-1">
            <Text className="text-primary-500 text-lg font-bold">
              {item.user.name}
            </Text>
            <View className="flex-row items-center">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size={12}
                color="#164C3E"
              />
              <Text className="text-gray-500 ml-1 text-sm">
                {item.location.address}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row mb-3">
          <View className="flex-1 flex-row items-center">
            <FontAwesomeIcon icon={faCalendarAlt} size={14} color="#164C3E" />
            <Text className="text-gray-700 ml-2">
              {formattedDate} • {formattedTime}
            </Text>
          </View>
          <View className="flex-row items-center">
            <FontAwesomeIcon icon={faWeight} size={14} color="#164C3E" />
            <Text className="text-gray-700 ml-2">{item.estimatedWeight}</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="bg-primary-100 px-3 py-1 rounded-full">
            <Text className="text-primary-700">{item.wasteType}</Text>
          </View>
          <View className="flex-row">
            <TouchableOpacity
              className="bg-red-100 w-10 h-10 rounded-full items-center justify-center mr-2"
              onPress={() => console.log("Rejected")}
            >
              <FontAwesomeIcon icon={faTimes} size={18} color="#FF6B6B" />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-green-100 w-10 h-10 rounded-full items-center justify-center"
              onPress={() => handlePickupDetails(item.id)}
            >
              <FontAwesomeIcon icon={faCheck} size={18} color="#28A745" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#164C3E]">
      <View className="flex-1">
        <View className="px-6 pt-14">
          <View className="flex-row justify-between items-center">
            <Text className="text-white text-3xl font-bold">Pickups</Text>
            <View className="flex-row items-center space-x-6">
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
        </View>

        {/* Online/Offline Toggle */}
        <View className="mx-6 mt-6 bg-white rounded-2xl p-4">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-primary-500 text-lg font-bold">
                Availability Status
              </Text>
              <Text className="text-gray-500 mt-1">
                {isOnline
                  ? "You're online & receiving requests"
                  : "You're offline & not receiving requests"}
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#E0E0E0", true: "#CCE1DB" }}
              thumbColor={isOnline ? "#164C3E" : "#9E9E9E"}
              ios_backgroundColor="#E0E0E0"
              onValueChange={toggleOnlineStatus}
              value={isOnline}
            />
          </View>
        </View>

        {/* Pickup Requests */}
        <View className="flex-1 mt-6 px-6 pb-32">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-semibold">
              Nearby Requests
            </Text>
            <TouchableOpacity>
              <Text className="text-primary-100">View Map</Text>
            </TouchableOpacity>
          </View>

          {pendingRequests.length > 0 ? (
            <FlatList
              data={pendingRequests}
              renderItem={renderPickupItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-white text-lg">
                No pickup requests available
              </Text>
            </View>
          )}
        </View>

        {showNotifications && <NotificationModal />}
        {showProfile && (
          <ProfileModal
            show={showProfile}
            onClose={() => setShowProfile(false)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
