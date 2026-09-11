"use client";

import { useEffect } from "react";
import { Product } from "@/types/catalog";
import { getEffectivePrice } from "@/lib/catalog";
import { trackViewItem, mapProductToAnalyticsItem } from "@/lib/analytics/events";

export default function ViewItemTracker({ product }: { product: Product }) {
  useEffect(() => {
    const price = getEffectivePrice(product);
    trackViewItem(
      mapProductToAnalyticsItem({
        id: product.id,
        name: product.name,
        categorySlug: product.categorySlug,
        price: price ?? undefined,
      }),
      price ?? undefined
    );
  }, [product]);

  return null;
}
