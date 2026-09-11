"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types/catalog";
import { business } from "@/lib/config/business";
import {
  formatPrice,
  formatProductPrice,
  getEffectivePrice,
  getMerchantFeedPrice,
  isPurchasable,
  getProductPath,
} from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import {
  Minus,
  Plus,
  ShoppingBag,
  Check,
  Phone,
  MessageCircle,
  Ruler,
} from "lucide-react";
import { trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics/events";
import ProductRodSetSelector from "@/components/shop/ProductRodSetSelector";
import QualityBadge from "@/components/shop/QualityBadge";
import WarrantyBadge from "@/components/shop/WarrantyBadge";
import { getProductWarrantyTier } from "@/lib/catalog";

export default function ProductHybridActions({
  product,
  rodVariants = [],
}: {
  product: Product;
  rodVariants?: Product[];
}) {
  const { addItem } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const purchasable = isPurchasable(product);
  const price = getEffectivePrice(product);
  const displayPrice = getMerchantFeedPrice(product);
  const displayPriceLabel = formatProductPrice(product);
  const quoteUrl = `/quote?category=${product.categorySlug}&product=${product.slug}`;
  const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(`Quote for ${product.name}`)}`;
  const warrantyTier = getProductWarrantyTier(product);

  const cartLine = () => ({
    productId: product.id,
    sku: product.sku,
    slug: product.slug,
    name: product.name,
    categorySlug: product.categorySlug,
    price: price!,
    quantity: qty,
    image: product.images[0]?.url ?? "",
    productType: product.productType,
  });

  const handleAdd = () => {
    if (!purchasable || !price) return;
    const result = addItem(cartLine());
    if (!result.ok) {
      setError(result.error ?? "Unable to add to cart");
      return;
    }
    setError("");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!purchasable || !price) return;
    const result = addItem(cartLine());
    if (!result.ok) {
      setError(result.error ?? "Unable to add to cart");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {product.badge && <QualityBadge badge={product.badge} />}
        {product.rodCount && (
          <span className="text-[11px] font-semibold uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
            {product.rodCount} Rods Set
          </span>
        )}
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">{product.name}</h1>

      <div className="flex flex-wrap items-center gap-3 mb-1">
        {displayPriceLabel ? (
          <p className="text-2xl font-bold text-brand-700">{displayPriceLabel}</p>
        ) : (
          <p className="text-lg font-semibold text-brand-700">Price on measurement / quote</p>
        )}
        {warrantyTier && <WarrantyBadge tier={warrantyTier} size="compact" />}
      </div>
      {displayPrice && (
        <p className="text-xs text-green-700 font-medium mb-4">
          FREE installation · Same day service in {business.primaryCities.join(" & ")}
        </p>
      )}

      <ProductRodSetSelector product={product} variants={rodVariants} />

      {product.installation && (
        <p className="text-sm text-stone-600 mb-4">
          <strong>Installation:</strong> {product.installation}
        </p>
      )}

      {purchasable && (
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-stone-500">Quantity</span>
          <div className="flex items-center border border-surface-200 rounded-lg bg-white">
            <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="p-2">
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center text-sm font-medium">{qty}</span>
            <button type="button" onClick={() => setQty(qty + 1)} className="p-2">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="flex flex-wrap gap-3 mb-6">
        {purchasable ? (
          <>
            <button
              type="button"
              onClick={handleBuyNow}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-stone-900 font-semibold rounded-lg shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" /> Buy Now
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700"
            >
              {added ? <><Check className="w-4 h-4" /> Added</> : <><ShoppingBag className="w-4 h-4" /> Add to Cart</>}
            </button>
          </>
        ) : (
          <>
            <Link
              href={quoteUrl}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700"
            >
              Get Free Quote
            </Link>
            <Link
              href={`${quoteUrl}&measurement=1`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-brand-600 text-brand-700 font-medium rounded-lg hover:bg-brand-50"
            >
              <Ruler className="w-4 h-4" /> Request Measurement
            </Link>
          </>
        )}

        <a
          href={`tel:${business.phone}`}
          onClick={() => trackPhoneClick("product_page")}
          className="inline-flex items-center gap-2 px-6 py-3 border border-surface-200 font-medium rounded-lg hover:bg-surface-50"
        >
          <Phone className="w-4 h-4" /> Call
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("product_page")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-medium rounded-lg"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </div>

      <Link href={getProductPath(product)} className="sr-only">
        {product.name}
      </Link>
    </div>
  );
}
