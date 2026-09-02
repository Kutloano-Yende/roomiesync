/**
 * In-memory mock session only. Not a real auth session — no token, no
 * persistence, cleared on app reload.
 *
 * TODO(backend): replace with real Supabase Auth session state (per
 * docs/architecture-decisions.md ADR-002, pending approval) once the
 * backend exists — e.g. reading the current session on mount and
 * subscribing to auth state changes. The `useAuth()` hook's shape below
 * is the integration contract screens rely on; try to keep it stable.
 */

import React, { createContext, useContext, useMemo, useState } from "react";

import { User } from "../types/user";

interface AuthContextValue {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      signIn: (nextUser: User) => setUser(nextUser),
      signOut: () => setUser(null),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
