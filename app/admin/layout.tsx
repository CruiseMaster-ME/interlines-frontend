import type { Metadata } from "next";
import AdminShell from "@/app/admin/AdminShell";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Admin",
  description: "Restricted admin area for Interline Cruises Middle East.",
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="admin-route-marker hidden" aria-hidden="true" />
      <AdminShell>{children}</AdminShell>
    </>
  );
}
