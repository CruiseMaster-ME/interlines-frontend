import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";

export function PageHeader({
  title,
  children,
  balanced = false,
  backgroundImage,
  backgroundPosition = "center center",
  showBreadcrumbs = true,
}: {
  title: React.ReactNode;
  children?: React.ReactNode;
  balanced?: boolean;
  backgroundImage?: string;
  backgroundPosition?: string;
  showBreadcrumbs?: boolean;
}) {
  const isBalanced = balanced || !children;

  return (
    <div
      className={
        isBalanced
          ? "relative isolate overflow-hidden border-b border-white/10 bg-[var(--interlines-azure-deep)] pt-28 pb-16 text-center sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
          : "relative isolate overflow-hidden border-b border-white/10 bg-[var(--interlines-azure-deep)] pt-28 pb-14 text-center sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20"
      }
    >
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <div
            className="absolute inset-0 scale-[1.04] bg-cover bg-no-repeat opacity-[0.76]"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition,
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(36,88,96,0.94)_0%,rgba(48,117,128,0.76)_32%,rgba(36,88,96,0.34)_62%,rgba(36,88,96,0.12)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--interlines-azure-deep)]/86 via-[var(--interlines-azure-deep)]/26 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[var(--interlines-azure-deep)]/94 via-[var(--interlines-azure)]/54 to-transparent sm:w-[86%] lg:w-[54%]" />
        <div className="absolute left-[-8%] top-[8%] h-[320px] w-[320px] rounded-full bg-white/10 blur-[90px] pointer-events-none sm:h-[460px] sm:w-[460px] sm:blur-[120px]" />
        <div className="absolute right-[-8%] bottom-[-12%] h-[260px] w-[260px] rounded-full bg-[var(--interlines-gold)]/18 blur-[84px] pointer-events-none sm:h-[360px] sm:w-[360px] sm:blur-[110px]" />
      </div>

      <Container className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5">
        {showBreadcrumbs ? <Breadcrumbs /> : null}
        <h1 className="font-display text-[2.75rem] leading-[1.02] tracking-[-0.03em] text-white drop-shadow-md sm:text-[4rem] lg:text-[4.75rem]">
          {title}
        </h1>
        {children && (
          <div className="mx-auto mt-8 max-w-2xl rounded-[1.75rem] border border-white/16 bg-white/10 px-6 py-4 text-base font-light leading-relaxed text-white/95 shadow-[0_18px_50px_rgba(8,20,24,0.16)] backdrop-blur-md sm:mt-9 sm:px-8 sm:py-5 sm:text-lg">
            {children}
          </div>
        )}
      </Container>
    </div>
  );
}
