import { Order, QuoteRequest } from "@/types/catalog";
import { formatPrice } from "@/lib/catalog";

export function formatOrderMessage(order: Order) {
  const lines = [
    "New order from Drywell Hangers website",
    "",
    `Order ID: ${order.orderId}`,
    `Payment: ${order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod ?? "N/A"}`,
    `Total: ${formatPrice(order.total)}`,
    "",
    "Customer",
    `Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    order.customer.email ? `Email: ${order.customer.email}` : null,
    "",
    "Delivery",
    `${order.customer.apartmentName}, Block ${order.customer.blockId}, Flat ${order.customer.flatNo}`,
    `${order.customer.address}, ${order.customer.city}, ${order.customer.state} — ${order.customer.pincode}`,
    "",
    "Items",
    ...order.items.map(
      (item) => `- ${item.name} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}`
    ),
    "",
    `Subtotal: ${formatPrice(order.subtotal)}`,
    `Shipping: ${order.shipping ? formatPrice(order.shipping) : "Free"}`,
  ].filter(Boolean);

  return lines.join("\n");
}

export function formatQuoteMessage(quote: QuoteRequest) {
  const lines = [
    "New quote request from Drywell Hangers website",
    "",
    `Reference: ${quote.quoteId}`,
    `Name: ${quote.name}`,
    `Phone: ${quote.phone}`,
    quote.email ? `Email: ${quote.email}` : null,
    `Location: ${quote.location}`,
    `Requirement: ${quote.requirement}`,
    `Preferred contact: ${quote.preferredContact}`,
    quote.productName ? `Product: ${quote.productName}` : null,
    quote.categorySlug && !quote.productName
      ? `Category: ${quote.categorySlug.replace(/-/g, " ")}`
      : null,
  ].filter(Boolean);

  return lines.join("\n");
}
