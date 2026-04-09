"use client";

import Link from "next/link";
import { useSessionContext } from "@/components/SessionProvider";
import { buildOdysseusShipUrl } from "@/lib/odysseus";

type CruiseLineShipsSectionProps = {
  cruiseLineSlug: string;
  items: readonly string[];
};

export default function CruiseLineShipsSection({
  cruiseLineSlug,
  items,
}: CruiseLineShipsSectionProps) {
  const { status } = useSessionContext();
  const isAuthenticated = status === "user" || status === "admin";

  return (
    <div className="h-full rounded-[1.6rem] border border-[var(--interlines-azure)]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,250,251,0.98)_100%)] p-5 sm:p-6">
      <h2 className="font-display text-[1.8rem] leading-[1.02] tracking-[-0.03em] text-[var(--interlines-slate)] sm:text-[2rem]">
        Ships
      </h2>

      {items.length > 0 ? (
        <div className="mt-5 flex flex-wrap items-center gap-y-2 text-[14px] leading-8 text-[var(--interlines-slate)] sm:text-[15px]">
          {items.map((item, index) => {
            const href = isAuthenticated
              ? buildOdysseusShipUrl(cruiseLineSlug, item)
              : null;

            return (
              <span key={item} className="inline-flex items-center whitespace-nowrap">
                {href ? (
                  <Link
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-[var(--interlines-azure)] transition-colors duration-200 hover:text-[var(--interlines-azure-deep)] hover:underline hover:underline-offset-4"
                  >
                    {item}
                  </Link>
                ) : (
                  <span className="font-medium">{item}</span>
                )}
                {index < items.length - 1 ? (
                  <span className="px-2 text-[var(--interlines-azure)]/45">|</span>
                ) : null}
              </span>
            );
          })}
        </div>
      ) : (
        <p className="mt-5 text-[14px] leading-8 text-[var(--interlines-slate-soft)] sm:text-[15px]">
          Data not available.
        </p>
      )}
    </div>
  );
}
