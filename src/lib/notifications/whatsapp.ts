import { business } from "@/lib/config/business";

export async function sendNotificationWhatsApp(text: string) {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!apiKey) {
    console.warn("[notifications] WhatsApp skipped — set CALLMEBOT_API_KEY");
    return;
  }

  const phone = (process.env.NOTIFY_WHATSAPP ?? business.whatsapp).replace(/\D/g, "");
  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(text)}&apikey=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`WhatsApp notification failed: ${res.status}`);
  }
}
