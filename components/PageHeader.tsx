import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";

export function PageHeader({
  title,
  subtitle,
  children,
  balanced = false,
}: {
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
  balanced?: boolean;
}) {
  const isBalanced = balanced || !children;

  return (
    <div
      className={
        isBalanced
          ? "relative isolate overflow-hidden border-b border-[var(--interlines-azure)]/10 bg-[var(--interlines-azure)] py-16 text-center sm:py-20 lg:py-24"
          : "relative isolate overflow-hidden border-b border-[var(--interlines-azure)]/10 bg-[var(--interlines-azure)] pt-20 pb-12 text-center sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20"
      }
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/15 via-[var(--interlines-azure)]/90 to-[var(--interlines-azure)]" />
        <div className="absolute left-[8%] top-[-18%] z-0 h-[420px] w-[420px] rounded-full bg-white/10 blur-[96px] pointer-events-none" />
        <div className="absolute right-[8%] bottom-[-18%] z-0 h-[240px] w-[240px] rounded-full bg-[var(--interlines-gold)]/20 blur-[72px] pointer-events-none" />
      </div>

      <Container className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5">
        <Breadcrumbs />
        {subtitle && (
          <span className="mb-4 text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--interlines-gold-light)] drop-shadow-sm sm:mb-5 sm:text-xs">
            {subtitle}
          </span>
        )}
        <h1 className="font-display text-[2.75rem] leading-[1.02] tracking-[-0.03em] text-white drop-shadow-md sm:text-[4rem] lg:text-[4.75rem]">
          {title}
        </h1>
        {children && (
          <div className="mx-auto mt-8 max-w-2xl rounded-[1.75rem] border border-white/20 bg-white/10 px-6 py-4 text-base font-light leading-relaxed text-white/95 shadow-inner backdrop-blur-md sm:mt-9 sm:px-8 sm:py-5 sm:text-lg">
            {children}
          </div>
        )}
      </Container>
    </div>
  );
}
