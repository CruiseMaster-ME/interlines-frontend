import { ImageIcon } from "lucide-react";
import Image from "next/image";
import type { CruiseLine } from "@/lib/siteContent";
import { cn } from "@/lib/ui";

type CruiseLineLogoProps = {
  line: CruiseLine;
  variant?: "card" | "detail";
  className?: string;
};

const logoSizes = {
  card: "h-[2rem] w-[6.4rem] sm:h-[2.25rem] sm:w-[7.25rem]",
  detail: "h-[2.6rem] w-[8.35rem] sm:h-[2.95rem] sm:w-[9.4rem]",
} as const;

export default function CruiseLineLogo({
  line,
  variant = "card",
  className,
}: CruiseLineLogoProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {line.logoSrc ? (
        <div className={cn("relative origin-center", logoSizes[variant], line.logoClassName)}>
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
            Image Coming Soon
          </p>
        </div>
      )}
    </div>
  );
}
