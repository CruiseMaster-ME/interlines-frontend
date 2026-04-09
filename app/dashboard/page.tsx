import type { Metadata } from "next";
import DashboardClient from "@/app/dashboard/DashboardClient";
import MemberRouteGuard from "@/components/MemberRouteGuard";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Profile",
  description: "Manage your Interline Cruises Middle East member profile and travel details.",
});

export default function DashboardPage() {
  return (
    <MemberRouteGuard>
      <DashboardClient />
    </MemberRouteGuard>
  );
}
