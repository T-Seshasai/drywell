import { business } from "@/lib/config/business";

export function buildWhatsAppUrl(message: string, phone = business.whatsapp) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildContactWhatsAppMessage(params: {
  name: string;
  phone: string;
  email?: string;
  message: string;
  source?: string;
}) {
  const lines = [
    "New enquiry from Drywell Hangers website",
    "",
    `Name: ${params.name.trim()}`,
    `Phone: ${params.phone.trim()}`,
  ];

  if (params.email?.trim()) {
    lines.push(`Email: ${params.email.trim()}`);
  }

  lines.push(`Message: ${params.message.trim()}`);

  if (params.source) {
    lines.push("", `Source: ${params.source}`);
  }

  return lines.join("\n");
}

export function openWhatsAppEnquiry(params: {
  name: string;
  phone: string;
  email?: string;
  message: string;
  source?: string;
}) {
  const url = buildWhatsAppUrl(buildContactWhatsAppMessage(params));
  window.open(url, "_blank", "noopener,noreferrer");
}
