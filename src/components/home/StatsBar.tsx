import { store } from "@/lib/store";
import { Users, MapPin, Clock, ShieldCheck } from "lucide-react";

const items = [
  { icon: Users, value: store.stats.customers, label: "Happy Customers" },
  { icon: MapPin, value: store.stats.areas, label: "Areas Covered" },
  { icon: Clock, value: store.stats.products, label: "Product Categories" },
  { icon: ShieldCheck, value: "1-5 Years", label: "Warranty" },
];

export default function StatsBar() {
  return (
    <section className="bg-white border-b border-surface-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-5 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-900">{item.value}</p>
                <p className="text-sm text-stone-500">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
