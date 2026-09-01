/**
 * A mock page from an investor prep dossier. Names are redacted bars on
 * purpose: the point is the shape of the work, not a fabricated investor.
 */
export function DossierGraphic() {
  return (
    <div
      aria-hidden
      className="relative rotate-[0.8deg] rounded-[3px] border border-navy/10 bg-[#FFFEFA] p-6 shadow-note md:p-7"
    >
      <div className="flex items-baseline justify-between">
        <span className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-navy/55">
          Investor prep dossier
        </span>
        <span className="font-sans text-[0.6875rem] tracking-[0.08em] text-navy/40">
          One page, cited
        </span>
      </div>
      <div className="mt-3 h-px w-full bg-gold-500/60" />

      <div className="mt-5 flex items-center gap-3">
        <span className="h-3.5 w-36 rounded-[2px] bg-navy/15" />
        <span className="font-sans text-[0.6875rem] text-navy/45">Family office · Healthcare</span>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-navy/45">
            Recent investments
          </p>
          <div className="mt-2 space-y-2">
            <p className="flex items-center gap-1.5">
              <span className="h-2 w-4/5 rounded-[2px] bg-navy/10" />
              <sup className="font-sans text-[0.55rem] font-bold text-gold-700">1</sup>
            </p>
            <p className="flex items-center gap-1.5">
              <span className="h-2 w-3/5 rounded-[2px] bg-navy/10" />
              <sup className="font-sans text-[0.55rem] font-bold text-gold-700">2</sup>
            </p>
          </div>
        </div>
        <div>
          <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-navy/45">
            Stated thesis
          </p>
          <div className="mt-2 space-y-2">
            <p className="flex items-center gap-1.5">
              <span className="h-2 w-full rounded-[2px] bg-navy/10" />
            </p>
            <p className="flex items-center gap-1.5">
              <span className="h-2 w-2/3 rounded-[2px] bg-navy/10" />
              <sup className="font-sans text-[0.55rem] font-bold text-gold-700">3</sup>
            </p>
          </div>
        </div>
        <div>
          <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-navy/45">
            Suggested talking points
          </p>
          <div className="mt-2 space-y-2">
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" />
              <span className="h-2 w-3/4 rounded-[2px] bg-navy/10" />
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" />
              <span className="h-2 w-1/2 rounded-[2px] bg-navy/10" />
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 border-t border-navy/10 pt-3 font-sans text-[0.6875rem] italic text-navy/45">
        Delivered before you walk into the room.
      </p>
    </div>
  );
}
