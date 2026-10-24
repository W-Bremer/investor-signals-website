import { addNote, addTags, ghlConfigured, splitName, upsertContact } from "@/lib/ghl";
import { SMS_CONSENT_TAG, SMS_CONSENT_TEXT } from "@/lib/sms";

/** Everything we keep as evidence of an SMS opt-in. */
export type SmsConsentRecord = {
  name: string;
  email: string;
  /** E.164. */
  phone: string;
  /** ISO 8601, UTC. */
  consentedAt: string;
  disclosureVersion: string;
  source: "request-an-introduction" | "sms-opt-in";
  pageUrl: string;
  ip: string;
  userAgent: string;
};

export function requestMeta(request: Request): { ip: string; userAgent: string; referer: string } {
  const fwd = request.headers.get("x-forwarded-for") ?? "";
  return {
    ip: fwd.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown",
    userAgent: request.headers.get("user-agent") ?? "unknown",
    referer: request.headers.get("referer") ?? "",
  };
}

export function formatConsentRecord(r: SmsConsentRecord): string {
  return [
    `Name:               ${r.name}`,
    `Email:              ${r.email}`,
    `Mobile (E.164):     ${r.phone}`,
    `Consented at (UTC): ${r.consentedAt}`,
    `Disclosure version: ${r.disclosureVersion}`,
    `Source form:        ${r.source}`,
    `Page:               ${r.pageUrl || "not provided"}`,
    `IP address:         ${r.ip}`,
    `User agent:         ${r.userAgent}`,
    ``,
    `Disclosure shown (verbatim):`,
    SMS_CONSENT_TEXT,
  ].join("\n");
}

export type RecordResult = { ghl: "ok" | "failed" | "unconfigured"; email: "ok" | "failed" | "unconfigured" };

/**
 * Stores the opt-in in two places: the GHL contact (phone, "sms consent"
 * tag, and a timeline note with the full record) and an email to the
 * request inbox, which doubles as an append-only consent log.
 */
export async function recordSmsConsent(r: SmsConsentRecord): Promise<RecordResult> {
  const result: RecordResult = { ghl: "unconfigured", email: "unconfigured" };
  const text = formatConsentRecord(r);

  if (ghlConfigured()) {
    const id = await upsertContact({
      email: r.email,
      ...splitName(r.name),
      phone: r.phone,
      source: `investorsignals.co ${r.source}`,
    });
    if (id) {
      const tagged = await addTags(id, [SMS_CONSENT_TAG]);
      const noted = await addNote(id, `SMS opt-in recorded by investorsignals.co\n\n${text}`);
      result.ghl = tagged && noted ? "ok" : "failed";
    } else {
      result.ghl = "failed";
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.REQUEST_INBOX;
  if (apiKey && inbox) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.REQUEST_FROM ?? "Investor Signals Site <onboarding@resend.dev>",
        to: [inbox],
        ...(process.env.REQUEST_CC ? { cc: process.env.REQUEST_CC.split(",").map((s) => s.trim()) } : {}),
        subject: `SMS opt-in: ${r.name} (${r.phone})`,
        text: `SMS consent record from investorsignals.co. Keep this message as evidence of the opt-in.\n\n${text}`,
      }),
    }).catch((err: unknown) => {
      console.error("sms-consent: email threw:", err);
      return null;
    });
    if (res && !res.ok) console.error("sms-consent: email failed:", res.status, await res.text().catch(() => ""));
    result.email = res && res.ok ? "ok" : "failed";
  }

  return result;
}
