"use client";

import Container from "@/components/Container";
import { Ban, Clock3, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

type AdminOverview = {
  counts: {
    pending: number;
    approved: number;
    disabled: number;
    total: number;
  };
};

const statCards = [
  {
    key: "total",
    label: "Total Users",
    icon: Users,
    tone: "bg-slate-100 text-slate-700",
  },
  {
    key: "pending",
    label: "Pending",
    icon: Clock3,
    tone: "bg-amber-50 text-amber-700",
  },
  {
    key: "approved",
    label: "Approved",
    icon: ShieldCheck,
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    key: "disabled",
    label: "Disabled",
    icon: Ban,
    tone: "bg-red-50 text-red-700",
  },
] as const;

function getCardHref(key: (typeof statCards)[number]["key"]) {
  if (key === "total") return "/admin/users";
  if (key === "pending") return "/admin/users?status=PENDING";
  if (key === "approved") return "/admin/users?status=APPROVED";
  return "/admin/users?status=DISABLED";
}

function getCardActionLabel(key: (typeof statCards)[number]["key"]) {
  if (key === "total") return "Open Users";
  if (key === "pending") return "View Pending";
  if (key === "approved") return "View Approved";
  return "View Disabled";
}

export default function AdminDashboardClient() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadOverview() {
      const res = await apiGet<AdminOverview>("/api/admin/overview");
      if (!cancelled && res.ok) {
        setOverview(res.data);
      }
    }

    loadOverview();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Container className="max-w-none px-0">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const value = overview?.counts[card.key] ?? 0;
          const cardContent = (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--interlines-slate-soft)]">
                    {card.label}
                  </p>
                  <div className="mt-3 font-mono text-[2.25rem] leading-none text-[var(--interlines-slate)] tabular-nums">
                    {value}
                  </div>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.tone}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--interlines-azure)]">
                {getCardActionLabel(card.key)}
              </p>
            </>
          );

          return (
            <Link
              key={card.key}
              href={getCardHref(card.key)}
              className="block rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.04)] transition-colors hover:bg-slate-50"
            >
              {cardContent}
            </Link>
          );
        })}
      </section>
    </Container>
  );
}
