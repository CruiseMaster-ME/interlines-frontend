import type { Metadata } from "next";
import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Pill, Card } from "@/components/PremiumUI";

export const metadata: Metadata = {
  title: "Destinations - Interline Cruises Middle East",
  description: "Explore popular cruise destinations available through our interline portal.",
};

const destinations = [
  {
    name: "Caribbean",
    description: "Warm-water itineraries with flexible embarkation ports, reserved at industry rates.",
  },
  {
    name: "Mediterranean",
    description: "Iconic ports, culture, and coastal cities across the Med available for verified members.",
  },
  {
    name: "Alaska",
    description: "Glaciers, wildlife, and scenic cruising with exclusive peak-season deals.",
  },
  {
    name: "Northern Europe",
    description: "Fjords, Baltic capitals, and seasonal shoulder-sail savings unlocked.",
  },
  {
    name: "Asia",
    description: "Multi-country routes with curated shore experiences and premium shore packages.",
  },
  {
    name: "South Pacific",
    description: "Island-hopping with longer sailings and protected premium cabin allocations.",
  },
];

export default function DestinationsPage() {
  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen pb-24">
      <PageHeader
        title={
          <span>
            Global <br />
            <span className="italic text-[var(--interlines-gold)]">Destinations</span>
          </span>
        }
        subtitle="Explore The Map"
      >
        Browse region-specific highlights and inspiration before exploring available exclusive interline
        offers.
      </PageHeader>

      <Container className="px-5 pt-16 sm:pt-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, index) => (
            <Card
              key={d.name}
              className="group overflow-hidden relative hover:-translate-y-2 transition-transform duration-500 border border-[var(--interlines-azure)]/5"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--interlines-azure)]/5 group-hover:bg-[var(--interlines-azure)]/10 rounded-full blur-3xl -mr-16 -mt-16 transition-colors duration-500 pointer-events-none" />
              
              <div className="mb-8 w-14 h-14 rounded-full bg-[var(--interlines-bg)] ring-1 ring-[var(--interlines-azure)]/20 flex items-center justify-center text-[var(--interlines-azure)] group-hover:bg-[var(--interlines-azure)] group-hover:text-white transition-all duration-300 shadow-sm relative z-10">
                <span className="font-display font-bold tabular-nums text-lg">{index + 1}</span>
              </div>
              
              <h2 className="font-display text-[2rem] leading-tight text-[var(--interlines-slate)] group-hover:text-[var(--interlines-azure-deep)] transition-colors duration-300 relative z-10">
                {d.name}
              </h2>
              
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] relative z-10">
                {d.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-24 text-center">
          <p className="text-[var(--interlines-slate-soft)] text-lg mb-8">
            These destinations are waiting. Get access to view exact dates and ships.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Pill href="/request-access" variant="azure">
              Begin Registration
            </Pill>
            <Pill href="/offers" variant="glass">
              Browse Offers
            </Pill>
          </div>
        </div>
      </Container>
    </div>
  );
}
