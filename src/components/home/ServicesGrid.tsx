"use client";

import Link from "next/link";
import { products, formatPrice, getProductPath, getEffectivePrice, isPurchasable } from "@/lib/catalog";
import { business } from "@/lib/config/business";
import ProductImage from "@/components/shop/ProductImage";
import QualityBadge from "@/components/shop/QualityBadge";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics/events";

const displayPhone = "081259 93888";

export default function ServicesGrid() {
  const whatsappBase = `https://wa.me/${business.whatsapp}?text=`;

  return (
    <section id="products" className="bg-surface-50 border-y border-surface-200">
      <div className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <p className="text-brand-600 text-sm font-semibold uppercase tracking-wider mb-2">What We Offer</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Products & Installation Services</h2>
          <a
            href={`tel:${business.phone}`}
            onClick={() => trackPhoneClick("products_section_header")}
            className="inline-flex items-center gap-2 mt-5 px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors shadow-md"
          >
            <Phone className="w-5 h-5" />
            Call {displayPhone}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.slice(0, 8).map((product) => {
            const price = getEffectivePrice(product);
            const purchasable = isPurchasable(product);
            return (
              <article key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-surface-200 shadow-soft">
                <div className="relative h-52">
                  <ProductImage
                    src={product.images[0]?.url ?? ""}
                    fallback={product.images[0]?.fallback}
                    alt={product.images[0]?.alt ?? product.name}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                  {product.badge && (
                    <QualityBadge badge={product.badge} className="absolute top-4 left-4" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-stone-500 text-sm line-clamp-2 mb-4">{product.shortDescription}</p>
                  <p className="text-lg font-bold text-brand-700 mb-5">
                    {purchasable && price ? `From ${formatPrice(price)}` : "Quote on measurement"}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`tel:${business.phone}`}
                      onClick={() => trackPhoneClick("products_section")}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700"
                    >
                      <Phone className="w-4 h-4" />
                      Call {displayPhone}
                    </a>
                    <a
                      href={`${whatsappBase}${encodeURIComponent(`Quote for ${product.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-sm rounded-lg"
                    >
                      <MessageCircle className="w-4 h-4" /> Get Quote
                    </a>
                    <Link href={getProductPath(product)} className="inline-flex items-center gap-2 px-4 py-2 border border-brand-600 text-brand-700 text-sm rounded-lg">
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="inline-flex px-6 py-3 bg-brand-600 text-white rounded-lg font-medium">View All Products</Link>
        </div>
      </div>
    </section>
  );
}
