import { Order, QuoteRequest } from "@/types/catalog";
import { formatOrderMessage, formatQuoteMessage } from "./format";
import { sendNotificationEmail } from "./email";
import { sendNotificationWhatsApp } from "./whatsapp";

async function notify(subject: string, text: string) {
  await Promise.allSettled([
    sendNotificationEmail(subject, text),
    sendNotificationWhatsApp(text),
  ]);
}

export async function notifyNewOrder(order: Order) {
  const text = formatOrderMessage(order);
  await notify(`New order ${order.orderId} — Drywell Hangers`, text);
}

export async function notifyNewQuote(quote: QuoteRequest) {
  const text = formatQuoteMessage(quote);
  await notify(`New quote ${quote.quoteId} — Drywell Hangers`, text);
}
