import type { Metadata } from "next";

export const SITE_NAME = "Interline Cruises Middle East";
export const SITE_DESCRIPTION =
  "Exclusive discounted cruise fares for airline, travel, tourism and hospitality professionals across the Middle East.";
const DEFAULT_SITE_URL = "https://interlinecruises-me.com";

function resolveSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredUrl) {
    return DEFAULT_SITE_URL;
  }

  try {
    const url = new URL(configuredUrl);
    const hostname = url.hostname.toLowerCase();

    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname.endsWith(".local")
    ) {
      return DEFAULT_SITE_URL;
    }

    return url.toString().replace(/\/+$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl();
export const DEFAULT_OG_IMAGE = "/assets/images/hero-bg.jpg";
export const ORGANIZATION_LOGO_PATH =
  "/assets/logos/interline-cruises-middle-east.svg";

const DEFAULT_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const NOINDEX_ROBOTS = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  index?: boolean;
};

export type StructuredData = Record<string, unknown>;

export type BreadcrumbListItem = {
  name: string;
  path?: string;
  item?: string;
};

export type FAQStructuredDataItem = {
  question: string;
  paragraphs: readonly string[];
  listItems?: readonly string[];
  afterListParagraphs?: readonly string[];
};

function normalizeCanonicalPath(path = "/") {
  if (path === "/") {
    return path;
  }

  const [pathname, hash = ""] = path.split("#");
  const [cleanPathname, search = ""] = pathname.split("?");
  const looksLikeFilePath = /\.[a-z0-9]+$/i.test(cleanPathname);
  const canonicalPath = cleanPathname.endsWith("/")
    ? cleanPathname
    : looksLikeFilePath
    ? cleanPathname
    : `${cleanPathname}/`;

  if (search && hash) {
    return `${canonicalPath}?${search}#${hash}`;
  }

  if (search) {
    return `${canonicalPath}?${search}`;
  }

  if (hash) {
    return `${canonicalPath}#${hash}`;
  }

  return canonicalPath;
}

export function toAbsoluteUrl(path = "/") {
  return new URL(normalizeCanonicalPath(path), `${SITE_URL}/`).toString();
}

function resolveMetadataImage(image?: string) {
  return toAbsoluteUrl(image ?? DEFAULT_OG_IMAGE);
}

function withOptionalFields<T extends StructuredData>(input: T): T {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined),
  ) as T;
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image,
  index = true,
}: BuildPageMetadataInput): Metadata {
  const canonicalPath = normalizeCanonicalPath(path);
  const absoluteUrl = toAbsoluteUrl(canonicalPath);
  const metadataImage = resolveMetadataImage(image);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    robots: index ? DEFAULT_ROBOTS : NOINDEX_ROBOTS,
    openGraph: {
      type: "website",
      url: absoluteUrl,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_US",
      images: [
        {
          url: metadataImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [metadataImage],
    },
  };
}

export function buildNoIndexMetadata({
  title,
  description,
}: Omit<BuildPageMetadataInput, "index">): Metadata {
  return buildPageMetadata({
    title,
    description,
    index: false,
  });
}

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  areaServed: "Middle East",
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: toAbsoluteUrl(ORGANIZATION_LOGO_PATH),
  },
  image: toAbsoluteUrl(ORGANIZATION_LOGO_PATH),
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

export function buildBreadcrumbStructuredData(
  items: readonly BreadcrumbListItem[],
  path = "/",
): StructuredData | null {
  if (items.length < 2) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${toAbsoluteUrl(path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item ?? toAbsoluteUrl(item.path ?? "/"),
    })),
  };
}

export function buildFaqStructuredData(
  items: readonly FAQStructuredDataItem[],
  path = "/faq/",
): StructuredData | null {
  if (items.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${toAbsoluteUrl(path)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [
          ...item.paragraphs,
          ...(item.listItems?.map((listItem) => `- ${listItem}`) ?? []),
          ...(item.afterListParagraphs ?? []),
        ]
          .filter(Boolean)
          .join("\n\n"),
      },
    })),
  };
}

export function buildWebPageStructuredData({
  name,
  description,
  path = "/",
  type = "WebPage",
  image,
}: {
  name: string;
  description: string;
  path?: string;
  type?: string;
  image?: string;
}): StructuredData {
  const url = toAbsoluteUrl(path);

  return withOptionalFields({
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    primaryImageOfPage: image
      ? {
          "@type": "ImageObject",
          url: resolveMetadataImage(image),
        }
      : undefined,
  });
}
