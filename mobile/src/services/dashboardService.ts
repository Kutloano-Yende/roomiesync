import * as mockDashboardService from "../mocks/services/dashboardService";

export type { DashboardSummary } from "../mocks/services/dashboardService";

/**
 * Dashboard service integration point. Screens import from HERE, never
 * from `src/mocks/` directly.
 *
 * TODO(backend): replace with real calls — likely a composed summary
 * endpoint, or a combination of GET /matches/suggestions, GET /matches,
 * GET /expenses, GET /notifications (see docs/architecture-decisions.md
 * for the proposed API surface, pending approval). Screens should not
 * need to change when this happens.
 */
export function getDashboardSummary() {
  return mockDashboardService.getDashboardSummary();
}
