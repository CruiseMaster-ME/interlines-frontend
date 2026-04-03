"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import BrandMark from "@/components/BrandMark";
import Container from "@/components/Container";
import { useSessionContext } from "@/components/SessionProvider";
import { headerNav } from "@/lib/siteContent";

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { status, logoutSession } = useSessionContext();
  const isHome = pathname === "/";
  const [menuOpenPath, setMenuOpenPath] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuOpen = menuOpenPath === pathname;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const mobilePanelTone = isHome
    ? "border-white/12 bg-[rgba(24,54,59,0.94)] text-white shadow-[0_24px_60px_rgba(8,20,24,0.35)]"
    : "border-[var(--interlines-azure)]/10 bg-white/95 text-[var(--interlines-slate)] shadow-[0_24px_60px_rgba(34,84,92,0.14)]";
  const mobileLinkTone = isHome
    ? "text-white/88 hover:text-white"
    : "text-[var(--interlines-slate)] hover:text-[var(--interlines-azure)]";
  const sessionLoading = status === "loading";
  const isAdmin = status === "admin";
  const isAuthenticated = status === "user" || status === "admin";
  const primaryHref = isAdmin ? "/admin" : "/dashboard";
  const primaryLabel = isAdmin ? "Admin" : "Member Area";

  async function onLogout() {
    setIsLoggingOut(true);

    try {
      await logoutSession();
      setMenuOpenPath(null);

      if (pathname?.startsWith("/admin")) {
        router.push("/admin/login");
        return;
      }

      if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/booking")) {
        router.push("/login");
      }
    } finally {
      setIsLoggingOut(false);
    }
  }

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

      {menuOpen && (
          <button
            type="button"
            aria-label="Close mobile menu"
            className="fixed inset-0 z-40 bg-[var(--interlines-slate)]/20 backdrop-blur-[2px] md:hidden"
          onClick={() => setMenuOpenPath(null)}
        />
      )}

      <Container className="relative grid h-[4.5rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 md:h-20 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4">
        <Link
          href="/"
          className="inline-flex h-full max-w-[10.75rem] items-center justify-self-start leading-none transition-opacity hover:opacity-85 sm:max-w-none"
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
          {headerNav.map((item) => (
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

        <div className="flex items-center justify-self-end gap-2 sm:gap-3 md:gap-4">
          {sessionLoading ? (
            <div className="hidden items-center gap-3 md:flex">
              <div
                className={
                  isHome
                    ? "h-10 w-28 rounded-full border border-white/10 bg-white/8"
                    : "h-10 w-28 rounded-full border border-slate-200 bg-white"
                }
              />
              <div
                className={
                  isHome
                    ? "h-10 w-28 rounded-full border border-white/10 bg-white/8"
                    : "h-10 w-28 rounded-full border border-slate-200 bg-white"
                }
              />
            </div>
          ) : isAuthenticated ? (
            <>
              <Link
                href={primaryHref}
                className={
                  isHome
                    ? "hidden h-10 items-center justify-center rounded-full bg-white px-6 text-[11px] font-bold uppercase tracking-widest text-[var(--interlines-azure)] shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all hover:scale-105 hover:bg-[var(--interlines-azure-light)] md:inline-flex"
                    : "hidden h-10 items-center justify-center rounded-full bg-[var(--interlines-azure)] px-6 text-[11px] font-bold uppercase tracking-widest text-white shadow-[0_4px_15px_rgba(48,117,128,0.25)] transition-all hover:scale-105 hover:bg-[var(--interlines-azure-deep)] md:inline-flex"
                }
              >
                {primaryLabel}
              </Link>
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={onLogout}
                className={
                  isHome
                    ? "hidden h-10 items-center justify-center rounded-full border border-white/18 bg-white/8 px-6 text-[11px] font-bold uppercase tracking-widest text-white transition hover:border-white/36 hover:bg-white/14 disabled:pointer-events-none disabled:opacity-60 md:inline-flex"
                    : "hidden h-10 items-center justify-center rounded-full border border-[var(--interlines-slate)]/20 bg-transparent px-6 text-[11px] font-bold uppercase tracking-widest text-[var(--interlines-slate)] transition hover:border-[var(--interlines-azure)] hover:bg-[var(--interlines-azure-light)] hover:text-[var(--interlines-azure)] disabled:pointer-events-none disabled:opacity-60 md:inline-flex"
                }
              >
                {isLoggingOut ? "Logging Out" : "Log Out"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={
                  isHome
                    ? "hidden h-10 items-center justify-center rounded-full border border-white/18 bg-white/8 px-6 text-[11px] font-bold uppercase tracking-widest text-white transition hover:border-white/36 hover:bg-white/14 md:inline-flex"
                    : "hidden h-10 items-center justify-center rounded-full border border-[var(--interlines-slate)]/20 bg-transparent px-6 text-[11px] font-bold uppercase tracking-widest text-[var(--interlines-slate)] transition hover:border-[var(--interlines-azure)] hover:bg-[var(--interlines-azure-light)] hover:text-[var(--interlines-azure)] md:inline-flex"
                }
              >
                Log In
              </Link>
              <Link
                href="/request-access"
                className={
                  isHome
                    ? "hidden h-10 items-center justify-center rounded-full bg-white px-6 text-[11px] font-bold uppercase tracking-widest text-[var(--interlines-azure)] shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all hover:scale-105 hover:bg-[var(--interlines-azure-light)] md:inline-flex"
                    : "hidden h-10 items-center justify-center rounded-full bg-[var(--interlines-azure)] px-6 text-[11px] font-bold uppercase tracking-widest text-white shadow-[0_4px_15px_rgba(48,117,128,0.25)] transition-all hover:scale-105 hover:bg-[var(--interlines-azure-deep)] md:inline-flex"
                }
              >
                Register Now
              </Link>
            </>
          )}

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className={
              isHome
                ? "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-white/8 text-white shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition hover:border-white/30 hover:bg-white/12 md:hidden"
                : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--interlines-azure)]/14 bg-white/90 text-[var(--interlines-azure)] shadow-[0_8px_24px_rgba(34,84,92,0.12)] transition hover:border-[var(--interlines-azure)]/30 hover:bg-[var(--interlines-azure-light)] md:hidden"
            }
            onClick={() =>
              setMenuOpenPath((openPath) => (openPath === pathname ? null : pathname))
            }
          >
            {menuOpen ? (
              <X className="h-[18px] w-[18px]" />
            ) : (
              <Menu className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>

        <div
          className={`absolute inset-x-0 top-[calc(100%-0.35rem)] z-50 px-1 transition-all duration-300 md:hidden ${
            menuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <div className={`overflow-hidden rounded-[1.75rem] border p-4 backdrop-blur-xl ${mobilePanelTone}`}>
            <nav className="space-y-1">
              {headerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpenPath(null)}
                  className={`block rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-colors ${mobileLinkTone}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-5 grid gap-3">
              {sessionLoading ? null : isAuthenticated ? (
                <>
                  <Link
                    href={primaryHref}
                    onClick={() => setMenuOpenPath(null)}
                    className={
                      isHome
                        ? "inline-flex h-11 w-full items-center justify-center rounded-full bg-white px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                        : "inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--interlines-azure)] px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_rgba(48,117,128,0.2)]"
                    }
                  >
                    {primaryLabel}
                  </Link>
                  <button
                    type="button"
                    disabled={isLoggingOut}
                    onClick={onLogout}
                    className={
                      isHome
                        ? "inline-flex h-11 w-full items-center justify-center rounded-full border border-white/16 bg-white/8 px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white disabled:pointer-events-none disabled:opacity-60"
                        : "inline-flex h-11 w-full items-center justify-center rounded-full border border-[var(--interlines-azure)]/16 bg-white px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--interlines-slate)] disabled:pointer-events-none disabled:opacity-60"
                    }
                  >
                    {isLoggingOut ? "Logging Out" : "Log Out"}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/request-access"
                    onClick={() => setMenuOpenPath(null)}
                    className={
                      isHome
                        ? "inline-flex h-11 w-full items-center justify-center rounded-full bg-white px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                        : "inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--interlines-azure)] px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_rgba(48,117,128,0.2)]"
                    }
                  >
                    Register Now
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpenPath(null)}
                    className={
                      isHome
                        ? "inline-flex h-11 w-full items-center justify-center rounded-full border border-white/16 bg-white/8 px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white"
                        : "inline-flex h-11 w-full items-center justify-center rounded-full border border-[var(--interlines-azure)]/16 bg-white px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--interlines-slate)]"
                    }
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>
          </div>
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
