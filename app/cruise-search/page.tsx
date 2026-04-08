import type { Metadata } from "next";
import CruiseSearchClient from "@/app/cruise-search/CruiseSearchClient";

export const metadata: Metadata = {
  title: "Cruise Search",
  description: "Search cruise sailings through the Interline Cruises Middle East member portal.",
};

export default function CruiseSearchPage() {
  return <CruiseSearchClient />;
}
