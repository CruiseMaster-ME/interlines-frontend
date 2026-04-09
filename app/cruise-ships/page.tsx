import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Cruise Ships Redirect",
  description: "Redirecting to the cruise lines page.",
});

export default function CruiseShipsPage() {
  redirect("/cruise-lines");
}
