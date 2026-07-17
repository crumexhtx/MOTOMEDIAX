import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Gallery } from "@/components/Gallery";
import { YearChips } from "@/components/ModelCard";
import { getAllYearParams, getYear } from "@/lib/catalog";
import {
  JsonLd,
  absoluteUrl,
  breadcrumbJsonLd,
  vehicleJsonLd,
} from "@/lib/seo";

type Props = {
  params: Promise<{ make: string; model: string; year: string }>;
};

export function generateStaticParams() {
  return getAllYearParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { make: makeSlug, model: modelSlug, year: yearSlug } = await params;
  const found = getYear(makeSlug, modelSlug, yearSlug);
  if (!found) return {};

  const { make, model, year } = found;
  const title = `${year.year} ${make.name} ${model.name} photos`;
  const description = year.summary;
  const image = year.images[0] ?? make.coverImage;
  const path = `/makes/${make.slug}/${model.slug}/${year.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      images: [{ url: image.src, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.src],
    },
  };
}

export default async function YearPage({ params }: Props) {
  const { make: makeSlug, model: modelSlug, year: yearSlug } = await params;
  const found = getYear(makeSlug, modelSlug, yearSlug);
  if (!found) notFound();

  const { make, model, year } = found;
  const path = `/makes/${make.slug}/${model.slug}/${year.slug}`;
  const hero = year.images[0] ?? make.coverImage;
  const yearsSorted = [...model.years].sort((a, b) => b.year - a.year);

  return (
    <article>
      <div className="relative min-h-[42vh] overflow-hidden md:min-h-[52vh]">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-black/50 to-black/25" />
        <div className="container-wide relative flex min-h-[42vh] flex-col justify-end pb-10 pt-24 md:min-h-[52vh]">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Makes", href: "/makes" },
              { label: make.name, href: `/makes/${make.slug}` },
              { label: model.name, href: `/makes/${make.slug}/${model.slug}` },
              { label: String(year.year) },
            ]}
          />
          <h1 className="mt-4 font-display text-4xl tracking-tight text-white md:text-6xl">
            {year.year} {make.name} {model.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/80 md:text-lg">
            {year.summary}
          </p>
        </div>
      </div>

      <div className="container-wide py-10 md:py-14">
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Makes", path: "/makes" },
            { name: make.name, path: `/makes/${make.slug}` },
            { name: model.name, path: `/makes/${make.slug}/${model.slug}` },
            { name: String(year.year), path },
          ])}
        />
        <JsonLd
          data={vehicleJsonLd({
            make: make.name,
            model: model.name,
            year: year.year,
            description: year.description,
            image: hero.src,
            path,
          })}
        />

        <section className="mb-10">
          <h2 className="mb-3 text-xs uppercase tracking-[0.16em] text-muted">
            Other years
          </h2>
          <YearChips
            years={yearsSorted}
            makeSlug={make.slug}
            modelSlug={model.slug}
            activeYear={year.slug}
          />
        </section>

        <section className="mb-12 max-w-3xl">
          <h2 className="font-display text-2xl tracking-tight">Overview</h2>
          <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
            {year.description}
          </p>
        </section>

        <section>
          <h2 className="mb-5 font-display text-2xl tracking-tight">
            Photo gallery
          </h2>
          <Gallery images={year.images} />
        </section>
      </div>
    </article>
  );
}
