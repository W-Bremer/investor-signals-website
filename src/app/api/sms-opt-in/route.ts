import { NextResponse } from "next/server";
import { normalizePhone, smsOptInSchema } from "@/lib/sms";
import { recordSmsConsent, requestMeta } from "@/lib/sms-consent";

export const runtime = "nodejs";

const FRIENDLY_FAILURE = "We could not save your opt-in just now. Please try again shortly.";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = smsOptInSchema.safeParse(payload);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Please check the form and try again." },
      { status: 422 },
    );
  }

  // Honeypot filled: pretend success, store nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const d = parsed.data;
  const meta = requestMeta(request);
  const result = await recordSmsConsent({
    name: d.name,
    email: d.email,
    phone: normalizePhone(d.phone)!,
    consentedAt: new Date().toISOString(),
    disclosureVersion: d.disclosureVersion,
    source: "sms-opt-in",
    pageUrl: d.pageUrl || meta.referer,
    ip: meta.ip,
    userAgent: meta.userAgent,
  });

  if (result.ghl === "ok" || result.email === "ok") {
    return NextResponse.json({ ok: true });
  }
  console.error("sms-opt-in: consent could not be stored anywhere:", result);
  return NextResponse.json(
    { ok: false, error: FRIENDLY_FAILURE },
    { status: result.ghl === "unconfigured" && result.email === "unconfigured" ? 503 : 502 },
  );
}
