/* global React */
/* Motion primitives — a small framer-motion-flavored kit.
   Exports to window: Reveal, TextReveal, Magnetic, Tilt, Scramble, useInView, useStagger */

const { useEffect, useRef, useState, useCallback, useLayoutEffect } = React;

/* -- useInView: trigger once when an element enters the viewport ------- */
function useInView(opts = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { setInView(true); io.disconnect(); break; }
        }
      },
      { threshold: opts.threshold ?? 0.15, rootMargin: opts.rootMargin ?? "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

/* -- Reveal: <Reveal as="div" variant="up" delay={120}>...</Reveal> ----- */
const Reveal = ({ as: Tag = "div", variant = "up", delay = 0, className = "", style = {}, children, ...rest }) => {
  const [ref, inView] = useInView();
  const cls = `fm ${variant ? `fm-${variant}` : ""} ${inView ? "fm-in" : ""} ${className}`.trim();
  return (
    <Tag ref={ref} className={cls} style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }} {...rest}>
      {children}
    </Tag>
  );
};

/* -- Stagger: clones children, wraps each in Reveal with incremental delay */
const Stagger = ({ stagger = 70, base = 0, variant = "up", children }) => {
  const arr = React.Children.toArray(children);
  return arr.map((child, i) => (
    <Reveal key={i} variant={variant} delay={base + i * stagger}>{child}</Reveal>
  ));
};

/* -- TextReveal: split a string into lines/words, mask-clip translate -- */
const TextReveal = ({ text, as: Tag = "span", split = "word", className = "", style = {}, delay = 0, stagger = 60, accentIndices = [], children }) => {
  const [ref, inView] = useInView();
  // If `children` is provided (rich nodes), fall back to a single line wrap.
  if (children) {
    return (
      <Tag ref={ref} className={`tr-line ${inView ? "in" : ""} ${className}`.trim()} style={style}>
        <span style={{ transitionDelay: `${delay}ms` }}>{children}</span>
      </Tag>
    );
  }
  const tokens = split === "char"
    ? text.split("")
    : split === "line"
      ? text.split("\n")
      : text.split(/(\s+)/); // keep whitespace
  return (
    <Tag ref={ref} className={className} style={style}>
      {tokens.map((tok, i) => {
        if (split === "word" && /^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
        const isAccent = accentIndices.includes(i);
        return (
          <span
            key={i}
            className={`tr-word ${inView ? "in" : ""}`}
          >
            <span
              style={{
                transitionDelay: `${delay + i * stagger}ms`,
                color: isAccent ? "var(--accent)" : undefined,
              }}
            >
              {tok}
            </span>
          </span>
        );
      })}
    </Tag>
  );
};

/* -- Magnetic: pulls the inner element toward the cursor on hover ------ */
const Magnetic = ({ children, strength = 0.35, className = "", ...rest }) => {
  const wrap = useRef(null);
  const inner = useRef(null);
  const onMove = useCallback((e) => {
    const el = wrap.current;
    const i = inner.current;
    if (!el || !i) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    i.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  }, [strength]);
  const onLeave = useCallback(() => {
    const i = inner.current;
    if (i) i.style.transform = "";
  }, []);

  // Allow customizing the rendered element via `as` or default to <button>
  return (
    <button
      ref={wrap}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="magnet"
      className={`btn-mag ${className}`.trim()}
      {...rest}
    >
      <span className="btn-mag__inner" ref={inner}>{children}</span>
    </button>
  );
};

/* -- Tilt: subtle 3d rotation on hover, with cursor glow --------------- */
const Tilt = ({ max = 6, glow = true, className = "", style = {}, children, ...rest }) => {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max;
    const ry = (px - 0.5) * max;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }, [max]);
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card ${className}`.trim()}
      style={style}
      {...rest}
    >
      {glow ? <div className="tilt-card__glow" aria-hidden="true"/> : null}
      {children}
    </div>
  );
};

/* -- Scramble: mono characters scramble in, then settle to target text - */
const SCRAM_POOL = "▓▒░#@%&$=+<>/\\|ABCDEFGHJKLMNPQRSTUVWXYZ0123456789".split("");
const Scramble = ({ text, duration = 1100, delay = 200, className = "", style = {}, finalFontFamily = "var(--font-display)" }) => {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const target = text;
    const len = target.length;
    const start = performance.now() + delay;
    const tick = (now) => {
      if (cancelled) return;
      if (now < start) {
        setOut("");
        requestAnimationFrame(tick);
        return;
      }
      const t = Math.min((now - start) / duration, 1);
      const settled = Math.floor(t * len);
      let s = "";
      for (let i = 0; i < len; i++) {
        const ch = target[i];
        if (i < settled || ch === " " || ch === "\n") {
          s += ch;
        } else {
          s += SCRAM_POOL[(Math.random() * SCRAM_POOL.length) | 0];
        }
      }
      setOut(s);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setOut(target);
        setDone(true);
      }
    };
    requestAnimationFrame(tick);
    return () => { cancelled = true; };
  }, [inView, text, duration, delay]);

  return (
    <span
      ref={ref}
      className={`scramble ${done ? "done" : ""} ${className}`.trim()}
      style={{ ...style, fontFamily: done ? finalFontFamily : "var(--font-mono)" }}
    >
      {out || (inView ? "" : "\u00A0")}
    </span>
  );
};

/* -- useScrollY: read live scroll position for parallax / rail --------- */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setY(window.scrollY);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

/* -- CountUp: animate a number from 0 to target when in view ----------- */
const CountUp = ({ value, suffix = "", duration = 1400, className = "", style = {} }) => {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      // strong ease-out
      const eased = 1 - Math.pow(1 - t, 3.2);
      setN(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);
  return <span ref={ref} className={className} style={style}>{n}{suffix}</span>;
};

Object.assign(window, {
  useInView,
  useScrollY,
  Reveal,
  Stagger,
  TextReveal,
  Magnetic,
  Tilt,
  Scramble,
  CountUp,
});
