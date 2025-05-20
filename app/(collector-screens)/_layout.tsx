import { Stack } from "expo-router";

export default function CollectorScreensLayout() {
  return (
    <Stack>
      <Stack.Screen name="pickupDetails" options={{ headerShown: false }} />
      <Stack.Screen name="confirmCollection" options={{ headerShown: false }} />
      <Stack.Screen name="collectionSuccess" options={{ headerShown: false }} />
    </Stack>
  );
}
