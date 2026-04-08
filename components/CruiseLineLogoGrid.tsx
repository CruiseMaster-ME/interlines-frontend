import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  return (
    <div className="flex w-full items-center justify-center">
      <div
        className={cn(
          "relative h-8 w-[8.1rem] origin-center sm:h-9 sm:w-[8.75rem]",
          item.logoClassName,
        )}
      >
        <Image
          src={item.logoSrc}
          alt={item.logoAlt ?? `${item.name} logo`}
          fill
          sizes="(min-width: 1280px) 9rem, (min-width: 640px) 8.75rem, 8.1rem"
          className="object-contain opacity-[0.9] transition duration-300 group-hover:opacity-100"
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
              "group flex h-[6.25rem] w-[10.75rem] items-center justify-center rounded-[1.55rem] border border-[var(--interlines-azure)]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(246,250,250,0.96)_100%)] px-4 py-3 shadow-[0_14px_32px_rgba(48,117,128,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--interlines-azure)]/30 hover:shadow-[0_20px_38px_rgba(48,117,128,0.14)] sm:h-[6.75rem] sm:w-[11.25rem]",
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
