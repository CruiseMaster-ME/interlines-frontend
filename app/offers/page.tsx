import type { Metadata } from "next";
import Container from "@/components/Container";
import CruiseOfferCard from "@/components/CruiseOfferCard";
import { PageHeader } from "@/components/PageHeader";
import { NO_ACTIVE_OFFERS_MESSAGE, getCruiseOffers } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Cruise Offers",
  description: "Browse the latest cruise offers across all cruise lines.",
};

export default async function OffersPage() {
  const offers = await getCruiseOffers();

  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen pb-24">
      <PageHeader
        title="Current Cruise Offers"
        backgroundImage="/assets/images/cruise-offers.jpg"
        backgroundPosition="center 56%"
        balanced
      />

      <Container className="max-w-6xl px-5 pt-10 sm:pt-12">
        <section className="rounded-[2rem] border border-[var(--interlines-azure)]/10 bg-white p-6 shadow-[0_15px_40px_rgba(48,117,128,0.06)] sm:p-8">
          <p className="border-b border-[var(--interlines-azure)]/10 pb-6 text-[15px] leading-8 text-[var(--interlines-slate-soft)] sm:text-[16px]">
            {offers.length > 0
              ? "Browse cruise offers across all cruise lines."
              : NO_ACTIVE_OFFERS_MESSAGE}
          </p>

          {offers.length > 0 ? (
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
      </Container>
    </div>
  );
}
