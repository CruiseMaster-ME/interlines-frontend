"use client";

import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Card, Pill } from "@/components/PremiumUI";
import { apiGet, ApiUser, logout } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardClient() {
  const router = useRouter();
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);

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

  async function onLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen pb-24">
      <PageHeader
        title={
          <span>
            Member <br />
            <span className="italic text-[var(--interlines-gold)]">Dashboard</span>
          </span>
        }
        subtitle="Your Account"
      >
        Manage your profile, view your registration status, and access the interline booking portal.
      </PageHeader>

      <Container className="max-w-5xl px-5 pt-16 sm:pt-20">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <h2 className="font-display text-[2rem] leading-tight text-[var(--interlines-slate)]">
            Account Overview
          </h2>
          <div className="flex gap-4">
            {user?.status === "APPROVED" && (
              <button
                onClick={() => router.push("/booking")}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--interlines-azure)] px-6 text-[13px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_4px_15px_rgba(48,117,128,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--interlines-azure-deep)]"
              >
                Book a Cruise
              </button>
            )}
            <button
              onClick={onLogout}
              className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--interlines-azure)]/20 bg-white px-6 text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--interlines-slate)] shadow-sm transition-all duration-300 hover:bg-[var(--interlines-bg)]"
            >
              Log Out
            </button>
          </div>
        </div>

        <Card className="p-8 sm:p-14 border border-[var(--interlines-azure)]/10 shadow-[0_20px_50px_rgba(48,117,128,0.06)] backdrop-blur-md bg-white/80">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[var(--interlines-azure)]">
              <svg className="animate-spin h-10 w-10 mb-4 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">Loading Profile...</p>
            </div>
          ) : user ? (
            <div className="grid gap-8 sm:gap-12 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 opacity-70" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  Member Name
                </p>
                <p className="text-[1.25rem] font-medium text-[var(--interlines-slate)]">
                  {user.first_name} {user.last_name}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 opacity-70" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Email Address
                </p>
                <p className="text-[1.25rem] font-medium text-[var(--interlines-slate)] break-all">
                  {user.email}
                </p>
              </div>

              <div className="space-y-2 pt-8 sm:pt-0 sm:border-t-0 border-t border-[var(--interlines-azure)]/10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 opacity-70" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Verification Status
                </p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-current px-3 py-1 font-semibold text-sm uppercase tracking-wider"
                  style={{
                    color: user.status === "APPROVED" ? "#10b981" : user.status === "PENDING" ? "#f59e0b" : "#ef4444",
                    backgroundColor: user.status === "APPROVED" ? "rgba(16, 185, 129, 0.1)" : user.status === "PENDING" ? "rgba(245, 158, 11, 0.1)" : "rgba(239, 68, 68, 0.1)"
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  {user.status}
                </div>
                {user.status === "PENDING" && (
                  <p className="text-sm text-[var(--interlines-slate-soft)] mt-4">
                    Your account is currently under review by our verification team. You will be notified via email once approved.
                  </p>
                )}
              </div>

              <div className="space-y-2 pt-8 sm:pt-0 sm:border-t-0 border-t border-[var(--interlines-azure)]/10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 opacity-70" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.492-3.053c.24-.296.48-.654.72-1.012A8.966 8.966 0 0015.633 6.6M11.42 15.17l-3.053 2.492c-.296.24-.654.48-1.012.72A8.966 8.966 0 016.6 15.633m4.82-15.17V5.5m-4.82 14.67l-1.07-1.916M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Access Level
                </p>
                <p className="text-[1.25rem] font-medium text-[var(--interlines-slate)] capitalize">
                  {user.role} Member
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-[15px] text-[var(--interlines-slate-soft)]">Authentication error.</p>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
}
