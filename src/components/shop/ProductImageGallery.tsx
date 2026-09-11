"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductImage as ProductImageType } from "@/types/catalog";
import ProductImage from "@/components/shop/ProductImage";
import ProductImagePlaceholder from "@/components/shop/ProductImagePlaceholder";

type Props = {
  images: ProductImageType[];
  productName: string;
};

export default function ProductImageGallery({ images, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  if (!active) {
    return (
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-100 shadow-soft">
        <ProductImagePlaceholder label="Wall Mounted" gradient="from-sky-500 to-blue-600" />
      </div>
    );
  }

  const goPrev = () => {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const goNext = () => {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div>
      <div
        className={`relative aspect-square rounded-2xl overflow-hidden shadow-soft group ${
          active.objectFit === "contain" ? "bg-white" : "bg-surface-100"
        }`}
      >
        <ProductImage
          key={active.url}
          src={active.url}
          fallback={active.fallback}
          alt={active.alt ?? productName}
          watermark={active.watermark !== false}
          watermarkPhone={active.watermarkPhone !== false}
          fill
          className={`${active.objectFit === "contain" ? "object-contain p-2" : "object-cover"} transition-opacity duration-300`}
          priority={activeIndex === 0}
          sizes="(max-width:1024px) 100vw, 50vw"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-stone-800 shadow-md opacity-0 group-hover:opacity-100 sm:opacity-100 hover:bg-white transition-opacity"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-stone-800 shadow-md opacity-0 group-hover:opacity-100 sm:opacity-100 hover:bg-white transition-opacity"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute top-3 right-3 z-20 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white">
              {activeIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
          {images.map((img, index) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                index === activeIndex
                  ? "border-brand-600 ring-2 ring-brand-200 shadow-md"
                  : "border-surface-200 opacity-75 hover:opacity-100 hover:border-brand-300"
              }`}
            >
              <ProductImage
                src={img.url}
                fallback={img.fallback}
                alt={img.alt ?? `${productName} ${index + 1}`}
                watermark={img.watermark !== false}
                watermarkPhone={img.watermarkPhone !== false}
                compactWatermark
                fill
                className={img.objectFit === "contain" ? "object-contain p-0.5 bg-white" : "object-cover"}
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
