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
      <h2 className="font-display text-2xl leading-tight tracking-[-0.02em] text-[var(--interlines-slate)] mb-6">
        {title}
      </h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen pb-24">
      <PageHeader
        title="Your Data, Handled with Care"
      >
        <div className="space-y-5">
          <p>Secure, transparent and responsible use of your information at every step.</p>
          <p>
            Your privacy and data protection are our highest priority. At Interline Cruises Middle East, we are committed to protecting your information and ensuring transparency in how your data is managed.
          </p>
        </div>
      </PageHeader>

      <Container className="max-w-4xl px-5 pt-16 sm:pt-20">
        <Card className="p-8 sm:p-14 border border-[var(--interlines-azure)]/5 shadow-[0_20px_60px_rgba(48,117,128,0.06)] bg-white/70 backdrop-blur-md">
          <PrivacySection title="1. Information We Collect">
            <p>When you register or book via our platform, we may collect:</p>
            <div className="py-2">
              <CheckList
                items={[
                  "Your full name, company, and email address (for verification).",
                  "Employment proof (e.g., company email, ID card) for eligibility.",
                  "Contact details for booking processing.",
                  "Preferences related to cruise bookings or offers you view.",
                ]}
              />
            </div>
          </PrivacySection>

          <PrivacySection title="2. Purpose of Data Collection">
            <p>Your information is collected to:</p>
            <div className="py-2">
              <CheckList
                items={[
                  "Verify your trade eligibility.",
                  "Provide customised interline cruise offers.",
                  "Process and confirm your cruise bookings.",
                  "Deliver regular updates or promotional notifications you opt into.",
                ]}
              />
            </div>
            <p className="font-medium text-[var(--interlines-slate)]">
              We do not sell or share user data with any third-party vendors,
              advertisers, or external marketing databases.
            </p>
          </PrivacySection>

          <PrivacySection title="3. Data Security">
            <p>
              All user data is stored in a secure, encrypted environment
              compliant with GDPR international standards.
            </p>
            <div className="py-2">
              <CheckList
                items={[
                  "Data is transmitted using SSL encryption.",
                  "Only authorised verification personnel have access to identification data.",
                  "Your documentation (e.g., proof of employment) is deleted post-verification unless you consent to ongoing membership.",
                ]}
              />
            </div>
          </PrivacySection>

          <PrivacySection title="4. How We Handle Verification Documents">
            <p>
              Uploaded files such as ID cards or certificates are securely stored for verification purposes only.
            </p>
          </PrivacySection>

          <PrivacySection title="5. Communication Preferences">
            <p>
              You&apos;ll only receive notifications directly related to your
              bookings or interline offers. You may opt out of promotional communications anytime using the
              unsubscribe link in every email.
            </p>
          </PrivacySection>

          <PrivacySection title="6. Third-Party Websites">
            <p>
              Interline Cruises Middle East may link to cruise line websites for
              itinerary and ship information. We are not responsible for the privacy practices or cookie policies
              of external websites.
            </p>
          </PrivacySection>

          <PrivacySection title="7. Retention of Data">
            <p>
              We retain essential user data for the duration of your account&apos;s
              activity. Inactive user data may be anonymised or deleted after 24
              months of non-use, following applicable data protection laws.
            </p>
          </PrivacySection>

          <PrivacySection title="8. Your Rights">
            <p>You have the right to:</p>
            <div className="py-2">
              <CheckList
                items={[
                  "Request a copy of your stored personal data.",
                  "Correct any inaccuracies.",
                  "Request deletion of your profile.",
                  "Withdraw consent for marketing communications.",
                ]}
              />
            </div>
            <p>
              Requests can be made via our Data Protection Contact Form in the
              member area.
            </p>
            <p className="text-sm">
              Note: Please link to a dedicated Contact Form for any data amendment/deletion requests.
            </p>
          </PrivacySection>

          <PrivacySection title="9. Compliance Statement">
            <p>
              Interline Cruises Middle East operates under global best practices
              consistent with:
            </p>
            <div className="py-2">
              <CheckList
                items={[
                  "GDPR (General Data Protection Regulation, EU)",
                  "UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021)",
                ]}
              />
            </div>
          </PrivacySection>

          <PrivacySection title="10. Contact">
            <p>
              For any privacy-related concerns or data requests, contact:
            </p>
            <p className="font-medium text-[var(--interlines-slate)]">Privacy Officer - Interline Cruises Middle East</p>
            <p className="font-medium text-[var(--interlines-azure)] text-lg my-4">
              {privacyContactEmail}
            </p>
            <p className="text-sm">
              Note: a separate email address is preferred to ensure Database related requests are not lost in generic &apos;support&apos; or &apos;admin&apos; email addresses.
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
