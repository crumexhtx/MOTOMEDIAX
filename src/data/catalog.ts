export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type VehicleSpecs = {
  make?: string;
  model?: string;
  modelYear?: number;
  available?: boolean;
  bodyClass?: string;
  driveType?: string;
  fuelTypePrimary?: string;
  electrificationLevel?: string;
  plantCountry?: string;
  overallRating?: string;
  frontCrashRating?: string;
  sideCrashRating?: string;
  rolloverRating?: string;
  vehicleDescription?: string;
  trimCount?: number;
  trims?: string[];
  overallLengthIn?: string;
  overallWidthIn?: string;
  overallHeightIn?: string;
  wheelbaseIn?: string;
  curbWeightLb?: string;
  /** EPA / curated efficiency */
  mpgCity?: number;
  mpgHighway?: number;
  mpgCombined?: number;
  /** EV / PHEV */
  batteryKwh?: number;
  rangeMiles?: number;
  /** Practical */
  cargoCuFt?: number;
  cargoSeatsFoldedCuFt?: number;
  towingLb?: number;
  groundClearanceIn?: number;
  seatingCapacity?: number;
  fuelTankGal?: number;
};

/** Curated performance / trim row for hero stats + trim index. */
export type TrimSpec = {
  id: string;
  name: string;
  engine?: string;
  aspiration?: string;
  horsepower?: number;
  torqueLbFt?: number;
  zeroToSixtySec?: number;
  transmission?: string;
  drivetrain?: string;
  redlineRpm?: number;
  mpgCity?: number;
  mpgHighway?: number;
  mpgCombined?: number;
  batteryKwh?: number;
  rangeMiles?: number;
  cargoCuFt?: number;
  cargoSeatsFoldedCuFt?: number;
  towingLb?: number;
  groundClearanceIn?: number;
  seatingCapacity?: number;
  curbWeightLb?: number;
  fuelTankGal?: number;
  notes?: string;
  /** Local catalog path for this trim, e.g. /catalog/toyota--camry--hybrid-le.jpg */
  image?: string;
};

export type YearPerformance = {
  defaultTrimId?: string;
  trims: TrimSpec[];
};

export type CatalogSources = {
  wikipedia?: string;
  nhtsa?: string;
  epa?: string;
};

export type YearEntry = {
  year: number;
  slug: string;
  summary: string;
  description: string;
  highlights?: string[];
  images: GalleryImage[];
  specs?: VehicleSpecs;
  performance?: YearPerformance;
  sources?: CatalogSources;
};

export type ModelEntry = {
  name: string;
  slug: string;
  tagline: string;
  years: YearEntry[];
  sources?: CatalogSources;
};

export type MakeEntry = {
  name: string;
  slug: string;
  country: string;
  blurb: string;
  coverImage: GalleryImage;
  models: ModelEntry[];
};

export const SITE = {
  name: "motomediax",
  tagline: "All makes. All models. Clearer browsing.",
  description:
    "Browse high-quality car photos and model overviews by make, model, and year. motomediax is a fast, search-friendly catalog for enthusiasts.",
  /** Canonical site origin. Override with NEXT_PUBLIC_SITE_URL for previews/staging. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://motomediax.com").replace(
    /\/$/,
    "",
  ),
};
