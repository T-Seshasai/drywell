"use client";

import Link from "next/link";
import { categoryNavItems } from "@/data/home-content";

export default function CategoryNavStrip() {
  return (
    <nav className="bg-white border-b border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
          {categoryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex-shrink-0 px-4 py-2 text-sm font-medium text-stone-600 hover:text-brand-700 hover:bg-brand-50 rounded-full whitespace-nowrap transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
