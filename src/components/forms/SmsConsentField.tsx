"use client";

import Link from "next/link";
import { useId } from "react";
import { SMS_CONSENT_TEXT, SMS_DISCLOSURE_VERSION } from "@/lib/sms";

/**
 * The SMS consent checkbox, unchecked by default, with the full disclosure
 * and links to Privacy and Terms beside it. Posts the disclosure version it
 * displayed so the server can record exactly what the person agreed to.
 */
export function SmsConsentField({ required = false }: { required?: boolean }) {
  const id = useId();
  return (
    <div className="rounded-[3px] border border-navy/10 bg-paper-tint/70 px-5 py-4">
      <div className="flex items-start gap-3">
        <input
          id={`${id}-sms`}
          name="smsConsent"
          type="checkbox"
          required={required}
          className="mt-[0.3rem] h-4 w-4 shrink-0 cursor-pointer accent-navy"
        />
        <label htmlFor={`${id}-sms`} className="cursor-pointer font-sans text-[0.875rem] leading-[1.65] text-navy/75">
          {SMS_CONSENT_TEXT}{" "}
          See our{" "}
          <Link href="/privacy" className="font-semibold text-navy underline decoration-gold-500/60 underline-offset-4 hover:decoration-gold-600">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="font-semibold text-navy underline decoration-gold-500/60 underline-offset-4 hover:decoration-gold-600">
            Terms
          </Link>
          .
        </label>
      </div>
      <input type="hidden" name="disclosureVersion" value={SMS_DISCLOSURE_VERSION} />
    </div>
  );
}
