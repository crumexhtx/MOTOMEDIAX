"use client";

import { useMemo, useState, type ReactNode } from "react";
import { CatalogImage } from "@/components/CatalogImage";
import { Gallery } from "@/components/Gallery";
import { YearDetailPanel } from "@/components/YearDetailPanel";
import type {
  GalleryImage,
  TrimSpec,
  VehicleSpecs,
  YearPerformance,
} from "@/data/catalog";

type Props = {
  title: string;
  summary: string;
  yearLabel: string;
  breadcrumbs: ReactNode;
  yearChips: ReactNode;
  overview: ReactNode;
  performance?: YearPerformance;
  specs?: VehicleSpecs;
  baseImages: GalleryImage[];
  nhtsaUrl?: string;
  epaUrl?: string;
};

function trimToImage(
  trim: TrimSpec | undefined,
  fallbackAlt: string,
): GalleryImage | null {
  if (!trim?.image) return null;
  return {
    src: trim.image,
    alt: `${fallbackAlt} — ${trim.name}`,
    width: 1280,
    height: 853,
  };
}

export function YearExperience({
  title,
  summary,
  yearLabel,
  breadcrumbs,
  yearChips,
  overview,
  performance,
  specs,
  baseImages,
  nhtsaUrl,
  epaUrl,
}: Props) {
  const trims = performance?.trims ?? [];
  const initialId =
    performance?.defaultTrimId &&
    trims.some((t) => t.id === performance.defaultTrimId)
      ? performance.defaultTrimId
      : trims[0]?.id;

  const [trimId, setTrimId] = useState(initialId);
  const trim = useMemo(
    () => trims.find((t) => t.id === trimId) ?? trims[0],
    [trims, trimId],
  );

  const trimImage = trimToImage(trim, title);
  const hero = trimImage ?? baseImages[0];
  const galleryImages = useMemo(() => {
    if (!trimImage) return baseImages;
    const rest = baseImages.filter((img) => img.src !== trimImage.src);
    return [trimImage, ...rest];
  }, [trimImage, baseImages]);

  return (
    <article>
      <div className="relative min-h-[42vh] overflow-hidden md:min-h-[52vh]">
        {hero ? (
          <CatalogImage
            key={hero.src}
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-soft" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-black/50 to-black/25" />
        <div className="container-wide relative flex min-h-[42vh] flex-col justify-end pb-10 pt-24 md:min-h-[52vh]">
          {breadcrumbs}
          <h1 className="mt-4 font-display text-4xl tracking-tight text-white md:text-6xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/80 md:text-lg">
            {summary}
          </p>
          {trim ? (
            <p className="mt-2 text-sm text-white/65">
              {trim.image
                ? `Photo: ${trim.name}`
                : `Trim: ${trim.name}`}
            </p>
          ) : null}
        </div>
      </div>

      <div className="container-wide py-10 md:py-14">
        <section className="mb-10">
          <h2 className="mb-3 text-xs uppercase tracking-[0.16em] text-muted">
            Other years
          </h2>
          {yearChips}
        </section>

        {overview}

        <YearDetailPanel
          yearLabel={yearLabel}
          performance={performance}
          specs={specs}
          nhtsaUrl={nhtsaUrl}
          epaUrl={epaUrl}
          trimId={trimId}
          onTrimChange={setTrimId}
        />

        <section>
          <h2 className="mb-5 font-display text-2xl tracking-tight">
            Photo gallery
          </h2>
          {galleryImages.length > 0 ? (
            <Gallery key={galleryImages[0]?.src} images={galleryImages} />
          ) : (
            <p className="text-muted">
              No Wikimedia photo available for this model yet. Overview and
              specs are still listed above.
            </p>
          )}
        </section>
      </div>
    </article>
  );
}
