"use client";

import { apiPost } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/PremiumUI";
import Container from "@/components/Container";

export default function RequestAccessClient() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiPost<{ message: string }>(
        "/api/request-access",
        {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          password_confirmation: passwordConfirm,
        }
      );

      if (!res.ok) {
        setError(res.error.message);
        return;
      }

      router.push("/pending-approval");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Request failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-[var(--interlines-bg)] min-h-[calc(100vh-80px)] flex flex-col justify-center relative isolate overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[var(--interlines-azure)]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--interlines-gold)]/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <Container className="relative z-10 w-full max-w-xl mx-auto px-5 py-20 pb-32 flex flex-col">
        <div className="mb-8 text-center">
          <h1 className="font-display text-[2.4rem] tracking-tight text-[var(--interlines-slate)]">
            Register for Access
          </h1>
          <p className="mt-3 text-sm text-[var(--interlines-slate-soft)] max-w-sm mx-auto">
            Verification is required before you can access industry-only interline rates.
          </p>
        </div>

        <Card className="p-8 sm:p-10 border border-[var(--interlines-azure)]/10 shadow-[0_20px_50px_rgba(48,117,128,0.06)] backdrop-blur-md bg-white/80">
          <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] ml-1">
                First Name
              </label>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white/50 px-5 text-[15px] shadow-sm outline-none transition-all focus:border-[var(--interlines-azure)]/40 focus:bg-white focus:ring-[var(--interlines-azure)]/20 focus:ring-4"
                placeholder="John"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] ml-1">
                Last Name
              </label>
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white/50 px-5 text-[15px] shadow-sm outline-none transition-all focus:border-[var(--interlines-azure)]/40 focus:bg-white focus:ring-[var(--interlines-azure)]/20 focus:ring-4"
                placeholder="Doe"
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] ml-1">
                Work Email Address
              </label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white/50 px-5 text-[15px] shadow-sm outline-none transition-all focus:border-[var(--interlines-azure)]/40 focus:bg-white focus:ring-[var(--interlines-azure)]/20 focus:ring-4 placeholder:text-zinc-400"
                placeholder="john.doe@company.com"
              />
              <p className="text-xs text-[var(--interlines-slate-soft)] ml-2 mt-1">Please use your corporate email to expedite verification.</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] ml-1">
                Password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white/50 px-5 text-[15px] shadow-sm outline-none transition-all focus:border-[var(--interlines-azure)]/40 focus:bg-white focus:ring-[var(--interlines-azure)]/20 focus:ring-4"
                placeholder="••••••••"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] ml-1">
                Confirm Password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                required
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white/50 px-5 text-[15px] shadow-sm outline-none transition-all focus:border-[var(--interlines-azure)]/40 focus:bg-white focus:ring-[var(--interlines-azure)]/20 focus:ring-4"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50/80 backdrop-blur-sm px-4 py-3 text-sm text-red-800 flex items-center gap-3 sm:col-span-2 mt-2">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 text-red-600">
                  <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 h-12 w-full rounded-full bg-[var(--interlines-azure)] px-6 text-[13px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_4px_15px_rgba(48,117,128,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--interlines-azure-deep)] focus:ring-[var(--interlines-azure)]/30 focus:ring-4 disabled:pointer-events-none disabled:opacity-60 disabled:hover:scale-100 sm:col-span-2"
            >
              {isSubmitting ? "Submitting Request..." : "Submit Registration"}
            </button>
          </form>

          <div className="mt-8 border-t border-[var(--interlines-azure)]/10 pt-6 text-center">
            <p className="text-[14px] text-[var(--interlines-slate-soft)]">
              Already approved?{" "}
              <Link
                href="/login"
                className="font-semibold text-[var(--interlines-azure)] hover:text-[var(--interlines-azure-deep)] transition-colors underline underline-offset-4"
              >
                Log In
              </Link>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
}
