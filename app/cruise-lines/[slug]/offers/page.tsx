import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import CruiseOfferCard from "@/components/CruiseOfferCard";
import { PageHeader } from "@/components/PageHeader";
import {
  OFFER_DATA_PLACEHOLDER,
  NO_ACTIVE_OFFERS_MESSAGE,
  getCruiseOffersByLineSlug,
} from "@/lib/offers";
import { getCruiseLineBySlug } from "@/lib/siteContent";

type CruiseLineOffersPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: CruiseLineOffersPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { cruiseLine } = await getCruiseOffersByLineSlug(slug);
  const fallbackLine = getCruiseLineBySlug(slug);
  const cruiseLineName =
    cruiseLine && cruiseLine.name !== OFFER_DATA_PLACEHOLDER
      ? cruiseLine.name
      : fallbackLine?.name;
  const title =
    cruiseLineName ? `${cruiseLineName} Offers` : "Cruise Offers";

  return {
    title,
    description:
      cruiseLineName
        ? `Browse current cruise offers for ${cruiseLineName}.`
        : "Browse current cruise offers.",
  };
}

export default async function CruiseLineOffersPage({
  params,
}: CruiseLineOffersPageProps) {
  const { slug } = await params;
  const { cruiseLine, offers } = await getCruiseOffersByLineSlug(slug);
  const fallbackLine = getCruiseLineBySlug(slug);
  const cruiseLineName =
    cruiseLine && cruiseLine.name !== OFFER_DATA_PLACEHOLDER
      ? cruiseLine.name
      : fallbackLine?.name ?? "Cruise Line";
  const title = `${cruiseLineName} Offers`;
  const description =
    offers.length > 0
      ? `Browse current cruise offers for ${cruiseLineName}.`
      : NO_ACTIVE_OFFERS_MESSAGE;
  const headerImage =
    cruiseLine?.heroImageSrc ||
    fallbackLine?.detailImageSrc ||
    fallbackLine?.imageSrc ||
    "/assets/images/hero-bg.jpg";

  return (
    <div className="min-h-screen bg-[var(--interlines-bg)] pb-24">
      <PageHeader
        title={title}
        backgroundImage={headerImage}
        backgroundPosition="center 42%"
        balanced
      />

      <Container className="max-w-6xl px-5 pt-10 sm:pt-12">
        <section className="rounded-[2rem] border border-[var(--interlines-azure)]/10 bg-white p-6 shadow-[0_16px_40px_rgba(48,117,128,0.06)] sm:p-8">
          {offers.length > 0 ? (
            <div className="flex flex-wrap items-center gap-4 border-b border-[var(--interlines-azure)]/10 pb-6">
              <div className="flex h-20 w-40 items-center justify-center rounded-[1.2rem] border border-[var(--interlines-azure)]/10 bg-white px-5 py-4">
                {cruiseLine?.logoSrc ? (
                  <div className="relative h-10 w-full">
                    <Image
                      src={cruiseLine.logoSrc}
                      alt={cruiseLine.logoAlt}
                      fill
                      sizes="10rem"
                      className="object-contain object-left"
                    />
                  </div>
                ) : fallbackLine?.logoSrc ? (
                  <div className="relative h-10 w-full">
                    <Image
                      src={fallbackLine.logoSrc}
                      alt={fallbackLine.logoAlt}
                      fill
                      sizes="10rem"
                      className="object-contain object-left"
                    />
                  </div>
                ) : (
                  <p className="text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--interlines-slate-soft)]">
                    {cruiseLineName}
                  </p>
                )}
              </div>

              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--interlines-azure)]/76">
                  Current Offers
                </p>
                <p className="mt-2 text-[15px] leading-8 text-[var(--interlines-slate-soft)] sm:text-[16px]">
                  {description}
                </p>
              </div>
            </div>
          ) : null}

          {offers.length > 0 ? (
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
      </Container>
    </div>
  );
}
