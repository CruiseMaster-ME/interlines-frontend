export type SessionHintStatus = "guest" | "user" | "admin";

const SESSION_HINT_STORAGE_KEY = "cm_session_hint";
const SESSION_HINT_TTL_MS = 120 * 60 * 1000;

type StoredSessionHint = {
  status: SessionHintStatus;
  expiresAt: number;
};

function isStoredSessionHint(value: unknown): value is StoredSessionHint {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<StoredSessionHint>;
  return (
    (candidate.status === "guest" ||
      candidate.status === "user" ||
      candidate.status === "admin") &&
    typeof candidate.expiresAt === "number"
  );
}

export function readSessionHint(): SessionHintStatus | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(SESSION_HINT_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue) as unknown;
    if (!isStoredSessionHint(parsedValue)) {
      window.localStorage.removeItem(SESSION_HINT_STORAGE_KEY);
      return null;
    }

    if (parsedValue.expiresAt <= Date.now()) {
      window.localStorage.removeItem(SESSION_HINT_STORAGE_KEY);
      return null;
    }

    return parsedValue.status;
  } catch {
    return null;
  }
}

export function writeSessionHint(status: SessionHintStatus) {
  if (typeof window === "undefined") {
    return;
  }

  const payload: StoredSessionHint = {
    status,
    expiresAt: Date.now() + SESSION_HINT_TTL_MS,
  };

  try {
    window.localStorage.setItem(SESSION_HINT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage write failures and fall back to API probing.
  }
}

export function clearSessionHint() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(SESSION_HINT_STORAGE_KEY);
  } catch {
    // Ignore storage write failures.
  }
}
