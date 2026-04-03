import type { Metadata } from "next";
import ResetPasswordClient from "@/app/reset-password/ResetPasswordClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Choose a new password for your Interline Cruises Middle East account.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordClient />
    </Suspense>
  );
}
