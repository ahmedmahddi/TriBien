import { currentCollector, performanceMetrics } from "@/mockdata/collector";
import {
  faBell,
  faCalendarAlt,
  faCar,
  faChevronRight,
  faClockRotateLeft,
  faCog,
  faHistory,
  faMapMarkerAlt,
  faMedal,
  faMoneyBillWave,
  faQuestionCircle,
  faShieldAlt,
  faSignOut,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const [isOnline, setIsOnline] = React.useState(currentCollector.isOnline);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    // In a real app, update the collector's online status in the backend
  };

  const handleLogout = () => {
    // In a real app, handle logout functionality
    router.replace("/(screens)/loginScreen");
  };

  const menuItems = [
    {
      icon: faUser,
      title: "My Profile",
      description: "Personal information & documents",
      onPress: () => {},
      showRight: true,
    },
    {
      icon: faCar,
      title: "Vehicle Information",
      description: currentCollector.vehicle.model,
      onPress: () => {},
      showRight: true,
    },
    {
      icon: faBell,
      title: "Notifications",
      description: "Alerts & pickup reminders",
      onPress: () => {},
      showRight: true,
    },
    {
      icon: faShieldAlt,
      title: "Privacy & Security",
      description: "Password & settings",
      onPress: () => {},
      showRight: true,
    },
    {
      icon: faMoneyBillWave,
      title: "Payment Information",
      description: "Bank account & payment history",
      onPress: () => {},
      showRight: true,
    },
    {
      icon: faHistory,
      title: "Collection History",
      description: "Past pickups & reviews",
      onPress: () => {},
      showRight: true,
    },
    {
      icon: faQuestionCircle,
      title: "Help & Support",
      description: "FAQs & contact support",
      onPress: () => {},
      showRight: true,
    },
    {
      icon: faCog,
      title: "Settings",
      description: "App preferences & account settings",
      onPress: () => {},
      showRight: true,
    },
    {
      icon: faSignOut,
      title: "Logout",
      description: "Sign out of your account",
      onPress: handleLogout,
      showRight: false,
      danger: true,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#164C3E]">
      <ScrollView className="flex-1">
        <View className="px-6 pt-14 pb-10">
          <Text className="text-white text-3xl font-bold mb-6">My Profile</Text>

          {/* Profile Card */}
          <View className="bg-white rounded-2xl overflow-hidden mb-5">
            <View className="px-5 pt-5 pb-6 flex-row items-center">
              <Image
                source={{ uri: currentCollector.avatar }}
                className="w-20 h-20 rounded-full"
              />
              <View className="ml-4 flex-1">
                <Text className="text-primary-500 text-xl font-bold">
                  {currentCollector.name}
                </Text>
                <View className="flex-row items-center mt-1">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    size={12}
                    color="#164C3E"
                  />
                  <Text className="text-gray-500 ml-2 text-sm">
                    Cairo, Egypt
                  </Text>
                </View>
                <View className="flex-row items-center mt-2">
                  <View className="flex-row items-center bg-yellow-100 px-2 py-1 rounded-full">
                    <FontAwesomeIcon icon={faStar} size={12} color="#FFC107" />
                    <Text className="text-yellow-700 ml-1 text-xs font-semibold">
                      {currentCollector.rating}
                    </Text>
                  </View>
                  <View className="flex-row items-center ml-2">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      size={12}
                      color="#164C3E"
                    />
                    <Text className="text-gray-500 ml-1 text-xs">
                      Joined {formatDate(currentCollector.joinedDate)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="px-5 py-3 bg-primary-50 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View
                  className={`w-3 h-3 rounded-full mr-2 ${
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                <Text className="text-primary-700 font-medium">
                  {isOnline ? "Online" : "Offline"}
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#CBD5E0", true: "#4FD1C5" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#CBD5E0"
                onValueChange={toggleOnlineStatus}
                value={isOnline}
              />
            </View>
          </View>

          {/* Performance Metrics */}
          <View className="bg-white rounded-2xl p-5 mb-5">
            <Text className="text-primary-500 text-lg font-bold mb-4">
              Performance Metrics
            </Text>

            <View className="flex-row justify-between mb-4">
              <View className="items-center flex-1">
                <Text className="text-primary-500 text-xl font-bold">
                  {performanceMetrics.acceptanceRate}
                </Text>
                <Text className="text-gray-500 text-xs">Acceptance Rate</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-primary-500 text-xl font-bold">
                  {performanceMetrics.completionRate}
                </Text>
                <Text className="text-gray-500 text-xs">Completion Rate</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-primary-500 text-xl font-bold">
                  {performanceMetrics.onTimePerformance}
                </Text>
                <Text className="text-gray-500 text-xs">On-Time Rate</Text>
              </View>
            </View>

            <View className="bg-gray-100 rounded-xl p-3 mb-3">
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 bg-yellow-100 rounded-full items-center justify-center mr-2">
                    <FontAwesomeIcon icon={faStar} size={16} color="#FFC107" />
                  </View>
                  <Text className="text-gray-700">Customer Rating</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-primary-500 font-bold mr-1">
                    {performanceMetrics.customerRating}
                  </Text>
                  <FontAwesomeIcon icon={faStar} size={14} color="#FFC107" />
                </View>
              </View>
            </View>

            <View className="bg-gray-100 rounded-xl p-3">
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-2">
                    <FontAwesomeIcon
                      icon={faClockRotateLeft}
                      size={16}
                      color="#2196F3"
                    />
                  </View>
                  <Text className="text-gray-700">Response Time</Text>
                </View>
                <Text className="text-primary-500 font-bold">
                  {performanceMetrics.averageResponseTime}
                </Text>
              </View>
            </View>
          </View>

          {/* Badges */}
          <View className="bg-white rounded-2xl p-5 mb-5">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-primary-500 text-lg font-bold">
                My Badges
              </Text>
              <Text className="text-primary-500">View All</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="pb-2"
            >
              {performanceMetrics.badges.map((badge, index) => (
                <View
                  key={index}
                  className="items-center mr-5"
                  style={{ width: 80 }}
                >
                  <View className="w-16 h-16 bg-primary-100 rounded-full items-center justify-center mb-2">
                    <FontAwesomeIcon icon={faMedal} size={30} color="#164C3E" />
                  </View>
                  <Text className="text-primary-500 text-center text-xs font-semibold">
                    {badge.name}
                  </Text>
                  <Text
                    className="text-gray-500 text-center text-2xs"
                    style={{ fontSize: 10 }}
                  >
                    {new Date(badge.earned).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Review Highlights */}
          <View className="bg-white rounded-2xl p-5 mb-5">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-primary-500 text-lg font-bold">
                Review Highlights
              </Text>
              <Text className="text-primary-500">View All</Text>
            </View>

            {performanceMetrics.reviewHighlights
              .slice(0, 2)
              .map((review, index) => (
                <View
                  key={index}
                  className={`bg-gray-50 rounded-xl p-3 ${
                    index === 0 ? "mb-3" : ""
                  }`}
                >
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-700 font-semibold">
                      {review.userName}
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-yellow-700 mr-1">
                        {review.rating}
                      </Text>
                      <FontAwesomeIcon
                        icon={faStar}
                        size={12}
                        color="#FFC107"
                      />
                    </View>
                  </View>
                  <Text className="text-gray-500 text-sm">
                    {review.comment}
                  </Text>
                  <Text className="text-gray-400 text-xs mt-1">
                    {formatDate(review.date)}
                  </Text>
                </View>
              ))}
          </View>

          {/* Menu Items */}
          <View className="bg-white rounded-2xl overflow-hidden mb-5">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center px-5 py-4 ${
                  index < menuItems.length - 1 ? "border-b border-gray-100" : ""
                }`}
                onPress={item.onPress}
              >
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                    item.danger ? "bg-red-100" : "bg-primary-100"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    size={18}
                    color={item.danger ? "#E53E3E" : "#164C3E"}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className={`font-semibold ${
                      item.danger ? "text-red-600" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {item.description}
                  </Text>
                </View>
                {item.showRight && (
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    size={16}
                    color="#9CA3AF"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-gray-400 text-center text-xs mb-10">
            App Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
