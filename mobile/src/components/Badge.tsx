import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, fontSize, radius, spacing } from "../theme";

export type BadgeTone = "success" | "warning" | "error" | "neutral" | "action";

export interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  testID?: string;
}

const toneStyles: Record<BadgeTone, { background: string; text: string }> = {
  success: { background: colors.successBackground, text: colors.success },
  warning: { background: colors.warningBackground, text: colors.warning },
  error: { background: colors.errorBackground, text: colors.error },
  neutral: { background: colors.border, text: colors.textSecondary },
  action: { background: colors.primaryLight, text: colors.primary },
};

export function Badge({ label, tone = "neutral", testID }: BadgeProps) {
  const toneStyle = toneStyles[tone];
  return (
    <View
      testID={testID}
      style={[styles.base, { backgroundColor: toneStyle.background }]}
    >
      <Text style={[styles.text, { color: toneStyle.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: fontSize.xs,
    fontWeight: "600",
  },
});
