import type { Metadata } from "next";
import AdminDashboardClient from "@/app/admin/AdminDashboardClient";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Operations dashboard for Interline Cruises Middle East admins.",
};

export default function AdminDashboardPage() {
  return <AdminDashboardClient />;
}
