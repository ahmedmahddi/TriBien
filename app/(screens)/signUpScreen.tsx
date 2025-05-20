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
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Form data interface
interface SignUpFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
}

// Form validation errors interface
interface SignUpFormErrors {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
}

const SignUpScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  // Form state with initial values
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  // For backward compatibility, keep individual state variables
  const [fullName, setFullName] = useState("Ahmed Mahdi");
  const [email, setEmail] = useState("ahmedmahdi@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("01010101010");
  const [address, setAddress] = useState("Egypt, Cairo");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");

  // Initialize errors with empty values
  const [errors, setErrors] = useState<SignUpFormErrors>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  // Update both individual state and form data state
  const updateField = (field: keyof SignUpFormData, value: string) => {
    // Update individual state variables (for backward compatibility)
    switch (field) {
      case "fullName":
        setFullName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
    }

    // Update formData state
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = () => {
    let hasError = false;
    const newErrors: SignUpFormErrors = {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
    };

    // Check for empty fields
    if (!fullName) {
      newErrors.fullName = "Full Name is required";
      hasError = true;
    }
    if (!email) {
      newErrors.email = "Email is required";
      hasError = true;
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
      hasError = true;
    }
    if (!address) {
      newErrors.address = "Address is required";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
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

    // Confirm password validation
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      // Navigate to the role selection screen instead of directly to tabs
      router.push("/selectRole");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 bg-primary-500">
            <SafeAreaView className="flex-1">
              <View className="px-6 pt-14 pb-6">
                <View className="flex-row items-center">
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="mr-4 z-10"
                  >
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      size={20}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="flex-row justify-center">
                <Image
                  source={require("@/assets/images/1.png")}
                  style={{ width: 200, height: 200 }}
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
                      errors.fullName ? "border-2 border-red-500" : ""
                    }`}
                    value={fullName}
                    onChangeText={text => updateField("fullName", text)}
                    placeholder="Full Name"
                  />
                </View>
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
                    className={`bg-gray-100 p-4 text-primary-400 rounded-2xl mb-3 ${
                      errors.phoneNumber ? "border-2 border-red-500" : ""
                    }`}
                    value={phoneNumber}
                    onChangeText={text => updateField("phoneNumber", text)}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                  />
                </View>
                <View>
                  <TextInput
                    className={`bg-gray-100 p-4 text-primary-400 rounded-2xl mb-3 ${
                      errors.address ? "border-2 border-red-500" : ""
                    }`}
                    value={address}
                    onChangeText={text => updateField("address", text)}
                    placeholder="Address"
                  />
                </View>
                <View>
                  <TextInput
                    className={`bg-gray-100 p-4 text-primary-400 rounded-2xl mb-3 ${
                      errors.password ? "border-2 border-red-500" : ""
                    }`}
                    secureTextEntry
                    value={password}
                    onChangeText={text => updateField("password", text)}
                    placeholder="Password"
                  />
                </View>
                <View>
                  <TextInput
                    className={`bg-gray-100 p-4 text-primary-400 rounded-2xl mb-3 ${
                      errors.confirmPassword ? "border-2 border-red-500" : ""
                    }`}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={text => updateField("confirmPassword", text)}
                    placeholder="Confirm Password"
                  />
                </View>
                <TouchableOpacity
                  onPress={handleSignUp}
                  className="py-3 bg-primary-500 rounded-full"
                >
                  <Text className="text-xl font-bold text-center text-white">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
              {/*<Text className="text-2xl text-primary-500 font-bold text-center py-5 ">
                Or
              </Text>*/}
              <View className="flex-row justify-evenly mt-12 ">
                <TouchableOpacity className="p-2 bg-gray-200 rounded-full">
                  <FontAwesomeIcon icon={faGoogle} size={32} color="#164C3E" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2 bg-gray-200 rounded-full">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size={32}
                    color="#164C3E"
                  />
                </TouchableOpacity>
                <TouchableOpacity className="p-2 bg-gray-200 rounded-full">
                  <FontAwesomeIcon icon={faApple} size={32} color="#164C3E" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-center mt-7">
                <Text className="text-gray-700 font-semibold text-xl ">
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => router.push("/loginScreen")}>
                  <Text className="text-xl font-bold text-center text-primary-200">
                    {" "}
                    LOGIN
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
