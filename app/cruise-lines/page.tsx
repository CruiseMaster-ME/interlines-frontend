import { ArrowRight, ImageIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { cruiseLines } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Cruise Lines & Partners - Interline Cruises Middle East",
  description: "Explore participating cruise lines available through Interline Cruises Middle East.",
};

export default function CruiseLinesPage() {
  return (
    <div className="min-h-screen bg-[var(--interlines-bg)] pb-24">
      <PageHeader title="Cruise Lines" />

      <Container className="max-w-5xl px-5 pt-16 sm:pt-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cruiseLines.map((line) => {
            return (
              <Link key={line.slug} href={`/cruise-lines/${line.slug}`} className="group block">
                <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-[var(--interlines-azure)]/10 bg-white shadow-[0_16px_40px_rgba(48,117,128,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(48,117,128,0.1)]">
                  <div className="border-b border-[var(--interlines-azure)]/10 bg-[var(--interlines-azure-light)]/40 p-5">
                    <div className="flex min-h-[12.5rem] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[var(--interlines-azure)]/16 bg-white/75 p-6 text-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--interlines-azure)]/8 text-[var(--interlines-azure)]">
                        <ImageIcon className="h-6 w-6" />
                      </span>
                      <p className="mt-4 font-display text-[1.35rem] leading-tight tracking-[-0.02em] text-[var(--interlines-slate)]">
                        Image Coming Soon
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-display text-[1.8rem] leading-[1.05] tracking-[-0.03em] text-[var(--interlines-slate)]">
                      {line.name}
                    </h2>

                    <div className="mt-6 flex items-center justify-between border-t border-[var(--interlines-azure)]/10 pt-4">
                      <span className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[var(--interlines-azure)]">
                        View Details
                      </span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--interlines-azure)]/12 text-[var(--interlines-azure)] transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
