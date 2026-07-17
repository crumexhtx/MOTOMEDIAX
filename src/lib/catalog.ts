import {
  type GalleryImage,
  type MakeEntry,
  type ModelEntry,
  type YearEntry,
} from "@/data/catalog";
import { getCatalog } from "@/data/catalog.server";
import { enrichYearEntry } from "@/lib/trims";

export type SearchResult = {
  type: "make" | "model" | "year";
  title: string;
  subtitle: string;
  href: string;
  image: GalleryImage;
};

function normSlug(slug: string) {
  try {
    return decodeURIComponent(slug).toLowerCase();
  } catch {
    return slug.toLowerCase();
  }
}

export function getAllMakes(): MakeEntry[] {
  return [...getCatalog()].sort((a, b) => a.name.localeCompare(b.name));
}

export function getMake(slug: string): MakeEntry | undefined {
  const key = normSlug(slug);
  return getCatalog().find((m) => m.slug === key);
}

export function getModel(
  makeSlug: string,
  modelSlug: string,
): { make: MakeEntry; model: ModelEntry } | undefined {
  const make = getMake(makeSlug);
  if (!make) return undefined;
  const key = normSlug(modelSlug);
  const model = make.models.find((m) => m.slug === key);
  if (!model) return undefined;
  return {
    make,
    model: {
      ...model,
      years: model.years.map((y) =>
        enrichYearEntry(make.slug, model.slug, y),
      ),
    },
  };
}

export function getYear(
  makeSlug: string,
  modelSlug: string,
  yearSlug: string,
):
  | { make: MakeEntry; model: ModelEntry; year: YearEntry }
  | undefined {
  const found = getModel(makeSlug, modelSlug);
  if (!found) return undefined;
  const key = normSlug(yearSlug);
  const year = found.model.years.find((y) => y.slug === key);
  if (!year) return undefined;
  return {
    ...found,
    year: enrichYearEntry(found.make.slug, found.model.slug, year),
  };
}

export function getLatestEntries(limit = 8) {
  const entries: {
    make: MakeEntry;
    model: ModelEntry;
    year: YearEntry;
    href: string;
    image: GalleryImage;
  }[] = [];

  for (const make of getCatalog()) {
    for (const model of make.models) {
      for (const year of model.years) {
        const image = year.images[0];
        if (!image?.src || image.src.endsWith(".svg")) continue;
        entries.push({
          make,
          model,
          year,
          href: yearHref(make.slug, model.slug, year.slug),
          image,
        });
      }
    }
  }

  return entries
    .sort((a, b) => b.year.year - a.year.year)
    .slice(0, limit);
}

/** Diverse local catalog photos for the landing hero (one per make). */
export function getHeroBackdropImages(limit = 6): GalleryImage[] {
  const picked: GalleryImage[] = [];
  const seenMakes = new Set<string>();

  // Prefer enriched year pages so default-trim photos win when present.
  for (const make of getCatalog()) {
    for (const model of make.models) {
      if (seenMakes.has(make.slug)) break;
      for (const year of model.years) {
        if (seenMakes.has(make.slug)) break;
        const enriched = enrichYearEntry(make.slug, model.slug, year);
        const image = enriched.images.find(
          (img) =>
            img?.src?.startsWith("/catalog/") && !img.src.endsWith(".svg"),
        );
        if (!image) continue;
        seenMakes.add(make.slug);
        picked.push({
          ...image,
          alt: `${year.year} ${make.name} ${model.name}`,
        });
      }
    }
    if (picked.length >= limit) break;
  }

  if (picked.length >= Math.min(2, limit)) return picked.slice(0, limit);

  // Fallback: any non-SVG photos from latest entries.
  for (const entry of getLatestEntries(24)) {
    if (picked.some((p) => p.src === entry.image.src)) continue;
    if (entry.image.src.endsWith(".svg")) continue;
    picked.push(entry.image);
    if (picked.length >= limit) break;
  }

  return picked.slice(0, limit);
}

function firstCarImage(
  make: MakeEntry,
  model?: ModelEntry,
): GalleryImage | undefined {
  if (model) {
    for (const year of model.years) {
      const img = year.images[0];
      if (img?.src && !img.src.endsWith(".svg")) return img;
    }
  }
  for (const m of make.models) {
    for (const year of m.years) {
      const img = year.images[0];
      if (img?.src && !img.src.endsWith(".svg")) return img;
    }
  }
  return undefined;
}

export function searchCatalog(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];
  const exactYearQuery = /^\d{4}$/.test(q);
  const digitsOnlyQuery = /^\d+$/.test(q);

  for (const make of getCatalog()) {
    if (
      !exactYearQuery &&
      (make.name.toLowerCase().includes(q) ||
        make.country.toLowerCase().includes(q))
    ) {
      const image = firstCarImage(make) ?? make.coverImage;
      results.push({
        type: "make",
        title: make.name,
        subtitle: make.country,
        href: makeHref(make.slug),
        image,
      });
    }

    for (const model of make.models) {
      const modelMatch =
        !exactYearQuery &&
        (model.name.toLowerCase().includes(q) ||
          model.tagline.toLowerCase().includes(q) ||
          `${make.name} ${model.name}`.toLowerCase().includes(q));

      if (modelMatch) {
        const image = firstCarImage(make, model) ?? make.coverImage;
        results.push({
          type: "model",
          title: `${make.name} ${model.name}`,
          subtitle: model.tagline,
          href: modelHref(make.slug, model.slug),
          image,
        });
      }

      for (const year of model.years) {
        const yearLabel = `${make.name} ${model.name} ${year.year}`;
        let yearHit = false;
        if (exactYearQuery) {
          yearHit = String(year.year) === q;
        } else if (!digitsOnlyQuery) {
          yearHit =
            yearLabel.toLowerCase().includes(q) ||
            year.summary.toLowerCase().includes(q);
        }

        if (yearHit) {
          const image =
            year.images[0] && !year.images[0].src.endsWith(".svg")
              ? year.images[0]
              : (firstCarImage(make, model) ?? make.coverImage);
          results.push({
            type: "year",
            title: yearLabel,
            subtitle: year.summary,
            href: yearHref(make.slug, model.slug, year.slug),
            image,
          });
        }
      }
    }
  }

  return results;
}

export function getAllMakeParams() {
  return getCatalog().map((make) => ({ make: make.slug }));
}

export function getAllModelParams() {
  return getCatalog().flatMap((make) =>
    make.models.map((model) => ({
      make: make.slug,
      model: model.slug,
    })),
  );
}

export function getAllYearParams() {
  return getCatalog().flatMap((make) =>
    make.models.flatMap((model) =>
      model.years.map((year) => ({
        make: make.slug,
        model: model.slug,
        year: year.slug,
      })),
    ),
  );
}

export function makeHref(makeSlug: string) {
  return `/makes/${makeSlug}`;
}

export function modelHref(makeSlug: string, modelSlug: string) {
  return `/makes/${makeSlug}/${modelSlug}`;
}

export function yearHref(
  makeSlug: string,
  modelSlug: string,
  yearSlug: string,
) {
  return `/makes/${makeSlug}/${modelSlug}/${yearSlug}`;
}
