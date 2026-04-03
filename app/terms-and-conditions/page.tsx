import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { CheckList, Card, Pill } from "@/components/PremiumUI";

export const metadata: Metadata = {
  title: "Terms & Conditions - Interline Cruises Middle East",
  description: "Terms of Use and Booking Conditions for Interline Cruises Middle East.",
};

function NumberList({ items }: { items: readonly string[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, index) => (
        <li key={item} className="flex items-start gap-4 text-[15px] leading-[1.75] group">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--interlines-azure)]/10 text-[xs] font-bold tabular-nums text-[var(--interlines-azure)]">
            {index + 1}
          </div>
          <span className="text-[var(--interlines-slate-soft)]">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

function TermsSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-12 border-b border-[var(--interlines-azure)]/10 pb-12 last:border-0 last:pb-0">
      <h2 className="font-display text-2xl leading-tight tracking-[-0.02em] text-[var(--interlines-slate)] mb-6">
        {title}
      </h2>
      <div className="space-y-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
        {children}
      </div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen pb-24">
      <PageHeader
        title="Terms of Use & Booking Conditions"
      >
        <div className="space-y-5">
          <p>Effective from April 2026</p>
          <p>
            Welcome to Interline Cruises Middle East (&quot;ICME,&quot; &quot;we,&quot; &quot;our,&quot; &quot;us&quot;). By accessing or using this website and its services, you agree to comply with these Terms of Use and Booking Conditions. Please read them carefully before registering or making a booking.
          </p>
          <p>If you do not agree with any part of these terms, you must not use this website.</p>
        </div>
      </PageHeader>

      <Container className="max-w-4xl px-5 pt-16 sm:pt-20">
        <Card className="p-8 sm:p-14 border border-[var(--interlines-azure)]/5 shadow-[0_20px_60px_rgba(48,117,128,0.06)] bg-white/70 backdrop-blur-md">
          <TermsSection title="1. Purpose of the Platform">
            <p>
              Interline Cruises Middle East is an online portal exclusively for verified travel and hospitality industry professionals in the Middle East.
            </p>
            <p>
              Through partnerships with participating cruise lines, ICME provides access to interline (industry-exclusive) cruise fares, promotions, and booking services.
            </p>
            <p>
              Bookings and payments made through this platform are processed directly with, or on behalf of, the participating cruise line partners.
            </p>
          </TermsSection>

          <TermsSection title="2. Eligibility & Verification">
            <p>
              Use of the portal is restricted to qualifying individuals and their eligible family members as defined under our{" "}
              <Link href="/eligibility" className="font-medium text-[var(--interlines-azure)] hover:underline">
                Eligibility Policy
              </Link>.
            </p>
            <div className="py-2">
              <CheckList
                items={[
                  "Users must complete the registration process and provide valid verification (work email or former ID) before accessing interline rates.",
                  "Any misuse of login credentials, including sharing access with nonqualified individuals, will result in account suspension or cancellation of bookings.",
                  "ICME reserves the right to reverify accounts at any time.",
                ]}
              />
            </div>
          </TermsSection>

          <TermsSection title="3. Interline Rate Conditions">
            <div className="py-2">
              <CheckList
                items={[
                  "Interline discounts are exclusive and nontransferable.",
                  "Fares shown through the portal are subject to change without prior notice depending on cruise line inventory and seasonal availability.",
                  "Interline fares may have restrictions such as limited cabin categories, blackout periods, or advance-purchase requirements.",
                ]}
              />
            </div>
            <p>
              All bookings are subject to the participating cruise line&apos;s own fare rules and contract of carriage.
            </p>
          </TermsSection>

          <TermsSection title="4. Booking Process">
            <div className="py-2 bg-white/50 rounded-2xl p-6 border border-zinc-100">
              <NumberList
                items={[
                  "Register and verify eligibility.",
                  "Log in to browse available cruises and offers.",
                  "Select your preferred sailing and proceed to booking.",
                  "Review fare details and cancellation policies before confirming.",
                  "Make payment using approved secure channels.",
                ]}
              />
            </div>
            <p className="mt-4">
              You will receive a booking confirmation email once your reservation is accepted by the cruise line.
            </p>
          </TermsSection>

          <TermsSection title="5. Payments & Currency">
            <p>
              All pricing is displayed in AED (United Arab Emirates Dirham)
              unless otherwise stated.
            </p>
            <div className="py-2">
              <CheckList
                items={[
                  "Payments are processed securely via authorised payment gateways.",
                  "ICME does not store your card details.",
                  "Price differences due to currency fluctuations or cruise line updates are beyond our control.",
                ]}
              />
            </div>
          </TermsSection>

          <TermsSection title="6. Cancellations, Changes, and Refunds">
            <p>
              All cancellations, name changes, or refunds are governed by the
              specific policy of the cruise line you book with.
            </p>
            <div className="py-2">
              <CheckList
                items={[
                  "ICME acts solely as the facilitator; cancellation requests must be made in writing.",
                  "Administrative fees may apply according to the cruise line's conditions.",
                  "Refunds (if approved) are paid in the same method as the original payment.",
                ]}
              />
            </div>
            <p>
              We recommend reviewing cancellation terms carefully before confirming any booking.
            </p>
          </TermsSection>

          <TermsSection title="7. Responsibility & Liability">
            <p>
              While ICME strives to ensure accurate information, we act as an intermediary between users and participating cruise lines.
            </p>
            <div className="py-2">
              <CheckList
                items={[
                  "Cruise itineraries, schedules, and onboard services are under the sole control of the cruise line.",
                  "ICME cannot be held liable for itinerary changes, cancellations, weather disruptions, or actions beyond our control.",
                  "Our total liability shall not exceed the service fee paid to ICME for the specific booking in question.",
                ]}
              />
            </div>
            <p>
              We do not accept responsibility for loss, damage, or injury arising from any third-party error or force majeure event.
            </p>
          </TermsSection>

          <TermsSection title="8. User Responsibilities">
            <p>By using this site, you agree to:</p>
            <div className="py-2">
              <CheckList
                items={[
                  "Provide accurate registration and booking information.",
                  "Maintain the confidentiality of your login credentials.",
                  "Use the site only for personal, noncommercial purposes.",
                  "Comply with all applicable laws and regulations.",
                ]}
              />
            </div>
            <p>
              Any abuse, data scraping, or unauthorised marketing use of the portal will result in immediate termination and possible legal action.
            </p>
          </TermsSection>

          <TermsSection title="9. Intellectual Property">
            <p>
              All website content, text, design, logos, and images are the property of Interline Cruises Middle East or used under license.
            </p>
            <p>
              They may not be copied, redistributed, or reused without written permission.
            </p>
          </TermsSection>

          <TermsSection title="10. Privacy & Data Use">
            <p>
              Your personal data is handled according to our{" "}
              <Link href="/privacy-policy" className="font-medium text-[var(--interlines-azure)] hover:underline">
                Privacy Policy
              </Link>.
            </p>
            <p>
              By using this site, you consent to the collection and use of data solely for verification, booking, and communication regarding your membership and offers.
            </p>
          </TermsSection>

          <TermsSection title="11. Links to Third-Party Sites">
            <p>
              Our website may include links to cruise line or travel partners&apos; websites. These are provided for reference only.
            </p>
            <p>
              ICME is not responsible for the accuracy, content, or privacy policies of external sites.
            </p>
          </TermsSection>

          <TermsSection title="12. Amendments to Terms">
            <p>
              ICME reserves the right to update these Terms of Use and Booking Conditions at any time.
            </p>
            <p>
              Updated versions will be posted online with an effective date. Continued use constitutes acceptance of any changes.
            </p>
          </TermsSection>

          <TermsSection title="13. Governing Law & Jurisdiction">
            <p>These Terms are governed by the laws of the United Arab Emirates.</p>
            <p>Disputes shall fall under the exclusive jurisdiction of the courts of Dubai, UAE.</p>
          </TermsSection>

          <TermsSection title="14. Contact Information">
            <p>
              For any questions or concerns about these terms or your booking, please contact:
            </p>
            <p className="font-medium text-[var(--interlines-azure)] text-lg my-4">
              Customer Support - Interline Cruises Middle East
            </p>
            <div className="py-2">
              <CheckList
                items={[
                  "Email:",
                  "Telephone:",
                ]}
              />
            </div>
          </TermsSection>
        </Card>

        <div className="mt-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Pill href="/" variant="glass">
              Back to Homepage
            </Pill>
            <Pill href="/privacy-policy" variant="glass">
              View Privacy Policy
            </Pill>
            <Pill href="/request-access" variant="azure">
              Register for Access
            </Pill>
          </div>
        </div>
      </Container>
    </div>
  );
}
