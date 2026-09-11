import { serviceAreas, store } from "@/lib/store";
import { Phone } from "lucide-react";

export default function AreasSection() {
  const mid = Math.ceil(serviceAreas.length / 3);
  const columns = [
    serviceAreas.slice(0, mid),
    serviceAreas.slice(mid, mid * 2),
    serviceAreas.slice(mid * 2),
  ];

  return (
    <section className="bg-surface-50 border-y border-surface-200">
      <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-brand-600 text-sm font-semibold uppercase tracking-wider mb-2">
            Service Coverage
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-surface-900">
            We Serve All Over Hyderabad
          </h2>
          <p className="text-stone-500 mt-3 leading-relaxed">
            Cloth hanger and home fitting installation across {store.stats.areas}.
            Your locality not listed? Call us — we likely cover your area too.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-10">
          {columns.map((column, colIndex) => (
            <ul key={colIndex} className="space-y-2.5">
              {column.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 text-stone-700 text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="text-center">
          <a
            href={`tel:${store.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Check If We Cover Your Area
          </a>
        </div>
      </div>
    </section>
  );
}
