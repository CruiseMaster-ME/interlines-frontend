import { ImageIcon } from "lucide-react";
import Image from "next/image";
import CruiseLineLogo from "@/components/CruiseLineLogo";
import type { CruiseLine } from "@/lib/siteContent";
import { cn } from "@/lib/ui";

type CruiseLineVisualProps = {
  line: CruiseLine;
  variant?: "card" | "detail";
  className?: string;
};

const containerHeights = {
  card: "min-h-[13.5rem]",
  detail: "min-h-0",
} as const;

const imageInsets = {
  card: "p-0",
  detail: "p-0",
} as const;

const overlayStyles = {
  card: "right-3 top-3 px-2.5 py-2 sm:right-4 sm:top-4 sm:px-3 sm:py-2.5",
  detail: "right-3 top-3 px-2.5 py-2 sm:right-4 sm:top-4 sm:px-3 sm:py-2.5",
} as const;

export default function CruiseLineVisual({
  line,
  variant = "card",
  className,
}: CruiseLineVisualProps) {
  const visualSrc = line.imageSrc;
  const visualAlt = line.imageAlt;
  const hasVisual = Boolean(visualSrc);

  const foregroundImageClassName =
    variant === "card"
      ? "object-cover object-center transition-transform duration-[1.6s] group-hover:scale-[1.03]"
      : "object-contain object-left-center";

  return (
    <div
      className={cn(
        "group relative isolate",
        variant === "detail"
          ? "overflow-hidden rounded-[1.6rem] bg-white"
          : "overflow-hidden rounded-[1.5rem] bg-[var(--interlines-azure-deep)]",
        containerHeights[variant],
        className,
      )}
    >
      {hasVisual ? (
        <>
          {variant === "card" ? (
            <Image
              src={visualSrc}
              alt=""
              fill
              sizes="(min-width: 1280px) 20rem, (min-width: 768px) 42vw, 92vw"
              className="object-cover opacity-45 blur-sm scale-105"
            />
          ) : null}

          <div className={cn("absolute inset-0", imageInsets[variant])}>
            <div className="relative h-full w-full">
              <Image
                src={visualSrc}
                alt={visualAlt}
                fill
                sizes={
                  variant === "detail"
                    ? "(min-width: 1024px) 30rem, 92vw"
                    : "(min-width: 1280px) 20rem, (min-width: 768px) 42vw, 92vw"
                }
                className={foregroundImageClassName}
              />
            </div>
          </div>
        </>
      ) : variant === "detail" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(145deg,rgba(234,244,245,0.95)_0%,rgba(255,255,255,1)_100%)]">
          <div className="flex flex-col items-center justify-center px-6 text-center">
            {line.logoSrc ? (
              <CruiseLineLogo line={line} variant="detail" />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--interlines-azure)]/8 text-[var(--interlines-azure)]">
                <ImageIcon className="h-7 w-7" />
              </span>
            )}
            <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--interlines-azure)]/72 sm:text-[13px]">
              Image not available
            </p>
          </div>
        </div>
      ) : null}

      {variant === "card" ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,88,96,0.22)_0%,rgba(36,88,96,0.16)_35%,rgba(18,48,57,0.64)_100%)]" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/16" />

          <div
            className={cn(
              "absolute max-w-[calc(100%-1.5rem)] rounded-[1rem] border border-white/30 bg-white/88 shadow-[0_14px_28px_rgba(10,24,40,0.14)] backdrop-blur-sm",
              overlayStyles[variant],
            )}
          >
            <CruiseLineLogo line={line} variant="card" />
          </div>

          {!hasVisual ? (
            <div className="absolute bottom-3 left-3 rounded-full border border-white/16 bg-[var(--interlines-azure-deep)]/82 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/78 shadow-[0_10px_24px_rgba(8,20,24,0.2)] sm:bottom-4 sm:left-4">
              Image not available
            </div>
          ) : null}
        </>
      ) : (
        null
      )}
    </div>
  );
}
