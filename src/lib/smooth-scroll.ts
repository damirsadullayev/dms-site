"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

interface LenisOptions {
  duration: number;
  easing: (t: number) => number;
  smooth: boolean;
  mouseMultiplier: number;
  smoothTouch: boolean;
  touchMultiplier: number;
}

const LENIS_OPTIONS: LenisOptions = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  mouseMultiplier: 1.0,
  smoothTouch: false,
  touchMultiplier: 2,
};

export function useSmoothScroll(): void {
  useEffect(() => {
    const lenis = new Lenis(LENIS_OPTIONS as ConstructorParameters<typeof Lenis>[0]);

    let rafId = 0;
    const raf = (time: number): void => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
