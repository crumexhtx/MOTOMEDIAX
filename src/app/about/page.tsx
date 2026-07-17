import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE } from "@/data/catalog";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE.name}—a clearer, SEO-friendly way to browse car photos by make, model, and year.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-wide py-10 md:py-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />
      <article className="prose-like mt-6 max-w-2xl">
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          About {SITE.name}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          {SITE.name} is a car photo catalog inspired by the browse model of
          sites like NetCarShow—make, then model, then year—with a cleaner UI
          and pages structured for search engines.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          This first release uses seeded demo data and royalty-free photography
          from Unsplash so the experience can be evaluated without copying
          third-party assets or copy. Content can be expanded or replaced with
          original photos and write-ups later.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          Not affiliated with NetCarShow or any vehicle manufacturer.
        </p>
      </article>
    </div>
  );
}
