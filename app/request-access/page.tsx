import type { Metadata } from "next";
import RequestAccessClient from "@/app/request-access/RequestAccessClient";

export const metadata: Metadata = {
  title: "Register for Access",
  description:
    "Register for access to Interline Cruises Middle East.",
};

export default function RequestAccessPage() {
  return <RequestAccessClient />;
}
