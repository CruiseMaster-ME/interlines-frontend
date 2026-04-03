"use client";

import Container from "@/components/Container";
import { apiGet, ApiUser, ensureCsrfToken } from "@/lib/api";
import { apiUrl } from "@/lib/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingClient() {
  const router = useRouter();
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await apiGet<{ user: ApiUser }>("/api/user");
      if (cancelled) return;
      if (!res.ok) {
        router.push("/login");
        return;
      }
      setUser(res.data.user);
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function onContinue() {
    setError(null);
    try {
      const csrf = await ensureCsrfToken(true);
      const form = document.createElement("form");
      form.method = "POST";
      form.action = apiUrl("/api/odysseus/sso");

      const tokenField = document.createElement("input");
      tokenField.type = "hidden";
      tokenField.name = "_token";
      tokenField.value = csrf;
      form.appendChild(tokenField);

      document.body.appendChild(form);
      form.submit();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to start booking.");
    }
  }

  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen pb-24">
      <Container className="max-w-6xl px-5 pt-10 sm:pt-12">
        <div className="max-w-3xl rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm sm:p-7">
          <p className="text-sm leading-7 text-zinc-600">
            When you continue, Interline Cruises Middle East will generate a short-lived
            signed token and post it to the Odysseus booking engine so you arrive already
            signed in.
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-zinc-200 bg-zinc-50/60 p-5">
            {loading ? (
              <p className="text-sm text-zinc-600">Loading...</p>
            ) : user ? (
              <>
                <p className="text-sm text-zinc-700">
                  Signed in as{" "}
                  <span className="font-semibold text-zinc-900">
                    {user.first_name} {user.last_name}
                  </span>
                  .
                </p>
                {error ? (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                    {error}
                  </div>
                ) : null}
                {!user.booking_profile_ready ? (
                  <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-sm text-amber-900">
                    Your profile is still missing some travel details. Booking can continue,
                    but you may need to re-enter information later.
                  </div>
                ) : null}
                <button
                  onClick={onContinue}
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-sky-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-800"
                >
                  Continue to Booking
                </button>
                <p className="mt-4 text-xs text-zinc-500">
                  Your session stays within the Interline Cruises Middle East member flow. A
                  short-lived token is used only to start SSO into Odysseus.
                </p>
              </>
            ) : (
              <p className="text-sm text-zinc-600">Not signed in.</p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
