import { cn } from "@/lib/ui";

export default function BrandMark({
  inverse = false,
  showRules = false,
}: {
  inverse?: boolean;
  showRules?: boolean;
}) {
  const topTone = inverse ? "text-white drop-shadow-md" : "text-[var(--interlines-azure)]";
  const bottomTone = inverse
    ? "text-[var(--interlines-gold-light)] drop-shadow-sm"
    : "text-[var(--interlines-slate)]";
  const accentTone = inverse
    ? "bg-[var(--interlines-gold-light)]/55"
    : "bg-[var(--interlines-gold)]/55";

  const mark = (
    <span className="inline-flex flex-col items-start text-left leading-none">
      <span className={cn("mb-2 h-px w-8", accentTone)} />
      <span className="inline-flex flex-col items-start text-left leading-none">
        <span
          className={cn(
            "font-brand text-[0.7rem] font-semibold uppercase tracking-[0.3em] sm:text-[0.9rem]",
            topTone,
          )}
        >
          Interline Cruises
        </span>
        <span
          className={cn(
            "mt-1.5 text-[0.66rem] font-bold uppercase tracking-[0.26em] sm:text-[0.78rem]",
            bottomTone,
          )}
        >
          Middle East
        </span>
      </span>
    </span>
  );

  if (!showRules) {
    return mark;
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--interlines-azure)]/30" />
      {mark}
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--interlines-azure)]/30" />
    </div>
  );
}
