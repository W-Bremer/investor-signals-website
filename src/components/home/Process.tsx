"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHead } from "@/components/sections/SectionHead";

const STEPS = [
  {
    title: "Tell us the real story",
    body: "One working session. We read the deck, ask the awkward questions, and get straight on stage, check size, sector, and what this round actually needs to close.",
  },
  {
    title: "We shortlist, and we cut hard",
    body: "Your raise gets scored against every investor in the network on five dimensions. Most names never make your list, and we tell you why they did not.",
  },
  {
    title: "The investor reads first",
    body: "Shortlisted investors get your materials. The interested ones confirm the meeting themselves. The ones who pass cost you nothing.",
  },
  {
    title: "You get the dossier",
    body: "Before every meeting, one cited page on the person across the table. Recent checks, stated thesis, how they decide, what to lead with.",
  },
  {
    title: "You walk in warm",
    body: "They asked for this meeting. You know their portfolio better than their last pitch did. That is a very different conversation.",
  },
];

export function Process() {
  const listRef = useRef<HTMLOListElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.62;
      const p = (anchor - rect.top) / rect.height;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="process" className="scroll-mt-24">
      <div className="container-edge grid gap-16 py-24 md:py-32 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHead
              label="The process"
              title="How a warm room actually happens"
              lede="Not with a bigger list. With better filters and a lot of homework, most of it done before you ever see a calendar invite."
            />
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ol ref={listRef} className="relative">
            {/* Rail */}
            <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-navy/10" />
            <span
              aria-hidden
              className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-gold-600"
              style={{ transform: `scaleY(${progress})` }}
            />

            {STEPS.map((step, i) => {
              const active = progress > (i + 0.35) / STEPS.length;
              return (
                <li key={step.title} className="relative pb-14 pl-12 last:pb-0 md:pl-16">
                  {/* Node */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-[0.55rem] block h-[15px] w-[15px] rounded-full border transition-all duration-500 ${
                      active
                        ? "border-gold-600 bg-gold-600 shadow-[0_0_0_5px_rgba(197,165,90,0.18)]"
                        : "border-navy/25 bg-paper"
                    }`}
                  />
                  <div className="process-step" data-active={active ? "" : undefined}>
                    <div className="flex items-baseline gap-5">
                      <span
                        className={`font-serif text-[1.05rem] tabular-nums transition-colors duration-500 ${
                          active ? "text-gold-600" : "text-navy/35"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-serif text-display-sm font-semibold text-navy">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-3.5 max-w-[34rem] font-sans text-[1rem] leading-[1.75] text-navy/70 md:pl-11">
                      {step.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
