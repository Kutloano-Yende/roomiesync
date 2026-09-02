/**
 * Bottom tab navigator matching the RoomieSync UI Prototype's tab bar
 * (Home / Matches / Chat / Expenses), shown on Screens 4, 5, 8, and 10.
 *
 * Only Home is built in this pass — Matches, Chat, and Expenses are
 * honest placeholders (still reachable via the tab bar) until their turn
 * comes.
 */

import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/home/HomeScreen";
import PlaceholderScreen from "../screens/shared/PlaceholderScreen";
import { colors } from "../theme";

export type MainTabParamList = {
  Home: undefined;
  Matches: { title?: string } | undefined;
  Chat: { title?: string } | undefined;
  Expenses: { title?: string } | undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICONS: Record<keyof MainTabParamList, string> = {
  Home: "🏠",
  Matches: "🤝",
  Chat: "💬",
  Expenses: "💰",
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarIcon: () => (
          <Text style={{ fontSize: 18 }}>
            {TAB_ICONS[route.name as keyof MainTabParamList]}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Matches"
        component={PlaceholderScreen}
        initialParams={{ title: "Matches" }}
      />
      <Tab.Screen
        name="Chat"
        component={PlaceholderScreen}
        initialParams={{ title: "Chat" }}
      />
      <Tab.Screen
        name="Expenses"
        component={PlaceholderScreen}
        initialParams={{ title: "Expenses" }}
      />
    </Tab.Navigator>
  );
}
