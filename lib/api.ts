"use client";

import { apiUrl } from "@/lib/config";

export type ApiError = {
  message: string;
  code?: string;
  fieldErrors?: Record<string, string[]>;
};

export type ApiUser = {
  id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  title: "Mr" | "Mrs" | "Ms" | "Mst" | null;
  gender: "M" | "F" | "U" | null;
  date_of_birth: string | null;
  email: string;
  phone_country_code: string | null;
  phone_number: string | null;
  destination_phone_country_code: string | null;
  destination_phone_number: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postal_code: string | null;
  status: "PENDING" | "APPROVED" | "DISABLED";
  role: "USER" | "ADMIN";
  booking_profile_ready: boolean;
  booking_profile_missing_fields: string[];
};

export type ApiAdmin = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: "PENDING" | "APPROVED" | "DISABLED";
  role: "USER" | "ADMIN";
};

export type ApiAdminManagedUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: "PENDING" | "APPROVED" | "DISABLED";
  role: "USER" | "ADMIN";
  created_at: string | null;
  approved_at: string | null;
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

function getErrorMessage(json: unknown, res: Response) {
  if (isRecord(json)) {
    if (typeof json.message === "string") {
      const errors = json.errors;
      if (isRecord(errors)) {
        for (const value of Object.values(errors)) {
          if (Array.isArray(value) && typeof value[0] === "string") {
            return value[0];
          }
        }
      }

      return json.message;
    }

    const errors = json.errors;
    if (isRecord(errors)) {
      for (const value of Object.values(errors)) {
        if (Array.isArray(value) && typeof value[0] === "string") {
          return value[0];
        }
      }
    }
  }

  if (res.status === 429) {
    return "Too many requests. Please try again shortly.";
  }

  return "Request failed.";
}

function getFieldErrors(json: unknown) {
  if (!isRecord(json) || !isRecord(json.errors)) return undefined;

  const fieldErrors: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(json.errors)) {
    if (Array.isArray(value)) {
      fieldErrors[key] = value.filter(
        (item): item is string => typeof item === "string",
      );
    }
  }

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined;
}

async function apiSend<TResponse>(
  method: "POST" | "PATCH" | "DELETE",
  path: string,
  body: unknown,
): Promise<{ ok: true; data: TResponse } | { ok: false; error: ApiError }> {
  async function doRequest(csrf: string) {
    return fetch(apiUrl(path), {
      method,
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

  const code = isRecord(json) && typeof json.code === "string" ? json.code : undefined;

  return {
    ok: false,
    error: {
      message: getErrorMessage(json, res),
      code,
      fieldErrors: getFieldErrors(json),
    },
  };
}

export async function apiPost<TResponse>(
  path: string,
  body: unknown,
): Promise<{ ok: true; data: TResponse } | { ok: false; error: ApiError }> {
  return apiSend("POST", path, body);
}

export async function apiPatch<TResponse>(
  path: string,
  body: unknown,
): Promise<{ ok: true; data: TResponse } | { ok: false; error: ApiError }> {
  return apiSend("PATCH", path, body);
}

export async function apiDelete<TResponse>(
  path: string,
  body: unknown = {},
): Promise<{ ok: true; data: TResponse } | { ok: false; error: ApiError }> {
  return apiSend("DELETE", path, body);
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
