import type { SVGProps } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" aria-hidden {...base} {...props}>
      <path d="M1.5 8h12M9.5 3.5 14 8l-4.5 4.5" />
    </svg>
  );
}

export function ArrowDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" aria-hidden {...base} {...props}>
      <path d="M8 1.5v12M3.5 9.5 8 14l4.5-4.5" />
    </svg>
  );
}

export function Check(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" aria-hidden {...base} {...props}>
      <path d="M2.5 8.5 6 12l7.5-8" />
    </svg>
  );
}

export function Plus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" aria-hidden {...base} {...props}>
      <path d="M8 2v12M2 8h12" />
    </svg>
  );
}

export function Minus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" aria-hidden {...base} {...props}>
      <path d="M2 8h12" />
    </svg>
  );
}
