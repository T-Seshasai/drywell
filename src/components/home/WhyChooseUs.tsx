import { whyChoose } from "@/lib/store";
import { Shield, Wrench, IndianRupee, Award, Headphones, MapPinned } from "lucide-react";

const icons = [Wrench, Shield, IndianRupee, Award, Headphones, MapPinned];

export default function WhyChooseUs() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-20">
      <div className="text-center mb-12">
        <p className="text-brand-600 text-sm font-semibold uppercase tracking-wider mb-2">
          Why Choose Us
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Built for Reliable Home Installations
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {whyChoose.map((item, i) => {
          const Icon = icons[i] ?? Shield;
          return (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-white border border-surface-200 hover:border-brand-200 hover:shadow-soft transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
