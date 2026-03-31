import { ChevronLeft, ImageIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Pill } from "@/components/PremiumUI";
import { cruiseLines, getCruiseLineBySlug } from "@/lib/siteContent";

type CruiseLineDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return cruiseLines.map((line) => ({
    slug: line.slug,
  }));
}

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
    description: `Dedicated details screen for ${line.name}.`,
  };
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
      <PageHeader title={line.name} />

      <Container className="max-w-5xl px-5 pt-16 sm:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2.5rem] border border-[var(--interlines-azure)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(48,117,128,0.06)] sm:p-8">
            <div className="rounded-[2rem] border border-dashed border-[var(--interlines-azure)]/16 bg-[var(--interlines-azure-light)]/35 p-6 sm:p-8">
              <div className="flex min-h-[24rem] flex-col items-center justify-center rounded-[1.5rem] bg-white/80 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--interlines-azure)]/8 text-[var(--interlines-azure)]">
                  <ImageIcon className="h-9 w-9" />
                </span>
                <p className="mt-6 font-display text-[1.75rem] leading-tight tracking-[-0.03em] text-[var(--interlines-slate)] sm:text-[2rem]">
                  Image Coming Soon
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-[var(--interlines-azure)]/10 bg-white p-8 shadow-[0_18px_50px_rgba(48,117,128,0.06)] sm:p-10">
            <Link
              href="/cruise-lines"
              className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[var(--interlines-azure)] transition-colors hover:text-[var(--interlines-azure-deep)]"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Cruise Lines
            </Link>

            <div className="mt-10 border-t border-[var(--interlines-azure)]/10 pt-8">
              <h2 className="mt-5 font-display text-[2.3rem] leading-[1.02] tracking-[-0.03em] text-[var(--interlines-slate)]">
                {line.name}
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-[var(--interlines-slate-soft)]">
                Details screen coming soon.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Pill href="/cruise-lines" variant="glass">
                Back to Cruise Lines
              </Pill>
              <Pill href="/offers" variant="azure">
                Special Offers
              </Pill>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
