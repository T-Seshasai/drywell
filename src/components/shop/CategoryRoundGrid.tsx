import Link from "next/link";
import { Category } from "@/types/catalog";
import { getCategoryPath, getProductCount } from "@/lib/catalog";
import { fallbackHanger } from "@/lib/product-images";
import ProductImage from "@/components/shop/ProductImage";

const HANGER_CATEGORIES = new Set(["cloth-drying-hangers", "wall-mounted-cloth-hangers"]);

export default function CategoryRoundGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5 sm:gap-7">
      {categories.map((cat) => {
        const count = getProductCount(cat.slug);
        return (
          <Link
            key={cat.id}
            href={getCategoryPath(cat)}
            className="group flex flex-col items-center text-center gap-2.5"
          >
            <div className="relative h-[88px] w-[88px] sm:h-[100px] sm:w-[100px] lg:h-[112px] lg:w-[112px] rounded-full overflow-hidden border-2 border-surface-200 bg-white shadow-sm group-hover:border-brand-400 group-hover:shadow-md transition-all">
              {cat.image ? (
                <ProductImage
                  src={cat.image}
                  fallback={HANGER_CATEGORIES.has(cat.slug) ? fallbackHanger : undefined}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="112px"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color}`} />
              )}
            </div>
            <div className="min-w-0 w-full px-1">
              <p className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-brand-700 leading-snug line-clamp-2">
                {cat.name}
              </p>
              <p className="text-[10px] sm:text-xs text-stone-500 mt-0.5">{count} products</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
