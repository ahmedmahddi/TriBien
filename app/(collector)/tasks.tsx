import {
  activeCollections,
  collectionHistory,
} from "@/mockdata/collectionHistory";
import { pickupRequests } from "@/mockdata/pickups";
import {
  faCalendarAlt,
  faCheckCircle,
  faCircle,
  faLocationArrow,
  faMapMarkerAlt,
  faTruck,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TasksScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("active");
  const [isDataReady, setIsDataReady] = useState(false);

  // Force a re-render after initial mount to ensure data is loaded properly
  useEffect(() => {
    // Use a short timeout to ensure all data is properly initialized
    const timer = setTimeout(() => {
      setIsDataReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Combine original pickupRequests with active collections
  const allActiveRequests = [
    ...pickupRequests.filter(
      request =>
        request.status === "accepted" ||
        request.status === "on_way" ||
        request.status === "arrived"
    ),
    ...activeCollections.map(collection => {
      // Convert activeCollection format to pickupRequest format
      // Use a prefix to ensure unique IDs
      return {
        id: `active_${collection.pickupId}`,
        user: {
          id: collection.userId,
          name: collection.userName,
          avatar: collection.userAvatar,
          phone: "+201012345678", // default phone number
          address: collection.location.address,
        },
        status: collection.status,
        wasteType: collection.wasteType,
        estimatedWeight: collection.estimatedWeight,
        notes: "Collection in progress",
        scheduledTime: collection.scheduledTime,
        location: collection.location,
        points: collection.points,
        payment: 0,
        createdAt: new Date().toISOString(),
      };
    }),
  ];

  // Combine original completed requests with collection history
  const allCompletedRequests = [
    ...pickupRequests.filter(
      request =>
        request.status === "collected" || request.status === "completed"
    ),
    ...collectionHistory.slice(0, 10).map(history => {
      // Convert collectionHistory format to pickupRequest format
      // Use a prefix to ensure unique IDs
      return {
        id: `history_${history.pickupId}`,
        user: {
          id: history.userId,
          name: history.userName,
          avatar: history.userAvatar,
          phone: "+201012345678", // default phone number
          address: history.location.address,
        },
        status: "completed", // explicitly set to completed
        wasteType: history.wasteType,
        estimatedWeight: history.estimatedWeight,
        notes: history.notes || "Completed pickup",
        scheduledTime: history.scheduledTime,
        location: history.location,
        points: history.points,
        payment: 0,
        createdAt: new Date(history.completedTime).toISOString(),
      };
    }),
  ];

  const handlePickupDetails = (pickupId: string) => {
    // Extract the original ID if it has a prefix
    const originalId = pickupId.includes("_")
      ? pickupId.split("_")[1]
      : pickupId;

    router.push({
      pathname: "/(collector-screens)/pickupDetails",
      params: { id: originalId },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "#FFC107"; // Amber
      case "on_way":
        return "#2196F3"; // Blue
      case "arrived":
        return "#9C27B0"; // Purple
      case "collected":
        return "#4CAF50"; // Green
      case "completed":
        return "#4CAF50"; // Green
      default:
        return "#757575"; // Grey
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "accepted":
        return "Accepted";
      case "on_way":
        return "On the Way";
      case "arrived":
        return "Arrived";
      case "collected":
        return "Collected";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const renderPickupItem = ({ item }: { item: any }) => {
    // Make sure we can access properties safely
    if (!item || !item.scheduledTime || !item.user) {
      return null;
    }

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

    const statusColor = getStatusColor(item.status);
    const statusText = getStatusText(item.status);

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
                {item.location?.address || "No address"}
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
          <View className="flex-row items-center">
            <FontAwesomeIcon icon={faCircle} size={10} color={statusColor} />
            <Text
              className="ml-2"
              style={{ color: statusColor, fontWeight: "600" }}
            >
              {statusText}
            </Text>
          </View>
        </View>

        {item.status === "accepted" && (
          <TouchableOpacity
            className="mt-3 bg-primary-500 py-2 rounded-full flex-row items-center justify-center"
            onPress={() => handlePickupDetails(item.id)}
          >
            <FontAwesomeIcon icon={faTruck} size={16} color="#fff" />
            <Text className="text-white font-semibold ml-2">Start Pickup</Text>
          </TouchableOpacity>
        )}

        {item.status === "on_way" && (
          <TouchableOpacity
            className="mt-3 bg-primary-500 py-2 rounded-full flex-row items-center justify-center"
            onPress={() => handlePickupDetails(item.id)}
          >
            <FontAwesomeIcon icon={faLocationArrow} size={16} color="#fff" />
            <Text className="text-white font-semibold ml-2">Navigate</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  // Only render the FlatList content if the data is ready
  const renderTaskContent = () => {
    if (!isDataReady) {
      return (
        <View className="flex-1 justify-center items-center mt-10">
          <Text className="text-white text-lg">Loading...</Text>
        </View>
      );
    }

    if (activeTab === "active") {
      return allActiveRequests.length > 0 ? (
        <FlatList
          data={allActiveRequests}
          renderItem={renderPickupItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 justify-center items-center mt-10">
          <FontAwesomeIcon icon={faCheckCircle} size={60} color="#CCE1DB" />
          <Text className="text-white text-lg mt-4 text-center">
            No active tasks at the moment
          </Text>
          <Text className="text-white/70 text-center mt-2">
            Go to Home to find new pickup requests
          </Text>
        </View>
      );
    } else {
      return allCompletedRequests.length > 0 ? (
        <FlatList
          data={allCompletedRequests}
          renderItem={renderPickupItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center mt-10">
              <FontAwesomeIcon icon={faCheckCircle} size={60} color="#CCE1DB" />
              <Text className="text-white text-lg mt-4 text-center">
                No completed tasks yet
              </Text>
              <Text className="text-white/70 text-center mt-2">
                Your completed pickups will appear here
              </Text>
            </View>
          }
        />
      ) : (
        <View className="flex-1 justify-center items-center mt-10">
          <FontAwesomeIcon icon={faCheckCircle} size={60} color="#CCE1DB" />
          <Text className="text-white text-lg mt-4 text-center">
            No completed tasks yet
          </Text>
          <Text className="text-white/70 text-center mt-2">
            Your completed pickups will appear here
          </Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#164C3E]">
      <View className="px-6 pt-14 flex-1">
        <Text className="text-white text-3xl font-bold mb-6">My Tasks</Text>

        {/* Tabs */}
        <View className="flex-row bg-white/20 rounded-full p-1 mb-6">
          <TouchableOpacity
            className={`flex-1 py-2 rounded-full ${
              activeTab === "active" ? "bg-white" : ""
            }`}
            onPress={() => setActiveTab("active")}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === "active" ? "text-primary-500" : "text-white"
              }`}
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 rounded-full ${
              activeTab === "completed" ? "bg-white" : ""
            }`}
            onPress={() => setActiveTab("completed")}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === "completed" ? "text-primary-500" : "text-white"
              }`}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        {/* Task List */}
        <View className="flex-1">{renderTaskContent()}</View>
      </View>
    </SafeAreaView>
  );
}
