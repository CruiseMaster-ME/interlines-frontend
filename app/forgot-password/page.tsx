import type { Metadata } from "next";
import ForgotPasswordClient from "@/app/forgot-password/ForgotPasswordClient";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Forgot Password",
  description: "Reset your Interline Cruises Middle East password.",
});

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
