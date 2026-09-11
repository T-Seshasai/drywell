import HeroCarousel from "@/components/home/urban/HeroCarousel";
import ServiceHighlights from "@/components/home/urban/ServiceHighlights";
import ShopByCategory from "@/components/home/urban/ShopByCategory";
import OffersStrip from "@/components/home/urban/OffersStrip";
import ProductCarousel from "@/components/home/urban/ProductCarousel";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import ContactForm from "@/components/home/ContactForm";
import {
  products,
  getFeaturedProducts,
  getOnlinePurchaseProducts,
  getPopularProducts,
} from "@/lib/catalog";
import { store } from "@/lib/store";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function HomePage() {
  const featured = getFeaturedProducts().length
    ? getFeaturedProducts()
    : products.filter((p) => p.categorySlug === "cloth-drying-hangers").slice(0, 6);

  const shopOnline = getOnlinePurchaseProducts().slice(0, 10);
  const popular = getPopularProducts();

  const whatsappUrl = `https://wa.me/${store.whatsapp}?text=${encodeURIComponent("Hi, I need a free quote from Drywell Hangers.")}`;

  return (
    <div className="bg-white">
      <HeroCarousel />
      <ServiceHighlights />
      <ShopByCategory />
      <OffersStrip />

      <ProductCarousel
        title="Popular Products"
        subtitle="Premium cloth drying hangers — balcony, ceiling, roof & more"
        products={popular}
        viewAllHref="/products/cloth-drying-hangers"
      />

      <ProductCarousel
        title="Shop Online"
        subtitle="Buy now with delivery across Hyderabad"
        products={shopOnline.length ? shopOnline : featured}
        viewAllHref="/products"
      />

      <ProductCarousel
        title="Featured Installations"
        subtitle="Professional fitting across Hyderabad & Secunderabad"
        products={featured}
        viewAllHref="/products/cloth-drying-hangers"
      />

      <section className="bg-brand-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-100 text-sm uppercase tracking-wider mb-2">Hyderabad & Secunderabad</p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            {store.stats.customers} Happy Customers · 1-5 Years Warranty
          </h2>
          <p className="text-brand-100 max-w-2xl mx-auto mb-8">
            Same-week installation · Professional fitting · Warranty on selected products
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${store.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-900 font-semibold rounded-lg hover:bg-brand-50"
            >
              <Phone className="w-5 h-5" />
              Call 081259 93888
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20bd5a]"
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <FAQSection />

      <section id="contact" className="bg-surface-50 border-t border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Contact Us</h2>
              <p className="text-stone-500 leading-relaxed mb-8">
                Request a quote or ask about product sizes and installation.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-stone-600">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-50 text-brand-600">
                    <Phone className="w-4 h-4" />
                  </span>
                  <a href={`tel:${store.phone}`} className="hover:text-brand-600">
                    {store.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-stone-600">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-50 text-brand-600">
                    <Mail className="w-4 h-4" />
                  </span>
                  <a href={`mailto:${store.email}`} className="hover:text-brand-600">
                    {store.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-stone-600">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-50 text-brand-600">
                    <MapPin className="w-4 h-4" />
                  </span>
                  {store.address}
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-soft p-6 sm:p-8 border border-surface-200">
              <ContactForm idPrefix="footer" source="Homepage contact section" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
