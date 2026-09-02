import { User } from "../../types/user";
import { MOCK_DEMO_PASSWORD, MOCK_DEMO_USER } from "../data/users";

/**
 * MOCK IMPLEMENTATION — simulates network latency and a backend auth
 * check. No real authentication, no real session, no token issuance.
 *
 * This exists purely to make the Login screen demonstrable. It is
 * intentionally kept behind the same function signature a real
 * implementation (Supabase Auth, per docs/architecture-decisions.md
 * ADR-002, once approved) would need, so screens do not have to change
 * when this is replaced.
 */

export class MockAuthError extends Error {}

const MOCK_NETWORK_DELAY_MS = 600;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function login(email: string, password: string): Promise<User> {
  await delay(MOCK_NETWORK_DELAY_MS);

  const normalizedEmail = email.trim().toLowerCase();

  if (
    normalizedEmail === MOCK_DEMO_USER.email.toLowerCase() &&
    password === MOCK_DEMO_PASSWORD
  ) {
    return MOCK_DEMO_USER;
  }

  throw new MockAuthError("Incorrect email or password.");
}
