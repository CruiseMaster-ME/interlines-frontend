import type { Metadata } from "next";
import DashboardClient from "@/app/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your Interline Cruises Middle East member profile and travel details.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
