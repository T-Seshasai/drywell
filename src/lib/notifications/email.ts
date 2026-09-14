import nodemailer from "nodemailer";

const defaultRecipient = process.env.NOTIFY_EMAIL ?? "drywellhanger@gmail.com";

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: { user, pass },
  });
}

async function sendViaResend(subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = process.env.RESEND_FROM ?? "Drywell Hangers <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [defaultRecipient],
      subject,
      text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend failed: ${res.status}`);
  }

  return true;
}

export async function sendNotificationEmail(subject: string, text: string) {
  if (process.env.RESEND_API_KEY) {
    await sendViaResend(subject, text);
    return;
  }

  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[notifications] Email skipped — set RESEND_API_KEY or SMTP_USER/SMTP_PASS");
    return;
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER ?? defaultRecipient,
    to: defaultRecipient,
    subject,
    text,
  });
}
