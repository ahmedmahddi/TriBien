import { useUser } from "@/context/UserContext";
import {
  faArrowLeft,
  faCalendarAlt,
  faCheck,
  faChevronDown,
  faMapMarkerAlt,
  faStar,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { format, isToday, parseISO } from "date-fns";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import MapView, { Marker, Region, UrlTile } from "react-native-maps";

interface PickupDetails {
  day: string;
  time: string;
  packageSize: string;
  location: string;
  locationDetail: string;
}

// Define Option type
type Option = { label: string; value: string };

// Helper function to generate hourly options (AM/PM format)
const generateHourlyOptions = (): Option[] => {
  const options: Option[] = [];
  for (let i = 0; i < 24; i++) {
    const date = new Date();
    date.setHours(i, 0, 0, 0); // Set hour, reset minutes/seconds
    const label = format(date, "h:mm aa"); // e.g., "1:00 PM"
    options.push({ label, value: label });
  }
  return options;
};

// Generate the full list once
const allTimeOptions = generateHourlyOptions();

// Default region (Bandung)
const DEFAULT_REGION = {
  latitude: -6.9175,
  longitude: 107.6191,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Added Nominatim Result Interface
interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
}

export default function ScheduleScreen() {
  const { user, setUser } = useUser();
  const [pickupDetails, setPickupDetails] = useState<PickupDetails>({
    day: format(new Date(), "EEEE, MMMM d"),
    time: "10:00 AM",
    packageSize: "Medium",
    location: "Fetching location...",
    locationDetail: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const router = useRouter();

  // State for custom picker modal
  const [isPickerModalVisible, setIsPickerModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState<
    "time" | "packageSize" | null
  >(null);
  const [modalOptions, setModalOptions] = useState<Option[]>([]);

  // State for calendar modal
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );

  // State for map
  const [mapRegion, setMapRegion] = useState<Region>(DEFAULT_REGION);
  const [locationStatus, setLocationStatus] = useState<string>("pending");
  const [mapReady, setMapReady] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isFetchingCurrentLocation, setIsFetchingCurrentLocation] =
    useState(false);
  const [markerCoordinate, setMarkerCoordinate] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // --- State for Nominatim Search Modal ---
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<NominatimResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Effect to adjust time if selected date makes current time invalid
  useEffect(() => {
    const now = new Date();
    const selectedDay = parseISO(selectedDate);

    if (isToday(selectedDay)) {
      const currentHour = now.getHours();
      let selectedHour = -1;
      // Find the hour index (0-23) corresponding to the selected time string
      const timeIndex = allTimeOptions.findIndex(
        opt => opt.value === pickupDetails.time
      );
      if (timeIndex !== -1) {
        selectedHour = timeIndex;
      }

      // If a valid time was selected AND it's in the past for today
      if (selectedHour !== -1 && selectedHour <= currentHour) {
        // Find the first available hour AFTER the current hour
        const firstAvailable = allTimeOptions.find(
          (opt, index) => index > currentHour
        );
        setPickupDetails(prev => ({
          ...prev,
          // Set to first available hour, or a placeholder if none left today
          time: firstAvailable ? firstAvailable.value : "Select available time",
        }));
      }
    } else {
      // If a future date is selected, ensure time isn't the placeholder
      if (pickupDetails.time === "Select available time") {
        setPickupDetails(prev => ({ ...prev, time: "10:00 AM" })); // Reset to default
      }
    }
  }, [selectedDate]); // Rerun only when selectedDate changes

  // Get location effect
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationStatus("Permission denied");
        setMapRegion(DEFAULT_REGION);
        setPickupDetails(prev => ({
          ...prev,
          location: "Set location manually",
        }));
        setMapReady(true);
        return;
      }
      // Fetch initial location and address
      await fetchAndSetCurrentLocation();
      setMapReady(true);
    })();
  }, []);

  // Define options for each picker
  const timeOptions: Option[] = [
    { label: "10:00 AM", value: "10:00 AM" },
    { label: "11:00 AM", value: "11:00 AM" },
    { label: "12:00 PM", value: "12:00 PM" },
    { label: "1:00 PM", value: "1:00 PM" },
    { label: "2:00 PM", value: "2:00 PM" },
  ];
  const packageSizeOptions: Option[] = [
    { label: "Small", value: "Small" },
    { label: "Medium", value: "Medium" },
    { label: "Large", value: "Large" },
  ];

  const openPickerModal = (
    field: "time" | "packageSize"
    // options: Option[] - Removed, generated dynamically for time
  ) => {
    setCurrentField(field);
    if (field === "packageSize") {
      setModalOptions(packageSizeOptions);
    } else if (field === "time") {
      const now = new Date();
      const currentHour = now.getHours();
      const selectedDay = parseISO(selectedDate);

      let availableOptions = allTimeOptions;

      if (isToday(selectedDay)) {
        // Filter to hours strictly after the current hour
        availableOptions = allTimeOptions.filter((option, index) => {
          // index corresponds to the hour (0-23)
          return index > currentHour;
        });
      }
      setModalOptions(availableOptions);
    }
    setIsPickerModalVisible(true);
  };

  const handleOptionSelect = (value: string) => {
    if (currentField) {
      setPickupDetails(prev => ({ ...prev, [currentField]: value }));
    }
    setIsPickerModalVisible(false);
    setCurrentField(null);
  };

  const handleDaySelect = (day: DateData) => {
    const formattedDate = format(new Date(day.timestamp), "EEEE, MMMM d");
    setPickupDetails(prev => ({ ...prev, day: formattedDate }));
    setSelectedDate(day.dateString);
    setIsCalendarModalVisible(false);
  };

  const handleSchedulePickup = () => {
    setShowConfirmation(false);
    setShowFeedback(true);
  };

  const handleSubmitFeedback = () => {
    setUser(prev => {
      const newPoints = prev.points + 50;
      return { ...prev, points: newPoints };
    });
    setShowFeedback(false);
    setRating(0);
  };

  const getAddressFromCoordinates = async (
    latitude: number,
    longitude: number
  ) => {
    setIsGeocoding(true);
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (result.length > 0) {
        const addr = result[0];
        const formattedAddress = [
          addr.streetNumber,
          addr.street,
          addr.city,
          addr.region,
        ]
          .filter(Boolean)
          .join(", ");
        setPickupDetails(prev => ({
          ...prev,
          location: formattedAddress || "Address not found",
        }));
      } else {
        setPickupDetails(prev => ({ ...prev, location: "Address not found" }));
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      setPickupDetails(prev => ({
        ...prev,
        location: "Error fetching address",
      }));
    } finally {
      setIsGeocoding(false);
    }
  };

  // --- Fetch Current Location & Set ---
  const fetchAndSetCurrentLocation = async () => {
    if (isFetchingCurrentLocation || isGeocoding) return;
    setIsFetchingCurrentLocation(true);
    setLocationStatus("Fetching location...");
    setPickupDetails(prev => ({ ...prev, location: "Fetching location..." }));
    try {
      // Re-check permissions just in case
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationStatus("Permission denied");
        setPickupDetails(prev => ({ ...prev, location: "Permission denied" }));
        setIsFetchingCurrentLocation(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      const newRegion = {
        ...coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setMapRegion(newRegion);
      setMarkerCoordinate(coords);
      setLocationStatus("granted");
      await getAddressFromCoordinates(coords.latitude, coords.longitude);
    } catch (error) {
      console.error("Error fetching current location:", error);
      setLocationStatus("Error fetching location");
      setPickupDetails(prev => ({
        ...prev,
        location: "Could not get location",
      }));
    } finally {
      setIsFetchingCurrentLocation(false);
    }
  };

  // --- Nominatim Search Handlers ---
  const handleSearchAddress = async () => {
    if (!searchQuery.trim() || isSearching) return;
    setIsSearching(true);
    setSearchResults([]);
    try {
      // IMPORTANT: Respect Nominatim Usage Policy (max 1 req/sec)
      // https://operations.osmfoundation.org/policies/nominatim/
      // Add a specific User-Agent header
      const userAgent = "RecyclingApp/1.0 (YourAppName; contact@example.com)"; // Replace with your app details

      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        searchQuery
      )}&format=json&addressdetails=1&limit=5`;

      console.log("Nominatim URL:", url); // Log the URL being fetched

      const response = await fetch(url, {
        headers: {
          "User-Agent": userAgent,
        },
      });

      // Log the raw response text BEFORE parsing
      const responseText = await response.text();
      console.log("Nominatim Raw Response:", responseText);

      // Now try to parse the logged text
      const data = JSON.parse(responseText);

      if (Array.isArray(data)) {
        setSearchResults(data as NominatimResult[]);
      } else {
        console.warn("Nominatim search returned non-array data:", data);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching Nominatim:", error); // The original JSON parse error will likely show here
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (result: NominatimResult) => {
    const coords = {
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon),
    };
    const newRegion = {
      ...coords,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    setPickupDetails(prev => ({ ...prev, location: result.display_name }));
    setMapRegion(newRegion);
    setMarkerCoordinate(coords);
    setIsSearchModalVisible(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <View className="flex-1 bg-[#164C3E]">
      {/* Header */}
      <View className="px-6 pt-14 pb-6">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4 z-10">
            <FontAwesomeIcon icon={faArrowLeft} size={24} color="#fff" />
          </TouchableOpacity>
          <View className="flex-1 items-center absolute w-full">
            <Text className="text-white text-xl font-semibold">
              Pickup and Pack
            </Text>
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
          <View className="space-y-6">
            {/* Pickup Day - Calendar Picker */}
            <View>
              <Text className="text-[#164C3E] text-base font-semibold mb-2">
                Pickup Day
              </Text>
              <TouchableOpacity
                className="bg-[#F8F9FA] border border-gray-200 rounded-[16px] p-4 flex-row justify-between items-center h-[56px]"
                onPress={() => setIsCalendarModalVisible(true)}
              >
                <View className="flex-row items-center">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    size={16}
                    color="#6B7280"
                    style={{ marginRight: 8 }}
                  />
                  <Text className="text-base text-[#164C3E]">
                    {pickupDetails.day}
                  </Text>
                </View>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size={16}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            {/* Pickup Time - Replaced Picker */}
            <View>
              <Text className="text-[#164C3E] text-base font-semibold mb-2">
                Pickup Time
              </Text>
              <TouchableOpacity
                className="bg-[#F8F9FA] border border-gray-200 rounded-[16px] p-4 flex-row justify-between items-center h-[56px]"
                onPress={() => openPickerModal("time")}
              >
                <Text
                  className={`text-base ${
                    pickupDetails.time === "Select available time"
                      ? "text-gray-400"
                      : "text-[#164C3E]"
                  }`}
                >
                  {pickupDetails.time}
                </Text>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size={16}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            {/* Package Size - Replaced Picker */}
            <View>
              <Text className="text-[#164C3E] text-base font-semibold mb-2">
                Package Size
              </Text>
              <TouchableOpacity
                className="bg-[#F8F9FA] border border-gray-200 rounded-[16px] p-4 flex-row justify-between items-center h-[56px]"
                onPress={() => openPickerModal("packageSize")}
              >
                <Text className="text-base text-[#164C3E]">
                  {pickupDetails.packageSize}
                </Text>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size={16}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            {/* Pickup Location - Map View */}
            <View>
              <Text className="text-[#164C3E] text-base font-semibold mb-2">
                Pickup Location (Set via map or search)
              </Text>
              <View className="h-48 rounded-[16px] mb-4 overflow-hidden relative">
                <View className="bg-gray-200 h-full w-full items-center justify-center">
                  {!mapReady ? (
                    <ActivityIndicator size="large" color="#164C3E" />
                  ) : (
                    <MapView
                      style={{ width: "100%", height: "100%" }}
                      region={mapRegion}
                      showsUserLocation={locationStatus === "granted"}
                      showsMyLocationButton={false}
                    >
                      <UrlTile
                        urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maximumZ={19}
                        tileSize={256}
                      />
                      {markerCoordinate && (
                        <Marker coordinate={markerCoordinate} />
                      )}
                    </MapView>
                  )}
                </View>
              </View>

              {/* Display Address & Search Button */}
              <View className="bg-white rounded-[16px] border border-gray-100 p-4 mb-4 shadow-sm">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1 mr-2">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      size={16}
                      color="#EF4444"
                      style={{
                        opacity:
                          isGeocoding || isFetchingCurrentLocation ? 0.5 : 1,
                      }}
                    />
                    <Text
                      className="text-base text-gray-800 ml-2 flex-shrink"
                      numberOfLines={2}
                    >
                      {isFetchingCurrentLocation
                        ? "Fetching location..."
                        : isGeocoding
                        ? "Fetching address..."
                        : pickupDetails.location}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="bg-[#E8F1EE] px-4 py-2 rounded-full"
                    onPress={() => setIsSearchModalVisible(true)}
                  >
                    <Text className="text-sm font-semibold text-[#164C3E]">
                      Search
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Location Detail */}
            <View>
              <Text className="text-[#164C3E] text-base font-semibold mb-2">
                Location Notes (optional)
              </Text>
              <TextInput
                className="p-4 bg-[#F8F9FA] border border-gray-200 rounded-[16px] text-base text-[#164C3E]"
                placeholder="E.g., Gate code #123, leave at front door"
                placeholderTextColor="#9CA3AF"
                value={pickupDetails.locationDetail}
                onChangeText={text =>
                  setPickupDetails(prev => ({ ...prev, locationDetail: text }))
                }
              />
            </View>

            {/* Confirm Button */}
            <TouchableOpacity
              className="bg-[#164C3E] py-4 rounded-[16px] items-center mt-4 mb-6"
              onPress={() => setShowConfirmation(true)}
            >
              <Text className="text-white text-lg font-semibold">CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Calendar Modal */}
      <Modal
        visible={isCalendarModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsCalendarModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 justify-end"
          onPress={() => setIsCalendarModalVisible(false)}
        >
          <Pressable onPress={() => {}} className="bg-white rounded-t-[24px]">
            <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
              <Text className="text-lg font-semibold text-[#164C3E]">
                Select Pickup Day
              </Text>
              <TouchableOpacity
                onPress={() => setIsCalendarModalVisible(false)}
                className="p-1"
              >
                <FontAwesomeIcon icon={faTimes} size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <Calendar
              current={selectedDate}
              minDate={format(new Date(), "yyyy-MM-dd")}
              onDayPress={handleDaySelect}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: "#164C3E",
                },
              }}
              theme={{
                arrowColor: "#164C3E",
                todayTextColor: "#10B981",
                selectedDayBackgroundColor: "#164C3E",
                selectedDayTextColor: "#ffffff",
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>

      {/* Custom Picker Modal */}
      <Modal
        visible={isPickerModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsPickerModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 justify-end"
          onPress={() => setIsPickerModalVisible(false)}
        >
          <Pressable onPress={() => {}} className="bg-white rounded-t-[24px]">
            <View className="p-6 border-b border-gray-200">
              <Text className="text-lg font-semibold text-[#164C3E] text-center">
                Select {currentField === "time" ? "Time" : "Package Size"}
              </Text>
              <TouchableOpacity
                onPress={() => setIsPickerModalVisible(false)}
                className="absolute top-5 right-5 p-1"
              >
                <FontAwesomeIcon icon={faTimes} size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <ScrollView className="max-h-60">
              {modalOptions.length > 0 ? (
                modalOptions.map(option => {
                  const isSelected =
                    currentField &&
                    pickupDetails[currentField] === option.value;
                  return (
                    <TouchableOpacity
                      key={option.value}
                      className={`py-4 px-6 flex-row justify-between items-center ${
                        isSelected ? "bg-[#E8F1EE]" : "bg-white"
                      }`}
                      onPress={() => handleOptionSelect(option.value)}
                    >
                      <Text
                        className={`text-base ${
                          isSelected
                            ? "font-semibold text-[#164C3E]"
                            : "text-gray-800"
                        }`}
                      >
                        {option.label}
                      </Text>
                      {isSelected && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          size={16}
                          color="#164C3E"
                        />
                      )}
                    </TouchableOpacity>
                  );
                })
              ) : (
                // Show message if no options are available (e.g., late today)
                <View className="p-6 items-center">
                  <Text className="text-gray-600 text-base text-center">
                    No available pickup times left for today. Please select a
                    future date.
                  </Text>
                </View>
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* --- Nominatim Search Modal --- */}
      <Modal
        visible={isSearchModalVisible}
        animationType="slide"
        onRequestClose={() => {
          setIsSearchModalVisible(false);
          setSearchQuery("");
          setSearchResults([]);
        }}
      >
        <View className="flex-1 pt-12 bg-white">
          {/* Modal Header */}
          <View className="flex-row items-center justify-between px-4 pb-2 border-b border-gray-200">
            <Text className="text-lg font-semibold text-[#164C3E]">
              Search Address
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsSearchModalVisible(false);
                setSearchQuery("");
                setSearchResults([]);
              }}
              className="p-2"
            >
              <FontAwesomeIcon icon={faTimes} size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Search Input and Button */}
          <View className="flex-row items-center p-4 space-x-2">
            <TextInput
              className="flex-1 p-3 border border-gray-300 rounded-lg text-base"
              placeholder="Enter address, place, or landmark..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearchAddress}
            />
            <TouchableOpacity
              className={`p-3 rounded-lg ${
                isSearching || !searchQuery.trim()
                  ? "bg-gray-400"
                  : "bg-[#164C3E]"
              }`}
              onPress={handleSearchAddress}
              disabled={isSearching || !searchQuery.trim()}
            >
              {isSearching ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white font-semibold">Search</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Search Results */}
          <FlatList
            data={searchResults}
            keyExtractor={item => item.place_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-4 border-b border-gray-100"
                onPress={() => handleSelectSearchResult(item)}
              >
                <Text className="text-base text-gray-800">
                  {item.display_name}
                </Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() =>
              !isSearching && (
                <Text className="text-center text-gray-500 p-4">
                  {searchResults.length === 0 && searchQuery && !isSearching // Check if search was performed
                    ? "No results found."
                    : "Enter an address above and press Search."}
                </Text>
              )
            }
          />
        </View>
      </Modal>

      {/* Confirmation Modal */}
      <Modal visible={showConfirmation} transparent animationType="fade">
        <View className="flex-1 bg-black/60 items-center justify-center p-6">
          <View className="bg-white w-full rounded-[24px] p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-[#164C3E]">
                Confirm Pickup Details
              </Text>
              <TouchableOpacity
                onPress={() => setShowConfirmation(false)}
                className="p-1"
              >
                <FontAwesomeIcon icon={faTimes} size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <View className="space-y-4 mb-6">
              <View className="flex-row justify-between items-center">
                <Text className="text-base text-gray-500">Day:</Text>
                <Text className="text-base font-semibold text-gray-800">
                  {pickupDetails.day}
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-base text-gray-500">Time:</Text>
                <Text className="text-base font-semibold text-gray-800">
                  {pickupDetails.time}
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-base text-gray-500">Package Size:</Text>
                <Text className="text-base font-semibold text-gray-800">
                  {pickupDetails.packageSize}
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-base text-gray-500">Location:</Text>
                <Text
                  className="text-base font-semibold text-gray-800"
                  numberOfLines={1}
                >
                  {pickupDetails.location}
                </Text>
              </View>
              {pickupDetails.locationDetail && (
                <View className="flex-row justify-between items-center">
                  <Text className="text-base text-gray-500">Details:</Text>
                  <Text className="text-base font-semibold text-gray-800">
                    {pickupDetails.locationDetail}
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              className="bg-[#10B981] py-4 rounded-[16px] items-center mb-3"
              onPress={handleSchedulePickup}
            >
              <Text className="text-white text-lg font-semibold">
                SCHEDULE PICKUP
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#E8F1EE] py-4 rounded-[16px] items-center"
              onPress={() => setShowConfirmation(false)}
            >
              <Text className="text-[#164C3E] text-lg font-semibold">
                EDIT DETAILS
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Feedback Modal */}
      <Modal visible={showFeedback} transparent animationType="fade">
        <View className="flex-1 bg-black/60 items-center justify-center p-6">
          <View className="bg-white w-full rounded-[24px] p-6 items-center">
            <TouchableOpacity
              onPress={() => setShowFeedback(false)}
              className="absolute top-4 right-4 p-1"
            >
              <FontAwesomeIcon icon={faTimes} size={20} color="#6B7280" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-[#164C3E] mb-4">
              Pickup Scheduled!
            </Text>
            <Text className="text-base text-gray-600 text-center mb-6">
              How was your scheduling experience?
            </Text>

            <View className="flex-row justify-center space-x-3 mb-6">
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  className="p-1"
                >
                  <FontAwesomeIcon
                    icon={faStar}
                    size={32}
                    color={star <= rating ? "#F59E0B" : "#D1D5DB"}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              className="w-full p-4 bg-[#F8F9FA] border border-gray-200 rounded-[16px] mb-6 text-base text-[#164C3E] h-24"
              placeholder="Share your feedback (optional)"
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
            />
            <TouchableOpacity
              className="w-full bg-[#164C3E] py-4 rounded-[16px] items-center"
              onPress={handleSubmitFeedback}
            >
              <Text className="text-white text-lg font-semibold">
                SUBMIT & EARN 50 POINTS
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
