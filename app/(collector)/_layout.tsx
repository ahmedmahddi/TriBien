import React from "react";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faChartBar,
  faUser,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => {
  if (focused) {
    return (
      <View className="w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden">
        <LinearGradient
          colors={["#CCE1DB", "#164C3E"]}
          className="w-full h-full absolute"
          style={{
            borderRadius: 9999,
            opacity: 0.9,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View className="flex-row items-center justify-center z-10">
          <FontAwesomeIcon icon={icon} size={20} color="#164C3E" />
          <Text className="text-white text-base font-semibold ml-2">
            {title}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <FontAwesomeIcon icon={icon} size={20} color="#164C3E" />
    </View>
  );
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#D6E7E2",
          borderRadius: 50,
          marginHorizontal: 10,
          marginBottom: 28,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#D6E7E2",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Pickups",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={faHome} title="Pickups" />
          ),
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: "My Tasks",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={faHistory} title="Tasks" />
          ),
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: "Earnings",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={faChartBar} title="Earnings" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={faUser} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};
export default _Layout;
