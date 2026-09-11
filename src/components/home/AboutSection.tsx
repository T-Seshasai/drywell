import { store } from "@/lib/store";
import { CheckCircle } from "lucide-react";

const highlights = [
  { label: "Free Installation", className: "bg-emerald-500 text-white shadow-sm" },
  {
    label: "1-5 Years Warranty",
    className:
      "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-400/40 ring-2 ring-red-300/50",
  },
  { label: "Trained Technicians", className: "bg-violet-600 text-white shadow-sm" },
  {
    label: "Hyderabad & Secunderabad Wide Service",
    className: "bg-orange-500 text-white shadow-sm",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-5 py-20">
      <p className="text-brand-600 text-sm font-semibold uppercase tracking-wider mb-2">
        Who We Are
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
        {store.aboutTitle}
      </h2>
      <p className="text-stone-600 leading-relaxed text-lg max-w-3xl mb-8">
        {store.aboutText}
      </p>
      <div className="flex flex-wrap gap-3">
        {highlights.map((item) => (
          <span
            key={item.label}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold ${item.className}`}
          >
            <CheckCircle className="w-4 h-4" />
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}
