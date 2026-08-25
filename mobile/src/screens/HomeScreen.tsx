/**
 * Initial placeholder screen confirming the RoomieSync mobile app is
 * running. Actual product screens (login, profile, matches, chat,
 * expenses, etc.) are defined in the RoomieSync prototype documentation
 * and will be implemented separately.
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} testID="home-screen">
      <View style={styles.content}>
        <Text style={styles.title}>RoomieSync</Text>
        <Text style={styles.subtitle}>Mobile app foundation is running</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555555",
  },
});
