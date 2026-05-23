"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/lib/motion-kit";

const InstagramGlyph = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinGlyph = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer = () => {
  const yRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Init pulse (per fix spec).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {}, 50);
    return () => clearTimeout(timer);
  }, []);

  // Pointer-reactive tilt on the giant wordmark
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = yRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ x: (0.5 - py) * 8, y: (px - 0.5) * 6 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <footer className="footer container">
      <Reveal variant="up">
        <div
          ref={yRef}
          className="footer__big"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformOrigin: "left center",
            transition: "transform 480ms var(--ease-out-strong)",
            willChange: "transform",
          }}
        >
          dms<span className="dot">.</span>
        </div>
      </Reveal>

      <div className="footer__grid">
        <Reveal variant="up" className="footer__col">
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              fontSize: 14,
              color: "var(--fg)",
              marginBottom: 6,
            }}
          >
            Influencer marketing for gaming and tech hardware.
          </div>
          <div className="line muted">
            One operator. Every deal. Start to finish.
          </div>
        </Reveal>

        <Reveal variant="up" delay={80} className="footer__col">
          <h4>Contact</h4>
          <a className="line" href="mailto:damir@dmsgroup.space">
            damir@dmsgroup.space
          </a>
          <div className="line muted">Reply — 24h, weekdays</div>
          <div className="flex items-center gap-4 mt-3">
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex text-[#f0f0f0] hover:text-[#c8ff00] transition-colors duration-150 ease-out"
            >
              <InstagramGlyph size={20} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="inline-flex text-[#f0f0f0] hover:text-[#c8ff00] transition-colors duration-150 ease-out"
            >
              <LinkedinGlyph size={20} />
            </a>
          </div>
        </Reveal>

        <Reveal variant="up" delay={200} className="footer__col">
          <h4>Index</h4>
          <Link className="line" href="#brands">
            For brands
          </Link>
          <Link className="line" href="#services">
            Services
          </Link>
          <Link className="line" href="#why">
            Why dms.
          </Link>
          <Link className="line" href="#contact">
            Contact
          </Link>
        </Reveal>
      </div>

      <div className="footer__bottom">
        <span>© dms. {new Date().getFullYear()}</span>
        <span>Gaming and tech hardware only.</span>
      </div>
    </footer>
  );
};
