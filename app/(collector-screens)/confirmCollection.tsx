import { pickupRequests } from "@/mockdata/pickups";
import {
  faArrowLeft,
  faCamera,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ConfirmCollectionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [request, setRequest] = useState<(typeof pickupRequests)[0] | null>(
    null
  );
  const [actualWeight, setActualWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1611284446314-4ab1d18bdc51",
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Find the request by id
    const foundRequest = pickupRequests.find(req => req.id === id);
    if (foundRequest) {
      setRequest(foundRequest);
      // Pre-fill with estimated weight
      setActualWeight(foundRequest.estimatedWeight.replace("kg", ""));
    }
  }, [id]);

  const handleAddPhoto = () => {
    // Mock adding a photo
    const mockPhotos = [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
      "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a",
    ];

    // Pick a random photo from the mock list
    const randomIndex = Math.floor(Math.random() * mockPhotos.length);
    setPhotos([...photos, mockPhotos[randomIndex]]);
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const handleSubmit = () => {
    if (!actualWeight) {
      alert("Please enter the actual weight");
      return;
    }

    if (photos.length === 0) {
      alert("Please add at least one photo of the collection");
      return;
    }

    setIsSubmitting(true);

    // Simulate a network request
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to the success screen
      router.replace({
        pathname: "/(collector-screens)/collectionSuccess",
        params: { id },
      });
    }, 1500);
  };

  if (!request) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="flex-1 bg-[#164C3E]">
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg">Loading...</Text>
          </View>
        </SafeAreaView>
      </>
    );
  }

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
                Confirm Collection
              </Text>
            </View>

            {/* Collection Details Form */}
            <View className="bg-white rounded-2xl p-5 mb-5">
              <Text className="text-primary-500 text-lg font-bold mb-4">
                Collection Details
              </Text>

              <View className="mb-4">
                <Text className="text-gray-500 mb-2">Waste Type</Text>
                <View className="bg-gray-100 p-3 rounded-xl">
                  <Text className="text-primary-500 font-semibold">
                    {request.wasteType}
                  </Text>
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-gray-500 mb-2">Estimated Weight</Text>
                <View className="bg-gray-100 p-3 rounded-xl">
                  <Text className="text-primary-500 font-semibold">
                    {request.estimatedWeight}
                  </Text>
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-gray-500 mb-2">
                  Actual Weight (kg) <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className="bg-gray-100 p-3 rounded-xl text-primary-500"
                  value={actualWeight}
                  onChangeText={setActualWeight}
                  placeholder="Enter actual weight in kg"
                  keyboardType="numeric"
                />
              </View>

              <View className="mb-4">
                <Text className="text-gray-500 mb-2">Additional Notes</Text>
                <TextInput
                  className="bg-gray-100 p-3 rounded-xl text-primary-500 min-h-20"
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Any additional notes about the collection"
                  multiline
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Photos Section */}
            <View className="bg-white rounded-2xl p-5 mb-8">
              <Text className="text-primary-500 text-lg font-bold mb-4">
                Collection Photos <Text className="text-red-500">*</Text>
              </Text>
              <Text className="text-gray-500 mb-4">
                Please take photos of the waste before collection
              </Text>

              <View className="flex-row flex-wrap">
                {photos.map((photo, index) => (
                  <View
                    key={index}
                    className="relative w-1/3 aspect-square p-1"
                  >
                    <Image
                      source={{ uri: photo }}
                      className="w-full h-full rounded-xl"
                    />
                    <TouchableOpacity
                      className="absolute top-3 right-3 bg-red-500 rounded-full w-6 h-6 items-center justify-center"
                      onPress={() => handleRemovePhoto(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} size={12} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity
                  className="w-1/3 aspect-square p-1"
                  onPress={handleAddPhoto}
                >
                  <View className="w-full h-full rounded-xl bg-gray-100 items-center justify-center border-2 border-dashed border-gray-300">
                    <FontAwesomeIcon
                      icon={faCamera}
                      size={24}
                      color="#164C3E"
                    />
                    <Text className="text-primary-500 mt-2">Add Photo</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className={`bg-primary-500 rounded-full py-4 mb-8 flex-row justify-center items-center ${
                isSubmitting ? "opacity-70" : ""
              }`}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Text className="text-white font-bold text-lg">
                  Submitting...
                </Text>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCheck} size={20} color="#fff" />
                  <Text className="text-white font-bold text-lg ml-2">
                    Confirm Collection
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
