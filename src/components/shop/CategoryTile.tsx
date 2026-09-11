import Link from "next/link";
import { Category } from "@/types/catalog";
import { getProductCount, getCategoryPath } from "@/lib/store";
import { fallbackHanger } from "@/lib/product-images";
import ProductImage from "@/components/shop/ProductImage";
import { ArrowUpRight } from "lucide-react";

export default function CategoryTile({ category }: { category: Category }) {
  const count = getProductCount(category.slug);
  return (
    <Link
      href={getCategoryPath(category)}
      className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-soft hover:shadow-lift transition-all duration-300 hover:-translate-y-1"
    >
      {category.image ? (
        <>
          <ProductImage
            src={category.image}
            fallback={["cloth-drying-hangers", "wall-mounted-cloth-hangers"].includes(category.slug) ? fallbackHanger : undefined}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width:640px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`} />
      )}

      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold mb-1">{category.name}</h3>
            <p className="text-sm text-white/80 line-clamp-2">{category.shortDescription}</p>
          </div>
          <span className="p-2 rounded-full bg-white/20 flex-shrink-0">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
        <p className="text-xs text-white/60 mt-3">{count} products</p>
      </div>
    </Link>
  );
}
