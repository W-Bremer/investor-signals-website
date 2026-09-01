"use client";

import { useEffect, useState } from "react";

const QUOTE =
  "I reviewed the deck and the intake notes. This is in my lane. Happy to take the call, Thursday afternoon works.";

const TYPE_START_MS = 1500;
const TYPE_INTERVAL_MS = 17;

/**
 * The signature visual of the site: a forwarded note showing what a confirmed
 * introduction looks like. The quote types itself out on first load, then the
 * attribution settles in and the confirmation stamp lands.
 */
export function NoteCard() {
  const [chars, setChars] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setChars(QUOTE.length);
      setDone(true);
      return;
    }
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setChars((c) => {
          if (c >= QUOTE.length) {
            clearInterval(interval);
            setTimeout(() => setDone(true), 350);
            return c;
          }
          return c + 1;
        });
      }, TYPE_INTERVAL_MS);
    }, TYPE_START_MS);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, []);

  const typing = chars < QUOTE.length;

  return (
    <div className="relative">
      {/* The next paper in the stack, peeking out behind */}
      <div
        aria-hidden
        className="absolute -top-9 left-6 right-2 rotate-[1.4deg] rounded-[3px] border border-navy/10 bg-[#F7F5EE] px-6 pb-16 pt-4 shadow-sm"
      >
        <div className="flex items-baseline justify-between">
          <span className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-navy/45">
            Investor prep dossier
          </span>
          <span className="font-sans text-[0.625rem] tracking-[0.08em] text-navy/40">
            One page, cited
          </span>
        </div>
      </div>

      <figure className="relative rounded-[3px] border border-navy/10 bg-[#FFFEFA] p-7 shadow-note-deep md:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-navy/55">
            Confirmed introduction
          </span>
          <span className="font-sans text-[0.75rem] tabular-nums tracking-[0.04em] text-navy/45">
            Thu, 4:12 PM
          </span>
        </div>

        <div className="mt-4 h-px w-full bg-navy/10" />

        <blockquote className="relative mt-6 font-serif text-[1.2rem] italic leading-[1.6] text-navy md:text-[1.28rem]">
          {/* Full quote reserves the final height; typed text paints over it */}
          <span aria-hidden className="invisible block">
            &ldquo;{QUOTE}&rdquo;
          </span>
          <span aria-hidden className="absolute inset-0 block">
            &ldquo;{QUOTE.slice(0, chars)}
            {!typing && <>&rdquo;</>}
            {typing && <span className="note-caret" />}
          </span>
          <span className="sr-only">&ldquo;{QUOTE}&rdquo;</span>
        </blockquote>

        <figcaption
          className="mt-6 transition-opacity duration-700 ease-out"
          style={{ opacity: done ? 1 : 0 }}
        >
          <span className="block font-sans text-[0.875rem] font-semibold text-navy/80">
            Family office principal, healthcare and medical devices
          </span>
          <span className="mt-1 block font-sans text-[0.8125rem] text-navy/55">
            Meeting confirmed before it was ever booked.
          </span>
        </figcaption>

        <div className="pointer-events-none absolute -bottom-4 right-6 md:right-8">
          <span className={`stamp bg-[#FFFEFA] ${done ? "stamp-shown" : "stamp-enter"}`}>
            Meeting confirmed
          </span>
        </div>
      </figure>

      <p className="mt-8 text-center font-sans text-[0.8125rem] italic text-navy/50 md:text-left">
        What a confirmed introduction looks like.
      </p>
    </div>
  );
}
