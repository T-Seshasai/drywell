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

export function buildQuoteWhatsAppMessage(params: {
  quoteId: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  requirement: string;
  preferredContact: "phone" | "whatsapp" | "email";
  productName?: string;
  categorySlug?: string;
}) {
  const lines = [
    "New quote request from Drywell Hangers website",
    "",
    `Reference: ${params.quoteId}`,
    `Name: ${params.name.trim()}`,
    `Phone: ${params.phone.trim()}`,
  ];

  if (params.email?.trim()) {
    lines.push(`Email: ${params.email.trim()}`);
  }

  lines.push(
    `Location: ${params.location.trim()}`,
    `Requirement: ${params.requirement.trim()}`,
    `Preferred contact: ${params.preferredContact}`,
  );

  if (params.productName) {
    lines.push(`Product: ${params.productName}`);
  } else if (params.categorySlug) {
    lines.push(`Category: ${params.categorySlug.replace(/-/g, " ")}`);
  }

  return lines.join("\n");
}

export function openWhatsAppQuote(params: {
  quoteId: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  requirement: string;
  preferredContact: "phone" | "whatsapp" | "email";
  productName?: string;
  categorySlug?: string;
}) {
  const url = buildWhatsAppUrl(buildQuoteWhatsAppMessage(params));
  window.open(url, "_blank", "noopener,noreferrer");
}
