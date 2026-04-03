import type { Metadata } from "next";
import AdminLoginClient from "@/app/admin/login/AdminLoginClient";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin login for Interline Cruises Middle East operations.",
};

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}
