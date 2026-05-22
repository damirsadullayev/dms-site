/* global React */
const { useEffect, useState } = React;

const RAIL_ITEMS = [
  { id: "hero",     label: "Top" },
  { id: "brands",   label: "Who" },
  { id: "ticker",   label: "Pace" },
  { id: "services", label: "Services" },
  { id: "why",      label: "Why" },
  { id: "approach", label: "Approach" },
  { id: "contact",  label: "Contact" },
];

const SideRail = ({ active, onNavigate }) => {
  return (
    <div className="rail" aria-hidden="false">
      {RAIL_ITEMS.map((it, i) => (
        <button
          key={it.id}
          className={`rail__item ${active === it.id ? "is-active" : ""}`}
          onClick={() => onNavigate(it.id)}
          aria-label={`Jump to ${it.label}`}
        >
          <span className="rail__bar" aria-hidden="true"/>
          <span className="rail__label">{String(i + 1).padStart(2, "0")} {it.label}</span>
        </button>
      ))}
    </div>
  );
};

window.SideRail = SideRail;
