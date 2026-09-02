/**
 * Generic stand-in for a screen that is documented/required but hasn't
 * been built yet in this pass. Used so navigation targets are honest
 * (a button navigates somewhere real) without building screens out of
 * their planned order.
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, fontSize, spacing } from "../../theme";

export interface PlaceholderScreenProps {
  route: {
    params?: {
      title?: string;
    };
  };
}

export default function PlaceholderScreen({ route }: PlaceholderScreenProps) {
  const title = route.params?.title ?? "This screen";

  return (
    <SafeAreaView style={styles.container} testID="placeholder-screen">
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          Not built yet in this pass — coming in a later phase.
        </Text>
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
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
