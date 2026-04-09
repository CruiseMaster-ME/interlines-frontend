import { cache } from "react";
import { apiUrl, getApiBaseUrl } from "@/lib/config";

export const OFFER_DATA_PLACEHOLDER = "Data not available.";
export const NO_ACTIVE_OFFERS_MESSAGE = "No active offers right now.";

type RawCruiseLine = {
  id: number;
  slug: string;
  name: string | null;
  logo_path: string | null;
  hero_image_path: string | null;
  is_active: boolean;
  sort_order: number;
};

type RawOfferSailing = {
  id: number;
  slug: string;
  ship_name: string | null;
  sailing_date: string | null;
  departure_ports: string | null;
  nights: number | null;
  ports_of_call: string | null;
  sailing_period: string | null;
  availability_label: string | null;
  booking_engine_url: string | null;
  booking_url: string | null;
  is_active: boolean;
  sort_order: number;
};

type RawOfferGalleryImage = {
  id: number;
  image_path: string | null;
  image_alt: string | null;
  caption: string | null;
  sort_order: number;
};

type RawOffer = {
  id: number;
  cruise_line_id: number;
  slug: string;
  title: string | null;
  summary: string | null;
  departure_ports: string | null;
  travel_window: string | null;
  valid_from: string | null;
  valid_until: string | null;
  hero_tagline: string | null;
  hero_image_path: string | null;
  hero_image_alt: string | null;
  theme_primary_color: string | null;
  theme_accent_color: string | null;
  theme_text_color: string | null;
  terms_note: string | null;
  booking_label: string | null;
  booking_url: string | null;
  starts_on: string | null;
  ends_on: string | null;
  is_published: boolean;
  published_at: string | null;
  sort_order: number;
  cruise_line?: RawCruiseLine | null;
  sailings?: RawOfferSailing[] | null;
  gallery_images?: RawOfferGalleryImage[] | null;
};

type RawOffersResponse = {
  offers?: RawOffer[] | null;
};

type RawCruiseLineOffersResponse = {
  cruise_line?: RawCruiseLine | null;
  offers?: RawOffer[] | null;
};

type RawOfferDetailResponse = {
  cruise_line?: RawCruiseLine | null;
  offer?: RawOffer | null;
};

export type CruiseOfferTheme = {
  primaryColor?: string | null;
  accentColor?: string | null;
  textColor?: string | null;
};

export type CruiseOfferSailing = {
  slug: string;
  shipName: string | null;
  sailingDate?: string | null;
  departurePorts?: string | null;
  nights?: number | null;
  portsOfCall?: string | null;
  sailingPeriod?: string | null;
  availabilityLabel?: string | null;
  bookingEngineHref?: string | null;
  bookingHref?: string | null;
};

export type CruiseOfferGalleryImage = {
  src: string;
  alt: string;
  caption?: string | null;
};

export type CruiseOfferCruiseLine = {
  slug: string;
  name: string;
  logoSrc?: string | null;
  logoAlt: string;
  heroImageSrc?: string | null;
};

export type CruiseOffer = {
  slug: string;
  cruiseLineSlug: string;
  cruiseLineName: string;
  cruiseLineLogoSrc?: string | null;
  cruiseLineLogoAlt: string;
  cruiseLineHeroImageSrc?: string | null;
  title: string;
  summary: string;
  validFrom?: string | null;
  validUntil?: string | null;
  departurePorts?: string | null;
  travelWindow?: string | null;
  heroTagline?: string | null;
  heroImageSrc?: string | null;
  heroImageAlt?: string | null;
  termsNote?: string | null;
  bookingLabel?: string | null;
  bookingHref?: string | null;
  ship?: string | null;
  destination?: string | null;
  theme?: CruiseOfferTheme;
  sailings: CruiseOfferSailing[];
  gallery: CruiseOfferGalleryImage[];
};

export type CruiseLineOffersResult = {
  cruiseLine: CruiseOfferCruiseLine | null;
  offers: CruiseOffer[];
};

export type CruiseOfferDetailResult = {
  cruiseLine: CruiseOfferCruiseLine | null;
  offer: CruiseOffer | null;
};

const displayDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function normalizeText(value?: string | null) {
  const text = value?.trim();
  return text ? text : null;
}

function currentDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isDateOutsideValidityWindow(
  value: string | null | undefined,
  comparison: "<" | ">",
  today = currentDateKey(),
) {
  if (!value) {
    return false;
  }

  return comparison === "<" ? value < today : value > today;
}

function isRawOfferCurrentlyValid(raw: RawOffer) {
  const today = currentDateKey();

  if (isDateOutsideValidityWindow(raw.valid_until, "<", today)) {
    return false;
  }

  if (isDateOutsideValidityWindow(raw.valid_from, ">", today)) {
    return false;
  }

  return true;
}

function formatDisplayDate(value?: string | null) {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);
  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(day)
  ) {
    return value;
  }

  return displayDateFormatter.format(new Date(Date.UTC(year, month - 1, day)));
}

function resolveMediaUrl(path?: string | null) {
  const normalized = normalizeText(path);
  if (!normalized) return null;

  if (/^https?:\/\//i.test(normalized)) return normalized;
  if (normalized.startsWith("/assets/")) return normalized;

  const base = getApiBaseUrl();
  if (!base) {
    return normalized.startsWith("/") ? normalized : `/${normalized}`;
  }

  return normalized.startsWith("/") ? `${base}${normalized}` : `${base}/${normalized}`;
}

async function fetchPublicJson<T>(path: string, fallback: T): Promise<T> {
  const base = getApiBaseUrl();
  if (!base) return fallback;

  try {
    const response = await fetch(apiUrl(path), {
      headers: {
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return fallback;
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

function mapCruiseLine(
  line?: RawCruiseLine | null,
  fallbackSlug?: string,
): CruiseOfferCruiseLine | null {
  const slug = normalizeText(line?.slug) ?? normalizeText(fallbackSlug);
  if (!slug) return null;

  const name = normalizeText(line?.name) ?? OFFER_DATA_PLACEHOLDER;

  return {
    slug,
    name,
    logoSrc: resolveMediaUrl(line?.logo_path),
    logoAlt: `${name} logo`,
    heroImageSrc: resolveMediaUrl(line?.hero_image_path),
  };
}

function mapOfferSailing(raw: RawOfferSailing): CruiseOfferSailing {
  return {
    slug: normalizeText(raw.slug) ?? `sailing-${raw.id}`,
    shipName: normalizeText(raw.ship_name),
    sailingDate: formatDisplayDate(raw.sailing_date),
    departurePorts: normalizeText(raw.departure_ports),
    nights: raw.nights ?? null,
    portsOfCall: normalizeText(raw.ports_of_call),
    sailingPeriod: normalizeText(raw.sailing_period),
    availabilityLabel: normalizeText(raw.availability_label),
    bookingEngineHref: normalizeText(raw.booking_engine_url),
    bookingHref: normalizeText(raw.booking_url),
  };
}

function mapOfferGalleryImage(raw: RawOfferGalleryImage): CruiseOfferGalleryImage | null {
  const src = resolveMediaUrl(raw.image_path);
  if (!src) return null;

  return {
    src,
    alt: normalizeText(raw.image_alt) ?? OFFER_DATA_PLACEHOLDER,
    caption: normalizeText(raw.caption),
  };
}

function mapOffer(raw: RawOffer): CruiseOffer {
  const cruiseLine = mapCruiseLine(raw.cruise_line, raw.cruise_line?.slug ?? undefined);
  const sailings = (raw.sailings ?? []).map(mapOfferSailing);
  const leadSailing = sailings[0];
  const gallery = (raw.gallery_images ?? [])
    .map(mapOfferGalleryImage)
    .filter((item): item is CruiseOfferGalleryImage => Boolean(item));

  return {
    slug: normalizeText(raw.slug) ?? `offer-${raw.id}`,
    cruiseLineSlug: cruiseLine?.slug ?? "",
    cruiseLineName: cruiseLine?.name ?? OFFER_DATA_PLACEHOLDER,
    cruiseLineLogoSrc: cruiseLine?.logoSrc ?? null,
    cruiseLineLogoAlt: cruiseLine?.logoAlt ?? "Cruise line logo",
    cruiseLineHeroImageSrc: cruiseLine?.heroImageSrc ?? null,
    title: normalizeText(raw.title) ?? OFFER_DATA_PLACEHOLDER,
    summary: normalizeText(raw.summary) ?? OFFER_DATA_PLACEHOLDER,
    validFrom: formatDisplayDate(raw.valid_from),
    validUntil: formatDisplayDate(raw.valid_until),
    departurePorts: normalizeText(raw.departure_ports),
    travelWindow: normalizeText(raw.travel_window),
    heroTagline: normalizeText(raw.hero_tagline),
    heroImageSrc: resolveMediaUrl(raw.hero_image_path),
    heroImageAlt: normalizeText(raw.hero_image_alt),
    termsNote: normalizeText(raw.terms_note),
    bookingLabel: normalizeText(raw.booking_label),
    bookingHref: normalizeText(raw.booking_url),
    ship: leadSailing?.shipName ?? null,
    destination: leadSailing?.portsOfCall ?? null,
    theme: {
      primaryColor: normalizeText(raw.theme_primary_color),
      accentColor: normalizeText(raw.theme_accent_color),
      textColor: normalizeText(raw.theme_text_color),
    },
    sailings,
    gallery,
  };
}

function hasDisplayableListingData(offer: CruiseOffer) {
  if (!offer.slug || !offer.cruiseLineSlug) {
    return false;
  }

  if (offer.title !== OFFER_DATA_PLACEHOLDER) {
    return true;
  }

  return Boolean(
    offer.summary !== OFFER_DATA_PLACEHOLDER ||
      offer.validFrom ||
      offer.validUntil ||
      offer.departurePorts ||
      offer.travelWindow ||
      offer.ship ||
      offer.destination ||
      offer.sailings.some(
        (sailing) =>
          Boolean(
            sailing.shipName ||
              sailing.sailingDate ||
              sailing.departurePorts ||
              sailing.portsOfCall ||
              sailing.nights != null,
          ),
      ),
  );
}

const fetchAllOffersResponse = cache(async () =>
  fetchPublicJson<RawOffersResponse>("/api/offers", { offers: [] }),
);

const fetchCruiseLineOffersResponse = cache(async (slug: string) =>
  fetchPublicJson<RawCruiseLineOffersResponse>(`/api/cruise-lines/${slug}/offers`, {
    cruise_line: null,
    offers: [],
  }),
);

const fetchOfferDetailResponse = cache(async (slug: string, offerSlug: string) =>
  fetchPublicJson<RawOfferDetailResponse>(
    `/api/cruise-lines/${slug}/offers/${offerSlug}`,
    {
      cruise_line: null,
      offer: null,
    },
  ),
);

export async function getCruiseOffers() {
  const response = await fetchAllOffersResponse();

  return (response.offers ?? [])
    .filter(isRawOfferCurrentlyValid)
    .map(mapOffer)
    .filter(hasDisplayableListingData);
}

export async function getCruiseOffersLive() {
  const response = await fetchPublicJson<RawOffersResponse>("/api/offers", {
    offers: [],
  });

  return (response.offers ?? [])
    .filter(isRawOfferCurrentlyValid)
    .map(mapOffer)
    .filter(hasDisplayableListingData);
}

export async function getCruiseOfferPageSlugs(fallbackSlugs: string[] = []) {
  const offers = await getCruiseOffers();
  const slugs = new Set(
    [...fallbackSlugs, ...offers.map((offer) => offer.cruiseLineSlug)].filter(
      Boolean,
    ),
  );

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function getCruiseOfferStaticParams() {
  const offers = await getCruiseOffers();

  return offers
    .filter((offer) => offer.cruiseLineSlug && offer.slug)
    .map((offer) => ({
      slug: offer.cruiseLineSlug,
      offerSlug: offer.slug,
    }));
}

export async function getCruiseOffersByLineSlug(
  slug: string,
): Promise<CruiseLineOffersResult> {
  const response = await fetchCruiseLineOffersResponse(slug);

  return {
    cruiseLine: mapCruiseLine(response.cruise_line, slug),
    offers: (response.offers ?? [])
      .filter(isRawOfferCurrentlyValid)
      .map(mapOffer)
      .filter(hasDisplayableListingData),
  };
}

export async function getCruiseOffersByLineSlugLive(
  slug: string,
): Promise<CruiseLineOffersResult> {
  const response = await fetchPublicJson<RawCruiseLineOffersResponse>(
    `/api/cruise-lines/${slug}/offers`,
    {
      cruise_line: null,
      offers: [],
    },
  );

  return {
    cruiseLine: mapCruiseLine(response.cruise_line, slug),
    offers: (response.offers ?? [])
      .filter(isRawOfferCurrentlyValid)
      .map(mapOffer)
      .filter(hasDisplayableListingData),
  };
}

export async function getCruiseOfferBySlugs(
  lineSlug: string,
  offerSlug: string,
): Promise<CruiseOfferDetailResult> {
  const response = await fetchOfferDetailResponse(lineSlug, offerSlug);

  return {
    cruiseLine: mapCruiseLine(response.cruise_line, lineSlug),
    offer:
      response.offer && isRawOfferCurrentlyValid(response.offer)
        ? mapOffer(response.offer)
        : null,
  };
}

export async function getCruiseOfferBySlugsLive(
  lineSlug: string,
  offerSlug: string,
): Promise<CruiseOfferDetailResult> {
  const response = await fetchPublicJson<RawOfferDetailResponse>(
    `/api/cruise-lines/${lineSlug}/offers/${offerSlug}`,
    {
      cruise_line: null,
      offer: null,
    },
  );

  return {
    cruiseLine: mapCruiseLine(response.cruise_line, lineSlug),
    offer:
      response.offer && isRawOfferCurrentlyValid(response.offer)
        ? mapOffer(response.offer)
        : null,
  };
}

export function getCruiseOfferHref(
  offer: Pick<CruiseOffer, "cruiseLineSlug" | "slug">,
) {
  const searchParams = new URLSearchParams({
    line: offer.cruiseLineSlug,
    offer: offer.slug,
  });

  return `/offer-details/?${searchParams.toString()}`;
}
