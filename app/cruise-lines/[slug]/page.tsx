import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CompactBreadcrumbs from "@/components/CompactBreadcrumbs";
import Container from "@/components/Container";
import CruiseLineBrandCard from "@/components/CruiseLineBrandCard";
import CruiseLineDestinationsSection from "@/components/CruiseLineDestinationsSection";
import CruiseLineShipsSection from "@/components/CruiseLineShipsSection";
import CruiseLineStickyCta from "@/components/CruiseLineStickyCta";
import { PageHeader } from "@/components/PageHeader";
import StructuredDataScript from "@/components/StructuredDataScript";
import { buildOdysseusCruiseLineUrl } from "@/lib/odysseus";
import {
  buildBreadcrumbStructuredData,
  buildNoIndexMetadata,
  buildPageMetadata,
  buildWebPageStructuredData,
} from "@/lib/seo";
import { getCruiseLineBySlug } from "@/lib/siteContent";

type CruiseLineDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const CRUISE_LINE_DESCRIPTION =
  "Each cruise line brings its own style, atmosphere and onboard experience and your industry access opens the door to all of them. Simply explore the cruise lines below to view cruise line specific offers, itineraries and seasonal promotions.";

export async function generateMetadata({
  params,
}: CruiseLineDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const line = getCruiseLineBySlug(slug);

  if (!line) {
    return buildNoIndexMetadata({
      title: "Cruise Lines",
      description: "Choosing your next cruise holiday starts here.",
    });
  }

  return buildPageMetadata({
    title: line.name,
    description: CRUISE_LINE_DESCRIPTION,
    path: `/cruise-lines/${line.slug}`,
    image: line.detailImageSrc || line.imageSrc || "/assets/images/hero-bg.jpg",
  });
}

export default async function CruiseLineDetailPage({
  params,
}: CruiseLineDetailPageProps) {
  const { slug } = await params;
  const line = getCruiseLineBySlug(slug);

  if (!line) {
    notFound();
  }

  const path = `/cruise-lines/${line.slug}/`;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/cruise-lines", label: "Cruise Lines" },
    { label: line.name },
  ];
  const breadcrumbStructuredData = buildBreadcrumbStructuredData(
    [
      { name: "Home", path: "/" },
      { name: "Cruise Lines", path: "/cruise-lines/" },
      { name: line.name, path },
    ],
    path,
  );
  const offersPageHref = `/cruise-lines/${line.slug}/offers`;
  const bookingHref = line.bookingHref ?? buildOdysseusCruiseLineUrl(line.slug);

  return (
    <div className="min-h-screen bg-[var(--interlines-bg)]">
      <StructuredDataScript
        data={
          breadcrumbStructuredData
            ? [
                buildWebPageStructuredData({
                  name: line.name,
                  description: CRUISE_LINE_DESCRIPTION,
                  path,
                  image:
                    line.detailImageSrc ||
                    line.imageSrc ||
                    "/assets/images/hero-bg.jpg",
                }),
                breadcrumbStructuredData,
              ]
            : buildWebPageStructuredData({
                name: line.name,
                description: CRUISE_LINE_DESCRIPTION,
                path,
                image:
                  line.detailImageSrc ||
                  line.imageSrc ||
                  "/assets/images/hero-bg.jpg",
              })
        }
      />

      <PageHeader
        title={null}
        backgroundImage={line.detailImageSrc || line.imageSrc || undefined}
        backgroundPosition="center 42%"
        imageTreatment="clear"
        showBreadcrumbs={false}
        className="min-h-[18rem] sm:min-h-[22rem] lg:min-h-[26rem]"
      />

      <Container className="max-w-6xl px-5 pt-10 sm:pt-12">
        <section className="overflow-hidden rounded-[2rem] border border-[var(--interlines-azure)]/10 bg-white p-6 shadow-[0_16px_40px_rgba(48,117,128,0.06)] sm:p-8">
          <div className="grid gap-8">
            <div className="min-w-0">
              <h1 className="sr-only">{line.name}</h1>
              <CompactBreadcrumbs items={breadcrumbItems} />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CruiseLineBrandCard line={line} className="mt-4" />

                <Link
                  href={offersPageHref}
                  className="mt-4 inline-flex items-center gap-2 self-start text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--interlines-azure)] transition-colors duration-200 hover:text-[var(--interlines-azure-deep)] hover:underline hover:underline-offset-4 sm:text-xs sm:tracking-[0.2em]"
                >
                  View Offers
                  <span aria-hidden="true" className="text-sm leading-none">
                    →
                  </span>
                </Link>
              </div>

              <div className="mt-5 space-y-5 text-[15px] leading-8 text-[var(--interlines-slate-soft)] sm:text-[16px]">
                {line.descriptionParagraphs.length > 0 ? (
                  line.descriptionParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))
                ) : (
                  <p>Data not available.</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 border-t border-[var(--interlines-azure)]/10 pt-8 lg:grid-cols-2">
            <CruiseLineShipsSection
              cruiseLineSlug={line.slug}
              items={line.ships}
            />
            <CruiseLineDestinationsSection items={line.destinations} />
          </div>
        </section>
      </Container>
      <CruiseLineStickyCta
        bookingHref={bookingHref}
        offersHref={offersPageHref}
      />
    </div>
  );
}
