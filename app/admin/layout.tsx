import AdminShell from "@/app/admin/AdminShell";

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
