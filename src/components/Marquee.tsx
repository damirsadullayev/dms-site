"use client";

import { useState, type ReactNode } from "react";

type TickerItem =
  | { kind: "stat"; num: string; label: string }
  | { kind: "phrase"; text: string };

const ITEMS: TickerItem[] = [
  { kind: "stat", num: "24h", label: "First reply" },
  { kind: "phrase", text: "Brands meet creators." },
  { kind: "stat", num: "5d", label: "Shortlist" },
  { kind: "phrase", text: "Without the noise." },
  { kind: "stat", num: "1:1", label: "Single owner" },
  { kind: "phrase", text: "One operator. One thread. One invoice." },
  { kind: "stat", num: "0", label: "Handoffs" },
  { kind: "phrase", text: "Decisions in hours. Not weeks." },
  { kind: "stat", num: "1", label: "Vertical" },
];

const Item = ({ it }: { it: TickerItem }) => {
  if (it.kind === "stat") {
    return (
      <span className="ticker__item">
        <span className="accent">{it.num}</span>
        <span className="dash">—</span>
        <span
          style={{
            color: "var(--fg-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.48em",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {it.label}
        </span>
      </span>
    );
  }
  return <span className="ticker__item">{it.text}</span>;
};

const Sep = () => (
  <span className="ticker__sep" aria-hidden="true">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <path d="M5 5l14 14M5 19L19 5" />
    </svg>
  </span>
);

export const Marquee = () => {
  const [paused, setPaused] = useState(false);
  const list: ReactNode[] = [];
  ITEMS.forEach((it, i) => {
    list.push(<Item key={`a-${i}`} it={it} />);
    list.push(<Sep key={`as-${i}`} />);
  });

  return (
    <div
      id="ticker"
      data-screen-label="02 Ticker"
      className="ticker marquee"
      data-paused={paused}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="marquee__track" aria-hidden="false">
        {list}
      </div>
      <div className="marquee__track" aria-hidden="true">
        {list}
      </div>
    </div>
  );
};
