/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import { Mouse } from "lucide-react";
import Container from "@/components/Container";
import CruiseLineShowcaseSection from "@/components/CruiseLineShowcaseSection";
import IntroSplitSection from "@/components/IntroSplitSection";
import StructuredDataScript from "@/components/StructuredDataScript";
import {
  homeEligibilityClosing,
  homeEligibilityParagraph,
  homeFamilyEligibilityParagraph,
  homeHeroSubtitle,
  homeIntroduction,
  homePartnerCruiseLinesParagraphs,
  partnerCruiseLines,
  programmeSteps,
  whoWeAreParagraphs,
  whyChooseUsParagraphs,
} from "@/lib/siteContent";
import { buildPageMetadata, buildWebPageStructuredData } from "@/lib/seo";
import { cn } from "@/lib/ui";

const HOME_TITLE = "Set Sail. This Time, It's Your Turn.";
const HOME_DESCRIPTION =
  "Exclusive discounted cruise fares for airline, travel, tourism and hospitality professionals across the Middle East.";

export const metadata: Metadata = buildPageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  image: "/assets/images/hero-bg.jpg",
});

const homeImages = {
  hero: "/assets/images/hero-bg.jpg",
  intro: "/assets/images/intro.png",
  how: "/assets/images/how.png",
  offers: "/assets/images/cruise-offers.jpg",
} as const;

import {
  SectionTitle,
  Pill,
} from "@/components/PremiumUI";

export default function HomePage() {
  const [introductionHeading, ...introductionBody] = homeIntroduction;
  const introductionHeadingBreak = ", ";
  const [
    introductionHeadingLead = introductionHeading,
    introductionHeadingTail,
  ] = introductionHeading.split(introductionHeadingBreak);

  return (
    <div className="bg-[var(--interlines-bg)] text-[var(--interlines-slate-soft)] selection:bg-[var(--interlines-azure)]/20 selection:text-[var(--interlines-azure-deep)] w-full overflow-hidden">
      <StructuredDataScript
        data={buildWebPageStructuredData({
          name: HOME_TITLE,
          description: HOME_DESCRIPTION,
          path: "/",
          image: "/assets/images/hero-bg.jpg",
        })}
      />

      {/* Hero Section */}
      <section className="relative isolate flex h-[100svh] min-h-[100svh] items-center overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-0 z-0 bg-[var(--interlines-azure-deep)]">
          <img
            src={homeImages.hero}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-[72%_60%] opacity-[0.72] scale-105 sm:object-[68%_60%] lg:object-[center_60%]"
            style={{ animation: "interlines-float 30s ease-out infinite" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(36,88,96,0.9)_0%,rgba(48,117,128,0.72)_34%,rgba(36,88,96,0.24)_62%,rgba(36,88,96,0.08)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--interlines-azure-deep)]/80 via-[var(--interlines-azure-deep)]/22 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[var(--interlines-azure-deep)]/92 via-[var(--interlines-azure)]/52 to-transparent sm:w-[82%] lg:w-[50%]" />
        </div>
        
        <div className="home-glow absolute left-[-12%] top-[16%] h-[280px] w-[280px] rounded-full bg-[var(--interlines-azure)]/18 blur-[90px] z-0 pointer-events-none sm:left-[-8%] sm:top-[12%] sm:h-[480px] sm:w-[480px] sm:blur-[120px]" />
        <div className="home-glow absolute right-[-10%] bottom-[2%] h-[240px] w-[240px] rounded-full bg-[var(--interlines-gold)]/12 blur-[85px] z-0 pointer-events-none sm:right-[-6%] sm:bottom-[-4%] sm:h-[420px] sm:w-[420px] sm:blur-[110px]" style={{ animationDelay: '2s' }} />

        <Container className="relative z-10 w-full px-5 pt-6 pb-24 sm:pt-20 sm:pb-32">
          <div className="home-reveal max-w-xl sm:max-w-2xl" style={{ animationDelay: "200ms" }}>
            <h1 className="font-display text-[2.9rem] leading-[1.02] tracking-[-0.03em] text-white sm:text-[5.2rem] lg:text-[7rem] drop-shadow-[0_8px_40px_rgba(16,24,40,0.22)]">
              Set Sail.{" "}
              <span className="whitespace-nowrap">This Time,</span>
              <span className="block pr-1 text-[var(--interlines-gold-light)] italic sm:pr-4">
                It&apos;s Your Turn.
              </span>
            </h1>
            <p className="mt-6 max-w-[22rem] text-base font-medium leading-relaxed text-white/90 sm:mt-8 sm:max-w-2xl sm:text-xl">
              {homeHeroSubtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-4 sm:mt-12">
              <Pill href="/#home-introduction" variant="white" className="w-full sm:w-auto">
                Explore More
              </Pill>
            </div>
          </div>
        </Container>

        <a
          href="#home-introduction"
          className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2.5 text-white/80 transition-colors duration-300 hover:text-white sm:bottom-7 sm:gap-3"
          aria-label="Scroll to introduction"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-white/6 shadow-[0_12px_30px_rgba(16,24,40,0.18)] backdrop-blur-md sm:h-14 sm:w-14">
            <Mouse className="h-5 w-5 animate-bounce" strokeWidth={1.8} />
          </span>
          <span className="h-8 w-px bg-gradient-to-b from-white/55 to-transparent sm:h-10" />
        </a>
      </section>

      {/* Introduction */}
      <IntroSplitSection
        id="home-introduction"
        title={
          introductionHeadingTail ? (
            <>
              {`${introductionHeadingLead}${introductionHeadingBreak.trimEnd()}`}
              <span className="block">{introductionHeadingTail}</span>
            </>
          ) : (
            introductionHeading
          )
        }
        paragraphs={introductionBody}
        imageSrc={homeImages.intro}
        imageAlt="Cruise experience for travel professionals"
      />

      {/* Who We Are */}
      <section className="relative overflow-hidden border-y border-[var(--interlines-azure)]/10 bg-white/65 py-16 sm:py-24">
        <div className="pointer-events-none absolute right-[-8%] top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-[var(--interlines-azure)]/8 blur-[150px]" />

        <Container className="relative z-10 grid gap-10 px-5 lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:gap-14">
          <div className="order-2 relative min-h-[280px] overflow-hidden rounded-[0_2rem_0_2rem] shadow-[0_24px_70px_rgba(48,117,128,0.12)] sm:min-h-[380px] sm:rounded-[0_2.5rem_0_2.5rem] lg:order-1 lg:min-h-[460px] lg:rounded-[0_3rem_0_3rem]">
            <img
              src={homeImages.how}
              alt="Travel professional on a cruise"
              className="absolute inset-0 h-full w-full object-cover object-[center_28%] opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--interlines-azure-deep)]/70 via-[var(--interlines-azure)]/12 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/16" />
          </div>

          <div className="order-1 max-w-xl lg:order-2 lg:pr-6">
            <SectionTitle>Who We Are</SectionTitle>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] sm:mt-8 sm:space-y-6 sm:text-[17px]">
              {whoWeAreParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-16 sm:py-24">
        <Container className="relative px-5 z-10">
          <div className="grid overflow-hidden rounded-[2rem_0_2rem_0] border border-[var(--interlines-azure)]/10 sm:rounded-[2.4rem_0_2.4rem_0] lg:grid-cols-[1fr_1fr] lg:rounded-[3rem_0_3rem_0]">
            <div className="bg-[linear-gradient(180deg,rgba(248,251,252,0.98),rgba(255,255,255,1))] px-5 py-8 sm:px-12 sm:py-14">
              <SectionTitle>Why Choose Us</SectionTitle>
              <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] sm:mt-10 sm:space-y-6 sm:text-[16px]">
                <p>{whyChooseUsParagraphs[0]}</p>
              </div>
            </div>

            <div className="relative overflow-hidden bg-[linear-gradient(160deg,rgba(36,88,96,1)_0%,rgba(48,117,128,0.96)_70%,rgba(64,145,156,0.92)_100%)] px-5 py-8 sm:px-12 sm:py-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_38%)]" />
              <div className="relative z-10">
                <div className="space-y-5 pt-2 text-[15px] leading-relaxed text-white/88 sm:space-y-6 sm:text-[16px]">
                  <p>{whyChooseUsParagraphs[1]}</p>
                  <p className="text-[var(--interlines-gold-light)]">{whyChooseUsParagraphs[2]}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How it Works */}
      <section className="relative overflow-hidden border-y border-[var(--interlines-gold-light)]/12 bg-[rgba(255,252,248,0.98)] py-16 sm:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--interlines-gold-light)]/22 to-transparent" />
        <div className="pointer-events-none absolute left-[-8%] top-10 h-[21rem] w-[21rem] rounded-full bg-[var(--interlines-gold-light)]/10 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-10%] bottom-0 h-[24rem] w-[24rem] rounded-full bg-white/55 blur-[125px]" />

        <Container className="relative z-10 px-5">
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <SectionTitle align="center">How the Programme Works</SectionTitle>
          </div>

          <div className="relative">
            <div className="grid gap-4 md:grid-cols-2 md:items-stretch md:gap-5 lg:grid-cols-4 lg:gap-4">
              {programmeSteps.map((step, index) => (
                <article
                  key={step}
                  className={cn(
                    "home-reveal group relative h-full overflow-hidden rounded-[1.7rem] border border-[var(--interlines-azure)]/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(247,250,251,0.98)_100%)] p-5 shadow-[0_18px_48px_rgba(48,117,128,0.08)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(48,117,128,0.14)] sm:p-6 lg:px-5 lg:py-4 xl:px-6 xl:py-4",
                  )}
                  style={{ animationDelay: `${80 + index * 120}ms` }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(48,117,128,0.08),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10 flex items-start gap-3.5 sm:gap-4 lg:flex-col lg:items-start lg:gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.95rem] border border-[var(--interlines-azure)]/16 bg-white text-[0.9rem] font-semibold tabular-nums text-[var(--interlines-azure)] shadow-[0_10px_24px_rgba(48,117,128,0.1)] sm:h-12 sm:w-12 sm:text-[0.95rem] lg:h-11 lg:w-11">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 pt-1 lg:pt-0">
                      <div className="mb-2.5 h-px w-12 bg-gradient-to-r from-[var(--interlines-gold-light)]/80 to-transparent lg:mb-2.5 lg:w-14" />
                      <p className="max-w-[34rem] text-[15px] leading-relaxed text-[var(--interlines-slate)] sm:text-[17px] lg:max-w-none lg:text-[15px] lg:leading-7 xl:text-[16px]">
                        {step}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Eligibility */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,250,250,0.98)_100%)] py-16 sm:py-24">
        <div className="pointer-events-none absolute left-[-6%] bottom-0 h-[20rem] w-[20rem] rounded-full bg-[var(--interlines-gold-light)]/10 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-8%] top-8 h-[24rem] w-[24rem] rounded-full bg-[var(--interlines-azure)]/7 blur-[135px]" />
        <Container className="px-5">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14">
            <div className="max-w-xl lg:pr-4">
              <div className="mb-6 h-px w-14 bg-gradient-to-r from-[var(--interlines-azure)] to-transparent sm:mb-8 sm:w-16" />
              <SectionTitle>Who Is Eligible</SectionTitle>
              <p className="mt-6 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] sm:mt-8 sm:text-[17px]">
                {homeEligibilityParagraph}
              </p>

              <div className="mt-8 border-l-2 border-[var(--interlines-gold)]/40 pl-5 sm:mt-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--interlines-slate)] sm:text-xs sm:tracking-[0.2em]">
                  Family Eligibility
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[15px]">
                  {homeFamilyEligibilityParagraph}
                </p>
              </div>

              <p className="mt-8 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] sm:mt-10 sm:text-[17px]">
                {homeEligibilityClosing}
              </p>

              <div className="mt-8 flex justify-stretch sm:mt-10 sm:justify-start">
                <Pill href="/request-access" variant="azure" className="w-full sm:w-auto">
                  Register Now
                </Pill>
              </div>
            </div>

            <div className="relative min-h-[26rem] overflow-hidden rounded-[0_2rem_0_2rem] shadow-[0_22px_60px_rgba(48,117,128,0.12)] sm:min-h-[32rem] sm:rounded-[0_2.5rem_0_2.5rem] lg:min-h-[35rem] lg:rounded-[0_3rem_0_3rem]">
              <img
                src={homeImages.offers}
                alt="Cruise holidays for the travel community"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--interlines-azure-deep)]/72 via-[var(--interlines-azure)]/16 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/16" />
            </div>
          </div>
        </Container>
      </section>

      {/* Partner Cruise Lines and Offers */}
      <CruiseLineShowcaseSection
        title="Partner Cruise Lines and Offers"
        paragraphs={homePartnerCruiseLinesParagraphs}
        items={partnerCruiseLines}
        kicker="Featured cruise lines include:"
        ctaHref="/offers"
        ctaLabel="View Offers"
      />
    </div>
  );
}
