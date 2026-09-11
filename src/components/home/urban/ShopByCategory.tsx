import Link from "next/link";
import { categories } from "@/lib/catalog";
import { getCategoryPath } from "@/lib/store";
import { fallbackHanger } from "@/lib/product-images";
import ProductImage from "@/components/shop/ProductImage";

export default function ShopByCategory() {
  const featured = categories.slice(0, 8);

  return (
    <section className="bg-white py-10 sm:py-14 border-b border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-stone-500 mt-2 text-sm sm:text-base">
            Browse home solutions for every room and balcony
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((cat) => (
            <Link
              key={cat.id}
              href={getCategoryPath(cat)}
              className="group text-center"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-surface-100 mb-3 border border-surface-200 group-hover:border-brand-500 transition-colors">
                {cat.image ? (
                  <ProductImage
                    src={cat.image}
                    fallback={["cloth-drying-hangers", "wall-mounted-cloth-hangers"].includes(cat.slug) ? fallbackHanger : undefined}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:640px) 50vw, 25vw"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color}`} />
                )}
              </div>
              <p className="text-sm font-medium text-surface-900 group-hover:text-brand-700 line-clamp-2">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center text-sm font-semibold text-brand-700 hover:underline"
          >
            View All Categories →
          </Link>
        </div>
      </div>
    </section>
  );
}
