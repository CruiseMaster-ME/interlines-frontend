import Link from "next/link";
import Container from "@/components/Container";
import CruiseLineLogoGrid, {
  type CruiseLineLogoGridItem,
} from "@/components/CruiseLineLogoGrid";
import { SectionTitle } from "@/components/PremiumUI";
import { cn } from "@/lib/ui";

type CruiseLineShowcaseSectionProps = {
  title?: string;
  titleClassName?: string;
  paragraphs: readonly string[];
  items: readonly CruiseLineLogoGridItem[];
  kicker?: string;
  ctaHref?: string;
  ctaLabel?: string;
  external?: boolean;
  sectionClassName?: string;
  containerClassName?: string;
};

export default function CruiseLineShowcaseSection({
  title,
  titleClassName,
  paragraphs,
  items,
  kicker,
  ctaHref,
  ctaLabel,
  external = false,
  sectionClassName,
  containerClassName,
}: CruiseLineShowcaseSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-y border-[var(--interlines-azure)]/10 bg-[linear-gradient(180deg,rgba(248,251,252,0.78)_0%,rgba(255,255,255,0.96)_100%)] pt-16 pb-12 sm:pt-24 sm:pb-20",
        sectionClassName,
      )}
    >
      <div className="pointer-events-none absolute left-[-10%] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[var(--interlines-azure)]/6 blur-[140px]" />
      <Container className={cn("relative z-10 px-5", containerClassName)}>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.25fr] lg:items-start lg:gap-12">
          <div className="order-2 lg:order-2">
            <div className="mx-auto w-fit max-w-full lg:ml-auto lg:mr-0">
              {kicker ? (
                <p className="mb-6 text-left text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--interlines-azure)]/70 sm:text-[13px]">
                  {kicker}
                </p>
              ) : null}
              <CruiseLineLogoGrid items={items} external={external} />
            </div>
          </div>

          <div className="order-1 max-w-none lg:order-1 lg:max-w-xl">
            {title ? (
              <SectionTitle sizeClassName={titleClassName}>{title}</SectionTitle>
            ) : null}
            <div className={cn("space-y-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[17px]", title ? "mt-6 sm:mt-8" : "")}>
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {ctaHref && ctaLabel ? (
              <Link
                href={ctaHref}
                className="mt-8 inline-flex text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--interlines-azure)] underline decoration-[var(--interlines-azure)]/35 underline-offset-[0.5rem] transition-colors hover:text-[var(--interlines-azure-deep)] hover:decoration-[var(--interlines-azure-deep)] sm:mt-10 sm:text-[13px]"
              >
                {ctaLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
