"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Icon } from "./Icon";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "approach", label: "Approach" },
  { id: "brands", label: "For brands" },
  { id: "services", label: "Services" },
  { id: "why", label: "Why dms." },
  { id: "contact", label: "Contact" },
];

interface NavProps {
  active: string;
  onNavigate: (id: string) => void;
}

export const Nav = ({ active, onNavigate }: NavProps) => {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setSticky(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Esc
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
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
            style={{
              background: "none",
              border: 0,
              padding: 0,
              cursor: "pointer",
            }}
          >
            dms<span className="dot">.</span>
          </button>
          <div className="nav__items">
            {NAV_ITEMS.map((item) => (
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
            onClick={() => onNavigate("contact")}
            className="relative hidden md:inline-flex items-center gap-2 h-9 px-4 rounded-full font-semibold text-xs text-[#0a0a0a] bg-[#c8ff00] cursor-pointer transition-all duration-150 hover:bg-[#d8ff3a] active:scale-95"
          >
            Start a project
            <ArrowRight size={14} strokeWidth={2} />
          </button>
          <button
            className="nav__burger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </nav>
      </div>

      <div
        className={`nav-overlay ${open ? "is-open" : ""}`}
        style={{ zIndex: 110 }}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="nav-overlay__top">
          <div className="nav__brand">
            dms<span className="dot">.</span>
          </div>
          <button
            className="nav-overlay__close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <Icon name="x" size={22} />
          </button>
        </div>
        <nav className="nav-overlay__list">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              className={`nav-overlay__item ${
                active === item.id ? "is-active" : ""
              }`}
              onClick={() => go(item.id)}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span className="lbl">{item.label}</span>
              <span className="ar">
                <Icon name="arrow-up-right" size={20} />
              </span>
            </button>
          ))}
        </nav>
        <div className="nav-overlay__foot">
          <button className="nav-overlay__cta" onClick={() => go("contact")}>
            Start a project <Icon name="arrow-right" size={16} />
          </button>
          <div className="nav-overlay__email">damir@dms.[domain]</div>
        </div>
      </div>
    </>
  );
};
