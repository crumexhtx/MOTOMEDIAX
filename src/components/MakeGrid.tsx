import Image from "next/image";
import Link from "next/link";
import type { MakeEntry } from "@/data/catalog";

export function MakeTile({ make }: { make: MakeEntry }) {
  return (
    <Link
      href={`/makes/${make.slug}`}
      className="make-tile focus-ring group block overflow-hidden rounded-xl border border-line bg-elevated"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={make.coverImage.src}
          alt={make.coverImage.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
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
