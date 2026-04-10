import type { Metadata } from "next";
import Image from "next/image";
import CompactBreadcrumbs from "@/components/CompactBreadcrumbs";
import Container from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Pill } from "@/components/PremiumUI";
import StructuredDataScript from "@/components/StructuredDataScript";
import {
  buildBreadcrumbStructuredData,
  buildPageMetadata,
  buildWebPageStructuredData,
} from "@/lib/seo";

const ABOUT_TITLE = "About Us";
const ABOUT_DESCRIPTION =
  "Your gateway to exclusive interline cruise holidays across leading global cruise lines.";

export const metadata: Metadata = buildPageMetadata({
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  path: "/about",
  image: "/assets/images/how.png",
});

const aboutIntroParagraphs = [
  "Interline Cruises Middle East was built for the travel community, offering you the chance to enjoy the world from the comfort of a cruise holiday.",
  "If you work in the world of travel, you spend your days helping others explore the world. This platform gives you the chance to enjoy that same sense of discovery through exclusive interline rates on cruise holidays.",
  "We are the region’s first dedicated hub for industry only cruise discounts, giving verified travel and hospitality professionals access to genuine interline fares across leading global cruise lines. Once verified, you can explore ships, itineraries and destinations and book your cruise directly with your exclusive industry discount already applied.",
  "This is not a general travel site. It is a platform created specifically for the travel community, offering a secure, seamless and trusted way to enjoy cruise holidays that combine relaxation, entertainment and effortless exploration.",
] as const;

const whyWeExistLines = [
  "Because you spend your time helping others create memories.",
  "Because you deserve the chance to create your own.",
  "And because a cruise holiday is one of the most effortless, enjoyable ways to do it.",
] as const;

export default function AboutPage() {
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { label: "About Us" },
  ];
  const breadcrumbStructuredData = buildBreadcrumbStructuredData(
    [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about/" },
    ],
    "/about/",
  );

  return (
    <div className="min-h-screen bg-[var(--interlines-bg)] pb-24">
      <StructuredDataScript
        data={
          breadcrumbStructuredData
            ? [
                buildWebPageStructuredData({
                  name: ABOUT_TITLE,
                  description: ABOUT_DESCRIPTION,
                  path: "/about/",
                  image: "/assets/images/how.png",
                  type: "AboutPage",
                }),
                breadcrumbStructuredData,
              ]
            : buildWebPageStructuredData({
                name: ABOUT_TITLE,
                description: ABOUT_DESCRIPTION,
                path: "/about/",
                image: "/assets/images/how.png",
                type: "AboutPage",
              })
        }
      />

      <PageHeader
        title="Created for the Travel Professionals Who Bring Journeys to Life"
        backgroundImage="/assets/images/how.png"
        backgroundPosition="center 28%"
        showBreadcrumbs={false}
        subHeader={
          <div className="flex flex-col items-center gap-4 text-center sm:gap-5">
            <p className="max-w-2xl text-[15px] leading-7 text-white/92 sm:text-[16px] sm:leading-8">
              Your gateway to exclusive interline cruise holidays across leading global cruise lines.
            </p>
            <div>
              <Pill href="/request-access" variant="white">
                Start Your Access
              </Pill>
            </div>
          </div>
        }
      />

      <Container className="px-5 pt-10 sm:pt-12">
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.28fr)_minmax(15rem,0.62fr)] xl:items-stretch">
          <article className="relative overflow-hidden rounded-[2.75rem] border border-[var(--interlines-azure)]/12 bg-white p-8 shadow-[0_18px_58px_rgba(48,117,128,0.08)] sm:p-10 lg:p-12">
            <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(48,117,128,0.08)_0%,rgba(48,117,128,0)_100%)]" />
            <div className="relative z-10">
              <CompactBreadcrumbs items={breadcrumbItems} />
              <div className="mt-4 space-y-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[17px]">
                {aboutIntroParagraphs.slice(0, 2).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 h-px w-full bg-gradient-to-r from-[var(--interlines-gold)]/40 via-[var(--interlines-gold)]/16 to-transparent" />

              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[17px]">
                {aboutIntroParagraphs.slice(2).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>

          <div className="mx-auto w-full max-w-[20rem] xl:h-full xl:max-w-none">
            <div className="relative h-full overflow-hidden rounded-[2.4rem] border border-[var(--interlines-azure)]/12 bg-white p-3 shadow-[0_18px_48px_rgba(48,117,128,0.08)]">
              <div className="absolute inset-x-6 top-0 h-16 bg-[linear-gradient(180deg,rgba(48,117,128,0.09)_0%,rgba(48,117,128,0)_100%)]" />
              <div className="relative h-full min-h-[20rem] overflow-hidden rounded-[1.8rem]">
                <Image
                  src="/assets/images/intro.png"
                  alt="Travel lifestyle visual"
                  fill
                  sizes="(min-width: 1280px) 20rem, (min-width: 1024px) 24vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,44,49,0.02)_0%,rgba(20,44,49,0.14)_100%)]" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-[2.75rem] bg-[linear-gradient(180deg,var(--interlines-azure)_0%,var(--interlines-azure-deep)_100%)] px-8 py-8 text-white shadow-[0_24px_64px_rgba(36,88,96,0.22)] sm:px-10 sm:py-10 lg:px-12">
          <div className="max-w-5xl">
            <h2 className="font-display text-[1.85rem] leading-[0.98] tracking-[-0.03em] text-white sm:text-[2.35rem] lg:text-[2.7rem]">
              Powered by Cruise Master Middle East
            </h2>

            <div className="mt-6 space-y-4">
              <p className="text-[16px] leading-relaxed text-white/90 sm:text-[18px]">
                Interline Cruises Middle East is powered by{" "}
                <a
                  href="https://cruisemaster-me.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-white underline decoration-[var(--interlines-gold-light)]/72 underline-offset-4 transition-colors duration-300 hover:text-[var(--interlines-gold-light)]"
                >
                  Cruise Master Middle East
                </a>
                , one of the region’s leading cruise distribution specialists. With deep industry
                relationships and long standing partnerships with global cruise brands, Cruise Master
                Middle East ensures that every offer on this platform is authentic, up to date and
                sourced directly from the cruise lines.
              </p>
              <p className="text-[16px] leading-relaxed text-white/82 sm:text-[17px]">
                Their expertise in cruise operations, product knowledge and regional market needs
                allows us to deliver a reliable, industry compliant interline programme tailored to
                travel professionals across the Middle East.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <article className="relative overflow-hidden rounded-[2.75rem] border border-[var(--interlines-azure)]/12 bg-white p-8 shadow-[0_18px_56px_rgba(48,117,128,0.08)] sm:p-10 lg:p-12">
            <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(48,117,128,0.07)_0%,rgba(48,117,128,0)_100%)]" />
            <div className="relative z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--interlines-azure)]">
                Our Purpose
              </p>
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[16px]">
                <p>
                  Our purpose is simple: to give the people who make travel
                  possible the chance to enjoy it themselves. To offer access
                  to cruise holidays that feel effortless from the moment you
                  book. And to ensure your industry status unlocks real value
                  on the kind of holidays that let you truly switch off.
                </p>
              </div>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[2.75rem] border border-[var(--interlines-gold)]/18 bg-[linear-gradient(135deg,rgba(255,249,238,0.95)_0%,rgba(247,251,252,0.96)_100%)] p-8 shadow-[0_14px_40px_rgba(71,117,128,0.06)] sm:p-10 lg:p-12">
            <div className="relative z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--interlines-azure)]">
                What We Offer
              </p>
              <p className="mt-6 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[16px]">
                Interline Cruises Middle East brings together exclusive
                interline cruise fares, secure verification, direct booking and
                a curated selection of cruise lines and itineraries.
              </p>

              <p className="mt-4 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[16px]">
                Your access extends to your family and friends, making it
                easier than ever to share the experience of a rewarding holiday
                at sea.
              </p>
            </div>
          </article>
        </section>

        <section className="mt-8 overflow-hidden rounded-[2.75rem] border border-[var(--interlines-gold)]/20 bg-white px-8 py-8 shadow-[0_18px_50px_rgba(195,151,71,0.08)] sm:px-10 sm:py-10 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--interlines-azure)]">
              Why We Exist
            </p>
            <div className="mt-6 space-y-4">
              {whyWeExistLines.map((line) => (
                <div
                  key={line}
                  className="rounded-[1.75rem] border border-[var(--interlines-gold)]/16 bg-[linear-gradient(180deg,rgba(255,249,240,0.84)_0%,rgba(255,255,255,1)_100%)] px-5 py-5"
                >
                  <p className="font-display text-[1.45rem] leading-[1.12] tracking-[-0.03em] text-[var(--interlines-slate)] sm:text-[1.75rem]">
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
