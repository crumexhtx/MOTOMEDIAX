"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { searchCatalog } from "@/lib/catalog";

export function SearchPanel({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(
    () => searchCatalog(deferredQuery),
    [deferredQuery],
  );

  return (
    <div className="space-y-8">
      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted">
          Search makes, models, or years
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try Ferrari, Mustang, 2020…"
          className="focus-ring w-full rounded-xl border border-line bg-elevated px-4 py-3 text-base outline-none placeholder:text-muted"
          autoComplete="off"
          spellCheck={false}
        />
      </label>

      {!deferredQuery.trim() ? (
        <p className="text-sm text-muted">
          Start typing to filter the catalog. Results update as you type.
        </p>
      ) : results.length === 0 ? (
        <p className="text-sm text-muted">
          No matches for “{deferredQuery.trim()}”. Try a make name or year.
        </p>
      ) : (
        <ul className="space-y-3">
          {results.map((result) => (
            <li key={`${result.type}-${result.href}`}>
              <Link
                href={result.href}
                className="focus-ring grid gap-4 rounded-xl border border-line bg-elevated p-3 transition hover:border-accent/40 sm:grid-cols-[120px_1fr]"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg sm:aspect-auto sm:min-h-[80px]">
                  <Image
                    src={result.image.src}
                    alt={result.image.alt}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">
                    {result.type}
                  </p>
                  <p className="mt-1 font-display text-xl tracking-tight">
                    {result.title}
                  </p>
                  <p className="mt-1 text-sm text-muted">{result.subtitle}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
