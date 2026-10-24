import { NextResponse } from "next/server";
import { NEWSLETTER_TAG, newsletterSignupSchema, type NewsletterSignup } from "@/lib/newsletter";
import { addTags, ghlConfigured, upsertContact } from "@/lib/ghl";

export const runtime = "nodejs";

const FRIENDLY_FAILURE = "We could not add you just now. Please try again shortly.";
const SOURCE = "investorsignals.co newsletter";

/** Creates or updates the contact and adds the newsletter tag. */
async function addToGhl(d: NewsletterSignup): Promise<"ok" | "failed" | "unconfigured"> {
  if (!ghlConfigured()) return "unconfigured";
  const id = await upsertContact({ email: d.email, firstName: d.firstName, source: SOURCE });
  if (!id) return "failed";
  return (await addTags(id, [NEWSLETTER_TAG])) ? "ok" : "failed";
}

/** Fallback when GHL is not configured: email the sign-up to the request inbox. */
async function emailFallback(d: NewsletterSignup): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.REQUEST_INBOX;
  if (!apiKey || !inbox) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.REQUEST_FROM ?? "Investor Signals Site <onboarding@resend.dev>",
      to: [inbox],
      reply_to: d.email,
      subject: `Newsletter sign-up: ${d.firstName} (${d.email})`,
      text: [
        "New newsletter sign-up from investorsignals.co",
        "",
        `First name: ${d.firstName}`,
        `Email:      ${d.email}`,
        "",
        `GHL is not configured on the site, so this was not added automatically. Add the contact with the tag "${NEWSLETTER_TAG}".`,
      ].join("\n"),
    }),
  }).catch(() => null);
  return !!res && res.ok;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = newsletterSignupSchema.safeParse(payload);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Please check the form and try again." },
      { status: 422 },
    );
  }

  // Honeypot filled: pretend success, send nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const result = await addToGhl(parsed.data);
  if (result === "ok") return NextResponse.json({ ok: true });

  if (result === "unconfigured") {
    console.warn("newsletter: GHL_API_KEY not set; falling back to email");
    if (await emailFallback(parsed.data)) return NextResponse.json({ ok: true });
    console.error("newsletter: neither GHL nor Resend is configured");
    return NextResponse.json({ ok: false, error: FRIENDLY_FAILURE }, { status: 503 });
  }

  return NextResponse.json({ ok: false, error: FRIENDLY_FAILURE }, { status: 502 });
}
