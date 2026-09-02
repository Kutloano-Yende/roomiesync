import { ActivityItem } from "../../types/activity";
import { MatchSummary } from "../../types/match";
import {
  MOCK_DASHBOARD_STATS,
  MOCK_RECENT_ACTIVITY,
  MOCK_TOP_MATCH,
} from "../data/dashboard";

/**
 * MOCK IMPLEMENTATION — simulates network latency and returns static
 * data. No real matching engine, no real expense/feedback data.
 */

export interface DashboardSummary {
  matchesCount: number;
  avgCompatibility: number;
  topMatch: MatchSummary;
  recentActivity: ActivityItem[];
}

const MOCK_NETWORK_DELAY_MS = 400;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  await delay(MOCK_NETWORK_DELAY_MS);

  return {
    ...MOCK_DASHBOARD_STATS,
    topMatch: MOCK_TOP_MATCH,
    recentActivity: MOCK_RECENT_ACTIVITY,
  };
}
