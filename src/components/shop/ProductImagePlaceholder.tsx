type Props = {
  label?: string;
  className?: string;
  gradient?: string;
};

export default function ProductImagePlaceholder({
  label = "Image coming soon",
  className = "",
  gradient = "from-sky-500 to-blue-600",
}: Props) {
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center p-3 ${className}`}
    >
      <span className="text-white text-xs sm:text-sm font-semibold text-center leading-snug line-clamp-3">
        {label}
      </span>
    </div>
  );
}
