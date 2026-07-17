"use client";

import { CatalogImage } from "@/components/CatalogImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useEffectEvent, useState } from "react";
import type { SearchResult } from "@/lib/catalog";

export function SearchPanel({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const deferredQuery = useDeferredValue(query);
  const trimmed = deferredQuery.trim();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const syncUrl = useEffectEvent((value: string) => {
    const next = value
      ? `/search?q=${encodeURIComponent(value)}`
      : "/search";
    router.replace(next, { scroll: false });
  });

  useEffect(() => {
    syncUrl(trimmed);

    if (!trimmed) {
      return;
    }

    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Search failed");
        const data = (await response.json()) as { results: SearchResult[] };
        setResults(data.results);
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [trimmed]);

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
          placeholder="Try Toyota, Camry, 2025…"
          className="focus-ring w-full rounded-xl border border-line bg-elevated px-4 py-3 text-base outline-none placeholder:text-muted"
          autoComplete="off"
          spellCheck={false}
        />
      </label>

      {!trimmed ? (
        <p className="text-sm text-muted">
          Start typing to filter the catalog. Results update as you type.
        </p>
      ) : loading ? (
        <p className="text-sm text-muted">Searching…</p>
      ) : results.length === 0 ? (
        <p className="text-sm text-muted">
          No matches for “{trimmed}”. Try a make name or year.
        </p>
      ) : (
        <ul className="space-y-3">
          {results.map((result) => (
            <li key={`${result.type}-${result.href}`}>
              <Link
                href={result.href}
                className="focus-ring grid gap-4 rounded-xl border border-line bg-elevated p-3 transition hover:border-accent/40 sm:grid-cols-[120px_1fr]"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-soft sm:aspect-auto sm:min-h-[80px]">
                  {result.image.src.endsWith(".svg") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={result.image.src}
                      alt={result.image.alt}
                      className="brand-badge absolute inset-0 m-auto h-10 w-10"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <CatalogImage
                      src={result.image.src}
                      alt={result.image.alt}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  )}
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
