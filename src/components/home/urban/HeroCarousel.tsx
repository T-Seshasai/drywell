import Link from "next/link";
import { homeBanner } from "@/data/home-content";
import ContactForm from "@/components/home/ContactForm";
import ProductImage from "@/components/shop/ProductImage";

export default function HeroCarousel() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-3 sm:py-4">
        <Link
          href="/products"
          className="group relative block w-full overflow-hidden rounded-lg sm:rounded-xl bg-white border border-surface-200 shadow-soft"
        >
          <ProductImage
            src={homeBanner}
            alt="Drywell Hangers — smart solutions for modern homes"
            width={1024}
            height={682}
            className="w-full h-auto max-w-full transition-transform duration-500 group-hover:scale-[1.005]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
            priority
          />
        </Link>

        <div className="mt-3 sm:mt-4 rounded-lg border border-brand-100 bg-gradient-to-br from-brand-50/80 to-white p-3 sm:p-5 shadow-soft">
          <div className="mb-3">
            <h2 className="text-base sm:text-lg font-bold text-brand-900">
              Get a Free Quote
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Share your details — we&apos;ll call you back for installation across Hyderabad & Secunderabad.
            </p>
          </div>
          <ContactForm compact idPrefix="hero" source="Homepage hero form" />
        </div>
      </div>
    </section>
  );
}
