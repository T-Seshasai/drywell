import Link from "next/link";
import { store } from "@/lib/store";
import { homeBanner } from "@/data/home-content";
import ProductImage from "@/components/shop/ProductImage";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${store.whatsapp}?text=${encodeURIComponent("Hi, I need a free quote for home solutions.")}`;

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto px-5 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold mb-5">
              {store.heroBadge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-surface-900 leading-[1.15]">
              {store.heroTitle}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-stone-600 leading-relaxed">
              {store.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href={`tel:${store.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors shadow-sm"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20bd5a] transition-colors shadow-sm"
              >
                <MessageCircle className="w-5 h-5" />
                Get Free Quote
              </a>
              <Link
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3 border border-surface-200 text-surface-800 font-semibold rounded-lg hover:bg-surface-50 transition-colors"
              >
                View Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-lift bg-white">
              <ProductImage
                src={homeBanner}
                alt="Drywell Hangers — cloth drying hangers, shoe racks, invisible grills, mosquito doors and wall mounted cloth hangers"
                fill
                className="object-contain p-1"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 sm:left-6 bg-white rounded-xl shadow-soft border border-surface-200 px-5 py-4">
              <p className="text-2xl font-bold text-brand-700">{store.stats.customers}</p>
              <p className="text-sm text-stone-500">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
