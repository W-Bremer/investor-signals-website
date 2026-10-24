import { z } from "zod";
import { normalizePhone, optionalPhoneSchema } from "@/lib/sms";

export const AUDIENCES = ["startup", "fund-manager"] as const;

export const STARTUP_STAGES = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B or later",
  "Growth",
] as const;

export const FUND_STAGES = ["Fund I", "Fund II", "Fund III or later", "Other"] as const;

export const introductionRequestSchema = z.object({
  audience: z.enum(AUDIENCES),
  name: z.string().trim().min(2, "Please give us your name.").max(120),
  email: z.string().trim().email("That email does not look right.").max(200),
  company: z.string().trim().min(1, "Please tell us the company or fund name.").max(160),
  role: z.string().trim().min(1, "Please tell us your role.").max(120),
  stage: z.string().trim().min(1, "Please choose a stage.").max(60),
  amount: z.string().trim().min(1, "Please tell us the target raise.").max(120),
  sector: z.string().trim().min(1, "Please tell us the sector.").max(160),
  deckUrl: z
    .string()
    .trim()
    .max(500)
    .refine((v) => v === "" || /^https?:\/\/\S+$/i.test(v), "Deck links should start with http or https.")
    .optional()
    .or(z.literal("")),
  notes: z.string().trim().max(4000).optional().or(z.literal("")),
  // Optional mobile number; only used for texts when smsConsent is true.
  phone: optionalPhoneSchema,
  smsConsent: z.boolean().optional(),
  disclosureVersion: z.string().trim().max(40).optional().or(z.literal("")),
  pageUrl: z.string().trim().max(500).optional().or(z.literal("")),
  // Honeypot: humans never see or fill this field.
  website: z.string().max(0).optional().or(z.literal("")),
}).refine((d) => !d.smsConsent || (d.phone && normalizePhone(d.phone) !== null), {
  message: "Add your mobile number to opt in to texts, or leave the box unchecked.",
  path: ["phone"],
});

export type IntroductionRequest = z.infer<typeof introductionRequestSchema>;
