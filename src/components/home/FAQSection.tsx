"use client";

import { useState } from "react";
import { faqs } from "@/lib/store";
import { Plus, Minus } from "lucide-react";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 bg-surface-50">
      <div className="text-center mb-12">
        <p className="text-brand-600 text-sm font-semibold uppercase tracking-wider mb-2">
          FAQ
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Common Questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={faq.q}
              className="bg-white rounded-xl border border-surface-200 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left font-medium hover:bg-surface-50 transition-colors"
              >
                {faq.q}
                {isOpen ? (
                  <Minus className="w-5 h-5 text-brand-600 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-stone-400 flex-shrink-0" />
                )}
              </button>
              {isOpen && (
                <div
                  className={`px-5 pb-5 leading-relaxed ${
                    faq.q.includes("cloth hanger types")
                      ? "text-base sm:text-lg font-semibold text-stone-800"
                      : "text-sm sm:text-base text-stone-600"
                  }`}
                >
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
