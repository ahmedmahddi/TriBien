import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faTimes,
  faRecycle,
  faTrash,
  faInfoCircle,
  // Catalog item icons
  faBoxOpen,
  faShoppingBag,
  faTrashAlt,
  faAppleAlt,
  faScroll,
  faBottleWater, // For Plastic Bottle
  faJar, // For Glass Jar
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "expo-router";
import { mockCatalogItems } from "@/mockdata/catalog"; // Import mock data

// Mapping from icon identifier strings to actual icon objects
const iconMap: { [key: string]: any } = {
  faRecycle, // For Aluminum Can
  faBoxOpen,
  faShoppingBag,
  faTrashAlt,
  faAppleAlt,
  faScroll,
  faBottleWater,
  faJar,
};

export default function CatalogScreen() {
  const [selectedType, setSelectedType] = useState<string | null>("recyclable");
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#164C3E]">
      {/* Header */}
      <View className="px-6 pt-14 pb-6">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4 z-10">
            <FontAwesomeIcon icon={faArrowLeft} size={24} color="#fff" />
          </TouchableOpacity>
          <View className="flex-1 items-center absolute w-full">
            <Text className="text-white text-xl font-semibold">Catalog</Text>
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
          {/* Waste Type Selection */}
          <View className="mb-6">
            <Text className="text-[#164C3E] text-lg font-semibold mb-4">
              Select Waste Type
            </Text>
            <View className="flex-row space-x-4">
              <TouchableOpacity
                className={`flex-1 p-4 rounded-[16px] border-2 ${
                  selectedType === "recyclable"
                    ? "border-[#164C3E] bg-[#E8F1EE]"
                    : "border-gray-200 bg-white"
                }`}
                onPress={() => setSelectedType("recyclable")}
              >
                <View className="flex-row items-center mb-2">
                  <FontAwesomeIcon
                    icon={faRecycle}
                    size={20}
                    color={
                      selectedType === "recyclable" ? "#164C3E" : "#6b7280"
                    }
                  />
                  <Text
                    className={`ml-2 text-base font-semibold ${
                      selectedType === "recyclable"
                        ? "text-[#164C3E]"
                        : "text-gray-600"
                    }`}
                  >
                    Recyclable
                  </Text>
                </View>
                <Text className="text-sm text-gray-500">
                  Plastic bottles, paper, cans, etc.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 p-4 rounded-[16px] border-2 ${
                  selectedType === "non-recyclable"
                    ? "border-red-600 bg-red-50"
                    : "border-gray-200 bg-white"
                }`}
                onPress={() => setSelectedType("non-recyclable")}
              >
                <View className="flex-row items-center mb-2">
                  <FontAwesomeIcon
                    icon={faTrash}
                    size={20}
                    color={
                      selectedType === "non-recyclable" ? "#dc2626" : "#6b7280"
                    }
                  />
                  <Text
                    className={`ml-2 text-base font-semibold ${
                      selectedType === "non-recyclable"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    Non-Recyclable
                  </Text>
                </View>
                <Text className="text-sm text-gray-500">
                  Food waste, diapers, etc.
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Available Items */}
          {selectedType && (
            <View className="mb-6">
              <Text className="text-[#164C3E] text-lg font-semibold mb-4">
                Available Items
              </Text>
              <View className="space-y-4">
                {mockCatalogItems
                  .filter(item => item.type === selectedType)
                  .map(item => (
                    <View
                      key={item.id}
                      className="bg-white rounded-[16px] shadow-sm border border-gray-100 p-4"
                    >
                      <View className="flex-row items-center mb-3">
                        <View className="w-14 h-14 rounded-lg bg-gray-100 mr-4 items-center justify-center">
                          {/* Conditional rendering: Icon or Image */}
                          {item.imageType === "icon" && item.imageIdentifier ? (
                            <FontAwesomeIcon
                              icon={iconMap[item.imageIdentifier]} // Use the map here
                              size={32}
                              color="#6b7280"
                            />
                          ) : (
                            // Fallback or Placeholder if needed, though should not be hit if data is correct
                            <View /> // Empty view for now if imageType isn't icon
                            // OR you could potentially show the Image if imageUrl exists:
                            // <Image source={{ uri: item.imageUrl }} className="w-full h-full" resizeMode="contain" />
                          )}
                        </View>
                        <View className="flex-1">
                          <Text className="text-base font-semibold text-gray-800">
                            {item.name}
                          </Text>
                          <Text className="text-sm text-gray-500">
                            {item.material}
                          </Text>
                        </View>
                        <TouchableOpacity
                          className={`w-10 h-10 rounded-full items-center justify-center ${
                            item.accepted ? "bg-[#E8F1EE]" : "bg-red-50"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={item.accepted ? faCheck : faTimes}
                            size={16}
                            color={item.accepted ? "#164C3E" : "#dc2626"}
                          />
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row items-center">
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          size={14}
                          color="#6b7280"
                        />
                        <Text className="text-sm text-gray-500 ml-2">
                          {item.info}
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
