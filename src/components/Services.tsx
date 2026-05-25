"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/lib/motion-kit";

interface Service {
  n: string;
  title: string;
  body: string;
}

const SERVICES: Service[] = [
  {
    n: "01",
    title: "Sourcing",
    body: "Hand‑built shortlists of creators in tech and gaming. Vetted for audience fit, engagement quality, and brand safety. Not a database export.",
  },
  {
    n: "02",
    title: "Outreach",
    body: "Human‑written first contact. No templates. No mass blasts. Every pitch specific to that creator and that brand.",
  },
  {
    n: "03",
    title: "Negotiation",
    body: "Rate, scope, deliverables, usage rights, timeline. Written down. Signed before anything ships.",
  },
  {
    n: "04",
    title: "Production ops",
    body: "Brief review, content approval, revision rounds, posting schedule. One thread, one owner.",
  },
  {
    n: "05",
    title: "Reporting",
    body: "Plain numbers. What ran, what it cost, what it returned. No vanity metrics. No padded decks.",
  },
];

export const Services = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Init pulse (per fix spec).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {}, 50);
    return () => clearTimeout(timer);
  }, []);

  // Track which card is most central in viewport while scrolling.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const cards = wrap.querySelectorAll<HTMLElement>("[data-card-i]");
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const center = window.innerHeight * 0.5;
        let best = 0;
        let bestDist = Infinity;
        cards.forEach((el) => {
          const r = el.getBoundingClientRect();
          const mid = r.top + r.height / 2;
          const dist = Math.abs(mid - center);
          if (dist < bestDist) {
            bestDist = dist;
            best = Number(el.dataset.cardI);
          }
        });
        setActive(best);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="services" data-screen-label="03 Services" className="container">
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
          <span className="section-eyebrow in">What I do</span>
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
            From <span style={{ color: "var(--accent)" }}>first email</span> to
            final invoice.
          </h2>
        </Reveal>
      </div>

      <div className="svc-stage" ref={wrapRef}>
        <div className="svc-left">
          <div className="svc-num">
            {SERVICES.map((s, i) => (
              <span
                key={s.n}
                className="svc-num__cell"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform:
                    i === active
                      ? "none"
                      : i < active
                      ? "translate3d(0, -24px, 0)"
                      : "translate3d(0, 24px, 0)",
                  transition:
                    "opacity 360ms cubic-bezier(0.23, 1, 0.32, 1), transform 420ms cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                {s.n}
                <span className="svc-num__dot">.</span>
              </span>
            ))}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
            }}
          >
            <span style={{ color: "var(--fg)" }}>
              {String(active + 1).padStart(2, "0")}
            </span>{" "}
            / 05 — In view
          </div>
        </div>

        <div className="svc-cards">
          {SERVICES.map((s, i) => (
            <div
              key={s.n}
              data-card-i={i}
              className={`svc-card ${i === active ? "is-active" : ""}`}
              style={{ scrollMarginTop: 140 }}
            >
              <span className="svc-card__bar" aria-hidden="true" />
              <div className="svc-card__tag">
                <span className="l">{s.n}</span>
                <span>—</span>
                <span>{s.title}</span>
              </div>
              <h3 className="svc-card__title">
                {s.title}
                <span style={{ color: "var(--accent)" }}>.</span>
              </h3>
              <p className="svc-card__body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
