import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/config/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/order-success/", "/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
