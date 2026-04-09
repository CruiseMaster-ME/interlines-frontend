"use client";

import { useEffect, useState } from "react";
import CompactBreadcrumbs from "@/components/CompactBreadcrumbs";
import CruiseLineBrandCard from "@/components/CruiseLineBrandCard";
import CruiseOfferCard from "@/components/CruiseOfferCard";
import {
  OFFER_DATA_PLACEHOLDER,
  NO_ACTIVE_OFFERS_MESSAGE,
  type CruiseOffer,
  type CruiseOfferCruiseLine,
  getCruiseOffersByLineSlugLive,
} from "@/lib/offers";
import type { CruiseLine } from "@/lib/siteContent";

type CruiseLineOffersClientProps = {
  slug: string;
  fallbackLine: CruiseLine | null;
};

export default function CruiseLineOffersClient({
  slug,
  fallbackLine,
}: CruiseLineOffersClientProps) {
  const [cruiseLine, setCruiseLine] = useState<CruiseOfferCruiseLine | null>(null);
  const [offers, setOffers] = useState<CruiseOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadOffers() {
      try {
        const result = await getCruiseOffersByLineSlugLive(slug);

        if (!ignore) {
          setCruiseLine(result.cruiseLine);
          setOffers(result.offers);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void loadOffers();

    return () => {
      ignore = true;
    };
  }, [slug]);

  const cruiseLineName =
    cruiseLine?.name && cruiseLine.name !== OFFER_DATA_PLACEHOLDER
      ? cruiseLine.name
      : fallbackLine?.name ?? "Cruise Line";

  const description =
    offers.length > 0
      ? `Browse current cruise offers for ${cruiseLineName}.`
      : NO_ACTIVE_OFFERS_MESSAGE;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/cruise-lines", label: "Cruise Lines" },
    ...(fallbackLine
      ? [{ href: `/cruise-lines/${fallbackLine.slug}`, label: fallbackLine.name }]
      : []),
    { label: "Offers" },
  ];

  return (
    <section className="rounded-[2rem] border border-[var(--interlines-azure)]/10 bg-white p-6 shadow-[0_16px_40px_rgba(48,117,128,0.06)] sm:p-8">
      {isLoading ? (
        <div className="border-b border-[var(--interlines-azure)]/10 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-3 w-12 animate-pulse rounded-full bg-[var(--interlines-azure)]/10" />
            <div className="h-3 w-3 animate-pulse rounded-full bg-[var(--interlines-azure)]/10" />
            <div className="h-3 w-20 animate-pulse rounded-full bg-[var(--interlines-azure)]/10" />
            <div className="h-3 w-3 animate-pulse rounded-full bg-[var(--interlines-azure)]/10" />
            <div className="h-3 w-16 animate-pulse rounded-full bg-[var(--interlines-azure)]/10" />
          </div>

          <div className="mt-4 h-[5.1rem] w-[13.5rem] animate-pulse rounded-[1.35rem] border border-[var(--interlines-azure)]/10 bg-[linear-gradient(180deg,rgba(248,251,252,0.82)_0%,rgba(255,255,255,0.98)_100%)]" />

          <div className="mt-5 space-y-3">
            <div className="h-4 w-full animate-pulse rounded-full bg-[var(--interlines-azure)]/10" />
            <div className="h-4 w-[92%] animate-pulse rounded-full bg-[var(--interlines-azure)]/10" />
          </div>
        </div>
      ) : null}

      {!isLoading ? (
        <div className="border-b border-[var(--interlines-azure)]/10 pb-6">
          <CompactBreadcrumbs items={breadcrumbItems} />
          <CruiseLineBrandCard
            line={fallbackLine}
            fallbackLabel={cruiseLineName}
            className="mt-4"
          />
          <p className="mt-5 text-[15px] leading-8 text-[var(--interlines-slate-soft)] sm:text-[16px]">
            {description}
          </p>
        </div>
      ) : null}

      {isLoading ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[1.75rem] border border-[var(--interlines-azure)]/10 bg-[rgba(248,251,252,0.9)] shadow-[0_14px_34px_rgba(48,117,128,0.04)]"
            >
              <div className="h-2 bg-[linear-gradient(90deg,var(--interlines-azure-deep)_0%,var(--interlines-azure)_100%)] opacity-40" />
              <div className="space-y-5 p-5 sm:p-6">
                <div className="space-y-3 border-b border-[var(--interlines-azure)]/10 pb-4">
                  <div className="h-5 w-[78%] animate-pulse rounded-full bg-[var(--interlines-azure)]/10" />
                  <div className="h-5 w-[62%] animate-pulse rounded-full bg-[var(--interlines-azure)]/10" />
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <div className="h-9 w-28 animate-pulse rounded-full bg-[var(--interlines-azure)]/10" />
                  <div className="h-9 w-24 animate-pulse rounded-full bg-[var(--interlines-azure)]/10" />
                  <div className="h-9 w-20 animate-pulse rounded-full bg-[var(--interlines-azure)]/10" />
                </div>
                <div className="h-20 animate-pulse rounded-[1.1rem] bg-[var(--interlines-azure)]/8" />
                <div className="space-y-3">
                  <div className="h-4 w-full animate-pulse rounded-full bg-[var(--interlines-azure)]/10" />
                  <div className="h-4 w-[88%] animate-pulse rounded-full bg-[var(--interlines-azure)]/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : offers.length > 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {offers.map((offer) => (
            <CruiseOfferCard
              key={`${offer.cruiseLineSlug}-${offer.slug}`}
              offer={offer}
              showCruiseLineBranding={false}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[1.5rem] border border-dashed border-[var(--interlines-gold)]/30 bg-[rgba(255,253,248,0.78)] px-6 py-10 text-center text-[15px] leading-7 text-[var(--interlines-slate-soft)]">
          {NO_ACTIVE_OFFERS_MESSAGE}
        </div>
      )}
    </section>
  );
}
