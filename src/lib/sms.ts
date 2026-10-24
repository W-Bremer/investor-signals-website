import { z } from "zod";

/**
 * The SMS program, in one place. The disclosure version is recorded with
 * every opt-in; bump it whenever SMS_CONSENT_TEXT changes.
 */
export const SMS_DISCLOSURE_VERSION = "2026-10-25";

export const SMS_SENDER = "Investor Signals LLC";

/** Monitored inbox named in the HELP instructions and the SMS terms. */
export const SMS_SUPPORT_EMAIL = "bryce@investorsignals.co";

export const SMS_CONSENT_TEXT =
  "By checking this box, I agree to receive automated text messages from Investor Signals LLC at the mobile number I provided, including follow-ups about my inquiry and confirmations and reminders for appointments. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to opt out at any time, or HELP for help.";

/** "Sms consent" tag applied to the GHL contact. */
export const SMS_CONSENT_TAG = "sms consent";

/**
 * Normalises a typed phone number to E.164. Ten US digits (with or without
 * a leading 1) become +1XXXXXXXXXX; an international number must start
 * with "+". Returns null when the input is not a plausible mobile number.
 */
export function normalizePhone(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (raw.startsWith("+")) {
    return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
  }
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

export const PHONE_MESSAGE = "Please enter a mobile number, such as (305) 555-0100 or +44 7700 900123.";

/** Shared by both forms: an optional phone that, when present, must parse. */
export const optionalPhoneSchema = z
  .string()
  .trim()
  .max(40)
  .optional()
  .or(z.literal(""))
  .refine((v) => !v || normalizePhone(v) !== null, PHONE_MESSAGE);

export const smsOptInSchema = z.object({
  name: z.string().trim().min(2, "Please give us your name.").max(120),
  email: z.string().trim().email("That email does not look right.").max(200),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your mobile number.")
    .max(40)
    .refine((v) => normalizePhone(v) !== null, PHONE_MESSAGE),
  smsConsent: z.literal(true, {
    errorMap: () => ({ message: "Please check the box to confirm you agree to receive texts." }),
  }),
  disclosureVersion: z.string().trim().min(1).max(40),
  pageUrl: z.string().trim().max(500).optional().or(z.literal("")),
  // Honeypot: humans never see or fill this field.
  website: z.string().max(500).optional(),
});

export type SmsOptIn = z.infer<typeof smsOptInSchema>;
