import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

import { colors } from "../theme";

export interface AvatarProps {
  initials: string;
  color?: string;
  size?: number;
  style?: ViewStyle;
  testID?: string;
}

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function Avatar({
  initials,
  color = colors.primary,
  size = 48,
  style,
  testID,
}: AvatarProps) {
  return (
    <View
      testID={testID}
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: hexToRgba(color, 0.14),
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color, fontSize: size * 0.36 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "700",
  },
});
