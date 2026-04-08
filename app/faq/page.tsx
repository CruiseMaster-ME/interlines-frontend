import type { Metadata } from "next";
import Container from "@/components/Container";
import FaqAccordion from "@/components/FaqAccordion";
import { PageHeader } from "@/components/PageHeader";
import { Pill } from "@/components/PremiumUI";

export const metadata: Metadata = {
  title: "FAQ - Interline Cruises Middle East",
  description: "Everything you need to know about accessing exclusive cruise rates.",
};

export default function FaqPage() {
  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen pb-24">
      <PageHeader
        title="How Interline Cruises Middle East Works"
        backgroundImage="/assets/images/how.png"
        backgroundPosition="center 34%"
      >
        <div className="space-y-6">
          <p>Everything you need to know about accessing exclusive cruise rates.</p>
          <div>
            <Pill href="/request-access" variant="white">
              Register Now
            </Pill>
          </div>
        </div>
      </PageHeader>

      <Container className="max-w-4xl px-5 pt-16 sm:pt-20">
        <FaqAccordion />
      </Container>
    </div>
  );
}
