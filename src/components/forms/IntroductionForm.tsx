"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AUDIENCES, FUND_STAGES, STARTUP_STAGES } from "@/lib/introduction-request";
import { ArrowRight } from "@/components/ui/icons";

type Audience = (typeof AUDIENCES)[number];
type Status = "idle" | "submitting" | "success";

const COPY: Record<
  Audience,
  {
    toggle: string;
    company: string;
    stage: string;
    stages: readonly string[];
    amount: string;
    amountHint: string;
    sector: string;
    sectorHint: string;
    deck: string;
  }
> = {
  startup: {
    toggle: "A startup raise",
    company: "Company",
    stage: "Raise stage",
    stages: STARTUP_STAGES,
    amount: "Target raise",
    amountHint: "$2.5M",
    sector: "Sector",
    sectorHint: "Healthcare, medical devices",
    deck: "Link to your deck (optional)",
  },
  "fund-manager": {
    toggle: "A fund raise",
    company: "Fund name",
    stage: "Fund number",
    stages: FUND_STAGES,
    amount: "Target fund size",
    amountHint: "$25M",
    sector: "Strategy and focus",
    sectorHint: "B2B software, pre-seed and seed",
    deck: "Link to your deck or LP materials (optional)",
  },
};

export function IntroductionForm() {
  const [audience, setAudience] = useState<Audience>("startup");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const about = new URLSearchParams(window.location.search).get("about");
    if (about === "fund-manager") setAudience("fund-manager");
  }, []);

  const copy = COPY[audience];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");
    try {
      const res = await fetch("/api/request-introduction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, audience }),
      });
      const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (res.ok && body?.ok) {
        setStatus("success");
      } else {
        setStatus("idle");
        setError(body?.error ?? "Something went wrong on our end. Please try again.");
      }
    } catch {
      setStatus("idle");
      setError("Something went wrong on our end. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[3px] border border-navy/10 bg-[#FFFEFA] p-10 shadow-note md:p-12">
        <span aria-hidden className="block h-10 w-px bg-gold-500" />
        <h2 className="mt-8 font-serif text-display-md font-semibold text-navy">Got it.</h2>
        <p className="mt-5 max-w-md font-sans text-[1.0625rem] leading-[1.75] text-navy/70">
          A person reads every one of these, and yours is in the pile now. We
          will come back to you to set up the call, and if we are not the fit,
          we will tell you quickly instead of stringing you along.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      {/* Audience toggle */}
      <fieldset>
        <legend className="field-label">This request is about</legend>
        <div className="mt-1 inline-flex rounded-[2px] border border-navy/20 p-1">
          {AUDIENCES.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAudience(a)}
              aria-pressed={audience === a}
              className={`rounded-[1px] px-5 py-2.5 font-sans text-[0.875rem] font-semibold transition-all duration-300 ${
                audience === a ? "bg-navy text-paper" : "text-navy/60 hover:text-navy"
              }`}
            >
              {COPY[a].toggle}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="field-label">
            Full name
          </label>
          <input id="f-name" name="name" required autoComplete="name" className="field-input" placeholder="Jane Ellery" />
        </div>
        <div>
          <label htmlFor="f-email" className="field-label">
            Work email
          </label>
          <input
            id="f-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="field-input"
            placeholder="jane@company.com"
          />
        </div>
        <div>
          <label htmlFor="f-company" className="field-label">
            {copy.company}
          </label>
          <input id="f-company" name="company" required autoComplete="organization" className="field-input" />
        </div>
        <div>
          <label htmlFor="f-role" className="field-label">
            Your role
          </label>
          <input id="f-role" name="role" required autoComplete="organization-title" className="field-input" placeholder="Founder and CEO" />
        </div>
        <div>
          <label htmlFor="f-stage" className="field-label">
            {copy.stage}
          </label>
          <select id="f-stage" name="stage" required className="field-input" defaultValue="">
            <option value="" disabled>
              Select
            </option>
            {copy.stages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-amount" className="field-label">
            {copy.amount}
          </label>
          <input id="f-amount" name="amount" required className="field-input" placeholder={copy.amountHint} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="f-sector" className="field-label">
            {copy.sector}
          </label>
          <input id="f-sector" name="sector" required className="field-input" placeholder={copy.sectorHint} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="f-deck" className="field-label">
            {copy.deck}
          </label>
          <input
            id="f-deck"
            name="deckUrl"
            type="url"
            className="field-input"
            placeholder="DocSend, Google Drive, or similar. You can also send it after we reply."
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="f-notes" className="field-label">
            Anything else (optional)
          </label>
          <textarea
            id="f-notes"
            name="notes"
            rows={4}
            className="field-input resize-y"
            placeholder="Where does the raise stand? Timeline, traction, anything we should read first."
          />
        </div>
      </div>

      {/* Honeypot */}
      <div className="absolute left-[-9999px] top-auto" aria-hidden>
        <label htmlFor="f-website">Leave this field empty</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="mt-8 border-l-2 border-gold-600 pl-4 font-sans text-[0.9375rem] text-navy">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="link-arrow group mt-10 inline-flex items-center gap-3 rounded-[2px] bg-navy px-8 py-[1.05rem] font-sans text-[0.9375rem] font-semibold text-paper transition-colors duration-300 hover:bg-navy-800 disabled:cursor-wait disabled:opacity-60"
      >
        <span>{status === "submitting" ? "Sending" : "Send request"}</span>
        <ArrowRight className="arrow-slide h-[0.85em] w-[0.85em] opacity-80" />
      </button>

      <p className="mt-6 max-w-md font-sans text-[0.8125rem] leading-relaxed text-navy/50">
        Your materials go only to investors who have been matched to your
        raise, and only with your consent.
      </p>
    </form>
  );
}
