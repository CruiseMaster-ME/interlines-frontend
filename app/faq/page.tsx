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
        subHeader={
          <div className="flex flex-col items-center gap-4 text-center sm:gap-5">
            <p className="max-w-2xl text-[15px] leading-7 text-white/92 sm:text-[16px] sm:leading-8">
              {FAQ_DESCRIPTION}
            </p>
            <div>
              <Pill href="/request-access" variant="white">
                Register Now
              </Pill>
            </div>
          </div>
        }
      />

      <Container className="max-w-4xl px-5 pt-10 sm:pt-12">
        <FaqAccordion topContent={<CompactBreadcrumbs items={breadcrumbItems} />} />
      </Container>
    </div>
  );
}
