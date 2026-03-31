/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import { Mouse } from "lucide-react";
import Container from "@/components/Container";
import {
  currentCruiseOffers,
  eligibleOrganisations,
  homeIntroduction,
  memberBenefits,
  programmeSteps,
  registrationSteps,
  whoWeAreMemberActions,
  whoWeAreParagraphs,
  whyChooseUs,
} from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Home",
  description: "Exclusive cruise rates for Middle East travel professionals.",
};

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

  return (
    <div className="bg-[var(--interlines-bg)] text-[var(--interlines-slate-soft)] selection:bg-[var(--interlines-azure)]/20 selection:text-[var(--interlines-azure-deep)] w-full overflow-hidden">
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
              Set Sail. This Time,
              <span className="block pr-1 text-[var(--interlines-gold-light)] italic sm:pr-4">
                It&apos;s Your Turn.
              </span>
            </h1>
            <p className="mt-6 max-w-[22rem] text-base font-medium leading-relaxed text-white/90 sm:mt-8 sm:max-w-2xl sm:text-xl">
              Exclusive cruise rates for Middle East travel professionals.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 sm:mt-12">
              <Pill href="/offers" variant="white" className="w-full sm:w-auto">
                Explore Cruise Offers
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
      <section
        id="home-introduction"
        className="relative z-20 pt-16 pb-20 sm:pt-20 sm:pb-24"
      >
        <Container className="px-5">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="order-2 group relative min-h-[250px] overflow-hidden rounded-[2rem_0_2rem_0] shadow-[0_24px_65px_rgba(48,117,128,0.12)] sm:min-h-[360px] sm:rounded-[2.4rem_0_2.4rem_0] lg:order-1 lg:min-h-[460px] lg:rounded-[2.75rem_0_2.75rem_0]">
              <img
                src={homeImages.intro}
                alt="Cruise experience for travel professionals"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--interlines-azure-deep)]/52 via-[var(--interlines-azure)]/10 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/18" />
            </div>

            <div className="order-1 relative max-w-xl lg:order-2 lg:pl-4">
              <div className="mb-6 h-px w-14 bg-gradient-to-r from-[var(--interlines-gold)] to-transparent sm:mb-8 sm:w-16" />
              <SectionTitle>{introductionHeading}</SectionTitle>
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] sm:mt-8 sm:space-y-6 sm:text-[17px]">
                {introductionBody.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

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

            <div className="mt-10 sm:mt-12">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--interlines-slate)] sm:mb-6 sm:text-xs sm:tracking-[0.2em]">
                As a registered member, you can:
              </p>
              <div className="border-y border-[var(--interlines-azure)]/10">
                {whoWeAreMemberActions.map((item, index) => (
                  <div
                    key={item}
                    className={`flex items-start gap-4 py-4 sm:gap-5 sm:py-5 ${
                      index !== 0 ? "border-t border-[var(--interlines-azure)]/10" : ""
                    }`}
                  >
                    <span className="pt-0.5 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--interlines-azure)]/70 tabular-nums sm:text-[0.72rem] sm:tracking-[0.28em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[15px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us & Benefits */}
      <section className="relative py-16 sm:py-24">
        <Container className="relative px-5 z-10">
          <div className="grid overflow-hidden rounded-[2rem_0_2rem_0] border border-[var(--interlines-azure)]/10 sm:rounded-[2.4rem_0_2.4rem_0] lg:grid-cols-[1fr_1fr] lg:rounded-[3rem_0_3rem_0]">
            <div className="bg-[linear-gradient(180deg,rgba(248,251,252,0.98),rgba(255,255,255,1))] px-5 py-8 sm:px-12 sm:py-14">
              <SectionTitle>Why Choose Us</SectionTitle>
              <div className="mt-7 border-t border-[var(--interlines-azure)]/10 sm:mt-10">
                {whyChooseUs.map((item, index) => (
                  <div
                    key={item}
                    className={`flex items-start gap-4 py-4 sm:gap-5 sm:py-5 ${
                      index !== 0 ? "border-t border-[var(--interlines-azure)]/10" : ""
                    }`}
                  >
                    <span className="pt-0.5 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--interlines-azure)]/75 tabular-nums sm:text-[0.72rem] sm:tracking-[0.28em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[15px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden bg-[linear-gradient(160deg,rgba(36,88,96,1)_0%,rgba(48,117,128,0.96)_70%,rgba(64,145,156,0.92)_100%)] px-5 py-8 sm:px-12 sm:py-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_38%)]" />
              <div className="relative z-10">
                <SectionTitle invert>Benefits for Travel Industry Professionals</SectionTitle>
                <div className="mt-7 border-t border-white/12 sm:mt-10">
                  {memberBenefits.map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-start gap-4 py-4 sm:gap-5 sm:py-5 ${
                        index !== 0 ? "border-t border-white/12" : ""
                      }`}
                    >
                      <span className="pt-0.5 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--interlines-gold-light)]/90 tabular-nums sm:text-[0.72rem] sm:tracking-[0.28em]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[14px] leading-relaxed text-white/88 sm:text-[15px]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How it Works */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(232,242,244,0.6)_0%,rgba(250,250,250,0)_100%)]" />
        <Container className="relative px-5 z-10">
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <SectionTitle align="center">How the Programme Works</SectionTitle>
          </div>

          <div className="border-y border-[var(--interlines-azure)]/12">
            <div className="grid gap-px bg-[var(--interlines-azure)]/10 sm:grid-cols-2 xl:grid-cols-5">
              {programmeSteps.map((step, index) => (
                <article
                  key={step}
                  className="flex items-start gap-4 bg-[var(--interlines-bg)]/90 px-5 py-6 backdrop-blur-sm sm:px-7 sm:py-8 xl:block xl:px-7 xl:py-10"
                >
                  <span className="block text-[1.8rem] font-semibold leading-none tabular-nums text-[var(--interlines-azure)] sm:text-[2.25rem] xl:text-[3rem]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-0.5 max-w-none text-[14px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[15px] xl:mt-6 xl:max-w-[22ch]">
                    {step}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Eligibility & Offers */}
      <section className="relative py-16 sm:py-24">
        <Container className="px-5">
          <div className="grid gap-10 xl:grid-cols-[0.92fr_1.08fr] xl:items-start xl:gap-14">
            <div className="max-w-xl">
              <div className="mb-6 h-px w-14 bg-gradient-to-r from-[var(--interlines-azure)] to-transparent sm:mb-8 sm:w-16" />
              <SectionTitle>Who Is Eligible</SectionTitle>
              <p className="mt-6 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] sm:mt-8 sm:text-[17px]">
                You qualify if you are a current or former employee of a Middle East-based travel or hospitality organisation, including:
              </p>

              <div className="mt-8 border-y border-[var(--interlines-azure)]/10 sm:mt-10">
                {eligibleOrganisations.map((item, index) => (
                  <div
                    key={item}
                    className={`flex items-start gap-4 py-4 sm:gap-5 sm:py-5 ${
                      index !== 0 ? "border-t border-[var(--interlines-azure)]/10" : ""
                    }`}
                  >
                    <span className="pt-0.5 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--interlines-azure)]/75 tabular-nums sm:text-[0.72rem] sm:tracking-[0.28em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[15px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-l-2 border-[var(--interlines-gold)]/40 pl-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--interlines-slate)] sm:text-xs sm:tracking-[0.2em]">
                  Family Eligibility
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[15px]">
                  Spouse, children and parents may also travel at interline rates.
                </p>
              </div>
            </div>

            <div className="relative min-h-[26rem] overflow-hidden rounded-[0_2rem_0_2rem] shadow-[0_22px_60px_rgba(48,117,128,0.12)] sm:min-h-[32rem] sm:rounded-[0_2.5rem_0_2.5rem] xl:min-h-[35rem] xl:rounded-[0_3rem_0_3rem]">
              <img
                src={homeImages.offers}
                alt="Cruise dining and onboard offers"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.28]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,250,0.12)_0%,rgba(250,250,250,0.88)_40%,rgba(250,250,250,1)_100%)]" />

              <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-10 xl:p-12">
                <SectionTitle>Current Cruise Offers</SectionTitle>
                <p className="mt-4 text-[14px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[15px]">
                  New offers are added regularly across destinations and cruise lines.
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[15px]">
                  You may find:
                </p>

                <div className="mt-6 border-t border-[var(--interlines-azure)]/10 sm:mt-8">
                  {currentCruiseOffers.map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-start gap-4 py-4 sm:gap-5 sm:py-5 ${
                        index !== 0 ? "border-t border-[var(--interlines-azure)]/10" : ""
                      }`}
                    >
                      <span className="pt-0.5 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--interlines-azure)]/75 tabular-nums sm:text-[0.72rem] sm:tracking-[0.28em]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[14px] leading-relaxed text-[var(--interlines-slate-soft)] sm:text-[15px]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <Pill href="/offers" variant="azure" className="w-full sm:w-auto">
                    View Latest Offers
                  </Pill>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-y border-[var(--interlines-azure)]/10 bg-white/70 py-16 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[34rem] -translate-x-1/2 bg-gradient-to-b from-[var(--interlines-azure-light)]/45 to-transparent" />
        <Container className="relative px-5">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="max-w-md">
              <div className="mb-6 h-px w-14 bg-gradient-to-r from-[var(--interlines-gold)] to-transparent sm:mb-8 sm:w-16" />
              <SectionTitle>How to Register</SectionTitle>
            </div>

            <div className="grid gap-px bg-[var(--interlines-azure)]/10 sm:grid-cols-2 xl:grid-cols-4">
              {registrationSteps.map((step, index) => (
                <div key={step} className="bg-white/90 px-5 py-6 backdrop-blur-sm sm:px-6 sm:py-7">
                  <span className="block text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--interlines-azure)]/75 tabular-nums sm:text-[0.72rem] sm:tracking-[0.28em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-[14px] leading-relaxed text-[var(--interlines-slate-soft)] sm:mt-5 sm:text-[15px]">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-stretch sm:mt-10 sm:justify-center">
            <Pill href="/request-access" variant="azure" className="w-full sm:w-auto">
              Register for Access
            </Pill>
          </div>
        </Container>
      </section>

      {/* CTA Footer Section */}
      <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-20">
        <Container className="px-5">
          <div className="group isolate relative overflow-hidden rounded-[2.25rem] border border-[var(--interlines-azure)]/10 bg-[var(--interlines-azure)] shadow-[0_30px_60px_rgba(48,117,128,0.15)] sm:rounded-[3rem]">
            <img
              src={homeImages.hero}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-[center_58%] opacity-[0.35] mix-blend-luminosity z-0 group-hover:scale-105 transition-transform duration-[3s]"
            />
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[var(--interlines-azure)] to-[var(--interlines-azure)]/40 z-10" />

            <div className="relative z-20 max-w-4xl px-6 py-14 sm:p-24">
              <h2 className="font-display text-[2.1rem] leading-[1.05] tracking-[-0.03em] text-white drop-shadow-md sm:text-[4.5rem]">
                You&rsquo;ve spent your career helping others see the world.
                <span className="block py-2 text-[var(--interlines-gold-light)] italic mt-3 sm:mt-4">
                  Now it&rsquo;s your turn.
                </span>
              </h2>
              <p className="mt-6 max-w-[48ch] text-base font-light leading-relaxed text-white/90 sm:mt-8 sm:text-[17px]">
                Join Interline Cruises Middle East and access exclusive cruise rates reserved for the travel industry.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-5">
                <Pill href="/request-access" variant="white" className="w-full sm:w-auto">
                  Register Now
                </Pill>
                <Pill href="/login" variant="glass" className="w-full sm:w-auto">
                  Log In
                </Pill>
                <Pill href="/offers" variant="glass" className="w-full sm:w-auto">
                  Explore Cruise Offers
                </Pill>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
