import { NextResponse } from "next/server";
import { introductionRequestSchema } from "@/lib/introduction-request";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

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

  // Honeypot filled: pretend success, store nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error("request-introduction: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured");
    return NextResponse.json(
      { ok: false, error: "We could not record your request just now. Please try again shortly." },
      { status: 503 },
    );
  }

  const { website: _hp, deckUrl, notes, ...rest } = parsed.data;
  const { error } = await supabase.from("introduction_requests").insert({
    audience: rest.audience,
    name: rest.name,
    email: rest.email,
    company: rest.company,
    role: rest.role,
    stage: rest.stage,
    amount: rest.amount,
    sector: rest.sector,
    deck_url: deckUrl || null,
    notes: notes || null,
  });

  if (error) {
    console.error("request-introduction insert failed:", error.message);
    return NextResponse.json(
      { ok: false, error: "We could not record your request just now. Please try again shortly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
