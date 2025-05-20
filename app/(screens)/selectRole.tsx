import {
  faArrowLeft,
  faLeaf,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

// Role interface
interface Role {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

// Props for the new RoleCard component
interface RoleCardProps {
  role: Role;
  selectedRoleId: SharedValue<string | null>;
  scaleAnim: SharedValue<number>;
  selectedRoleState: string | null; // Non-animated state for border
  onSelect: (id: string) => void;
}

// New RoleCard component
const RoleCard: React.FC<RoleCardProps> = ({
  role,
  selectedRoleId,
  scaleAnim,
  selectedRoleState,
  onSelect,
}) => {
  const roleAnimatedStyle = useAnimatedStyle(() => {
    const isSelected = selectedRoleId.value === role.id;
    return {
      transform: [{ scale: isSelected ? scaleAnim.value : 1 }],
    };
  });

  return (
    <Animated.View key={role.id} style={roleAnimatedStyle}>
      <TouchableOpacity
        className={`flex-row items-center justify-between mb-6 p-6 rounded-2xl ${
          role.color
        } ${
          // Use the non-animated selectedRole state for border
          selectedRoleState === role.id ? "border-2 border-primary-500" : ""
        }`}
        onPress={() => onSelect(role.id)}
      >
        <View className="flex-1">
          <Text className="text-xl font-semibold text-primary-700 mb-1">
            {role.title}
          </Text>
          <Text className="text-primary-600">{role.description}</Text>
        </View>
        <View className="ml-4 h-16 w-16 rounded-full bg-white/50 items-center justify-center">
          <FontAwesomeIcon icon={role.icon} size={32} color="#164C3E" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const SelectRoleScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  // Hide header
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Use useSharedValue instead of Animated.Value
  const scaleAnim = useSharedValue(1);
  const selectedRoleId = useSharedValue<string | null>(null);

  // Available roles - waste management context
  const roles: Role[] = [
    {
      id: "1",
      title: "Recycler",
      description: "+ More details",
      icon: faLeaf,
      color: "bg-primary-100",
    },
    {
      id: "2",
      title: "Collector",
      description: "+ More details",
      icon: faRecycle,
      color: "bg-accent",
    },
  ];

  // Selected role state (keep for enabling/disabling continue button)
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Add a state for success animation
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId); // Keep for non-animated state
    selectedRoleId.value = roleId; // Update shared value for animation

    // Use Reanimated's withSequence and withTiming
    scaleAnim.value = withSequence(
      withTiming(0.95, { duration: 100, easing: Easing.inOut(Easing.ease) }),
      withTiming(1, { duration: 100, easing: Easing.inOut(Easing.ease) })
    );
  };

  const handleContinue = () => {
    if (selectedRole) {
      setShowSuccess(true);
      setTimeout(() => {
        if (selectedRole === "1") {
          router.replace("/(tabs)/" as any);
        } else if (selectedRole === "2") {
          router.replace("/(collector)/" as any);
        }
      }, 1000);
    }
  };

  return (
    <View className="flex-1 bg-primary-500">
      <SafeAreaView className="flex">
        <View className="px-6 pt-14 pb-6">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mr-4 z-10"
            >
              <FontAwesomeIcon icon={faArrowLeft} size={20} color="#fff" />
            </TouchableOpacity>
            <View className="flex-1 items-center absolute w-full">
              <Text className="text-white text-xl font-semibold">
                Select Your Role
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("@/assets/images/2.png")}
            style={{ width: 350, height: 350 }}
          />
        </View>
      </SafeAreaView>

      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className=" items-center ">
          <Text className="text-primary-500 text-xl font-bold mb-2">
            How would you like to participate?
          </Text>
          <Text className="text-gray-500 text-base mb-6">
            Select a role that best describes your recycling goals.
          </Text>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {roles.map(role => (
            <RoleCard
              key={role.id}
              role={role}
              selectedRoleId={selectedRoleId}
              scaleAnim={scaleAnim}
              selectedRoleState={selectedRole}
              onSelect={handleRoleSelect}
            />
          ))}

          {showSuccess ? (
            <View className="bg-light-200 p-4 rounded-xl mb-10">
              <Text className="text-primary-500 text-center font-semibold">
                Role selected! Setting up your account...
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              className={`py-3 bg-primary-500 rounded-full mb-10 ${
                !selectedRole ? "opacity-50" : ""
              }`}
              onPress={handleContinue}
              disabled={!selectedRole}
            >
              <Text className="text-xl font-bold text-center text-white">
                Continue
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default SelectRoleScreen;
