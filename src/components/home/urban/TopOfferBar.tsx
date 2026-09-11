"use client";

import { topOffers } from "@/data/home-content";

export default function TopOfferBar() {
  const text = topOffers.join("  •  ");

  return (
    <div className="bg-accent-600 text-white text-xs sm:text-sm py-2.5 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="inline-block px-8">{text}</span>
        <span className="inline-block px-8">{text}</span>
      </div>
    </div>
  );
}
