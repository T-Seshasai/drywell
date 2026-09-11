import Link from "next/link";
import { blogPosts } from "@/data/blog";
import PageHero from "@/components/layout/PageHero";
import PageContent from "@/components/layout/PageContent";
import { business } from "@/lib/config/business";

export const metadata = {
  title: `Blog | ${business.name}`,
  description: "Guides and buying advice for cloth hangers, nets, grills and home solutions.",
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        title="Blog & Guides"
        description="Tips and buying advice for cloth hangers, nets, grills and home solutions."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />
      <PageContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="p-6 rounded-2xl border border-surface-200 hover:border-brand-300 bg-white shadow-soft"
            >
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-stone-500 text-sm">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </PageContent>
    </>
  );
}
