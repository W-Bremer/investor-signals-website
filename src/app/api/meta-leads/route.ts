import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import followup from "@/lib/signal-nyc-followup.json";

export const runtime = "nodejs";

// Meta Lead Ads webhook. Meta calls GET once to verify the callback URL, then
// POSTs a "leadgen" change for every instant-form submission. We fetch the
// lead from the Graph API and email it to LEAD_INBOXES (cc LEAD_CC) so sales
// can call it.
// Returning a non-2xx makes Meta retry the delivery, so a failed email is not
// a lost lead. With LEAD_FOLLOWUP=on, leads from the SIGNAL NYC form also get
// the event details + checkout link from Bryce (src/lib/signal-nyc-followup.json),
// cc LEAD_FOLLOWUP_CC. Resend idempotency keys keep Meta's retries from
// sending either email twice.

const GRAPH = "https://graph.facebook.com/v21.0";

type LeadgenChange = {
  field: string;
  value: { leadgen_id: string; page_id: string; form_id?: string; ad_id?: string };
};

type Lead = {
  created_time: string;
  form_id?: string;
  ad_name?: string;
  campaign_name?: string;
  field_data: { name: string; values: string[] }[];
};

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const expected = process.env.META_WEBHOOK_VERIFY_TOKEN;
  if (
    expected &&
    params.get("hub.mode") === "subscribe" &&
    params.get("hub.verify_token") === expected
  ) {
    return new Response(params.get("hub.challenge") ?? "", { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

function signatureValid(body: string, header: string | null): boolean {
  const secret = process.env.META_APP_SECRET;
  if (!secret) return true; // Optional: leads are re-fetched from Graph, so a forged ping cannot inject data.
  if (!header?.startsWith("sha256=")) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(body).digest("hex"));
  const given = Buffer.from(header.slice(7));
  return expected.length === given.length && timingSafeEqual(expected, given);
}

async function graphGet<T>(path: string, params: Record<string, string>): Promise<T> {
  const res = await fetch(`${GRAPH}${path}?${new URLSearchParams(params)}`, { cache: "no-store" });
  const json = await res.json();
  if (!res.ok) throw new Error(`Graph ${path}: ${res.status} ${JSON.stringify(json)}`);
  return json as T;
}

async function fetchLead(leadgenId: string, pageId: string): Promise<Lead> {
  const token = process.env.META_ACCESS_TOKEN!;
  const page = await graphGet<{ access_token: string }>(`/${pageId}`, {
    fields: "access_token",
    access_token: token,
  });
  return graphGet<Lead>(`/${leadgenId}`, {
    fields: "created_time,form_id,ad_name,campaign_name,field_data",
    access_token: page.access_token,
  });
}

// Meta returns multiple-choice answers as option keys; map them back to the labels on the form.
const OPTION_LABELS: Record<string, string> = {
  gp: "Fund manager / GP",
  lp_fo: "LP or family office",
  hnwi: "Accredited investor / HNWI",
  lender: "Lender",
  founder: "Founder raising capital",
  other: "Other",
};

function leadFields(lead: Lead): Record<string, string> {
  return Object.fromEntries(
    lead.field_data.map((d) => [d.name, d.values.map((v) => OPTION_LABELS[v] ?? v).join(", ")]),
  );
}

function formatLead(lead: Lead) {
  const f = leadFields(lead);
  const name = f.full_name ?? "Unknown";
  const when = new Date(lead.created_time).toLocaleString("en-US", { timeZone: "America/New_York" });
  const lines = [
    `New lead from the SIGNAL NYC Facebook/Instagram ads. Call them to close a ticket.`,
    ``,
    `Name:        ${name}`,
    `Phone:       ${f.phone_number ?? "not provided"}`,
    `Email:       ${f.email ?? "not provided"}`,
    `Role:        ${f.role ?? "not provided"}`,
    ``,
    `Submitted:   ${when} ET`,
    `Ad:          ${lead.ad_name ?? "unknown"}`,
    `Campaign:    ${lead.campaign_name ?? "unknown"}`,
  ];
  return {
    subject: `New SIGNAL NYC lead: ${name}${f.role ? ` (${f.role})` : ""}`,
    text: lines.join("\n"),
    replyTo: f.email,
  };
}

async function sendEmail(apiKey: string, idempotencyKey: string, email: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(email),
  });
  if (!res.ok) throw new Error(`Resend ${res.status} ${await res.text().catch(() => "")}`);
}

function followupFor(lead: Lead, cc: string[]) {
  const f = leadFields(lead);
  if (lead.form_id !== followup.formId || !f.email) return null;
  const firstName = (f.full_name ?? "").trim().split(/\s+/)[0] || "there";
  const fill = (t: string) => t.replaceAll("{{firstName}}", firstName);
  return {
    from: followup.from,
    to: [f.email],
    ...(cc.length ? { cc } : {}),
    reply_to: followup.replyTo,
    subject: followup.subject,
    text: fill(followup.text),
    html: fill(followup.html),
  };
}

export async function POST(request: Request) {
  const body = await request.text();
  if (!signatureValid(body, request.headers.get("x-hub-signature-256"))) {
    return new Response("Bad signature", { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const list = (v?: string) => v?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
  const inboxes = list(process.env.LEAD_INBOXES);
  const cc = list(process.env.LEAD_CC);
  const followupOn = process.env.LEAD_FOLLOWUP === "on";
  const followupCc = list(process.env.LEAD_FOLLOWUP_CC);
  if (!apiKey || !inboxes.length || !process.env.META_ACCESS_TOKEN) {
    console.error("meta-leads: RESEND_API_KEY / LEAD_INBOXES / META_ACCESS_TOKEN not configured");
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  let payload: { object?: string; entry?: { changes?: LeadgenChange[] }[] };
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const changes = (payload.entry ?? [])
    .flatMap((e) => e.changes ?? [])
    .filter((c) => c.field === "leadgen" && c.value?.leadgen_id);

  for (const change of changes) {
    try {
      const lead = await fetchLead(change.value.leadgen_id, change.value.page_id);
      const id = change.value.leadgen_id;
      const email = formatLead(lead);
      await sendEmail(apiKey, `lead-notify-${id}`, {
        from: process.env.REQUEST_FROM ?? "Investor Signals Site <onboarding@resend.dev>",
        to: inboxes,
        ...(cc.length ? { cc } : {}),
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
        subject: email.subject,
        text: email.text,
      });
      const toLead = followupOn ? followupFor(lead, followupCc) : null;
      if (toLead) await sendEmail(apiKey, `lead-followup-${id}`, toLead);
    } catch (err) {
      console.error("meta-leads: failed for lead", change.value.leadgen_id, err);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
