import type { Metadata } from "next";
import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Card, Pill, SectionTitle } from "@/components/PremiumUI";

export const metadata: Metadata = {
  title: "About Us - Interline Cruises Middle East",
  description:
    "Your gateway to exclusive interline cruise holidays across leading global cruise lines.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--interlines-bg)] pb-24">
      <PageHeader
        title="Created for the Travel Professionals Who Bring Journeys to Life"
        backgroundImage="/assets/images/how.png"
        backgroundPosition="center 28%"
      >
        <div className="space-y-4">
          <p>
            Your gateway to exclusive interline cruise holidays across leading
            global cruise lines.
          </p>
          <div>
            <Pill href="/request-access" variant="white">
              Start Your Access
            </Pill>
          </div>
        </div>
      </PageHeader>

      <Container className="px-5 pt-10 sm:pt-12">
        <section className="mx-auto max-w-5xl rounded-[2.5rem] border border-[var(--interlines-azure)]/10 bg-white p-8 shadow-[0_15px_50px_rgba(48,117,128,0.06)] sm:p-12">
          <div className="space-y-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[17px]">
            <p>
              Interline Cruises Middle East was built for the travel community,
              offering you the chance to enjoy the world from the comfort of a
              cruise holiday.
            </p>
            <p>
              If you work in the world of travel, you spend your days helping
              others explore the world. This platform gives you the chance to
              enjoy that same sense of discovery through exclusive interline
              rates on cruise holidays.
            </p>
            <p>
              We are the region&apos;s first dedicated hub for industry only cruise
              discounts, giving verified travel and hospitality professionals
              access to genuine interline fares across leading global cruise
              lines. Once verified, you can explore ships, itineraries and
              destinations and book your cruise directly with your exclusive
              industry discount already applied.
            </p>
            <p>
              This is not a general travel site. It is a platform created
              specifically for the travel community, offering a secure,
              seamless and trusted way to enjoy cruise holidays that combine
              relaxation, entertainment and effortless exploration.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <Card className="sm:p-10">
            <SectionTitle>Powered by Cruise Master Middle East</SectionTitle>
            <div className="space-y-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
              <p>
                Interline Cruises Middle East is powered by Cruise Master
                Middle East, one of the region&apos;s leading cruise distribution
                specialists. With deep industry relationships and long standing
                partnerships with global cruise brands, Cruise Master Middle
                East ensures that every offer on this platform is authentic, up
                to date and sourced directly from the cruise lines.
              </p>
              <p>
                Their expertise in cruise operations, product knowledge and
                regional market needs allows us to deliver a reliable, industry
                compliant interline programme tailored to travel professionals
                across the Middle East.
              </p>
            </div>
          </Card>

          <Card invert className="shadow-[0_30px_60px_rgba(48,117,128,0.15)] sm:p-10">
            <SectionTitle invert>Our Purpose</SectionTitle>
            <div className="space-y-5 text-[15px] leading-relaxed text-white/90">
              <p>
                Our purpose is simple: to give the people who make travel
                possible the chance to enjoy it themselves. To offer access to
                cruise holidays that feel effortless from the moment you book.
                And to ensure your industry status unlocks real value on the
                kind of holidays that let you truly switch off.
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <Card className="sm:p-10">
            <SectionTitle>What We Offer</SectionTitle>
            <div className="space-y-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
              <p>
                Interline Cruises Middle East brings together exclusive
                interline cruise fares, secure verification, direct booking and
                a curated selection of cruise lines and itineraries. Your
                access extends to your family and friends, making it easier
                than ever to share the experience of a rewarding holiday at
                sea.
              </p>
            </div>
          </Card>

          <Card className="sm:p-10">
            <SectionTitle>Why We Exist</SectionTitle>
            <div className="space-y-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
              <p>Because you spend your time helping others create memories.</p>
              <p>Because you deserve the chance to create your own.</p>
              <p>
                And because a cruise holiday is one of the most effortless,
                enjoyable ways to do it.
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
