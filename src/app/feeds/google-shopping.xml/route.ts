import { getMerchantEligibleProducts, productCanonical, getMerchantFeedPrice } from "@/lib/catalog";
import { Product } from "@/types/catalog";
import { absoluteUrl, business } from "@/lib/config/business";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function feedImageUrl(url: string) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return absoluteUrl(url);
}

function feedTitle(product: Product, price: number) {
  if (product.priceUnit === "sq ft") {
    return `${product.name} — ₹${price}/sq ft (Free Site Measurement)`;
  }
  return product.name;
}

function feedAvailability(product: Product) {
  if (product.availability === "out_of_stock") return "out of stock";
  if (product.availability === "preorder") return "preorder";
  return "in stock";
}

function unitPricingXml(product: Product) {
  if (product.priceUnit !== "sq ft") return "";

  return `<g:unit_pricing_measure>1 sqft</g:unit_pricing_measure>
  <g:unit_pricing_base_measure>1 sqft</g:unit_pricing_base_measure>`;
}

function customLabelsXml(product: Product) {
  const labels: string[] = [];
  if (product.productType === "quote_required") labels.push("quote_on_measurement");
  if (product.priceUnit === "sq ft") labels.push("per_sqft_pricing");

  return labels
    .slice(0, 5)
    .map((label, index) => `<g:custom_label_${index}>${escapeXml(label)}</g:custom_label_${index}>`)
    .join("\n  ");
}

export async function GET() {
  const items = getMerchantEligibleProducts();

  const xmlItems = items
    .map((product) => {
      const price = getMerchantFeedPrice(product);
      if (!price || !product.images[0]?.url) return "";

      const imageLink = feedImageUrl(product.images[0].url);
      const additionalImages = product.images
        .slice(1, 5)
        .map((img) => `<g:additional_image_link>${escapeXml(feedImageUrl(img.url))}</g:additional_image_link>`)
        .join("");

      const customLabels = customLabelsXml(product);

      return `<item>
  <g:id>${escapeXml(product.id)}</g:id>
  <g:title>${escapeXml(feedTitle(product, price))}</g:title>
  <g:description>${escapeXml(product.shortDescription)}</g:description>
  <g:link>${escapeXml(productCanonical(product))}</g:link>
  <g:image_link>${escapeXml(imageLink)}</g:image_link>
  ${additionalImages}
  <g:availability>${feedAvailability(product)}</g:availability>
  <g:price>${price.toFixed(2)} INR</g:price>
  ${unitPricingXml(product)}
  ${product.salePrice ? `<g:sale_price>${product.salePrice.toFixed(2)} INR</g:sale_price>` : ""}
  <g:brand>${escapeXml(product.brand ?? business.name)}</g:brand>
  <g:condition>new</g:condition>
  <g:identifier_exists>${product.merchant?.identifierExists === false ? "false" : "true"}</g:identifier_exists>
  ${product.merchant?.googleProductCategory ? `<g:google_product_category>${escapeXml(product.merchant.googleProductCategory)}</g:google_product_category>` : ""}
  <g:product_type>${escapeXml(product.categorySlug.replace(/-/g, " "))}</g:product_type>
  ${customLabels}
</item>`;
    })
    .filter(Boolean)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(business.name)} Product Feed</title>
    <link>${escapeXml(business.website.replace(/\/$/, ""))}</link>
    <description>${escapeXml(business.description)}</description>
    ${xmlItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
