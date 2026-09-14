import { business } from "@/lib/config/business";
import { clothHangerImagePaths } from "@/lib/product-images";

export const homeBanner = "/images/home/drywell-home-banner.jpg";

export const topOffers = [
  "Same Day Installation",
  "Free installation Hyderabad & Secunderabad",
  "1-5 Years warranty on products",
  "Call Now 081259 93888",
];

export const homeOffers = [
  { title: "Premium Products", subtitle: "High quality materials & professional finish", code: "PREMIUM" },
  { title: "24/7 Support", subtitle: "Call or WhatsApp us anytime", code: "SUPPORT247" },
  { title: "1-5 Years Warranty", subtitle: "Warranty coverage varies by product", code: "WARRANTY1-5" },
];

export const categoryNavItems = [
  { label: "Cloth Hangers", href: "/products/cloth-drying-hangers" },
  { label: "Wall Mounted Dry Hangers", href: "/products/wall-mounted-cloth-hangers" },
  { label: "Invisible Grills", href: "/products/invisible-grills" },
  { label: "Safety Nets", href: "/products/safety-nets" },
  { label: "Shoe Racks", href: "/products/shoe-racks" },
  { label: "Mosquito Mesh", href: "/products/mosquito-doors-mesh" },
  { label: "Get Quote", href: "/quote" },
];

export const promoBanner =
  "Same-Day Installation across Hyderabad & Secunderabad | 1-5 years warranty on selected products";

export const whyChoose = [
  { title: "Skilled Installation", description: "Technicians trained for RCC ceilings, walls, and balcony mounts." },
  { title: "Workmanship Warranty", description: "Warranty coverage on installation work where configured." },
  { title: "Upfront Pricing", description: "Quotes shared before work begins — no surprise add-ons." },
  { title: "Reliable Materials", description: "SS pipes, powder-coated frames, and rust-resistant components." },
  { title: "Quick Support", description: "Reach us by call or WhatsApp six days a week." },
  { title: "City-wide Service", description: "Serving Hyderabad and Secunderabad with scheduled visits." },
];

export const processSteps = [
  { step: "1", title: "Call or WhatsApp", description: "Share your area, product need, and preferred visit time." },
  { step: "2", title: "Site Measurement", description: "We measure the space and recommend the right solution." },
  { step: "3", title: "Confirm Quote", description: "You receive a clear price before installation is scheduled." },
  { step: "4", title: "Install & Review", description: "Work is completed neatly with professional finish." },
];

export const serviceAreas = business.serviceAreas;

export const testimonials = [
  { name: "Ananya Menon", area: "Miyapur", text: "Ceiling hanger installed quickly with a neat finish.", rating: 5 },
  { name: "Rahul Verma", area: "Kukatpally", text: "Quote matched the final bill exactly. Professional team.", rating: 5 },
  { name: "Deepa Iyer", area: "Manikonda", text: "Balcony rack fits perfectly and looks very clean.", rating: 5 },
  { name: "Imran Khan", area: "Attapur", text: "Good guidance on pulley hanger sizing for our utility area.", rating: 5 },
];

export const gallery = [
  { title: "Ceiling Hanger Setup", image: clothHangerImagePaths.ceiling },
  { title: "Balcony Pulley Hanger", image: clothHangerImagePaths.balcony },
  { title: "Utility Room Fitting", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80" },
  { title: "Balcony Organisation", image: "https://images.unsplash.com/photo-1484154210962-3147e5e4a8e8?w=800&q=80" },
  { title: "Entryway Storage", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80" },
];

export const faqs = [
  {
    q: "Which cloth hanger types do you offer?",
    a: "Ceiling mounted, Iron Shed, Wall Mounted, Pulley System, Balcony, Utility and Concrete Roof drying systems.",
  },
  { q: "How is pricing calculated?", a: "Depends on product type, size and mounting surface. Exact quote after measurement." },
  { q: "Do you install across Hyderabad?", a: "Yes, we serve Hyderabad and Secunderabad with professional installation." },
];

export const serviceHighlights = [
  { title: "Premium Quality", subtitle: "High grade SS & coated materials" },
  { title: "Same Day Free Installation", subtitle: "Hyderabad & Secunderabad" },
  { title: "1-5 Years Warranty", subtitle: "On selected installations" },
  { title: "Quick Support", subtitle: "Call / WhatsApp anytime" },
  { title: "9+ Years Experience", subtitle: "Trusted home solutions expert" },
  { title: "12800+ Happy Customers", subtitle: "Across Hyderabad & Secunderabad" },
];
