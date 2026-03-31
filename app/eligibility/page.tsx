import type { Metadata } from "next";
import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { CheckList, Card, Pill } from "@/components/PremiumUI";
import {
  expandedEligibleProfessions,
  familyEligibility,
  formerEmployeeProofItems,
} from "@/lib/siteContent";

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
        <div className="space-y-6">
          <p>Find out if you are eligible for exclusive industry-only cruise rates.</p>
          <div>
            <Pill href="/request-access" variant="white">
              Register Now
            </Pill>
          </div>
        </div>
      </PageHeader>

      <Container className="px-5 pt-16 pb-24 sm:pt-20 sm:pb-32">
        <section className="mx-auto max-w-4xl rounded-[2.5rem] border border-[var(--interlines-azure)]/10 bg-white p-10 shadow-[0_15px_50px_rgba(48,117,128,0.06)] sm:p-14">
          <h2 className="font-display text-[2.25rem] leading-[1.08] tracking-[-0.03em] text-[var(--interlines-slate)] sm:text-[3rem]">
            Introduction
          </h2>
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-[var(--interlines-slate-soft)]">
            <p>If you work in travel or hospitality, you may already qualify.</p>
            <p>
              Interline Cruises Middle East is designed for professionals employed with Middle East-based organisations across aviation, tourism and hospitality. These exclusive cruise rates are reserved only for verified members of the travel industry.
            </p>
          </div>
        </section>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Card>
            <h2 className="font-display text-[2rem] leading-tight text-[var(--interlines-slate)]">
              Who Qualifies for Interline Cruise Discounts?
            </h2>
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
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

            <div className="mt-10 border-t border-[var(--interlines-azure)]/10 pt-8">
              <h3 className="font-display text-[1.6rem] leading-tight text-[var(--interlines-slate)]">
                Overview of Eligibility
              </h3>
              <p className="mt-6 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                You qualify if you are:
              </p>
              <div className="mt-5">
                <CheckList
                  items={[
                    "A current employee of a Middle East-based travel, aviation, tourism or hospitality organisation",
                    "A retired or former employee with proof of previous employment",
                  ]}
                />
              </div>
              <p className="mt-8 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                Eligible professions include:
              </p>
              <div className="mt-5">
                <CheckList items={expandedEligibleProfessions} />
              </div>
              <p className="mt-8 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                Eligible members can also extend benefits to their immediate family.
              </p>
            </div>
          </Card>

          <Card className="border-[var(--interlines-azure)]/10">
            <h2 className="font-display text-[2rem] leading-tight text-[var(--interlines-slate)]">
              Eligible Family Members
            </h2>
            <p className="mt-8 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
              Your interline benefits can be shared with your immediate family, including:
            </p>
            <div className="mt-6 rounded-2xl bg-[var(--interlines-azure)]/5 p-6">
              <CheckList items={familyEligibility} />
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
              Family members can travel with you or independently, as long as the booking is made through your verified account.
            </p>
          </Card>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <Card invert className="shadow-[0_30px_60px_rgba(48,117,128,0.15)]">
            <h2 className="font-display text-[2rem] leading-tight text-white">
              Retired and Former Employees
            </h2>
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-white/90">
              <p>If you have worked in the travel industry, you remain part of it.</p>
              <p>
                Former and retired professionals are welcome to apply by submitting proof of past employment, such as:
              </p>
            </div>
            <div className="mt-6">
              <CheckList invert items={formerEmployeeProofItems} />
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-white/90">
              Once verified, you will receive full access to the platform.
            </p>
          </Card>

          <div className="space-y-10">
            <Card className="bg-[var(--interlines-azure-light)]/30 border-none shadow-none">
              <h2 className="font-display text-[2rem] leading-tight text-[var(--interlines-slate)]">
                Geographic Eligibility
              </h2>
              <p className="mt-8 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                You qualify if you work for a travel or hospitality organisation based in the Middle East and work in the region.
              </p>
            </Card>

            <Card>
              <h2 className="font-display text-[2rem] leading-tight text-[var(--interlines-slate)]">
                Registration and Account Access
              </h2>
              <p className="mt-8 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                To protect the exclusivity of these offers, access is limited to verified members.
              </p>
              <div className="mt-8 space-y-8">
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
                <div className="border-t border-[var(--interlines-azure)]/10 pt-6">
                  <p className="text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                    Once approved, you will receive secure login access to:
                  </p>
                  <div className="mt-5">
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
        </div>

        <section className="mt-12 rounded-[2.5rem] border border-[var(--interlines-azure)]/10 bg-white p-10 text-center shadow-[0_15px_50px_rgba(48,117,128,0.06)] sm:p-14">
          <p className="mx-auto max-w-3xl text-[17px] leading-relaxed text-[var(--interlines-slate-soft)]">
            Check your eligibility and start exploring exclusive cruise offers designed for the travel industry.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Pill href="/eligibility" variant="glass">
              Check Your Eligibility
            </Pill>
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
