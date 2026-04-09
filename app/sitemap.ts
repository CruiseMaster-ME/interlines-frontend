import type { MetadataRoute } from "next";
import { cruiseLines } from "@/lib/siteContent";
import { toAbsoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const publicRoutes = [
  {
    path: "/",
    changeFrequency: "weekly" as const,
    priority: 1,
  },
  {
    path: "/about/",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    path: "/cruise-lines/",
    changeFrequency: "weekly" as const,
    priority: 0.9,
  },
  {
    path: "/offers/",
    changeFrequency: "daily" as const,
    priority: 0.9,
  },
  {
    path: "/faq/",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },
  {
    path: "/eligibility/",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    path: "/terms-and-conditions/",
    changeFrequency: "yearly" as const,
    priority: 0.5,
  },
  {
    path: "/privacy-policy/",
    changeFrequency: "yearly" as const,
    priority: 0.5,
  },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  return [
    ...publicRoutes.map((route) => ({
      url: toAbsoluteUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...cruiseLines.flatMap((line) => [
      {
        url: toAbsoluteUrl(`/cruise-lines/${line.slug}/`),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      {
        url: toAbsoluteUrl(`/cruise-lines/${line.slug}/offers/`),
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.7,
      },
    ]),
  ];
}
