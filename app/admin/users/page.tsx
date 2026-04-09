import type { Metadata } from "next";
import AdminUsersClient from "@/app/admin/users/AdminUsersClient";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Admin Users",
  description: "Manage users for Interline Cruises Middle East.",
});

export default function AdminUsersPage() {
  return <AdminUsersClient />;
}
