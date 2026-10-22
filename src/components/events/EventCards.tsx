import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { REQUEST_INVITE_URL, TOUR_EVENTS } from "@/lib/signal-nyc";

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" aria-hidden fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="7" width="10" height="7.5" rx="1" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}

export function EventCards() {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        {TOUR_EVENTS.map((ev, i) => {
          const locked = ev.status === "Locked";
          return (
            <Reveal key={ev.name} delay={i * 80} className="flex">
              <article
                className={`flex w-full flex-col rounded-[3px] border p-6 ${
                  locked
                    ? "border-dashed border-navy/20 bg-transparent"
                    : "border-navy/10 bg-[#FFFEFA] shadow-note"
                }`}
              >
                <p
                  className={`inline-flex items-center gap-1.5 font-sans text-[0.625rem] font-bold uppercase tracking-[0.22em] ${
                    locked ? "text-navy/40" : "text-gold-700"
                  }`}
                >
                  {locked ? <LockIcon className="h-[1.1em] w-[1.1em]" /> : <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold-500" />}
                  {ev.status}
                </p>
                <h3 className={`mt-5 font-serif text-[1.45rem] font-semibold leading-tight ${locked ? "text-navy/45" : "text-navy"}`}>
                  {ev.name}
                </h3>
                <dl className={`mt-4 space-y-1.5 font-sans text-[0.9375rem] leading-snug ${locked ? "text-navy/40" : "text-navy/70"}`}>
                  <div>
                    <dt className="sr-only">City</dt>
                    <dd>{ev.city}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Date</dt>
                    <dd className={locked ? "" : "font-semibold text-navy"}>{ev.date}</dd>
                  </div>
                  {ev.format && (
                    <div>
                      <dt className="sr-only">Format</dt>
                      <dd>{ev.format}</dd>
                    </div>
                  )}
                </dl>
                {!locked && (
                  <a
                    href={REQUEST_INVITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow group mt-auto inline-flex items-center gap-2.5 pt-8 font-sans text-[0.9375rem] font-semibold text-navy transition-colors duration-300 hover:text-navy-600"
                  >
                    <span className="link-quiet">Request an invitation</span>
                    <ArrowRight className="arrow-slide h-[0.8em] w-[0.8em] text-gold-600" />
                  </a>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={400}>
        <p className="mt-7 font-sans text-[0.875rem] text-navy/55">
          Exclusive to Synapse Network members. Free until December 1.
        </p>
      </Reveal>
    </>
  );
}
