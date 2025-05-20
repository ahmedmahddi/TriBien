import { useNotifications } from "@/context/NotificationContext";
import {
  faBell,
  faTimes,
  faTrophy,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function NotificationModal() {
  const {
    notifications,
    showNotifications,
    setShowNotifications,
    clearNotifications,
  } = useNotifications();

  if (!showNotifications) return null;

  return (
    <Modal visible={showNotifications} transparent>
      <View className="flex-1 bg-black/50 items-center justify-center">
        <View className="bg-white w-[340px] rounded-xl p-4 max-h-[80vh]">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-medium">Notifications</Text>
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity onPress={clearNotifications}>
                <Text className="text-sm text-gray-500">Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowNotifications(false)}>
                <FontAwesomeIcon icon={faTimes} size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            {notifications.length === 0 ? (
              <View className="items-center py-8">
                <FontAwesomeIcon icon={faBell} size={40} color="#d1d5db" />
                <Text className="text-gray-500 mt-2">No notifications</Text>
              </View>
            ) : (
              notifications.map(notification => (
                <View
                  key={notification.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-3"
                >
                  <View className="flex-row items-start">
                    <View
                      className={`w-8 h-8 bg-${notification.iconBg}-100 rounded-full items-center justify-center mr-3`}
                    >
                      <FontAwesomeIcon
                        icon={
                          notification.icon === "level-up-alt"
                            ? faTrophy
                            : faTruck
                        }
                        size={16}
                        color={`#${
                          notification.iconBg === "blue" ? "2563eb" : "16a34a"
                        }`}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm font-medium">
                        {notification.title}
                      </Text>
                      <Text className="text-xs text-gray-500 mt-1">
                        {notification.message}
                      </Text>
                      <Text className="text-xs text-gray-400 mt-2">
                        {notification.time}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
