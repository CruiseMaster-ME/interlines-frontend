"use client";

import { useEffect, useState } from "react";
import CompactBreadcrumbs from "@/components/CompactBreadcrumbs";
import CruiseOfferCard from "@/components/CruiseOfferCard";
import {
  NO_ACTIVE_OFFERS_MESSAGE,
  type CruiseOffer,
  getCruiseOffersLive,
} from "@/lib/offers";

export default function OffersClient() {
  const [offers, setOffers] = useState<CruiseOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { label: "Cruise Offers" },
  ];

  useEffect(() => {
    let ignore = false;

    async function loadOffers() {
      try {
        const nextOffers = await getCruiseOffersLive();

        if (!ignore) {
          setOffers(nextOffers);
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
  }, []);

  return (
    <section className="rounded-[2rem] border border-[var(--interlines-azure)]/10 bg-white p-6 shadow-[0_15px_40px_rgba(48,117,128,0.06)] sm:p-8">
      <div className="border-b border-[var(--interlines-azure)]/10 pb-6">
        <CompactBreadcrumbs items={breadcrumbItems} />
        {(isLoading || offers.length > 0) ? (
          <p className="mt-4 text-[15px] leading-8 text-[var(--interlines-slate-soft)] sm:text-[16px]">
            {isLoading
              ? "Loading current cruise offers..."
              : "Browse cruise offers across all cruise lines."}
          </p>
        ) : null}
      </div>

      {isLoading ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[22rem] animate-pulse rounded-[1.75rem] border border-[var(--interlines-azure)]/10 bg-[rgba(248,251,252,0.9)]"
            />
          ))}
        </div>
      ) : offers.length > 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer) => (
            <CruiseOfferCard
              key={`${offer.cruiseLineSlug}-${offer.slug}`}
              offer={offer}
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
