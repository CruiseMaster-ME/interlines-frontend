import Image from "next/image";
import type { ReactNode } from "react";
import Container from "@/components/Container";
import { SectionTitle } from "@/components/PremiumUI";
import { cn } from "@/lib/ui";

type IntroSplitSectionProps = {
  title: ReactNode;
  paragraphs: readonly string[];
  imageSrc: string;
  imageAlt: string;
  id?: string;
  sectionClassName?: string;
  containerClassName?: string;
  gridClassName?: string;
  contentClassName?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  imageSizes?: string;
};

export default function IntroSplitSection({
  title,
  paragraphs,
  imageSrc,
  imageAlt,
  id,
  sectionClassName,
  containerClassName,
  gridClassName,
  contentClassName,
  imageWrapperClassName,
  imageClassName,
  imageSizes = "(min-width: 1024px) 30rem, 92vw",
}: IntroSplitSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative z-20 pt-16 pb-20 sm:pt-20 sm:pb-24",
        sectionClassName,
      )}
    >
      <Container className={cn("px-5", containerClassName)}>
        <div className="mb-10 max-w-4xl lg:mb-12">
          <div className="mb-6 h-px w-14 bg-gradient-to-r from-[var(--interlines-gold)] to-transparent sm:mb-8 sm:w-16" />
          <SectionTitle>{title}</SectionTitle>
        </div>

        <div
          className={cn(
            "grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-stretch lg:gap-12",
            gridClassName,
          )}
        >
          <div className={cn("relative order-1 max-w-none lg:pl-2", contentClassName)}>
            <div className="space-y-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] sm:space-y-6 sm:text-[17px]">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "group relative order-2 min-h-[240px] overflow-hidden rounded-[2rem_0_2rem_0] shadow-[0_24px_65px_rgba(48,117,128,0.12)] sm:min-h-[320px] sm:rounded-[2.4rem_0_2.4rem_0] lg:h-full lg:min-h-0 lg:rounded-[2.75rem_0_2.75rem_0]",
              imageWrapperClassName,
            )}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes={imageSizes}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105",
                imageClassName,
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--interlines-azure-deep)]/52 via-[var(--interlines-azure)]/10 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/18" />
          </div>
        </div>
      </Container>
    </section>
  );
}
