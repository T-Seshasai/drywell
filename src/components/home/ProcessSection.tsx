import { processSteps, store } from "@/lib/store";
import { Phone, MessageCircle } from "lucide-react";

export default function ProcessSection() {
  const whatsappUrl = `https://wa.me/${store.whatsapp}?text=${encodeURIComponent("Hi, I would like a quote from Drywell Hangers.")}`;

  return (
    <section className="bg-brand-50 border-y border-brand-100">
      <div className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <p className="text-brand-600 text-sm font-semibold uppercase tracking-wider mb-2">
            Simple Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {processSteps.map((step) => (
            <div key={step.step} className="relative text-center p-6 bg-white rounded-2xl border border-surface-200">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center mx-auto mb-4">
                {step.step}
              </div>
              <h3 className="font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-stone-500">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us
          </a>
          <a
            href={`tel:${store.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
