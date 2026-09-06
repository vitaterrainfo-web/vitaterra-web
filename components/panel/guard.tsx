"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStage } from "@/lib/panel-auth";

export function PanelGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stage = getStage();
    if (stage === null) {
      router.replace("/panel/login");
    } else if (stage === "otp") {
      router.replace("/panel/verificar");
    } else if (stage === "kyc") {
      router.replace("/panel/kyc");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return null;
  return <>{children}</>;
}
