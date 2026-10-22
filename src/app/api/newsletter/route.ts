import { NextResponse } from "next/server";
import { NEWSLETTER_TAG, newsletterSignupSchema, type NewsletterSignup } from "@/lib/newsletter";

export const runtime = "nodejs";

const FRIENDLY_FAILURE = "We could not add you just now. Please try again shortly.";
const SOURCE = "investorsignals.co newsletter";

type ContactResponse = { contact?: { id?: string } } | null;

/**
 * Creates or updates the contact in GHL and adds the newsletter tag.
 *
 * Two credential shapes are supported:
 *  - GHL_API_KEY + GHL_LOCATION_ID: a Private Integration token (API v2,
 *    Settings > Private Integrations, scopes contacts.readonly + contacts.write).
 *  - GHL_API_KEY alone: the legacy location API key (API v1, Settings >
 *    Business Profile).
 *
 * The tag is added with the dedicated tags endpoint rather than passed on the
 * upsert, so tags already on an existing contact are never replaced.
 */
async function addToGhl(d: NewsletterSignup): Promise<"ok" | "failed" | "unconfigured"> {
  const token = process.env.GHL_API_KEY;
  if (!token) return "unconfigured";
  const locationId = process.env.GHL_LOCATION_ID;

  const base = locationId ? "https://services.leadconnectorhq.com" : "https://rest.gohighlevel.com/v1";
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    // GHL sits behind Cloudflare, which answers error 1010 to requests
    // without a recognisable User-Agent.
    "User-Agent": "investorsignals.co/1.0 (newsletter)",
    ...(locationId ? { Version: "2021-07-28" } : {}),
  };

  const upsert = await fetch(locationId ? `${base}/contacts/upsert` : `${base}/contacts/`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...(locationId ? { locationId } : {}),
      firstName: d.firstName,
      email: d.email,
      source: SOURCE,
    }),
  }).catch((err: unknown) => {
    console.error("newsletter: GHL upsert threw:", err);
    return null;
  });

  if (!upsert || !upsert.ok) {
    if (upsert) console.error("newsletter: GHL upsert failed:", upsert.status, await upsert.text().catch(() => ""));
    return "failed";
  }

  const body = (await upsert.json().catch(() => null)) as ContactResponse;
  const id = body?.contact?.id;
  if (!id) {
    console.error("newsletter: GHL upsert returned no contact id:", JSON.stringify(body));
    return "failed";
  }

  const tag = await fetch(`${base}/contacts/${id}/tags${locationId ? "" : "/"}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ tags: [NEWSLETTER_TAG] }),
  }).catch((err: unknown) => {
    console.error("newsletter: GHL tag threw:", err);
    return null;
  });

  if (!tag || !tag.ok) {
    if (tag) console.error("newsletter: GHL tag failed:", tag.status, await tag.text().catch(() => ""));
    return "failed";
  }
  return "ok";
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
