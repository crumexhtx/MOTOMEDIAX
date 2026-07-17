import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ModelCard, YearChips } from "@/components/ModelCard";
import { getAllModelParams, getModel } from "@/lib/catalog";
import { JsonLd, absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ make: string; model: string }>;
};

export function generateStaticParams() {
  return getAllModelParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { make: makeSlug, model: modelSlug } = await params;
  const found = getModel(makeSlug, modelSlug);
  if (!found) return {};

  const { make, model } = found;
  const title = `${make.name} ${model.name} photos & years`;
  const description = `${model.tagline} Browse ${make.name} ${model.name} model years and galleries on motomediax.`;
  const image = model.years[0]?.images[0] ?? make.coverImage;

  return {
    title,
    description,
    alternates: { canonical: `/makes/${make.slug}/${model.slug}` },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/makes/${make.slug}/${model.slug}`),
      images: [{ url: image.src, alt: image.alt }],
    },
  };
}

export default async function ModelPage({ params }: Props) {
  const { make: makeSlug, model: modelSlug } = await params;
  const found = getModel(makeSlug, modelSlug);
  if (!found) notFound();

  const { make, model } = found;
  const yearsSorted = [...model.years].sort((a, b) => b.year - a.year);

  return (
    <div className="container-wide py-10 md:py-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Makes", path: "/makes" },
          { name: make.name, path: `/makes/${make.slug}` },
          { name: model.name, path: `/makes/${make.slug}/${model.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Makes", href: "/makes" },
          { label: make.name, href: `/makes/${make.slug}` },
          { label: model.name },
        ]}
      />
      <header className="mt-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">
          {make.name}
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight md:text-5xl">
          {model.name}
        </h1>
        <p className="mt-3 text-lg text-muted">{model.tagline}</p>
      </header>

      <section className="mt-8">
        <h2 className="mb-3 text-xs uppercase tracking-[0.16em] text-muted">
          Model years
        </h2>
        <YearChips
          years={yearsSorted}
          makeSlug={make.slug}
          modelSlug={model.slug}
        />
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-display text-2xl tracking-tight">Year galleries</h2>
        <ul className="space-y-3">
          {yearsSorted.map((year) => (
            <li key={year.slug}>
              <ModelCard
                href={`/makes/${make.slug}/${model.slug}/${year.slug}`}
                title={`${year.year} ${make.name} ${model.name}`}
                subtitle={year.summary}
                image={year.images[0] ?? make.coverImage}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
