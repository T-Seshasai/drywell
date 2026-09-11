import { ProductImage as ProductImageType } from "@/types/catalog";

/** Cloth drying hanger product photos — public/images/products/cloth-drying-hangers/ */
export const clothHangerImagePaths = {
  main: "/images/products/cloth-drying-hangers/ceiling-cloth-hanger.jpg",
  category: "/images/products/cloth-drying-hangers/cloth-drying-hanger-category.jpg",
  sixRodsSet: "/images/products/cloth-drying-hangers/standard/standard-6rods-installed.jpg",
  ceiling: "/images/products/cloth-drying-hangers/ceiling-cloth-hanger.jpg",
  balcony: "/images/products/cloth-drying-hangers/balcony-cloth-hanger.jpg",
} as const;

const fallbackHanger =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80";
const fallbackBalcony =
  "https://images.unsplash.com/photo-1484154210962-3147e5e4a8e8?w=800&q=80";
const fallbackHome =
  "https://images.unsplash.com/photo-1560448204-e02f11c2d0e2?w=800&q=80";

export function localProductImage(
  localPath: string,
  alt: string,
  fallback: string = fallbackHanger
): ProductImageType {
  return { url: localPath, alt, fallback, watermark: true, watermarkPhone: true };
}

function clothHangerImageBase(
  url: string,
  alt: string,
  objectFit: "cover" | "contain" = "cover"
): ProductImageType {
  return {
    url,
    alt,
    fallback: fallbackHanger,
    watermark: true,
    watermarkPhone: true,
    objectFit,
  };
}

/** Standard quality cloth hanger kit photos — public/images/products/cloth-drying-hangers/standard/ */
export const standardClothHangerImagePaths = {
  installed6Rods: "/images/products/cloth-drying-hangers/standard/standard-6rods-installed.jpg",
  installed3Rods: "/images/products/cloth-drying-hangers/standard/standard-3rods-installed.jpg",
  balcony3Rods: "/images/products/cloth-drying-hangers/standard/standard-3rods-balcony.jpg",
  set3Rods: "/images/products/cloth-drying-hangers/standard/standard-3rods-set.jpg",
  kit: "/images/products/cloth-drying-hangers/standard/standard-kit.jpg",
  ropeSets: "/images/products/cloth-drying-hangers/standard/standard-rope-sets.jpg",
  pulleyBar: "/images/products/cloth-drying-hangers/standard/standard-pulley-bar.jpg",
  ropeCoils: "/images/products/cloth-drying-hangers/standard/standard-rope-coils.jpg",
} as const;

export function standardClothHangerImages(alt: string, rodCount: 3 | 6 = 6): ProductImageType[] {
  if (rodCount === 3) {
    return [
      clothHangerImageBase(
        standardClothHangerImagePaths.balcony3Rods,
        `${alt} — balcony installed view`,
        "contain"
      ),
      clothHangerImageBase(
        standardClothHangerImagePaths.set3Rods,
        `${alt} — 3 rod set`,
        "contain"
      ),
      clothHangerImageBase(standardClothHangerImagePaths.installed3Rods, alt),
      clothHangerImageBase(standardClothHangerImagePaths.pulleyBar, `${alt} — pulley bar`),
      clothHangerImageBase(standardClothHangerImagePaths.kit, `${alt} — kit`),
      clothHangerImageBase(standardClothHangerImagePaths.ropeSets, `${alt} — rope sets`),
      clothHangerImageBase(standardClothHangerImagePaths.ropeCoils, `${alt} — rope coils`),
    ];
  }

  const paths = [
    standardClothHangerImagePaths.installed6Rods,
    standardClothHangerImagePaths.kit,
    standardClothHangerImagePaths.pulleyBar,
    standardClothHangerImagePaths.ropeSets,
    standardClothHangerImagePaths.ropeCoils,
  ];

  return [...new Set(paths)].map((url, index) =>
    clothHangerImageBase(url, index === 0 ? alt : `${alt} — standard quality ${index + 1}`)
  );
}

/** Premium quality cloth hanger photos — public/images/products/cloth-drying-hangers/premium/ */
export const premiumClothHangerImagePaths = {
  installed3Rods: "/images/products/cloth-drying-hangers/premium/premium-3rods-installed.jpg",
  kit3Rods: "/images/products/cloth-drying-hangers/premium/premium-3rods-kit.jpg",
  installed3RodsAlt: "/images/products/cloth-drying-hangers/premium/premium-3rods-installed-2.jpg",
  brackets6Rods: "/images/products/cloth-drying-hangers/premium/premium-6rods-brackets.jpg",
  ceilingMounted: "/images/products/cloth-drying-hangers/premium/premium-ceiling-mounted.jpg",
  pulleyComparison: "/images/products/cloth-drying-hangers/premium/premium-pulley-comparison.jpg",
  completeSet: "/images/products/cloth-drying-hangers/premium/premium-complete-set.jpg",
} as const;

export function premiumClothHangerImages(
  alt: string,
  rodCount: 3 | 6,
  installedImage: (alt: string) => ProductImageType
): ProductImageType[] {
  if (rodCount === 3) {
    return [
      premiumClothHangerImagePaths.installed3Rods,
      premiumClothHangerImagePaths.kit3Rods,
      premiumClothHangerImagePaths.installed3RodsAlt,
    ].map((url, index) =>
      clothHangerImageBase(url, index === 0 ? alt : `${alt} — premium quality ${index + 1}`)
    );
  }

  return [
    clothHangerImageBase(clothHangerImagePaths.sixRodsSet, alt),
    clothHangerImageBase(
      premiumClothHangerImagePaths.brackets6Rods,
      `${alt} — premium brackets`
    ),
    clothHangerImageBase(
      premiumClothHangerImagePaths.ceilingMounted,
      `${alt} — ceiling mounted view`,
      "contain"
    ),
    clothHangerImageBase(
      premiumClothHangerImagePaths.pulleyComparison,
      `${alt} — big pulley wheels comparison`,
      "contain"
    ),
    clothHangerImageBase(
      premiumClothHangerImagePaths.completeSet,
      `${alt} — complete premium set`,
      "contain"
    ),
  ];
}

export function clothHangerImage(alt: string): ProductImageType {
  return clothHangerImageBase(clothHangerImagePaths.ceiling, alt);
}

export function ceilingClothHangerImage(alt: string): ProductImageType {
  return clothHangerImageBase(clothHangerImagePaths.ceiling, alt);
}

export function balconyClothHangerImage(alt: string): ProductImageType {
  return clothHangerImageBase(clothHangerImagePaths.balcony, alt);
}

/** Wall mounted cloth hanger product photos — public/images/products/wall-mounted-cloth-hangers/ */
export const wallMountedClothHangerImagePaths = {
  main: "/images/products/wall-mounted-cloth-hangers/wall-mounted-cloth-hanger.jpg",
  installed2: "/images/products/wall-mounted-cloth-hangers/wall-mounted-cloth-hanger-2.jpg",
  installed3: "/images/products/wall-mounted-cloth-hangers/wall-mounted-cloth-hanger-3.jpg",
} as const;

export function wallMountedClothHangerImages(alt: string): ProductImageType[] {
  return [
    clothHangerImageBase(wallMountedClothHangerImagePaths.main, alt),
    clothHangerImageBase(
      wallMountedClothHangerImagePaths.installed2,
      `${alt} — wall mounted installed view`,
      "contain"
    ),
    clothHangerImageBase(
      wallMountedClothHangerImagePaths.installed3,
      `${alt} — wall mounted balcony view`,
      "contain"
    ),
  ];
}

export function wallMountedClothHangerImage(alt: string): ProductImageType {
  return wallMountedClothHangerImages(alt)[0];
}

/** Shoe rack product photo — public/images/products/shoe-racks/ */
export const shoeRackImagePaths = {
  main: "/images/products/shoe-racks/shoe-rack.jpg",
} as const;

const fallbackShoeRack =
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80";

export function shoeRackImage(alt: string): ProductImageType {
  return {
    url: shoeRackImagePaths.main,
    alt,
    fallback: fallbackShoeRack,
    watermark: true,
    watermarkPhone: true,
  };
}

/** Mosquito door product photo — public/images/products/mosquito-doors/ */
export const mosquitoDoorImagePaths = {
  main: "/images/products/mosquito-doors/sliding-mosquito-door.jpg",
} as const;

const fallbackMosquitoDoor =
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80";

export function mosquitoDoorImage(alt: string): ProductImageType {
  return {
    url: mosquitoDoorImagePaths.main,
    alt,
    fallback: fallbackMosquitoDoor,
    watermark: true,
    watermarkPhone: true,
  };
}

/** Safety net product photo — public/images/products/safety-nets/ */
export const safetyNetImagePaths = {
  main: "/images/products/safety-nets/safety-net.jpg",
} as const;

const fallbackSafetyNet =
  "https://images.unsplash.com/photo-1484154210962-3147e5e4a8e8?w=800&q=80";

export function safetyNetImage(alt: string): ProductImageType {
  return {
    url: safetyNetImagePaths.main,
    alt,
    fallback: fallbackSafetyNet,
    watermark: true,
    watermarkPhone: true,
  };
}

/** Pigeon net product photo — public/images/products/pigeon-nets/ */
export const pigeonNetImagePaths = {
  main: "/images/products/pigeon-nets/pigeon-net.png",
} as const;

const fallbackPigeon =
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80";

/** Invisible grill product photo — public/images/products/invisible-grills/ */
export const invisibleGrillImagePaths = {
  main: "/images/products/invisible-grills/invisible-grill.png",
} as const;

const fallbackInvisibleGrill =
  "https://images.unsplash.com/photo-1560448204-e02f11c2d0e2?w=800&q=80";

export function invisibleGrillImage(alt: string): ProductImageType {
  return {
    url: invisibleGrillImagePaths.main,
    alt,
    fallback: fallbackInvisibleGrill,
    watermark: true,
    watermarkPhone: true,
  };
}

export function pigeonNetImage(alt: string): ProductImageType {
  return {
    url: pigeonNetImagePaths.main,
    alt,
    fallback: fallbackPigeon,
    watermark: true,
    watermarkPhone: true,
  };
}

export { fallbackHanger, fallbackBalcony, fallbackHome, fallbackPigeon, fallbackInvisibleGrill, fallbackShoeRack, fallbackSafetyNet, fallbackMosquitoDoor };
