import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTABanner } from "@/components/layout/CTABanner";
import { MaraDisclaimer } from "@/components/layout/MaraDisclaimer";
import { blogPosts } from "@/lib/content";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.date },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <Section size="md" bg="default">
        <Container size="prose">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />
          <article className="mt-8">
            <div className="flex items-center gap-2 text-sm text-charcoal/60">
              <span className="rounded-sm bg-surface px-2 py-0.5 font-semibold text-navy">
                {post.category}
              </span>
              <time dateTime={post.date}>{post.displayDate}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="mt-4 font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight text-navy">
              {post.title}
            </h1>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-charcoal/90">
              {post.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <hr className="my-10 border-border" />
            <MaraDisclaimer variant="inline" />
          </article>
        </Container>
      </Section>
      <CTABanner
        variant="navy"
        heading="Questions About Your Situation?"
        subtext="Articles are general information — your case is specific. Talk it through with a registered agent, free."
      />
    </>
  );
}
