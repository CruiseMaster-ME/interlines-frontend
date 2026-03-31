"use client";

import { apiUrl } from "@/lib/config";

export type ApiError = {
  message: string;
  code?: string;
};

export type ApiUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: "PENDING" | "APPROVED" | "DISABLED";
  role: "USER" | "ADMIN";
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getCachedCsrf() {
  try {
    return sessionStorage.getItem("cm_csrf") ?? "";
  } catch {
    return "";
  }
}

function setCachedCsrf(token: string) {
  try {
    sessionStorage.setItem("cm_csrf", token);
  } catch {
    // ignore
  }
}

export function clearCsrfTokenCache() {
  setCachedCsrf("");
}

export async function ensureCsrfToken(forceRefresh = false) {
  if (forceRefresh) {
    clearCsrfTokenCache();
  }

  const cached = getCachedCsrf();
  if (cached) return cached;

  const res = await fetch(apiUrl("/api/csrf"), {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to initialize session/CSRF token.");

  const json = (await res.json()) as { csrfToken?: string };
  if (!json.csrfToken) throw new Error("CSRF token missing from response.");
  setCachedCsrf(json.csrfToken);
  return json.csrfToken;
}

export async function apiPost<TResponse>(
  path: string,
  body: unknown,
): Promise<{ ok: true; data: TResponse } | { ok: false; error: ApiError }> {
  async function doRequest(csrf: string) {
    return fetch(apiUrl(path), {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrf,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(body),
    });
  }

  let csrf = await ensureCsrfToken();
  let res = await doRequest(csrf);

  // If the session was regenerated (e.g. after login) the cached CSRF token may be stale.
  if (res.status === 419) {
    csrf = await ensureCsrfToken(true);
    res = await doRequest(csrf);
  }

  const json = (await res.json().catch(() => ({}))) as unknown;
  if (res.ok) return { ok: true, data: json as TResponse };

  const message =
    isRecord(json) && typeof json.message === "string"
      ? json.message
      : res.status === 429
        ? "Too many requests. Please try again shortly."
        : "Request failed.";

  const code = isRecord(json) && typeof json.code === "string" ? json.code : undefined;

  return {
    ok: false,
    error: {
      message,
      code,
    },
  };
}

export async function apiGet<TResponse>(
  path: string,
): Promise<{ ok: true; data: TResponse } | { ok: false; status: number }> {
  const res = await fetch(apiUrl(path), {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  if (!res.ok) return { ok: false, status: res.status };
  const json = (await res.json()) as TResponse;
  return { ok: true, data: json };
}

export async function logout() {
  await apiPost("/api/logout", {});
  clearCsrfTokenCache();
}
