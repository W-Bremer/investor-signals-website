import { NextResponse } from "next/server";
import { introductionRequestSchema, type IntroductionRequest } from "@/lib/introduction-request";

export const runtime = "nodejs";

const FRIENDLY_FAILURE =
  "We could not send your request just now. Please try again shortly.";

function formatEmail(d: IntroductionRequest): string {
  const kind = d.audience === "startup" ? "Startup raise" : "Fund raise";
  const lines = [
    `New introduction request from investorsignals.co`,
    ``,
    `Type:        ${kind}`,
    `Name:        ${d.name}`,
    `Email:       ${d.email}`,
    `Company:     ${d.company}`,
    `Role:        ${d.role}`,
    `Stage:       ${d.stage}`,
    `Amount:      ${d.amount}`,
    `Sector:      ${d.sector}`,
    `Deck:        ${d.deckUrl || "not provided"}`,
  ];
  if (d.notes) {
    lines.push(``, `Notes:`, d.notes);
  }
  return lines.join("\n");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = introductionRequestSchema.safeParse(payload);
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

  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.REQUEST_INBOX;
  if (!apiKey || !inbox) {
    console.error("request-introduction: RESEND_API_KEY / REQUEST_INBOX not configured");
    return NextResponse.json({ ok: false, error: FRIENDLY_FAILURE }, { status: 503 });
  }

  const d = parsed.data;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.REQUEST_FROM ?? "Investor Signals Site <onboarding@resend.dev>",
      to: [inbox],
      reply_to: d.email,
      subject: `Introduction request: ${d.company} (${d.audience === "startup" ? "startup" : "fund manager"})`,
      text: formatEmail(d),
    }),
  }).catch((err: unknown) => {
    console.error("request-introduction: email send threw:", err);
    return null;
  });

  if (!res || !res.ok) {
    if (res) {
      console.error(
        "request-introduction: email send failed:",
        res.status,
        await res.text().catch(() => ""),
      );
    }
    return NextResponse.json({ ok: false, error: FRIENDLY_FAILURE }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
