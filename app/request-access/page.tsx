import type { Metadata } from "next";
import RequestAccessClient from "@/app/request-access/RequestAccessClient";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Register for Access",
  description: "Register for access to Interline Cruises Middle East.",
});

export default function RequestAccessPage() {
  return <RequestAccessClient />;
}
