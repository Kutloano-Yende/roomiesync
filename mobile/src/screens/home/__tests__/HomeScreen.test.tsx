import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import HomeScreen from "../HomeScreen";

async function renderHomeScreen() {
  const navigation = { reset: jest.fn() } as any;
  const utils = await render(<HomeScreen navigation={navigation} route={{} as any} />);
  return { ...utils, navigation };
}

describe("HomeScreen", () => {
  it("renders the RoomieSync title and mock session confirmation", async () => {
    const { getByText } = await renderHomeScreen();

    expect(getByText("RoomieSync")).toBeTruthy();
    expect(getByText("Signed in successfully (mock session)")).toBeTruthy();
  });

  it("renders with the expected testID", async () => {
    const { getByTestId } = await renderHomeScreen();

    expect(getByTestId("home-screen")).toBeTruthy();
  });

  it("resets navigation back to Login when signing out", async () => {
    const { getByTestId, navigation } = await renderHomeScreen();

    await fireEvent.press(getByTestId("home-sign-out-button"));

    expect(navigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: "Login" }],
    });
  });
});
