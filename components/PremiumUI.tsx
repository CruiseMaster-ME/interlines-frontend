import Link from "next/link";
import React from "react";

export function SectionTitle({
  children,
  highlight,
  align = "left",
  invert = false,
}: {
  children: React.ReactNode;
  highlight?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div className={`mb-6 ${align === "center" ? "text-center mx-auto" : ""}`}>
      <h2 className={`font-display text-[2.25rem] leading-[1.06] tracking-[-0.03em] sm:text-[3rem] ${invert ? "text-white" : "text-[var(--interlines-slate)]"}`}>
        {children}
      </h2>
      {highlight && (
        <span className={`font-display text-[2rem] sm:text-[2.75rem] italic block mt-1 ${invert ? "text-[var(--interlines-gold)]" : "text-[var(--interlines-azure)]"}`}>
          {highlight}
        </span>
      )}
    </div>
  );
}

export function CheckItem({ children, invert = false }: { children: React.ReactNode, invert?: boolean }) {
  const iconColor = invert ? "text-white" : "text-[var(--interlines-azure)]";
  const bgColor = invert ? "bg-white/10 ring-white/30 group-hover:bg-white/20" : "bg-[var(--interlines-azure)]/5 ring-[var(--interlines-azure)]/20 group-hover:bg-[var(--interlines-azure)]/10";
  const textColor = invert ? "text-white/90 group-hover:text-white" : "text-[var(--interlines-slate-soft)] group-hover:text-[var(--interlines-slate)]";

  return (
    <li className="flex items-start gap-4 text-[15px] leading-[1.75] group">
      <div className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 transition-all duration-300 group-hover:scale-110 ${bgColor}`}>
        <svg
          viewBox="0 0 14 14"
          fill="none"
          className={`h-3 w-3 ${iconColor}`}
        >
          <path
            d="M3.5 7L6 9.5L10.5 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className={`transition-colors duration-300 ${textColor}`}>
        {children}
      </span>
    </li>
  );
}

export function CheckList({ items, invert = false }: { items: readonly string[], invert?: boolean }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <CheckItem key={item} invert={invert}>{item}</CheckItem>
      ))}
    </ul>
  );
}

export function StepList({ items }: { items: readonly string[] }) {
  return (
    <ol className="space-y-5">
      {items.map((item, index) => (
        <li key={item} className="flex items-start gap-5 group">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold tabular-nums ring-1 ring-[var(--interlines-azure)]/20 text-[var(--interlines-azure)] shadow-[0_4px_10px_rgba(48,117,128,0.1)] group-hover:bg-[var(--interlines-azure)] group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:ring-[var(--interlines-azure)]">
            {index + 1}
          </span>
          <span className="text-[15px] leading-[1.75] text-[var(--interlines-slate-soft)] group-hover:text-[var(--interlines-slate)] transition-colors duration-300">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function Pill({
  href,
  children,
  variant = "azure",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "azure" | "glass" | "white";
  className?: string;
}) {
  const cls = {
    azure: "bg-[var(--interlines-azure)] text-white hover:bg-[var(--interlines-azure-deep)] shadow-[0_4px_15px_rgba(48,117,128,0.25)]",
    glass: "glass-panel text-[var(--interlines-azure)] border border-[var(--interlines-azure)]/10 hover:border-[var(--interlines-azure)] hover:bg-[var(--interlines-azure-light)]",
    white: "bg-white text-[var(--interlines-azure)] hover:bg-[var(--interlines-bg)] shadow-md",
  }[variant];

  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-center rounded-full px-8 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 ${cls} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Card({
  children,
  className = "",
  invert = false,
}: {
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
}) {
  const base = invert ? "bg-[var(--interlines-azure)] text-white border border-[var(--interlines-azure-deep)] shadow-lg" : "bg-white border border-[var(--interlines-azure)]/5 shadow-[0_10px_40px_rgba(48,117,128,0.06)]";
  return (
    <div className={`rounded-[2.5rem] p-8 sm:p-12 ${base} flex flex-col justify-start ${className}`}>
      {children}
    </div>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative z-20 flex w-full justify-center py-4 sm:py-5 ${className}`}>
      <div className="h-px w-48 bg-gradient-to-r from-transparent via-[var(--interlines-azure)]/22 to-transparent shadow-[0_4px_10px_rgba(48,117,128,0.08)]" />
    </div>
  );
}
