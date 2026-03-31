import Link from "next/link";
import Container from "@/components/Container";
import { legalNav, primaryNav } from "@/lib/siteContent";

const footerColumns = [
  {
    title: "Explore",
    links: primaryNav,
  },
  {
    title: "Member Access",
    links: [
      { href: "/offers", label: "Cruise Offers" },
      { href: "/login", label: "Log In" },
      { href: "/request-access", label: "Register" },
    ],
  },
  {
    title: "Legal",
    links: legalNav,
  },
] as const;

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--interlines-azure)]/10 bg-[var(--interlines-bg)] pt-16 pb-12">
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-[300px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[var(--interlines-azure)]/5 blur-[100px]" />
      <Container className="relative z-10 max-w-6xl px-5">
        <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-3 sm:text-left">
          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col items-center sm:items-start">
              <p className="mb-6 inline-block border-b border-[var(--interlines-azure)]/20 pb-3 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[var(--interlines-slate)] sm:text-[0.7rem]">
                {column.title}
              </p>
              <div className="space-y-4 text-[0.7rem] tracking-wider text-[var(--interlines-slate-soft)] sm:text-[13px]">
                {column.links.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className="block transition-colors hover:text-[var(--interlines-azure)]"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center border-t border-[var(--interlines-slate)]/5 pt-8">
          <p className="text-center text-[0.65rem] uppercase tracking-widest text-[var(--interlines-slate-soft)]/60 sm:text-[0.7rem]">
            © {new Date().getFullYear()} Interline Cruises Middle East. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
