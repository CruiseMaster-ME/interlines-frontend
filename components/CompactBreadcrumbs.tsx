import { ChevronRight } from "lucide-react";
import Link from "next/link";

type CompactBreadcrumbItem = {
  label: string;
  href?: string;
};

type CompactBreadcrumbsProps = {
  items: CompactBreadcrumbItem[];
  className?: string;
};

export default function CompactBreadcrumbs({
  items,
  className = "",
}: CompactBreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--interlines-slate-soft)] ${className}`.trim()}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={`${item.label}-${index}`} className="inline-flex max-w-full items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="truncate transition-colors hover:text-[var(--interlines-azure)]"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "truncate text-[var(--interlines-azure)]" : "truncate"}>
                {item.label}
              </span>
            )}
            {!isLast ? (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[var(--interlines-azure)]/35" />
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
