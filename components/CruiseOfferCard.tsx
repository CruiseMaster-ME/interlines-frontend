import Image from "next/image";
import Link from "next/link";
import {
  OFFER_DATA_PLACEHOLDER,
  type CruiseOffer,
  getCruiseOfferHref,
} from "@/lib/offers";
import { cn } from "@/lib/ui";

type CruiseOfferCardProps = {
  offer: CruiseOffer;
  className?: string;
  showCruiseLineBranding?: boolean;
};

export default function CruiseOfferCard({
  offer,
  className,
  showCruiseLineBranding = true,
}: CruiseOfferCardProps) {
  const leadSailing = offer.sailings?.[0];
  const validityValue = offer.validFrom && offer.validUntil
    ? `${offer.validFrom} - ${offer.validUntil}`
    : offer.validUntil
      ? `Valid until ${offer.validUntil}`
      : offer.validFrom
        ? `Valid from ${offer.validFrom}`
        : null;
  const departurePortsValue = offer.departurePorts ?? leadSailing?.departurePorts;
  const sailingDateValue = leadSailing?.sailingDate ?? null;
  const nightsValue =
    leadSailing?.nights != null
      ? `${leadSailing.nights} nights`
      : null;
  const summaryValue =
    offer.summary !== OFFER_DATA_PLACEHOLDER ? offer.summary : null;

  const primaryFacts = [
    {
      label: "Validity",
      value: validityValue,
    },
    {
      label: "Sailing Date",
      value: sailingDateValue,
    },
    {
      label: "Duration",
      value: nightsValue,
    },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  const secondaryFacts = [
    {
      label: "Ship",
      value: offer.ship,
    },
    {
      label: "Ports of Call",
      value: leadSailing?.portsOfCall ?? offer.destination,
    },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  const hasCardDetails =
    primaryFacts.length > 0 ||
    Boolean(departurePortsValue) ||
    Boolean(summaryValue) ||
    secondaryFacts.length > 0;

  return (
    <Link
      href={getCruiseOfferHref(offer)}
      className={cn(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--interlines-gold)]/24 bg-[linear-gradient(180deg,#fffdf8_0%,#ffffff_100%)] text-[var(--interlines-slate)] shadow-[0_18px_48px_rgba(26,61,68,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--interlines-gold)]/40 hover:shadow-[0_26px_64px_rgba(26,61,68,0.14)]",
        className,
      )}
      aria-label={`Open ${offer.title} for ${offer.cruiseLineName}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--interlines-gold-light)]/90 to-transparent" />
        <div className="absolute top-[-3.5rem] right-[-2rem] h-32 w-32 rounded-full bg-[var(--interlines-gold)]/12 blur-3xl transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute bottom-[-4rem] left-[-3rem] h-40 w-40 rounded-full bg-[var(--interlines-azure)]/7 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(223,200,157,0.10),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.36),transparent_32%)]" />
      </div>

      {showCruiseLineBranding ? (
        <div className="relative z-10 border-b border-[var(--interlines-gold)]/14 bg-[linear-gradient(135deg,var(--interlines-azure-deep)_0%,var(--interlines-azure)_100%)] px-5 py-4 text-white sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-32 shrink-0 items-center justify-center rounded-[1rem] border border-[var(--interlines-gold)]/20 bg-white/8 px-4 py-2 backdrop-blur-sm">
              {offer.cruiseLineLogoSrc ? (
                <div className="relative h-8 w-full">
                  <Image
                    src={offer.cruiseLineLogoSrc}
                    alt={offer.cruiseLineLogoAlt}
                    fill
                    sizes="8rem"
                    className="object-contain brightness-0 invert"
                  />
                </div>
              ) : (
                <span className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white/92">
                  {offer.cruiseLineName}
                </span>
              )}
            </div>

            <p className="min-w-0 truncate text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--interlines-gold-light)]/92">
              {offer.cruiseLineName}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative z-10 h-2 bg-[linear-gradient(90deg,var(--interlines-azure-deep)_0%,var(--interlines-azure)_100%)]" />
      )}

      <div className="relative z-10 flex h-full flex-col px-5 py-5 sm:px-6 sm:py-6">
        <div className="border-b border-[var(--interlines-gold)]/14 pb-4">
          <h3 className="font-display text-[1.45rem] leading-[1.02] tracking-[-0.03em] text-[var(--interlines-slate)] sm:text-[1.65rem]">
            {offer.title}
          </h3>
        </div>

        {primaryFacts.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2.5">
            {primaryFacts.map((item) => (
              <div
                key={item.label}
                className="rounded-full border border-[var(--interlines-gold)]/16 bg-[rgba(234,244,245,0.55)] px-3 py-2 text-[13px] leading-none text-[var(--interlines-slate)]"
              >
                <span className="font-semibold text-[var(--interlines-azure)]">
                  {item.label}:
                </span>{" "}
                {item.value}
              </div>
            ))}
          </div>
        ) : null}

        {departurePortsValue ? (
          <div className="mt-4 rounded-[1.1rem] border border-[var(--interlines-gold)]/16 bg-[linear-gradient(180deg,rgba(234,244,245,0.68)_0%,rgba(255,255,255,0.96)_100%)] px-4 py-3">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[var(--interlines-azure)]/74">
              Departure Ports
            </p>
            <p className="mt-2 text-[14px] leading-6 text-[var(--interlines-slate)]">
              {departurePortsValue}
            </p>
          </div>
        ) : null}

        {summaryValue ? (
          <p className="mt-4 text-[15px] leading-7 text-[var(--interlines-slate-soft)]">
            {summaryValue}
          </p>
        ) : null}

        {secondaryFacts.length > 0 ? (
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {secondaryFacts.map((item) => (
              <div
                key={item.label}
                className="rounded-[1rem] border border-[var(--interlines-gold)]/12 bg-white px-4 py-3 shadow-[0_10px_20px_rgba(26,61,68,0.04)]"
              >
                <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[var(--interlines-azure)]/72">
                  {item.label}
                </dt>
                <dd className="mt-2 text-[14px] leading-6 text-[var(--interlines-slate)]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {!hasCardDetails ? (
          <p className="mt-4 text-[14px] leading-7 text-[var(--interlines-slate-soft)]">
            {OFFER_DATA_PLACEHOLDER}
          </p>
        ) : null}

        <div className="mt-6 border-t border-[var(--interlines-gold)]/14 pt-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--interlines-azure)] transition-colors duration-200 group-hover:text-[var(--interlines-azure-deep)]">
          View Offer
        </div>
      </div>
    </Link>
  );
}
