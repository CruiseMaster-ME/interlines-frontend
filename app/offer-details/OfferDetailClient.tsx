"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  usePathname,
  useSearchParams,
  type ReadonlyURLSearchParams,
} from "next/navigation";
import {
  ArrowUpRight,
  CalendarDays,
  MapPinned,
  type LucideIcon,
} from "lucide-react";
import CompactBreadcrumbs from "@/components/CompactBreadcrumbs";
import Container from "@/components/Container";
import CruiseLineBrandCard from "@/components/CruiseLineBrandCard";
import { PageHeader } from "@/components/PageHeader";
import {
  OFFER_DATA_PLACEHOLDER,
  type CruiseOffer,
  type CruiseOfferCruiseLine,
  type CruiseOfferSailing,
  getCruiseOfferBySlugsLive,
} from "@/lib/offers";
import { getCruiseLineBySlug } from "@/lib/siteContent";

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

function getOfferParams(
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
): { lineSlug: string | null; offerSlug: string | null } {
  const lineFromQuery = searchParams.get("line");
  const offerFromQuery = searchParams.get("offer");

  if (lineFromQuery && offerFromQuery) {
    return {
      lineSlug: lineFromQuery,
      offerSlug: offerFromQuery,
    };
  }

  const match = pathname.match(/^\/cruise-lines\/([^/]+)\/offers\/([^/]+)\/?$/i);

  return {
    lineSlug: match?.[1] ?? null,
    offerSlug: match?.[2] ?? null,
  };
}

export default function OfferDetailClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [{ cruiseLine, offer }, setState] = useState<{
    cruiseLine: CruiseOfferCruiseLine | null;
    offer: CruiseOffer | null;
  }>({
    cruiseLine: null,
    offer: null,
  });
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  const { lineSlug, offerSlug } = useMemo(
    () => getOfferParams(pathname, searchParams),
    [pathname, searchParams],
  );
  const currentKey =
    lineSlug && offerSlug ? `${lineSlug}::${offerSlug}` : null;
  const isLoading = Boolean(currentKey) && loadedKey !== currentKey;

  useEffect(() => {
    if (!currentKey || !lineSlug || !offerSlug) {
      return;
    }

    const resolvedLineSlug = lineSlug;
    const resolvedOfferSlug = offerSlug;
    let ignore = false;

    async function loadOffer() {
      try {
        const result = await getCruiseOfferBySlugsLive(
          resolvedLineSlug,
          resolvedOfferSlug,
        );

        if (!ignore) {
          setState({
            cruiseLine: result.cruiseLine,
            offer: result.offer,
          });
          setLoadedKey(currentKey);
        }
      } catch {
        if (!ignore) {
          setState({
            cruiseLine: null,
            offer: null,
          });
          setLoadedKey(currentKey);
        }
      }
    }

    void loadOffer();

    return () => {
      ignore = true;
    };
  }, [currentKey, lineSlug, offerSlug]);

  if (!lineSlug || !offerSlug) {
    return (
      <div className="min-h-screen bg-[var(--interlines-bg)] pb-24">
        <PageHeader
          title="Offer Details"
          backgroundImage="/assets/images/hero-bg.jpg"
          backgroundPosition="center 42%"
          showBreadcrumbs={false}
        >
          Select an offer from the listings to view its full details.
        </PageHeader>

        <Container className="max-w-5xl px-5 pt-10 sm:pt-12">
          <div className="rounded-[2rem] border border-dashed border-[var(--interlines-gold)]/30 bg-white px-6 py-12 text-center text-[15px] leading-7 text-[var(--interlines-slate-soft)] shadow-[0_16px_40px_rgba(48,117,128,0.06)]">
            Offer parameters are missing.
          </div>
        </Container>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--interlines-bg)] pb-24">
        <PageHeader
          title="Loading Offer"
          backgroundImage="/assets/images/hero-bg.jpg"
          backgroundPosition="center 42%"
          showBreadcrumbs={false}
        >
          Loading the latest offer information.
        </PageHeader>

        <Container className="max-w-7xl px-5 pt-10 sm:pt-12">
          <div className="h-[34rem] animate-pulse rounded-[2.25rem] border border-[var(--interlines-gold)]/16 bg-white shadow-[0_30px_80px_rgba(26,61,68,0.12)]" />
        </Container>
      </div>
    );
  }

  const resolvedCruiseLine = cruiseLine ?? createPlaceholderCruiseLine(lineSlug);
  const resolvedOffer =
    offer ?? createPlaceholderOffer(resolvedCruiseLine, offerSlug);
  const leadSailing = resolvedOffer.sailings[0] ?? null;
  const fallbackBrandLine = getCruiseLineBySlug(resolvedCruiseLine.slug) ?? null;
  const sailings =
    resolvedOffer.sailings.length > 0
      ? resolvedOffer.sailings
      : [createPlaceholderSailing(resolvedOffer.slug)];
  const termsNote = resolvedOffer.termsNote ?? OFFER_DATA_PLACEHOLDER;

  const offerInformation = [
    {
      label: "Offer Validity",
      value: formatValidity(resolvedOffer),
      icon: CalendarDays,
    },
    {
      label: "Departure Ports",
      value:
        resolvedOffer.departurePorts ??
        leadSailing?.departurePorts ??
        OFFER_DATA_PLACEHOLDER,
      icon: MapPinned,
    },
    {
      label: "Ports of Call",
      value:
        leadSailing?.portsOfCall ??
        resolvedOffer.destination ??
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
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/cruise-lines", label: "Cruise Lines" },
    ...(fallbackBrandLine
      ? [{ href: `/cruise-lines/${fallbackBrandLine.slug}`, label: fallbackBrandLine.name }]
      : []),
    ...(fallbackBrandLine
      ? [{ href: `/cruise-lines/${fallbackBrandLine.slug}/offers`, label: "Offers" }]
      : []),
    { label: resolvedOffer.title },
  ];

  return (
    <div className="min-h-screen bg-[var(--interlines-bg)] pb-24">
      <PageHeader
        title={null}
        backgroundImage={
          resolvedCruiseLine.heroImageSrc || "/assets/images/hero-bg.jpg"
        }
        backgroundPosition="center 42%"
        showBreadcrumbs={false}
        imageTreatment="clear"
        className="min-h-[18rem] sm:min-h-[22rem] lg:min-h-[26rem]"
      />

      <Container className="max-w-7xl px-5 pt-10 sm:pt-12">
        <div className="rounded-[2.25rem] border border-[var(--interlines-gold)]/16 bg-white shadow-[0_30px_80px_rgba(26,61,68,0.12)]">
          <section className="grid overflow-hidden border-b border-[var(--interlines-gold)]/14 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)]">
            <div className="bg-white px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <CompactBreadcrumbs items={breadcrumbItems} />
              <Link
                href={`/cruise-lines/${resolvedCruiseLine.slug}/offers`}
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--interlines-azure)]/12 bg-[rgba(234,244,245,0.55)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--interlines-azure)] transition-colors hover:border-[var(--interlines-azure)]/24 hover:bg-[rgba(234,244,245,0.82)]"
              >
                {resolvedCruiseLine.name === OFFER_DATA_PLACEHOLDER
                  ? "Cruise Offers"
                  : `${resolvedCruiseLine.name} Offers`}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>

              <CruiseLineBrandCard
                line={fallbackBrandLine}
                fallbackLabel={
                  resolvedCruiseLine.name === OFFER_DATA_PLACEHOLDER
                    ? OFFER_DATA_PLACEHOLDER
                    : resolvedCruiseLine.name
                }
                className="mt-6"
              />

              <div className="mt-8 max-w-3xl">
                <h1 className="font-display text-[2.6rem] leading-[0.96] tracking-[-0.05em] text-[var(--interlines-slate)] sm:text-[3.35rem] lg:text-[4.15rem]">
                  {resolvedOffer.title}
                </h1>
                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[var(--interlines-slate-soft)] sm:text-[17px] sm:leading-8">
                  {resolvedOffer.summary}
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
                    {resolvedOffer.sailings.length > 0
                      ? `${resolvedOffer.sailings.length} sailing${resolvedOffer.sailings.length > 1 ? "s" : ""}`
                      : OFFER_DATA_PLACEHOLDER}
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {sailings.map((sailing) => {
                    const sailingDeparturePorts = splitPipeList(
                      sailing.departurePorts,
                    );
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
