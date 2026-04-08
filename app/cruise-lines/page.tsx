import type { Metadata } from "next";
import CruiseLineShowcaseSection from "@/components/CruiseLineShowcaseSection";
import { PageHeader } from "@/components/PageHeader";
import { cruiseLines } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Cruise Lines - Interline Cruises Middle East",
  description:
    "Choosing your next cruise holiday starts here.",
};

const introParagraphs = [
  "Choosing your next cruise holiday starts here. This is where you'll find all the exclusive interline offers available to you as a verified member of the Middle East travel community.",
  "Whether you're dreaming of island hopping, a week of pure relaxation, or a voyage that takes you across continents, you'll discover options from some of the world's most loved cruise lines.",
  "Each cruise line brings its own style, atmosphere and onboard experience and your industry access opens the door to all of them. Simply explore the cruise lines below to view cruise line specific offers, itineraries and seasonal promotions.",
  "All displayed fares already include your interline benefit. Additional promotions may apply where available. New sailings and special rates are added regularly, so there's always something new to inspire your next holiday at sea.",
] as const;

export default function CruiseLinesPage() {
  return (
    <div className="min-h-screen bg-[var(--interlines-bg)] pb-24">
      <PageHeader
        title="Cruise Lines"
        backgroundImage="/assets/images/cruise-lines/royal-caribbean-international-detail.jpg"
        backgroundPosition="center 38%"
      />

      <CruiseLineShowcaseSection
        paragraphs={introParagraphs}
        items={cruiseLines.map((line) => ({
          name: line.name,
          href: `/cruise-lines/${line.slug}`,
          logoSrc: line.logoSrc,
          logoAlt: line.logoAlt,
          logoClassName: line.logoClassName,
        }))}
        sectionClassName="pt-16 sm:pt-20"
        containerClassName="max-w-6xl px-5"
      />
    </div>
  );
}
