import type { CSSProperties, SVGProps } from "react";

export type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "arrow-down"
  | "check"
  | "x"
  | "mail"
  | "menu"
  | "dot"
  | "minus"
  | "plus"
  | "spark";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  style?: CSSProperties;
}

export const Icon = ({ name, size = 18, style = {}, ...rest }: IconProps) => {
  const common: SVGProps<SVGSVGElement> = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "square",
    strokeLinejoin: "miter",
    style,
    ...rest,
  };
  switch (name) {
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="M13 5l7 7-7 7" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg {...common}>
          <path d="M7 17L17 7" />
          <path d="M8 7h9v9" />
        </svg>
      );
    case "arrow-down":
      return (
        <svg {...common}>
          <path d="M12 5v14" />
          <path d="M5 13l7 7 7-7" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M5 12l5 5L20 7" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="1" />
          <path d="M3 7l9 7 9-7" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "dot":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
        </svg>
      );
    case "minus":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
        </svg>
      );
    default:
      return null;
  }
};
