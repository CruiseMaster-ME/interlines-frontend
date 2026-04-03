"use client";

import Container from "@/components/Container";
import { Card } from "@/components/PremiumUI";
import { useSessionContext } from "@/components/SessionProvider";
import { apiGet, apiPatch, ApiUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

type ProfileForm = {
  first_name: string;
  middle_name: string;
  last_name: string;
  title: string;
  gender: string;
  date_of_birth: string;
  phone_country_code: string;
  phone_number: string;
  destination_phone_country_code: string;
  destination_phone_number: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
};

const titleOptions = ["Mr", "Mrs", "Ms", "Mst"] as const;
const genderOptions = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
  { value: "U", label: "Prefer not to say" },
] as const;

const missingFieldLabels: Record<string, string> = {
  title: "title",
  gender: "gender",
  date_of_birth: "date of birth",
  phone_country_code: "phone country code",
  phone_number: "phone number",
  address_line_1: "address line 1",
  city: "city",
  country: "country",
  state: "state",
  postal_code: "postal code",
};

function createProfileForm(user: ApiUser): ProfileForm {
  return {
    first_name: user.first_name,
    middle_name: user.middle_name ?? "",
    last_name: user.last_name,
    title: user.title ?? "",
    gender: user.gender ?? "",
    date_of_birth: user.date_of_birth ?? "",
    phone_country_code: user.phone_country_code ?? "",
    phone_number: user.phone_number ?? "",
    destination_phone_country_code: user.destination_phone_country_code ?? "",
    destination_phone_number: user.destination_phone_number ?? "",
    address_line_1: user.address_line_1 ?? "",
    address_line_2: user.address_line_2 ?? "",
    city: user.city ?? "",
    state: user.state ?? "",
    country: user.country ?? "",
    postal_code: user.postal_code ?? "",
  };
}

function describeMissingFields(fields: string[]) {
  return fields
    .map((field) => missingFieldLabels[field] ?? field.replaceAll("_", " "))
    .join(", ");
}

function ProfileInput({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)]">
        {label}
      </span>
      {children}
    </label>
  );
}

function inputClassName() {
  return "h-12 w-full rounded-2xl border border-zinc-200 bg-white/70 px-4 text-[15px] text-[var(--interlines-slate)] shadow-sm outline-none transition-all focus:border-[var(--interlines-azure)]/40 focus:bg-white focus:ring-4 focus:ring-[var(--interlines-azure)]/20";
}

export default function DashboardClient() {
  const router = useRouter();
  const { setUserSession } = useSessionContext();
  const [user, setUser] = useState<ApiUser | null>(null);
  const [form, setForm] = useState<ProfileForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const syncUserSession = useEffectEvent((nextUser: ApiUser) => {
    setUserSession(nextUser);
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const res = await apiGet<{ user: ApiUser }>("/api/user");
      if (cancelled) return;
      if (!res.ok) {
        router.push("/login");
        return;
      }

      setUser(res.data.user);
      syncUserSession(res.data.user);
      setForm(createProfileForm(res.data.user));
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;

    setError(null);
    setSuccess(null);
    setSaving(true);

    const payload = {
      ...form,
      country: form.country.trim().toUpperCase(),
      state: form.state.trim().toUpperCase(),
    };

    try {
      const res = await apiPatch<{ message: string; user: ApiUser }>(
        "/api/user",
        payload,
      );

      if (!res.ok) {
        setError(res.error.message);
        return;
      }

      setUser(res.data.user);
      setUserSession(res.data.user);
      setForm(createProfileForm(res.data.user));
      setSuccess(res.data.message);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  }

  function updateField<K extends keyof ProfileForm>(field: K, value: ProfileForm[K]) {
    setForm((current) => (current ? { ...current, [field]: value } : current));
  }

  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen pb-24">
      <Container className="max-w-6xl px-5 pt-10 sm:pt-12">
        <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
          <Card className="border border-[var(--interlines-azure)]/10 bg-white/80 p-8 shadow-[0_20px_50px_rgba(48,117,128,0.06)] backdrop-blur-md sm:p-10">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-[var(--interlines-azure)]">
                <svg className="mb-4 h-10 w-10 animate-spin opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Loading Profile...
                </p>
              </div>
            ) : user ? (
              <div className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)]">
                      Verification Status
                    </p>
                    <div
                      className="inline-flex items-center gap-2 rounded-full border border-current px-3 py-1 font-semibold text-sm uppercase tracking-wider"
                      style={{
                        color:
                          user.status === "APPROVED"
                            ? "#10b981"
                            : user.status === "PENDING"
                              ? "#f59e0b"
                              : "#ef4444",
                        backgroundColor:
                          user.status === "APPROVED"
                            ? "rgba(16, 185, 129, 0.1)"
                            : user.status === "PENDING"
                              ? "rgba(245, 158, 11, 0.1)"
                              : "rgba(239, 68, 68, 0.1)",
                      }}
                    >
                      <span className="h-2 w-2 rounded-full bg-current" />
                      {user.status}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)]">
                      Access Level
                    </p>
                    <p className="text-[1.15rem] font-medium text-[var(--interlines-slate)] capitalize">
                      {user.role} Member
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-[var(--interlines-azure)]/10 bg-[var(--interlines-azure-light)]/35 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)]">
                    Booking Profile
                  </p>
                  <h3 className="mt-3 font-display text-[1.8rem] leading-tight text-[var(--interlines-slate)]">
                    {user.booking_profile_ready ? "Ready for Booking" : "Needs Attention"}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                    {user.booking_profile_ready
                      ? "Your core travel details are in place and will be included in the Odysseus handoff."
                      : `Complete the remaining travel details to reduce manual re-entry during booking: ${describeMissingFields(user.booking_profile_missing_fields)}.`}
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] border border-[var(--interlines-azure)]/10 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)]">
                      Member Name
                    </p>
                    <p className="mt-3 text-[1.15rem] font-medium text-[var(--interlines-slate)]">
                      {[user.first_name, user.middle_name, user.last_name]
                        .filter(Boolean)
                        .join(" ")}
                    </p>
                  </div>
                  <div className="rounded-[1.75rem] border border-[var(--interlines-azure)]/10 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)]">
                      Email Address
                    </p>
                    <p className="mt-3 break-all text-[1.15rem] font-medium text-[var(--interlines-slate)]">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-dashed border-[var(--interlines-azure)]/20 bg-white/60 p-5 text-sm leading-relaxed text-[var(--interlines-slate-soft)]">
                  Password changes now flow through the secure reset email process from the login screen.
                </div>
              </div>
            ) : (
              <div className="py-10 text-center">
                <p className="text-[15px] text-[var(--interlines-slate-soft)]">
                  Authentication error.
                </p>
              </div>
            )}
          </Card>

          <Card className="border border-[var(--interlines-azure)]/10 bg-white/80 p-8 shadow-[0_20px_50px_rgba(48,117,128,0.06)] backdrop-blur-md sm:p-10">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-azure)]">
                Travel Profile
              </p>
              <h3 className="mt-3 font-display text-[2rem] leading-tight text-[var(--interlines-slate)]">
                Passenger Details
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                These details remain in your member account and are used to prefill the Odysseus booking session.
              </p>
            </div>

            {success && (
              <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-800">
                {success}
              </div>
            )}

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            )}

            {form ? (
              <form onSubmit={onSave} className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <ProfileInput label="First Name">
                  <input
                    required
                    value={form.first_name}
                    onChange={(event) => updateField("first_name", event.target.value)}
                    className={inputClassName()}
                  />
                </ProfileInput>

                <ProfileInput label="Middle Name">
                  <input
                    value={form.middle_name}
                    onChange={(event) => updateField("middle_name", event.target.value)}
                    className={inputClassName()}
                  />
                </ProfileInput>

                <ProfileInput label="Last Name">
                  <input
                    required
                    value={form.last_name}
                    onChange={(event) => updateField("last_name", event.target.value)}
                    className={inputClassName()}
                  />
                </ProfileInput>

                <ProfileInput label="Email Address">
                  <input
                    value={user?.email ?? ""}
                    readOnly
                    className={`${inputClassName()} cursor-not-allowed bg-zinc-50 text-zinc-500`}
                  />
                </ProfileInput>

                <ProfileInput label="Title">
                  <select
                    value={form.title}
                    onChange={(event) => updateField("title", event.target.value)}
                    className={inputClassName()}
                  >
                    <option value="">Select title</option>
                    {titleOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </ProfileInput>

                <ProfileInput label="Gender">
                  <select
                    value={form.gender}
                    onChange={(event) => updateField("gender", event.target.value)}
                    className={inputClassName()}
                  >
                    <option value="">Select gender</option>
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </ProfileInput>

                <ProfileInput label="Date of Birth">
                  <input
                    type="date"
                    value={form.date_of_birth}
                    onChange={(event) => updateField("date_of_birth", event.target.value)}
                    className={inputClassName()}
                  />
                </ProfileInput>

                <div className="hidden md:block" />

                <ProfileInput label="Phone Country Code">
                  <input
                    value={form.phone_country_code}
                    onChange={(event) => updateField("phone_country_code", event.target.value)}
                    className={inputClassName()}
                    placeholder="971"
                    inputMode="numeric"
                  />
                </ProfileInput>

                <ProfileInput label="Phone Number">
                  <input
                    value={form.phone_number}
                    onChange={(event) => updateField("phone_number", event.target.value)}
                    className={inputClassName()}
                    placeholder="501234567"
                    inputMode="numeric"
                  />
                </ProfileInput>

                <ProfileInput label="Destination Phone Code">
                  <input
                    value={form.destination_phone_country_code}
                    onChange={(event) =>
                      updateField("destination_phone_country_code", event.target.value)
                    }
                    className={inputClassName()}
                    placeholder="1"
                    inputMode="numeric"
                  />
                </ProfileInput>

                <ProfileInput label="Destination Phone">
                  <input
                    value={form.destination_phone_number}
                    onChange={(event) =>
                      updateField("destination_phone_number", event.target.value)
                    }
                    className={inputClassName()}
                    placeholder="3055550199"
                    inputMode="numeric"
                  />
                </ProfileInput>

                <ProfileInput label="Address Line 1">
                  <input
                    value={form.address_line_1}
                    onChange={(event) => updateField("address_line_1", event.target.value)}
                    className={inputClassName()}
                  />
                </ProfileInput>

                <ProfileInput label="Address Line 2">
                  <input
                    value={form.address_line_2}
                    onChange={(event) => updateField("address_line_2", event.target.value)}
                    className={inputClassName()}
                  />
                </ProfileInput>

                <ProfileInput label="City">
                  <input
                    value={form.city}
                    onChange={(event) => updateField("city", event.target.value)}
                    className={inputClassName()}
                  />
                </ProfileInput>

                <ProfileInput label="State / Province">
                  <input
                    value={form.state}
                    onChange={(event) => updateField("state", event.target.value)}
                    className={inputClassName()}
                    placeholder="DXB or FL"
                  />
                </ProfileInput>

                <ProfileInput label="Country Code">
                  <input
                    value={form.country}
                    onChange={(event) => updateField("country", event.target.value)}
                    className={inputClassName()}
                    placeholder="AE"
                  />
                </ProfileInput>

                <ProfileInput label="Postal Code">
                  <input
                    value={form.postal_code}
                    onChange={(event) => updateField("postal_code", event.target.value)}
                    className={inputClassName()}
                  />
                </ProfileInput>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--interlines-azure)] px-8 text-[13px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_4px_15px_rgba(48,117,128,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--interlines-azure-deep)] disabled:pointer-events-none disabled:opacity-60"
                  >
                    {saving ? "Saving Profile..." : "Save Profile"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-10 text-center text-[15px] text-[var(--interlines-slate-soft)]">
                Loading editable profile...
              </div>
            )}
          </Card>
        </div>
      </Container>
    </div>
  );
}
