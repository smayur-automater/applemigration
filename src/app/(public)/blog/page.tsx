import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/layout/CTABanner";
import { BlogCard } from "@/components/cards/BlogCard";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Australian Visa & Migration Insights",
  description:
    "Plain-English articles on Australian student visas, skilled migration, partner visas, and employer sponsorship from MARA-registered agents.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Latest Insights"
        subtitle="Plain-English articles on Australian visas, migration policy, and studying in Australia."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <Section size="lg" bg="default">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </Container>
      </Section>
      <CTABanner variant="red" />
    </>
  );
}
