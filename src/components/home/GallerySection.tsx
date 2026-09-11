import { gallery } from "@/lib/store";
import ProductImage from "@/components/shop/ProductImage";

export default function GallerySection() {
  return (
    <section className="bg-surface-50 border-y border-surface-200">
      <div className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <p className="text-brand-600 text-sm font-semibold uppercase tracking-wider mb-2">
            Our Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Installation Gallery
          </h2>
          <p className="text-stone-500 mt-3">
            Sample home utility and organisation setups delivered by our team
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((item) => (
            <div
              key={item.title}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-200"
            >
              <ProductImage
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width:768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
