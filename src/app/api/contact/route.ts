import { NextResponse } from "next/server";

// Simple in-memory rate limiting (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // requests per window
const WINDOW_MS = 60_000; // 1 minute

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false; // not limited
  }
  if (record.count >= RATE_LIMIT) return true; // limited
  record.count += 1;
  return false;
}

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  if (rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot check
  if (body.website) {
    return NextResponse.json({ ok: true }); // silently accept
  }

  // Basic validation
  const { fullName, email, message, consent } = body;
  if (
    typeof fullName !== "string" || fullName.trim().length < 2 ||
    typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" || message.trim().length < 20 ||
    !consent
  ) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  // TODO: Send email via Resend or Nodemailer
  // For now, log to server console
  console.log("Contact form submission:", {
    fullName: (fullName as string).trim(),
    email: (email as string).trim(),
    message: (message as string).trim().slice(0, 200),
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
