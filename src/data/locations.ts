import { LocationPage } from "@/types/catalog";

export const locations: LocationPage[] = [
  {
    slug: "hyderabad",
    name: "Hyderabad",
    title: "Home Solutions in Hyderabad",
    description: "Cloth hangers, invisible grills, nets and shoe racks across Hyderabad.",
    introduction:
      "Drywell Hangers supplies and installs home utility products across Hyderabad. From cloth drying hangers and shoe racks to safety nets and mosquito doors, we offer on-site measurement for custom-fit solutions.",
    areas: [
      "Gachibowli", "Madhapur", "Kondapur", "Hitech City", "Manikonda", "Attapur",
      "LB Nagar", "Uppal", "Mehdipatnam", "Tolichowki", "Ameerpet", "Kukatpally",
    ],
    seo: {
      title: "Home Solutions in Hyderabad | Drywell Hangers",
      description: "Cloth hangers, shoe racks, nets and mosquito doors with installation in Hyderabad.",
    },
  },
  {
    slug: "secunderabad",
    name: "Secunderabad",
    title: "Home Solutions in Secunderabad",
    description: "Installation services for hangers, racks and nets in Secunderabad.",
    introduction:
      "We serve Secunderabad with the same product range and installation support available in Hyderabad, including on-site measurement for custom-fit products.",
    areas: ["Secunderabad", "Begumpet", "ECIL", "Kapra", "Sainikpuri", "Alwal"],
    seo: {
      title: "Home Solutions in Secunderabad | Drywell Hangers",
      description: "Home utility products and installation in Secunderabad.",
    },
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}
