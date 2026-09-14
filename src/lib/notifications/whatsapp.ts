import { business } from "@/lib/config/business";

/** Official Meta WhatsApp Business Cloud API — no third-party bots required. */
export async function sendNotificationWhatsApp(text: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = (process.env.NOTIFY_WHATSAPP ?? business.whatsapp).replace(/\D/g, "");

  if (!token || !phoneNumberId) {
    console.warn(
      "[notifications] WhatsApp skipped — set WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID, or rely on email + on-site WhatsApp link"
    );
    return;
  }

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: recipient,
      type: "text",
      text: { body: text.slice(0, 4096) },
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`WhatsApp Cloud API failed: ${res.status} ${detail}`);
  }
}
