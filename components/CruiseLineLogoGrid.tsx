import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getLogoSizeVars } from "@/lib/logoSizing";
import { cn } from "@/lib/ui";

export type CruiseLineLogoGridItem = {
  name: string;
  href: string;
  logoSrc?: string;
  logoAlt?: string;
  logoClassName?: string;
};

type CruiseLineLogoGridProps = {
  items: readonly CruiseLineLogoGridItem[];
  external?: boolean;
  wrapperClassName?: string;
  gridClassName?: string;
  tileClassName?: string;
};

function TileContent({ item }: { item: CruiseLineLogoGridItem }) {
  if (!item.logoSrc) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--interlines-azure)]/8 text-[var(--interlines-azure)]">
          <ImageIcon className="h-5 w-5" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--interlines-slate)]">
          {item.name}
        </span>
      </div>
    );
  }

  const logoSizeVars = getLogoSizeVars(item.logoClassName, {
    width: "7.8rem",
    widthSm: "8.7rem",
    height: "1.875rem",
    heightSm: "2.125rem",
  });

  return (
    <div className="flex w-full items-center justify-center">
      <div
        style={logoSizeVars}
        className="relative h-[var(--logo-h)] w-[var(--logo-w)] origin-center sm:h-[var(--logo-h-sm)] sm:w-[var(--logo-w-sm)]"
      >
        <Image
          src={item.logoSrc}
          alt={item.logoAlt ?? `${item.name} logo`}
          fill
          sizes="(min-width: 1280px) 8.7rem, (min-width: 640px) 7.8rem, 7.8rem"
          className="object-contain opacity-100 transition duration-300"
        />
      </div>
    </div>
  );
}

export default function CruiseLineLogoGrid({
  items,
  external = false,
  wrapperClassName,
  gridClassName,
  tileClassName,
}: CruiseLineLogoGridProps) {
  return (
    <div className={cn("mx-auto w-fit max-w-full", wrapperClassName)}>
      <div
        className={cn(
          "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3",
          gridClassName,
        )}
      >
        {items.map((item) => {
          const sharedProps = {
            className: cn(
              "group flex h-[7rem] w-[12rem] items-center justify-center rounded-[2rem] border border-[#d8e6ea] bg-[linear-gradient(180deg,rgba(255,255,255,0.985)_0%,rgba(252,253,253,0.98)_100%)] px-4 py-3.5 shadow-[0_14px_34px_rgba(173,197,204,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cddde2] hover:shadow-[0_20px_42px_rgba(173,197,204,0.26)] sm:h-[7.35rem] sm:w-[12.45rem] sm:px-5",
              tileClassName,
            ),
            "aria-label": `Open ${item.name}`,
          } as const;

          return external ? (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              {...sharedProps}
            >
              <TileContent item={item} />
            </a>
          ) : (
            <Link key={item.name} href={item.href} {...sharedProps}>
              <TileContent item={item} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
