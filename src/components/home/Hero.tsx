import { Button, TextLink } from "@/components/ui/Button";
import { NoteCard } from "@/components/home/NoteCard";
import { Parallax } from "@/components/motion/Parallax";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Quiet signal motif behind the note */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 hidden h-[560px] w-[560px] lg:block"
        viewBox="0 0 560 560"
        fill="none"
      >
        <circle cx="560" cy="0" r="220" stroke="#C5A55A" strokeOpacity="0.14" />
        <circle cx="560" cy="0" r="330" stroke="#C5A55A" strokeOpacity="0.1" />
        <circle cx="560" cy="0" r="440" stroke="#C5A55A" strokeOpacity="0.07" />
        <circle cx="560" cy="0" r="550" stroke="#0A1F3F" strokeOpacity="0.05" />
      </svg>

      <div className="container-edge grid gap-16 pb-24 pt-36 md:pt-44 lg:grid-cols-12 lg:gap-10 lg:pb-32">
        <div className="lg:col-span-7">
          <p className="hero-fade eyebrow" style={{ "--hf-delay": "150ms" } as React.CSSProperties}>
            Investor introductions and fundraising advisory
          </p>

          <div className="hero-h1-wrap">
          <h1 className="hero-h1 mt-8 font-serif text-display-xl font-semibold text-navy">
            <span className="hero-line" style={{ "--hl-delay": "250ms" } as React.CSSProperties}>
              <span>Every introduction</span>
            </span>
            <span className="hero-line" style={{ "--hl-delay": "370ms" } as React.CSSProperties}>
              <span>we make has already</span>
            </span>
            <span className="hero-line" style={{ "--hl-delay": "490ms" } as React.CSSProperties}>
              <span>been accepted.</span>
            </span>
          </h1>
          </div>

          <p
            className="hero-fade mt-8 max-w-[36rem] font-sans text-[1.0625rem] leading-[1.75] text-navy/70 md:text-[1.125rem]"
            style={{ "--hf-delay": "820ms" } as React.CSSProperties}
          >
            We connect founders and fund managers with a private network of
            angels, family offices, and venture funds, and we prepare you for
            every room you walk into. No cold outreach in your name. No success
            fees. Just meetings both sides have said yes to.
          </p>

          <div
            className="hero-fade mt-10 flex flex-wrap items-center gap-x-9 gap-y-5"
            style={{ "--hf-delay": "980ms" } as React.CSSProperties}
          >
            <Button href="/request-an-introduction">Request an Introduction</Button>
            <TextLink href="#process" arrow="down">
              See how a meeting is confirmed
            </TextLink>
          </div>
        </div>

        <div
          className="hero-fade mx-auto w-full max-w-md pt-10 lg:col-span-5 lg:max-w-none lg:self-center lg:pt-0"
          style={{ "--hf-delay": "620ms" } as React.CSSProperties}
        >
          <Parallax speed={0.05}>
            <NoteCard />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
