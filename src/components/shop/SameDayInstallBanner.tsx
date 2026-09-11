import { Zap } from "lucide-react";

type Props = {
  className?: string;
  compact?: boolean;
};

export default function SameDayInstallBanner({ className = "", compact = false }: Props) {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border-2 border-red-500 bg-gradient-to-r from-red-600 to-orange-500 px-2 py-0.5 text-white shadow-sm">
        <Zap className="h-3.5 w-3.5 shrink-0 fill-white" strokeWidth={2.5} />
        <span className="text-xs sm:text-sm font-black uppercase tracking-wide">
          Same Day Free Installation — Hyderabad & Secunderabad
        </span>
      </span>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg border-2 border-red-500 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 px-3 py-2.5 sm:px-4 sm:py-3 text-center shadow-md ${className}`}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,rgba(255,255,255,0.08)_8px,rgba(255,255,255,0.08)_16px)]" />
      <div className="relative flex items-center justify-center gap-2">
        <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/40">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white fill-white" strokeWidth={2.5} />
        </span>
        <p className="text-xs sm:text-sm font-black uppercase tracking-wide text-white drop-shadow-sm leading-snug">
          Same Day Free Installation in Hyderabad & Secunderabad
        </p>
      </div>
    </div>
  );
}
