"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { logoPath } from "@/components/ui/Logo";

const displayPhone = "081259 93888";

type Props = Omit<ImageProps, "src"> & {
  src: string;
  fallback?: string;
  watermark?: boolean;
  watermarkPhone?: boolean;
  compactWatermark?: boolean;
};

export default function ProductImage({
  src,
  fallback,
  alt,
  watermark = true,
  watermarkPhone = true,
  compactWatermark = false,
  className,
  fill,
  ...props
}: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);

  const image = (
    <Image
      {...props}
      fill={fill}
      className={className}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (fallback && currentSrc !== fallback) {
          setCurrentSrc(fallback);
        }
      }}
    />
  );

  if (!watermark) return image;

  return (
    <div className={fill ? "absolute inset-0" : "relative w-full"}>
      {image}

      {/* Single-side watermark — bottom-right only, keeps photo clear */}
      <div
        className={`absolute z-10 pointer-events-none select-none rounded-md border border-white/90 bg-white/95 shadow-md ${
          compactWatermark
            ? "bottom-[2%] right-[2%] max-w-[46%] px-1 py-0.5"
            : "bottom-[3%] right-[3%] max-w-[34%] px-2 py-1.5"
        }`}
      >
        <Image
          src={logoPath}
          alt=""
          width={140}
          height={46}
          aria-hidden
          className={
            compactWatermark
              ? "h-3.5 w-auto max-w-full object-contain"
              : "h-6 sm:h-8 w-auto max-w-full object-contain"
          }
        />
        {watermarkPhone !== false && (
          <p
            className={`font-bold text-brand-800 leading-tight ${
              compactWatermark ? "text-[5px] mt-0.5 text-center" : "text-[9px] sm:text-[10px] mt-0.5"
            }`}
          >
            {displayPhone}
          </p>
        )}
      </div>
    </div>
  );
}
