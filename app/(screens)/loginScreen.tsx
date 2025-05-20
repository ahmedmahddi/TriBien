import {
  faApple,
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Form data interface
interface LoginFormData {
  email: string;
  password: string;
}

// Form validation errors interface
interface LoginFormErrors {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  // Form state with initial values
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  // Individual state variables for each field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Initialize errors with empty values
  const [errors, setErrors] = useState<LoginFormErrors>({
    email: "",
    password: "",
  });

  // Update both individual state and form data state
  const updateField = (field: keyof LoginFormData, value: string) => {
    // Update individual state variables
    switch (field) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }

    // Update formData state
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    let hasError = false;
    const newErrors: LoginFormErrors = {
      email: "",
      password: "",
    };

    // Check for empty fields
    if (!email) {
      newErrors.email = "Email is required";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      hasError = true;
    }

    // Password validation
    if (password && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      // Navigate to the main app
      router.push("/(tabs)");
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
          </View>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("@/assets/images/1.png")}
            style={{ width: 350, height: 350 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-4">
          <View>
            <TextInput
              className={`bg-gray-100 p-4 text-primary-400 rounded-2xl mb-3 ${
                errors.email ? "border-2 border-red-500" : ""
              }`}
              value={email}
              onChangeText={text => updateField("email", text)}
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>

          <View>
            <TextInput
              className={`bg-gray-100 p-4 text-primary-400 rounded-2xl ${
                errors.password ? "border-2 border-red-500" : ""
              }`}
              secureTextEntry
              value={password}
              onChangeText={text => updateField("password", text)}
              placeholder="Password"
            />
          </View>
          <TouchableOpacity
            className="flex items-end mb-5 mt-2"
            onPress={() => router.push("/forgetPassword")}
          >
            <Text className="text-primary-200 font-bold">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-3 bg-primary-500 rounded-full"
            onPress={handleLogin}
          >
            <Text className="text-xl font-bold text-center text-white">
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-evenly mt-12 ">
          <TouchableOpacity className="p-2 bg-gray-200 rounded-full">
            <FontAwesomeIcon icon={faGoogle} size={32} color="#164C3E" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-200 rounded-full">
            <FontAwesomeIcon icon={faFacebook} size={32} color="#164C3E" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-200 rounded-full">
            <FontAwesomeIcon icon={faApple} size={32} color="#164C3E" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-700 font-semibold text-xl ">
            Don&apos;t have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/signUpScreen")}>
            <Text className="text-xl font-bold text-center text-primary-200">
              {" "}
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
