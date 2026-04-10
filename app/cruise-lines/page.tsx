import type { Metadata } from "next";
import CompactBreadcrumbs from "@/components/CompactBreadcrumbs";
import Container from "@/components/Container";
import CruiseLineLogoGrid from "@/components/CruiseLineLogoGrid";
import { PageHeader } from "@/components/PageHeader";
import StructuredDataScript from "@/components/StructuredDataScript";
import {
  buildBreadcrumbStructuredData,
  buildPageMetadata,
  buildWebPageStructuredData,
} from "@/lib/seo";
import { cruiseLines } from "@/lib/siteContent";

const CRUISE_LINES_TITLE = "Cruise Lines";
const CRUISE_LINES_DESCRIPTION = "Choosing your next cruise holiday starts here.";

export const metadata: Metadata = buildPageMetadata({
  title: CRUISE_LINES_TITLE,
  description: CRUISE_LINES_DESCRIPTION,
  path: "/cruise-lines",
  image: "/assets/images/cruise-lines/royal-caribbean-international-detail.jpg",
});

const introParagraphs = [
  "Choosing your next cruise holiday starts here. This is where you'll find all the exclusive interline offers available to you as a verified member of the Middle East travel community.",
  "Whether you're dreaming of island hopping, a week of pure relaxation, or a voyage that takes you across continents, you'll discover options from some of the world's most loved cruise lines.",
  "Each cruise line brings its own style, atmosphere and onboard experience and your industry access opens the door to all of them. Simply explore the cruise lines below to view cruise line specific offers, itineraries and seasonal promotions.",
  "All displayed fares already include your interline benefit. Additional promotions may apply where available. New sailings and special rates are added regularly, so there's always something new to inspire your next holiday at sea.",
] as const;

const cruiseLineLogoItems = [...cruiseLines]
  .sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
  )
  .map((line) => ({
    name: line.name,
    href: `/cruise-lines/${line.slug}`,
    logoSrc: line.logoSrc,
    logoAlt: line.logoAlt,
    logoClassName: line.logoClassName,
  }));

export default function CruiseLinesPage() {
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { label: "Cruise Lines" },
  ];
  const breadcrumbStructuredData = buildBreadcrumbStructuredData(
    [
      { name: "Home", path: "/" },
      { name: "Cruise Lines", path: "/cruise-lines/" },
    ],
    "/cruise-lines/",
  );

  return (
    <div className="min-h-screen bg-[var(--interlines-bg)] pb-24">
      <StructuredDataScript
        data={
          breadcrumbStructuredData
            ? [
                buildWebPageStructuredData({
                  name: CRUISE_LINES_TITLE,
                  description: CRUISE_LINES_DESCRIPTION,
                  path: "/cruise-lines/",
                  image:
                    "/assets/images/cruise-lines/royal-caribbean-international-detail.jpg",
                  type: "CollectionPage",
                }),
                breadcrumbStructuredData,
              ]
            : buildWebPageStructuredData({
                name: CRUISE_LINES_TITLE,
                description: CRUISE_LINES_DESCRIPTION,
                path: "/cruise-lines/",
                image:
                  "/assets/images/cruise-lines/royal-caribbean-international-detail.jpg",
                type: "CollectionPage",
              })
        }
      />

      <PageHeader
        title="Cruise Lines"
        backgroundImage="/assets/images/cruise-lines/royal-caribbean-international-detail.jpg"
        backgroundPosition="center 38%"
        showBreadcrumbs={false}
        className="min-h-[17rem] sm:min-h-[20.5rem] lg:min-h-[24rem]"
      />

      <Container className="max-w-6xl px-5 pt-10 sm:pt-12">
        <section className="overflow-hidden rounded-[2rem] border border-[var(--interlines-azure)]/10 bg-white p-6 shadow-[0_16px_40px_rgba(48,117,128,0.06)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:items-start lg:gap-12">
            <div className="min-w-0">
              <CompactBreadcrumbs items={breadcrumbItems} />
              <h1 className="sr-only">Cruise Lines</h1>
              <div className="mt-4 space-y-5 text-[15px] leading-8 text-[var(--interlines-slate-soft)] sm:text-[16px]">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="min-w-0 lg:pl-2">
              <div className="rounded-[1.6rem] border border-[var(--interlines-azure)]/10 bg-[linear-gradient(180deg,rgba(248,251,252,0.82)_0%,rgba(255,255,255,0.98)_100%)] p-5 shadow-[0_14px_34px_rgba(48,117,128,0.05)] sm:p-6">
                <CruiseLineLogoGrid
                  items={cruiseLineLogoItems}
                  wrapperClassName="mx-0 w-full max-w-none"
                  gridClassName="justify-items-center lg:justify-items-start"
                />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
