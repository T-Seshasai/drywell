import { homeOffers } from "@/data/home-content";

export default function OffersStrip() {
  return (
    <section className="bg-surface-50 border-y border-surface-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
          Offers & Benefits
        </h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
          {homeOffers.map((offer) => (
            <div
              key={offer.code}
              className="flex-shrink-0 snap-start w-[260px] sm:w-[280px] bg-white border border-surface-200 rounded-lg p-5 hover:shadow-soft transition-shadow"
            >
              <p className="font-bold text-surface-900">{offer.title}</p>
              <p className="text-sm text-stone-500 mt-1">{offer.subtitle}</p>
              <p className="text-xs font-mono text-brand-700 mt-3 bg-brand-50 inline-block px-2 py-1 rounded">
                {offer.code}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
