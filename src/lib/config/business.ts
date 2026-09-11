import { BusinessConfig } from "@/types/catalog";

export const business: BusinessConfig & {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string;
  promoBanner: string;
  upiId: string;
} = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Drywell Hangers",
  tagline: "Dry Well Cloth Hangers & Home Solutions",
  description:
    "Hyderabad-based supplier and installer of cloth drying hangers, invisible grills, safety nets, shoe racks, and home utility solutions.",
  heroBadge: "Hyderabad's & Secunderabad Trusted Home Solutions",
  heroTitle: "Dry Well Cloth Hangers & Home Solutions",
  heroSubtitle:
    "Professional installation of ceiling cloth hangers, shoe racks, balcony drying racks, and home utility fittings — clear pricing and warranty on workmanship.",
  aboutTitle: "About Drywell Hangers",
  aboutText:
    "Drywell Hangers is a Hyderabad-based home solutions brand focused on cloth drying systems and everyday storage fittings. From ceiling hangers and pulley setups to shoe racks and balcony drying racks, we help apartments and independent homes make better use of space.",
  promoBanner:
    "Same-week installation across Hyderabad & Secunderabad | 1-5 years warranty on selected products",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+918125993888",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918125993888",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "info@drywellhangers.in",
  website: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  address: "Hyderabad, Telangana, India",
  upiId: process.env.UPI_ID ?? "drywellhangers@ybl",
  primaryCities: ["Hyderabad", "Secunderabad"],
  serviceAreas: [
    "Miyapur", "Kukatpally", "Gachibowli", "Madhapur", "Hitech City", "Kondapur",
    "Manikonda", "Narsingi", "Attapur", "LB Nagar", "Uppal", "Secunderabad",
    "Banjara Hills", "Jubilee Hills", "Miyapur", "Nizampet", "Bachupally", "Kokapet",
    "Dilsukhnagar", "Mehdipatnam", "Tolichowki", "Ameerpet", "Begumpet", "ECIL",
  ],
  stats: {
    customers: "12800+",
    areas: "Hyderabad & Secunderabad",
    products: "8+",
    siteVisit: "Free",
  },
};

export const siteUrl = business.website.replace(/\/$/, "");

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
