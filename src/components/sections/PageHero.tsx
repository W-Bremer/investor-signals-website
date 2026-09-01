import type { ReactNode } from "react";

/**
 * Inner-page opener. Uses the CSS-only entrance animation so it plays
 * immediately on navigation, before hydration.
 */
export function PageHero({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-navy/10">
      <div className="container-edge pb-16 pt-36 md:pb-20 md:pt-44">
        <p className="hero-fade eyebrow" style={{ "--hf-delay": "100ms" } as React.CSSProperties}>
          {label}
        </p>
        <h1
          className="hero-fade mt-7 max-w-4xl font-serif text-display-xl font-semibold text-navy"
          style={{ "--hf-delay": "220ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="hero-fade mt-8 max-w-[44rem] font-sans text-[1.0625rem] leading-[1.8] text-navy/70 md:text-[1.125rem]"
            style={{ "--hf-delay": "380ms" } as React.CSSProperties}
          >
            {intro}
          </p>
        )}
        {children && (
          <div className="hero-fade mt-10" style={{ "--hf-delay": "520ms" } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
