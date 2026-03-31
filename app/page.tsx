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
  CheckList,
  Pill,
  Card,
  Divider,
} from "@/components/PremiumUI";

export default function HomePage() {
  const [introductionHeading, ...introductionBody] = homeIntroduction;

  return (
    <div className="bg-[var(--interlines-bg)] text-[var(--interlines-slate-soft)] selection:bg-[var(--interlines-azure)]/20 selection:text-[var(--interlines-azure-deep)] w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative isolate flex h-[100svh] min-h-[100svh] items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 bg-[var(--interlines-azure-deep)]">
          <img
            src={homeImages.hero}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-[68%_60%] opacity-[0.72] scale-105 lg:object-[center_60%]"
            style={{ animation: "interlines-float 30s ease-out infinite" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(36,88,96,0.9)_0%,rgba(48,117,128,0.72)_34%,rgba(36,88,96,0.24)_62%,rgba(36,88,96,0.08)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--interlines-azure-deep)]/80 via-[var(--interlines-azure-deep)]/22 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[var(--interlines-azure-deep)]/92 via-[var(--interlines-azure)]/52 to-transparent sm:w-[82%] lg:w-[50%]" />
        </div>
        
        <div className="home-glow absolute left-[-8%] top-[12%] h-[480px] w-[480px] rounded-full bg-[var(--interlines-azure)]/18 blur-[120px] z-0 pointer-events-none" />
        <div className="home-glow absolute right-[-6%] bottom-[-4%] h-[420px] w-[420px] rounded-full bg-[var(--interlines-gold)]/12 blur-[110px] z-0 pointer-events-none" style={{ animationDelay: '2s' }} />

        <Container className="relative z-10 px-5 w-full pt-10 pb-24 sm:pt-20 sm:pb-32">
          <div className="home-reveal max-w-2xl" style={{ animationDelay: "200ms" }}>
            <h1 className="font-display text-[4rem] leading-[1.05] tracking-[-0.02em] text-white sm:text-[6rem] lg:text-[7rem] drop-shadow-[0_8px_40px_rgba(16,24,40,0.22)]">
              Set Sail. This Time,
              <span className="block text-[var(--interlines-gold-light)] italic pr-4">
                It&apos;s Your Turn.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-white/90 sm:text-xl">
              Exclusive cruise rates for Middle East travel professionals.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Pill href="/offers" variant="white">
                Explore Cruise Offers
              </Pill>
            </div>
          </div>
        </Container>

        <a
          href="#home-introduction"
          className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-white/80 transition-colors duration-300 hover:text-white"
          aria-label="Scroll to introduction"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/18 bg-white/6 shadow-[0_12px_30px_rgba(16,24,40,0.18)] backdrop-blur-md">
            <Mouse className="h-5 w-5 animate-bounce" strokeWidth={1.8} />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-[var(--interlines-gold-light)]">
            Scroll
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-white/55 to-transparent" />
        </a>
      </section>

      {/* Introduction */}
      <section
        id="home-introduction"
        className="relative z-20 pt-16 pb-20 sm:pt-20 sm:pb-24"
      >
        <Container className="px-5">
          <div className="grid items-stretch gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="group relative min-h-[320px] overflow-hidden rounded-[2.5rem] border border-[var(--interlines-azure)]/10 shadow-[0_18px_55px_rgba(48,117,128,0.1)] sm:min-h-[420px]">
              <img
                src={homeImages.intro}
                alt="Cruise experience for travel professionals"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--interlines-azure-deep)]/52 via-[var(--interlines-azure)]/10 to-transparent" />
            </div>

            <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--interlines-azure)]/10 bg-white p-10 shadow-[0_15px_50px_rgba(48,117,128,0.06)] sm:p-14">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--interlines-azure-light)]/50 to-transparent" />
              <div className="relative z-10">
                <SectionTitle>{introductionHeading}</SectionTitle>
                <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-[var(--interlines-slate-soft)]">
                  {introductionBody.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Divider />

      {/* Who We Are */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute right-0 top-1/2 w-[600px] h-[600px] bg-[var(--interlines-azure)]/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />
        
        <Container className="relative grid gap-12 px-5 lg:grid-cols-[1fr_1.2fr] z-10">
          <div className="relative min-h-[500px] overflow-hidden rounded-[2.5rem] group shadow-[0_20px_60px_rgba(48,117,128,0.1)] border border-[var(--interlines-azure)]/5">
            <div className="absolute inset-0 bg-[var(--interlines-azure)]/10 mix-blend-overlay z-10" />
            <img
              src={homeImages.how}
              alt="Travel professional on a cruise"
              className="absolute inset-0 h-full w-full object-cover object-[center_28%] transition-transform duration-[1.5s] group-hover:scale-105 opacity-90 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
          </div>

          <div className="flex flex-col justify-center lg:pl-10">
            <SectionTitle>Who We Are</SectionTitle>
            <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-[var(--interlines-slate-soft)]">
              {whoWeAreParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-12 bg-white shadow-sm p-8 sm:p-10 rounded-[2rem] border border-[var(--interlines-azure)]/10 transition-colors duration-500 hover:border-[var(--interlines-azure)]/30">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-slate)] mb-6">
                As a registered member, you can:
              </p>
              <CheckList items={whoWeAreMemberActions} />
            </div>
          </div>
        </Container>
      </section>

      <Divider />

      {/* Why Choose Us & Benefits */}
      <section className="relative py-20 sm:py-24">
        <Container className="relative px-5 z-10">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8">
            <Card className="hover:border-[var(--interlines-azure)]/30 transition-colors duration-500 group">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--interlines-azure)]"><path d="M12 2L2 22h20L12 2z"/></svg>
              </div>
              <SectionTitle>Why Choose Us</SectionTitle>
              <div className="mt-10 relative z-10 h-full">
                <CheckList items={whyChooseUs} />
              </div>
            </Card>

            <Card invert className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 h-full">
                <SectionTitle invert>Benefits for Travel Industry Professionals</SectionTitle>
                <div className="mt-10">
                  <CheckList invert items={memberBenefits} />
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* How it Works */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute top-0 left-0 w-full h-full bg-[var(--interlines-azure-light)]/40 border-y border-[var(--interlines-azure)]/10" />
        <Container className="relative px-5 z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionTitle align="center">How the Programme Works</SectionTitle>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5 relative">
            <div className="hidden xl:block absolute top-[50px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--interlines-azure)]/20 to-transparent z-0" />
            
            {programmeSteps.map((step, index) => (
              <article
                key={step}
                className="bg-white relative rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 group overflow-hidden border border-[var(--interlines-azure)]/5 hover:border-[var(--interlines-azure)]/20 hover:shadow-[0_15px_40px_rgba(48,117,128,0.08)] z-10"
              >
                <div className="mb-6 h-12 w-12 rounded-full border border-[var(--interlines-azure)]/20 flex items-center justify-center bg-white group-hover:bg-[var(--interlines-azure)] transition-colors duration-500 shadow-sm">
                  <span className="text-[1.15rem] font-semibold tabular-nums text-[var(--interlines-azure)] group-hover:text-white transition-colors duration-500">
                    {index + 1}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] group-hover:text-[var(--interlines-slate)] transition-colors duration-300 relative z-10">
                  {step}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Eligibility & Offers */}
      <section className="relative py-20 sm:py-24">
        <Container className="flex flex-col gap-10 px-5">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-stretch h-full">
            <Card invert className="flex flex-col justify-start">
              <SectionTitle invert>Who Is Eligible</SectionTitle>
              <p className="mt-8 text-[17px] leading-relaxed text-white/90">
                You qualify if you are a current or former employee of a Middle East-based travel or hospitality organisation, including:
              </p>
              <div className="mt-8">
                <CheckList invert items={eligibleOrganisations} />
              </div>
              <div className="mt-10 p-6 rounded-[1.5rem] bg-[var(--interlines-azure-deep)]/40 border border-white/10 shadow-inner group">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--interlines-gold-light)] mb-3">Family Eligibility</p>
                <p className="text-[15px] leading-relaxed text-white/90">
                  Spouse, children and parents may also travel at interline rates.
                </p>
              </div>
            </Card>

            <div className="overflow-hidden rounded-[2.5rem] bg-white border border-[var(--interlines-azure)]/10 shadow-[0_20px_50px_rgba(48,117,128,0.08)] flex flex-col group relative">
              <div className="relative h-48 sm:h-64 z-0 shrink-0">
                <img
                  src={homeImages.offers}
                  alt="Cruise dining and onboard offers"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-[0.85] mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
              </div>

              <div className="relative z-10 p-8 sm:p-10 flex-1 flex flex-col bg-white">
                <SectionTitle>Current Cruise Offers</SectionTitle>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                  New offers are added regularly across destinations and cruise lines.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)]">
                  You may find:
                </p>
                <div className="mt-6 mb-8 border-t border-[var(--interlines-azure)]/10 pt-6">
                  <CheckList items={currentCruiseOffers} />
                </div>
                <div className="mt-auto pt-6">
                  <Pill href="/offers" variant="azure">
                    View Latest Offers
                  </Pill>
                </div>
              </div>
            </div>
          </div>

          <Card className="flex flex-col items-center text-center justify-center border-[var(--interlines-azure)]/10 hover:border-[var(--interlines-azure)]/20 transition-all duration-300 w-full mt-4">
            <div className="mb-6 flex justify-center w-full">
              <h2 className="font-display text-[1.75rem] leading-[1.06] tracking-[-0.03em] sm:text-4xl lg:text-[2.25rem] text-[var(--interlines-slate)]">
                How to Register
              </h2>
            </div>
            
            <div className="mt-8 grid sm:grid-cols-3 gap-8 w-full max-w-4xl mx-auto">
              {registrationSteps.map((step, index) => (
                <div key={step} className="flex flex-col items-center gap-4 group text-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--interlines-bg)] text-base font-bold tabular-nums ring-1 ring-[var(--interlines-azure)]/20 text-[var(--interlines-azure)] group-hover:bg-[var(--interlines-azure)] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    {index + 1}
                  </span>
                  <span className="text-[15px] leading-relaxed px-4 text-[var(--interlines-slate-soft)] group-hover:text-[var(--interlines-slate)] transition-colors duration-300 mt-2">
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-[var(--interlines-azure)]/5 w-full max-w-2xl mx-auto flex justify-center">
              <Pill href="/request-access" variant="azure">
                Register for Access
              </Pill>
            </div>
          </Card>
        </Container>
      </section>

      {/* CTA Footer Section */}
      <section className="relative pt-20 pb-14 sm:pt-24 sm:pb-20">
        <Container className="px-5">
          <div className="relative overflow-hidden rounded-[3rem] shadow-[0_30px_60px_rgba(48,117,128,0.15)] isolate border border-[var(--interlines-azure)]/10 bg-[var(--interlines-azure)] group">
            <img
              src={homeImages.hero}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-[center_58%] opacity-[0.35] mix-blend-luminosity z-0 group-hover:scale-105 transition-transform duration-[3s]"
            />
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[var(--interlines-azure)] to-[var(--interlines-azure)]/40 z-10" />

            <div className="relative px-8 py-20 sm:p-24 max-w-4xl z-20">
              <h2 className="font-display text-[2.5rem] leading-[1.05] tracking-[-0.03em] text-white sm:text-[4.5rem] drop-shadow-md">
                You&rsquo;ve spent your career helping others see the world.
                <span className="block mt-4 text-[var(--interlines-gold-light)] italic py-2">
                  Now it&rsquo;s your turn.
                </span>
              </h2>
              <p className="mt-8 max-w-[48ch] text-[17px] leading-relaxed text-white/90 font-light">
                Join Interline Cruises Middle East and access exclusive cruise rates reserved for the travel industry.
              </p>
              <div className="mt-12 flex flex-wrap gap-5">
                <Pill href="/request-access" variant="white">
                  Register Now
                </Pill>
                <Pill href="/login" variant="glass">
                  Log In
                </Pill>
                <Pill href="/offers" variant="glass">
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
