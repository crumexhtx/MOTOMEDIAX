import Image from "next/image";
import Link from "next/link";
import type { GalleryImage } from "@/data/catalog";

export function ModelCard({
  href,
  title,
  subtitle,
  image,
}: {
  href: string;
  title: string;
  subtitle: string;
  image: GalleryImage;
}) {
  return (
    <Link
      href={href}
      className="focus-ring group grid overflow-hidden rounded-xl border border-line bg-elevated transition hover:border-accent/50 sm:grid-cols-[180px_1fr]"
    >
      <div className="relative aspect-[16/10] sm:aspect-auto sm:min-h-[120px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 100vw, 180px"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col justify-center p-5">
        <h3 className="font-display text-xl tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>
      </div>
    </Link>
  );
}

export function YearChips({
  years,
  makeSlug,
  modelSlug,
  activeYear,
}: {
  years: { year: number; slug: string }[];
  makeSlug: string;
  modelSlug: string;
  activeYear?: string;
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {years.map((year) => {
        const href = `/makes/${makeSlug}/${modelSlug}/${year.slug}`;
        const active = activeYear === year.slug;
        return (
          <li key={year.slug}>
            <Link
              href={href}
              className={`focus-ring inline-flex rounded-md border px-3 py-1.5 text-sm transition ${
                active
                  ? "border-accent bg-accent/15 text-foreground"
                  : "border-line text-muted hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {year.year}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
