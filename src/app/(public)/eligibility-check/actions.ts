"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { sendNotificationEmail } from "@/lib/email";
import { cleanupRateLimiter, rateLimit } from "@/lib/rate-limit";

const leadSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Please agree to be contacted." }),
  answers: z.record(z.string(), z.string()),
});

export interface QuizLeadResult {
  ok: boolean;
  message?: string;
}

export async function submitQuizLead(input: unknown): Promise<QuizLeadResult> {
  cleanupRateLimiter();

  const headerList = await headers();
  const origin = headerList.get("origin");
  const host = headerList.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return { ok: false, message: "Invalid request origin." };
  }

  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";
  const limited = rateLimit(`quiz:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return { ok: false, message: "Too many submissions. Please try again in a minute." };
  }

  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const { firstName, email, phone, answers } = parsed.data;

  try {
    await sendNotificationEmail({
      subject: `Eligibility quiz lead: ${firstName}`,
      replyTo: email,
      text: [
        `First name: ${firstName}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        "",
        "Quiz answers:",
        ...Object.entries(answers).map(([k, v]) => `  ${k}: ${v}`),
      ].join("\n"),
    });
  } catch (error) {
    console.error("[quiz] email delivery failed:", error);
    return { ok: false, message: "Something went wrong saving your details." };
  }

  return { ok: true };
}
