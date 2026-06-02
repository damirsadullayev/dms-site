"use client";

import { useCallback, useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WhoFor } from "@/components/WhoFor";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { WhyDms } from "@/components/WhyDms";
import { Roster } from "@/components/Roster";
import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

// Ported from App.jsx. Lenis is not installed, so onNavigate uses the
// reference's documented native-scroll fallback. Sections beyond Hero are
// added in later migration steps; the observer ignores ids not yet present.
const SECTION_IDS = [
  "hero",
  "brands",
  "ticker",
  "services",
  "why",
  "roster",
  "approach",
  "contact",
];

export default function Home() {
  const [active, setActive] = useState("hero");

  // Track which section is in view to drive nav highlighting.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - 160) -
              Math.abs(b.boundingClientRect.top - 160)
          );
        if (inView.length) setActive(inView[0].target.id);
      },
      { rootMargin: "-160px 0px -45% 0px", threshold: [0, 0.2, 0.5, 0.8] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const onNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
  }, []);

  return (
    <>
      <Nav active={active} onNavigate={onNavigate} />
      <main>
        <Hero onCta={onNavigate} />
        <WhoFor onCta={onNavigate} />
        <Marquee />
        <Services />
        <WhyDms />
        <Roster onCta={onNavigate} />
        <Approach onCta={onNavigate} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
