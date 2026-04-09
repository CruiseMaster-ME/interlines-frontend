"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/Container";
import { cn } from "@/lib/ui";

type CruiseLineStickyCtaProps = {
  bookingHref?: string | null;
  offersHref: string;
};

const ctaButtonClassName =
  "inline-flex min-h-12 items-center justify-center rounded-[1.15rem] px-5 py-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 sm:min-h-[3.25rem] sm:text-xs sm:tracking-[0.2em]";

export default function CruiseLineStickyCta({
  bookingHref,
  offersHref,
}: CruiseLineStickyCtaProps) {
  const [isDocked, setIsDocked] = useState(false);
  const [shellHeight, setShellHeight] = useState(0);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const stopRef = useRef<HTMLDivElement | null>(null);
  const isExternalBookingHref = Boolean(
    bookingHref && /^https?:\/\//i.test(bookingHref),
  );

  useEffect(() => {
    const shellNode = shellRef.current;

    if (!shellNode) {
      return;
    }

    const updateShellHeight = () => {
      const nextHeight = Math.ceil(shellNode.getBoundingClientRect().height);

      setShellHeight((currentHeight) =>
        currentHeight === nextHeight ? currentHeight : nextHeight,
      );
    };

    updateShellHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateShellHeight();
    });

    resizeObserver.observe(shellNode);
    window.addEventListener("resize", updateShellHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateShellHeight);
    };
  }, []);

  useEffect(() => {
    const stopNode = stopRef.current;

    if (!stopNode || shellHeight <= 0) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDocked(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: `0px 0px -${shellHeight}px 0px`,
      },
    );

    observer.observe(stopNode);

    return () => {
      observer.disconnect();
    };
  }, [shellHeight]);

  return (
    <div
      className="relative min-h-[8.75rem] sm:min-h-[6.5rem]"
      style={shellHeight > 0 ? { height: `${shellHeight}px` } : undefined}
    >
      <div ref={stopRef} className="absolute inset-x-0 bottom-0 h-px" />

      <div
        ref={shellRef}
        className={cn(
          "pointer-events-none inset-x-0 bottom-0 z-40",
          isDocked ? "absolute" : "fixed",
        )}
      >
        <Container className="max-w-6xl px-5 pb-[calc(env(safe-area-inset-bottom)+0.9rem)]">
          <div className="pointer-events-auto mx-auto w-full max-w-[36rem] rounded-[1.8rem] border border-[var(--interlines-azure)]/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(245,249,250,0.9)_100%)] p-3 shadow-[0_24px_54px_rgba(16,38,42,0.16)] backdrop-blur-xl">
            <div className="flex flex-col gap-2.5 sm:flex-row">
              {bookingHref ? (
                <Link
                  href={bookingHref}
                  target={isExternalBookingHref ? "_blank" : undefined}
                  rel={isExternalBookingHref ? "noreferrer" : undefined}
                  className={cn(
                    ctaButtonClassName,
                    "flex-1 bg-[linear-gradient(135deg,var(--interlines-azure)_0%,var(--interlines-azure-deep)_100%)] text-white shadow-[0_16px_30px_rgba(48,117,128,0.28)] hover:-translate-y-0.5 hover:shadow-[0_20px_34px_rgba(36,88,96,0.34)]",
                  )}
                >
                  Book This Cruise Line
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className={cn(
                    ctaButtonClassName,
                    "flex-1 cursor-not-allowed bg-[linear-gradient(135deg,var(--interlines-azure)_0%,var(--interlines-azure-deep)_100%)] text-white/88 opacity-55 shadow-none",
                  )}
                >
                  Book This Cruise Line
                </button>
              )}

              <Link
                href={offersHref}
                className={cn(
                  ctaButtonClassName,
                  "border border-[var(--interlines-azure)]/14 bg-white/78 text-[var(--interlines-azure)] hover:border-[var(--interlines-azure)]/28 hover:bg-[var(--interlines-azure-light)]/55 sm:flex-none sm:px-6",
                )}
              >
                View Offers
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
