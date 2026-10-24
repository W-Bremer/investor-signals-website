"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { SmsConsentField } from "@/components/forms/SmsConsentField";

type Status = "idle" | "submitting" | "success";

export function SmsOptInForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("submitting");
    try {
      const res = await fetch("/api/sms-opt-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          smsConsent: data.smsConsent === "on",
          pageUrl: window.location.href,
        }),
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
      <div role="status" className="rounded-[3px] border border-navy/10 bg-[#FFFEFA] p-10 shadow-note md:p-12">
        <span aria-hidden className="block h-10 w-px bg-gold-500" />
        <h2 className="mt-8 font-serif text-display-md font-semibold text-navy">You are opted in.</h2>
        <p className="mt-5 max-w-md font-sans text-[1.0625rem] leading-[1.75] text-navy/70">
          We will text you about your inquiry and your appointments, and
          nothing else. Reply STOP to any message to opt out, or HELP for
          help.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative rounded-[3px] border border-navy/10 bg-[#FFFEFA] p-8 shadow-note md:p-10">
      <div className="grid gap-8">
        <div>
          <label htmlFor="s-name" className="field-label">
            Full name
          </label>
          <input id="s-name" name="name" required autoComplete="name" className="field-input" placeholder="Jane Ellery" />
        </div>
        <div>
          <label htmlFor="s-email" className="field-label">
            Email
          </label>
          <input id="s-email" name="email" type="email" required autoComplete="email" className="field-input" placeholder="jane@company.com" />
        </div>
        <div>
          <label htmlFor="s-phone" className="field-label">
            Mobile number
          </label>
          <input id="s-phone" name="phone" type="tel" required autoComplete="tel" className="field-input" placeholder="(305) 555-0100" />
        </div>
        <SmsConsentField required />
      </div>

      {/* Honeypot */}
      <div className="absolute left-[-9999px] top-auto" aria-hidden>
        <label htmlFor="s-website">Leave this field empty</label>
        <input id="s-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="mt-8 border-l-2 border-gold-600 pl-4 font-sans text-[0.9375rem] text-navy">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="link-arrow group mt-8 inline-flex items-center gap-3 rounded-[2px] bg-navy px-8 py-[1.05rem] font-sans text-[0.9375rem] font-semibold text-paper transition-colors duration-300 hover:bg-navy-800 disabled:cursor-wait disabled:opacity-60"
      >
        <span>{status === "submitting" ? "Saving" : "Confirm opt-in"}</span>
        <ArrowRight className="arrow-slide h-[0.85em] w-[0.85em] opacity-80" />
      </button>
    </form>
  );
}
