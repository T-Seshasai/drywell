type Props = {
  badge: string;
  className?: string;
};

export default function QualityBadge({ badge, className = "" }: Props) {
  const isStandard = badge === "Standard";
  const isPremium = badge === "Premium";

  if (!isStandard && !isPremium) {
    return (
      <span
        className={`inline-block rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide bg-surface-800 text-white shadow-md ${className}`}
      >
        {badge}
      </span>
    );
  }

  return (
    <span
      className={`inline-block rounded-lg px-3.5 py-1.5 text-sm font-extrabold uppercase tracking-wider shadow-lg border-2 ${
        isStandard
          ? "bg-gradient-to-r from-brand-600 to-teal-500 text-white border-teal-300/60"
          : "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-200/70"
      } ${className}`}
    >
      {badge}
    </span>
  );
}
