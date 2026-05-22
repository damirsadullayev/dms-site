/* global React, Icon, Reveal, useInView */
const { useEffect } = React;

const TRAD = [
  "Account exec scopes the brief",
  "Junior sources creators from a database",
  "Manager reviews and reshuffles",
  "Director presents to the brand",
  "Project manager runs delivery",
];
const DMS = [
  "dms. reads the brief.",
  "dms. sources the creators.",
  "dms. pitches the brand.",
  "dms. runs delivery.",
  "dms. reports.",
];

const Row = ({ trad, dms, delay = 0 }) => {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <div ref={ref} className={`cmp-row ${inView ? "in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      <div
        className="cmp-col"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translate3d(-12px,0,0)",
          transition: "opacity 520ms var(--ease-out-strong), transform 520ms var(--ease-out-strong)",
          transitionDelay: `${delay}ms`,
        }}
      >
        <Icon name="minus" size={16} className="cmp-icon"/>
        <span>{trad}</span>
      </div>
      <div
        className="cmp-col dms"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translate3d(12px,0,0)",
          transition: "opacity 520ms var(--ease-out-strong), transform 520ms var(--ease-out-strong)",
          transitionDelay: `${delay + 80}ms`,
        }}
      >
        <Icon name="check" size={16} className="cmp-icon"/>
        <span>{dms}</span>
      </div>
    </div>
  );
};

const WhyDms = () => {
  return (
    <section id="why" data-screen-label="04 Why" className="container">
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 880, marginBottom: 48 }}>
        <Reveal variant="up"><span className="section-eyebrow in">Why dms.</span></Reveal>
        <Reveal variant="up" delay={80}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: "clamp(40px, 5.5vw, 76px)", lineHeight: 0.96,
            letterSpacing: "-0.025em", color: "var(--fg)", margin: 0,
          }}>
            Five people, one week. <span style={{ color: "var(--accent)" }}>Or one person, one day.</span>
          </h2>
        </Reveal>
      </div>

      <div
        style={{
          border: "1px solid var(--border-neutral)",
          borderRadius: 8,
          overflow: "hidden",
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <div className="cmp-row" style={{ borderTop: 0 }}>
          <div
            className="cmp-col"
            style={{
              borderTop: 0,
              fontFamily: "var(--font-mono)", fontSize: 11,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--fg-muted)",
              padding: "16px 24px",
            }}
          >
            Traditional agency
          </div>
          <div
            className="cmp-col dms"
            style={{
              borderTop: 0,
              fontFamily: "var(--font-mono)", fontSize: 11,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--accent)",
              padding: "16px 24px",
            }}
          >
            dms.
          </div>
        </div>
        {TRAD.map((t, i) => (
          <Row key={i} trad={t} dms={DMS[i]} delay={i * 90}/>
        ))}
        <div className="cmp-row">
          <div
            className="cmp-col"
            style={{
              fontFamily: "var(--font-mono)", fontSize: 11,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "var(--fg-faint)",
              padding: "20px 24px",
            }}
          >
            Every step adds a day. Every layer adds a fee.
          </div>
          <div
            className="cmp-col dms"
            style={{
              fontFamily: "var(--font-mono)", fontSize: 11,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "var(--accent)",
              padding: "20px 24px",
            }}
          >
            Decisions in hours. Not weeks.
          </div>
        </div>
      </div>
    </section>
  );
};

window.WhyDms = WhyDms;
