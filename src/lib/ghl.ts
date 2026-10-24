/**
 * Minimal GHL (GoHighLevel / LeadConnector) client for the server routes.
 *
 * Credentials: GHL_API_KEY plus GHL_LOCATION_ID for a Private Integration
 * token (API v2), or GHL_API_KEY alone for the legacy location key (API v1).
 * GHL sits behind Cloudflare, which answers error 1010 to requests without
 * a recognisable User-Agent, so every call sets one.
 */

type ContactResponse = { contact?: { id?: string } } | null;

export function ghlConfigured(): boolean {
  return !!process.env.GHL_API_KEY;
}

function base(): { url: string; v2: boolean; headers: Record<string, string> } {
  const token = process.env.GHL_API_KEY ?? "";
  const locationId = process.env.GHL_LOCATION_ID;
  const v2 = !!locationId;
  return {
    url: v2 ? "https://services.leadconnectorhq.com" : "https://rest.gohighlevel.com/v1",
    v2,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "investorsignals.co/1.0",
      ...(v2 ? { Version: "2021-07-28" } : {}),
    },
  };
}

async function post(path: string, body: unknown, label: string): Promise<Response | null> {
  const { url, headers } = base();
  const res = await fetch(`${url}${path}`, { method: "POST", headers, body: JSON.stringify(body) }).catch(
    (err: unknown) => {
      console.error(`ghl: ${label} threw:`, err);
      return null;
    },
  );
  if (res && !res.ok) {
    console.error(`ghl: ${label} failed:`, res.status, await res.text().catch(() => ""));
    return null;
  }
  return res;
}

export type UpsertContactInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  source: string;
};

/** Creates or updates the contact by email. Never touches tags. */
export async function upsertContact(input: UpsertContactInput): Promise<string | null> {
  const { v2 } = base();
  const locationId = process.env.GHL_LOCATION_ID;
  const res = await post(
    v2 ? "/contacts/upsert" : "/contacts/",
    { ...(v2 ? { locationId } : {}), ...input },
    "upsert",
  );
  if (!res) return null;
  const body = (await res.json().catch(() => null)) as ContactResponse;
  const id = body?.contact?.id;
  if (!id) console.error("ghl: upsert returned no contact id:", JSON.stringify(body));
  return id ?? null;
}

/** Adds tags without replacing the ones already on the contact. */
export async function addTags(contactId: string, tags: string[]): Promise<boolean> {
  const { v2 } = base();
  return !!(await post(`/contacts/${contactId}/tags${v2 ? "" : "/"}`, { tags }, "tags"));
}

/** Appends a note to the contact's timeline. */
export async function addNote(contactId: string, body: string): Promise<boolean> {
  const { v2 } = base();
  return !!(await post(`/contacts/${contactId}/notes${v2 ? "" : "/"}`, { body }, "note"));
}

/** Splits "Jane Ellery" into first and last names for the contact record. */
export function splitName(name: string): { firstName: string; lastName?: string } {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return { firstName: name.trim() };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}
