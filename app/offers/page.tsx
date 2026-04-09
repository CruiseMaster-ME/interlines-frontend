import type { Metadata } from "next";
import Container from "@/components/Container";
import OffersClient from "@/app/offers/OffersClient";
import { PageHeader } from "@/components/PageHeader";
import StructuredDataScript from "@/components/StructuredDataScript";
import {
  buildBreadcrumbStructuredData,
  buildPageMetadata,
  buildWebPageStructuredData,
} from "@/lib/seo";

const OFFERS_TITLE = "Cruise Offers";
const OFFERS_DESCRIPTION =
  "All displayed fares already include your interline benefit. Additional promotions may apply where available. New offers are added regularly across destinations, seasons and cruise lines. Your next holiday might already be waiting.";

export const metadata: Metadata = buildPageMetadata({
  title: OFFERS_TITLE,
  description: OFFERS_DESCRIPTION,
  path: "/offers",
  image: "/assets/images/cruise-offers.jpg",
});

export default function OffersPage() {
  const breadcrumbStructuredData = buildBreadcrumbStructuredData(
    [
      { name: "Home", path: "/" },
      { name: "Cruise Offers", path: "/offers/" },
    ],
    "/offers/",
  );

  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen pb-24">
      <StructuredDataScript
        data={
          breadcrumbStructuredData
            ? [
                buildWebPageStructuredData({
                  name: OFFERS_TITLE,
                  description: OFFERS_DESCRIPTION,
                  path: "/offers/",
                  image: "/assets/images/cruise-offers.jpg",
                  type: "CollectionPage",
                }),
                breadcrumbStructuredData,
              ]
            : buildWebPageStructuredData({
                name: OFFERS_TITLE,
                description: OFFERS_DESCRIPTION,
                path: "/offers/",
                image: "/assets/images/cruise-offers.jpg",
                type: "CollectionPage",
              })
        }
      />

      <PageHeader
        title="Current Cruise Offers"
        backgroundImage="/assets/images/cruise-offers.jpg"
        backgroundPosition="center 56%"
        showBreadcrumbs={false}
        className="min-h-[17rem] sm:min-h-[20.5rem] lg:min-h-[24rem]"
      />

      <Container className="max-w-6xl px-5 pt-10 sm:pt-12">
        <OffersClient />
      </Container>
    </div>
  );
}
