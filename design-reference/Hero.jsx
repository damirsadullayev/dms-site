/* global React, Icon, Magnetic, Reveal, Scramble, useInView */
const { useEffect, useState, useRef } = React;

const STATS = [
  { num: "24h", label: "First reply" },
  { num: "5d",  label: "Shortlist" },
  { num: "1:1", label: "Single owner" },
  { num: "0",   label: "Handoffs" },
];

const Hero = ({ onCta }) => {
  const [statsRef, statsIn] = useInView({ threshold: 0.3 });
  const [phase, setPhase] = useState(0); // 0: idle, 1: scrambling, 2: sub & cta visible

  // After scramble finishes (~1.6s), reveal sub + CTAs + stats
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 80);
    const t2 = setTimeout(() => setPhase(2), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section id="hero" data-screen-label="00 Hero" className="container hero">
      <Reveal variant="up" delay={0}>
        <span className="hero__eyebrow"><span className="d" aria-hidden="true"/>Gaming &amp; tech hardware partnerships</span>
      </Reveal>

      <h1 className="hero__headline">
        <span style={{ display: "block" }}>
          <Scramble text="Brands meet creators." duration={1100} delay={120}/>
        </span>
        <span style={{ display: "block" }}>
          <Scramble text="Without" duration={900} delay={900}/>
          {"\u00A0"}
          <span className="accent"><Scramble text="the noise." duration={900} delay={1300} finalFontFamily="var(--font-display)"/></span>
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
        Influencer marketing built only for gaming and tech hardware. One operator running every deal from first email to final invoice.
      </p>

      <div
        className="hero__ctas"
        style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "none" : "translate3d(0,16px,0)",
          transition: "opacity 520ms var(--ease-out-strong), transform 520ms var(--ease-out-strong)",
          transitionDelay: "340ms",
        }}
      >
        <Magnetic onClick={() => onCta("contact")} strength={0.32}>
          Start a project <Icon name="arrow-right" size={16}/>
        </Magnetic>
        <Magnetic className="ghost" onClick={() => onCta("services")} strength={0.25}>
          How it works
        </Magnetic>
      </div>

      <div
        ref={statsRef}
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

window.Hero = Hero;
