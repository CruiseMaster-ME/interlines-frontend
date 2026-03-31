import type { Metadata } from "next";
import Container from "@/components/Container";
import { memberBenefits, whyChooseUs } from "@/lib/siteContent";
import { SectionTitle, CheckList, Card, Pill } from "@/components/PremiumUI";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "About - Interline Cruises Middle East",
  description: "Learn about Interline Cruises Middle East and our exclusive access for travel professionals.",
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen">
      <PageHeader
        title={
          <span>
            Built for the <br />
            <span className="italic text-[var(--interlines-gold)]">Travel Industry</span>
          </span>
        }
        subtitle="About Us"
      >
        Interline Cruises Middle East is the region&apos;s first dedicated platform connecting travel and hospitality professionals with exclusive cruise offers from leading global cruise lines.
      </PageHeader>

      <Container className="grid gap-12 px-5 pt-16 pb-24 sm:pt-20 sm:pb-32 lg:grid-cols-2 lg:gap-8">
        <Card className="flex flex-col border-[var(--interlines-azure)]/10">
          <SectionTitle highlight="Why Choose Us">The Advantage</SectionTitle>
          <div className="mt-8 flex-1">
            <CheckList items={whyChooseUs} />
          </div>
        </Card>

        <Card invert className="flex flex-col shadow-[0_30px_60px_rgba(48,117,128,0.15)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <SectionTitle invert highlight="Member Privileges">The Perks</SectionTitle>
          <div className="mt-8 flex-1 relative z-10">
            <CheckList invert items={memberBenefits} />
          </div>
        </Card>
      </Container>

      <section className="relative py-24 sm:py-32 border-t border-[var(--interlines-azure)]/10 text-center">
        <Container className="max-w-4xl px-5 text-center flex flex-col items-center">
          <h2 className="font-display text-[2.5rem] leading-[1.05] tracking-[-0.03em] text-[var(--interlines-slate)] sm:text-[3.5rem] mb-10">
            What you can do as a <br/>
            <span className="italic text-[var(--interlines-azure)] mt-2 block">Registered Member</span>
          </h2>
          <div className="flex flex-col items-center space-y-4 text-lg text-[var(--interlines-slate-soft)] mb-12">
            <p className="bg-[var(--interlines-azure)]/5 px-6 py-2 rounded-full border border-[var(--interlines-azure)]/10 shadow-sm">
              Browse current interline cruise offers.
            </p>
            <p className="bg-[var(--interlines-azure)]/5 px-6 py-2 rounded-full border border-[var(--interlines-azure)]/10 shadow-sm">
              Explore ships, itineraries and destinations.
            </p>
            <p className="bg-[var(--interlines-azure)]/5 px-6 py-2 rounded-full border border-[var(--interlines-azure)]/10 shadow-sm">
              Book directly through an encrypted, secure platform.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Pill href="/request-access" variant="azure">
              Request Access
            </Pill>
            <Pill href="/faq" variant="glass">
              View FAQ
            </Pill>
          </div>
        </Container>
      </section>
    </div>
  );
}
