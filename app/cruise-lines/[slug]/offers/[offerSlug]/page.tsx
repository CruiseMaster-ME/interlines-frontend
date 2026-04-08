import type { Metadata } from "next";
import { execFileSync } from "node:child_process";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MapPinned,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { getApiBaseUrl } from "@/lib/config";
import {
  OFFER_DATA_PLACEHOLDER,
  getCruiseOfferBySlugs,
  type CruiseOffer,
  type CruiseOfferCruiseLine,
  type CruiseOfferSailing,
} from "@/lib/offers";

type CruiseOfferDetailPageProps = {
  params: Promise<{
    slug: string;
    offerSlug: string;
  }>;
};

type StaticParamsApiResponse = {
  offers?: Array<{
    slug?: string | null;
  }> | null;
};

export function generateStaticParams({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const apiBase = getApiBaseUrl();
  if (!apiBase) return [];

  try {
    const response = execFileSync(
      "curl",
      ["-fsSL", `${apiBase}/api/cruise-lines/${params.slug}/offers`],
      {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      },
    );
    const payload = JSON.parse(response) as StaticParamsApiResponse;

    return (payload.offers ?? [])
      .map((offer) => {
        const offerSlug = offer.slug?.trim();

        if (!offerSlug) {
          return null;
        }

        return { offerSlug };
      })
      .filter(
        (item): item is { offerSlug: string } => Boolean(item),
      );
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: CruiseOfferDetailPageProps): Promise<Metadata> {
  const { slug, offerSlug } = await params;
  const { cruiseLine, offer } = await getCruiseOfferBySlugs(slug, offerSlug);

  if (!offer || !cruiseLine || cruiseLine.name === OFFER_DATA_PLACEHOLDER) {
    return {
      title: "Cruise Offer",
      description: OFFER_DATA_PLACEHOLDER,
    };
  }

  return {
    title: `${offer.title} - ${cruiseLine.name}`,
    description: offer.summary,
  };
}

function splitPipeList(value?: string | null) {
  return value
    ?.split("|")
    .map((item) => item.trim())
    .filter(Boolean) ?? [];
}

function createPlaceholderCruiseLine(slug: string): CruiseOfferCruiseLine {
  return {
    slug,
    name: OFFER_DATA_PLACEHOLDER,
    logoSrc: null,
    logoAlt: "Cruise line logo",
    heroImageSrc: null,
  };
}

function createPlaceholderOffer(
  cruiseLine: CruiseOfferCruiseLine,
  offerSlug: string,
): CruiseOffer {
  return {
    slug: offerSlug,
    cruiseLineSlug: cruiseLine.slug,
    cruiseLineName: cruiseLine.name,
    cruiseLineLogoSrc: cruiseLine.logoSrc,
    cruiseLineLogoAlt: cruiseLine.logoAlt,
    cruiseLineHeroImageSrc: cruiseLine.heroImageSrc,
    title: OFFER_DATA_PLACEHOLDER,
    summary: OFFER_DATA_PLACEHOLDER,
    validFrom: null,
    validUntil: null,
    departurePorts: null,
    travelWindow: null,
    heroTagline: null,
    heroImageSrc: null,
    heroImageAlt: null,
    termsNote: null,
    bookingLabel: null,
    bookingHref: null,
    ship: null,
    destination: null,
    theme: {
      primaryColor: null,
      accentColor: null,
      textColor: null,
    },
    sailings: [],
    gallery: [],
  };
}

function createPlaceholderSailing(offerSlug: string): CruiseOfferSailing {
  return {
    slug: `${offerSlug}-placeholder`,
    shipName: null,
    sailingDate: null,
    departurePorts: null,
    nights: null,
    portsOfCall: null,
    sailingPeriod: null,
    availabilityLabel: null,
    bookingEngineHref: null,
    bookingHref: null,
  };
}

function formatValidity(offer: CruiseOffer) {
  if (offer.validFrom && offer.validUntil) {
    return `${offer.validFrom} - ${offer.validUntil}`;
  }

  if (offer.validUntil) {
    return `Valid until ${offer.validUntil}`;
  }

  if (offer.validFrom) {
    return `Valid from ${offer.validFrom}`;
  }

  return OFFER_DATA_PLACEHOLDER;
}

function renderPipeList(items: string[]) {
  if (items.length === 0) {
    return (
      <p className="mt-3 text-[14px] leading-6 text-[var(--interlines-slate-soft)]">
        {OFFER_DATA_PLACEHOLDER}
      </p>
    );
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-[var(--interlines-gold)]/12 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--interlines-slate)]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default async function CruiseOfferDetailPage({
  params,
}: CruiseOfferDetailPageProps) {
  const { slug, offerSlug } = await params;
  const result = await getCruiseOfferBySlugs(slug, offerSlug);
  const cruiseLine = result.cruiseLine ?? createPlaceholderCruiseLine(slug);
  const cruiseOffer = result.offer ?? createPlaceholderOffer(cruiseLine, offerSlug);
  const leadSailing = cruiseOffer.sailings[0] ?? null;
  const sailings =
    cruiseOffer.sailings.length > 0
      ? cruiseOffer.sailings
      : [createPlaceholderSailing(cruiseOffer.slug)];
  const termsNote = cruiseOffer.termsNote ?? OFFER_DATA_PLACEHOLDER;

  const offerInformation = [
    {
      label: "Offer Validity",
      value: formatValidity(cruiseOffer),
      icon: CalendarDays,
    },
    {
      label: "Departure Ports",
      value:
        cruiseOffer.departurePorts ??
        leadSailing?.departurePorts ??
        OFFER_DATA_PLACEHOLDER,
      icon: MapPinned,
    },
    {
      label: "Ports of Call",
      value:
        leadSailing?.portsOfCall ??
        cruiseOffer.destination ??
        OFFER_DATA_PLACEHOLDER,
      icon: MapPinned,
    },
    {
      label: "Sailing Date",
      value: leadSailing?.sailingDate ?? OFFER_DATA_PLACEHOLDER,
      icon: CalendarDays,
    },
  ] satisfies Array<{
    label: string;
    value: string;
    icon: LucideIcon;
  }>;

  return (
    <div className="min-h-screen bg-[var(--interlines-bg)] pb-24">
      <PageHeader
        title={cruiseOffer.title}
        backgroundImage={cruiseLine.heroImageSrc || "/assets/images/hero-bg.jpg"}
        backgroundPosition="center 42%"
        showBreadcrumbs={false}
      >
        {cruiseLine.name}
      </PageHeader>

      <Container className="max-w-7xl px-5 pt-10 sm:pt-12">
        <div className="rounded-[2.25rem] border border-[var(--interlines-gold)]/16 bg-white shadow-[0_30px_80px_rgba(26,61,68,0.12)]">
          <section className="grid overflow-hidden border-b border-[var(--interlines-gold)]/14 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)]">
            <div className="bg-white px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <Link
                href={`/cruise-lines/${cruiseLine.slug}/offers`}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--interlines-azure)]/12 bg-[rgba(234,244,245,0.55)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--interlines-azure)] transition-colors hover:border-[var(--interlines-azure)]/24 hover:bg-[rgba(234,244,245,0.82)]"
              >
                {cruiseLine.name === OFFER_DATA_PLACEHOLDER
                  ? "Cruise Offers"
                  : `${cruiseLine.name} Offers`}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>

              <div className="mt-6 flex w-fit items-center rounded-[1.2rem] border border-[var(--interlines-gold)]/16 bg-white px-5 py-4 shadow-[0_16px_32px_rgba(26,61,68,0.08)]">
                {cruiseLine.logoSrc ? (
                  <div className="relative h-10 w-36">
                    <Image
                      src={cruiseLine.logoSrc}
                      alt={cruiseLine.logoAlt}
                      fill
                      sizes="9rem"
                      className="object-contain object-left"
                    />
                  </div>
                ) : (
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--interlines-slate-soft)]">
                    {OFFER_DATA_PLACEHOLDER}
                  </p>
                )}
              </div>

              <div className="mt-8 max-w-3xl">
                <h1 className="font-display text-[2.6rem] leading-[0.96] tracking-[-0.05em] text-[var(--interlines-slate)] sm:text-[3.35rem] lg:text-[4.15rem]">
                  {cruiseOffer.title}
                </h1>
                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[var(--interlines-slate-soft)] sm:text-[17px] sm:leading-8">
                  {cruiseOffer.summary}
                </p>
              </div>
            </div>

            <aside className="relative overflow-hidden bg-[linear-gradient(180deg,var(--interlines-azure)_0%,var(--interlines-azure-deep)_100%)] px-6 py-6 text-white sm:px-8 sm:py-8 lg:border-l lg:border-[var(--interlines-gold)]/14 lg:px-10">
              <div className="absolute top-0 right-0 h-36 w-36 translate-x-10 -translate-y-10 rounded-full bg-[var(--interlines-gold)]/16 blur-3xl" />
              <div className="absolute bottom-[-3rem] left-[-2rem] h-32 w-32 rounded-full bg-white/8 blur-3xl" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--interlines-gold-light)]/60 to-transparent" />

              <div className="relative z-10">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--interlines-gold-light)]">
                  Offer Overview
                </p>

                <div className="mt-6 space-y-3">
                  {offerInformation.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="rounded-[1.35rem] border border-[var(--interlines-gold)]/18 bg-[linear-gradient(180deg,rgba(120,170,177,0.22)_0%,rgba(88,145,153,0.18)_100%)] px-4 py-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_14px_30px_rgba(14,33,37,0.12)] backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--interlines-gold-light)]">
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </div>
                        <p className="mt-3 text-[15px] leading-7 text-white/92">
                          {item.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>
          </section>

          <section className="grid overflow-hidden border-t border-[var(--interlines-gold)]/14 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)]">
            <div className="bg-white px-6 py-7 sm:px-8 sm:py-8 lg:px-10">
              <section className="rounded-[1.8rem] border border-[var(--interlines-gold)]/14 bg-[linear-gradient(180deg,#fffdf8_0%,#ffffff_100%)] p-5 shadow-[0_16px_36px_rgba(26,61,68,0.06)] sm:p-6">
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--interlines-gold)]/14 pb-5">
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--interlines-azure)]">
                      Offer Schedule
                    </p>
                    <h2 className="mt-3 font-display text-[1.9rem] leading-[1.02] tracking-[-0.04em] text-[var(--interlines-slate)]">
                      Sailing options
                    </h2>
                  </div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--interlines-slate-soft)]">
                    {cruiseOffer.sailings.length > 0
                      ? `${cruiseOffer.sailings.length} sailing${cruiseOffer.sailings.length > 1 ? "s" : ""}`
                      : OFFER_DATA_PLACEHOLDER}
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {sailings.map((sailing) => {
                    const sailingDeparturePorts = splitPipeList(sailing.departurePorts);
                    const sailingPortCalls = splitPipeList(sailing.portsOfCall);

                    return (
                      <article
                        key={sailing.slug}
                        className="rounded-[1.5rem] border border-[var(--interlines-gold)]/12 bg-white p-5 shadow-[0_14px_28px_rgba(26,61,68,0.05)]"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--interlines-azure)]/76">
                              Sailing
                            </p>
                            <h3 className="mt-2 font-display text-[1.55rem] leading-[1.02] tracking-[-0.03em] text-[var(--interlines-slate)]">
                              {sailing.shipName ?? OFFER_DATA_PLACEHOLDER}
                            </h3>
                          </div>

                          <div className="rounded-full border border-[var(--interlines-gold)]/16 bg-[rgba(234,244,245,0.52)] px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--interlines-slate)]">
                            {sailing.nights != null
                              ? `${sailing.nights} Nights`
                              : OFFER_DATA_PLACEHOLDER}
                          </div>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-[1rem] border border-[var(--interlines-gold)]/10 bg-[rgba(248,251,252,0.92)] px-4 py-3">
                            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[var(--interlines-azure)]/72">
                              Sailing Date
                            </p>
                            <p className="mt-2 text-[14px] leading-6 text-[var(--interlines-slate)]">
                              {sailing.sailingDate ?? OFFER_DATA_PLACEHOLDER}
                            </p>
                          </div>

                          <div className="rounded-[1rem] border border-[var(--interlines-gold)]/10 bg-[rgba(248,251,252,0.92)] px-4 py-3">
                            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[var(--interlines-azure)]/72">
                              Booking Engine
                            </p>
                            {sailing.bookingEngineHref ? (
                              <Link
                                href={sailing.bookingEngineHref}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-2 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--interlines-azure)] transition-colors hover:text-[var(--interlines-azure-deep)]"
                              >
                                Open In Booking Engine
                                <ArrowUpRight className="h-4 w-4" />
                              </Link>
                            ) : (
                              <p className="mt-2 text-[14px] leading-6 text-[var(--interlines-slate)]">
                                {OFFER_DATA_PLACEHOLDER}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[var(--interlines-azure)]/72">
                            Departure Ports
                          </p>
                          {renderPipeList(sailingDeparturePorts)}
                        </div>

                        <div className="mt-4">
                          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[var(--interlines-azure)]/72">
                            Ports of Call
                          </p>
                          {renderPipeList(sailingPortCalls)}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            </div>

            <aside className="relative overflow-hidden bg-[linear-gradient(180deg,var(--interlines-azure)_0%,var(--interlines-azure-deep)_100%)] px-6 py-7 text-white sm:px-8 sm:py-8 lg:border-l lg:border-[var(--interlines-gold)]/14 lg:px-10">
              <div className="absolute top-0 right-0 h-36 w-36 translate-x-10 -translate-y-10 rounded-full bg-[var(--interlines-gold)]/16 blur-3xl" />
              <div className="absolute bottom-[-3rem] left-[-2rem] h-32 w-32 rounded-full bg-white/8 blur-3xl" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--interlines-gold-light)]/60 to-transparent" />

              <div className="relative z-10">
                <h2 className="font-display text-[1.9rem] leading-[1.02] tracking-[-0.04em] text-white">
                  Terms & Conditions
                </h2>

                <div className="mt-5 rounded-[1.45rem] border border-[var(--interlines-gold)]/18 bg-[linear-gradient(180deg,rgba(120,170,177,0.22)_0%,rgba(88,145,153,0.18)_100%)] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_14px_30px_rgba(14,33,37,0.12)] backdrop-blur-sm">
                  <p className="text-[14px] leading-7 text-white/92">
                    {termsNote}
                  </p>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </Container>
    </div>
  );
}
