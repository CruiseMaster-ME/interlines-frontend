import type { Metadata } from "next";
import BookingClient from "@/app/booking/BookingClient";
import MemberRouteGuard from "@/components/MemberRouteGuard";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Booking",
  description: "Continue to booking through the Interline Cruises Middle East member flow.",
});

export default function BookingPage() {
  return (
    <MemberRouteGuard>
      <BookingClient />
    </MemberRouteGuard>
  );
}
