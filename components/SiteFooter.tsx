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
    <footer className="relative overflow-hidden border-t border-[var(--interlines-azure-deep)] bg-[linear-gradient(180deg,var(--interlines-azure)_0%,var(--interlines-azure-deep)_100%)] pt-16 pb-12 text-white">
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-[300px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10 blur-[100px]" />
      <Container className="relative z-10 max-w-6xl px-5">
        <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-3 sm:gap-8">
          {footerColumns.map((column, index) => (
            <div
              key={column.title}
              className={[
                "flex w-fit max-w-full flex-col items-center text-center",
                index === 0
                  ? "sm:justify-self-start"
                  : index === footerColumns.length - 1
                    ? "sm:justify-self-end"
                    : "sm:justify-self-center",
                "sm:items-start sm:text-left",
              ].join(" ")}
            >
              <p className="mb-6 inline-block border-b border-white/18 pb-3 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[var(--interlines-gold-light)] sm:text-[0.7rem]">
                {column.title}
              </p>
              <div className="w-full space-y-4 text-[0.7rem] tracking-wider text-white/78 sm:text-[13px]">
                {column.links.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className="block transition-colors hover:text-[var(--interlines-gold-light)]"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center border-t border-white/10 pt-8">
          <p className="text-center text-[0.65rem] uppercase tracking-widest text-white/55 sm:text-[0.7rem]">
            © {new Date().getFullYear()} Interline Cruises Middle East. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
