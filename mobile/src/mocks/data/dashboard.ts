import { ActivityItem } from "../../types/activity";
import { MatchSummary } from "../../types/match";

/**
 * MOCK DATA — matches the exact figures/content shown in the RoomieSync
 * UI Prototype, Screen 4 (Home Dashboard).
 */

export const MOCK_TOP_MATCH: MatchSummary = {
  id: "match-karabo",
  fullName: "Karabo Molefe",
  initials: "KM",
  pronouns: "They/Them",
  residence: "TUT Res · Block C",
  compatibilityScore: 96,
  avatarColor: "#5B4FE0",
};

export const MOCK_DASHBOARD_STATS = {
  matchesCount: 12,
  avgCompatibility: 84,
};

export const MOCK_RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: "activity-groceries",
    kind: "expense",
    title: "Shared groceries",
    subtitle: "with Karabo · Today",
    meta: "R65 owed",
    metaTone: "warning",
  },
  {
    id: "activity-match-request",
    kind: "matchRequest",
    title: "New match request",
    subtitle: "from Tebogo N. · Yesterday",
    meta: "Pending",
    metaTone: "neutral",
  },
  {
    id: "activity-rate-experience",
    kind: "feedback",
    title: "Rate your experience",
    subtitle: "with Karabo · 3 months ago",
    meta: "Rate now",
    metaTone: "action",
  },
];
