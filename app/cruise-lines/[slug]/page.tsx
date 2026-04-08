import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import CruiseLineVisual from "@/components/CruiseLineVisual";
import { PageHeader } from "@/components/PageHeader";
import { Pill } from "@/components/PremiumUI";
import { getCruiseLineBySlug } from "@/lib/siteContent";

type CruiseLineDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: CruiseLineDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const line = getCruiseLineBySlug(slug);

  if (!line) {
    return {
      title: "Cruise Line - Interline Cruises Middle East",
    };
  }

  return {
    title: `${line.name} - Interline Cruises Middle East`,
    description: line.description,
  };
}

function PipeSeparatedDetailSection({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div className="h-full rounded-[1.6rem] border border-[var(--interlines-azure)]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,250,251,0.98)_100%)] p-5 sm:p-6">
      <h2 className="font-display text-[1.8rem] leading-[1.02] tracking-[-0.03em] text-[var(--interlines-slate)] sm:text-[2rem]">
        {title}
      </h2>

      {items.length > 0 ? (
        <div className="mt-5 flex flex-wrap items-center gap-y-2 text-[14px] leading-8 text-[var(--interlines-slate)] sm:text-[15px]">
          {items.map((item, index) => (
            <span key={item} className="inline-flex items-center whitespace-nowrap">
              <span className="font-medium">{item}</span>
              {index < items.length - 1 ? (
                <span className="px-2 text-[var(--interlines-azure)]/45">|</span>
              ) : null}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-[14px] leading-8 text-[var(--interlines-slate-soft)] sm:text-[15px]">
          Data not available.
        </p>
      )}
    </div>
  );
}

export default async function CruiseLineDetailPage({
  params,
}: CruiseLineDetailPageProps) {
  const { slug } = await params;
  const line = getCruiseLineBySlug(slug);

  if (!line) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--interlines-bg)] pb-24">
      <PageHeader
        title={line.name}
        backgroundImage={line.detailImageSrc || line.imageSrc || undefined}
        backgroundPosition="center 42%"
      />

      <Container className="max-w-6xl px-5 pt-10 sm:pt-12">
        <section className="overflow-hidden rounded-[2rem] border border-[var(--interlines-azure)]/10 bg-white p-6 shadow-[0_16px_40px_rgba(48,117,128,0.06)] sm:p-8">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] xl:items-start">
            <div className="flex flex-col xl:pr-8">
              <div>
                <h2 className="font-display text-[1.8rem] leading-[1.02] tracking-[-0.03em] text-[var(--interlines-slate)] sm:text-[2rem]">
                  Overview
                </h2>

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

            <div className="flex flex-col gap-6 xl:border-l xl:border-[var(--interlines-azure)]/10 xl:pl-8">
              <div className="flex items-start justify-start">
                <div className="w-full">
                  <CruiseLineVisual
                    line={line}
                    variant="detail"
                    className="h-[17rem] w-full !min-h-0 sm:h-[19rem] lg:h-[21rem]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 border-t border-[var(--interlines-azure)]/10 pt-8 lg:grid-cols-2">
            <PipeSeparatedDetailSection title="Ships" items={line.ships} />
            <PipeSeparatedDetailSection
              title="Destinations"
              items={line.destinations}
            />
          </div>

          <div className="mt-8 flex justify-start">
            <Pill
              href={`/cruise-lines/${line.slug}/offers`}
              variant="azure"
              className="w-full sm:w-auto"
            >
              View Offers
            </Pill>
          </div>
        </section>
      </Container>
    </div>
  );
}
