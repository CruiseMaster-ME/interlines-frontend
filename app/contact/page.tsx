import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Contact Redirect",
  description: "Redirecting to the homepage.",
});

export default function ContactPage() {
  redirect("/");
}
