"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { Reveal } from "@/lib/motion-kit";

interface WhoCardProps {
  tag: string;
  side: string;
  title: string;
  body: ReactNode;
  cta: string;
  accent?: boolean;
}

const WhoCard = ({ tag, side, title, body, cta, accent }: WhoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="tilt-card who-card"
    >
      <div className="tilt-card__glow" aria-hidden="true" />
      <div className="head">
        <span className="tag">{tag}</span>
        <span className={`tag ${accent ? "lime" : ""}`}>{side}</span>
      </div>
      <h3 className="title">{title}</h3>
      <p className="body">{body}</p>
      <button className="link" style={{ marginTop: 28 }}>
        {cta} <Icon name="arrow-right" size={14} />
      </button>
    </div>
  );
};

export const WhoFor = () => {
  // Init pulse (per fix spec).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {}, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="brands" data-screen-label="01 Who" className="container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxWidth: 720,
          marginBottom: 64,
        }}
      >
        <Reveal variant="up">
          <span className="section-eyebrow in">Who it&apos;s for</span>
        </Reveal>
        <Reveal variant="up" delay={80}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(40px, 5.5vw, 76px)",
              lineHeight: 0.96,
              letterSpacing: "-0.025em",
              color: "var(--fg)",
              margin: 0,
            }}
          >
            Two sides. <span style={{ color: "var(--accent)" }}>One operator.</span>
          </h2>
        </Reveal>
      </div>

      <div className="who-grid">
        <Reveal variant="up" delay={60}>
          <WhoCard
            tag="01 — FOR BRANDS"
            side="BRANDS"
            accent
            title="You ship gear. dms. ships the deal."
            body="You make monitors, peripherals, PC parts, or gaming software. You want creators whose audience actually buys what you sell — not just whoever has the biggest follower count. dms. sources the shortlist, runs the outreach, negotiates the terms, and manages delivery. You see one inbox and one invoice."
            cta="Brief a project"
          />
        </Reveal>
        <Reveal variant="up" delay={140}>
          <WhoCard
            tag="02 — FOR CREATORS"
            side="CREATORS"
            title="Only the deals worth reading."
            body="You make tech or gaming content. You're tired of one‑line pitches from agencies that have clearly never watched your channel. dms. only brings you deals where the brand is right, the rate is fair, and the brief respects your audience. Commission‑based — dms. gets paid when you do."
            cta="Get on the roster"
          />
        </Reveal>
      </div>
    </section>
  );
};
