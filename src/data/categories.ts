import { Category } from "@/types/catalog";
import { clothHangerImagePaths, invisibleGrillImagePaths, mosquitoDoorImagePaths, pigeonNetImagePaths, safetyNetImagePaths, shoeRackImagePaths, wallMountedClothHangerImagePaths } from "@/lib/product-images";

export const categories: Category[] = [
  {
    id: "cloth-drying-hangers",
    slug: "cloth-drying-hangers",
    name: "Cloth Drying Hangers",
    shortDescription: "Standard & premium ceiling cloth drying hangers (4–8 ft, 6 rods)",
    description: "Ceiling cloth drying hanger solutions in standard and premium quality across multiple lengths.",
    introduction:
      "Choose from Cloth Drying Hanger, Balcony Cloth Dry Hangers, Roof Cloth Dry Hangers, or Ceiling Cloth Dry Hangers — each in Standard or Premium quality, 3 rods or 6 rods sets, from 4 feet to 8 feet.",
    color: "from-teal-600 to-emerald-700",
    image: clothHangerImagePaths.category,
    seo: {
      title: "Cloth Drying Hangers in Hyderabad | Drywell Hangers",
      description: "Ceiling, balcony and pulley cloth drying hangers with installation across Hyderabad and Secunderabad.",
    },
  },
  {
    id: "wall-mounted-cloth-hangers",
    slug: "wall-mounted-cloth-hangers",
    name: "Wall Mounted Cloth Dry Hangers",
    shortDescription: "Standard & premium wall mounted cloth dry hangers (4–8 ft, 6 rods)",
    description: "Wall mounted cloth dry hanger solutions in standard and premium quality across multiple lengths.",
    introduction:
      "Choose Wall Mounted Cloth Dry Hangers or Outdoor Wall Mounted Cloth Dry Hangers — each in Standard or Premium quality, 6 rods set only, from 4 feet to 8 feet.",
    color: "from-sky-600 to-blue-700",
    image: wallMountedClothHangerImagePaths.main,
    seo: {
      title: "Wall Mounted Cloth Dry Hangers in Hyderabad | Drywell Hangers",
      description: "Wall mounted cloth dry hangers with free quote and installation across Hyderabad and Secunderabad.",
    },
  },
  {
    id: "invisible-grills",
    slug: "invisible-grills",
    name: "Invisible Grills",
    shortDescription: "SS316 invisible grill systems for balconies and windows",
    description: "Safety-focused invisible grill installations with site measurement and custom quotation.",
    introduction:
      "Invisible grills use stainless steel cables on aluminium tracks to provide balcony and window safety without blocking views. Pricing depends on measurements and wire configuration.",
    color: "from-slate-600 to-gray-800",
    image: invisibleGrillImagePaths.main,
    seo: {
      title: "Invisible Grills in Hyderabad | Drywell Hangers",
      description: "SS316 invisible grill supply and installation for balconies, windows and staircases in Hyderabad.",
    },
  },
  {
    id: "safety-nets",
    slug: "safety-nets",
    name: "Safety Nets",
    shortDescription: "Balcony and terrace safety net solutions",
    description: "Custom safety net installations for balconies, terraces and open areas.",
    introduction: "Safety nets help protect open spaces. Final specifications and pricing are confirmed after a site visit.",
    color: "from-blue-600 to-indigo-700",
    image: safetyNetImagePaths.main,
    seo: {
      title: "Safety Nets in Hyderabad | Drywell Hangers",
      description: "Balcony and terrace safety net installation across Hyderabad and Secunderabad.",
    },
  },
  {
    id: "pigeon-nets",
    slug: "pigeon-nets",
    name: "Pigeon Nets",
    shortDescription: "Bird control nets for balconies, ducts and terraces",
    description: "Pigeon and bird netting solutions for residential and commercial properties.",
    introduction: "We install UV-stabilised bird nets with frame support. Quotes are based on area measurements and access requirements.",
    color: "from-cyan-600 to-teal-700",
    image: pigeonNetImagePaths.main,
    seo: {
      title: "Pigeon Nets in Hyderabad | Drywell Hangers",
      description: "Pigeon net and bird netting installation for balconies, terraces and AC ducts in Hyderabad.",
    },
  },
  {
    id: "mosquito-doors",
    slug: "mosquito-doors",
    name: "Mosquito Doors",
    shortDescription: "Mosquito mesh doors and window screens",
    description: "Sliding, openable and fixed mosquito mesh solutions for doors and windows.",
    introduction: "Mosquito doors are custom-fitted to your opening size. Request a quote after measurement for accurate pricing.",
    color: "from-green-600 to-emerald-700",
    image: mosquitoDoorImagePaths.main,
    seo: {
      title: "Mosquito Doors & Mesh in Hyderabad | Drywell Hangers",
      description: "Window and balcony mosquito mesh doors with custom fitting across Hyderabad.",
    },
  },
  {
    id: "shoe-racks",
    slug: "shoe-racks",
    name: "Shoe Racks",
    shortDescription: "Wall-mounted shoe cabinets with 2 to 5 doors",
    description: "Shoe rack cabinets with flip-down doors for organised entryway storage.",
    introduction:
      "Select shoe rack cabinets by door count — from 2 doors (6 pairs) up to 5 doors (15 pairs). Buy online with installation across Hyderabad & Secunderabad.",
    color: "from-amber-500 to-orange-600",
    image: shoeRackImagePaths.main,
    buyingGuide: "Measure available wall width and estimate pairs per tier before ordering.",
    seo: {
      title: "Shoe Racks in Hyderabad | Drywell Hangers",
      description: "Wall-mounted shoe racks with online purchase and installation options in Hyderabad.",
    },
  },
];
