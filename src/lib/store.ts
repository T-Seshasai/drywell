export { business as store } from "@/lib/config/business";
export {
  categories,
  products,
  getCategory,
  getProductsByCategory,
  getFeaturedProducts,
  formatPrice,
  getProductPath,
  getCategoryPath,
  isPurchasable,
  getEffectivePrice,
} from "@/lib/catalog";
import { categories, products } from "@/lib/catalog";

export function getProductCount(categorySlug: string) {
  return products.filter((p) => p.categorySlug === categorySlug).length;
}

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id || c.slug === id);
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id || p.slug === id);
}

export {
  faqs,
  testimonials,
  whyChoose,
  processSteps,
  serviceAreas,
  gallery,
  promoBanner,
} from "@/data/home-content";
