import type { Metadata } from "next";
import DashboardClient from "@/app/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Interline Cruises Middle East member dashboard.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
