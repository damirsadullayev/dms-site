"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Icon } from "./Icon";
import { Reveal } from "@/lib/motion-kit";

interface ApproachProps {
  onCta: (id: string) => void;
}

export const Approach = ({ onCta }: ApproachProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Init pulse (per fix spec).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {}, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${px}%`);
    el.style.setProperty("--my", `${py}%`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  };

  return (
    <section id="approach" data-screen-label="05 Approach" className="container">
      <div className="appr">
        <div className="appr__left">
          <Reveal variant="up">
            <span className="section-eyebrow in">Approach</span>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="appr__headline">
              See the <span className="accent">approach</span> before you
              commit.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={140}>
            <p className="appr__body">
              dms. works narrow on purpose — gaming and tech hardware only. That
              focus means the first call isn&apos;t a sales pitch. It&apos;s a
              working session: send a category, a budget range, or a campaign
              you&apos;re considering, and you&apos;ll get a real take on creator
              fit, expected rates, and what would actually move your numbers.
            </p>
          </Reveal>
          <Reveal variant="up" delay={200}>
            <p className="appr__body">
              No deck, no upsell. If the call is useful, we work together. If
              not, you&apos;ve gained a perspective you didn&apos;t have an hour
              ago.
            </p>
          </Reveal>
          <Reveal variant="up" delay={260}>
            <button
              onClick={() => onCta("contact")}
              style={{ alignSelf: "flex-start", marginTop: 8 }}
              className="relative inline-flex items-center gap-2 h-12 px-6 rounded-full font-semibold text-sm text-[#0a0a0a] bg-[#c8ff00] border-2 border-[#0a0a0a] shadow-[0_4px_0_0_#0a0a0a] cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_5px_0_0_#0a0a0a] active:translate-y-0.5 active:shadow-none"
            >
              Book the first call
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </Reveal>
        </div>

        <Reveal variant="up" delay={180}>
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="tilt-card contact-card appr__card"
          >
            <div className="tilt-card__glow" aria-hidden="true" />
            <span className="tag">
              <Icon name="spark" size={12} /> What you get on the call
            </span>
            <h3 className="title">A working session — not a sales pitch.</h3>
            <ul>
              {[
                "A sample shortlist of three to five creators dms. would pitch for your category.",
                "Honest read on rates for that tier.",
                "The angles a generalist agency would miss.",
                "A timeline and price for the full project.",
              ].map((t, i) => (
                <li key={i}>
                  <Icon name="check" size={16} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div
              style={{
                marginTop: 8,
                paddingTop: 24,
                borderTop: "1px solid var(--border-neutral)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
              }}
            >
              <span>No deck. No upsell.</span>
              <span style={{ color: "var(--accent)" }}>Free</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
