import Breadcrumbs, { BreadcrumbItem } from "@/components/shop/Breadcrumbs";

export const PAGE_HERO_CLASS =
  "relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-accent-600 text-white";

type Props = {
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  centered?: boolean;
  compact?: boolean;
};

export default function PageHero({
  title,
  description,
  breadcrumbs,
  centered,
  compact,
}: Props) {
  return (
    <div className={`${PAGE_HERO_CLASS} ${compact ? "py-6 sm:py-8" : "py-12 sm:py-14"}`}>
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_45%)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_80%,rgba(251,191,36,0.45),transparent_50%)]" />
      <div className={`relative max-w-6xl mx-auto px-5 ${centered ? "text-center" : ""}`}>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} variant="onDark" />}
        {title && (
          <h1
            className={`font-bold tracking-tight leading-snug ${
              compact ? "text-base sm:text-lg md:text-xl" : "text-3xl sm:text-4xl"
            }`}
          >
            {title}
          </h1>
        )}
        {description && (
          <p
            className={`text-white/90 leading-relaxed ${
              compact ? "mt-2 text-xs sm:text-sm max-w-3xl" : "mt-3 text-base sm:text-lg max-w-2xl"
            } ${centered ? "mx-auto" : ""}`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
