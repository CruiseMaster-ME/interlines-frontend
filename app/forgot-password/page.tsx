import type { Metadata } from "next";
import ForgotPasswordClient from "@/app/forgot-password/ForgotPasswordClient";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your Interline Cruises Middle East password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
