import type { Metadata } from "next";
import ResetPasswordClient from "@/app/reset-password/ResetPasswordClient";
import { Suspense } from "react";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Reset Password",
  description: "Choose a new password for your Interline Cruises Middle East account.",
});

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordClient />
    </Suspense>
  );
}
