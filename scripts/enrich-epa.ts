/**
 * Patch EPA MPG into an existing catalog.generated.json without
 * re-fetching Wikipedia / NHTSA. Useful for a fast refresh after
 * the EPA dump updates.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadEpaIndex,
  lookupEpaSummary,
  mergeEpaIntoSpecs,
} from "./epa";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(ROOT, "src/data/catalog.generated.json");
const YEARS = [2024, 2025, 2026] as const;

type YearEntry = {
  year: number;
  specs?: Record<string, unknown>;
  sources?: { epa?: string; [k: string]: unknown };
  summary?: string;
  description?: string;
  highlights?: string[];
  [k: string]: unknown;
};

type ModelEntry = { name: string; years: YearEntry[]; [k: string]: unknown };
type MakeEntry = { name: string; models: ModelEntry[]; [k: string]: unknown };

async function main() {
  if (!fs.existsSync(OUT_PATH)) {
    throw new Error(`Missing ${OUT_PATH} — run pnpm build:catalog first`);
  }

  const catalog = JSON.parse(fs.readFileSync(OUT_PATH, "utf8")) as MakeEntry[];
  const epaIndex = await loadEpaIndex(YEARS);
  let hits = 0;

  for (const make of catalog) {
    for (const model of make.models) {
      for (const year of model.years) {
        const epa = lookupEpaSummary(
          epaIndex,
          make.name,
          model.name,
          year.year,
        );
        if (!epa) continue;
        hits += 1;
        year.specs = mergeEpaIntoSpecs(year.specs, epa) as Record<
          string,
          unknown
        >;
        year.sources = {
          ...year.sources,
          epa: "https://www.fueleconomy.gov/feg/download.shtml",
        };

        if (epa.mpgCombined && year.highlights) {
          const label = `EPA combined ${epa.mpgCombined} mpg`;
          if (!year.highlights.includes(label)) {
            year.highlights = [...year.highlights, label].slice(0, 8);
          }
        }
      }
    }
  }

  fs.writeFileSync(OUT_PATH, `${JSON.stringify(catalog, null, 2)}\n`);
  console.log(`Patched EPA into ${OUT_PATH} (${hits} year matches)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
