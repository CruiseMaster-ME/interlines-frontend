"use client";

import Container from "@/components/Container";
import MemberSectionNav from "@/components/MemberSectionNav";
import { useSessionContext } from "@/components/SessionProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type WidgetState = "idle" | "loading" | "ready" | "error";

type OdysseusSearchConfig = {
  preferences: {
    languageId: string;
    siteItemId: string;
    sid1: string;
    sid2: string;
    referrer: string;
    resultWindowType: "_blank" | "_self" | "_top";
    showStateNCountryWithPorts: boolean;
    cruiseSearchFields: {
      basic: string[];
      advance: string[];
    };
  };
  siteSettings: {
    productType: "cruise";
    domain: string;
    numberOfCols: number;
    themeColor: string;
  };
  cruiseWidgetSettings: {
    widgetType: "single" | "multiple";
  };
};

declare global {
  interface Window {
    OVExploreInterlines?: OdysseusSearchConfig;
  }
}

const ODYSSEUS_SCRIPT_SRC =
  "https://contents.odysol.com/Content/WebApps/OdyVExplore/OVExplore.min.js";
const SEARCH_FORM_SETTINGS_NAME = "OVExploreInterlines";
const ODYSSEUS_SIID =
  process.env.NEXT_PUBLIC_ODYSSEUS_SIID ??
  process.env.NEXT_PUBLIC_ODYSSEUS_SITE_ITEM_ID ??
  "";
const ODYSSEUS_LANGUAGE_ID = process.env.NEXT_PUBLIC_ODYSSEUS_LANGUAGE_ID ?? "1";
const ODYSSEUS_DOMAIN = process.env.NEXT_PUBLIC_ODYSSEUS_DOMAIN ?? "ui.odysol.com";
const ODYSSEUS_SID1 = process.env.NEXT_PUBLIC_ODYSSEUS_SID1 ?? "";
const ODYSSEUS_SID2 = process.env.NEXT_PUBLIC_ODYSSEUS_SID2 ?? "";
const ODYSSEUS_REFERRER = process.env.NEXT_PUBLIC_ODYSSEUS_REFERRER ?? "";
const IS_WIDGET_CONFIGURED = ODYSSEUS_SIID.trim().length > 0;

function buildOdysseusConfig(): OdysseusSearchConfig {
  return {
    preferences: {
      languageId: ODYSSEUS_LANGUAGE_ID,
      siteItemId: ODYSSEUS_SIID,
      sid1: ODYSSEUS_SID1,
      sid2: ODYSSEUS_SID2,
      referrer: ODYSSEUS_REFERRER,
      resultWindowType: "_self",
      showStateNCountryWithPorts: true,
      cruiseSearchFields: {
        basic: ["destination", "sailingdate", "duration", "cruiseline"],
        advance: ["ship", "departureport", "cruisetypecheckbox", "packagetourscheckbox"],
      },
    },
    siteSettings: {
      productType: "cruise",
      domain: ODYSSEUS_DOMAIN,
      numberOfCols: 4,
      themeColor: "#f6fbfb|#307580|#1e293b|#ffffff",
    },
    cruiseWidgetSettings: {
      widgetType: "single",
    },
  };
}

function loadOdysseusScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.customElements.get("ody-search-form")) {
      resolve();
      return;
    }

    const existing = document.querySelector(
      `script[src="${ODYSSEUS_SCRIPT_SRC}"]`,
    ) as HTMLScriptElement | null;
    const script = existing ?? document.createElement("script");

    if (script.dataset.loaded === "true") {
      resolve();
      return;
    }

    const onLoad = () => {
      script.dataset.loaded = "true";
      cleanup();
      resolve();
    };

    const onError = () => {
      cleanup();
      reject(new Error("Unable to load Odysseus cruise search."));
    };

    const cleanup = () => {
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    };

    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);

    if (!existing) {
      script.src = ODYSSEUS_SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

function PreviewField({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.5rem] border border-[var(--interlines-azure)]/10 bg-white px-4 py-4 shadow-[0_10px_30px_rgba(48,117,128,0.05)] ${
        wide ? "sm:col-span-2 xl:col-span-1" : ""
      }`}
    >
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--interlines-azure)]">
        {label}
      </p>
      <p className="mt-3 text-sm font-medium text-[var(--interlines-slate-soft)]">
        {value}
      </p>
    </div>
  );
}

function SearchPreview() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-2">
        <PreviewField label="Destination" value="Search destinations" />
        <PreviewField label="Sailing Date" value="Select a date range" />
        <PreviewField label="Duration" value="Choose cruise length" />
        <PreviewField label="Cruise Line" value="Filter by preferred line" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
        <PreviewField label="Ship" value="Optional ship filter" />
        <PreviewField label="Departure Port" value="Choose a departure port" />
        <button
          type="button"
          disabled
          className="inline-flex h-full min-h-14 items-center justify-center rounded-[1.5rem] bg-[var(--interlines-azure)] px-7 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-white opacity-55"
        >
          Search
        </button>
      </div>

      <div className="rounded-[1.5rem] border border-dashed border-[var(--interlines-azure)]/18 bg-[var(--interlines-azure-light)]/60 px-5 py-4 text-sm leading-7 text-[var(--interlines-slate-soft)]">
        Live cruise inventory will mount here once the Odysseus SIID and supplier
        references are added.
      </div>
    </div>
  );
}

export default function CruiseSearchClient() {
  const router = useRouter();
  const { status, user } = useSessionContext();
  const formHostRef = useRef<HTMLDivElement | null>(null);
  const [widgetState, setWidgetState] = useState<WidgetState>(
    IS_WIDGET_CONFIGURED ? "loading" : "idle",
  );

  useEffect(() => {
    if (status === "guest") {
      router.replace("/login");
      return;
    }

    if (status === "admin") {
      router.replace("/admin");
      return;
    }

    if (status !== "user" || !IS_WIDGET_CONFIGURED) {
      return;
    }

    const host = formHostRef.current;
    if (!host) {
      return;
    }

    let cancelled = false;
    window.OVExploreInterlines = buildOdysseusConfig();

    loadOdysseusScript()
      .then(() => {
        if (cancelled) {
          return;
        }

        host.replaceChildren();

        const widget = document.createElement("ody-search-form");
        widget.setAttribute("search-form-settings", SEARCH_FORM_SETTINGS_NAME);
        host.appendChild(widget);
        setWidgetState("ready");
      })
      .catch(() => {
        if (!cancelled) {
          setWidgetState("error");
        }
      });

    return () => {
      cancelled = true;
      host.replaceChildren();
    };
  }, [router, status]);

  const firstName = user?.first_name?.trim() || "Member";

  return (
    <div className="min-h-screen bg-[var(--interlines-bg)] pb-24">
      <Container className="max-w-7xl px-5 pt-10 sm:pt-12">
        <MemberSectionNav />

        <div className="mt-8 grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
          <section className="rounded-[2.25rem] border border-[var(--interlines-azure)]/10 bg-white px-7 py-8 shadow-[0_20px_50px_rgba(48,117,128,0.06)] sm:px-8 sm:py-9">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--interlines-azure)]">
              Member Search
            </p>

            <h1 className="mt-4 font-display text-[2.3rem] leading-none tracking-[-0.03em] text-[var(--interlines-slate)] sm:text-[2.85rem]">
              Cruise Search
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-8 text-[var(--interlines-slate-soft)]">
              Welcome back, {firstName}. Use the live cruise search to scan sailings by
              destination, date, duration, cruise line and ship, then move into the
              booking flow when you are ready.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                "Clean search-first landing instead of the profile screen",
                "On-brand Odysseus form styling with Interlines colors",
                "Profile details stay separate and remain available for booking handoff",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[1.4rem] border border-[var(--interlines-azure)]/8 bg-[var(--interlines-azure-light)]/35 px-4 py-4"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--interlines-gold)]" />
                  <p className="text-sm leading-7 text-[var(--interlines-slate-soft)]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--interlines-azure)]/14 bg-white px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--interlines-slate)] transition hover:border-[var(--interlines-azure)] hover:bg-[var(--interlines-azure-light)] hover:text-[var(--interlines-azure)]"
              >
                Manage Profile
              </Link>
              <Link
                href="/booking"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--interlines-azure)] px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_rgba(48,117,128,0.18)] transition hover:bg-[var(--interlines-azure-deep)]"
              >
                Booking Access
              </Link>
            </div>
          </section>

          <section className="overflow-hidden rounded-[2.25rem] border border-[var(--interlines-azure)]/10 bg-white shadow-[0_20px_50px_rgba(48,117,128,0.06)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--interlines-azure)]/10 px-6 py-5 sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--interlines-azure)]">
                  Search Panel
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--interlines-slate-soft)]">
                  Option 10 adapted into the current Interlines theme with a lighter,
                  cleaner treatment.
                </p>
              </div>

              <span className="inline-flex items-center rounded-full border border-[var(--interlines-azure)]/12 bg-[var(--interlines-azure-light)]/60 px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--interlines-azure)]">
                {IS_WIDGET_CONFIGURED ? "Live Ready" : "Preview Mode"}
              </span>
            </div>

            <div className="px-6 py-6 sm:px-7 sm:py-7">
              {status === "loading" ? (
                <div className="flex min-h-[24rem] items-center justify-center rounded-[1.75rem] border border-dashed border-[var(--interlines-azure)]/18 bg-[var(--interlines-azure-light)]/35 px-6 text-center text-sm font-medium text-[var(--interlines-slate-soft)]">
                  Loading your member session...
                </div>
              ) : !IS_WIDGET_CONFIGURED ? (
                <SearchPreview />
              ) : widgetState === "error" ? (
                <div className="rounded-[1.75rem] border border-red-200 bg-red-50 px-5 py-5 text-sm leading-7 text-red-800">
                  The search library could not be loaded. The page is ready, but the
                  Odysseus script still needs to respond in the browser.
                </div>
              ) : (
                <div className="rounded-[1.75rem] border border-[var(--interlines-azure)]/10 bg-[linear-gradient(180deg,rgba(246,251,251,0.92),#ffffff)] p-4 sm:p-5">
                  {widgetState === "loading" ? (
                    <div className="mb-4 rounded-[1.4rem] border border-dashed border-[var(--interlines-azure)]/18 bg-[var(--interlines-azure-light)]/45 px-4 py-3 text-sm text-[var(--interlines-slate-soft)]">
                      Connecting the live cruise search...
                    </div>
                  ) : null}

                  <div
                    ref={formHostRef}
                    className="odysseus-search-host min-h-[23rem]"
                  />
                </div>
              )}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
