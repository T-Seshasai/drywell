"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Grid3X3, X } from "lucide-react";
import {
  categories,
  getProductsByCategory,
  getCategoryPath,
  getProductPath,
} from "@/lib/store";

export const menuData = categories.map((category) => ({
  category,
  products: getProductsByCategory(category.slug),
}));

/** Single category + nav row — one bar only */
export function CategoryStrip({
  onOpenMenu,
  navLinks,
}: {
  onOpenMenu: () => void;
  navLinks?: { href: string; label: string }[];
}) {
  return (
    <div className="border-b border-surface-200 bg-white">
      <div className="max-w-7xl mx-auto flex items-center gap-2 px-4 py-2.5 overflow-x-auto scrollbar-hide">
        <button
          type="button"
          onClick={onOpenMenu}
          className="lg:hidden flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-600 text-white text-xs font-semibold"
        >
          <Grid3X3 className="w-3.5 h-3.5" />
          Menu
        </button>
        {menuData.map(({ category }) => (
          <Link
            key={category.id}
            href={getCategoryPath(category)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full border border-surface-200 text-xs font-medium text-stone-700 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-300 whitespace-nowrap transition-colors"
          >
            {category.name}
          </Link>
        ))}
        {navLinks?.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-stone-500 hover:text-brand-700 whitespace-nowrap hidden lg:inline-flex"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/** Tap accordion — all categories & products */
export function MegaMenuMobile({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-surface-200 overflow-hidden bg-white">
      <div className="flex items-center justify-between px-4 py-3 bg-surface-50 border-b border-surface-200">
        <div className="flex items-center gap-2">
          <Grid3X3 className="w-4 h-4 text-brand-700" />
          <span className="text-sm font-bold text-surface-900">All Categories</span>
        </div>
        <span className="text-xs text-stone-400">{menuData.length} categories</span>
      </div>

      <div className="max-h-[55vh] overflow-y-auto divide-y divide-surface-100">
        {menuData.map(({ category, products }) => {
          const isOpen = expanded === category.slug;
          return (
            <div key={category.id}>
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : category.slug)}
                className={`flex items-center justify-between w-full px-4 py-3.5 text-left transition-colors ${
                  isOpen ? "bg-brand-50" : "active:bg-surface-100"
                }`}
              >
                <span className="text-sm font-semibold text-surface-900 pr-3">{category.name}</span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 text-stone-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-brand-600" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-200 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 pt-0 bg-brand-50/40">
                    <p className="text-xs text-stone-500 mb-3">{category.shortDescription}</p>
                    <Link
                      href={getCategoryPath(category)}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 mb-3"
                    >
                      View all {category.name}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <ul className="space-y-2 pl-1">
                      {products.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={getProductPath(product)}
                            onClick={onClose}
                            className="text-sm text-stone-600 active:text-brand-700 block py-1"
                          >
                            {product.name}
                          </Link>
                        </li>
                      ))}
                      {products.length === 0 && (
                        <li className="text-xs text-stone-400">Coming soon</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Link
        href="/products"
        onClick={onClose}
        className="block text-center text-sm font-semibold text-brand-700 py-3.5 bg-surface-50 border-t border-surface-200 active:bg-brand-50 transition-colors"
      >
        View All Products →
      </Link>
    </div>
  );
}

export function NavDrawer({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[60] lg:hidden" onClick={onClose} aria-hidden />
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-[70] lg:hidden shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between px-4 py-3 border-b border-surface-200">
          <span className="font-bold text-surface-900">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg active:bg-surface-100"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">{children}</div>
      </div>
    </>
  );
}
