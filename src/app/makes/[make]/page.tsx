import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ModelCard } from "@/components/ModelCard";
import {
  getAllMakeParams,
  getMake,
} from "@/lib/catalog";
import { JsonLd, absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ make: string }>;
};

export function generateStaticParams() {
  return getAllMakeParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { make: makeSlug } = await params;
  const make = getMake(makeSlug);
  if (!make) return {};

  const title = `${make.name} cars & photos`;
  const description = `${make.blurb} Browse ${make.name} models and model-year galleries on motomediax.`;

  return {
    title,
    description,
    alternates: { canonical: `/makes/${make.slug}` },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/makes/${make.slug}`),
      images: [{ url: make.coverImage.src, alt: make.coverImage.alt }],
    },
  };
}

export default async function MakePage({ params }: Props) {
  const { make: makeSlug } = await params;
  const make = getMake(makeSlug);
  if (!make) notFound();

  return (
    <div className="container-wide py-10 md:py-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Makes", path: "/makes" },
          { name: make.name, path: `/makes/${make.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Makes", href: "/makes" },
          { label: make.name },
        ]}
      />
      <header className="mt-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">
          {make.country}
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight md:text-5xl">
          {make.name}
        </h1>
        <p className="mt-3 text-lg text-muted">{make.blurb}</p>
      </header>
      <section className="mt-10 space-y-4">
        <h2 className="font-display text-2xl tracking-tight">Models</h2>
        <ul className="space-y-3">
          {make.models.map((model) => (
            <li key={model.slug}>
              <ModelCard
                href={`/makes/${make.slug}/${model.slug}`}
                title={model.name}
                subtitle={`${model.tagline} · ${model.years.length} year${model.years.length === 1 ? "" : "s"}`}
                image={model.years[0]?.images[0] ?? make.coverImage}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
