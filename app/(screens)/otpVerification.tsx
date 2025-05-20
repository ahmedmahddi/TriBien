import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View,SafeAreaView  } from "react-native";


// Form data interface
interface OtpVerificationData {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
}

// Form validation errors interface
interface OtpVerificationErrors {
  otpError: string;
}

const OtpVerificationScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams<{ email: string }>();

  // Get and decode email from params
  const userEmail = params.email
    ? decodeURIComponent(params.email)
    : "your email";

  // Hide header
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Refs for OTP inputs for auto-focus
  const input1Ref = useRef<TextInput>(null);
  const input2Ref = useRef<TextInput>(null);
  const input3Ref = useRef<TextInput>(null);
  const input4Ref = useRef<TextInput>(null);

  // Form state with initial values
  const [formData, setFormData] = useState<OtpVerificationData>({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });

  // Individual state variables
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");

  // Timer state for resend function
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Initialize errors with empty value
  const [errors, setErrors] = useState<OtpVerificationErrors>({
    otpError: "",
  });

  // Add success state
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Update both individual state and form data state
  const updateField = (field: keyof OtpVerificationData, value: string) => {
    // Only allow number input
    if (!/^\d*$/.test(value)) return;

    // Only allow single digit
    if (value.length > 1) value = value.charAt(0);

    // Update individual state variables
    switch (field) {
      case "otp1":
        setOtp1(value);
        break;
      case "otp2":
        setOtp2(value);
        break;
      case "otp3":
        setOtp3(value);
        break;
      case "otp4":
        setOtp4(value);
        break;
    }

    // Update formData state
    setFormData(prev => ({ ...prev, [field]: value }));

    // Auto focus next input if value is entered
    if (value) {
      if (field === "otp1" && input2Ref.current) input2Ref.current.focus();
      if (field === "otp2" && input3Ref.current) input3Ref.current.focus();
      if (field === "otp3" && input4Ref.current) input4Ref.current.focus();
    }
  };

  // Timer for resend functionality
  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Resend OTP function
  const handleResendOTP = () => {
    if (!canResend) return;

    // Reset timer and OTP fields
    setTimeLeft(60);
    setCanResend(false);
    setOtp1("");
    setOtp2("");
    setOtp3("");
    setOtp4("");
    setFormData({ otp1: "", otp2: "", otp3: "", otp4: "" });
    setErrors({ otpError: "" });

    // Focus first input
    if (input1Ref.current) input1Ref.current.focus();

    // Here you would call your API to resend OTP
    console.log("Resending OTP...");
  };

  const handleVerify = () => {
    let hasError = false;
    const newErrors: OtpVerificationErrors = {
      otpError: "",
    };

    // Check if all fields are filled
    if (!otp1 || !otp2 || !otp3 || !otp4) {
      newErrors.otpError = "Please enter the complete verification code";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      // Show success message
      setVerificationSuccess(true);

      // Navigate to login screen after a short delay
      setTimeout(() => {
        router.push("/loginScreen");
      }, 1500);
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
              Verification
            </Text>
          </View>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("@/assets/images/1.png")}
            style={{ width: 250, height: 250 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <Text className="text-gray-700 text-lg font-semibold mb-2 text-center">
          OTP Verification
        </Text>
        <Text className="text-gray-500 text-base mb-8 text-center">
          Enter the verification code we just sent to{" "}
          <Text className="font-semibold text-primary-500">{userEmail}</Text>.
        </Text>

        <View className="form space-y-6">
          <View className="flex-row justify-between">
            <TextInput
              ref={input1Ref}
              className={`bg-gray-100 p-4 text-primary-400 text-xl font-bold text-center rounded-xl w-16 h-16 ${
                errors.otpError ? "border-2 border-red-500" : ""
              }`}
              value={otp1}
              onChangeText={text => updateField("otp1", text)}
              keyboardType="number-pad"
              maxLength={1}
            />
            <TextInput
              ref={input2Ref}
              className={`bg-gray-100 p-4 text-primary-400 text-xl font-bold text-center rounded-xl w-16 h-16 ${
                errors.otpError ? "border-2 border-red-500" : ""
              }`}
              value={otp2}
              onChangeText={text => updateField("otp2", text)}
              keyboardType="number-pad"
              maxLength={1}
            />
            <TextInput
              ref={input3Ref}
              className={`bg-gray-100 p-4 text-primary-400 text-xl font-bold text-center rounded-xl w-16 h-16 ${
                errors.otpError ? "border-2 border-red-500" : ""
              }`}
              value={otp3}
              onChangeText={text => updateField("otp3", text)}
              keyboardType="number-pad"
              maxLength={1}
            />
            <TextInput
              ref={input4Ref}
              className={`bg-gray-100 p-4 text-primary-400 text-xl font-bold text-center rounded-xl w-16 h-16 ${
                errors.otpError ? "border-2 border-red-500" : ""
              }`}
              value={otp4}
              onChangeText={text => updateField("otp4", text)}
              keyboardType="number-pad"
              maxLength={1}
            />
          </View>

          {errors.otpError ? (
            <Text className="text-red-500 text-center">{errors.otpError}</Text>
          ) : null}

          {verificationSuccess ? (
            <View className="bg-green-100 p-4 rounded-xl my-2">
              <Text className="text-green-700 text-center font-semibold">
                Verification successful! Redirecting...
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              className="py-3 bg-primary-500 rounded-full mt-4"
              onPress={handleVerify}
            >
              <Text className="text-xl font-bold text-center text-white">
                Verify
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="flex-row justify-center items-center mt-8">
          <Text className="text-gray-600">Didn&apos;t receive the code? </Text>
          <TouchableOpacity onPress={handleResendOTP} disabled={!canResend}>
            <Text
              className={`font-bold ${
                canResend ? "text-primary-500" : "text-gray-400"
              }`}
            >
              {canResend ? "Resend" : `Resend in ${timeLeft}s`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OtpVerificationScreen;
