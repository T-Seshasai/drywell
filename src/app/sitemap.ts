import type { MetadataRoute } from "next";
import { categories, products, getProductPath, getCategoryPath } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/config/business";
import { blogPosts } from "@/data/blog";
import { locations } from "@/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/products"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/quote"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/privacy-policy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms-and-conditions"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/shipping-policy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/return-policy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryPages = categories.map((c) => ({
    url: absoluteUrl(getCategoryPath(c)),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productPages = products.map((p) => ({
    url: absoluteUrl(getProductPath(p)),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const locationPages = locations.map((l) => ({
    url: absoluteUrl(`/locations/${l.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = blogPosts.map((b) => ({
    url: absoluteUrl(`/blog/${b.slug}`),
    lastModified: new Date(b.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...locationPages, ...blogPages];
}
