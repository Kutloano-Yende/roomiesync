/**
 * Root navigation structure for the RoomieSync mobile app.
 *
 * Screens are added in the order they're built, following the RoomieSync
 * UI prototype's own screen sequence. Destinations that are documented
 * but not built yet in this pass point at the shared PlaceholderScreen so
 * navigation stays honest rather than dead-ending.
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import HomeScreen from "../screens/home/HomeScreen";
import PlaceholderScreen from "../screens/shared/PlaceholderScreen";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: { title?: string } | undefined;
  PasswordReset: { title?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "RoomieSync", headerBackVisible: false }}
        />
        <Stack.Screen
          name="Register"
          component={PlaceholderScreen}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="PasswordReset"
          component={PlaceholderScreen}
          options={{ title: "Password reset" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
