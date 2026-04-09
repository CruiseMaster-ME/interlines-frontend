import type { Metadata } from "next";
import AdminLoginClient from "@/app/admin/login/AdminLoginClient";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Admin Login",
  description: "Admin login for Interline Cruises Middle East operations.",
});

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}
