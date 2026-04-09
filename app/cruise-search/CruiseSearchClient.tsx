"use client";

import Container from "@/components/Container";
import { useSessionContext } from "@/components/SessionProvider";
import {
  ODYSSEUS_DOMAIN,
  ODYSSEUS_LANGUAGE_ID,
  ODYSSEUS_REFERRER,
  ODYSSEUS_SID1,
  ODYSSEUS_SID2,
  ODYSSEUS_SITE_ITEM_ID,
} from "@/lib/odysseus";
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
    showStateNCountryWithPorts?: boolean;
    cruiseSearchFields: {
      basic: string[];
      advance: string[];
    };
  };
  siteSettings: {
    productType: "cruise";
    domain: string;
    numberOfCols?: number;
    themeColor: string;
  };
  cruiseWidgetSettings?: {
    widgetType: "single" | "multiple";
  };
  cruiseSearchSettings?: {
    cruiselineFilter?: string;
    cruiselinePriority?: string;
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
const ODYSSEUS_CRUISELINE_FILTER = "6,8224,8,7,12,16,14,8116,2,1,8138,8121";
const IS_WIDGET_CONFIGURED = ODYSSEUS_SITE_ITEM_ID.trim().length > 0;

function buildOdysseusConfig(): OdysseusSearchConfig {
  return {
    preferences: {
      languageId: ODYSSEUS_LANGUAGE_ID,
      siteItemId: ODYSSEUS_SITE_ITEM_ID,
      sid1: ODYSSEUS_SID1,
      sid2: ODYSSEUS_SID2,
      referrer: ODYSSEUS_REFERRER,
      resultWindowType: "_blank",
      showStateNCountryWithPorts: true,
      cruiseSearchFields: {
        basic: ["destination", "sailingdate", "duration", "cruiseline"],
        advance: ["ship", "departureport", "cruisetypecheckbox", "packagetourscheckbox"],
      },
    },
    siteSettings: {
      productType: "cruise",
      domain: ODYSSEUS_DOMAIN,
      numberOfCols: 6,
      themeColor: "#ffffff|#307580|#475569|#ffffff",
    },
    cruiseSearchSettings: {
      cruiselineFilter: ODYSSEUS_CRUISELINE_FILTER,
      cruiselinePriority: ODYSSEUS_CRUISELINE_FILTER,
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

export default function CruiseSearchClient() {
  const router = useRouter();
  const { status } = useSessionContext();
  const formHostRef = useRef<HTMLDivElement | null>(null);
  const [widgetState, setWidgetState] = useState<WidgetState>(
    IS_WIDGET_CONFIGURED ? "loading" : "idle",
  );

  useEffect(() => {
    if (status === "guest") {
      router.replace("/login");
      return;
    }

    if ((status !== "user" && status !== "admin") || !IS_WIDGET_CONFIGURED) {
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

  return (
    <div className="min-h-screen bg-[var(--interlines-bg)] pb-24">
      <Container className="max-w-6xl px-5 pt-10 sm:pt-12">
        <section className="relative z-0 overflow-hidden rounded-[2.25rem] border border-[var(--interlines-azure)]/10 bg-white shadow-[0_20px_50px_rgba(48,117,128,0.06)]">
          <div className="px-4 py-4 sm:px-6 sm:py-6">
            {status === "loading" ? (
              <div className="flex min-h-[24rem] items-center justify-center rounded-[1.75rem] border border-dashed border-[var(--interlines-azure)]/18 bg-[var(--interlines-azure-light)]/35 px-6 text-center text-sm font-medium text-[var(--interlines-slate-soft)]">
                Loading your member session...
              </div>
            ) : widgetState === "error" ? (
              <div className="rounded-[1.75rem] border border-red-200 bg-red-50 px-5 py-5 text-sm leading-7 text-red-800">
                The Odysseus cruise search could not be loaded. The page is ready, but the
                widget script did not respond in the browser.
              </div>
            ) : (
              <div className="relative isolate z-0 rounded-[1.75rem] border border-[var(--interlines-azure)]/10 bg-white p-3 sm:p-4">
                {widgetState === "loading" ? (
                  <div className="mb-4 rounded-[1.4rem] border border-dashed border-[var(--interlines-azure)]/18 bg-[var(--interlines-azure-light)]/45 px-4 py-3 text-sm text-[var(--interlines-slate-soft)]">
                    Connecting the live cruise search...
                  </div>
                ) : null}

                <div id="option-ten" className="relative isolate z-0">
                  <div id="odysseus" className="relative isolate z-0">
                    <div id="OVExploreContainer" className="relative isolate z-0">
                      <div
                        ref={formHostRef}
                        className="odysseus-search-host odysseus-option-10 relative isolate z-0 min-h-[23rem]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </Container>
    </div>
  );
}
