import { BlogPost } from "@/types/catalog";

export const blogPosts: BlogPost[] = [
  {
    slug: "best-cloth-drying-hangers-for-apartments",
    title: "Best Cloth Drying Hangers for Apartments",
    excerpt: "How to choose the right cloth drying hanger when space is limited.",
    content:
      "Apartment balconies and utility areas need drying solutions that save space without blocking daily use. Ceiling and wall-mounted hangers are popular choices when floor space is limited. Pulley systems work well for higher ceilings, while foldable racks suit renters who cannot modify walls permanently. Always confirm mounting surface type and load requirements before installation.",
    publishedAt: "2026-01-15",
    relatedCategorySlugs: ["cloth-drying-hangers"],
    seo: {
      title: "Best Cloth Drying Hangers for Apartments | Drywell Hangers",
      description: "Guide to choosing cloth drying hangers for apartment living in Hyderabad.",
    },
  },
  {
    slug: "ceiling-vs-wall-mounted-cloth-hangers",
    title: "Ceiling vs Wall Mounted Cloth Hangers",
    excerpt: "Compare ceiling and wall mounted cloth drying options for Indian homes.",
    content:
      "Ceiling-mounted hangers maximise vertical space and are ideal for dedicated utility rooms. Wall-mounted hangers suit bedrooms and compact areas where ceiling mounting is not practical. Your choice depends on ceiling height, laundry volume, and whether the mounting surface is RCC, MS shed, or plaster wall.",
    publishedAt: "2026-02-01",
    relatedCategorySlugs: ["cloth-drying-hangers", "wall-mounted-cloth-hangers"],
    seo: {
      title: "Ceiling vs Wall Mounted Cloth Hangers | Drywell Hangers",
      description: "Compare ceiling and wall mounted cloth hanger options.",
    },
  },
  {
    slug: "how-to-choose-balcony-pigeon-net",
    title: "How to Choose a Balcony Pigeon Net",
    excerpt: "What to check before installing a pigeon net on your balcony.",
    content:
      "Balcony pigeon nets should use UV-stabilised mesh and secure framing that does not damage paintwork. Measure the full opening including corners and height. Transparent mesh keeps views clearer while still blocking birds. Professional installation ensures proper tension and durability.",
    publishedAt: "2026-02-10",
    relatedCategorySlugs: ["pigeon-nets", "safety-nets"],
    seo: {
      title: "How to Choose a Balcony Pigeon Net | Drywell Hangers",
      description: "Tips for selecting balcony pigeon nets in Hyderabad.",
    },
  },
  {
    slug: "invisible-grills-buying-guide",
    title: "Invisible Grills Buying Guide",
    excerpt: "Key points before installing invisible grills on balconies and windows.",
    content:
      "Invisible grills use stainless steel cables on aluminium tracks. Wire thickness and spacing affect safety and appearance. Site measurement is essential because pricing depends on opening size, number of panels, and installation surface. Ask about warranty on workmanship and maintenance guidance.",
    publishedAt: "2026-02-20",
    relatedCategorySlugs: ["invisible-grills"],
    seo: {
      title: "Invisible Grills Buying Guide | Drywell Hangers",
      description: "What to know before buying invisible grills in Hyderabad.",
    },
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((b) => b.slug === slug);
}
