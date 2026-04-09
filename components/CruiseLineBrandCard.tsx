import CruiseLineLogo from "@/components/CruiseLineLogo";
import type { CruiseLine } from "@/lib/siteContent";
import { cn } from "@/lib/ui";

type CruiseLineBrandCardProps = {
  line: CruiseLine | null;
  fallbackLabel?: string;
  className?: string;
};

export default function CruiseLineBrandCard({
  line,
  fallbackLabel = "Cruise Line",
  className,
}: CruiseLineBrandCardProps) {
  return (
    <div
      className={cn(
        "flex w-fit max-w-full rounded-[1.35rem] border border-[var(--interlines-azure)]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,250,251,0.94)_100%)] px-5 py-4 shadow-[0_12px_28px_rgba(48,117,128,0.06)]",
        className,
      )}
    >
      <div className="inline-flex w-fit max-w-full items-center">
        {line ? (
          <CruiseLineLogo
            line={line}
            variant="detail"
            className="justify-start"
          />
        ) : (
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--interlines-slate-soft)]">
            {fallbackLabel}
          </p>
        )}
      </div>
    </div>
  );
}
