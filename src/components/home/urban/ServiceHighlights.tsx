import { serviceHighlights } from "@/data/home-content";
import { Award, Headphones, ShieldCheck, Users, Wrench, Briefcase } from "lucide-react";

const icons = [Award, Wrench, ShieldCheck, Headphones, Briefcase, Users];

export default function ServiceHighlights() {
  return (
    <section className="bg-surface-50 border-y border-surface-200 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-surface-900">
            Warranty & Support
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {serviceHighlights.map((item, i) => {
            const Icon = icons[i] ?? Award;
            const isSameDay = item.title === "Same Day Free Installation";
            return (
              <div
                key={item.title}
                className={`text-center rounded-lg bg-white border px-2 py-4 sm:px-3 sm:py-5 shadow-soft ${
                  isSameDay
                    ? "border-2 border-red-500 bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 text-white"
                    : "border-surface-200"
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full mb-2 sm:mb-3 ${
                    isSameDay ? "bg-white/20 text-white ring-2 ring-white/30" : "bg-brand-50 text-brand-700"
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <p
                  className={`text-xs sm:text-sm leading-snug ${
                    isSameDay ? "font-black uppercase tracking-wide text-white" : "font-semibold text-surface-900"
                  }`}
                >
                  {item.title}
                </p>
                <p
                  className={`text-[10px] sm:text-xs mt-1 leading-snug ${
                    isSameDay ? "font-semibold text-white/95" : "text-stone-500"
                  }`}
                >
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
