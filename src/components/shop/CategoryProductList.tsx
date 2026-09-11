"use client";

import { useState, type ReactNode } from "react";
import { Check, Crown } from "lucide-react";
import { Product } from "@/types/catalog";
import ProductCard from "@/components/shop/ProductCard";
import AmazonProductListItem from "@/components/shop/AmazonProductListItem";
import ClothHangerBuyingGuide from "@/components/shop/ClothHangerBuyingGuide";
import WallMountedClothHangerBuyingGuide from "@/components/shop/WallMountedClothHangerBuyingGuide";
import WarrantyBadge from "@/components/shop/WarrantyBadge";

const ROD_SET_CATEGORIES = new Set(["cloth-drying-hangers"]);

const AMAZON_LIST_CATEGORIES = new Set([
  "cloth-drying-hangers",
  "wall-mounted-cloth-hangers",
  "shoe-racks",
]);

const QUALITY_TIER_CATEGORIES = new Set([
  "cloth-drying-hangers",
  "wall-mounted-cloth-hangers",
]);

const HANGER_TYPE_CATEGORIES: Record<
  string,
  { defaultType: string; types: readonly string[]; config: Record<string, { label: string; hint: string }> }
> = {
  "cloth-drying-hangers": {
    defaultType: "cloth",
    types: ["cloth", "balcony", "roof", "ceiling", "wall", "outdoor"],
    config: {
      cloth: {
        label: "Cloth Drying Hanger",
        hint: "Everyday cloth drying · all-purpose use",
      },
      balcony: {
        label: "Balcony Cloth Dry Hangers",
        hint: "Apartment balconies · compact drying",
      },
      roof: {
        label: "Roof Cloth Dry Hangers",
        hint: "Roof & terrace · open-air drying",
      },
      ceiling: {
        label: "Ceiling Cloth Dry Hangers",
        hint: "Ceiling mounted · utility & indoor spaces",
      },
      wall: {
        label: "Wall Mounted Cloth Dry Hangers",
        hint: "Indoor wall mounting · utility & bedrooms",
      },
      outdoor: {
        label: "Outdoor Wall Mounted Cloth Dry Hangers",
        hint: "Outdoor walls · balcony & exterior use",
      },
    },
  },
  "wall-mounted-cloth-hangers": {
    defaultType: "wall",
    types: ["wall", "outdoor"],
    config: {
      wall: {
        label: "Wall Mounted Cloth Dry Hangers",
        hint: "Indoor wall mounting · utility & bedrooms",
      },
      outdoor: {
        label: "Outdoor Wall Mounted Cloth Dry Hangers",
        hint: "Outdoor walls · balcony & exterior use",
      },
    },
  },
};

const TIER_CONFIG = {
  standard: {
    borderClass: "quality-border-standard",
    label: "Standard Quality",
    badge: "Popular choice",
    Icon: Check,
    activeGlow: "shadow-[0_0_28px_rgba(13,148,136,0.45)]",
    activeBg: "bg-gradient-to-br from-brand-600 via-teal-500 to-emerald-500",
    iconWrap: "bg-white/20",
  },
  premium: {
    borderClass: "quality-border-premium",
    label: "Premium Quality",
    badge: "Recommended",
    Icon: Crown,
    activeGlow: "shadow-[0_0_32px_rgba(245,158,11,0.55)]",
    activeBg: "bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500",
    iconWrap: "bg-white/25",
  },
} as const;

type QualityTier = "standard" | "premium";

type Props = {
  products: Product[];
  categorySlug: string;
};

type RodCount = 3 | 6;

function SelectorBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-stone-500 leading-snug">
        {title}
      </p>
      <div className="flex gap-1.5">{children}</div>
    </div>
  );
}

function RodSetButton({
  rods,
  active,
  onClick,
}: {
  rods: RodCount;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-1 flex-col items-center justify-center rounded-md border px-2 py-1.5 text-center transition-all ${
        active
          ? "border-accent-500 bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-sm"
          : "border-surface-200 bg-surface-50/80 text-stone-800 hover:border-accent-300 hover:bg-amber-50/50"
      }`}
    >
      <span className="block text-sm font-black tabular-nums leading-none">{rods}</span>
      <span className="block text-[9px] font-bold uppercase tracking-wide mt-0.5">Rods</span>
    </button>
  );
}

function HangerTypeButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg border px-3 py-2 text-xs font-bold leading-snug transition-all ${
        active
          ? "border-brand-600 bg-brand-600 text-white shadow-sm"
          : "border-surface-200 bg-white text-stone-700 hover:border-brand-300 hover:bg-brand-50/50"
      }`}
    >
      {label}
    </button>
  );
}

function QualityTierButton({
  tier,
  active,
  onClick,
  compact,
}: {
  tier: QualityTier;
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  const config = TIER_CONFIG[tier];
  const { Icon } = config;

  if (compact) {
    return (
      <div
        className={`flex flex-1 rounded-md p-[1px] transition-all ${active ? config.borderClass : ""}`}
      >
        <button
          type="button"
          onClick={onClick}
          aria-pressed={active}
          className={`flex flex-1 flex-col items-center justify-center gap-1.5 rounded-[5px] px-2 py-2.5 text-center transition-all ${
            active
              ? `${config.activeBg} text-white shadow-sm`
              : "bg-surface-50/80 text-stone-800 hover:bg-surface-50 border border-surface-200"
          }`}
        >
          <Icon className="h-4 w-4" strokeWidth={2.5} />
          <span className="text-xs font-extrabold leading-none">
            {tier === "standard" ? "Standard" : "Premium"}
          </span>
          <WarrantyBadge tier={tier} size="tier" inverted={active} />
        </button>
      </div>
    );
  }

  return null;
}

export default function CategoryProductList({ products, categorySlug }: Props) {
  const hasQualityTiers = QUALITY_TIER_CATEGORIES.has(categorySlug);
  const hasRodSets = ROD_SET_CATEGORIES.has(categorySlug);
  const useAmazonList = AMAZON_LIST_CATEGORIES.has(categorySlug);
  const hangerTypeSetup = HANGER_TYPE_CATEGORIES[categorySlug];
  const hasHangerTypes = Boolean(hangerTypeSetup);
  const [tier, setTier] = useState<QualityTier>("standard");
  const [rodCount, setRodCount] = useState<RodCount>(6);
  const [hangerType, setHangerType] = useState(
    () => hangerTypeSetup?.defaultType ?? "cloth"
  );

  const isWallMountedType = hangerType === "wall" || hangerType === "outdoor";
  const showRodSets = hasRodSets && !isWallMountedType;

  const handleHangerTypeChange = (type: string) => {
    setHangerType(type);
    if (type === "wall" || type === "outdoor") {
      setRodCount(6);
    }
  };

  const visible = products.filter((product) => {
    if (hasQualityTiers && product.qualityTier !== tier) return false;
    if (hasHangerTypes && product.hangerType !== hangerType) return false;
    if (showRodSets && product.rodCount !== rodCount) return false;
    return true;
  });

  const activeHangerLabel = hangerTypeSetup?.config[hangerType]?.label;

  return (
    <>
      {categorySlug === "wall-mounted-cloth-hangers" ? (
        <WallMountedClothHangerBuyingGuide />
      ) : categorySlug === "cloth-drying-hangers" && !isWallMountedType ? (
        <ClothHangerBuyingGuide />
      ) : null}

      {(hasHangerTypes || showRodSets || hasQualityTiers) && (
        <div className="mb-6 rounded-lg border border-surface-200 bg-white p-3 sm:p-4 shadow-soft space-y-3">
          {hasHangerTypes && hangerTypeSetup && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                Select hanger type
              </p>
              <div className="flex flex-wrap gap-2">
                {hangerTypeSetup.types.map((type) => {
                  const config = hangerTypeSetup.config[type];
                  return (
                    <HangerTypeButton
                      key={type}
                      label={config.label}
                      active={hangerType === type}
                      onClick={() => handleHangerTypeChange(type)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {isWallMountedType && categorySlug === "cloth-drying-hangers" && (
            <WallMountedClothHangerBuyingGuide embedded />
          )}

          {(showRodSets || hasQualityTiers) && (
            <div
              className={`grid gap-3 ${
                showRodSets && hasQualityTiers
                  ? "grid-cols-1 sm:grid-cols-2 sm:max-w-2xl"
                  : "grid-cols-1 sm:max-w-xs"
              }`}
            >
              {showRodSets && (
                <SelectorBox title="Choose rod set">
                  {([3, 6] as const).map((rods) => (
                    <RodSetButton
                      key={rods}
                      rods={rods}
                      active={rodCount === rods}
                      onClick={() => setRodCount(rods)}
                    />
                  ))}
                </SelectorBox>
              )}

              {hasQualityTiers && (
                <SelectorBox title="Choose quality">
                  {(["standard", "premium"] as const).map((value) => (
                    <QualityTierButton
                      key={value}
                      tier={value}
                      active={tier === value}
                      onClick={() => setTier(value)}
                      compact
                    />
                  ))}
                </SelectorBox>
              )}
            </div>
          )}

          {hasQualityTiers && (
            <div className="pt-2 border-t border-surface-100">
              <p className="text-[11px] font-medium text-stone-500">
                Showing{" "}
                <span className="font-bold text-brand-700">{visible.length}</span>{" "}
                {tier === "premium" ? "premium" : "standard"} products
                {activeHangerLabel && (
                  <span className="text-stone-400"> · {activeHangerLabel}</span>
                )}
              </p>
            </div>
          )}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="text-stone-500 text-center py-12">No products in this range yet.</p>
      ) : useAmazonList ? (
        <div className="bg-white rounded-xl border border-surface-200 shadow-soft overflow-hidden">
          <div className="px-4 py-3 border-b border-surface-200 bg-surface-50/80">
            <p className="text-sm text-stone-600">
              <span className="font-semibold text-stone-900">{visible.length} results</span>
              {activeHangerLabel && (
                <span className="text-stone-500"> for {activeHangerLabel}</span>
              )}
            </p>
          </div>
          <div className="divide-y divide-surface-200">
            {visible.map((product) => (
              <AmazonProductListItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
