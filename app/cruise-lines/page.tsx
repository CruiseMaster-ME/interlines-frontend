/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { cruiseLines } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Cruise Lines & Partners - Interline Cruises Middle East",
  description: "Explore participating cruise lines available through Interline Cruises Middle East.",
};

export default function CruiseLinesPage() {
  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen pb-24">
      <PageHeader title="Cruise Lines" />

      <Container className="px-5 pt-16 sm:pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {cruiseLines.map((line) => (
            <article
              key={line.name}
              className="group overflow-hidden rounded-[2rem] bg-white border border-[var(--interlines-azure)]/10 shadow-[0_15px_40px_rgba(48,117,128,0.06)] hover:shadow-[0_25px_50px_rgba(48,117,128,0.12)] hover:-translate-y-2 transition-all duration-500 relative flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              
              <div className="shrink-0 overflow-hidden relative z-0">
                <img
                  src={line.image}
                  alt={line.name}
                  className="aspect-[1.3] w-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
              </div>
              
              <div className="p-8 sm:p-10 flex flex-col flex-1 relative z-20 bg-white">
                <h2 className="font-display text-[1.75rem] leading-tight tracking-[-0.02em] text-[var(--interlines-slate)]">
                  {line.name}
                </h2>
                
                <div className="mt-8 pt-6 border-t border-[var(--interlines-azure)]/10 mt-auto">
                  <a
                    href={line.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[14px] leading-relaxed text-[var(--interlines-azure)] break-all hover:underline"
                  >
                    {line.href}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
