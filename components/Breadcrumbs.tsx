"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cruiseLines } from "@/lib/siteContent";

const routeLabels: Record<string, string> = {
  offers: "Special Offers",
  "cruise-lines": "Cruise Lines",
  faq: "FAQ",
  eligibility: "Eligibility",
  dashboard: "Dashboard",
  "privacy-policy": "Privacy Policy",
  "terms-and-conditions": "Terms & Conditions",
};

function humanizeSegment(segment: string) {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function Breadcrumbs() {
  return <BreadcrumbsInner variant="header" />;
}

export function BreadcrumbsInner({
  variant = "header",
}: {
  variant?: "header" | "page";
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  const items = [{ href: "/", label: "Home" }];
  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;

    const cruiseLine = cruiseLines.find((line) => line.slug === segment);

    items.push({
      href: currentPath,
      label: cruiseLine?.name ?? routeLabels[segment] ?? humanizeSegment(segment),
    });
  }

  const navClassName =
    variant === "header"
      ? "mb-6 flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.72rem] font-medium tracking-[0.16em] text-white/78 sm:mb-7"
      : "flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] font-medium tracking-[0.14em] text-[var(--interlines-slate-soft)]";

  const currentClassName =
    variant === "header"
      ? "uppercase text-[var(--interlines-gold-light)]"
      : "uppercase text-[var(--interlines-azure)]";

  const linkClassName =
    variant === "header"
      ? "uppercase transition-colors hover:text-white"
      : "uppercase transition-colors hover:text-[var(--interlines-azure)]";

  const iconClassName =
    variant === "header"
      ? "h-3.5 w-3.5 text-white/42"
      : "h-3.5 w-3.5 text-[var(--interlines-azure)]/35";

  return (
    <nav
      aria-label="Breadcrumb"
      className={navClassName}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.href} className="inline-flex items-center gap-2">
            {isLast ? (
              <span className={currentClassName}>{item.label}</span>
            ) : (
              <Link href={item.href} className={linkClassName}>
                {item.label}
              </Link>
            )}
            {!isLast && <ChevronRight className={iconClassName} />}
          </div>
        );
      })}
    </nav>
  );
}
