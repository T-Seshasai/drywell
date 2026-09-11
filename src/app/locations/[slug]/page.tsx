import { notFound } from "next/navigation";
import Link from "next/link";
import { locations, getLocation } from "@/data/locations";
import { categories } from "@/lib/catalog";
import PageHero from "@/components/layout/PageHero";
import PageContent from "@/components/layout/PageContent";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return { title: "Not found" };
  return { title: loc.seo.title, description: loc.seo.description };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  return (
    <>
      <PageHero
        title={location.title}
        description={location.introduction}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: location.name },
        ]}
      />
      <PageContent>
        <h2 className="text-xl font-bold mb-4">Areas we cover in {location.name}</h2>
        <div className="flex flex-wrap gap-2 mb-10">
          {location.areas.map((a) => (
            <span key={a} className="px-3 py-1 rounded-full bg-white border border-brand-100 text-brand-800 text-sm">
              {a}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-4">Popular products</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {categories.slice(0, 6).map((c) => (
            <li key={c.slug}>
              <Link href={`/products/${c.slug}`} className="text-brand-700 hover:underline">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/quote" className="inline-flex px-6 py-3 bg-brand-600 text-white rounded-lg font-medium">
          Get Free Quote in {location.name}
        </Link>
        <p className="text-sm text-stone-500 mt-6">Call {process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+918125993888"} or WhatsApp for same-week visits where available.</p>
      </PageContent>
    </>
  );
}
