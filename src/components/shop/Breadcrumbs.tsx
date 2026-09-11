import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({
  items,
  variant = "default",
}: {
  items: BreadcrumbItem[];
  variant?: "default" | "onDark";
}) {
  const onDark = variant === "onDark";

  return (
    <nav
      aria-label="Breadcrumb"
      className={
        onDark
          ? "inline-flex flex-wrap items-center gap-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 px-2 py-1 text-[10px] sm:text-[11px] mb-4 max-w-full"
          : "flex flex-wrap items-center gap-2 text-xs mb-6 sm:mb-8 text-stone-400"
      }
    >
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1">
          {i > 0 && (
            <ChevronRight
              className={`w-2.5 h-2.5 shrink-0 ${onDark ? "text-white/45" : ""}`}
            />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className={
                onDark
                  ? "text-white/75 hover:text-white transition-colors"
                  : "hover:text-brand-700"
              }
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={
                onDark ? "text-white font-semibold truncate max-w-[180px] sm:max-w-none" : "text-surface-900"
              }
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
