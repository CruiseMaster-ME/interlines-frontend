"use client";

import Container from "@/components/Container";
import { apiPost, ApiAdmin, clearCsrfTokenCache } from "@/lib/api";
import { useSessionContext } from "@/components/SessionProvider";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLoginClient() {
  const router = useRouter();
  const { status, refreshSession } = useSessionContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "admin") {
        router.replace("/admin");
    }
  }, [router, status]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await apiPost<{ admin: ApiAdmin }>("/api/admin/login", {
        email,
        password,
      });

      if (!res.ok) {
        setError(res.error.message);
        return;
      }

      clearCsrfTokenCache();
      await refreshSession();
      router.push("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Admin login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Container className="box-border flex h-full max-w-none items-center justify-center px-5 py-5 sm:px-6 lg:px-8">
      <section className="w-full max-w-md rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_20px_54px_rgba(15,23,42,0.06)] sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[0.95rem] bg-[var(--interlines-azure)] text-white">
            <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />
          </div>
          <h2 className="font-display text-[1.9rem] leading-tight text-[var(--interlines-slate)]">
            Sign In
          </h2>
        </div>

        {error && (
          <div className="mt-4 rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[var(--interlines-slate-soft)]">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[15px] text-[var(--interlines-slate)] outline-none transition-colors focus:border-[var(--interlines-azure)] focus:ring-4 focus:ring-[var(--interlines-azure)]/10"
              placeholder="admin@company.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[var(--interlines-slate-soft)]">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[15px] text-[var(--interlines-slate)] outline-none transition-colors focus:border-[var(--interlines-azure)] focus:ring-4 focus:ring-[var(--interlines-azure)]/10"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[var(--interlines-azure)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--interlines-azure-deep)] disabled:pointer-events-none disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-5 border-t border-slate-200 pt-4 text-sm text-[var(--interlines-slate-soft)]">
          <Link
            href="/"
            className="font-semibold text-[var(--interlines-azure)] transition-colors hover:text-[var(--interlines-azure-deep)]"
          >
            Back to site
          </Link>
        </div>
      </section>
    </Container>
  );
}
