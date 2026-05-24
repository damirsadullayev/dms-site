"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal, Scramble, useInView } from "@/lib/motion-kit";

interface Stat {
  num: string;
  label: string;
}

const STATS: Stat[] = [
  { num: "24h", label: "First reply" },
  { num: "5d", label: "Shortlist" },
  { num: "1:1", label: "Single owner" },
  { num: "0", label: "Handoffs" },
];

interface HeroProps {
  onCta: (id: string) => void;
}

export const Hero = ({ onCta }: HeroProps) => {
  const [statsRef, statsIn] = useInView({ threshold: 0.3 });
  const [phase, setPhase] = useState(0); // 0: idle, 1: scrambling, 2: sub & cta visible

  // Init pulse (per fix spec): grace tick to ensure motion-kit observers
  // have a settled DOM/layout to read from. Empty body — motion-kit
  // primitives self-initialize via their own effects.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {}, 50);
    return () => clearTimeout(timer);
  }, []);

  // After scramble finishes (~1.6s), reveal sub + CTAs + stats
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 80);
    const t2 = setTimeout(() => setPhase(2), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section id="hero" data-screen-label="00 Hero" className="container hero">
      <Reveal variant="up" delay={0}>
        <span className="hero__eyebrow">
          <span className="d" aria-hidden="true" />
          Gaming & tech partnerships
        </span>
      </Reveal>

      <h1 className="hero__headline">
        <span style={{ display: "block" }}>
          <Scramble text="Brands meet creators." duration={1100} delay={120} />
        </span>
        <span style={{ display: "block" }}>
          <Scramble text="Without" duration={900} delay={900} />
          {"\u00A0"}
          <span className="accent">
            <Scramble
              text="the noise."
              duration={900}
              delay={1300}
              finalFontFamily="var(--font-display)"
            />
          </span>
        </span>
      </h1>

      <p
        className="fm fm-up"
        style={{
          transitionDelay: "200ms",
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "none" : "translate3d(0,16px,0)",
          marginTop: 36,
          fontFamily: "var(--font-body)",
          fontSize: "clamp(16px, 1.4vw, 20px)",
          lineHeight: 1.5,
          color: "var(--fg-muted)",
          maxWidth: 560,
        }}
      >
        Influencer marketing built only for gaming and tech. One
        operator running every deal from first email to final invoice.
      </p>

      <div
        className="hero__ctas"
        style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "none" : "translate3d(0,16px,0)",
          transition:
            "opacity 520ms var(--ease-out-strong), transform 520ms var(--ease-out-strong)",
          transitionDelay: "340ms",
        }}
      >
        <button
          onClick={() => onCta("contact")}
          className="cursor-pointer relative inline-flex items-center gap-2 h-12 px-6 rounded-full font-semibold text-sm text-[#0a0a0a] bg-[#c8ff00] border-2 border-[#0a0a0a] shadow-[0_4px_0_0_#0a0a0a] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_5px_0_0_#0a0a0a] active:translate-y-0.5 active:shadow-none"
        >
          Start a project
          <ArrowRight size={16} strokeWidth={2} />
        </button>
        <button
          onClick={() => onCta("services")}
          className="relative inline-flex items-center gap-2 h-12 px-6 rounded-full font-semibold text-sm text-[#f0f0f0] bg-transparent border border-[rgba(240,240,240,0.25)] cursor-pointer transition-all duration-150 hover:border-[rgba(240,240,240,0.5)] hover:bg-[rgba(255,255,255,0.04)] active:scale-95"
        >
          How it works
        </button>
      </div>

      <div
        ref={statsRef as React.Ref<HTMLDivElement>}
        className="hero__stats"
        style={{
          opacity: phase >= 2 && statsIn ? 1 : 0,
          transition: "opacity 620ms var(--ease-out-strong)",
          transitionDelay: "520ms",
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`hero__stat ${statsIn && phase >= 2 ? "in" : ""}`}
            style={{ transitionDelay: `${600 + i * 90}ms` }}
          >
            <div className="num">{s.num}</div>
            <div className="lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
