import { View, Text, TouchableOpacity, Image, TextInput,SafeAreaView  } from "react-native";
import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation, useRouter } from "expo-router";

// Form data interface
interface ForgetPasswordData {
  email: string;
}

// Form validation errors interface
interface ForgetPasswordErrors {
  email: string;
}

const ForgetPasswordScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  // Hide header
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Form state with initial value
  const [formData, setFormData] = useState<ForgetPasswordData>({
    email: "",
  });

  // Individual state variable
  const [email, setEmail] = useState("");

  // Initialize errors with empty value
  const [errors, setErrors] = useState<ForgetPasswordErrors>({
    email: "",
  });

  // Update both individual state and form data state
  const updateField = (field: keyof ForgetPasswordData, value: string) => {
    // Update individual state variable
    setEmail(value);

    // Update formData state
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    let hasError = false;
    const newErrors: ForgetPasswordErrors = {
      email: "",
    };

    // Check for empty field
    if (!email) {
      newErrors.email = "Email is required";
      hasError = true;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      // Navigate to OTP verification with email param
      router.push({
        pathname: "/otpVerification",
        params: { email: encodeURIComponent(email) },
      });
    }
  };

  return (
    <View className="flex-1 bg-primary-500">
      <SafeAreaView className="flex">
        <View className="px-6 pt-6 pb-6">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mr-4 z-10"
            >
              <FontAwesomeIcon icon={faArrowLeft} size={20} color="#fff" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-semibold">
              Forgot Password
            </Text>
          </View>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("@/assets/images/1.png")}
            style={{ width: 280, height: 280 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <Text className="text-gray-700 text-base mb-6 text-center">
          Please enter your email address. We'll send you a verification code to
          reset your password.
        </Text>
        <View className="form space-y-6">
          <View>
            <TextInput
              className={`bg-gray-100 p-4 text-primary-400 rounded-2xl mb-1 ${
                errors.email ? "border-2 border-red-500" : ""
              }`}
              value={email}
              onChangeText={text => updateField("email", text)}
              placeholder="Email"
              keyboardType="email-address"
            />
            {errors.email ? (
              <Text className="text-red-500 ml-2">{errors.email}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            className="py-3 bg-primary-500 rounded-full mt-4"
            onPress={handleSubmit}
          >
            <Text className="text-xl font-bold text-center text-white">
              Continue
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-8">
          <TouchableOpacity onPress={() => router.push("/loginScreen")}>
            <Text className="text-lg font-bold text-center text-primary-200">
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgetPasswordScreen;
