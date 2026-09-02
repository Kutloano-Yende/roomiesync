import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import HomeScreen from "../HomeScreen";
import { AuthProvider, useAuth } from "../../../context/AuthContext";
import { MOCK_DEMO_USER } from "../../../mocks/data/users";
import * as dashboardService from "../../../services/dashboardService";
import {
  MOCK_DASHBOARD_STATS,
  MOCK_RECENT_ACTIVITY,
  MOCK_TOP_MATCH,
} from "../../../mocks/data/dashboard";

jest.mock("../../../services/dashboardService");

const mockedGetDashboardSummary = dashboardService.getDashboardSummary as jest.Mock;

const FULL_SUMMARY = {
  ...MOCK_DASHBOARD_STATS,
  topMatch: MOCK_TOP_MATCH,
  recentActivity: MOCK_RECENT_ACTIVITY,
};

function SignedInBridge({ children }: { children: React.ReactNode }) {
  const { signIn } = useAuth();
  React.useEffect(() => {
    signIn(MOCK_DEMO_USER);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
}

function buildNavigation() {
  const parentNavigate = jest.fn();
  return {
    navigate: jest.fn(),
    getParent: jest.fn(() => ({ navigate: parentNavigate })),
    _parentNavigate: parentNavigate,
  } as any;
}

async function renderHomeScreen() {
  const navigation = buildNavigation();
  const utils = await render(
    <AuthProvider>
      <SignedInBridge>
        <HomeScreen navigation={navigation} route={{} as any} />
      </SignedInBridge>
    </AuthProvider>
  );
  return { ...utils, navigation };
}

describe("HomeScreen", () => {
  beforeEach(() => {
    mockedGetDashboardSummary.mockReset();
  });

  it("shows a loading state while the dashboard summary is being fetched", async () => {
    let resolveFetch: (value: typeof FULL_SUMMARY) => void = () => {};
    mockedGetDashboardSummary.mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      })
    );

    const { getByTestId } = await renderHomeScreen();

    expect(getByTestId("home-loading-state")).toBeTruthy();

    resolveFetch(FULL_SUMMARY);
  });

  it("shows the dashboard content once loaded", async () => {
    mockedGetDashboardSummary.mockResolvedValue(FULL_SUMMARY);

    const { getByText } = await renderHomeScreen();

    expect(getByText(/Good (morning|afternoon|evening), BT/)).toBeTruthy();
    expect(getByText("12")).toBeTruthy();
    expect(getByText("84%")).toBeTruthy();
    expect(getByText("Karabo Molefe")).toBeTruthy();
    expect(getByText("96%")).toBeTruthy();
    expect(getByText("Shared groceries")).toBeTruthy();
  });

  it("shows an error state with a retry option when loading fails", async () => {
    mockedGetDashboardSummary.mockRejectedValueOnce(new Error("network error"));

    const { getByTestId, getByText } = await renderHomeScreen();

    await waitFor(() => {
      expect(getByTestId("home-error-state")).toBeTruthy();
    });
    expect(getByText("Couldn't load your dashboard. Please try again.")).toBeTruthy();
  });

  it("retries loading when Retry is pressed after an error", async () => {
    mockedGetDashboardSummary.mockRejectedValueOnce(new Error("network error"));
    mockedGetDashboardSummary.mockResolvedValueOnce(FULL_SUMMARY);

    const { getByTestId, getByText } = await renderHomeScreen();

    await waitFor(() => {
      expect(getByTestId("home-error-state")).toBeTruthy();
    });

    await fireEvent.press(getByText("Retry"));

    await waitFor(() => {
      expect(getByText("Karabo Molefe")).toBeTruthy();
    });
  });

  it("navigates to the Expenses tab when an expense activity row is pressed", async () => {
    mockedGetDashboardSummary.mockResolvedValue(FULL_SUMMARY);

    const { getByTestId, navigation } = await renderHomeScreen();

    await waitFor(() =>
      expect(getByTestId("home-activity-activity-groceries")).toBeTruthy()
    );
    await fireEvent.press(getByTestId("home-activity-activity-groceries"));

    expect(navigation.navigate).toHaveBeenCalledWith("Expenses");
  });

  it("navigates to a parent placeholder screen when View profile is pressed", async () => {
    mockedGetDashboardSummary.mockResolvedValue(FULL_SUMMARY);

    const { getByTestId, navigation } = await renderHomeScreen();

    await waitFor(() => expect(getByTestId("home-view-profile-button")).toBeTruthy());
    await fireEvent.press(getByTestId("home-view-profile-button"));

    expect(navigation.getParent).toHaveBeenCalled();
    expect(navigation._parentNavigate).toHaveBeenCalledWith("Placeholder", {
      title: "Match detail",
    });
  });
});
