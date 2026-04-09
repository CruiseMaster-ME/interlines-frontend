import type { Metadata } from "next";
import { Suspense } from "react";
import OfferDetailClient from "@/app/offer-details/OfferDetailClient";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Offer Details",
  description: "Live cruise offer details loaded from the offers database.",
});

export default function OfferDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--interlines-bg)] pb-24">
          <div className="h-[18rem] bg-[var(--interlines-azure-deep)]" />
        </div>
      }
    >
      <OfferDetailClient />
    </Suspense>
  );
}
