import { Check, Crown } from "lucide-react";

const SHARED = "Jindal Stainless Steel Pipes";

const STANDARD_DETAILS = [
  { label: "Material", value: SHARED },
  { label: "Rod Size", value: "12mm" },
  { label: "Rope", value: "3mm Rope" },
  { label: "Bracket", value: "PVC Bracket" },
  { label: "Warranty", value: "1 Year Warranty" },
  { label: "Free Service", value: "1 Free Service" },
] as const;

const PREMIUM_DETAILS = [
  { label: "Material", value: SHARED },
  { label: "Rod Size", value: "16mm" },
  { label: "Rope", value: "4mm Rope" },
  { label: "Bracket", value: "Metal Bracket" },
  { label: "Warranty", value: "3 Years Warranty" },
  { label: "Free Service", value: "3 Free Services" },
] as const;

const WALL_MOUNTED_STANDARD_DETAILS = STANDARD_DETAILS.map((item) =>
  item.label === "Bracket" ? { ...item, value: "Heavy Metal Wall Bracket" } : item
);

const WALL_MOUNTED_PREMIUM_DETAILS = PREMIUM_DETAILS.map((item) =>
  item.label === "Bracket" ? { ...item, value: "Heavy Metal Wall Bracket" } : item
);

type Props = {
  activeTier?: "standard" | "premium";
  wallMounted?: boolean;
};

function QualityBox({
  tier,
  title,
  details,
  active,
}: {
  tier: "standard" | "premium";
  title: string;
  details: readonly { label: string; value: string }[];
  active?: boolean;
}) {
  const isPremium = tier === "premium";

  return (
    <div
      className={`rounded-xl border-2 p-5 sm:p-6 shadow-soft min-w-0 ${
        isPremium
          ? "border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50/80"
          : "border-teal-300 bg-gradient-to-br from-teal-50 to-emerald-50/80"
      } ${active ? "ring-2 ring-offset-2 ring-brand-500" : ""}`}
    >
      <div className="flex items-center gap-2.5 mb-5">
        <span
          className={`inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg ${
            isPremium
              ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white"
              : "bg-gradient-to-br from-brand-600 to-teal-500 text-white"
          }`}
        >
          {isPremium ? (
            <Crown className="h-4 w-4" strokeWidth={2.5} />
          ) : (
            <Check className="h-4 w-4" strokeWidth={2.5} />
          )}
        </span>
        <h3
          className={`text-lg sm:text-2xl font-black leading-tight tracking-tight ${
            isPremium ? "text-amber-950" : "text-brand-950"
          }`}
        >
          {title}
        </h3>
        {active && (
          <span className="hidden sm:inline ml-auto text-[10px] font-bold uppercase tracking-wide rounded-md bg-white/80 px-2 py-1 text-brand-700 border border-brand-200">
            This product
          </span>
        )}
      </div>

      <ul className="space-y-3">
        {details.map((item) => (
          <li key={item.label} className="text-sm sm:text-lg leading-relaxed text-stone-800">
            <span
              className={`font-black ${
                isPremium ? "text-amber-950" : "text-brand-950"
              }`}
            >
              {item.label}:
            </span>{" "}
            <span className="font-semibold text-stone-900">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ClothHangerQualityComparison({ activeTier, wallMounted = false }: Props) {
  const standardDetails = wallMounted ? WALL_MOUNTED_STANDARD_DETAILS : STANDARD_DETAILS;
  const premiumDetails = wallMounted ? WALL_MOUNTED_PREMIUM_DETAILS : PREMIUM_DETAILS;

  const standardBox = (
    <QualityBox
      tier="standard"
      title="Standard Quality"
      details={standardDetails}
      active={activeTier === "standard"}
    />
  );

  const premiumBox = (
    <QualityBox
      tier="premium"
      title="Premium Quality"
      details={premiumDetails}
      active={activeTier === "premium"}
    />
  );

  return (
    <section className="mt-12">
      <h2 className="text-xl sm:text-2xl font-black text-brand-950 mb-5">
        {wallMounted ? "Wall Mounted : Difference Standard & Premium Quality" : "Difference Standard & Premium Quality"}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {activeTier === "premium" ? (
          <>
            {premiumBox}
            {standardBox}
          </>
        ) : (
          <>
            {standardBox}
            {premiumBox}
          </>
        )}
      </div>
    </section>
  );
}
