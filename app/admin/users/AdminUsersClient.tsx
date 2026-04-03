"use client";

import { useAdminContext } from "@/app/admin/AdminShell";
import Container from "@/components/Container";
import { apiDelete, apiGet, apiPost, ApiAdminManagedUser } from "@/lib/api";
import { cn } from "@/lib/ui";
import { Ban, CheckCircle2, Clock3, ShieldAlert, Trash2, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type UserListResponse = {
  users: ApiAdminManagedUser[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  status: string;
};

const filters = [
  { value: "", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "DISABLED", label: "Disabled" },
] as const;

function normalizeStatusFilter(value: string | null) {
  return filters.some((filter) => filter.value === value) ? (value ?? "") : "";
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString();
}

function statusTone(status: ApiAdminManagedUser["status"]) {
  if (status === "APPROVED") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }
  if (status === "PENDING") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }
  return "border-red-200 bg-red-50 text-red-700";
}

export default function AdminUsersClient() {
  const { admin } = useAdminContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = normalizeStatusFilter(searchParams.get("status"));
  const [status, setStatus] = useState(statusParam);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<ApiAdminManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<UserListResponse["pagination"] | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyKey, setBusyKey] = useState<string | null>(null);

  useEffect(() => {
    setStatus(statusParam);
    setPage(1);
  }, [statusParam]);

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      setLoading(true);
      setError(null);

      const query = new URLSearchParams();
      if (status) query.set("status", status);
      query.set("page", String(page));

      const res = await apiGet<UserListResponse>(`/api/admin/users?${query.toString()}`);
      if (cancelled) return;

      if (!res.ok) {
        setError("Unable to load users.");
        setLoading(false);
        return;
      }

      setUsers(res.data.users);
      setPagination(res.data.pagination);
      setLoading(false);
    }

    loadUsers();

    return () => {
      cancelled = true;
    };
  }, [page, status]);

  async function runAction(action: "approve" | "disable" | "delete", user: ApiAdminManagedUser) {
    setMessage(null);
    setError(null);
    setBusyKey(`${action}-${user.id}`);

    try {
      if (action === "delete") {
        const confirmed = window.confirm(
          `Delete ${user.first_name} ${user.last_name} permanently?`,
        );
        if (!confirmed) {
          setBusyKey(null);
          return;
        }

        const res = await apiDelete<{ message: string }>(`/api/admin/users/${user.id}`);
        if (!res.ok) {
          setError(res.error.message);
          return;
        }

        setUsers((current) => current.filter((item) => item.id !== user.id));
        setMessage(res.data.message);
        return;
      }

      const res = await apiPost<{ message: string; user: ApiAdminManagedUser }>(
        `/api/admin/users/${user.id}/${action}`,
        {},
      );

      if (!res.ok) {
        setError(res.error.message);
        return;
      }

      setUsers((current) =>
        current.map((item) => (item.id === user.id ? res.data.user : item)),
      );
      setMessage(res.data.message);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Action failed.");
    } finally {
      setBusyKey(null);
    }
  }

  function renderActions(user: ApiAdminManagedUser) {
    const isCurrentAdmin = admin?.id === user.id;
    const isProtectedAdmin = user.role === "ADMIN";
    const approveBusy = busyKey === `approve-${user.id}`;
    const disableBusy = busyKey === `disable-${user.id}`;
    const deleteBusy = busyKey === `delete-${user.id}`;

    return (
      <div className="flex flex-wrap gap-2">
        {user.status !== "APPROVED" && (
          <button
            onClick={() => runAction("approve", user)}
            disabled={approveBusy || disableBusy || deleteBusy}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-[var(--interlines-azure)] px-3 text-xs font-semibold text-white transition-colors hover:bg-[var(--interlines-azure-deep)] disabled:pointer-events-none disabled:opacity-60"
          >
            {approveBusy ? "Approving..." : "Approve"}
          </button>
        )}

        {user.status !== "DISABLED" && !isProtectedAdmin && (
          <button
            onClick={() => runAction("disable", user)}
            disabled={approveBusy || disableBusy || deleteBusy}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-[var(--interlines-slate)] transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-60"
          >
            {disableBusy ? (
              "Disabling..."
            ) : (
              <>
                <Ban className="mr-1.5 h-3.5 w-3.5" strokeWidth={1.8} />
                Disable
              </>
            )}
          </button>
        )}

        {!isCurrentAdmin && !isProtectedAdmin && (
          <button
            onClick={() => runAction("delete", user)}
            disabled={approveBusy || disableBusy || deleteBusy}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100 disabled:pointer-events-none disabled:opacity-60"
          >
            {deleteBusy ? (
              "Deleting..."
            ) : (
              <>
                <Trash2 className="mr-1.5 h-3.5 w-3.5" strokeWidth={1.8} />
                Delete
              </>
            )}
          </button>
        )}

        {isProtectedAdmin && (
          <span className="inline-flex h-9 items-center justify-center rounded-lg border border-[var(--interlines-azure)]/15 bg-[var(--interlines-azure-light)] px-3 text-xs font-semibold text-[var(--interlines-azure-deep)]">
            Admin protected
          </span>
        )}
      </div>
    );
  }

  return (
    <Container className="max-w-none px-0">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => {
                setStatus(filter.value);
                setPage(1);
                router.replace(
                  filter.value ? `/admin/users?status=${filter.value}` : "/admin/users",
                );
              }}
              className={cn(
                "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors",
                status === filter.value
                  ? "bg-[var(--interlines-azure)] text-white"
                  : "border border-slate-200 bg-white text-[var(--interlines-slate-soft)] hover:bg-slate-50 hover:text-[var(--interlines-slate)]",
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="inline-flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[var(--interlines-slate)] shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          Results: <span className="ml-2 font-mono tabular-nums">{pagination?.total ?? 0}</span>
        </div>
      </section>

      {message && (
        <div className="mt-6 rounded-[1.25rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-[1.25rem] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <section className="mt-6 space-y-5">
        {loading ? (
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 text-center text-[var(--interlines-slate-soft)] shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 text-center shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-[var(--interlines-azure)]/10 text-[var(--interlines-azure)]">
              <Users className="h-6 w-6" strokeWidth={1.8} />
            </div>
            <h2 className="mt-5 font-display text-[2rem] leading-tight text-[var(--interlines-slate)]">
              No users found
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
              Try another filter.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.05)] lg:block">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--interlines-slate-soft)]">
                        Member
                      </th>
                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--interlines-slate-soft)]">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--interlines-slate-soft)]">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--interlines-slate-soft)]">
                        Registered
                      </th>
                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--interlines-slate-soft)]">
                        Approved
                      </th>
                      <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--interlines-slate-soft)]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {users.map((user) => (
                      <tr key={user.id} className="align-top hover:bg-slate-50/70">
                        <td className="px-6 py-5">
                          <div className="min-w-[14rem]">
                            <p className="font-semibold text-[var(--interlines-slate)]">
                              {user.first_name} {user.last_name}
                            </p>
                            <p className="mt-1 text-sm text-[var(--interlines-slate-soft)]">
                              {user.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={cn(
                              "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]",
                              statusTone(user.status),
                            )}
                          >
                            {user.status === "APPROVED" ? (
                              <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
                            ) : user.status === "PENDING" ? (
                              <Clock3 className="h-3.5 w-3.5" strokeWidth={2} />
                            ) : (
                              <ShieldAlert className="h-3.5 w-3.5" strokeWidth={2} />
                            )}
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-[var(--interlines-slate)]">
                          {user.role}
                        </td>
                        <td className="px-6 py-5 text-sm text-[var(--interlines-slate-soft)]">
                          {formatDate(user.created_at)}
                        </td>
                        <td className="px-6 py-5 text-sm text-[var(--interlines-slate-soft)]">
                          {formatDate(user.approved_at)}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex justify-end">{renderActions(user)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4 lg:hidden">
              {users.map((user) => (
                <article
                  key={user.id}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--interlines-slate)]">
                        {user.first_name} {user.last_name}
                      </h3>
                      <p className="mt-1 break-all text-sm text-[var(--interlines-slate-soft)]">
                        {user.email}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]",
                        statusTone(user.status),
                      )}
                    >
                      {user.status === "APPROVED" ? (
                        <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
                      ) : user.status === "PENDING" ? (
                        <Clock3 className="h-3.5 w-3.5" strokeWidth={2} />
                      ) : (
                        <ShieldAlert className="h-3.5 w-3.5" strokeWidth={2} />
                      )}
                      {user.status}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--interlines-slate-soft)]">
                        Role
                      </p>
                      <p className="mt-1 text-sm text-[var(--interlines-slate)]">{user.role}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--interlines-slate-soft)]">
                        Registered
                      </p>
                      <p className="mt-1 text-sm text-[var(--interlines-slate-soft)]">
                        {formatDate(user.created_at)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--interlines-slate-soft)]">
                        Approved
                      </p>
                      <p className="mt-1 text-sm text-[var(--interlines-slate-soft)]">
                        {formatDate(user.approved_at)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">{renderActions(user)}</div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {pagination && pagination.last_page > 1 && (
        <div className="mt-8 flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4 shadow-[0_16px_36px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-[var(--interlines-slate-soft)]">
            Page {pagination.current_page} of {pagination.last_page}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={pagination.current_page <= 1}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-[var(--interlines-slate)] transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setPage((current) => Math.min(pagination.last_page, current + 1))
              }
              disabled={pagination.current_page >= pagination.last_page}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--interlines-azure)] px-4 text-sm font-semibold text-white transition-colors hover:bg-[var(--interlines-azure-deep)] disabled:pointer-events-none disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}
