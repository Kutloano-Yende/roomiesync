import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import LoginScreen from "../LoginScreen";
import { AuthProvider } from "../../../context/AuthContext";
import { MOCK_DEMO_PASSWORD, MOCK_DEMO_USER } from "../../../mocks/data/users";

async function renderLoginScreen() {
  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
  } as any;
  const utils = await render(
    <AuthProvider>
      <LoginScreen navigation={navigation} route={{} as any} />
    </AuthProvider>
  );
  return { ...utils, navigation };
}

describe("LoginScreen", () => {
  it("renders the RoomieSync branding and form fields", async () => {
    const { getByText, getByTestId } = await renderLoginScreen();

    expect(getByText("RoomieSync")).toBeTruthy();
    expect(getByText("Find your perfect roommate")).toBeTruthy();
    expect(getByTestId("login-email-input")).toBeTruthy();
    expect(getByTestId("login-password-input")).toBeTruthy();
  });

  it("shows validation errors when submitting an empty form", async () => {
    const { getByTestId, getByText } = await renderLoginScreen();

    await fireEvent.changeText(getByTestId("login-email-input"), "");
    await fireEvent.press(getByTestId("login-submit-button"));

    await waitFor(() => {
      expect(getByText("Student email is required.")).toBeTruthy();
      expect(getByText("Password is required.")).toBeTruthy();
    });
  });

  it("shows an error banner for incorrect mock credentials", async () => {
    const { getByTestId } = await renderLoginScreen();

    await fireEvent.changeText(getByTestId("login-email-input"), MOCK_DEMO_USER.email);
    await fireEvent.changeText(getByTestId("login-password-input"), "wrong-password");
    await fireEvent.press(getByTestId("login-submit-button"));

    await waitFor(() => {
      expect(getByTestId("login-form-error")).toBeTruthy();
    });
  });

  it("navigates to Main on successful mock sign-in", async () => {
    const { getByTestId, navigation } = await renderLoginScreen();

    await fireEvent.changeText(getByTestId("login-email-input"), MOCK_DEMO_USER.email);
    await fireEvent.changeText(
      getByTestId("login-password-input"),
      MOCK_DEMO_PASSWORD
    );
    await fireEvent.press(getByTestId("login-submit-button"));

    await waitFor(() => {
      expect(navigation.reset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: "Main" }],
      });
    });
  });

  it("navigates to the Register placeholder when Create account is pressed", async () => {
    const { getByTestId, navigation } = await renderLoginScreen();

    await fireEvent.press(getByTestId("login-create-account-button"));

    expect(navigation.navigate).toHaveBeenCalledWith("Register", {
      title: "Register",
    });
  });

  it("navigates to the PasswordReset placeholder when Forgot password is pressed", async () => {
    const { getByTestId, navigation } = await renderLoginScreen();

    await fireEvent.press(getByTestId("login-forgot-password-button"));

    expect(navigation.navigate).toHaveBeenCalledWith("PasswordReset", {
      title: "Password reset",
    });
  });
});
