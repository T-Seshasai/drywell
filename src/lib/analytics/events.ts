"use client";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushDataLayer(data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

export interface AnalyticsItem {
  item_id: string;
  item_name: string;
  item_category: string;
  price?: number;
  quantity?: number;
}

export function mapProductToAnalyticsItem(product: {
  id: string;
  name: string;
  categorySlug: string;
  price?: number;
}, quantity = 1): AnalyticsItem {
  return {
    item_id: product.id,
    item_name: product.name,
    item_category: product.categorySlug,
    price: product.price,
    quantity,
  };
}

export function trackViewItemList(listName: string, items: AnalyticsItem[]) {
  pushDataLayer({
    event: "view_item_list",
    ecommerce: { item_list_name: listName, items },
  });
}

export function trackViewItem(item: AnalyticsItem, value?: number) {
  pushDataLayer({
    event: "view_item",
    ecommerce: {
      currency: "INR",
      value,
      items: [item],
    },
  });
}

export function trackAddToCart(item: AnalyticsItem, value: number) {
  pushDataLayer({
    event: "add_to_cart",
    ecommerce: { currency: "INR", value, items: [item] },
  });
}

export function trackRemoveFromCart(item: AnalyticsItem, value: number) {
  pushDataLayer({
    event: "remove_from_cart",
    ecommerce: { currency: "INR", value, items: [item] },
  });
}

export function trackViewCart(items: AnalyticsItem[], value: number) {
  pushDataLayer({
    event: "view_cart",
    ecommerce: { currency: "INR", value, items },
  });
}

export function trackBeginCheckout(items: AnalyticsItem[], value: number) {
  pushDataLayer({
    event: "begin_checkout",
    ecommerce: { currency: "INR", value, items },
  });
}

export function trackAddPaymentInfo(items: AnalyticsItem[], value: number) {
  pushDataLayer({
    event: "add_payment_info",
    ecommerce: { currency: "INR", value, items },
  });
}

export function trackPurchase(
  transactionId: string,
  items: AnalyticsItem[],
  value: number
) {
  pushDataLayer({
    event: "purchase",
    ecommerce: {
      transaction_id: transactionId,
      currency: "INR",
      value,
      items,
    },
  });
}

export function trackQuoteRequest(productName?: string) {
  pushDataLayer({
    event: "quote_request",
    lead_type: "quote",
    product_name: productName,
  });
  pushDataLayer({ event: "generate_lead", lead_type: "quote" });
}

export function trackPhoneClick(location: string) {
  pushDataLayer({ event: "phone_click", click_location: location });
  pushDataLayer({ event: "generate_lead", lead_type: "phone" });
}

export function trackWhatsAppClick(location: string) {
  pushDataLayer({ event: "whatsapp_click", click_location: location });
  pushDataLayer({ event: "generate_lead", lead_type: "whatsapp" });
}

export function trackFormSubmit(formName: string) {
  pushDataLayer({ event: "form_submit", form_name: formName });
  pushDataLayer({ event: "generate_lead", lead_type: "form" });
}

const PURCHASE_KEY = "dw_purchase_tracked";

export function hasPurchaseBeenTracked(orderId: string): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(`${PURCHASE_KEY}_${orderId}`) === "1";
}

export function markPurchaseTracked(orderId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(`${PURCHASE_KEY}_${orderId}`, "1");
}
