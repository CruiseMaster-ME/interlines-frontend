import type { Metadata } from "next";
import CruiseSearchClient from "@/app/cruise-search/CruiseSearchClient";
import MemberRouteGuard from "@/components/MemberRouteGuard";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Cruise Search",
  description: "Search cruise sailings through the Interline Cruises Middle East member portal.",
});

export default function CruiseSearchPage() {
  return (
    <MemberRouteGuard allowAdmin>
      <CruiseSearchClient />
    </MemberRouteGuard>
  );
}
