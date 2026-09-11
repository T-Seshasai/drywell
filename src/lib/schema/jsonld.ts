import { Product, Category } from "@/types/catalog";
import { business, absoluteUrl } from "@/lib/config/business";
import { getEffectivePrice, getProductPath, productCanonical } from "@/lib/catalog";

export function productJsonLd(product: Product) {
  const price = getEffectivePrice(product);
  const offers =
    product.productType === "online_purchase" && price
      ? {
          "@type": "Offer",
          priceCurrency: product.currency,
          price: price.toFixed(2),
          availability:
            product.availability === "in_stock"
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          url: productCanonical(product),
          itemCondition: "https://schema.org/NewCondition",
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.sku,
    image: product.images.map((i) => i.url),
    brand: product.brand
      ? { "@type": "Brand", name: product.brand }
      : { "@type": "Brand", name: business.name },
    ...(offers ? { offers } : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    url: business.website,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    areaServed: business.primaryCities.map((city) => ({
      "@type": "City",
      name: city,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function categoryBreadcrumbs(category: Category) {
  return breadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Products", url: absoluteUrl("/products") },
    { name: category.name, url: absoluteUrl(`/products/${category.slug}`) },
  ]);
}

export function productBreadcrumbs(product: Product, categoryName: string) {
  return breadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Products", url: absoluteUrl("/products") },
    { name: categoryName, url: absoluteUrl(`/products/${product.categorySlug}`) },
    { name: product.name, url: absoluteUrl(getProductPath(product)) },
  ]);
}
