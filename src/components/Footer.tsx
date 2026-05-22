"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/lib/motion-kit";

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
          <a className="line" href="mailto:damir@dms.[domain]">
            damir@dms.[domain]
          </a>
          <div className="line muted">Reply — 24h, weekdays</div>
        </Reveal>

        <Reveal variant="up" delay={140} className="footer__col">
          <h4>Based</h4>
          <div className="line">[city]</div>
          <div className="line muted">Working globally</div>
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
