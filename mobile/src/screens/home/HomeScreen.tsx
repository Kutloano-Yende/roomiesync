/**
 * Home — temporary placeholder destination after login.
 *
 * The full Home Dashboard (RoomieSync UI Prototype Screen 4) is not built
 * yet in this pass. This exists so the Login screen has a real, working
 * navigation target and a way back (Sign out), rather than a dead end.
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button } from "../../components/Button";
import { colors, fontSize, spacing } from "../../theme";
import type { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container} testID="home-screen">
      <View style={styles.content}>
        <Text style={styles.title}>RoomieSync</Text>
        <Text style={styles.subtitle}>Signed in successfully (mock session)</Text>
        <Text style={styles.note}>
          Home Dashboard (Screen 4) is not built yet in this pass.
        </Text>
        <Button
          testID="home-sign-out-button"
          label="Sign out"
          variant="outline"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: "Login" }] })}
          style={styles.signOutButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  note: {
    fontSize: fontSize.xs,
    color: colors.placeholder,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  signOutButton: {
    minWidth: 160,
  },
});
