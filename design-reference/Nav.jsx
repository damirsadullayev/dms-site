/* global React, Icon */
const { useEffect, useState } = React;

const NAV_ITEMS = [
  { id: "approach", label: "Approach" },
  { id: "brands",   label: "For brands" },
  { id: "services", label: "Services" },
  { id: "why",      label: "Why dms." },
  { id: "contact",  label: "Contact" },
];

const Nav = ({ active, onNavigate }) => {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => onNavigate(id), 280); // wait for menu close
  };

  return (
    <>
      <div className="nav-shell">
        <nav className={`nav ${sticky ? "is-stuck" : ""}`}>
          <button
            className="nav__brand"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "none", border: 0, padding: 0, cursor: "pointer" }}
          >
            dms<span className="dot">.</span>
          </button>
          <div className="nav__items">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                data-id={item.id}
                className={`nav__item ${active === item.id ? "is-active" : ""}`}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            className="nav__cta"
            onClick={() => onNavigate("contact")}
          >
            Start a project <Icon name="arrow-right" size={14}/>
          </button>
          <button
            className="nav__burger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
          </button>
        </nav>
      </div>

      <div className={`nav-overlay ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!open}>
        <div className="nav-overlay__top">
          <div className="nav__brand">dms<span className="dot">.</span></div>
          <button
            className="nav-overlay__close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <Icon name="x" size={22}/>
          </button>
        </div>
        <nav className="nav-overlay__list">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              className={`nav-overlay__item ${active === item.id ? "is-active" : ""}`}
              onClick={() => go(item.id)}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span className="lbl">{item.label}</span>
              <span className="ar"><Icon name="arrow-up-right" size={20}/></span>
            </button>
          ))}
        </nav>
        <div className="nav-overlay__foot">
          <button
            className="nav-overlay__cta"
            onClick={() => go("contact")}
          >
            Start a project <Icon name="arrow-right" size={16}/>
          </button>
          <div className="nav-overlay__email">damir@dms.[domain]</div>
        </div>
      </div>
    </>
  );
};

window.Nav = Nav;
