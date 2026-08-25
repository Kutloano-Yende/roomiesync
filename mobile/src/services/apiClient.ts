/**
 * Minimal API service layer for communicating with the RoomieSync
 * FastAPI backend.
 *
 * This is a foundation only: a base request helper and a single health
 * check function against the backend's `GET /health` endpoint. Domain
 * functionality (authentication, matching, chat, expenses) is
 * intentionally not implemented yet, as the underlying architecture
 * (database/auth provider) is unresolved per the RoomieSync requirements
 * documents.
 */

import { API_BASE_URL } from "../config/env";

export interface ApiError {
  message: string;
  status?: number;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!response.ok) {
    const error: ApiError = {
      message: `Request to ${path} failed with status ${response.status}`,
      status: response.status,
    };
    throw error;
  }

  return response.json() as Promise<T>;
}

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  environment: string;
}

/** Calls the backend's GET /health endpoint. */
export function checkBackendHealth(): Promise<HealthResponse> {
  return request<HealthResponse>("/health");
}
