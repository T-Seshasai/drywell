"use client";

import { useState } from "react";
import { testimonials } from "@/lib/store";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const visible = 3;
  const maxIndex = Math.max(0, testimonials.length - visible);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 bg-white">
      <div className="text-center mb-12">
        <p className="text-brand-600 text-sm font-semibold uppercase tracking-wider mb-2">
          Customer Reviews
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          What Homeowners Say
        </h2>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(index, index + visible).map((t) => (
            <blockquote
              key={t.name}
              className="p-6 bg-white rounded-2xl border border-surface-200 shadow-soft"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent-400 text-accent-400" />
                ))}
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <footer>
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-stone-400">{t.area}, Hyderabad</p>
              </footer>
            </blockquote>
          ))}
        </div>

        {testimonials.length > visible && (
          <div className="flex justify-center gap-3 mt-8">
            <button
              type="button"
              onClick={prev}
              disabled={index === 0}
              className="p-2 rounded-full border border-surface-200 disabled:opacity-30 hover:bg-surface-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={index >= maxIndex}
              className="p-2 rounded-full border border-surface-200 disabled:opacity-30 hover:bg-surface-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
