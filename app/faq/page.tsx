import type { Metadata } from "next";
import CompactBreadcrumbs from "@/components/CompactBreadcrumbs";
import Container from "@/components/Container";
import FaqAccordion from "@/components/FaqAccordion";
import { PageHeader } from "@/components/PageHeader";
import { Pill } from "@/components/PremiumUI";
import StructuredDataScript from "@/components/StructuredDataScript";
import { faqItems } from "@/lib/siteContent";
import {
  buildBreadcrumbStructuredData,
  buildFaqStructuredData,
  buildPageMetadata,
  buildWebPageStructuredData,
} from "@/lib/seo";

const FAQ_TITLE = "FAQ";
const FAQ_DESCRIPTION =
  "Everything you need to know about accessing exclusive cruise rates.";

export const metadata: Metadata = buildPageMetadata({
  title: FAQ_TITLE,
  description: FAQ_DESCRIPTION,
  path: "/faq",
  image: "/assets/images/how.png",
});

export default function FaqPage() {
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { label: "FAQ" },
  ];
  const breadcrumbStructuredData = buildBreadcrumbStructuredData(
    [
      { name: "Home", path: "/" },
      { name: "FAQ", path: "/faq/" },
    ],
    "/faq/",
  );
  const faqStructuredData = buildFaqStructuredData(faqItems);

  return (
    <div className="bg-[var(--interlines-bg)] min-h-screen pb-24">
      <StructuredDataScript
        data={[
          buildWebPageStructuredData({
            name: FAQ_TITLE,
            description: FAQ_DESCRIPTION,
            path: "/faq/",
            image: "/assets/images/how.png",
          }),
          ...(breadcrumbStructuredData ? [breadcrumbStructuredData] : []),
          ...(faqStructuredData ? [faqStructuredData] : []),
        ]}
      />

      <PageHeader
        title="How Interline Cruises Middle East Works"
        backgroundImage="/assets/images/how.png"
        backgroundPosition="center 34%"
        showBreadcrumbs={false}
        className="min-h-[17rem] sm:min-h-[20.5rem] lg:min-h-[24rem]"
      />

      <Container className="max-w-4xl px-5 pt-10 sm:pt-12">
        <section className="rounded-[2rem] border border-[var(--interlines-azure)]/10 bg-white p-6 shadow-[0_16px_40px_rgba(48,117,128,0.06)] sm:p-8">
          <CompactBreadcrumbs items={breadcrumbItems} />
          <p className="mt-4 text-[15px] leading-8 text-[var(--interlines-slate-soft)] sm:text-[16px]">
            Everything you need to know about accessing exclusive cruise rates.
          </p>
          <div className="mt-6">
            <Pill href="/request-access" variant="azure">
              Register Now
            </Pill>
          </div>
        </section>

        <div className="mt-8">
        <FaqAccordion />
        </div>
      </Container>
    </div>
  );
}
