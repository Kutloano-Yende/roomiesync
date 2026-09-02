import { User } from "../types/user";
import * as mockAuthService from "../mocks/services/authService";

/**
 * Auth service integration point.
 *
 * Screens import from HERE, never from `src/mocks/` directly. This file
 * currently delegates to the mock implementation so the UI is
 * demonstrable without a backend.
 *
 * TODO(backend): replace the body of these functions with real calls to
 * Supabase Auth (per docs/architecture-decisions.md ADR-002, pending
 * approval) via the FastAPI backend (ADR-003). The function signatures
 * below are the integration contract — screens should not need to change
 * when this happens.
 */

export { MockAuthError as AuthError } from "../mocks/services/authService";

export function login(email: string, password: string): Promise<User> {
  return mockAuthService.login(email, password);
}
