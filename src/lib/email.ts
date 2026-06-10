import nodemailer from "nodemailer";
import { site } from "@/lib/site";

interface EmailPayload {
  subject: string;
  text: string;
  replyTo?: string;
}

/**
 * Sends notification email via SMTP (configure SMTP_HOST, SMTP_PORT,
 * SMTP_USER, SMTP_PASS, CONTACT_INBOX in env). Without SMTP config the
 * payload is logged so local development and preview deploys still work.
 */
export async function sendNotificationEmail(payload: EmailPayload): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_INBOX } = process.env;

  if (!SMTP_HOST) {
    console.info("[email] SMTP not configured — message logged instead:", payload);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  await transporter.sendMail({
    from: `"${site.name} Website" <${SMTP_USER ?? site.email}>`,
    to: CONTACT_INBOX ?? site.email,
    subject: payload.subject,
    text: payload.text,
    replyTo: payload.replyTo,
  });
}
