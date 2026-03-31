import type { Metadata } from "next";
import LoginClient from "@/app/login/LoginClient";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your Interline Cruises Middle East account.",
};

export default function LoginPage() {
  return <LoginClient />;
}
