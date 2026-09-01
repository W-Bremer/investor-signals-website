import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/ui/icons";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "onNavy";
  className?: string;
};

const styles = {
  primary:
    "bg-navy text-paper hover:bg-navy-800 focus-visible:outline-navy",
  outline:
    "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-paper focus-visible:outline-navy",
  onNavy:
    "bg-paper text-navy hover:bg-ivory focus-visible:outline-paper",
} as const;

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`link-arrow group inline-flex items-center gap-3 rounded-[2px] px-7 py-[1.05rem] font-sans text-[0.9375rem] font-semibold tracking-[0.01em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="arrow-slide h-[0.85em] w-[0.85em] opacity-80" />
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className = "",
  arrow = "right",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: "right" | "down" | "none";
}) {
  return (
    <Link
      href={href}
      className={`link-arrow inline-flex items-center gap-2.5 font-sans text-[0.9375rem] font-semibold text-navy transition-colors duration-300 hover:text-navy-600 ${className}`}
    >
      <span className="link-quiet">{children}</span>
      {arrow === "right" && <ArrowRight className="arrow-slide h-[0.8em] w-[0.8em] text-gold-600" />}
      {arrow === "down" && (
        <svg viewBox="0 0 16 16" width="0.8em" height="0.8em" aria-hidden fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="arrow-slide text-gold-600">
          <path d="M8 1.5v12M3.5 9.5 8 14l4.5-4.5" />
        </svg>
      )}
    </Link>
  );
}
