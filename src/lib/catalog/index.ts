import { categories } from "@/data/categories";
import { products, getEffectivePrice, isPurchasable } from "@/data/products";
import { Product, Category } from "@/types/catalog";
import type { WarrantyTier } from "@/components/shop/WarrantyBadge";
import { absoluteUrl } from "@/lib/config/business";

export type { WarrantyTier };

export function getProductWarrantyTier(
  product: Pick<Product, "badge" | "qualityTier">
): WarrantyTier | null {
  if (product.badge === "Premium" || product.qualityTier === "premium") return "premium";
  if (product.badge === "Standard" || product.qualityTier === "standard") return "standard";
  return null;
}

export { categories, products, getEffectivePrice, isPurchasable };

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductBySlug(categorySlug: string, productSlug: string): Product | undefined {
  return products.find(
    (p) => p.categorySlug === categorySlug && p.slug === productSlug
  );
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getPopularProducts(limit = 12): Product[] {
  return products
    .filter(
      (p) => p.categorySlug === "cloth-drying-hangers" && p.qualityTier === "premium"
    )
    .slice(0, limit);
}

export function getOnlinePurchaseProducts(): Product[] {
  return products.filter(isPurchasable);
}

export function getRodSetVariants(product: Product): Product[] {
  if (product.rodCount == null) return [];

  const feetMatch = product.slug.match(/-(\d+)ft-/);
  if (!feetMatch) return [];
  const feet = Number(feetMatch[1]);

  return products
    .filter(
      (p) =>
        p.categorySlug === product.categorySlug &&
        p.qualityTier === product.qualityTier &&
        p.hangerType === product.hangerType &&
        p.rodCount != null &&
        p.slug.includes(`-${feet}ft-`)
    )
    .sort((a, b) => (a.rodCount ?? 0) - (b.rodCount ?? 0));
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const related = product.relatedProductSlugs
    ? products.filter((p) => product.relatedProductSlugs!.includes(p.slug))
    : products.filter(
        (p) => p.categorySlug === product.categorySlug && p.id !== product.id
      );
  return related.slice(0, limit);
}

export function getProductCount(categorySlug: string) {
  return products.filter((p) => p.categorySlug === categorySlug).length;
}

export function getProductPath(product: Product): string {
  return `/products/${product.categorySlug}/${product.slug}`;
}

export function getCategoryPath(category: Category | string) {
  const slug = typeof category === "string" ? category : category.slug;
  return `/products/${slug}`;
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.categorySlug.includes(q)
  );
}

export function formatPrice(amount: number, currency = "INR") {
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);

  if (currency === "INR") {
    return `Rs. ₹${formatted}/-`;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatProductPrice(product: Product): string | null {
  const price = getMerchantFeedPrice(product);
  if (!price) return null;
  const formatted = formatPrice(price);
  return product.priceUnit ? `${formatted} / ${product.priceUnit}` : formatted;
}

/** Legacy id lookup — supports old /products/[id] redirects */
export function getProductByLegacyId(id: string): Product | undefined {
  return products.find((p) => p.id === id || p.slug === id);
}

export function getAllProductPaths() {
  return products.map((p) => ({
    category: p.categorySlug,
    product: p.slug,
  }));
}

export function getMerchantEligibleProducts(): Product[] {
  return products.filter(
    (p) =>
      p.images.length > 0 &&
      (isPurchasable(p) || p.merchant?.includeInFeed === true)
  );
}

export function getMerchantFeedPrice(product: Product): number | null {
  const price = getEffectivePrice(product);
  if (price) return price;
  if (product.listingPrice) return product.listingPrice;
  return null;
}

export function productCanonical(product: Product) {
  return absoluteUrl(getProductPath(product));
}

export function categoryCanonical(category: Category) {
  return absoluteUrl(getCategoryPath(category));
}
