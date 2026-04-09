import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { getLogoSizeVars } from "@/lib/logoSizing";
import type { CruiseLine } from "@/lib/siteContent";
import { cn } from "@/lib/ui";

type CruiseLineLogoProps = {
  line: CruiseLine;
  variant?: "card" | "detail";
  className?: string;
};

export default function CruiseLineLogo({
  line,
  variant = "card",
  className,
}: CruiseLineLogoProps) {
  const defaultLogoSizes =
    variant === "detail"
      ? {
          width: "8.35rem",
          widthSm: "9.4rem",
          height: "2.6rem",
          heightSm: "2.95rem",
        }
      : {
          width: "6.4rem",
          widthSm: "7.25rem",
          height: "2rem",
          heightSm: "2.25rem",
        };

  const logoSizeVars = getLogoSizeVars(line.logoClassName, defaultLogoSizes);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {line.logoSrc ? (
        <div
          style={logoSizeVars}
          className="relative origin-center h-[var(--logo-h)] w-[var(--logo-w)] sm:h-[var(--logo-h-sm)] sm:w-[var(--logo-w-sm)]"
        >
          <Image
            src={line.logoSrc}
            alt={line.logoAlt}
            fill
            sizes={variant === "detail" ? "(min-width: 1024px) 28rem, 85vw" : "(min-width: 1280px) 17rem, (min-width: 768px) 40vw, 75vw"}
            className="object-contain"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--interlines-azure)]/8 text-[var(--interlines-azure)]">
            <ImageIcon className="h-6 w-6" />
          </span>
          <p className="mt-4 font-display text-[1.35rem] leading-tight tracking-[-0.02em] text-[var(--interlines-slate)]">
            Logo not available
          </p>
        </div>
      )}
    </div>
  );
}
