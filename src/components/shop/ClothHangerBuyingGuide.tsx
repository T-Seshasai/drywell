import SameDayInstallBanner from "@/components/shop/SameDayInstallBanner";

const GUIDE_ITEMS = [
  { label: "Small Space", value: "3-Rod Cloth Dry Hanger Set (1 Feet Width)" },
  {
    label: "Dry More Clothes",
    value: "6-Rod Cloth Dry Hangers Set (2 feet Width)",
  },
  { label: "Available Lengths", value: "4 feet to 8 feet" },
  {
    label: "Installation Areas",
    value: "Balcony Roof, Iron Shed, Utility Area, concrete roof and Ceiling Mounted",
  },
  { label: "Choose Quality Options", value: "Standard & Premium" },
] as const;

export default function ClothHangerBuyingGuide() {
  return (
    <div className="mb-8 rounded-xl border border-brand-100 bg-white p-4 sm:p-5 shadow-soft">
      <div className="rounded-lg border border-brand-100 bg-gradient-to-br from-brand-50/60 to-white overflow-hidden">
        <ul className="divide-y divide-brand-100">
          {GUIDE_ITEMS.map((item) => (
            <li
              key={item.label}
              className="grid grid-cols-2 gap-2 sm:gap-4 px-3 sm:px-4 py-3 sm:py-3.5"
            >
              <div className="flex items-baseline gap-x-1.5 sm:gap-x-2 min-w-0">
                <span className="text-[11px] sm:text-sm font-extrabold text-brand-950 leading-snug">
                  {item.label}
                </span>
                <span className="font-bold text-brand-500 shrink-0">→</span>
              </div>
              <p className="text-[11px] sm:text-sm font-semibold text-stone-800 leading-snug border-l border-brand-100 pl-2 sm:pl-4 min-w-0">
                {item.value}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3 pt-3 border-t border-brand-50">
        <SameDayInstallBanner />
      </div>
    </div>
  );
}
