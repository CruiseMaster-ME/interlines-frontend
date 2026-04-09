import type { StructuredData } from "@/lib/seo";

export default function StructuredDataScript({
  data,
  id,
}: {
  data: StructuredData | StructuredData[];
  id?: string;
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
