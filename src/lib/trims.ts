import type {
  TrimSpec,
  VehicleSpecs,
  YearEntry,
  YearPerformance,
} from "@/data/catalog";
import toyotaTrims from "@/data/trims/toyota.json";
import toyotaImages from "@/data/trims/toyota-images.json";
import fordTrims from "@/data/trims/ford.json";
import fordImages from "@/data/trims/ford-images.json";
import chevroletTrims from "@/data/trims/chevrolet.json";
import chevroletImages from "@/data/trims/chevrolet-images.json";
import hondaTrims from "@/data/trims/honda.json";
import hondaImages from "@/data/trims/honda-images.json";
import nissanTrims from "@/data/trims/nissan.json";
import nissanImages from "@/data/trims/nissan-images.json";
import hyundaiTrims from "@/data/trims/hyundai.json";
import hyundaiImages from "@/data/trims/hyundai-images.json";
import kiaTrims from "@/data/trims/kia.json";
import kiaImages from "@/data/trims/kia-images.json";
import subaruTrims from "@/data/trims/subaru.json";
import subaruImages from "@/data/trims/subaru-images.json";
import jeepTrims from "@/data/trims/jeep.json";
import jeepImages from "@/data/trims/jeep-images.json";
import gmcTrims from "@/data/trims/gmc.json";
import gmcImages from "@/data/trims/gmc-images.json";
import bmwTrims from "@/data/trims/bmw.json";
import bmwImages from "@/data/trims/bmw-images.json";
import mercedesTrims from "@/data/trims/mercedes-benz.json";
import mercedesImages from "@/data/trims/mercedes-benz-images.json";
import teslaTrims from "@/data/trims/tesla.json";
import teslaImages from "@/data/trims/tesla-images.json";
import volkswagenTrims from "@/data/trims/volkswagen.json";
import volkswagenImages from "@/data/trims/volkswagen-images.json";
import mazdaTrims from "@/data/trims/mazda.json";
import mazdaImages from "@/data/trims/mazda-images.json";

type CuratedByYear = Record<string, YearPerformance>;
type CuratedByModel = Record<string, CuratedByYear>;
type TrimImageMap = Record<
  string,
  Record<string, { src?: string; alt?: string; query?: string; commonsTitle?: string }>
>;

const CURATED_BY_MAKE: Record<string, CuratedByModel> = {
  toyota: toyotaTrims as CuratedByModel,
  ford: fordTrims as CuratedByModel,
  chevrolet: chevroletTrims as CuratedByModel,
  honda: hondaTrims as CuratedByModel,
  nissan: nissanTrims as CuratedByModel,
  hyundai: hyundaiTrims as CuratedByModel,
  kia: kiaTrims as CuratedByModel,
  subaru: subaruTrims as CuratedByModel,
  jeep: jeepTrims as CuratedByModel,
  gmc: gmcTrims as CuratedByModel,
  bmw: bmwTrims as CuratedByModel,
  "mercedes-benz": mercedesTrims as CuratedByModel,
  tesla: teslaTrims as CuratedByModel,
  volkswagen: volkswagenTrims as CuratedByModel,
  mazda: mazdaTrims as CuratedByModel,
};

const IMAGE_BY_MAKE: Record<string, TrimImageMap> = {
  toyota: toyotaImages as TrimImageMap,
  ford: fordImages as TrimImageMap,
  chevrolet: chevroletImages as TrimImageMap,
  honda: hondaImages as TrimImageMap,
  nissan: nissanImages as TrimImageMap,
  hyundai: hyundaiImages as TrimImageMap,
  kia: kiaImages as TrimImageMap,
  subaru: subaruImages as TrimImageMap,
  jeep: jeepImages as TrimImageMap,
  gmc: gmcImages as TrimImageMap,
  bmw: bmwImages as TrimImageMap,
  "mercedes-benz": mercedesImages as TrimImageMap,
  tesla: teslaImages as TrimImageMap,
  volkswagen: volkswagenImages as TrimImageMap,
  mazda: mazdaImages as TrimImageMap,
};

export function getCuratedPerformance(
  makeSlug: string,
  modelSlug: string,
  year: number,
): YearPerformance | undefined {
  const byModel = CURATED_BY_MAKE[makeSlug.toLowerCase()];
  if (!byModel) return undefined;
  const byYear = byModel[modelSlug.toLowerCase()];
  if (!byYear) return undefined;
  const raw = byYear[String(year)];
  if (!raw) return undefined;
  return attachTrimImages(makeSlug, modelSlug, raw);
}

function attachTrimImages(
  makeSlug: string,
  modelSlug: string,
  performance: YearPerformance,
): YearPerformance {
  const byModel = IMAGE_BY_MAKE[makeSlug.toLowerCase()];
  const byTrim = byModel?.[modelSlug.toLowerCase()];
  if (!byTrim) return performance;
  return {
    ...performance,
    trims: performance.trims.map((trim) => {
      const img = byTrim[trim.id];
      if (!img?.src) return trim;
      return { ...trim, image: img.src };
    }),
  };
}

function pickDefaultTrim(performance: YearPerformance): TrimSpec | undefined {
  if (!performance.trims.length) return undefined;
  if (performance.defaultTrimId) {
    const match = performance.trims.find(
      (t) => t.id === performance.defaultTrimId,
    );
    if (match) return match;
  }
  return performance.trims[0];
}

/** Copy trim efficiency into NHTSA specs when those fields are empty. */
function mergeTrimIntoSpecs(
  specs: VehicleSpecs | undefined,
  trim: TrimSpec | undefined,
): VehicleSpecs | undefined {
  if (!trim) return specs;
  const next: VehicleSpecs = { ...(specs ?? {}) };
  if (next.mpgCity == null && trim.mpgCity != null) next.mpgCity = trim.mpgCity;
  if (next.mpgHighway == null && trim.mpgHighway != null)
    next.mpgHighway = trim.mpgHighway;
  if (next.mpgCombined == null && trim.mpgCombined != null)
    next.mpgCombined = trim.mpgCombined;
  if (next.batteryKwh == null && trim.batteryKwh != null)
    next.batteryKwh = trim.batteryKwh;
  if (next.rangeMiles == null && trim.rangeMiles != null)
    next.rangeMiles = trim.rangeMiles;
  if (next.cargoCuFt == null && trim.cargoCuFt != null)
    next.cargoCuFt = trim.cargoCuFt;
  if (next.cargoSeatsFoldedCuFt == null && trim.cargoSeatsFoldedCuFt != null)
    next.cargoSeatsFoldedCuFt = trim.cargoSeatsFoldedCuFt;
  if (next.towingLb == null && trim.towingLb != null)
    next.towingLb = trim.towingLb;
  if (next.groundClearanceIn == null && trim.groundClearanceIn != null)
    next.groundClearanceIn = trim.groundClearanceIn;
  if (next.seatingCapacity == null && trim.seatingCapacity != null)
    next.seatingCapacity = trim.seatingCapacity;
  if (next.fuelTankGal == null && trim.fuelTankGal != null)
    next.fuelTankGal = trim.fuelTankGal;
  if (!next.driveType && trim.drivetrain) next.driveType = trim.drivetrain;
  if (!next.curbWeightLb && trim.curbWeightLb != null)
    next.curbWeightLb = String(trim.curbWeightLb);
  return next;
}

/** Attach curated trim/performance data onto a year entry. */
export function enrichYearEntry(
  makeSlug: string,
  modelSlug: string,
  year: YearEntry,
): YearEntry {
  const curated =
    year.performance ??
    getCuratedPerformance(makeSlug, modelSlug, year.year);
  if (!curated?.trims?.length) return year;

  const defaultTrim = pickDefaultTrim(curated);
  const specs = mergeTrimIntoSpecs(year.specs, defaultTrim);
  let images = year.images;
  if (defaultTrim?.image) {
    const trimImg = {
      src: defaultTrim.image,
      alt: `${year.year} ${makeSlug} ${modelSlug} — ${defaultTrim.name}`,
      width: 1280,
      height: 853,
    };
    images = [
      trimImg,
      ...year.images.filter((img) => img.src !== trimImg.src),
    ];
  }
  return {
    ...year,
    performance: curated,
    specs,
    images,
    sources: {
      ...year.sources,
      ...(year.sources?.epa
        ? {}
        : specs?.mpgCombined != null || specs?.rangeMiles != null
          ? { epa: "https://www.fueleconomy.gov/feg/download.shtml" }
          : {}),
    },
  };
}

/** Brands with curated trim overlays (for smoke tests). */
export function curatedMakeSlugs(): string[] {
  return Object.keys(CURATED_BY_MAKE).sort();
}
