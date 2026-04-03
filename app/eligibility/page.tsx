import type { Metadata } from "next";
import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { CheckList, Card, Pill } from "@/components/PremiumUI";
import Image from "next/image";
import {
  expandedEligibleProfessions,
  familyEligibility,
  formerEmployeeProofItems,
} from "@/lib/siteContent";

const eligibilityImage = "/assets/images/intro.png";
const geographicEligibilityImage = "/assets/images/hero-bg.jpg";

export const metadata: Metadata = {
  title: "Eligibility - Interline Cruises Middle East",
  description: "Find out if you are eligible for exclusive industry-only cruise rates.",
};

export default function EligibilityPage() {
  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen">
      <PageHeader
        title="Who Qualifies for Interline Cruise Discounts"
      >
        <div className="space-y-4">
          <p>Find out if you are eligible for exclusive industry-only cruise rates.</p>
          <div>
            <Pill href="/request-access" variant="white">
              Register Now
            </Pill>
          </div>
        </div>
      </PageHeader>

      <Container className="px-5 pt-10 pb-20 sm:pt-12 sm:pb-28">
        <section className="mx-auto max-w-4xl rounded-[2.5rem] border border-[var(--interlines-azure)]/10 bg-white p-8 shadow-[0_15px_50px_rgba(48,117,128,0.06)] sm:p-10">
          <h2 className="font-display text-[2.25rem] leading-[1.08] tracking-[-0.03em] text-[var(--interlines-slate)] sm:text-[3rem]">
            Introduction
          </h2>
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-[var(--interlines-slate-soft)]">
            <p>If you work in travel or hospitality, you may already qualify.</p>
            <p>
              Interline Cruises Middle East is designed for professionals employed with Middle East-based organisations across aviation, tourism and hospitality. These exclusive cruise rates are reserved only for verified members of the travel industry.
            </p>
          </div>
        </section>

        <Card className="mt-10 overflow-hidden sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
            <div className="flex flex-col">
              <h2 className="font-display text-[2rem] leading-tight text-[var(--interlines-slate)]">
                Who Qualifies for Interline Cruise Discounts?
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                <p>
                  Access to interline cruise rates is limited to verified professionals working within the travel and hospitality sector.
                </p>
                <p>
                  This includes individuals employed by Middle East-based organisations across aviation, tourism and hospitality.
                </p>
                <p>
                  Because these offers are not available to the public, verification is required before access is granted.
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
                You qualify if you are:
              </p>
              <div className="mt-4">
                <CheckList
                  items={[
                    "A current employee of a Middle East-based travel, aviation, tourism or hospitality organisation",
                    "A retired or former employee with proof of previous employment",
                  ]}
                />
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                Eligible professions include:
              </p>
              <div className="mt-4">
                <CheckList items={expandedEligibleProfessions} />
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                Eligible members can also extend benefits to their immediate family.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <Card className="border-[var(--interlines-azure)]/10 sm:p-10">
            <h2 className="font-display text-[2rem] leading-tight text-[var(--interlines-slate)]">
              Eligible Family Members
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
              Your interline benefits can be shared with your immediate family, including:
            </p>
            <div className="mt-5 rounded-2xl bg-[var(--interlines-azure)]/5 p-5">
              <CheckList items={familyEligibility} />
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
              Family members can travel with you or independently, as long as the booking is made through your verified account.
            </p>
          </Card>

          <Card invert className="shadow-[0_30px_60px_rgba(48,117,128,0.15)] sm:p-10">
            <h2 className="font-display text-[2rem] leading-tight text-white">
              Retired and Former Employees
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/90">
              <p>If you have worked in the travel industry, you remain part of it.</p>
              <p>
                Former and retired professionals are welcome to apply by submitting proof of past employment, such as:
              </p>
            </div>
            <div className="mt-5">
              <CheckList invert items={formerEmployeeProofItems} />
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-white/90">
              Once verified, you will receive full access to the platform.
            </p>
          </Card>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <Card className="h-full overflow-hidden bg-[var(--interlines-azure-light)]/30 border-none shadow-none sm:p-8">
            <h2 className="font-display text-[2rem] leading-tight text-[var(--interlines-slate)]">
              Geographic Eligibility
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
              You qualify if you work for a travel or hospitality organisation based in the Middle East and work in the region.
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

          <Card className="h-full sm:p-10">
            <h2 className="font-display text-[2rem] leading-tight text-[var(--interlines-slate)]">
              Registration and Account Access
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
              To protect the exclusivity of these offers, access is limited to verified members.
            </p>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--interlines-azure)]">
                  Current Employees
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                  Register using your company email address linked to your employer.
                </p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--interlines-azure)]">
                  Former Employees
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                  Submit proof of previous employment during registration.
                </p>
              </div>
              <div className="border-t border-[var(--interlines-azure)]/10 pt-5">
                <p className="text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                  Once approved, you will receive secure login access to:
                </p>
                <div className="mt-4">
                  <CheckList
                    items={[
                      "Browse cruise offers",
                      "Explore destinations and cruise lines",
                      "Book directly with your interline discount applied",
                    ]}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <section className="mt-10 rounded-[2.5rem] border border-[var(--interlines-azure)]/10 bg-white p-8 text-center shadow-[0_15px_50px_rgba(48,117,128,0.06)] sm:p-10">
          <p className="mx-auto max-w-3xl text-[17px] leading-relaxed text-[var(--interlines-slate-soft)]">
            Check your eligibility and start exploring exclusive cruise offers designed for the travel industry.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Pill href="/request-access" variant="azure">
              Register Now
            </Pill>
            <Pill href="/offers" variant="glass">
              Explore Cruise Offers
            </Pill>
          </div>
        </section>
      </Container>
    </div>
  );
}
