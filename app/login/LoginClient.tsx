"use client";

import { apiPost, clearCsrfTokenCache } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/PremiumUI";
import Container from "@/components/Container";

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await apiPost<{ status: string; message?: string }>(
        "/api/login",
        { email, password }
      );
      if (!res.ok) {
        setError(res.error.message);
        return;
      }

      if (res.data.status === "APPROVED") {
        clearCsrfTokenCache();
        router.push("/dashboard");
        return;
      }
      if (res.data.status === "PENDING") {
        router.push("/pending-approval");
        return;
      }

      setError(res.data.message ?? "Login failed.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-[var(--interlines-bg)] min-h-[calc(100vh-80px)] flex flex-col justify-center relative isolate overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--interlines-azure)]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--interlines-gold)]/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <Container className="relative z-10 w-full max-w-lg mx-auto px-5 py-20 pb-32 flex flex-col">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block outline-none rounded-sm mb-6">
            <span className="sr-only">Home</span>
            <div className="h-10 w-10 mx-auto rounded-full bg-[var(--interlines-azure)] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
          <h1 className="font-display text-[2.5rem] tracking-tight text-[var(--interlines-slate)]">
            Member Secure <br />
            <span className="italic text-[var(--interlines-azure)]">Login</span>
          </h1>
          <p className="mt-4 text-[15px] text-[var(--interlines-slate-soft)]">
            Sign in to your verified Interline Cruises account.
          </p>
        </div>

        <Card className="p-8 sm:p-10 border border-[var(--interlines-azure)]/10 shadow-[0_20px_50px_rgba(48,117,128,0.06)] backdrop-blur-md bg-white/80">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] ml-1">
                Email Address
              </label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white/50 px-5 text-[15px] shadow-sm outline-none transition-all placeholder:text-zinc-400 focus:border-[var(--interlines-azure)]/40 focus:bg-white focus:ring-[var(--interlines-azure)]/20 focus:ring-4"
                placeholder="professional@company.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] ml-1">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white/50 px-5 text-[15px] shadow-sm outline-none transition-all placeholder:text-zinc-400 focus:border-[var(--interlines-azure)]/40 focus:bg-white focus:ring-[var(--interlines-azure)]/20 focus:ring-4"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50/80 backdrop-blur-sm px-4 py-3 text-sm text-red-800 flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 text-red-600">
                  <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 h-12 w-full rounded-full bg-[var(--interlines-azure)] px-6 text-[13px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_4px_15px_rgba(48,117,128,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--interlines-azure-deep)] focus:ring-[var(--interlines-azure)]/30 focus:ring-4 disabled:pointer-events-none disabled:opacity-60 disabled:hover:scale-100"
            >
              {isSubmitting ? "Authenticating..." : "Sign In securely"}
            </button>
          </form>

          <div className="mt-8 border-t border-[var(--interlines-azure)]/10 pt-6 text-center">
            <p className="text-[14px] text-[var(--interlines-slate-soft)]">
              Haven&apos;t registered yet?{" "}
              <Link
                href="/request-access"
                className="font-semibold text-[var(--interlines-azure)] hover:text-[var(--interlines-azure-deep)] transition-colors underline underline-offset-4"
              >
                Apply for Access
              </Link>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
}
