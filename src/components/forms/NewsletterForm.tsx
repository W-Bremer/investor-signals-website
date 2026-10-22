"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { NEWSLETTER_SUCCESS } from "@/lib/newsletter";

type Status = "idle" | "submitting" | "success";

/**
 * Newsletter sign-up. Posts to /api/newsletter, which adds the contact to GHL
 * with the "newsletter subscriber" tag.
 *
 * `inline` lays the two fields and the button out on one row (footer, end of
 * posts); `stacked` is the larger version for the /newsletter page.
 */
export function NewsletterForm({
  variant = "inline",
  className = "",
}: {
  variant?: "inline" | "stacked";
  className?: string;
}) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      <div role="status" className={`border-l-2 border-gold-500 pl-5 ${className}`}>
        <p className="font-serif text-[1.25rem] font-semibold leading-snug text-navy">{NEWSLETTER_SUCCESS}</p>
      </div>
    );
  }

  const inline = variant === "inline";

  return (
    <form onSubmit={onSubmit} className={`relative ${className}`} noValidate={false}>
      <div className={inline ? "grid gap-x-6 gap-y-5 md:grid-cols-[1fr_1.4fr_auto] md:items-end" : "grid gap-8"}>
        <div>
          <label htmlFor={`${uid}-first`} className="field-label">
            First name
          </label>
          <input
            id={`${uid}-first`}
            name="firstName"
            required
            autoComplete="given-name"
            className="field-input"
            placeholder="Jane"
          />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="field-label">
            Email
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="field-input"
            placeholder="jane@company.com"
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`link-arrow group inline-flex items-center justify-center gap-3 rounded-[2px] bg-navy font-sans font-semibold text-paper transition-colors duration-300 hover:bg-navy-800 disabled:cursor-wait disabled:opacity-60 ${
            inline ? "px-6 py-3 text-[0.9375rem]" : "mt-2 px-8 py-[1.05rem] text-[0.9375rem]"
          }`}
        >
          <span>{status === "submitting" ? "Adding you" : "Subscribe"}</span>
          <ArrowRight className="arrow-slide h-[0.85em] w-[0.85em] opacity-80" />
        </button>
      </div>

      {/* Honeypot */}
      <div className="absolute left-[-9999px] top-auto" aria-hidden>
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="mt-5 border-l-2 border-gold-600 pl-4 font-sans text-[0.9375rem] text-navy">
          {error}
        </p>
      )}
    </form>
  );
}
