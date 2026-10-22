import { z } from "zod";

/** Tag applied to every subscriber in GHL (GoHighLevel). */
export const NEWSLETTER_TAG = "newsletter subscriber";

/** Shown in place of the form once a sign-up goes through. */
export const NEWSLETTER_SUCCESS = "You're in. Next issue lands in your inbox.";

export const newsletterSignupSchema = z.object({
  firstName: z.string().trim().min(1, "Please tell us your first name.").max(80),
  email: z.string().trim().email("That email does not look right.").max(200),
  // Honeypot: humans never see or fill this field. Accepted here so a filled
  // field can be answered with a fake success instead of a validation error.
  website: z.string().max(500).optional(),
});

export type NewsletterSignup = z.infer<typeof newsletterSignupSchema>;
