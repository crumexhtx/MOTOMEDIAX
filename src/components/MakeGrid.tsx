import Link from "next/link";
import type { MakeEntry } from "@/data/catalog";
import { makeHref } from "@/lib/catalog";

function BrandBadge({
  slug,
  name,
  className = "h-14 w-14",
}: {
  slug: string;
  name: string;
  className?: string;
}) {
  return (
    // Local SVG badges from /public/brands — next/image is awkward with SVG.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/brands/${slug}.svg`}
      alt={`${name} badge`}
      className={`brand-badge ${className}`}
      width={56}
      height={56}
    />
  );
}

/** Make tile — brand badge only (no auto-fetched car photos). */
export function MakeTile({ make }: { make: MakeEntry }) {
  return (
    <Link
      href={makeHref(make.slug)}
      className="make-tile focus-ring group block overflow-hidden rounded-xl border border-line bg-elevated"
    >
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-soft">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(61,156,240,0.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.06), transparent 45%)",
          }}
        />
        <BrandBadge
          slug={make.slug}
          name={make.name}
          className="relative z-10 h-16 w-16 opacity-90 transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
          <p className="font-display text-2xl tracking-tight">{make.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/70">
            {make.country} · {make.models.length} models
          </p>
        </div>
      </div>
    </Link>
  );
}

export function MakeGrid({ makes }: { makes: MakeEntry[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {makes.map((make) => (
        <li key={make.slug}>
          <MakeTile make={make} />
        </li>
      ))}
    </ul>
  );
}

export function MakeHeaderBadge({ make }: { make: MakeEntry }) {
  return (
    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl border border-line bg-soft">
      <BrandBadge slug={make.slug} name={make.name} className="h-9 w-9" />
    </div>
  );
}

/** Shared helper for places that still read coverImage paths. */
export function brandBadgeSrc(slug: string) {
  return `/brands/${slug}.svg`;
}
