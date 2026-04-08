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
          <span className="text-[var(--interlines-slate-soft)]">{item}</span>
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
      <h2 className="mb-6 font-display text-2xl leading-tight tracking-[-0.02em] text-[var(--interlines-slate)]">
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
        backgroundImage="/assets/images/cruise-offers.jpg"
        backgroundPosition="center 46%"
      >
        <div className="space-y-5">
          <p>Effective from April 2026</p>
          <p>
            Welcome to Interline Cruises Middle East (&quot;ICME,&quot;
            &quot;we,&quot; &quot;our,&quot; &quot;us&quot;). By accessing or
            using this website and its services, you agree to comply with these
            Terms of Use and Booking Conditions. Please read them carefully
            before registering or making a booking.
          </p>
          <p>
            If you do not agree with any part of these terms, you must not use
            this website.
          </p>
        </div>
      </PageHeader>

      <Container className="max-w-4xl px-5 pt-16 sm:pt-20">
        <Card className="border border-[var(--interlines-azure)]/5 bg-white/70 p-8 shadow-[0_20px_60px_rgba(48,117,128,0.06)] backdrop-blur-md sm:p-14">
          <TermsSection title="1. Purpose of the Platform">
            <p>
              Interline Cruises Middle East is an online portal created
              exclusively for verified travel, tourism and hospitality
              professionals currently employed in the Middle East.
            </p>
            <p>
              Through partnerships with participating cruise lines, ICME
              provides access to interline (industry exclusive) cruise fares,
              promotions and booking services.
            </p>
            <p>
              All bookings and payments made through this platform are
              processed directly with, or on behalf of, participating cruise
              line partners.
            </p>
          </TermsSection>

          <TermsSection title="2. Eligibility & Verification">
            <p>
              Use of the portal is restricted to qualifying individuals and
              their eligible family members and friends, as defined in our{" "}
              <Link
                href="/eligibility"
                className="font-medium text-[var(--interlines-azure)] hover:underline"
              >
                Eligibility Policy
              </Link>
              .
            </p>
            <div className="py-2">
              <CheckList
                items={[
                  "Users must complete registration and verify their employment using a current company email address.",
                  "Any misuse of login credentials, including sharing access with individuals who do not qualify, may result in account suspension or cancellation of bookings.",
                  "ICME reserves the right to re verify accounts at any time to ensure compliance with cruise line requirements.",
                  "Former or retired employees are not eligible for access.",
                ]}
              />
            </div>
          </TermsSection>

          <TermsSection title="3. Interline Rate Conditions">
            <div className="py-2">
              <CheckList
                items={[
                  "Interline cruise fares are exclusive, non transferable and available only to verified users.",
                  "Fares displayed on the portal are subject to change without prior notice based on cruise line inventory, seasonal availability and promotional updates.",
                  "Interline fares may include restrictions such as limited cabin categories, blackout dates or advance purchase requirements.",
                ]}
              />
            </div>
            <p>
              All bookings are subject to the participating cruise line&apos;s
              own fare rules, terms and conditions and contract of carriage.
            </p>
          </TermsSection>

          <TermsSection title="4. Booking Process">
            <div className="rounded-2xl border border-zinc-100 bg-white/50 p-6 py-2">
              <NumberList
                items={[
                  "Register and verify your eligibility.",
                  "Log in to browse available cruises and offers.",
                  "Select your preferred sailing and proceed to book.",
                  "Review fare details, inclusions and cancellation policies before confirming.",
                  "Make payment using approved secure channels.",
                ]}
              />
            </div>
            <p className="mt-4">
              A booking confirmation email will be issued once your reservation
              is accepted by the cruise line.
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
                  "ICME does not store or retain your card details.",
                  "Price variations due to currency fluctuations or cruise line updates are outside our control.",
                ]}
              />
            </div>
          </TermsSection>

          <TermsSection title="6. Cancellations, Changes & Refunds">
            <p>
              All cancellations, amendments, name changes or refund requests
              are governed by the specific policy of the cruise line you book
              with.
            </p>
            <div className="py-2">
              <CheckList
                items={[
                  "ICME acts solely as a facilitator; cancellation requests must be submitted in writing.",
                  "Administrative fees may apply according to the cruise line’s conditions.",
                  "Refunds (if approved) will be processed using the same method as the original payment.",
                ]}
              />
            </div>
            <p>
              We strongly recommend reviewing cancellation terms before
              confirming any booking.
            </p>
          </TermsSection>

          <TermsSection title="7. Responsibility & Liability">
            <p>
              ICME acts as an intermediary between users and participating
              cruise lines.
            </p>
            <div className="py-2">
              <CheckList
                items={[
                  "Cruise itineraries, schedules, onboard services and operational decisions are controlled solely by the cruise line.",
                  "ICME is not liable for itinerary changes, cancellations, weather disruptions, operational decisions or any circumstances beyond our control.",
                  "Our total liability shall not exceed any service fee paid to ICME for the specific booking in question.",
                ]}
              />
            </div>
            <p>
              We do not accept responsibility for loss, damage, injury or
              expenses arising from third party errors or force majeure events.
            </p>
          </TermsSection>

          <TermsSection title="8. User Responsibilities">
            <p>By using this site, you agree to:</p>
            <div className="py-2">
              <CheckList
                items={[
                  "Provide accurate registration and booking information",
                  "Maintain the confidentiality of your login credentials",
                  "Use the site only for personal, non commercial purposes",
                  "Comply with all applicable UAE laws and regulations",
                ]}
              />
            </div>
            <p>
              Any misuse, data scraping, fraudulent activity or unauthorised
              marketing use of the portal may result in immediate account
              termination and potential legal action.
            </p>
          </TermsSection>

          <TermsSection title="9. Intellectual Property">
            <p>
              All website content, including text, design, branding, graphics
              and images, is the property of Interline Cruises Middle East or
              used under license.
            </p>
            <p>
              Content may not be copied, reproduced or redistributed without
              written permission.
            </p>
          </TermsSection>

          <TermsSection title="10. Privacy & Data Use">
            <p>
              Your personal data is handled in accordance with our{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-[var(--interlines-azure)] hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              By using this site, you consent to the collection and use of your
              information solely for:
            </p>
            <div className="py-2">
              <CheckList
                items={[
                  "Verification",
                  "Booking processing",
                  "Customer support",
                  "Communication regarding your membership and offers",
                ]}
              />
            </div>
            <p>ICME does not sell or share your data with unauthorised third parties.</p>
          </TermsSection>

          <TermsSection title="11. Links to Third Party Sites">
            <p>
              Our website may include links to cruise line or travel partner
              websites. These are provided for convenience only.
            </p>
            <p>
              ICME is not responsible for the accuracy, content, security or
              privacy practices of external sites.
            </p>
          </TermsSection>

          <TermsSection title="12. Amendments to Terms">
            <p>
              ICME reserves the right to update these Terms of Use and Booking
              Conditions at any time.
            </p>
            <p>
              Updated versions will be posted online with an effective date.
              Continued use of the platform constitutes acceptance of any
              changes.
            </p>
          </TermsSection>

          <TermsSection title="13. Governing Law & Jurisdiction">
            <p>These Terms are governed by the laws of the United Arab Emirates.</p>
            <p>
              Any disputes shall fall under the exclusive jurisdiction of the
              courts of Dubai, UAE.
            </p>
          </TermsSection>

          <TermsSection title="14. Contact Information">
            <p>
              For questions or concerns regarding these terms or your booking,
              please contact:
            </p>
            <p className="my-4 text-lg font-medium text-[var(--interlines-azure)]">
              Customer Support - Interline Cruises Middle East
            </p>
            <div className="py-2">
              <CheckList items={["Email: [Insert Email]", "Telephone: [Insert Number]"]} />
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
