"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { sendNotificationEmail } from "@/lib/email";
import { cleanupRateLimiter, rateLimit } from "@/lib/rate-limit";

const bookingSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name."),
  lastName: z.string().trim().min(1, "Please enter your last name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter your phone number.")
    .max(20)
    .regex(/^[+\d\s()-]*$/, "Please enter a valid phone number."),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a preferred date.")
    .refine((d) => new Date(`${d}T23:59:59`) >= new Date(), {
      message: "Please choose a date in the future.",
    }),
  timeSlot: z.string().min(1, "Please choose a time slot."),
  consultationType: z.enum(["phone", "video", "in-person"], {
    message: "Please choose a consultation type.",
  }),
  visaType: z.string().trim().max(100).optional().or(z.literal("")),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  website: z.literal("").or(z.undefined()),
});

export interface BookingFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
  summary?: {
    name: string;
    email: string;
    date: string;
    timeSlot: string;
    consultationType: string;
  };
}

export async function submitBooking(
  _prev: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  cleanupRateLimiter();

  const headerList = await headers();
  const origin = headerList.get("origin");
  const host = headerList.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return { status: "error", message: "Invalid request origin." };
  }

  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";
  const limited = rateLimit(`book:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return {
      status: "error",
      message: `Too many requests. Please wait ${limited.retryAfterSeconds}s and try again, or call us directly.`,
    };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = bookingSchema.safeParse(raw);

  if (!parsed.success) {
    if (typeof raw.website === "string" && raw.website !== "") {
      return { status: "success" };
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
      subject: `Consultation booking: ${data.firstName} ${data.lastName} — ${data.date} ${data.timeSlot}`,
      replyTo: data.email,
      text: [
        `Name: ${data.firstName} ${data.lastName}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Preferred date: ${data.date}`,
        `Preferred time: ${data.timeSlot}`,
        `Consultation type: ${data.consultationType}`,
        `Visa type of interest: ${data.visaType || "—"}`,
        "",
        "Situation:",
        data.description || "—",
      ].join("\n"),
    });
  } catch (error) {
    console.error("[booking] email delivery failed:", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again or call us directly.",
    };
  }

  return {
    status: "success",
    summary: {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      date: data.date,
      timeSlot: data.timeSlot,
      consultationType: data.consultationType,
    },
  };
}
