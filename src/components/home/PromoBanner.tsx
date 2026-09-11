import { promoBanner } from "@/data/home-content";
import { Zap } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="bg-brand-900 text-white">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-center gap-3 text-sm sm:text-base font-medium text-center">
        <Zap className="w-5 h-5 text-accent-400 flex-shrink-0" />
        <p>{promoBanner}</p>
      </div>
    </section>
  );
}
