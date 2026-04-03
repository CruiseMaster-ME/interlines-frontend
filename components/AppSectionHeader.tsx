"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function AppSectionHeader({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  actions,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-[var(--interlines-azure)]/10 bg-white/92">
      <div className="px-5 py-5 sm:px-6 sm:py-6 lg:px-10">
        <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {breadcrumbs.length > 0 && (
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--interlines-slate-soft)]"
              >
                {breadcrumbs.map((item, index) => {
                  const isLast = index === breadcrumbs.length - 1;

                  return (
                    <div key={`${item.label}-${index}`} className="flex items-center gap-1">
                      {item.href && !isLast ? (
                        <Link
                          href={item.href}
                          className="transition-colors hover:text-[var(--interlines-azure)]"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className={isLast ? "text-[var(--interlines-azure)]" : undefined}>
                          {item.label}
                        </span>
                      )}

                      {!isLast && <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.8} />}
                    </div>
                  );
                })}
              </nav>
            )}

            {eyebrow && (
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--interlines-azure)]">
                {eyebrow}
              </p>
            )}

            <h1 className="mt-2 font-display text-[2rem] leading-tight text-[var(--interlines-slate)] sm:text-[2.4rem]">
              {title}
            </h1>

            {description && (
              <p className="mt-2 text-sm text-[var(--interlines-slate-soft)]">{description}</p>
            )}
          </div>

          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>

        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    </div>
  );
}
