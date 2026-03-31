import type { Metadata } from "next";
import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { currentCruiseOffers } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Cruise Offers - Interline Cruises Middle East",
  description: "Browse the latest interline cruise offers available to verified members.",
};

export default function OffersPage() {
  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen pb-24">
      <PageHeader title="Current Cruise Offers" />

      <Container className="max-w-4xl px-5 pt-16 sm:pt-20">
        <section className="rounded-[2.5rem] border border-[var(--interlines-azure)]/10 bg-white p-8 shadow-[0_15px_50px_rgba(48,117,128,0.06)] sm:p-14">
          <p className="text-[17px] leading-relaxed text-[var(--interlines-slate-soft)]">
            New offers are added regularly across destinations and cruise lines.
          </p>
          <p className="mt-6 text-[17px] leading-relaxed text-[var(--interlines-slate-soft)]">
            You may find:
          </p>

          <div className="mt-8 border-y border-[var(--interlines-azure)]/10">
            {currentCruiseOffers.map((offer, index) => (
              <div
                key={offer}
                className={`flex items-start gap-5 py-5 ${
                  index !== 0 ? "border-t border-[var(--interlines-azure)]/10" : ""
                }`}
              >
                <span className="pt-0.5 text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[var(--interlines-azure)]/75 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                  {offer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
