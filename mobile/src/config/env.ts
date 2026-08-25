/**
 * Environment configuration for the RoomieSync mobile app.
 *
 * Uses Expo's built-in support for EXPO_PUBLIC_-prefixed environment
 * variables, which are inlined at build time. No secrets belong here —
 * only public, client-safe configuration such as the backend API base URL.
 *
 * Authentication tokens, database credentials, and third-party service
 * keys (e.g. Firebase, Supabase, Stripe) are intentionally not configured
 * here yet, as those integrations are unresolved per the RoomieSync
 * requirements documents.
 */

export const API_BASE_URL: string =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
