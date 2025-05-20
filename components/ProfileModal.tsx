import {
  faChevronRight,
  faSignOutAlt,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "@/context/UserContext";

interface ProfileModalProps {
  show: boolean;
  onClose: () => void;
}

export default function ProfileModal({ show, onClose }: ProfileModalProps) {
  const { user } = useUser();

  if (!show) return null;

  return (
    <Modal visible={show} transparent>
      <View className="flex-1 bg-black/50 items-center justify-center">
        <View className="bg-white w-[340px] rounded-xl p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-medium">Profile Settings</Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesomeIcon icon={faTimes} size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center mb-6">
            <View className="w-16 h-16 bg-primary-200 rounded-full items-center justify-center mr-4">
              <FontAwesomeIcon icon={faUser} size={24} color="#164C3E" />
            </View>
            <View>
              <Text className="font-medium">{user.name}</Text>
              <Text className="text-sm text-gray-500">
                Level {user.level} • {user.points} Points
              </Text>
            </View>
          </View>
          <View className="space-y-4">
            <TouchableOpacity className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
              <Text className="text-sm">Edit Profile</Text>
              <FontAwesomeIcon
                icon={faChevronRight}
                size={14}
                color="#9ca3af"
              />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
              <Text className="text-sm">Notification Settings</Text>
              <FontAwesomeIcon
                icon={faChevronRight}
                size={14}
                color="#9ca3af"
              />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
              <Text className="text-sm">Language</Text>
              <FontAwesomeIcon
                icon={faChevronRight}
                size={14}
                color="#9ca3af"
              />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
              <Text className="text-sm">Help & Support</Text>
              <FontAwesomeIcon
                icon={faChevronRight}
                size={14}
                color="#9ca3af"
              />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between p-3 bg-red-50 rounded-lg">
              <Text className="text-sm text-red-600">Logout</Text>
              <FontAwesomeIcon icon={faSignOutAlt} size={14} color="#dc2626" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
