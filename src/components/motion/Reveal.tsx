"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Delay in ms before the transition starts once in view. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: CSSProperties;
  id?: string;
};

/**
 * Fades and rises an element in the first time it enters the viewport.
 * Pure CSS transition driven by a data attribute, so the cost is one
 * IntersectionObserver per element and nothing on the main thread after.
 */
export function Reveal({ children, delay = 0, y = 26, className, as = "div", style, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as never}
      id={id}
      data-reveal
      data-shown={shown ? "" : undefined}
      className={className}
      style={{ "--rv-delay": `${delay}ms`, "--rv-y": `${y}px`, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * A hairline rule that draws itself from left to right when it enters view.
 */
export function RuleDraw({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      data-shown={shown ? "" : undefined}
      className={`rule-draw ${className}`}
      style={{ "--rd-delay": `${delay}ms` } as CSSProperties}
    />
  );
}
