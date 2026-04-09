import type { Metadata } from "next";
import Container from "@/components/Container";
import CruiseLineOffersClient from "@/app/cruise-lines/[slug]/offers/CruiseLineOffersClient";
import { PageHeader } from "@/components/PageHeader";
import StructuredDataScript from "@/components/StructuredDataScript";
import {
  buildBreadcrumbStructuredData,
  buildNoIndexMetadata,
  buildPageMetadata,
  buildWebPageStructuredData,
} from "@/lib/seo";
import { getCruiseLineBySlug } from "@/lib/siteContent";

type CruiseLineOffersPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-static";

const CRUISE_LINE_OFFERS_DESCRIPTION =
  "All displayed fares already include your interline benefit. Additional promotions may apply where available. New sailings and special rates are added regularly, so there's always something new to inspire your next holiday at sea.";

export async function generateMetadata({
  params,
}: CruiseLineOffersPageProps): Promise<Metadata> {
  const { slug } = await params;
  const fallbackLine = getCruiseLineBySlug(slug);
  const cruiseLineName = fallbackLine?.name;
  // Uses the provided cruise line name plus the recurring "offers" wording from the supplied content.
  const title =
    cruiseLineName ? `${cruiseLineName} Offers` : "Cruise Offers";

  if (!cruiseLineName) {
    return buildNoIndexMetadata({
      title,
      description: CRUISE_LINE_OFFERS_DESCRIPTION,
    });
  }

  return buildPageMetadata({
    title,
    description: CRUISE_LINE_OFFERS_DESCRIPTION,
    path: `/cruise-lines/${slug}/offers`,
    image:
      fallbackLine?.detailImageSrc ||
      fallbackLine?.imageSrc ||
      "/assets/images/hero-bg.jpg",
  });
}

export default async function CruiseLineOffersPage({
  params,
}: CruiseLineOffersPageProps) {
  const { slug } = await params;
  const fallbackLine = getCruiseLineBySlug(slug);
  const cruiseLineName = fallbackLine?.name ?? "Cruise Line";
  // Uses the provided cruise line name plus the recurring "offers" wording from the supplied content.
  const title = `${cruiseLineName} Offers`;
  const headerImage =
    fallbackLine?.detailImageSrc ||
    fallbackLine?.imageSrc ||
    "/assets/images/hero-bg.jpg";
  const path = `/cruise-lines/${slug}/offers/`;
  const breadcrumbStructuredData = buildBreadcrumbStructuredData(
    [
      { name: "Home", path: "/" },
      { name: "Cruise Lines", path: "/cruise-lines/" },
      ...(fallbackLine
        ? [{ name: fallbackLine.name, path: `/cruise-lines/${fallbackLine.slug}/` }]
        : []),
      { name: title, path },
    ],
    path,
  );

  return (
    <div className="min-h-screen bg-[var(--interlines-bg)] pb-24">
      <StructuredDataScript
        data={
          breadcrumbStructuredData
            ? [
                buildWebPageStructuredData({
                  name: title,
                  description: CRUISE_LINE_OFFERS_DESCRIPTION,
                  path,
                  image: headerImage,
                  type: "CollectionPage",
                }),
                breadcrumbStructuredData,
              ]
            : buildWebPageStructuredData({
                name: title,
                description: CRUISE_LINE_OFFERS_DESCRIPTION,
                path,
                image: headerImage,
                type: "CollectionPage",
              })
        }
      />

      <PageHeader
        title={title}
        backgroundImage={headerImage}
        backgroundPosition="center 42%"
        showBreadcrumbs={false}
        className="min-h-[17rem] sm:min-h-[20.5rem] lg:min-h-[24rem]"
      />

      <Container className="max-w-6xl px-5 pt-10 sm:pt-12">
        <CruiseLineOffersClient
          slug={slug}
          fallbackLine={fallbackLine ?? null}
        />
      </Container>
    </div>
  );
}
