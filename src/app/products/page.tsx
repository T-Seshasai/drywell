import Link from "next/link";
import { categories } from "@/lib/catalog";
import CategoryRoundGrid from "@/components/shop/CategoryRoundGrid";
import PageHero from "@/components/layout/PageHero";
import PageContent from "@/components/layout/PageContent";
import { business } from "@/lib/config/business";

export const metadata = {
  title: `All Products | ${business.name}`,
  description: business.description,
};

export default function ProductsIndexPage() {
  return (
    <>
      <PageHero
        title="Products"
        description="Browse cloth hangers, grills, nets, shoe racks and home utility solutions."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
      />

      <PageContent variant="products">
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-stone-900">All Categories</h2>
          <p className="text-sm text-stone-500 mt-1">Select a category to view products</p>
        </div>

        <CategoryRoundGrid categories={categories} />

        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-surface-200 text-center shadow-soft">
          <h2 className="text-lg font-bold mb-2">Need help choosing?</h2>
          <p className="text-sm text-stone-500 mb-4">
            Installation available across {business.primaryCities.join(" & ")}.
          </p>
          <Link
            href="/quote"
            className="inline-flex px-6 py-3 bg-brand-600 text-white rounded-lg font-medium text-sm hover:bg-brand-700"
          >
            Request a Quote
          </Link>
        </div>
      </PageContent>
    </>
  );
}
