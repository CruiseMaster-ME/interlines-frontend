"use client";

import { Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import BrandMark from "@/components/BrandMark";
import Container from "@/components/Container";
import { useSessionContext } from "@/components/SessionProvider";
import { headerNav } from "@/lib/siteContent";

function usesImmersiveHeader(pathname: string | null) {
  if (!pathname) {
    return false;
  }

  const normalizedPathname =
    pathname !== "/" ? pathname.replace(/\/+$/, "") || "/" : pathname;

  return (
    normalizedPathname === "/" ||
    normalizedPathname === "/about" ||
    normalizedPathname === "/offers" ||
    normalizedPathname === "/faq" ||
    normalizedPathname === "/eligibility" ||
    normalizedPathname === "/privacy-policy" ||
    normalizedPathname === "/terms-and-conditions" ||
    normalizedPathname === "/offer-details" ||
    normalizedPathname === "/cruise-lines" ||
    normalizedPathname.startsWith("/cruise-lines/")
  );
}

function usesSolidTealHeader(pathname: string | null) {
  if (!pathname) {
    return false;
  }

  const normalizedPathname =
    pathname !== "/" ? pathname.replace(/\/+$/, "") || "/" : pathname;

  return (
    normalizedPathname === "/login" ||
    normalizedPathname === "/request-access" ||
    normalizedPathname === "/forgot-password" ||
    normalizedPathname === "/reset-password" ||
    normalizedPathname === "/pending-approval" ||
    normalizedPathname === "/cruise-search" ||
    normalizedPathname === "/dashboard" ||
    normalizedPathname === "/booking"
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { status, logoutSession } = useSessionContext();
  const usesHeroTone = usesImmersiveHeader(pathname);
  const usesSolidTealTone = usesSolidTealHeader(pathname);
  const normalizedPathname =
    pathname && pathname !== "/" ? pathname.replace(/\/+$/, "") || "/" : pathname ?? "/";
  const [menuOpenPath, setMenuOpenPath] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuOpen = menuOpenPath === pathname;
  const usesTrackedScrollTone = usesHeroTone || usesSolidTealTone;
  const useInverseTone = usesTrackedScrollTone && !isScrolled;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!usesTrackedScrollTone) {
      setIsScrolled(false);
      return;
    }

    function syncScrollState() {
      setIsScrolled(window.scrollY > 16);
    }

    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncScrollState);
    };
  }, [usesTrackedScrollTone]);

  const mobilePanelTone = useInverseTone
    ? "border-white/12 bg-[rgba(24,54,59,0.94)] text-white shadow-[0_24px_60px_rgba(8,20,24,0.35)]"
    : "border-[var(--interlines-azure)]/10 bg-white/95 text-[var(--interlines-slate)] shadow-[0_24px_60px_rgba(34,84,92,0.14)]";
  const mobileLinkTone = useInverseTone
    ? "text-white/88 hover:bg-white/8 hover:text-white"
    : "text-[var(--interlines-slate)] hover:bg-[var(--interlines-azure-light)] hover:text-[var(--interlines-azure)]";
  const sessionLoading = status === "loading";
  const isAdmin = status === "admin";
  const showHeaderPrimaryAction = isAdmin;
  const isAuthenticated = status === "user" || status === "admin";
  const showCruiseSearchAction =
    isAuthenticated && normalizedPathname !== "/cruise-search";
  const showHomeAction =
    isAuthenticated && normalizedPathname === "/cruise-search";
  const profileHref = isAdmin ? "/admin" : "/dashboard";
  const profileAriaLabel = isAdmin ? "Open admin area" : "Open profile";
  const desktopPrimaryActionClassName = useInverseTone
    ? "hidden h-10 items-center justify-center rounded-full bg-white px-6 text-[11px] font-bold uppercase tracking-widest text-[var(--interlines-azure)] shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[var(--interlines-azure-light)] hover:shadow-[0_12px_26px_rgba(0,0,0,0.18)] md:inline-flex"
    : "hidden h-10 items-center justify-center rounded-full bg-[var(--interlines-azure)] px-6 text-[11px] font-bold uppercase tracking-widest text-white shadow-[0_4px_15px_rgba(48,117,128,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[var(--interlines-azure-deep)] hover:shadow-[0_14px_28px_rgba(36,88,96,0.24)] md:inline-flex";
  const desktopSecondaryActionClassName = useInverseTone
    ? "hidden h-10 cursor-pointer items-center justify-center rounded-full border border-white/18 bg-white/8 px-6 text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white hover:bg-white hover:text-[var(--interlines-azure-deep)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.2)] disabled:pointer-events-none disabled:opacity-60 md:inline-flex"
    : "hidden h-10 cursor-pointer items-center justify-center rounded-full border border-[var(--interlines-slate)]/20 bg-transparent px-6 text-[11px] font-bold uppercase tracking-widest text-[var(--interlines-slate)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-[var(--interlines-azure)] hover:bg-[var(--interlines-azure)] hover:text-white hover:shadow-[0_14px_28px_rgba(36,88,96,0.2)] disabled:pointer-events-none disabled:opacity-60 md:inline-flex";
  const desktopIconActionClassName = useInverseTone
    ? "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/36 hover:bg-white/14 hover:shadow-[0_12px_24px_rgba(0,0,0,0.16)]"
    : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--interlines-slate)]/20 bg-transparent text-[var(--interlines-slate)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--interlines-azure)] hover:bg-[var(--interlines-azure-light)] hover:text-[var(--interlines-azure)] hover:shadow-[0_12px_24px_rgba(36,88,96,0.12)]";
  const mobilePrimaryActionClassName = useInverseTone
    ? "inline-flex h-11 w-full items-center justify-center rounded-full bg-white px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--interlines-azure-light)] hover:shadow-[0_16px_28px_rgba(0,0,0,0.16)]"
    : "inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--interlines-azure)] px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_rgba(48,117,128,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--interlines-azure-deep)] hover:shadow-[0_16px_30px_rgba(36,88,96,0.22)]";
  const mobileSecondaryActionClassName = useInverseTone
    ? "inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full border border-white/16 bg-white/8 px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-white hover:bg-white hover:text-[var(--interlines-azure-deep)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.18)] disabled:pointer-events-none disabled:opacity-60"
    : "inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full border border-[var(--interlines-azure)]/16 bg-white px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--interlines-slate)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[var(--interlines-azure)] hover:bg-[var(--interlines-azure)] hover:text-white hover:shadow-[0_14px_28px_rgba(36,88,96,0.18)] disabled:pointer-events-none disabled:opacity-60";
  const hasHeaderNav = headerNav.length > 0;
  const headerGridClassName = hasHeaderNav
    ? "relative grid h-[4.5rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 md:h-20 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4"
    : "relative grid h-[4.5rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 md:h-20 md:grid-cols-[minmax(0,1fr)_auto] md:gap-4";
  const primaryHref = isAdmin ? "/admin" : "/cruise-search";
  const primaryLabel = isAdmin ? "Admin" : "Cruise Search";
  const headerShellClassName = usesHeroTone
    ? "relative h-0 overflow-visible"
    : "relative";
  const headerSurfaceClassName = usesHeroTone
    ? useInverseTone
      ? "relative h-[4.5rem] md:h-20"
      : "relative h-[4.5rem] bg-white shadow-[0_10px_32px_rgba(15,23,42,0.08)] md:h-20"
    : usesSolidTealTone
      ? useInverseTone
        ? "relative bg-[linear-gradient(135deg,var(--interlines-azure-deep)_0%,var(--interlines-azure)_100%)] shadow-[0_14px_36px_rgba(26,61,68,0.18)]"
        : "relative bg-white shadow-[0_10px_32px_rgba(15,23,42,0.08)]"
      : "relative bg-white shadow-sm";

  async function onLogout() {
    setIsLoggingOut(true);

    try {
      await logoutSession();
      setMenuOpenPath(null);

      if (pathname?.startsWith("/admin")) {
        router.push("/admin/login");
        return;
      }

      if (
        pathname?.startsWith("/dashboard") ||
        pathname?.startsWith("/booking") ||
        pathname?.startsWith("/cruise-search")
      ) {
        router.push("/login");
      }
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header className={headerShellClassName}>
      {menuOpen && (
        <button
          type="button"
          aria-label="Close mobile menu"
          className="fixed inset-0 z-40 bg-[var(--interlines-slate)]/20 backdrop-blur-[2px] md:hidden"
          onClick={() => setMenuOpenPath(null)}
        />
      )}

      <div className={headerSurfaceClassName}>
        {useInverseTone && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(19,45,50,0.44)] via-[rgba(19,45,50,0.12)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[var(--interlines-azure-deep)]/92 via-[var(--interlines-azure)]/42 to-transparent sm:w-[86%] lg:w-[58%]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[62%] bg-gradient-to-l from-[var(--interlines-azure-deep)]/90 via-[var(--interlines-azure)]/48 to-transparent sm:w-[42%] lg:w-[30%]" />
          </>
        )}

        <Container className={headerGridClassName}>
        <Link
          href="/"
          className="inline-flex h-full max-w-[12.75rem] items-center justify-self-start leading-none transition-opacity hover:opacity-85 sm:max-w-none"
        >
          <BrandMark inverse={useInverseTone} />
        </Link>

        {hasHeaderNav ? (
          <nav
            className={
              useInverseTone
                ? "hidden items-center justify-center gap-7 whitespace-nowrap text-[0.72rem] font-bold uppercase tracking-[0.28em] text-white md:flex"
                : "hidden items-center justify-center gap-7 whitespace-nowrap text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[var(--interlines-slate-soft)] md:flex"
            }
          >
            {headerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  useInverseTone
                    ? "drop-shadow-sm transition-colors hover:text-[var(--interlines-gold)]"
                    : "transition-colors hover:text-[var(--interlines-azure)]"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}

        <div className="flex items-center justify-self-end gap-2 sm:gap-3 md:gap-4">
          {sessionLoading ? (
            <div className="hidden items-center gap-3 md:flex">
              <div
                className={
                  useInverseTone
                    ? "h-10 w-28 rounded-full border border-white/10 bg-white/8"
                    : "h-10 w-28 rounded-full border border-slate-200 bg-white"
                }
              />
              <div
                className={
                  useInverseTone
                    ? "h-10 w-28 rounded-full border border-white/10 bg-white/8"
                    : "h-10 w-28 rounded-full border border-slate-200 bg-white"
                }
              />
            </div>
          ) : isAuthenticated ? (
            <>
              {showHeaderPrimaryAction ? (
                <Link
                  href={primaryHref}
                  className={desktopPrimaryActionClassName}
                >
                  {primaryLabel}
                </Link>
              ) : null}
              {showCruiseSearchAction ? (
                <Link
                  href="/cruise-search"
                  className={desktopPrimaryActionClassName}
                >
                  Search Cruises
                </Link>
              ) : null}
              {showHomeAction ? (
                <Link
                  href="/"
                  className={desktopPrimaryActionClassName}
                >
                  Home
                </Link>
              ) : null}
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={onLogout}
                className={desktopSecondaryActionClassName}
              >
                {isLoggingOut ? "Logging Out" : "Log Out"}
              </button>
              <Link
                href={profileHref}
                aria-label={profileAriaLabel}
                className={desktopIconActionClassName}
              >
                <User className="h-[18px] w-[18px]" strokeWidth={2} />
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={desktopSecondaryActionClassName}
              >
                Log In
              </Link>
              <Link
                href="/request-access"
                className={desktopPrimaryActionClassName}
              >
                Register
              </Link>
            </>
          )}

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className={
              useInverseTone
                ? "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-white/8 text-white shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/12 hover:shadow-[0_14px_28px_rgba(0,0,0,0.18)] md:hidden"
                : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--interlines-azure)]/14 bg-white/90 text-[var(--interlines-azure)] shadow-[0_8px_24px_rgba(34,84,92,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--interlines-azure)]/30 hover:bg-[var(--interlines-azure-light)] hover:shadow-[0_14px_28px_rgba(36,88,96,0.14)] md:hidden"
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
            {hasHeaderNav ? (
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
            ) : null}

            <div className={hasHeaderNav ? "mt-5 grid gap-3" : "grid gap-3"}>
              {sessionLoading ? null : isAuthenticated ? (
                <>
                  {showHeaderPrimaryAction ? (
                    <Link
                    href={primaryHref}
                    onClick={() => setMenuOpenPath(null)}
                    className={mobilePrimaryActionClassName}
                  >
                    {primaryLabel}
                  </Link>
                  ) : null}
                  {showCruiseSearchAction ? (
                    <Link
                    href="/cruise-search"
                    onClick={() => setMenuOpenPath(null)}
                    className={mobilePrimaryActionClassName}
                  >
                    Search Cruises
                  </Link>
                  ) : null}
                  {showHomeAction ? (
                    <Link
                    href="/"
                    onClick={() => setMenuOpenPath(null)}
                    className={mobilePrimaryActionClassName}
                  >
                    Home
                  </Link>
                  ) : null}
                  <button
                    type="button"
                    disabled={isLoggingOut}
                    onClick={onLogout}
                    className={mobileSecondaryActionClassName}
                  >
                    {isLoggingOut ? "Logging Out" : "Log Out"}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/request-access"
                    onClick={() => setMenuOpenPath(null)}
                    className={mobilePrimaryActionClassName}
                  >
                    Register
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpenPath(null)}
                    className={mobileSecondaryActionClassName}
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
            useInverseTone
              ? "pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-white/24 to-transparent sm:inset-x-8"
              : "pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--interlines-azure)]/18 to-transparent sm:inset-x-8"
          }
        />
      </div>
    </header>
  );
}
