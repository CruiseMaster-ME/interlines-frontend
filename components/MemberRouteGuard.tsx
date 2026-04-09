"use client";

import { useSessionContext } from "@/components/SessionProvider";
import { useEffect } from "react";

export default function MemberRouteGuard({
  children,
  allowAdmin = false,
}: {
  children: React.ReactNode;
  allowAdmin?: boolean;
}) {
  const { status } = useSessionContext();

  useEffect(() => {
    if (status === "guest") {
      window.location.replace("/login");
      return;
    }

    if (!allowAdmin && status === "admin") {
      window.location.replace("/admin");
    }
  }, [allowAdmin, status]);

  if (status !== "user" && (!allowAdmin || status !== "admin")) {
    return null;
  }

  return <>{children}</>;
}
