import { business } from "@/lib/config/business";
import { formatOrderItemBlock } from "@/lib/notifications/format";
import { OrderItem } from "@/types/catalog";

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

export function buildOrderWhatsAppMessage(params: {
  orderId: string;
  total: number;
  paymentMethod?: string;
  customer: {
    name: string;
    phone: string;
    apartmentName: string;
    blockId: string;
    flatNo: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    qualityTier?: "standard" | "premium";
  }>;
}) {
  const payment =
    params.paymentMethod === "cod" ? "Cash on Delivery" : params.paymentMethod ?? "Cash on Delivery";

  const orderItems: OrderItem[] = params.items.map((item, index) => ({
    productId: `item-${index}`,
    sku: "",
    name: item.name,
    categorySlug: "",
    price: item.price,
    quantity: item.quantity,
    qualityTier: item.qualityTier,
  }));

  const lines = [
    "New order from Drywell Hangers website",
    "",
    `Order ID: ${params.orderId}`,
    `Payment: ${payment}`,
    `Total: ₹${params.total.toLocaleString("en-IN")}`,
    "",
    "Customer",
    `Name: ${params.customer.name.trim()}`,
    `Phone: ${params.customer.phone.trim()}`,
    "",
    "Delivery",
    `${params.customer.apartmentName}, Block ${params.customer.blockId}, Flat ${params.customer.flatNo}`,
    `${params.customer.address}, ${params.customer.city}, ${params.customer.state} — ${params.customer.pincode}`,
    "",
    "Items",
    ...orderItems.flatMap((item, index) => [
      formatOrderItemBlock(item, index),
      "",
    ]),
  ];

  return lines.join("\n").trim();
}

export function openWhatsAppOrder(params: {
  orderId: string;
  total: number;
  paymentMethod?: string;
  customer: {
    name: string;
    phone: string;
    apartmentName: string;
    blockId: string;
    flatNo: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    qualityTier?: "standard" | "premium";
  }>;
}) {
  const url = buildWhatsAppUrl(buildOrderWhatsAppMessage(params));
  window.open(url, "_blank", "noopener,noreferrer");
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
