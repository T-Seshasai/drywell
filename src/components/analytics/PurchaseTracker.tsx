"use client";

import { useEffect } from "react";
import { Order } from "@/types/catalog";
import {
  trackPurchase,
  hasPurchaseBeenTracked,
  markPurchaseTracked,
  mapProductToAnalyticsItem,
} from "@/lib/analytics/events";

export default function PurchaseTracker({ order }: { order: Order }) {
  useEffect(() => {
    if (hasPurchaseBeenTracked(order.orderId)) return;
    markPurchaseTracked(order.orderId);
    trackPurchase(
      order.orderId,
      order.items.map((i) =>
        mapProductToAnalyticsItem(
          { id: i.productId, name: i.name, categorySlug: i.categorySlug, price: i.price },
          i.quantity
        )
      ),
      order.total
    );
  }, [order]);

  return null;
}
