"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types/catalog";
import {
  formatPrice,
  formatProductPrice,
  getEffectivePrice,
  getMerchantFeedPrice,
  getProductPath,
  isPurchasable,
} from "@/lib/catalog";
import { business } from "@/lib/config/business";
import { useCart } from "@/context/CartContext";
import ProductImage from "@/components/shop/ProductImage";
import ProductImagePlaceholder from "@/components/shop/ProductImagePlaceholder";
import QualityBadge from "@/components/shop/QualityBadge";
import WarrantyBadge from "@/components/shop/WarrantyBadge";
import { getProductWarrantyTier } from "@/lib/catalog";
import { Star } from "lucide-react";

export default function AmazonProductListItem({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const price = getEffectivePrice(product);
  const listingPrice = getMerchantFeedPrice(product);
  const listingPriceLabel = formatProductPrice(product);
  const purchasable = isPurchasable(product);
  const path = getProductPath(product);
  const warrantyTier = getProductWarrantyTier(product);

  const handleAdd = () => {
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

  const handleBuyNow = () => {
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
    router.push("/checkout");
  };

  return (
    <article className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 hover:bg-brand-50/30 transition-colors">
      <Link
        href={path}
        className="relative shrink-0 w-full sm:w-40 md:w-44 aspect-square bg-white border border-surface-200 rounded-lg overflow-hidden mx-auto sm:mx-0"
      >
        {product.images[0]?.url ? (
          <ProductImage
            src={product.images[0].url}
            fallback={product.images[0].fallback}
            alt={product.images[0].alt ?? product.name}
            fill
            className="object-cover p-1"
            sizes="(max-width:640px) 80vw, 176px"
          />
        ) : (
          <ProductImagePlaceholder label="Wall Mounted" gradient="from-sky-500 to-blue-600" />
        )}
      </Link>

      <div className="flex-1 min-w-0">
        <Link
          href={path}
          className="text-base sm:text-lg font-medium text-[#007185] hover:text-[#C7511F] hover:underline leading-snug line-clamp-2"
        >
          {product.name}
        </Link>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          {product.badge && <QualityBadge badge={product.badge} />}
          {product.rodCount && (
            <span className="text-[11px] font-semibold uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
              {product.rodCount} Rods Set
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-2 text-amber-500">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
          <span className="text-xs text-[#007185] ml-1 hover:underline cursor-pointer">
            Premium rated
          </span>
        </div>

        <ul className="mt-3 space-y-1 text-sm text-stone-600">
          {product.features.slice(0, 4).map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <p className="mt-3 text-xs sm:text-sm text-green-700 font-medium">
          Same Day Installation · Free installation {business.primaryCities.join(" & ")}
        </p>
        {warrantyTier && (
          <div className="mt-2">
            <WarrantyBadge tier={warrantyTier} size="md" />
          </div>
        )}
      </div>

      <div className="sm:w-44 md:w-48 shrink-0 flex flex-row sm:flex-col gap-3 sm:items-stretch border-t sm:border-t-0 pt-4 sm:pt-0">
        <div className="flex-1 sm:flex-none">
          {purchasable && price ? (
            <p className="text-xl font-normal text-stone-900">{formatPrice(price)}</p>
          ) : listingPriceLabel ? (
            <p className="text-2xl font-normal text-stone-900">{listingPriceLabel}</p>
          ) : (
            <p className="text-sm font-medium text-stone-600">Price on quote</p>
          )}
          <p className="text-xs text-stone-500 mt-1">FREE installation</p>
        </div>

        <div className="flex flex-col gap-2 flex-1 sm:flex-none">
          {purchasable ? (
            <>
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-stone-900 text-sm font-semibold py-2 px-3 shadow-sm"
              >
                Buy Now
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="w-full rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium py-2 px-3 shadow-sm"
              >
                Add to Cart
              </button>
            </>
          ) : (
            <Link
              href={`/quote?category=${product.categorySlug}&product=${product.slug}`}
              className="w-full text-center rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-stone-900 text-sm font-medium py-2 px-3 shadow-sm"
            >
              Get Free Quote
            </Link>
          )}
          <Link
            href={path}
            className="w-full text-center rounded-lg bg-white hover:bg-surface-50 border border-surface-300 text-stone-800 text-sm py-2 px-3"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
