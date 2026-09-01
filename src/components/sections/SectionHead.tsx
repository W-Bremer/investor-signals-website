import type { ReactNode } from "react";
import { Reveal, RuleDraw } from "@/components/motion/Reveal";

/**
 * Standard section opener: a small-caps label beside a hairline that draws
 * itself in, then the serif heading and optional lede beneath.
 */
export function SectionHead({
  label,
  title,
  lede,
  onNavy = false,
  className = "",
}: {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  onNavy?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal className="flex items-center gap-5">
        <span className={`eyebrow whitespace-nowrap ${onNavy ? "!text-gold-400" : ""}`}>{label}</span>
        <RuleDraw className={onNavy ? "flex-1 text-paper/20" : "flex-1 text-navy/15"} delay={150} />
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={`mt-7 max-w-3xl font-serif text-display-lg font-semibold ${
            onNavy ? "text-ivory" : "text-navy"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={180}>
          <p
            className={`mt-6 max-w-prose font-sans text-[1.0625rem] leading-[1.75] ${
              onNavy ? "text-paper/70" : "text-navy/70"
            }`}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
