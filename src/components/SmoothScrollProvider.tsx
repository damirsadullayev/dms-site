"use client";

import { useEffect, type ReactNode } from "react";
// import { useSmoothScroll } from "@/lib/smooth-scroll";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  // useSmoothScroll(); // temporarily disabled — investigating animation lag

  // Always land at the top on refresh. Browsers default to restoring the
  // previous scroll position; opt out so a refresh feels like a fresh visit.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
}
