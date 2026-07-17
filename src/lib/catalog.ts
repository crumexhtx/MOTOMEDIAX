import {
  catalog,
  type GalleryImage,
  type MakeEntry,
  type ModelEntry,
  type YearEntry,
} from "@/data/catalog";

export function getAllMakes(): MakeEntry[] {
  return [...catalog].sort((a, b) => a.name.localeCompare(b.name));
}

export function getMake(slug: string): MakeEntry | undefined {
  return catalog.find((m) => m.slug === slug);
}

export function getModel(
  makeSlug: string,
  modelSlug: string,
): { make: MakeEntry; model: ModelEntry } | undefined {
  const make = getMake(makeSlug);
  if (!make) return undefined;
  const model = make.models.find((m) => m.slug === modelSlug);
  if (!model) return undefined;
  return { make, model };
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
  const year = found.model.years.find((y) => y.slug === yearSlug);
  if (!year) return undefined;
  return { ...found, year };
}

export function getLatestEntries(limit = 8) {
  const entries: {
    make: MakeEntry;
    model: ModelEntry;
    year: YearEntry;
    href: string;
    image: GalleryImage;
  }[] = [];

  for (const make of catalog) {
    for (const model of make.models) {
      for (const year of model.years) {
        entries.push({
          make,
          model,
          year,
          href: `/makes/${make.slug}/${model.slug}/${year.slug}`,
          image: year.images[0] ?? make.coverImage,
        });
      }
    }
  }

  return entries
    .sort((a, b) => b.year.year - a.year.year)
    .slice(0, limit);
}

export function searchCatalog(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: {
    type: "make" | "model" | "year";
    title: string;
    subtitle: string;
    href: string;
    image: GalleryImage;
  }[] = [];

  for (const make of catalog) {
    if (
      make.name.toLowerCase().includes(q) ||
      make.country.toLowerCase().includes(q)
    ) {
      results.push({
        type: "make",
        title: make.name,
        subtitle: make.country,
        href: `/makes/${make.slug}`,
        image: make.coverImage,
      });
    }

    for (const model of make.models) {
      const modelMatch =
        model.name.toLowerCase().includes(q) ||
        model.tagline.toLowerCase().includes(q) ||
        `${make.name} ${model.name}`.toLowerCase().includes(q);

      if (modelMatch) {
        results.push({
          type: "model",
          title: `${make.name} ${model.name}`,
          subtitle: model.tagline,
          href: `/makes/${make.slug}/${model.slug}`,
          image: model.years[0]?.images[0] ?? make.coverImage,
        });
      }

      for (const year of model.years) {
        const yearLabel = `${make.name} ${model.name} ${year.year}`;
        if (
          yearLabel.toLowerCase().includes(q) ||
          year.summary.toLowerCase().includes(q) ||
          String(year.year).includes(q)
        ) {
          results.push({
            type: "year",
            title: yearLabel,
            subtitle: year.summary,
            href: `/makes/${make.slug}/${model.slug}/${year.slug}`,
            image: year.images[0] ?? make.coverImage,
          });
        }
      }
    }
  }

  return results;
}

export function getAllMakeParams() {
  return catalog.map((make) => ({ make: make.slug }));
}

export function getAllModelParams() {
  return catalog.flatMap((make) =>
    make.models.map((model) => ({
      make: make.slug,
      model: model.slug,
    })),
  );
}

export function getAllYearParams() {
  return catalog.flatMap((make) =>
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
