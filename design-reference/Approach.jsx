/* global React, Icon, Tilt, Reveal, Magnetic */

const Approach = () => {
  return (
    <section id="approach" data-screen-label="05 Approach" className="container">
      <div className="appr">
        <div className="appr__left">
          <Reveal variant="up"><span className="section-eyebrow in">Approach</span></Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="appr__headline">
              See the <span className="accent">approach</span> before you commit.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={140}>
            <p className="appr__body">
              dms. works narrow on purpose — gaming and tech hardware only. That focus means the first call isn't a sales pitch. It's a working session: send a category, a budget range, or a campaign you're considering, and you'll get a real take on creator fit, expected rates, and what would actually move your numbers.
            </p>
          </Reveal>
          <Reveal variant="up" delay={200}>
            <p className="appr__body">
              No deck, no upsell. If the call is useful, we work together. If not, you've gained a perspective you didn't have an hour ago.
            </p>
          </Reveal>
          <Reveal variant="up" delay={260}>
            <Magnetic strength={0.3} style={{ alignSelf: "flex-start", marginTop: 8 }}>
              Book the first call <Icon name="arrow-right" size={16}/>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal variant="up" delay={180}>
          <Tilt max={5} className="contact-card appr__card">
            <span className="tag"><Icon name="spark" size={12}/> What you get on the call</span>
            <h3 className="title">A working session — not a sales pitch.</h3>
            <ul>
              {[
                "A sample shortlist of three to five creators dms. would pitch for your category.",
                "Honest read on rates for that tier.",
                "The angles a generalist agency would miss.",
                "A timeline and price for the full project.",
              ].map((t, i) => (
                <li key={i}>
                  <Icon name="check" size={16}/>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div style={{
              marginTop: 8,
              paddingTop: 24,
              borderTop: "1px solid var(--border-neutral)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              fontFamily: "var(--font-mono)", fontSize: 11,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "var(--fg-muted)",
            }}>
              <span>No deck. No upsell.</span>
              <span style={{ color: "var(--accent)" }}>Free</span>
            </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
};

window.Approach = Approach;
