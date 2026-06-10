"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { sendNotificationEmail } from "@/lib/email";
import { cleanupRateLimiter, rateLimit } from "@/lib/rate-limit";
import { countries } from "@/lib/countries";

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name (at least 2 characters)."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(20, "Phone number looks too long.")
    .regex(/^[+\d\s()-]*$/, "Please enter a valid phone number.")
    .optional()
    .or(z.literal("")),
  visaType: z.string().trim().max(100).optional().or(z.literal("")),
  country: z
    .string()
    .trim()
    .refine((v) => (countries as readonly string[]).includes(v), {
      message: "Please select your country of citizenship.",
    }),
  location: z.enum(["in-australia", "outside-australia", ""]).optional(),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more (at least 20 characters).")
    .max(1000, "Please keep your message under 1000 characters."),
  referral: z.string().trim().max(100).optional().or(z.literal("")),
  consent: z.literal("on", { message: "Please agree to the Privacy Policy to continue." }),
  // Honeypot — must stay empty
  website: z.literal("").or(z.undefined()),
});

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  firstName?: string;
  fieldErrors?: Partial<Record<string, string>>;
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  cleanupRateLimiter();

  const headerList = await headers();

  // Defence-in-depth CSRF check on top of Next.js' built-in Server Action
  // origin validation.
  const origin = headerList.get("origin");
  const host = headerList.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return { status: "error", message: "Invalid request origin." };
  }

  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";
  const limited = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return {
      status: "error",
      message: `Too many messages. Please wait ${limited.retryAfterSeconds}s and try again, or call us directly.`,
    };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    // Silently accept honeypot trips so bots learn nothing.
    if (typeof raw.website === "string" && raw.website !== "") {
      return { status: "success", firstName: "there" };
    }
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields before submitting.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  try {
    await sendNotificationEmail({
      subject: `Website enquiry from ${data.fullName}`,
      replyTo: data.email,
      text: [
        `Name: ${data.fullName}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "—"}`,
        `Visa type of interest: ${data.visaType || "—"}`,
        `Country of citizenship: ${data.country}`,
        `Current location: ${data.location || "—"}`,
        `How they heard about us: ${data.referral || "—"}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });
  } catch (error) {
    console.error("[contact] email delivery failed:", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again or call us directly.",
    };
  }

  return { status: "success", firstName: data.fullName.split(" ")[0] };
}
