"use client";

import Link from "next/link";
import { Product } from "@/types/catalog";
import { formatPrice, getEffectivePrice, getProductPath, isPurchasable } from "@/lib/catalog";
import ProductImage from "@/components/shop/ProductImage";
import QualityBadge from "@/components/shop/QualityBadge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

function ULProductCard({ product }: { product: Product }) {
  const price = getEffectivePrice(product);
  const purchasable = isPurchasable(product);

  return (
    <Link
      href={getProductPath(product)}
      className="flex-shrink-0 w-[180px] sm:w-[220px] snap-start group"
    >
      <div className="relative aspect-square bg-surface-100 rounded-lg overflow-hidden border border-surface-200 mb-3">
        <ProductImage
          src={product.images[0]?.url ?? ""}
          fallback={product.images[0]?.fallback}
          alt={product.images[0]?.alt ?? product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="220px"
        />
        {product.badge && (
          <QualityBadge badge={product.badge} className="absolute top-2 left-2" />
        )}
      </div>
      <p className="text-sm font-medium text-surface-900 line-clamp-2 group-hover:text-brand-700">
        {product.name}
      </p>
      <p className="text-sm font-bold text-surface-900 mt-1">
        {purchasable && price ? formatPrice(price) : "Get Quote"}
      </p>
    </Link>
  );
}

type Props = {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
};

export default function ProductCarousel({ title, subtitle, products, viewAllHref = "/products" }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  if (!products.length) return null;

  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-surface-900">{title}</h2>
            {subtitle && <p className="text-sm text-stone-500 mt-1">{subtitle}</p>}
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-surface-200 hover:bg-surface-50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-surface-200 hover:bg-surface-50"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
        >
          {products.map((product) => (
            <ULProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href={viewAllHref} className="text-sm font-semibold text-brand-700 hover:underline">
            View All →
          </Link>
        </div>
      </div>
    </section>
  );
}
