import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getBlogPost } from "@/data/blog";
import PageHero from "@/components/layout/PageHero";
import PageContent from "@/components/layout/PageContent";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not found" };
  return { title: post.seo.title, description: post.seo.description };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />
      <PageContent narrow>
        <article className="bg-white rounded-2xl border border-surface-200 p-6 sm:p-8 shadow-soft">
          <p className="text-stone-600 leading-relaxed whitespace-pre-line">{post.content}</p>
          {post.relatedCategorySlugs && (
            <div className="mt-10 flex flex-wrap gap-3">
              {post.relatedCategorySlugs.map((s) => (
                <Link key={s} href={`/products/${s}`} className="text-sm text-brand-700 underline">
                  {s.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          )}
        </article>
      </PageContent>
    </>
  );
}
