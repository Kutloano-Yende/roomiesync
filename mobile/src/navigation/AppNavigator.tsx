/**
 * Root navigation structure for the RoomieSync mobile app.
 *
 * Only a single placeholder route is registered so far. The full
 * navigation flow (Login, Register, Profile Setup, Home Dashboard, Match
 * Suggestions, Match Detail, Chat, Expenses, Feedback, Notifications,
 * Settings, etc.) is defined in the RoomieSync UI prototype and will be
 * added screen-by-screen in later work.
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";

export type RootStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "RoomieSync" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
