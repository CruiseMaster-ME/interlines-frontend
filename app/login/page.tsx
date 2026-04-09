import type { Metadata } from "next";
import LoginClient from "@/app/login/LoginClient";
import { Suspense } from "react";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Log In",
  description: "Log in to your Interline Cruises Middle East account.",
});

export default function LoginPage() {
  return (
    <Suspense>
      <LoginClient />
    </Suspense>
  );
}
