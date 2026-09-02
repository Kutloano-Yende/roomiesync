/**
 * Login — RoomieSync UI Prototype Screen 1 of 15.
 *
 * Entry point. Students sign in with their university email and password.
 * Authentication is MOCKED (see src/services/authService.ts) — no real
 * session is created.
 */

import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { colors, fontSize, radius, spacing } from "../../theme";
import * as authService from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import type { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("221592280@tut4life.ac.za");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    const errors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errors.email = "Student email is required.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSignIn() {
    setFormError(null);
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await authService.login(email, password);
      signIn(user);
      navigation.reset({ index: 0, routes: [{ name: "Main" }] });
    } catch (err) {
      if (err instanceof authService.AuthError) {
        setFormError(err.message);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.container} testID="login-screen">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logo}>
            <Text style={styles.logoText}>RS</Text>
          </View>
          <Text style={styles.title}>RoomieSync</Text>
          <Text style={styles.subtitle}>Find your perfect roommate</Text>

          <View style={styles.form}>
            <TextField
              testID="login-email-input"
              label="Student email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="you@tut4life.ac.za"
              error={fieldErrors.email}
            />
            <TextField
              testID="login-password-input"
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              error={fieldErrors.password}
            />

            {formError ? (
              <View style={styles.errorBanner} testID="login-form-error">
                <Text style={styles.errorBannerText}>{formError}</Text>
              </View>
            ) : null}

            <Button
              testID="login-submit-button"
              label="Sign in"
              onPress={handleSignIn}
              loading={isSubmitting}
              style={styles.signInButton}
            />
            <Button
              testID="login-create-account-button"
              label="Create account"
              variant="outline"
              onPress={() =>
                navigation.navigate("Register", { title: "Register" })
              }
              style={styles.createAccountButton}
            />
            <Button
              testID="login-forgot-password-button"
              label="Forgot password?"
              variant="text"
              onPress={() =>
                navigation.navigate("PasswordReset", { title: "Password reset" })
              }
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  logoText: {
    color: colors.primary,
    fontSize: fontSize.lg,
    fontWeight: "700",
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  errorBanner: {
    backgroundColor: colors.errorBackground,
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  errorBannerText: {
    color: colors.error,
    fontSize: fontSize.sm,
  },
  signInButton: {
    marginBottom: spacing.sm,
  },
  createAccountButton: {
    marginBottom: spacing.sm,
  },
});
