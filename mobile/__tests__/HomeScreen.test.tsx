import React from "react";
import { render } from "@testing-library/react-native";

import HomeScreen from "../src/screens/HomeScreen";

describe("HomeScreen", () => {
  it("renders the RoomieSync title and running confirmation", async () => {
    const { getByText } = await render(<HomeScreen />);

    expect(getByText("RoomieSync")).toBeTruthy();
    expect(getByText("Mobile app foundation is running")).toBeTruthy();
  });

  it("renders with the expected testID", async () => {
    const { getByTestId } = await render(<HomeScreen />);

    expect(getByTestId("home-screen")).toBeTruthy();
  });
});
