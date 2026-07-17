import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { MakeEntry } from "@/data/catalog";

const catalogPath = path.join(
  process.cwd(),
  "src/data/catalog.generated.json",
);

type CatalogCache = { mtimeMs: number; data: MakeEntry[] };

declare global {
  // eslint-disable-next-line no-var
  var __motomediaxCatalogCache: CatalogCache | undefined;
}

/**
 * Server-only: read catalog from disk (mtime-cached) so route lookups always
 * match the latest `pnpm build:catalog` output without a stale Turbopack bundle.
 */
export function getCatalog(): MakeEntry[] {
  const stat = fs.statSync(catalogPath);
  const cached = globalThis.__motomediaxCatalogCache;
  if (cached && cached.mtimeMs === stat.mtimeMs) {
    return cached.data;
  }
  const data = JSON.parse(fs.readFileSync(catalogPath, "utf8")) as MakeEntry[];
  globalThis.__motomediaxCatalogCache = { mtimeMs: stat.mtimeMs, data };
  return data;
}
