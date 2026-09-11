import { notFound } from "next/navigation";
import Link from "next/link";
import {
  categories,
  getCategory,
  getProductsByCategory,
} from "@/lib/catalog";
import CategoryProductList from "@/components/shop/CategoryProductList";
import PageHero from "@/components/layout/PageHero";
import PageContent from "@/components/layout/PageContent";
import JsonLd from "@/components/shop/JsonLd";
import { categoryBreadcrumbs, faqJsonLd } from "@/lib/schema/jsonld";
import { business } from "@/lib/config/business";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category: slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "Not found" };
  return {
    title: cat.seo.title,
    description: cat.seo.description,
    alternates: { canonical: `/products/${cat.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items =
    slug === "cloth-drying-hangers"
      ? [
          ...getProductsByCategory("cloth-drying-hangers"),
          ...getProductsByCategory("wall-mounted-cloth-hangers"),
        ]
      : getProductsByCategory(slug);

  return (
    <>
      <JsonLd data={categoryBreadcrumbs(category)} />
      {category.faq?.length ? (
        <JsonLd data={faqJsonLd(category.faq.map((f) => ({ question: f.question, answer: f.answer })))} />
      ) : null}

      <PageHero
        compact
        title={
          slug === "cloth-drying-hangers"
            ? "Cloth Drying Hanger, Balcony Cloth Dry Hangers, Roof Cloth Dry Hangers, Ceiling Cloth Dry Hangers & Wall Mounted Cloth Dry Hangers"
            : slug === "wall-mounted-cloth-hangers"
              ? "Wall Mounted Cloth Dry Hangers and Outdoor Wall Mounted Cloth Dry Hangers"
              : category.name
        }
        description={slug === "cloth-drying-hangers" ? undefined : category.introduction}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: category.name },
        ]}
      />

      <PageContent variant="products">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-stone-500">{items.length} products</p>
          <Link href="/products" className="flex items-center gap-1 text-sm font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" /> All products
          </Link>
        </div>

        {slug !== "cloth-drying-hangers" &&
          slug !== "wall-mounted-cloth-hangers" &&
          category.buyingGuide && (
            <div className="mb-8 p-5 rounded-xl bg-white border border-brand-100 text-sm text-stone-600 shadow-soft">
              <strong className="text-brand-900">Buying guide:</strong> {category.buyingGuide}
            </div>
          )}

        <CategoryProductList products={items} categorySlug={slug} />

        <div className="mt-12 p-8 rounded-2xl bg-white border border-surface-200 text-center shadow-soft">
          <h2 className="text-xl font-bold mb-2">Need help choosing?</h2>
          <p className="text-stone-500 mb-4">Installation available across {business.primaryCities.join(" & ")}.</p>
          <Link href="/quote" className="inline-flex px-6 py-3 bg-brand-600 text-white rounded-lg font-medium">
            Request a Quote
          </Link>
        </div>
      </PageContent>
    </>
  );
}
