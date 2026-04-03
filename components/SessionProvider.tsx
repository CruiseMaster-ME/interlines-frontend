"use client";

import {
  apiGet,
  ApiAdmin,
  ApiUser,
  clearCsrfTokenCache,
  logout,
} from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";

type SessionStatus = "loading" | "guest" | "user" | "admin";

type SessionContextValue = {
  status: SessionStatus;
  user: ApiUser | null;
  admin: ApiAdmin | null;
  refreshSession: () => Promise<void>;
  setGuestSession: () => void;
  setUserSession: (user: ApiUser) => void;
  setAdminSession: (admin: ApiAdmin) => void;
  logoutSession: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

function createGuestState() {
  return {
    status: "guest" as const,
    user: null,
    admin: null,
  };
}

function createAdminFromUser(user: ApiUser): ApiAdmin {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    status: user.status,
    role: user.role,
  };
}

async function resolveSession() {
  try {
    const adminRes = await apiGet<{ admin: ApiAdmin }>("/api/admin/me");
    if (adminRes.ok) {
      return {
        status: "admin" as const,
        user: null,
        admin: adminRes.data.admin,
      };
    }

    const userRes = await apiGet<{ user: ApiUser }>("/api/user");
    if (userRes.ok) {
      if (userRes.data.user.role === "ADMIN") {
        return {
          status: "admin" as const,
          user: userRes.data.user,
          admin: createAdminFromUser(userRes.data.user),
        };
      }

      return {
        status: "user" as const,
        user: userRes.data.user,
        admin: null,
      };
    }
  } catch {
    // Ignore network/session probing errors and fall back to guest state.
  }

  return createGuestState();
}

export function useSessionContext() {
  const value = useContext(SessionContext);
  if (!value) {
    throw new Error("useSessionContext must be used within SessionProvider.");
  }

  return value;
}

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<SessionStatus>("loading");
  const [user, setUser] = useState<ApiUser | null>(null);
  const [admin, setAdmin] = useState<ApiAdmin | null>(null);

  function setGuestSession() {
    setStatus("guest");
    setUser(null);
    setAdmin(null);
  }

  function setUserSession(nextUser: ApiUser) {
    setStatus(nextUser.role === "ADMIN" ? "admin" : "user");
    setUser(nextUser);
    setAdmin(nextUser.role === "ADMIN" ? createAdminFromUser(nextUser) : null);
  }

  function setAdminSession(nextAdmin: ApiAdmin) {
    setStatus("admin");
    setUser(null);
    setAdmin(nextAdmin);
  }

  async function refreshSession() {
    setStatus("loading");
    const nextSession = await resolveSession();
    setStatus(nextSession.status);
    setUser(nextSession.user);
    setAdmin(nextSession.admin);
  }

  async function logoutSession() {
    try {
      await logout();
    } catch {
      clearCsrfTokenCache();
    }

    setGuestSession();
  }

  useEffect(() => {
    let cancelled = false;

    async function loadSession() {
      const nextSession = await resolveSession();
      if (cancelled) {
        return;
      }

      setStatus(nextSession.status);
      setUser(nextSession.user);
      setAdmin(nextSession.admin);
    }

    loadSession();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SessionContext.Provider
      value={{
        status,
        user,
        admin,
        refreshSession,
        setGuestSession,
        setUserSession,
        setAdminSession,
        logoutSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
