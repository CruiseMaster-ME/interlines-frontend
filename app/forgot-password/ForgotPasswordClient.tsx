"use client";

import Container from "@/components/Container";
import { Card } from "@/components/PremiumUI";
import { apiPost } from "@/lib/api";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const res = await apiPost<{ message: string }>("/api/forgot-password", {
        email,
      });

      if (!res.ok) {
        setError(res.error.message);
        return;
      }

      setSuccess(res.data.message);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to send reset link.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-[var(--interlines-bg)] min-h-[calc(100vh-80px)] flex flex-col justify-center relative isolate overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--interlines-azure)]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--interlines-gold)]/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <Container className="relative z-10 w-full max-w-lg mx-auto px-5 py-20 pb-32 flex flex-col">
        <div className="text-center mb-10">
          <h1 className="font-display text-[2.5rem] tracking-tight text-[var(--interlines-slate)]">
            Password <br />
            <span className="italic text-[var(--interlines-azure)]">Recovery</span>
          </h1>
          <p className="mt-4 text-[15px] text-[var(--interlines-slate-soft)]">
            Enter your account email and we&apos;ll send you a secure reset link.
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
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white/50 px-5 text-[15px] shadow-sm outline-none transition-all placeholder:text-zinc-400 focus:border-[var(--interlines-azure)]/40 focus:bg-white focus:ring-[var(--interlines-azure)]/20 focus:ring-4"
                placeholder="professional@company.com"
              />
            </div>

            {success && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-800">
                {success}
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 h-12 w-full rounded-full bg-[var(--interlines-azure)] px-6 text-[13px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_4px_15px_rgba(48,117,128,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--interlines-azure-deep)] focus:ring-[var(--interlines-azure)]/30 focus:ring-4 disabled:pointer-events-none disabled:opacity-60 disabled:hover:scale-100"
            >
              {isSubmitting ? "Sending Link..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-8 border-t border-[var(--interlines-azure)]/10 pt-6 text-center">
            <Link
              href="/login"
              className="font-semibold text-[var(--interlines-azure)] hover:text-[var(--interlines-azure-deep)] transition-colors underline underline-offset-4"
            >
              Back to Login
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
