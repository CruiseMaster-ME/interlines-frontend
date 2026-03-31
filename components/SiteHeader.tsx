"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "@/components/BrandMark";
import Container from "@/components/Container";
import { primaryNav } from "@/lib/siteContent";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={
        isHome
          ? "absolute inset-x-0 top-0 z-40"
          : "sticky top-0 z-40 bg-white/85 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/70"
      }
    >
      {isHome && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
      )}

      <Container className="relative grid h-20 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex h-full items-center justify-self-start leading-none transition-opacity hover:opacity-85"
        >
          <BrandMark inverse={isHome} />
        </Link>

        <nav
          className={
            isHome
              ? "hidden items-center justify-center gap-7 whitespace-nowrap text-[0.72rem] font-bold uppercase tracking-[0.28em] text-white md:flex"
              : "hidden items-center justify-center gap-7 whitespace-nowrap text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[var(--interlines-slate-soft)] md:flex"
          }
        >
          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isHome
                  ? "drop-shadow-sm transition-colors hover:text-[var(--interlines-gold)]"
                  : "transition-colors hover:text-[var(--interlines-azure)]"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-4">
          <Link
            href="/login"
            className={
              isHome
                ? "inline-flex h-10 items-center justify-center rounded-full border border-white/18 bg-white/8 px-6 text-[11px] font-bold uppercase tracking-widest text-white transition hover:border-white/36 hover:bg-white/14"
                : "inline-flex h-10 items-center justify-center rounded-full border border-[var(--interlines-slate)]/20 bg-transparent px-6 text-[11px] font-bold uppercase tracking-widest text-[var(--interlines-slate)] transition hover:border-[var(--interlines-azure)] hover:bg-[var(--interlines-azure-light)] hover:text-[var(--interlines-azure)]"
            }
          >
            Log In
          </Link>
          <Link
            href="/request-access"
            className={
              isHome
                ? "hidden h-10 items-center justify-center rounded-full bg-white px-6 text-[11px] font-bold uppercase tracking-widest text-[var(--interlines-azure)] shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all hover:scale-105 hover:bg-[var(--interlines-azure-light)] sm:inline-flex"
                : "hidden h-10 items-center justify-center rounded-full bg-[var(--interlines-azure)] px-6 text-[11px] font-bold uppercase tracking-widest text-white shadow-[0_4px_15px_rgba(48,117,128,0.25)] transition-all hover:scale-105 hover:bg-[var(--interlines-azure-deep)] sm:inline-flex"
            }
          >
            Register Now
          </Link>
        </div>
      </Container>

      <div
        className={
          isHome
            ? "pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-white/24 to-transparent sm:inset-x-8"
            : "pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--interlines-azure)]/18 to-transparent sm:inset-x-8"
        }
      />
    </header>
  );
}
