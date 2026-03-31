import type { Metadata } from "next";
import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Card, SectionTitle } from "@/components/PremiumUI";

export const metadata: Metadata = {
  title: "Support - Interline Cruises Middle East",
  description: "Support information for Interline Cruises Middle East members and applicants.",
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen pb-24">
      <PageHeader
        title={
          <span>
            Member <br />
            <span className="italic text-[var(--interlines-gold)]">Support</span>
          </span>
        }
        subtitle="Contact Us"
      >
        For registration, verification, or booking-related questions, use the support details included in your approval and booking communications.
      </PageHeader>

      <Container className="max-w-4xl px-5 pt-16 sm:pt-20">
        <div className="grid gap-8 sm:grid-cols-2">
          <Card className="hover:-translate-y-1 transition-transform duration-300">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] mb-4">Privacy Requests</p>
            <p className="text-[15px] leading-relaxed text-[var(--interlines-slate)] font-medium">
              privacy@interlinecruisesme.com
            </p>
          </Card>
          
          <Card className="hover:-translate-y-1 transition-transform duration-300">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)] mb-4">Need Help?</p>
            <p className="text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
              Review the FAQ and eligibility information before contacting the team.
            </p>
          </Card>
        </div>

        <p className="mt-16 text-center text-sm text-[var(--interlines-slate-soft)]">
          Note: this static portal does not submit support forms directly. Please use your secured communication channels once registered.
        </p>
      </Container>
    </div>
  );
}
