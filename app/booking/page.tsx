import type { Metadata } from "next";
import BookingClient from "@/app/booking/BookingClient";

export const metadata: Metadata = {
  title: "Booking",
  description: "Continue to booking through the Interline Cruises Middle East member flow.",
};

export default function BookingPage() {
  return <BookingClient />;
}
