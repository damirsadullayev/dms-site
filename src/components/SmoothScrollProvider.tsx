"use client";

import type { ReactNode } from "react";
import { useSmoothScroll } from "@/lib/smooth-scroll";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useSmoothScroll();
  return <>{children}</>;
}
