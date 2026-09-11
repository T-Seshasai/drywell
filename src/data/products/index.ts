import { Product } from "@/types/catalog";
import { balconyClothHangerImage, ceilingClothHangerImage, invisibleGrillImage, mosquitoDoorImage, pigeonNetImage, premiumClothHangerImages, safetyNetImage, shoeRackImage, standardClothHangerImages, wallMountedClothHangerImage, wallMountedClothHangerImages } from "@/lib/product-images";

const stockImg = (url: string, alt: string) => ({ url, alt });

function p(
  partial: Omit<Product, "currency" | "condition"> & {
    currency?: "INR";
    condition?: "new";
  }
): Product {
  return {
    currency: "INR",
    condition: "new",
    ...partial,
  };
}

const HANGER_FEET = [4, 5, 6, 7, 8] as const;
const ROD_COUNTS = [3, 6] as const;

/** Ceiling cloth drying hanger prices by quality, rod count, and length (INR) */
const CLOTH_HANGER_PRICES = {
  standard: {
    3: { 4: 1400, 5: 1500, 6: 1600, 7: 1700, 8: 1800 },
    6: { 4: 2500, 5: 2600, 6: 2700, 7: 2800, 8: 2900 },
  },
  premium: {
    3: { 4: 1600, 5: 1700, 6: 1800, 7: 1900, 8: 2000 },
    6: { 4: 3100, 5: 3200, 6: 3300, 7: 3400, 8: 3500 },
  },
} as const;

/** Wall mounted cloth dry hanger prices — 6 rods only (INR) */
const WALL_MOUNTED_HANGER_PRICES = {
  standard: { 4: 3300, 5: 3400, 6: 3500, 7: 3600, 8: 3700 },
  premium: { 4: 3800, 5: 3900, 6: 4000, 7: 4100, 8: 4200 },
} as const;

function clothHangerPrice(
  qualityTier: "standard" | "premium",
  feet: (typeof HANGER_FEET)[number],
  rods: 3 | 6,
  categorySlug: "cloth-drying-hangers" | "wall-mounted-cloth-hangers" = "cloth-drying-hangers"
): number {
  if (categorySlug === "wall-mounted-cloth-hangers") {
    return WALL_MOUNTED_HANGER_PRICES[qualityTier][feet];
  }

  return CLOTH_HANGER_PRICES[qualityTier][rods][feet];
}

function clothHangerFeatures(
  qualityTier: "standard" | "premium",
  feet: (typeof HANGER_FEET)[number],
  rods: 3 | 6,
  categorySlug: "cloth-drying-hangers" | "wall-mounted-cloth-hangers"
): string[] {
  if (qualityTier === "standard" && rods === 3 && categorySlug === "cloth-drying-hangers") {
    return [
      `${feet} feet length`,
      "Jindal Stainless Steel 3 drying rods(12mm)",
      "Strong UPVC Brackets",
      "3mm Nylon Rope",
    ];
  }

  if (qualityTier === "standard" && rods === 6 && categorySlug === "cloth-drying-hangers") {
    return [
      `${feet} feet length`,
      "Jindal Stainless Steel 6 drying rods(12mm)",
      "Strong UPVC Brackets",
      "3mm Nylon Rope",
    ];
  }

  if (qualityTier === "premium" && rods === 6 && categorySlug === "cloth-drying-hangers") {
    return [
      `${feet} feet length`,
      "Jindal Stainless Steel 6 drying rods(16mm)",
      "Metal Brackets 4mm Pulletys",
      "4mm Nylon Rope",
    ];
  }

  if (qualityTier === "standard" && categorySlug === "wall-mounted-cloth-hangers") {
    return [
      `${feet} feet length rods`,
      "2 feet width",
      "6 drying rods in each sets",
      "Powder-Coated Finish Metal Brackets",
      "Jindal Stainless Steel Rods (12mm)",
      "Up to 28kg hold the weight",
    ];
  }

  if (qualityTier === "premium" && categorySlug === "wall-mounted-cloth-hangers") {
    return [
      `${feet} feet length rods`,
      "2 feet width",
      "6 drying rods in each set",
      "Powder-Coated Finish Metal Brackets",
      "Jindal Stainless Steel Rods (16mm)",
      "Up to 48kg hold the weight",
    ];
  }

  return [
    `${feet} feet length`,
    `${rods} drying rods`,
    qualityTier === "premium" ? "Premium SS rods & hardware" : "Standard powder-coated finish",
  ];
}

function clothHangerBenefits(
  categorySlug: "cloth-drying-hangers" | "wall-mounted-cloth-hangers"
): string[] {
  if (categorySlug === "cloth-drying-hangers") {
    return [
      "Same Day Free Installation",
      "Space-saving laundry drying Hangers",
      "Easy and Daily use design",
      "Free Delivery and Professional installation",
    ];
  }

  return [
    "Same Day Installation and Delivery",
    "Space-saving laundry drying Hangers",
    "Easy and Daily use design",
    "Free Installation and Professional installation",
  ];
}

function sizedClothHangerProducts(config: {
  categorySlug: "cloth-drying-hangers" | "wall-mounted-cloth-hangers";
  idPrefix: string;
  slugPrefix: string;
  mountLabel: string;
  image: (alt: string) => Product["images"][0];
  nameFormat?: string;
  hangerType?: "cloth" | "balcony" | "roof" | "ceiling" | "wall" | "outdoor";
  rodCounts?: readonly (3 | 6)[];
  merchantFeed?: boolean;
  quoteOnly?: boolean;
}): Product[] {
  const rodCounts = config.rodCounts ?? [6];
  const quoteOnly = config.quoteOnly ?? false;

  return (["standard", "premium"] as const).flatMap((qualityTier) =>
    HANGER_FEET.flatMap((feet) =>
      rodCounts.map((rods) => {
      const qualityLabel = qualityTier === "standard" ? "Standard Quality" : "Premium Quality";
      const slug = `${config.slugPrefix}-${qualityTier}-${feet}ft-${rods}rods`;
      const rodSetLabel = `${rods} Rods Set`;
      const name = config.nameFormat
        ? `${config.nameFormat} ${feet} Feet ${rodSetLabel}`
        : `${qualityLabel} ${feet} Feet ${rodSetLabel}`;
      const unitPrice = quoteOnly
        ? undefined
        : clothHangerPrice(qualityTier, feet, rods, config.categorySlug);

      return p({
        id: `${config.idPrefix}-${qualityTier}-${feet}ft-${rods}rod`,
        sku: `${config.idPrefix}-${qualityTier.slice(0, 3).toUpperCase()}-${feet}F${rods}R`.slice(0, 20),
        slug,
        name,
        categorySlug: config.categorySlug,
        qualityTier,
        hangerType: config.hangerType,
        rodCount: rods,
        price: unitPrice,
        listingPrice: config.merchantFeed && unitPrice ? unitPrice : undefined,
        subcategory: qualityLabel,
        productType: quoteOnly ? "quote_required" : "online_purchase",
        shortDescription: config.nameFormat
          ? `${name} — ${qualityLabel.toLowerCase()}. Same-day installation available.`
          : `${name} ${config.mountLabel.toLowerCase()} cloth drying hanger.`,
        description: config.nameFormat
          ? `${name} (${qualityLabel.toLowerCase()}). ${config.mountLabel} cloth drying hanger with ${feet} feet length and ${rods} rods. Professional installation available across Hyderabad & Secunderabad.`
          : `${qualityLabel} ${config.mountLabel.toLowerCase()} cloth drying hanger with ${feet} feet length and ${rods} rods. Professional installation available across Hyderabad & Secunderabad.`,
        features: clothHangerFeatures(qualityTier, feet, rods, config.categorySlug),
        benefits: clothHangerBenefits(config.categorySlug),
        specifications: {
          Quality: qualityLabel,
          Length: `${feet} feet`,
          Rods: `${rods}`,
          "Rod Set": rodSetLabel,
          "Mount Type": config.mountLabel,
        },
        images:
          config.categorySlug === "wall-mounted-cloth-hangers"
            ? wallMountedClothHangerImages(name)
            : qualityTier === "standard"
              ? standardClothHangerImages(name, rods)
              : premiumClothHangerImages(name, rods, config.image),
        availability: quoteOnly ? "quote_only" : "in_stock",
        installation: "Installation available across Hyderabad & Secunderabad.",
        seo: {
          title: `${name} | Drywell Hangers`,
          description: `${name} ${config.mountLabel.toLowerCase()} cloth drying hanger in Hyderabad.`,
        },
        merchant:
          config.merchantFeed && !quoteOnly
            ? {
                googleProductCategory: "Home & Garden > Household Supplies > Laundry Supplies > Clotheslines",
                identifierExists: false,
                includeInFeed: true,
              }
            : undefined,
        featured: qualityTier === "premium" && feet === 6 && rods === 6,
        badge: qualityTier === "premium" ? "Premium" : "Standard",
      });
    })
    )
  );
}

const homeImg = "https://images.unsplash.com/photo-1560448204-e02f11c2d0e2?w=800&q=80";
const balconyImg = "https://images.unsplash.com/photo-1484154210962-3147e5e4a8e8?w=800&q=80";
const shoeImg = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80";

const CLOTH_HANGER_TYPES = [
  {
    hangerType: "cloth" as const,
    idPrefix: "cdh",
    slugPrefix: "cloth-drying-hanger",
    mountLabel: "Cloth Drying",
    nameFormat: "Cloth Drying Hanger",
    image: ceilingClothHangerImage,
  },
  {
    hangerType: "balcony" as const,
    idPrefix: "cdh-balcony",
    slugPrefix: "balcony-cloth-drying-hanger",
    mountLabel: "Balcony",
    nameFormat: "Balcony Cloth Dry Hangers",
    image: balconyClothHangerImage,
  },
  {
    hangerType: "roof" as const,
    idPrefix: "cdh-roof",
    slugPrefix: "roof-cloth-drying-hanger",
    mountLabel: "Roof",
    nameFormat: "Roof Cloth Dry Hangers",
    image: ceilingClothHangerImage,
  },
  {
    hangerType: "ceiling" as const,
    idPrefix: "cdh-ceiling",
    slugPrefix: "ceiling-cloth-drying-hanger",
    mountLabel: "Ceiling",
    nameFormat: "Ceiling Cloth Dry Hangers",
    image: ceilingClothHangerImage,
  },
];

const WALL_MOUNTED_HANGER_TYPES = [
  {
    hangerType: "wall" as const,
    idPrefix: "wmcdh",
    slugPrefix: "wall-mounted-cloth-hanger",
    mountLabel: "Wall Mounted",
    nameFormat: "Wall Mounted Cloth Dry Hangers",
    image: wallMountedClothHangerImage,
  },
  {
    hangerType: "outdoor" as const,
    idPrefix: "wmcdh-outdoor",
    slugPrefix: "outdoor-wall-mounted-cloth-hanger",
    mountLabel: "Outdoor Wall Mounted",
    nameFormat: "Outdoor Wall Mounted Cloth Dry Hangers",
    image: wallMountedClothHangerImage,
  },
];

export const products: Product[] = [
  // Cloth Drying Hangers — cloth, balcony, roof & ceiling (3 & 6 rods sets)
  ...CLOTH_HANGER_TYPES.flatMap((typeConfig) =>
    sizedClothHangerProducts({
      categorySlug: "cloth-drying-hangers",
      idPrefix: typeConfig.idPrefix,
      slugPrefix: typeConfig.slugPrefix,
      mountLabel: typeConfig.mountLabel,
      image: typeConfig.image,
      nameFormat: typeConfig.nameFormat,
      hangerType: typeConfig.hangerType,
      rodCounts: ROD_COUNTS,
      merchantFeed: true,
    })
  ),

  // Wall Mounted Cloth Dry Hangers — indoor & outdoor (6 rods only)
  ...WALL_MOUNTED_HANGER_TYPES.flatMap((typeConfig) =>
    sizedClothHangerProducts({
      categorySlug: "wall-mounted-cloth-hangers",
      idPrefix: typeConfig.idPrefix,
      slugPrefix: typeConfig.slugPrefix,
      mountLabel: typeConfig.mountLabel,
      image: typeConfig.image,
      nameFormat: typeConfig.nameFormat,
      hangerType: typeConfig.hangerType,
      rodCounts: [6],
      merchantFeed: true,
    })
  ),

  // Invisible Grills — rate per square foot (site measurement for final quote)
  ...(["2mm", "2.5mm", "3mm"] as const).map((thickness) => {
    const rate = ({ "2mm": 135, "2.5mm": 145, "3mm": 155 } as const)[thickness];

    return p({
      id: `ig-ss316-${thickness.replace(".", "")}`,
      sku: `IG-SS316-${thickness.replace(".", "")}`,
      slug: `ss316-${thickness}-invisible-grill`,
      name: `SS316 ${thickness} Invisible Grill`,
      categorySlug: "invisible-grills",
      productType: "quote_required",
      price: rate,
      listingPrice: rate,
      priceUnit: "sq ft",
      shortDescription: `SS316 ${thickness} invisible grill at ₹${rate}/sq ft for balconies and windows.`,
      description: `Invisible grill using SS316 ${thickness} wire on aluminium track. Rate: ₹${rate} per square foot. Final pricing depends on measurements, wire spacing, and installation surface.`,
      features: [`SS316 ${thickness} wire`, "Aluminium track", "Custom frame fabrication"],
      benefits: ["Safety without blocking view", "Weather-resistant", "Child-safe spacing options"],
      specifications: {
        Wire: thickness,
        Track: "Aluminium",
        Spacing: "2–3 inch options",
        Rate: `₹${rate} per sq ft`,
      },
      images: [invisibleGrillImage(`SS316 ${thickness} invisible grill`)],
      availability: "quote_only",
      installation: "Site measurement required before quotation.",
      seo: {
        title: `SS316 ${thickness} Invisible Grill | Drywell Hangers`,
        description: `SS316 ${thickness} invisible grill at ₹${rate}/sq ft in Hyderabad.`,
      },
      merchant: {
        googleProductCategory: "Hardware > Building Materials > Wire Fencing & Gates",
        identifierExists: false,
        includeInFeed: true,
      },
    });
  }),

  // Safety Nets
  ...[
    ["balcony-safety-net", "Balcony Safety Net"],
    ["pigeon-safety-net", "Pigeon Safety Net"],
    ["apartment-pigeon-net", "Apartment Pigeon Net"],
    ["villa-pigeon-net", "Villa Pigeon Net"],
    ["commercial-pigeon-net", "Commercial Pigeon Net"],
  ].map(([slug, name]) => {
    const isPigeonNet = slug.includes("pigeon");
    const rate = isPigeonNet ? 26 : undefined;

    return p({
      id: slug,
      sku: slug.toUpperCase().replace(/-/g, "-").slice(0, 20),
      slug,
      name,
      categorySlug: isPigeonNet ? "pigeon-nets" : "safety-nets",
      productType: "quote_required",
      price: rate,
      listingPrice: rate,
      priceUnit: isPigeonNet ? "sq ft" : undefined,
      shortDescription: isPigeonNet
        ? `${name} at ₹${rate}/sq ft with custom measurement and installation.`
        : `${name} with custom measurement and installation.`,
      description: isPigeonNet
        ? `${name} supplied and installed after site assessment. Rate: ₹${rate} per square foot. Final pricing depends on area, height, and access requirements.`
        : `${name} supplied and installed after site assessment. Pricing is based on area, height, and access requirements.`,
      features: ["UV-stabilised mesh options", "Frame-supported installation", "Custom sizing"],
      benefits: ["Protects open spaces", "Durable outdoor use", "Neat finish"],
      specifications: isPigeonNet
        ? { Sizing: "Custom", Installation: "On-site", Rate: `₹${rate} per sq ft` }
        : { Sizing: "Custom", Installation: "On-site" },
      images: [isPigeonNet ? pigeonNetImage(name) : safetyNetImage(name)],
      availability: "quote_only",
      seo: {
        title: `${name} | Drywell Hangers`,
        description: isPigeonNet
          ? `${name} at ₹${rate}/sq ft in Hyderabad.`
          : `${name} installation in Hyderabad.`,
      },
      merchant: isPigeonNet
        ? {
            googleProductCategory: "Home & Garden > Lawn & Garden > Gardening > Weed & Pest Control > Netting",
            identifierExists: false,
            includeInFeed: true,
          }
        : undefined,
    });
  }),

  // Mosquito products
  ...[
    ["window-mosquito-net", "Window Mosquito Net"],
    ["sliding-mosquito-door", "Sliding Mosquito Door"],
    ["balcony-mosquito-door", "Balcony Mosquito Door"],
    ["mosquito-door-for-windows", "Mosquito Door for Windows"],
  ].map(([slug, name]) =>
    p({
      id: slug,
      sku: `MOSQ-${slug.slice(0, 8).toUpperCase()}`,
      slug,
      name,
      categorySlug: "mosquito-doors",
      productType: "quote_required",
      shortDescription: `${name} custom-fitted to your opening.`,
      description: `${name} with mesh and frame options. Accurate pricing provided after measurement.`,
      features: ["Custom dimensions", "Mesh and frame options", "Smooth operation hardware"],
      benefits: ["Insect protection", "Maintains ventilation", "Neat finish"],
      specifications: { Fitting: "Custom", Measurement: "Required" },
      images: [mosquitoDoorImage(name)],
      availability: "quote_only",
      seo: { title: `${name} | Drywell Hangers`, description: `${name} in Hyderabad.` },
    })
  ),

  // Shoe Racks — fixed prices, online purchase
  ...[
    { slug: "shoe-rack-2-doors", name: "Shoe Rack With 2 Doors (6 Pairs)", doors: "2", pairs: "6", price: 4500 },
    { slug: "shoe-rack-3-doors", name: "Shoe Rack With 3 Doors (9 Pairs)", doors: "3", pairs: "9", price: 5000, featured: true },
    { slug: "shoe-rack-4-doors", name: "Shoe Rack With 4 Doors (12 Pairs)", doors: "4", pairs: "12", price: 5500 },
    { slug: "shoe-rack-5-doors", name: "Shoe Rack With 5 Doors (15 Pairs)", doors: "5", pairs: "15", price: 6000 },
  ].map(({ slug, name, doors, pairs, price, featured }) =>
    p({
      id: slug,
      sku: `SHOE-D${doors}`,
      slug,
      name,
      categorySlug: "shoe-racks",
      productType: "online_purchase",
      price,
      listingPrice: price,
      shortDescription: `${name} — wall-mounted shoe storage cabinet. Same-day installation available.`,
      description: `${name} with powder-coated steel body and flip-down door compartments. Price includes product; professional installation available across Hyderabad & Secunderabad.`,
      features: ["Wall-mount cabinet design", "Flip-down doors", "Powder coat finish"],
      benefits: ["Organised shoe storage", "Space-saving entryway", "Neat closed look"],
      specifications: { Doors: doors, Capacity: `${pairs} pairs`, Finish: "Powder coat" },
      images: [shoeRackImage(name)],
      availability: "in_stock",
      installation: "Installation available across Hyderabad & Secunderabad.",
      seo: { title: `${name} | Drywell Hangers`, description: `${name} in Hyderabad.` },
      merchant: {
        googleProductCategory: "Home & Garden > Household Storage > Clothing & Closet Storage > Shoe Racks & Organizers",
        identifierExists: false,
        includeInFeed: true,
      },
      featured,
    })
  ),
];

export function isPurchasable(product: Product): boolean {
  return (
    product.productType === "online_purchase" &&
    product.availability === "in_stock" &&
    typeof product.price === "number" &&
    product.price > 0
  );
}

export function getEffectivePrice(product: Product, variantId?: string): number | null {
  if (variantId && product.variants) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant?.salePrice) return variant.salePrice;
    if (variant?.price) return variant.price;
  }
  if (product.salePrice) return product.salePrice;
  if (product.price) return product.price;
  return null;
}
