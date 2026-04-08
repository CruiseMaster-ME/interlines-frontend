"use client";

import { useId, useState } from "react";
import { CheckList } from "@/components/PremiumUI";
import { faqItems } from "@/lib/siteContent";
import { cn } from "@/lib/ui";

function AccordionItem({
  question,
  paragraphs,
  listItems,
  afterListParagraphs,
  open,
  onToggle,
  panelId,
}: {
  question: string;
  paragraphs: readonly string[];
  listItems?: readonly string[];
  afterListParagraphs?: readonly string[];
  open: boolean;
  onToggle: () => void;
  panelId: string;
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-[var(--interlines-azure)]/10 bg-white/90 transition-shadow duration-300",
        open
          ? "shadow-[0_20px_50px_rgba(48,117,128,0.12)]"
          : "shadow-[0_10px_30px_rgba(48,117,128,0.05)] hover:shadow-[0_15px_40px_rgba(48,117,128,0.08)]",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-300",
          open &&
            "bg-[radial-gradient(circle_at_top_right,rgba(48,117,128,0.12),transparent_45%),linear-gradient(180deg,rgba(247,250,252,0.95),rgba(255,255,255,0.98))] opacity-100",
        )}
      />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="relative z-10 flex w-full items-start gap-4 px-6 py-5 text-left sm:px-8 sm:py-6"
      >
        <div className="min-w-0 flex-1">
          <h2
            className={cn(
              "font-display text-[1.45rem] leading-tight transition-colors duration-300 sm:text-[1.75rem]",
              open
                ? "text-[var(--interlines-azure-deep)]"
                : "text-[var(--interlines-slate)] group-hover:text-[var(--interlines-azure-deep)]",
            )}
          >
            {question}
          </h2>
        </div>

        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--interlines-azure)]/12 transition-[background-color,color,box-shadow] duration-300",
            open
              ? "bg-[var(--interlines-azure)] text-white shadow-[0_10px_25px_rgba(48,117,128,0.18)]"
              : "bg-white text-[var(--interlines-azure)]",
          )}
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-45")}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M10 4v12" />
            <path d="M4 10h12" />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="relative z-10 px-6 pb-6 sm:px-8 sm:pb-8">
            <div className="space-y-4 border-t border-[var(--interlines-azure)]/10 pt-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {listItems && (
                <div className="py-1">
                  <CheckList items={listItems} />
                </div>
              )}
              {afterListParagraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const id = useId();

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-[var(--interlines-azure)]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,251,252,0.96))] p-4 shadow-[0_20px_60px_rgba(48,117,128,0.08)] sm:p-6">
      <div className="absolute -left-24 top-0 h-56 w-56 rounded-full bg-[var(--interlines-azure)]/8 blur-[90px]" />
      <div className="absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-[var(--interlines-gold)]/10 blur-[80px]" />

      <div className="relative z-10 space-y-4">
        {faqItems.map((item, index) => (
          <AccordionItem
            key={item.question}
            question={item.question}
            paragraphs={item.paragraphs}
            listItems={item.listItems}
            afterListParagraphs={item.afterListParagraphs}
            open={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            panelId={`${id}-panel-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
