import { ReactNode } from "react";

export const PAGE_CONTENT_PRODUCTS_CLASS =
  "bg-gradient-to-br from-brand-50 via-white to-amber-50/70";

type Props = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  variant?: "default" | "products";
};

export default function PageContent({
  children,
  className = "",
  narrow = false,
  variant = "default",
}: Props) {
  const bgClass = variant === "products" ? PAGE_CONTENT_PRODUCTS_CLASS : "bg-surface-50";

  return (
    <div className={`${bgClass} min-h-[40vh] relative`}>
      {variant === "products" && (
        <>
          <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_10%_10%,rgba(13,148,136,0.12),transparent_40%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_90%_90%,rgba(245,158,11,0.15),transparent_45%)]" />
        </>
      )}
      <div
        className={`relative ${narrow ? "max-w-3xl" : "max-w-6xl"} mx-auto px-5 py-10 sm:py-12 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
