import { notFound } from "next/navigation";
import Link from "next/link";
import {
  categories,
  getCategory,
  getProductBySlug,
  getRelatedProducts,
  getRodSetVariants,
  getAllProductPaths,
} from "@/lib/catalog";
import PageContent from "@/components/layout/PageContent";
import ProductHybridActions from "@/components/shop/ProductHybridActions";
import ProductCard from "@/components/shop/ProductCard";
import ProductImageGallery from "@/components/shop/ProductImageGallery";
import ClothHangerQualityComparison from "@/components/shop/ClothHangerQualityComparison";
import JsonLd from "@/components/shop/JsonLd";
import { productJsonLd, productBreadcrumbs, faqJsonLd } from "@/lib/schema/jsonld";
import { business } from "@/lib/config/business";
import ViewItemTracker from "@/components/analytics/ViewItemTracker";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ category: string; product: string }> };

export function generateStaticParams() {
  return getAllProductPaths();
}

export async function generateMetadata({ params }: Props) {
  const { category, product: productSlug } = await params;
  const item = getProductBySlug(category, productSlug);
  if (!item) return { title: "Not found" };
  return {
    title: item.seo.title,
    description: item.seo.description,
    alternates: { canonical: `/products/${category}/${productSlug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { category: categorySlug, product: productSlug } = await params;
  const product = getProductBySlug(categorySlug, productSlug);
  if (!product) notFound();

  const category = getCategory(categorySlug);
  const related = getRelatedProducts(product);
  const rodVariants = getRodSetVariants(product);

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <JsonLd data={productBreadcrumbs(product, category?.name ?? categorySlug)} />
      {product.faq?.length ? (
        <JsonLd data={faqJsonLd(product.faq.map((f) => ({ question: f.question, answer: f.answer })))} />
      ) : null}

      <ViewItemTracker product={product} />

      <PageContent variant="products">
        <Link
          href={`/products/${categorySlug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {category?.name ?? "Products"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImageGallery images={product.images} productName={product.name} />

          <div>
            <ProductHybridActions product={product} rodVariants={rodVariants} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
          <section>
            <h2 className="text-xl font-bold mb-4">Features</h2>
            {product.qualityTier === "standard" &&
              product.rodCount === 3 &&
              product.categorySlug === "cloth-drying-hangers" && (
                <p className="text-sm font-medium text-stone-700 mb-3">
                  Standard quality cloth dry hangers 3 rods sets
                </p>
              )}
            {product.qualityTier === "standard" &&
              product.rodCount === 6 &&
              product.categorySlug === "cloth-drying-hangers" && (
                <p className="text-sm font-medium text-stone-700 mb-3">
                  Standard quality cloth dry hangers 6 rods sets
                </p>
              )}
            {product.qualityTier === "premium" &&
              product.rodCount === 6 &&
              product.categorySlug === "cloth-drying-hangers" && (
                <p className="text-sm font-medium text-stone-700 mb-3">
                  Premium Quality Cloth Dry Hangers 6 rods sets
                </p>
              )}
            {product.qualityTier === "standard" &&
              product.categorySlug === "wall-mounted-cloth-hangers" && (
                <p className="text-sm font-medium text-stone-700 mb-3">
                  Standard quality Wall Mounted Cloth Dry Hangers
                </p>
              )}
            {product.qualityTier === "premium" &&
              product.categorySlug === "wall-mounted-cloth-hangers" && (
                <p className="text-sm font-medium text-stone-700 mb-3">
                  Premium quality Wall Mounted Cloth Dry Hangers
                </p>
              )}
            <ul className="space-y-2 text-stone-600">
              {product.features.map((f) => (
                <li key={f} className="flex gap-2"><span className="text-brand-600">•</span>{f}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-4">Benefits</h2>
            <ul className="space-y-2 text-stone-600">
              {product.benefits.map((b) => (
                <li key={b} className="flex gap-2"><span className="text-brand-600">•</span>{b}</li>
              ))}
            </ul>
          </section>
        </div>

        {(product.categorySlug === "cloth-drying-hangers" ||
          product.categorySlug === "wall-mounted-cloth-hangers") &&
        product.qualityTier ? (
          <ClothHangerQualityComparison
            activeTier={product.qualityTier}
            wallMounted={product.categorySlug === "wall-mounted-cloth-hangers"}
          />
        ) : (
          Object.keys(product.specifications).length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold mb-4">Specifications</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product.specifications).map(([k, v]) => (
                  <div key={k} className="p-4 rounded-xl bg-white border border-surface-200 shadow-soft">
                    <dt className="text-xs text-stone-500 uppercase">{k}</dt>
                    <dd className="font-medium mt-1">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )
        )}

        {product.faq && product.faq.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">FAQs</h2>
            <div className="space-y-3">
              {product.faq.map((f) => (
                <div key={f.question} className="p-4 rounded-xl border border-surface-200 bg-white shadow-soft">
                  <h3 className="font-medium">{f.question}</h3>
                  <p className="text-sm text-stone-500 mt-2">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 text-sm text-stone-500">
          Service areas: {business.primaryCities.join(", ")}.
          {product.warranty && <> Warranty: {product.warranty}.</>}
        </div>
      </PageContent>
    </>
  );
}
