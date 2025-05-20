import NotificationProvider from "@/context/NotificationContext";
import UserProvider from "@/context/UserContext";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./globals.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [appIsReady, setAppIsReady] = useState(true);

  useEffect(() => {
    async function prepareApp() {
      try {
        // App initialization logic can go here
      } catch (e) {
        console.warn("Error preparing app:", e);
      } finally {
        setAppIsReady(true);
        router.replace("/(screens)/onboardingScreen");
      }
    }

    prepareApp();
  }, [router]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <UserProvider>
        <NotificationProvider>
          <StatusBar hidden={true} />
          <SafeAreaView style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen
                name="(screens)/onboardingScreen"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(screens)/loginScreen"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(screens)/signUpScreen"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(screens)/selectRole"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(collector)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(collector-screens)"
                options={{ headerShown: false }}
              />
            </Stack>
          </SafeAreaView>
        </NotificationProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
}
