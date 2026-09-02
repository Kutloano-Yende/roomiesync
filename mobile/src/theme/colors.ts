/**
 * Color palette matching the RoomieSync prototype's visual identity
 * (purple primary brand color, light neutral background).
 */

export const colors = {
  // Brand
  primary: "#5B4FE0",
  primaryLight: "#EEECFB",
  primaryDark: "#4A3FC9",

  // Backgrounds
  background: "#F7F7F8",
  surface: "#FFFFFF",

  // Text
  textPrimary: "#1A1A1E",
  textSecondary: "#6B6B75",
  textOnPrimary: "#FFFFFF",
  placeholder: "#9B9BA5",

  // Borders / dividers
  border: "#E2E2E7",

  // Status
  success: "#1E8A5F",
  successBackground: "#E3F5EC",
  warning: "#B98900",
  warningBackground: "#FCF1D6",
  error: "#C0362C",
  errorBackground: "#FBEAE8",

  // Compatibility score bands (used across match screens later)
  scoreHigh: "#1E8A5F",
  scoreMedium: "#B98900",
  scoreLow: "#C0362C",
} as const;
