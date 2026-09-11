"use client";

import { store } from "@/lib/store";
import { Phone } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { trackWhatsAppClick } from "@/lib/analytics/events";

export default function FloatingButtons() {
  const whatsappUrl = `https://wa.me/${store.whatsapp}?text=${encodeURIComponent("Hi, I need help with Drywell Hangers.")}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("floating")}
        className="flex items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5a] hover:scale-105 transition-all"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6 flex-shrink-0" />
        <span className="text-sm font-semibold whitespace-nowrap">WhatsApp</span>
      </a>
      <a
        href={`tel:${store.phone}`}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-accent-500 text-white shadow-lg hover:bg-accent-600 hover:scale-105 transition-all"
        aria-label="Call"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
