export type ProductType = "online_purchase" | "quote_required";

export type StockStatus =
  | "in_stock"
  | "out_of_stock"
  | "preorder"
  | "quote_only";

export type OrderPaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface ProductImage {
  url: string;
  alt: string;
  fallback?: string;
  watermark?: boolean;
  watermarkPhone?: boolean;
  objectFit?: "cover" | "contain";
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  price?: number;
  salePrice?: number;
  availability: StockStatus;
  attributes: Record<string, string>;
  image?: string;
}

export interface ProductShipping {
  available: boolean;
  regions?: string[];
  cost?: number;
  freeShippingThreshold?: number;
  estimatedDelivery?: string;
}

export interface ProductSEO {
  title: string;
  description: string;
  canonicalPath?: string;
}

export interface ProductMerchant {
  googleProductCategory?: string;
  identifierExists?: boolean;
  gtin?: string;
  mpn?: string;
  /** Include in Google Shopping XML feed (even if quote-only) */
  includeInFeed?: boolean;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  introduction: string;
  image?: string;
  color: string;
  buyingGuide?: string;
  faq?: ProductFAQ[];
  seo: ProductSEO;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  brand?: string;
  categorySlug: string;
  subcategory?: string;
  qualityTier?: "standard" | "premium";
  hangerType?: "cloth" | "balcony" | "roof" | "ceiling" | "wall" | "outdoor";
  rodCount?: 3 | 6;
  /** Starting/list price for Google Shopping feed when product is quote-only */
  listingPrice?: number;
  productType: ProductType;
  shortDescription: string;
  description: string;
  features: string[];
  benefits: string[];
  specifications: Record<string, string>;
  materials?: string[];
  dimensions?: string;
  weight?: string;
  images: ProductImage[];
  price?: number;
  salePrice?: number;
  /** Unit label shown after price, e.g. "sq ft" */
  priceUnit?: string;
  currency: "INR";
  availability: StockStatus;
  condition: "new";
  warranty?: string;
  installation?: string;
  shipping?: ProductShipping;
  returns?: string;
  variants?: ProductVariant[];
  serviceAreas?: string[];
  faq?: ProductFAQ[];
  relatedProductSlugs?: string[];
  seo: ProductSEO;
  merchant?: ProductMerchant;
  featured?: boolean;
  badge?: string;
}

export interface CartLineItem {
  productId: string;
  sku: string;
  slug: string;
  name: string;
  categorySlug: string;
  price: number;
  quantity: number;
  image: string;
  productType: ProductType;
}

export interface OrderItem {
  productId: string;
  sku: string;
  name: string;
  categorySlug: string;
  price: number;
  quantity: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email?: string;
  flatNo: string;
  blockId: string;
  apartmentName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderAttribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  source?: string;
}

export interface Order {
  orderId: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  currency: "INR";
  paymentStatus: OrderPaymentStatus;
  orderStatus: OrderStatus;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
  attribution?: OrderAttribution;
}

export interface QuoteRequest {
  quoteId: string;
  name: string;
  phone: string;
  email?: string;
  productSlug?: string;
  productName?: string;
  categorySlug?: string;
  quantity?: number;
  location: string;
  requirement: string;
  preferredContact: "phone" | "whatsapp" | "email";
  createdAt: string;
  attribution?: OrderAttribution;
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  address: string;
  primaryCities: string[];
  serviceAreas: string[];
  stats: {
    customers: string;
    areas: string;
    products: string;
    siteVisit: string;
  };
  socialProfiles?: Record<string, string>;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  seo: ProductSEO;
  relatedCategorySlugs?: string[];
}

export interface LocationPage {
  slug: string;
  name: string;
  title: string;
  description: string;
  introduction: string;
  areas: string[];
  seo: ProductSEO;
}
