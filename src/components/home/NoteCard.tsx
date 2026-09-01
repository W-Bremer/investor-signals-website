"use client";

import { Fragment, useEffect, useState } from "react";
import { Check } from "@/components/ui/icons";

const QUOTE =
  "I reviewed the deck and the intake notes. This is in my lane. Happy to take the call, Thursday afternoon works.";

const TYPE_START_MS = 1400;
const TYPE_INTERVAL_MS = 17;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIMES = ["10:00", "12:00", "2:00", "4:00"];

// Quiet, unlabeled commitments already on the week: [dayIndex, rowIndex]
const BUSY: Array<[number, number]> = [
  [0, 1],
  [2, 0],
  [4, 2],
];

/**
 * The signature visual of the site: a booked calendar with the investor's
 * note laid over it. The quote types itself out, the attribution settles,
 * the confirmation stamp lands, and only then does the Thursday slot book
 * itself. Yes first, calendar second.
 */
export function NoteCard() {
  const [chars, setChars] = useState(0);
  const [done, setDone] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setChars(QUOTE.length);
      setDone(true);
      setBooked(true);
      return;
    }
    let interval: ReturnType<typeof setInterval> | undefined;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(
      setTimeout(() => {
        interval = setInterval(() => {
          setChars((c) => {
            if (c >= QUOTE.length) {
              clearInterval(interval);
              timers.push(setTimeout(() => setDone(true), 350));
              timers.push(setTimeout(() => setBooked(true), 950));
              return c;
            }
            return c + 1;
          });
        }, TYPE_INTERVAL_MS);
      }, TYPE_START_MS),
    );
    return () => {
      timers.forEach(clearTimeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  const typing = chars < QUOTE.length;

  return (
    <div className="relative">
      {/* The week that the yes lands on */}
      <div
        aria-hidden
        className="rounded-[3px] border border-navy/10 bg-[#FFFEFA] px-5 pb-24 pt-5 shadow-note"
      >
        <div className="flex items-baseline justify-between">
          <span className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-navy/55">
            This week
          </span>
          <span className="font-sans text-[0.6875rem] tracking-[0.08em] text-navy/40">
            Introductions desk
          </span>
        </div>

        <div className="mt-4 grid grid-cols-[2.4rem_repeat(5,1fr)] text-center">
          <span />
          {DAYS.map((d) => (
            <span
              key={d}
              className={`pb-2 font-sans text-[0.6875rem] font-semibold tracking-[0.06em] ${
                d === "Thu" ? "text-navy" : "text-navy/40"
              }`}
            >
              {d}
            </span>
          ))}
          {TIMES.map((time, row) => (
            <Fragment key={time}>
              <span className="border-t border-navy/10 pr-2 pt-1.5 text-right font-sans text-[0.625rem] tabular-nums text-navy/35">
                {time}
              </span>
              {DAYS.map((day, col) => {
                const isBooked = day === "Thu" && row === 2;
                const isBusy = BUSY.some(([d, r]) => d === col && r === row);
                return (
                  <div key={day} className="relative h-11 border-l border-t border-navy/10">
                    {isBusy && <div className="absolute inset-1 rounded-[2px] bg-navy/5" />}
                    {isBooked && (
                      <div
                        className="absolute inset-x-1 -top-0.5 z-10 h-[5.4rem] origin-top rounded-[2px] border-l-2 border-gold-600 bg-gold-200/70 px-1.5 py-1.5 text-left transition-all duration-500 ease-out"
                        style={{
                          opacity: booked ? 1 : 0,
                          transform: booked ? "scale(1)" : "scale(0.9)",
                        }}
                      >
                        <span className="block font-sans text-[0.6rem] font-bold leading-[1.25] text-navy">
                          Investor call
                        </span>
                        <span className="mt-0.5 flex items-center gap-1 font-sans text-[0.56rem] text-navy/70">
                          <Check className="h-2 w-2 shrink-0 text-gold-700" /> 2:30 PM
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      {/* The note that booked it, laid over the week */}
      <figure className="relative z-10 -mt-16 ml-4 rounded-[3px] border border-navy/10 bg-[#FFFEFA] p-6 shadow-note-deep md:ml-8 md:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-navy/55">
            Confirmed introduction
          </span>
          <span className="font-sans text-[0.75rem] tabular-nums tracking-[0.04em] text-navy/45">
            Thu, 4:12 PM
          </span>
        </div>

        <div className="mt-3.5 h-px w-full bg-navy/10" />

        <blockquote className="relative mt-5 font-serif text-[1.12rem] italic leading-[1.6] text-navy md:text-[1.2rem]">
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
          className="mt-5 transition-opacity duration-700 ease-out"
          style={{ opacity: done ? 1 : 0 }}
        >
          <span className="block font-sans text-[0.875rem] font-semibold text-navy/80">
            Family office principal, healthcare and medical devices
          </span>
          <span className="mt-1 block font-sans text-[0.8125rem] text-navy/55">
            Meeting confirmed before it was ever booked.
          </span>
        </figcaption>

        <div className="pointer-events-none absolute -bottom-4 right-5 md:right-7">
          <span className={`stamp bg-[#FFFEFA] ${done ? "stamp-shown" : "stamp-enter"}`}>
            Meeting confirmed
          </span>
        </div>
      </figure>

      <p className="ml-4 mt-8 font-sans text-[0.8125rem] italic text-navy/50 md:ml-8">
        The yes comes first. The calendar comes second.
      </p>
    </div>
  );
}
