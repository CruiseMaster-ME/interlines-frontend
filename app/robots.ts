import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const privatePaths = [
  "/admin/",
  "/login/",
  "/request-access/",
  "/forgot-password/",
  "/reset-password/",
  "/pending-approval/",
  "/dashboard/",
  "/booking/",
  "/cruise-search/",
] satisfies string[];

const aiCrawlerAgents = [
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Applebot-Extended",
  "Google-Extended",
  "Bytespider",
  "CCBot",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      ...aiCrawlerAgents.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: privatePaths,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
