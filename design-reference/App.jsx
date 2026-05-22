/* global React, Nav, Hero, Marquee, WhoFor, Services, WhyDms, Approach, Contact, Footer,
          useTweaks, TweaksPanel, TweakSection, TweakRadio */
const { useEffect, useState, useCallback, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "motion": "default"
}/*EDITMODE-END*/;

const SECTION_IDS = ["hero", "brands", "ticker", "services", "why", "approach", "contact"];

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useState("hero");
  const lenisRef = useRef(null);

  // Apply motion intensity to <body data-motion>
  useEffect(() => {
    document.body.setAttribute("data-motion", t.motion || "default");
  }, [t.motion]);

  // Lenis smooth scrolling
  useEffect(() => {
    if (typeof window === "undefined" || !window.Lenis) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new window.Lenis({
      lerp: 0.12,             // snappy continuous interpolation
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Track which section is in view to drive nav + rail highlighting.
  useEffect(() => {
    const els = SECTION_IDS.map(id => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      const inView = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top - 160) - Math.abs(b.boundingClientRect.top - 160));
      if (inView.length) setActive(inView[0].target.id);
    }, { rootMargin: "-160px 0px -45% 0px", threshold: [0, 0.2, 0.5, 0.8] });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const onNavigate = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, {
        offset: -24,
        duration: 0.9,
        easing: (x) => 1 - Math.pow(1 - x, 3),
      });
    } else {
      window.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <Nav active={active} onNavigate={onNavigate}/>
      <main>
        <Hero onCta={onNavigate}/>
        <WhoFor/>
        <Marquee/>
        <Services/>
        <WhyDms/>
        <Approach/>
        <Contact/>
      </main>
      <Footer/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Motion intensity"/>
        <TweakRadio
          label="Pace"
          value={t.motion}
          options={["calm", "default", "showy"]}
          onChange={(v) => setTweak("motion", v)}
        />
        <div style={{ padding: "6px 12px 10px", color: "#6b675f", fontSize: 10.5, lineHeight: 1.45 }}>
          Calm tones down durations + stagger.<br/>
          Default = the locked system spec.<br/>
          Showy speeds up marquee + emphasizes reveals.
        </div>
      </TweaksPanel>
    </>
  );
};

window.App = App;
