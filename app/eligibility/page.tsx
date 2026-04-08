import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { CheckList, Card, Pill } from "@/components/PremiumUI";
import { expandedEligibleProfessions, familyEligibility } from "@/lib/siteContent";

const eligibilityImage = "/assets/images/intro.png";
const geographicEligibilityImage = "/assets/images/hero-bg.jpg";

export const metadata: Metadata = {
  title: "Eligibility - Interline Cruises Middle East",
  description: "Find out if you are eligible for exclusive industry only cruise rates.",
};

export default function EligibilityPage() {
  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen">
      <PageHeader
        title="Who Qualifies for Interline Cruise Discounts"
        backgroundImage="/assets/images/intro.png"
        backgroundPosition="center 42%"
      >
        <div className="space-y-4">
          <p>Find out if you are eligible for exclusive industry only cruise rates.</p>
          <div>
            <Pill href="/request-access" variant="white">
              Register Now
            </Pill>
          </div>
        </div>
      </PageHeader>

      <Container className="px-5 pt-10 pb-20 sm:pt-12 sm:pb-28">
        <section className="mx-auto max-w-4xl rounded-[2.5rem] border border-[var(--interlines-azure)]/10 bg-white p-8 shadow-[0_15px_50px_rgba(48,117,128,0.06)] sm:p-10">
          <div className="space-y-4 text-[17px] leading-relaxed text-[var(--interlines-slate-soft)]">
            <p>
              If you work in travel or hospitality, you may already qualify.
              Interline Cruises Middle East is designed for professionals
              employed with Middle East based organisations across aviation,
              tourism and hospitality. These exclusive cruise rates are
              reserved only for verified members of the travel community
              working within the region.
            </p>
          </div>
        </section>

        <Card className="mt-10 overflow-hidden sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
            <div className="flex flex-col">
              <h2 className="font-display text-[2rem] leading-tight text-[var(--interlines-slate)]">
                Who Qualifies for Interline Cruise Discounts
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                <p>
                  Interline cruise rates are available to current employees
                  working within the airline, travel, tourism or hospitality
                  sector in the Middle East. This includes individuals employed
                  by organisations across aviation, tourism, hospitality,
                  travel services and related sectors.
                </p>
                <p>
                  Because these offers are not available to the public,
                  verification is required before access is granted.
                </p>
              </div>

              <div className="relative mt-8 min-h-[220px] flex-1 overflow-hidden rounded-[2rem] border border-[var(--interlines-azure)]/10 bg-[var(--interlines-azure-light)]/25 shadow-[0_18px_45px_rgba(48,117,128,0.08)] lg:min-h-[280px]">
                <Image
                  src={eligibilityImage}
                  alt="Travel professionals eligible for exclusive cruise access"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--interlines-azure-deep)]/58 via-[var(--interlines-azure)]/12 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/14" />
              </div>
            </div>

            <div className="border-t border-[var(--interlines-azure)]/10 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <h3 className="font-display text-[1.6rem] leading-tight text-[var(--interlines-slate)]">
                Overview of Eligibility
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                You qualify if you are a current employee of a Middle East
                based organisation within the travel, aviation, tourism or
                hospitality ecosystem. This includes professionals working
                across:
              </p>
              <div className="mt-4">
                <CheckList items={expandedEligibleProfessions} />
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                Your eligibility allows you to access exclusive interline
                cruise fares and book directly through the platform.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <Card className="border-[var(--interlines-azure)]/10 sm:p-10">
            <h2 className="font-display text-[2rem] leading-tight text-[var(--interlines-slate)]">
              Eligible Family Members and Friends
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
              Your interline benefits extend beyond you. Your spouse,
              children, parents and friends can enjoy the same exclusive
              cruise rates. They can travel with you or independently, as long
              as the booking is made through your verified account.
            </p>
            <div className="mt-5 rounded-2xl bg-[var(--interlines-azure)]/5 p-5">
              <CheckList items={familyEligibility} />
            </div>
          </Card>

          <Card className="h-full overflow-hidden bg-[var(--interlines-azure-light)]/30 border-none shadow-none sm:p-8">
            <h2 className="font-display text-[2rem] leading-tight text-[var(--interlines-slate)]">
              Geographic Eligibility
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
              To qualify, you must be currently employed by a travel, tourism
              or hospitality organisation based in the Middle East and working
              within the region. These interline rates are specifically
              designed for professionals who are part of the Middle East travel
              community.
            </p>
            <div className="relative mt-6 min-h-[220px] flex-1 overflow-hidden rounded-[2rem] border border-[var(--interlines-azure)]/10 bg-white/55 shadow-[0_18px_45px_rgba(48,117,128,0.08)]">
              <Image
                src={geographicEligibilityImage}
                alt="Cruise access for Middle East-based travel professionals"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--interlines-azure-deep)]/62 via-[var(--interlines-azure)]/15 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/14" />
            </div>
          </Card>
        </div>

        <Card className="mt-8 sm:p-10">
          <h2 className="font-display text-[2rem] leading-tight text-[var(--interlines-slate)]">
            Registration and Account Access
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
            To protect the exclusivity of these offers, access is limited to
            verified members.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
            Register using your company email address linked to your employer.
            Once verified, you will receive secure login access to:
          </p>
          <div className="mt-5">
            <CheckList
              items={[
                "Browse cruise offers",
                "Explore destinations and cruise lines",
                "Book directly with your interline discount already applied",
              ]}
            />
          </div>
        </Card>

        <section className="mt-10 rounded-[2.5rem] border border-[var(--interlines-azure)]/10 bg-white p-8 text-center shadow-[0_15px_50px_rgba(48,117,128,0.06)] sm:p-10">
          <p className="mx-auto max-w-3xl text-[17px] leading-relaxed text-[var(--interlines-slate-soft)]">
            Check your eligibility and start exploring exclusive cruise offers
            designed for the travel industry.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Pill href="/request-access" variant="azure">
              Register Now
            </Pill>
          </div>
        </section>
      </Container>
    </div>
  );
}
