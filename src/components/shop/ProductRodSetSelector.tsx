import Link from "next/link";
import { Product } from "@/types/catalog";
import { getProductPath } from "@/lib/catalog";

type Props = {
  product: Product;
  variants: Product[];
};

export default function ProductRodSetSelector({ product, variants }: Props) {
  if (variants.length < 2) return null;

  return (
    <div className="mb-6 rounded-xl border border-accent-200 bg-gradient-to-br from-amber-50/80 to-orange-50/40 p-4">
      <p className="text-sm font-bold text-stone-900 mb-3">Choose rod set</p>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => {
          const rods = variant.rodCount!;
          const active = variant.id === product.id;

          const className = `min-w-[120px] flex-1 rounded-xl border-2 px-4 py-3 text-center transition-all ${
            active
              ? "border-accent-500 bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md"
              : "border-surface-200 bg-white text-stone-800 hover:border-accent-300 hover:bg-amber-50"
          }`;

          const content = (
            <>
              <span className="block text-xl font-black tabular-nums">{rods}</span>
              <span className="block text-xs font-extrabold uppercase tracking-wide mt-0.5">
                Rods Set
              </span>
            </>
          );

          return active ? (
            <div key={variant.id} className={className} aria-current="true">
              {content}
            </div>
          ) : (
            <Link key={variant.id} href={getProductPath(variant)} className={className}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
