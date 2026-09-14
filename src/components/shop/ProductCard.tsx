"use client";

import Link from "next/link";
import { Product } from "@/types/catalog";
import { formatPrice, formatProductPrice, getEffectivePrice, getMerchantFeedPrice, isPurchasable, getProductPath } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import ProductImage from "@/components/shop/ProductImage";
import ProductImagePlaceholder from "@/components/shop/ProductImagePlaceholder";
import QualityBadge from "@/components/shop/QualityBadge";
import { Plus } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const price = getEffectivePrice(product);
  const displayPrice = getMerchantFeedPrice(product);
  const displayPriceLabel = formatProductPrice(product);
  const purchasable = isPurchasable(product);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!purchasable || !price) return;
    addItem({
      productId: product.id,
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      categorySlug: product.categorySlug,
      price,
      quantity: 1,
      image: product.images[0]?.url ?? "",
      productType: product.productType,
      qualityTier: product.qualityTier,
    });
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lift transition-all border border-surface-200">
      <Link href={getProductPath(product)} className="block relative aspect-square bg-surface-100">
        {product.images[0]?.url ? (
          <ProductImage
            src={product.images[0].url}
            fallback={product.images[0].fallback}
            alt={product.images[0].alt ?? product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width:640px) 100vw, 25vw"
          />
        ) : (
          <ProductImagePlaceholder
            label={product.categorySlug === "wall-mounted-cloth-hangers" ? "Wall Mounted" : "Coming soon"}
            gradient={
              product.categorySlug === "wall-mounted-cloth-hangers"
                ? "from-sky-500 to-blue-600"
                : "from-stone-400 to-stone-500"
            }
          />
        )}
        {product.badge && (
          <QualityBadge badge={product.badge} className="absolute top-3 left-3" />
        )}
        {product.productType === "quote_required" && (
          <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase bg-brand-700 text-white px-2 py-1 rounded">
            Quote
          </span>
        )}
      </Link>

      <div className="p-4">
        <Link href={getProductPath(product)}>
          <h3 className="font-semibold group-hover:text-brand-700">{product.name}</h3>
        </Link>
        <p className="text-sm text-stone-500 mt-1 line-clamp-2">{product.shortDescription}</p>

        <div className="flex items-center justify-between mt-4">
          {displayPriceLabel ? (
            <span className="text-lg font-bold text-brand-700">{displayPriceLabel}</span>
          ) : (
            <span className="text-sm font-medium text-stone-500">Get quote</span>
          )}

          {purchasable ? (
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-900 text-white text-sm rounded-full"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          ) : (
            <Link
              href={`/quote?category=${product.categorySlug}&product=${product.slug}`}
              className="text-sm font-medium text-brand-700 hover:underline"
            >
              Quote →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
