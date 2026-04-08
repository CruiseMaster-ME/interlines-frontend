import type { ReactNode } from "react";
import { cruiseLines } from "@/lib/siteContent";

export function generateStaticParams() {
  return cruiseLines.map((line) => ({
    slug: line.slug,
  }));
}

export default function CruiseLineSlugLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
