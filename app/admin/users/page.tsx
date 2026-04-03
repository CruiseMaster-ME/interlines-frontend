import type { Metadata } from "next";
import AdminUsersClient from "@/app/admin/users/AdminUsersClient";

export const metadata: Metadata = {
  title: "Admin Users",
  description: "Manage users for Interline Cruises Middle East.",
};

export default function AdminUsersPage() {
  return <AdminUsersClient />;
}
