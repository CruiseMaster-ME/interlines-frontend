"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/ui";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/booking", label: "Booking" },
] as const;

export default function MemberSectionNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto">
      {navItems.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex h-10 items-center rounded-xl px-4 text-sm font-semibold whitespace-nowrap transition-colors",
              active
                ? "bg-[var(--interlines-azure)] text-white"
                : "border border-slate-200 bg-white text-[var(--interlines-slate-soft)] hover:bg-slate-50 hover:text-[var(--interlines-slate)]",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
