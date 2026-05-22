/* global React, Reveal, useScrollY */
const { useEffect, useRef, useState } = React;

const Footer = () => {
  const yRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Pointer-reactive tilt on the giant wordmark
  const onMove = (e) => {
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
          <div style={{ fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 14, color: "var(--fg)", marginBottom: 6 }}>
            Influencer marketing for gaming and tech hardware.
          </div>
          <div className="line muted">One operator. Every deal. Start to finish.</div>
        </Reveal>

        <Reveal variant="up" delay={80} className="footer__col">
          <h4>Contact</h4>
          <a className="line" href="mailto:damir@dms.[domain]">damir@dms.[domain]</a>
          <div className="line muted">Reply — 24h, weekdays</div>
        </Reveal>

        <Reveal variant="up" delay={140} className="footer__col">
          <h4>Based</h4>
          <div className="line">[city]</div>
          <div className="line muted">Working globally</div>
        </Reveal>

        <Reveal variant="up" delay={200} className="footer__col">
          <h4>Index</h4>
          <a className="line" href="#brands">For brands</a>
          <a className="line" href="#services">Services</a>
          <a className="line" href="#why">Why dms.</a>
          <a className="line" href="#contact">Contact</a>
        </Reveal>
      </div>

      <div className="footer__bottom">
        <span>© dms. {new Date().getFullYear()}</span>
        <span>Gaming and tech hardware only.</span>
      </div>
    </footer>
  );
};

window.Footer = Footer;
