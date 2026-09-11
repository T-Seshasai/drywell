import { ShieldCheck } from "lucide-react";

export type WarrantyTier = "standard" | "premium";

const CONFIG = {
  standard: {
    years: 1,
    shortLabel: "1 Yr Warranty",
    fullLabel: "1 Year Warranty",
    box: "bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-300 text-teal-900",
    num: "text-teal-600",
    icon: "text-teal-600",
  },
  premium: {
    years: 3,
    shortLabel: "3 Yrs Warranty",
    fullLabel: "3 Years Warranty",
    box: "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 text-amber-900",
    num: "text-amber-600",
    icon: "text-amber-600",
  },
} as const;

type Props = {
  tier: WarrantyTier;
  size?: "sm" | "compact" | "tier" | "md" | "lg";
  className?: string;
  inverted?: boolean;
};

export default function WarrantyBadge({
  tier,
  size = "md",
  className = "",
  inverted = false,
}: Props) {
  const config = CONFIG[tier];

  if (size === "tier") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-md border-2 px-2 py-1 shadow-sm ${
          inverted
            ? tier === "premium"
              ? "bg-white/95 border-white text-amber-900"
              : "bg-white/95 border-white text-teal-900"
            : config.box
        } ${className}`}
      >
        <ShieldCheck
          className={`h-3.5 w-3.5 shrink-0 ${
            inverted
              ? tier === "premium"
                ? "text-amber-600"
                : "text-teal-600"
              : config.icon
          }`}
          strokeWidth={2.5}
        />
        <div className="leading-tight text-left">
          <p
            className={`text-base font-black leading-none tabular-nums ${
              inverted
                ? tier === "premium"
                  ? "text-amber-600"
                  : "text-teal-600"
                : config.num
            }`}
          >
            {config.years}
          </p>
          <p className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wide">
            {config.years === 1 ? "Year" : "Years"} Warranty
          </p>
        </div>
      </div>
    );
  }

  if (size === "sm") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide ${config.box} ${className}`}
      >
        <ShieldCheck className={`h-3.5 w-3.5 shrink-0 ${config.icon}`} strokeWidth={2.5} />
        {config.shortLabel}
      </span>
    );
  }

  if (size === "compact") {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-lg border-2 px-2.5 py-2 shadow-sm ${config.box} ${className}`}
      >
        <ShieldCheck className={`h-4 w-4 shrink-0 ${config.icon}`} strokeWidth={2.5} />
        <div className="leading-tight text-left">
          <p className={`text-xl font-black leading-none tabular-nums ${config.num}`}>
            {config.years}
          </p>
          <p className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide">
            {config.years === 1 ? "Year" : "Years"} Warranty
          </p>
        </div>
      </div>
    );
  }

  if (size === "lg") {
    return (
      <div
        className={`inline-flex items-center gap-3 rounded-xl border-2 px-4 py-3 shadow-md ${config.box} ${className}`}
      >
        <ShieldCheck className={`h-8 w-8 shrink-0 ${config.icon}`} strokeWidth={2.5} />
        <div>
          <p className={`text-3xl font-black leading-none tabular-nums ${config.num}`}>
            {config.years}
          </p>
          <p className="text-xs font-extrabold uppercase tracking-wide mt-0.5">
            {config.years === 1 ? "Year" : "Years"} Warranty
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-lg border-2 px-3 py-2 shadow-sm ${config.box} ${className}`}
    >
      <ShieldCheck className={`h-5 w-5 shrink-0 ${config.icon}`} strokeWidth={2.5} />
      <div className="leading-tight">
        <p className={`text-xl font-black tabular-nums ${config.num}`}>{config.years}</p>
        <p className="text-[10px] font-extrabold uppercase tracking-wide">
          {config.years === 1 ? "Year" : "Years"} Warranty
        </p>
      </div>
    </div>
  );
}

export function getWarrantyLabel(tier: WarrantyTier): string {
  return CONFIG[tier].fullLabel;
}
