import { Order, QuoteRequest } from "@/types/catalog";

const orders = new Map<string, Order>();
const quotes = new Map<string, QuoteRequest>();

export function saveOrder(order: Order) {
  orders.set(order.orderId, order);
  return order;
}

export function getOrder(orderId: string) {
  return orders.get(orderId);
}

export function saveQuote(quote: QuoteRequest) {
  quotes.set(quote.quoteId, quote);
  return quote;
}

export function getQuote(quoteId: string) {
  return quotes.get(quoteId);
}

export function generateOrderId() {
  return `DW${Date.now()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export function generateQuoteId() {
  return `QT${Date.now()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
