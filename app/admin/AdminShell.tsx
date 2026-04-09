"use client";

import AdminBodyClass from "@/components/AdminBodyClass";
import AppSectionHeader from "@/components/AppSectionHeader";
import { useSessionContext } from "@/components/SessionProvider";
import { ApiAdmin } from "@/lib/api";
import { cn } from "@/lib/ui";
import { Users, LayoutDashboard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo } from "react";

type AdminContextValue = {
  admin: ApiAdmin | null;
  loading: boolean;
};

const AdminContext = createContext<AdminContextValue | null>(null);

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
] as const;

export function useAdminContext() {
  const value = useContext(AdminContext);
  if (!value) {
    throw new Error("useAdminContext must be used within AdminShell.");
  }

  return value;
}

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, logoutSession, status } = useSessionContext();
  const pathname = usePathname();
  const router = useRouter();
  const normalizedPathname = useMemo(() => {
    if (!pathname) return "/";
    if (pathname === "/") return pathname;

    return pathname.replace(/\/+$/, "") || "/";
  }, [pathname]);
  const isLoginRoute = normalizedPathname === "/admin/login";
  const loading = !isLoginRoute && status === "loading";
  const loginHref = "/admin/login";
  const adminActionClassName =
    "inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[var(--interlines-slate)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--interlines-azure)]/24 hover:bg-[var(--interlines-azure-light)]/70 hover:text-[var(--interlines-azure-deep)] hover:shadow-[0_12px_24px_rgba(36,88,96,0.1)]";
  const adminSidebarActionClassName =
    "inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[var(--interlines-slate)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--interlines-azure)]/24 hover:bg-[var(--interlines-azure-light)]/70 hover:text-[var(--interlines-azure-deep)] hover:shadow-[0_12px_24px_rgba(36,88,96,0.1)]";

  useEffect(() => {
    if (isLoginRoute || status === "loading" || status === "admin") {
      return;
    }

    window.location.replace(loginHref);
  }, [isLoginRoute, loginHref, status]);

  const contextValue = useMemo(
    () => ({
      admin,
      loading,
    }),
    [admin, loading],
  );
  const currentSection = useMemo(
    () => navItems.find((item) => item.href === normalizedPathname)?.label ?? "Dashboard",
    [normalizedPathname],
  );
  const breadcrumbItems = useMemo(() => {
    if (isLoginRoute) {
      return [];
    }

    return normalizedPathname === "/admin"
      ? [
          { href: "/admin", label: "Admin" },
          { label: "Dashboard" },
        ]
      : [
          { href: "/admin", label: "Admin" },
          { label: currentSection },
        ];
  }, [currentSection, isLoginRoute, normalizedPathname]);

  async function onLogout() {
    await logoutSession();
    router.push("/admin/login");
  }

  if (!isLoginRoute && loading) {
    return null;
  }

  if (!isLoginRoute && status !== "admin") {
    return null;
  }

  return (
    <AdminContext.Provider value={contextValue}>
      <AdminBodyClass />
      {isLoginRoute ? (
        <main className="h-dvh overflow-hidden bg-[var(--interlines-bg)]">{children}</main>
      ) : (
        <div className="h-dvh overflow-hidden bg-[var(--interlines-bg)] text-[var(--interlines-slate)]">
          <div className="mx-auto flex h-full max-w-[1600px] flex-col lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
            <aside className="border-b border-slate-200 bg-white lg:h-dvh lg:border-b-0 lg:border-r">
              <div className="flex h-full flex-col px-4 py-4 sm:px-6 lg:px-4 lg:py-5">
                <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = normalizedPathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "inline-flex h-11 min-w-fit items-center gap-3 rounded-2xl px-4 text-sm font-semibold transition-colors",
                          active
                            ? "bg-[var(--interlines-azure)] text-white"
                            : "bg-transparent text-[var(--interlines-slate-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--interlines-azure-light)] hover:text-[var(--interlines-azure-deep)]",
                        )}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.8} />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-4 space-y-3 lg:mt-auto">
                  {admin && (
                    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4">
                      <p className="text-sm font-semibold text-[var(--interlines-slate)]">
                        {admin.first_name} {admin.last_name}
                      </p>
                      <p className="mt-1 break-all text-xs text-[var(--interlines-slate-soft)]">
                        {admin.email}
                      </p>
                    </div>
                  )}

                  <Link
                    href="/"
                    className={adminSidebarActionClassName}
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
                    Public Site
                  </Link>
                </div>
              </div>
            </aside>

            <div className="min-w-0 flex min-h-0 flex-1 flex-col overflow-hidden lg:h-dvh">
              <header>
                <AppSectionHeader
                  title={currentSection}
                  breadcrumbs={breadcrumbItems}
                  actions={
                    admin ? (
                      <>
                        <Link
                          href="/cruise-search"
                          className={adminActionClassName}
                        >
                          Cruise Search
                        </Link>
                        <button
                          onClick={onLogout}
                          className={adminActionClassName}
                        >
                          Log Out
                        </button>
                      </>
                    ) : null
                  }
                >
                  <div className="lg:hidden">
                    <nav className="flex gap-2 overflow-x-auto">
                      {navItems.map((item) => {
                        const active = normalizedPathname === item.href;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "inline-flex h-10 items-center rounded-xl px-4 text-sm font-semibold whitespace-nowrap transition-colors",
                              active
                                ? "bg-[var(--interlines-azure)] text-white"
                                : "border border-slate-200 bg-white text-[var(--interlines-slate-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--interlines-azure)]/24 hover:bg-[var(--interlines-azure-light)]/70 hover:text-[var(--interlines-azure-deep)] hover:shadow-[0_12px_24px_rgba(36,88,96,0.1)]",
                            )}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                </AppSectionHeader>
              </header>

              <main className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-6 lg:px-10 lg:py-8">
                {children}
              </main>
            </div>
          </div>
        </div>
      )}
    </AdminContext.Provider>
  );
}
