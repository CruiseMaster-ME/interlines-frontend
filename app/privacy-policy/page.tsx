import type { Metadata } from "next";
import type { ReactNode } from "react";
import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { CheckList, Card, Pill } from "@/components/PremiumUI";
import { privacyContactEmail } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Privacy Policy - Interline Cruises Middle East",
  description: "Secure, transparent and responsible use of your information at every step.",
};

function PrivacySection({
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
      <div className="space-y-4 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
        {children}
      </div>
    </div>
  );
}

function PrivacyTable() {
  const rows = [
    [
      "Eligibility verification",
      "Name, employer, company email, employment proof",
      "Legitimate interest; Pre-contractual necessity",
    ],
    [
      "Account creation & login",
      "Name, email, password",
      "Contractual necessity",
    ],
    [
      "Booking processing",
      "Contact details, passenger information",
      "Contractual necessity; Legal obligation (where required)",
    ],
    [
      "Customer support",
      "Contact details, booking details",
      "Legitimate interest; Contractual necessity",
    ],
    [
      "Marketing communications",
      "Email address",
      "Consent",
    ],
    [
      "Security & fraud prevention",
      "Technical data, login activity",
      "Legitimate interest; Legal obligation (where applicable)",
    ],
    [
      "Website analytics & performance (recommended addition)",
      "Cookies, usage data",
      "Legitimate interest; Consent (where required)",
    ],
  ] as const;

  return (
    <div className="overflow-x-auto rounded-[1.75rem] border border-[var(--interlines-azure)]/10">
      <table className="min-w-full border-collapse bg-white">
        <thead>
          <tr className="bg-[var(--interlines-azure-light)]/60 text-left">
            <th className="px-5 py-4 text-sm font-semibold text-[var(--interlines-slate)]">
              Purpose of Processing
            </th>
            <th className="px-5 py-4 text-sm font-semibold text-[var(--interlines-slate)]">
              Type of Data
            </th>
            <th className="px-5 py-4 text-sm font-semibold text-[var(--interlines-slate)]">
              Lawful Basis
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-t border-[var(--interlines-azure)]/10 align-top">
              <td className="px-5 py-4 text-sm text-[var(--interlines-slate-soft)]">{row[0]}</td>
              <td className="px-5 py-4 text-sm text-[var(--interlines-slate-soft)]">{row[1]}</td>
              <td className="px-5 py-4 text-sm text-[var(--interlines-slate-soft)]">{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen pb-24">
      <PageHeader
        title="Your Data, Handled with Care"
        backgroundImage="/assets/images/hero-bg.jpg"
        backgroundPosition="center 52%"
      >
        <div className="space-y-5">
          <p>Secure, transparent and responsible use of your information at every step.</p>
          <div>
            <Pill href="/request-access" variant="white">
              Register Now
            </Pill>
          </div>
        </div>
      </PageHeader>

      <Container className="max-w-4xl px-5 pt-16 sm:pt-20">
        <Card className="border border-[var(--interlines-azure)]/5 bg-white/70 p-8 shadow-[0_20px_60px_rgba(48,117,128,0.06)] backdrop-blur-md sm:p-14">
          <PrivacySection title="Your privacy matters.">
            <p>
              Your privacy matters. At Interline Cruises Middle East, we are
              committed to protecting your personal information and ensuring
              complete transparency in how your data is collected, used and
              safeguarded.
            </p>
            <p>
              This Privacy Policy explains how we handle your information in
              accordance with the UAE Personal Data Protection Law (Federal
              Decree Law No. 45 of 2021) and the General Data Protection
              Regulation (GDPR) where applicable.
            </p>
          </PrivacySection>

          <PrivacySection title="1. Information We Collect">
            <p>When you register or book through our platform, we may collect:</p>
            <div className="py-2">
              <CheckList
                items={[
                  "Your full name, employer and company email address (for verification)",
                  "Proof of current employment (e.g., staff ID or company documentation)",
                  "Contact details required for booking and communication",
                  "Information related to cruise preferences, viewed offers or selected itineraries",
                  "Technical data such as IP address, device type, browser information and cookies (for security and analytics)",
                ]}
              />
            </div>
            <p>
              We collect only the information necessary to provide our services
              and verify your eligibility.
            </p>
          </PrivacySection>

          <PrivacySection title="2. Purpose of Data Collection">
            <p>We collect and process your data to:</p>
            <div className="py-2">
              <CheckList
                items={[
                  "Verify your eligibility as a current travel, tourism or hospitality professional in the Middle East",
                  "Provide access to exclusive interline cruise offers",
                  "Process and confirm your cruise bookings",
                  "Communicate booking updates, account notifications and service related messages",
                  "Send promotional updates only if you have opted in",
                ]}
              />
            </div>
            <p>
              We do not sell, rent or share your personal data with advertisers
              or external marketing databases.
            </p>
            <p>
              Our lawful basis for processing your data includes contractual
              necessity, legitimate interest, legal obligation, and your
              explicit consent where required.
            </p>
          </PrivacySection>

          <PrivacySection title="3. Lawful Basis for Processing">
            <PrivacyTable />
          </PrivacySection>

          <PrivacySection title="4. Data Security">
            <p>
              Your data is stored in a secure, encrypted environment that meets
              GDPR and UAE PDPL standards.
            </p>
            <div className="py-2">
              <CheckList
                items={[
                  "All data is transmitted using SSL encryption",
                  "Verification documents are accessible only to authorised personnel",
                  "Access controls and security protocols protect your information",
                  "Regular audits ensure compliance with applicable data protection laws",
                ]}
              />
            </div>
          </PrivacySection>

          <PrivacySection title="5. How We Handle Verification Documents">
            <p>
              Any documents you upload for verification (such as staff ID or
              employment proof) are used solely to confirm your eligibility.
            </p>
            <div className="py-2">
              <CheckList
                items={[
                  "Documents are stored securely",
                  "They are deleted once verification is complete unless you consent to ongoing membership retention",
                  "We never share verification documents with cruise lines or third parties",
                ]}
              />
            </div>
          </PrivacySection>

          <PrivacySection title="6. Cookies Policy">
            <p>We use cookies and similar technologies to:</p>
            <div className="py-2">
              <CheckList
                items={[
                  "Improve website performance",
                  "Enhance user experience",
                  "Analyse site traffic and usage patterns",
                  "Maintain security and prevent fraud",
                ]}
              />
            </div>
            <p>You can manage or disable cookies through your browser settings.</p>
          </PrivacySection>

          <PrivacySection title="7. Data Transfers Outside the UAE">
            <p>
              Some of our service providers or hosting partners may store or
              process data outside the UAE.
            </p>
            <p>When data is transferred internationally, we ensure:</p>
            <div className="py-2">
              <CheckList
                items={[
                  "Adequate protection measures are in place",
                  "Transfers comply with UAE PDPL and GDPR requirements",
                  "Standard Contractual Clauses (SCCs) or equivalent safeguards are used where applicable",
                ]}
              />
            </div>
            <p>
              We never transfer your data to countries without appropriate
              protection standards.
            </p>
          </PrivacySection>

          <PrivacySection title="8. Children’s Data">
            <p>
              We do not knowingly collect personal data from children under the
              age of 18 for account creation.
            </p>
            <p>However, minors may appear as passengers in cruise bookings.</p>
            <p>In such cases:</p>
            <div className="py-2">
              <CheckList
                items={[
                  "Their data is provided by the verified adult account holder",
                  "It is used solely for booking and travel related purposes",
                ]}
              />
            </div>
          </PrivacySection>

          <PrivacySection title="9. Data Retention">
            <p>
              We retain your personal data only for as long as necessary to
              fulfil the purposes outlined in this policy.
            </p>
            <div className="py-2">
              <CheckList
                items={[
                  "Active account data is retained for the duration of your membership",
                  "Inactive accounts may be anonymised or deleted after 24 months of non use",
                  "Booking related data may be retained longer if required by law or for audit purposes",
                ]}
              />
            </div>
            <p>You may request deletion of your account at any time.</p>
          </PrivacySection>

          <PrivacySection title="10. Data Breach Notification">
            <p>In the unlikely event of a data breach:</p>
            <div className="py-2">
              <CheckList
                items={[
                  "We will assess the impact immediately",
                  "We will notify affected users without undue delay",
                  "We will report the breach to UAE authorities and, where applicable, GDPR supervisory authorities",
                  "We will take corrective measures to prevent recurrence",
                ]}
              />
            </div>
          </PrivacySection>

          <PrivacySection title="11. Your Rights">
            <p>Under GDPR and UAE PDPL, you have the right to:</p>
            <div className="py-2">
              <CheckList
                items={[
                  "Access your personal data",
                  "Request correction of inaccurate information",
                  "Request deletion of your profile and associated data",
                  "Withdraw consent for marketing communications",
                  "Request information about how your data is processed",
                  "Object to certain types of processing where applicable",
                ]}
              />
            </div>
            <p>
              Requests can be submitted through our Data Protection Contact
              Form in the member area.
            </p>
          </PrivacySection>

          <PrivacySection title="12. Third Party Websites">
            <p>
              Our platform may link to cruise line websites for itinerary
              details or ship information. We are not responsible for the
              privacy practices, cookie policies or content of external
              websites.
            </p>
          </PrivacySection>

          <PrivacySection title="13. Compliance Statement">
            <p>Interline Cruises Middle East operates in accordance with:</p>
            <div className="py-2">
              <CheckList
                items={[
                  "UAE Personal Data Protection Law (Federal Decree Law No. 45 of 2021)",
                  "GDPR (General Data Protection Regulation, EU)",
                  "Global best practices for data privacy, security and user rights",
                ]}
              />
            </div>
            <p>
              We continuously review our processes to ensure ongoing
              compliance.
            </p>
          </PrivacySection>

          <PrivacySection title="14. Contact">
            <p>For privacy related questions or data requests, please contact:</p>
            <p className="font-medium text-[var(--interlines-slate)]">
              Privacy Officer - Interline Cruises Middle East
            </p>
            <p className="my-4 text-lg font-medium text-[var(--interlines-azure)]">
              {privacyContactEmail}
            </p>
          </PrivacySection>
        </Card>

        <div className="mt-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Pill href="/" variant="glass">
              Back to Home
            </Pill>
            <Pill href="/eligibility" variant="glass">
              View Eligibility
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
