import type { Metadata } from "next";
import AdminDashboardClient from "@/app/admin/AdminDashboardClient";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Admin Dashboard",
  description: "Operations dashboard for Interline Cruises Middle East admins.",
});

export default function AdminDashboardPage() {
  return <AdminDashboardClient />;
}
