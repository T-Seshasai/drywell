import Link from "next/link";
import { store } from "@/lib/store";
import { Phone, MessageCircle } from "lucide-react";

export default function CTASection() {
  const whatsappUrl = `https://wa.me/${store.whatsapp}?text=${encodeURIComponent("Hi, I want to get started with a home solution.")}`;

  return (
    <section className="max-w-6xl mx-auto px-5 py-20">
      <div className="rounded-3xl bg-gradient-to-r from-brand-600 to-brand-700 p-10 sm:p-14 text-white text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Ready to Get Started?
        </h2>
        <p className="text-teal-100 max-w-lg mx-auto mb-8">
          Call or WhatsApp for a quote. No obligation — we come to you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`tel:${store.phone}`}
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-brand-900 font-semibold rounded-lg hover:bg-teal-50 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Quote
          </a>
          <Link href="/products" className="inline-flex items-center gap-2 px-7 py-3 border border-white/30 font-semibold rounded-lg hover:bg-white/10 transition-colors"
          >
            Shop Online
          </Link>
        </div>
      </div>
    </section>
  );
}
