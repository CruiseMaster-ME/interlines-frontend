import type { Metadata } from "next";
import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { currentCruiseOffers } from "@/lib/siteContent";
import { Card, Pill } from "@/components/PremiumUI";

export const metadata: Metadata = {
  title: "Cruise Offers - Interline Cruises Middle East",
  description: "Browse the latest interline cruise offers available to verified members.",
};

export default function OffersPage() {
  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen pb-24">
      <PageHeader
        title={
          <span>
            Current <br />
            <span className="italic text-[var(--interlines-gold)]">Cruise Offers</span>
          </span>
        }
        subtitle="Exclusive Rates"
      >
        New interline promotions are added regularly across global destinations and premium cruise lines. Log in to view specific departures.
      </PageHeader>

      <Container className="px-5 pt-16 sm:pt-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {currentCruiseOffers.map((offer, index) => (
            <Card
              key={offer}
              className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(48,117,128,0.12)] border-[var(--interlines-azure)]/10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--interlines-azure)]/5 group-hover:bg-[var(--interlines-azure)]/15 rounded-full blur-3xl -mr-16 -mt-16 transition-colors duration-500 pointer-events-none" />
              
              <div className="mb-6 h-12 w-12 rounded-full bg-[var(--interlines-azure)]/10 flex items-center justify-center text-[var(--interlines-azure)] group-hover:bg-[var(--interlines-azure)] group-hover:text-white transition-colors duration-300">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12l5.25 5 2.625-3M8.25 12l5.25 5 8.5-9" />
                </svg>
              </div>

              <p className="font-display text-[1.5rem] leading-tight text-[var(--interlines-slate)] group-hover:text-[var(--interlines-azure-deep)] transition-colors duration-300 relative z-10">
                {offer}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] relative z-10">
                Available to verified members with interline pricing already unlocked at checkout.
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-24 max-w-3xl mx-auto rounded-[2.5rem] bg-[var(--interlines-azure)] p-10 sm:p-14 text-center text-white relative overflow-hidden shadow-[0_20px_60px_rgba(48,117,128,0.2)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <h2 className="font-display text-[2.5rem] leading-tight mb-6">
            Ready to <span className="italic text-[var(--interlines-gold)]">Book?</span>
          </h2>
          <p className="text-lg text-white/90 mb-10 mx-auto max-w-xl">
            Register to explore exact dates, compare itineraries side-by-side, and lock in your interline rate directly through the portal.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Pill href="/request-access" variant="white">
              Register Now
            </Pill>
            <Pill href="/login" variant="glass" className="!border-white/20 !text-white hover:!bg-white/10 hover:!border-white/40">
              Member Log In
            </Pill>
          </div>
        </div>
      </Container>
    </div>
  );
}
