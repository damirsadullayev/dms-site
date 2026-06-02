"use client";

import { useRef } from "react";
import Image from "next/image";
import { Reveal } from "@/lib/motion-kit";

const YouTubeIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-label="YouTube"
    role="img"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

interface RosterProps {
  onCta: (id: string) => void;
}

export const Roster = ({ onCta }: RosterProps) => {
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
    <section id="roster" data-screen-label="Roster" className="container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxWidth: 880,
          marginBottom: 48,
        }}
      >
        <Reveal variant="up">
          <span className="section-eyebrow in">Who we represent</span>
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
            The <span style={{ color: "var(--accent)" }}>Roster.</span>
          </h2>
        </Reveal>
        <Reveal variant="up" delay={140}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
            }}
          >
            Curated. Vetted. Growing.
          </span>
        </Reveal>
      </div>

      <Reveal variant="up" delay={180}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="tilt-card roster-card"
          style={{
            position: "relative",
            cursor: "pointer",
            maxWidth: 720,
          }}
        >
          <div className="tilt-card__glow" aria-hidden="true" />
          <a
            href="https://beacons.ai/moworld/mediakit?origin=lib"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open MoWorld mediakit"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              borderRadius: "inherit",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18, minWidth: 0 }}>
              <div
                style={{
                  position: "relative",
                  width: 88,
                  height: 88,
                  flexShrink: 0,
                  borderRadius: 6,
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                }}
              >
                <Image
                  src="/moworld.jpg"
                  alt="MoWorld portrait"
                  fill
                  sizes="88px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  01 — Creator
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "clamp(32px, 3.6vw, 48px)",
                    lineHeight: 1,
                    letterSpacing: "-0.025em",
                    color: "var(--fg)",
                    margin: 0,
                  }}
                >
                  MoWorld
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    letterSpacing: "0.04em",
                    color: "var(--fg-muted)",
                  }}
                >
                  @MoWorldOfficial
                </span>
              </div>
            </div>
            <a
              href="https://www.youtube.com/@MoWorldOfficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MoWorld on YouTube"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                zIndex: 2,
                color: "var(--accent)",
                flexShrink: 0,
                lineHeight: 0,
                display: "inline-flex",
                textDecoration: "none",
                transition: "transform 180ms var(--ease-out-strong), opacity 180ms var(--ease-out-strong)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate3d(2px, -2px, 0)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate3d(0, 0, 0)";
              }}
            >
              <YouTubeIcon size={24} />
            </a>
          </div>

          <div
            className="roster-stats"
            style={{
              marginTop: 28,
              paddingTop: 24,
              borderTop: "1px solid var(--border-neutral)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(20px, 2vw, 24px)",
                  fontWeight: 500,
                  color: "var(--fg)",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                464K
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--fg-muted)",
                }}
              >
                Subscribers
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(20px, 2vw, 24px)",
                  fontWeight: 500,
                  color: "var(--fg)",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                150K
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--fg-muted)",
                }}
              >
                Avg views
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(14px, 1.2vw, 15px)",
                  fontWeight: 500,
                  color: "var(--fg)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Setup &amp; lifestyle tech
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--fg-muted)",
                }}
              >
                Vertical
              </span>
            </div>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.55,
              color: "var(--fg-muted)",
              margin: "24px 0 0",
            }}
          >
            Setup transformations and lifestyle tech for an engaged US/UK
            audience.
          </p>
        </div>
      </Reveal>

      <Reveal variant="up" delay={240}>
        <p
          style={{
            marginTop: 32,
            maxWidth: 720,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.06em",
            color: "var(--fg-muted)",
          }}
        >
          Roster is growing — brands,{" "}
          <button
            onClick={() => onCta("contact")}
            style={{
              background: "none",
              border: 0,
              padding: 0,
              cursor: "pointer",
              color: "var(--accent)",
              fontFamily: "inherit",
              fontSize: "inherit",
              letterSpacing: "inherit",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            get in touch
          </button>{" "}
          for our full creator list.
        </p>
      </Reveal>
    </section>
  );
};
