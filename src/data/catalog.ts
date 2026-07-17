export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type YearEntry = {
  year: number;
  slug: string;
  summary: string;
  description: string;
  images: GalleryImage[];
};

export type ModelEntry = {
  name: string;
  slug: string;
  tagline: string;
  years: YearEntry[];
};

export type MakeEntry = {
  name: string;
  slug: string;
  country: string;
  blurb: string;
  coverImage: GalleryImage;
  models: ModelEntry[];
};

const img = (
  id: string,
  alt: string,
  width = 1600,
  height = 1067,
): GalleryImage => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`,
  alt,
  width,
  height,
});

export const SITE = {
  name: "motomediax",
  tagline: "All makes. All models. Clearer browsing.",
  description:
    "Browse high-quality car photos and model overviews by make, model, and year. motomediax is a fast, search-friendly catalog for enthusiasts.",
  url: "https://motomediax.com",
} as const;

export const catalog: MakeEntry[] = [
  {
    name: "Ferrari",
    slug: "ferrari",
    country: "Italy",
    blurb:
      "Maranello icons spanning V8 mid-engine thrills to V12 grand tourers.",
    coverImage: img(
      "photo-1583121274602-3e2820c69888",
      "Red Ferrari parked outdoors",
    ),
    models: [
      {
        name: "F8 Tributo",
        slug: "f8-tributo",
        tagline: "Twin-turbo V8 tribute to Ferrari’s mid-engine lineage.",
        years: [
          {
            year: 2020,
            slug: "2020",
            summary:
              "720 PS berlinetta with sculpted aero and a driver-focused cockpit.",
            description:
              "The 2020 Ferrari F8 Tributo pairs a 3.9-liter twin-turbo V8 with aggressive cooling ducts and a clean glass rear deck. On motomediax you can explore studio and road photography that highlights the flying buttresses, side intakes, and signature exhaust cluster.",
            images: [
              img("photo-1583121274602-3e2820c69888", "Ferrari front three-quarter view"),
              img("photo-1492144534655-ae79c964c9d7", "Sports car on open road"),
              img("photo-1503376780353-7e6692767b70", "Low sports car profile"),
              img("photo-1544636331-e26879cd4d9b", "Supercar parked at dusk"),
              img("photo-1552519507-da3b142c6e3d", "Muscle and sports car street scene"),
              img("photo-1511919884226-fd3cad34687c", "Classic red sports car detail"),
            ],
          },
          {
            year: 2022,
            slug: "2022",
            summary: "Refined F8 package with continued aero excellence.",
            description:
              "The 2022 F8 Tributo keeps the same thrilling powertrain while photographers capture updated liveries and show-floor presentations. This gallery focuses on lighting, reflection, and form language that define modern Ferrari berlinettas.",
            images: [
              img("photo-1614162692292-7ac56d7f7f1e", "Modern Ferrari exterior"),
              img("photo-1606664515524-ed2f786a0bd6", "Red sports car front view"),
              img("photo-1617531653332-bd46c24f2068", "Luxury sports coupe"),
              img("photo-1617814076367-b759c7d7e738", "Performance car on asphalt"),
            ],
          },
        ],
      },
      {
        name: "Roma",
        slug: "roma",
        tagline: "Contemporary grand tourer with soft elegance.",
        years: [
          {
            year: 2021,
            slug: "2021",
            summary: "Elegant 2+ coupe with a twin-turbo V8 and minimal chrome.",
            description:
              "Ferrari Roma brings dolce vita proportions to a modern platform. Soft curves, a fastback silhouette, and a driver-oriented cabin make it a favorite for lifestyle and detail photography.",
            images: [
              img("photo-1618843479313-40f8afb4b4d8", "Elegant sports coupe"),
              img("photo-1502877338535-766e1452684d", "Luxury car side profile"),
              img("photo-1549317661-bd32c8ce0db2", "Car on coastal road"),
              img("photo-1489824904134-891ab64532f1", "City street sports car"),
              img("photo-1449965408869-eaa3f722e40d", "Driving perspective on highway"),
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Porsche",
    slug: "porsche",
    country: "Germany",
    blurb: "Precision sports cars from Stuttgart, from 911 icons to GT machinery.",
    coverImage: img(
      "photo-1503376780353-7e6692767b70",
      "Porsche sports car on road",
    ),
    models: [
      {
        name: "911 Carrera",
        slug: "911-carrera",
        tagline: "The everyday legend with rear-engine balance.",
        years: [
          {
            year: 2019,
            slug: "2019",
            summary: "992-generation Carrera with wider stance and digital cockpit.",
            description:
              "The 2019 Porsche 911 Carrera introduced the 992 body with broader shoulders and refined LED lighting. Galleries emphasize the iconic silhouette from every angle—front fascia, rear haunches, and cabin craft.",
            images: [
              img("photo-1503376780353-7e6692767b70", "Porsche 911 on wet road"),
              img("photo-1614200179396-2bdb77ebf81b", "Silver Porsche front"),
              img("photo-1611821064430-0d40291d0f0b", "Porsche rear detail"),
              img("photo-1614162692292-7ac56d7f7f1e", "Performance coupe exterior"),
              img("photo-1492144534655-ae79c964c9d7", "Sports car night lights"),
              img("photo-1553440569-bcc63803a83d", "Luxury car showroom feel"),
            ],
          },
          {
            year: 2023,
            slug: "2023",
            summary: "Updated Carrera with sharper lighting and chassis polish.",
            description:
              "2023 Carrera photography showcases modern paint options and wheel designs that keep the 911 formula fresh. Use these images to study proportion and surface tension that make the model instantly recognizable.",
            images: [
              img("photo-1614200179396-2bdb77ebf81b", "Porsche front fascia"),
              img("photo-1606664515524-ed2f786a0bd6", "Sports car head-on"),
              img("photo-1544636331-e26879cd4d9b", "Supercar at twilight"),
              img("photo-1511919884226-fd3cad34687c", "Classic sports car curves"),
            ],
          },
        ],
      },
      {
        name: "Taycan",
        slug: "taycan",
        tagline: "Electric Porsche with GT proportions.",
        years: [
          {
            year: 2021,
            slug: "2021",
            summary: "All-electric sports sedan with instant torque and clean lines.",
            description:
              "The Taycan translates Porsche DNA into an electric architecture. Long hood, arched roofline, and four-door practicality make it a strong subject for both architectural and lifestyle shoots.",
            images: [
              img("photo-1617814076367-b759c7d7e738", "Electric performance sedan"),
              img("photo-1617531653332-bd46c24f2068", "Modern luxury coupe"),
              img("photo-1549317661-bd32c8ce0db2", "Car driving coastal highway"),
              img("photo-1489824904134-891ab64532f1", "Urban car photography"),
              img("photo-1449965408869-eaa3f722e40d", "Dashboard driving view"),
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Lamborghini",
    slug: "lamborghini",
    country: "Italy",
    blurb: "Dramatic wedges and V12 theater from Sant’Agata.",
    coverImage: img(
      "photo-1544636331-e26879cd4d9b",
      "Lamborghini supercar at dusk",
    ),
    models: [
      {
        name: "Huracán",
        slug: "huracan",
        tagline: "V10 supercar with razor edges and track pedigree.",
        years: [
          {
            year: 2020,
            slug: "2020",
            summary: "Naturally aspirated V10 drama in a compact supercar package.",
            description:
              "Huracán galleries celebrate Y-shaped lighting, hexagonal motifs, and aggressive aero. Whether on circuit or city streets, the model’s geometry photographs with high contrast and strong silhouettes.",
            images: [
              img("photo-1544636331-e26879cd4d9b", "Lamborghini side profile dusk"),
              img("photo-1511919884226-fd3cad34687c", "Red exotic car"),
              img("photo-1583121274602-3e2820c69888", "Italian supercar parked"),
              img("photo-1492144534655-ae79c964c9d7", "Exotic car night shot"),
              img("photo-1552519507-da3b142c6e3d", "Powerful car on street"),
              img("photo-1503376780353-7e6692767b70", "Low sports car stance"),
            ],
          },
        ],
      },
      {
        name: "Urus",
        slug: "urus",
        tagline: "Super SUV with Lamborghini attitude.",
        years: [
          {
            year: 2022,
            slug: "2022",
            summary: "High-performance SUV blending utility and theater.",
            description:
              "Urus brings Lamborghini design language to an SUV silhouette—sharp creases, bold intakes, and a commanding stance. Ideal for urban and mountain backdrop photography.",
            images: [
              img("photo-1606664515524-ed2f786a0bd6", "Performance SUV front"),
              img("photo-1553440569-bcc63803a83d", "Luxury vehicle detail"),
              img("photo-1502877338535-766e1452684d", "Vehicle side profile"),
              img("photo-1618843479313-40f8afb4b4d8", "Modern premium vehicle"),
            ],
          },
        ],
      },
    ],
  },
  {
    name: "BMW",
    slug: "bmw",
    country: "Germany",
    blurb: "Driver-focused machines from Munich across coupe and M lines.",
    coverImage: img(
      "photo-1555215695-3004980ad54e",
      "BMW parked in modern setting",
    ),
    models: [
      {
        name: "M4 Competition",
        slug: "m4-competition",
        tagline: "Twin-turbo straight-six coupe with track intent.",
        years: [
          {
            year: 2021,
            slug: "2021",
            summary: "G82 M4 Competition with bold grille and adaptive chassis.",
            description:
              "The M4 Competition pairs aggressive front graphics with a planted coupe stance. Galleries highlight kidney grille proportions, carbon accents, and exhaust finishes that signal M performance.",
            images: [
              img("photo-1555215695-3004980ad54e", "BMW M coupe exterior"),
              img("photo-1617531653332-bd46c24f2068", "Performance coupe"),
              img("photo-1617814076367-b759c7d7e738", "Sports sedan on road"),
              img("photo-1492144534655-ae79c964c9d7", "Car with dramatic lighting"),
              img("photo-1549317661-bd32c8ce0db2", "Car on scenic route"),
            ],
          },
          {
            year: 2024,
            slug: "2024",
            summary: "Updated M4 Competition with refined tech and presence.",
            description:
              "Later M4 Competition photography emphasizes new wheel designs and paint-to-surface interplay. Study how light wraps the hood powerdome and rear spoiler for editorial compositions.",
            images: [
              img("photo-1555215695-3004980ad54e", "BMW front three-quarter"),
              img("photo-1606664515524-ed2f786a0bd6", "Aggressive front end"),
              img("photo-1489824904134-891ab64532f1", "Car in city environment"),
              img("photo-1449965408869-eaa3f722e40d", "Driver view highway"),
            ],
          },
        ],
      },
      {
        name: "iX",
        slug: "ix",
        tagline: "Electric SAV with futurist cabin design.",
        years: [
          {
            year: 2022,
            slug: "2022",
            summary: "Flagship electric SAV focused on space and quiet speed.",
            description:
              "BMW iX photography leans into large surfaces, slim lighting, and a cabin that feels like a lounge. Useful references for modern EV proportion and interior ambient design.",
            images: [
              img("photo-1618843479313-40f8afb4b4d8", "Modern EV crossover"),
              img("photo-1553440569-bcc63803a83d", "Premium vehicle cabin vibe"),
              img("photo-1502877338535-766e1452684d", "Vehicle silhouette"),
              img("photo-1549317661-bd32c8ce0db2", "Open-road driving"),
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Mercedes-Benz",
    slug: "mercedes-benz",
    country: "Germany",
    blurb: "Luxury and AMG performance across sedans, coupes, and EVs.",
    coverImage: img(
      "photo-1618843479313-40f8afb4b4d8",
      "Mercedes luxury coupe",
    ),
    models: [
      {
        name: "AMG GT",
        slug: "amg-gt",
        tagline: "Front-engine sports car with Affalterbach bite.",
        years: [
          {
            year: 2019,
            slug: "2019",
            summary: "Long-hood sports coupe with twin-turbo V8 character.",
            description:
              "AMG GT imagery celebrates the long hood, short deck, and muscular fenders. Perfect for studying classic proportions with modern performance detailing.",
            images: [
              img("photo-1618843479313-40f8afb4b4d8", "AMG GT style coupe"),
              img("photo-1492144534655-ae79c964c9d7", "Night sports car"),
              img("photo-1503376780353-7e6692767b70", "Low sports car"),
              img("photo-1544636331-e26879cd4d9b", "Exotic at sunset"),
              img("photo-1511919884226-fd3cad34687c", "Red performance car"),
            ],
          },
        ],
      },
      {
        name: "EQS",
        slug: "eqs",
        tagline: "Flagship electric sedan with seamless surfaces.",
        years: [
          {
            year: 2022,
            slug: "2022",
            summary: "Aerodynamic EV sedan with Hyperscreen cabin concept.",
            description:
              "EQS galleries focus on continuous body sides, illuminated grille treatments, and a serene interior. A strong reference for luxury EV photography and UI-adjacent cabin storytelling.",
            images: [
              img("photo-1553440569-bcc63803a83d", "Luxury sedan presentation"),
              img("photo-1617531653332-bd46c24f2068", "Premium modern car"),
              img("photo-1489824904134-891ab64532f1", "Urban luxury car"),
              img("photo-1449965408869-eaa3f722e40d", "Highway cruise"),
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Audi",
    slug: "audi",
    country: "Germany",
    blurb: "Quattro grip and progressive design from Ingolstadt.",
    coverImage: img(
      "photo-1606664515524-ed2f786a0bd6",
      "Audi performance car front",
    ),
    models: [
      {
        name: "R8",
        slug: "r8",
        tagline: "Mid-engine supercar with everyday usability.",
        years: [
          {
            year: 2020,
            slug: "2020",
            summary: "V10 R8 with sideblade drama and all-wheel traction.",
            description:
              "The Audi R8’s sideblades and continuous light signature create unmistakable profiles. Galleries here emphasize contrast between glass, aluminum, and painted surfaces.",
            images: [
              img("photo-1606664515524-ed2f786a0bd6", "Audi R8 style front"),
              img("photo-1544636331-e26879cd4d9b", "Supercar evening light"),
              img("photo-1492144534655-ae79c964c9d7", "Sports car reflections"),
              img("photo-1503376780353-7e6692767b70", "Sports car motion feel"),
              img("photo-1583121274602-3e2820c69888", "Exotic parked outdoors"),
            ],
          },
        ],
      },
      {
        name: "e-tron GT",
        slug: "e-tron-gt",
        tagline: "Electric grand tourer with quattro confidence.",
        years: [
          {
            year: 2022,
            slug: "2022",
            summary: "Sleek EV coupe-sedan with dramatic lighting choreography.",
            description:
              "e-tron GT photography leans on low stance, blade lighting, and aero wheels. Excellent for showcasing how EV proportions can still feel athletic.",
            images: [
              img("photo-1617814076367-b759c7d7e738", "Electric GT on asphalt"),
              img("photo-1617531653332-bd46c24f2068", "Sleek performance car"),
              img("photo-1618843479313-40f8afb4b4d8", "Modern coupe design"),
              img("photo-1549317661-bd32c8ce0db2", "Coastal drive"),
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Ford",
    slug: "ford",
    country: "USA",
    blurb: "American icons from Mustang muscle to heritage specials.",
    coverImage: img(
      "photo-1552519507-da3b142c6e3d",
      "Ford Mustang on street",
    ),
    models: [
      {
        name: "Mustang GT",
        slug: "mustang-gt",
        tagline: "Pony car attitude with V8 soundtrack.",
        years: [
          {
            year: 2018,
            slug: "2018",
            summary: "S550 Mustang GT with classic long-hood proportions.",
            description:
              "Mustang GT galleries capture grille aggression, tri-bar taillights, and muscle-car stance. A staple for enthusiasts comparing generations and paint schemes.",
            images: [
              img("photo-1552519507-da3b142c6e3d", "Orange Mustang street"),
              img("photo-1492144534655-ae79c964c9d7", "Sports car nightlife"),
              img("photo-1503376780353-7e6692767b70", "Performance car road"),
              img("photo-1511919884226-fd3cad34687c", "Classic American curves"),
              img("photo-1489824904134-891ab64532f1", "Car in urban setting"),
            ],
          },
          {
            year: 2024,
            slug: "2024",
            summary: "S650 Mustang GT with refreshed lighting and cabin tech.",
            description:
              "The latest Mustang GT keeps the pony-car formula while modernizing surfaces and screens. Explore photography that contrasts heritage cues with contemporary detailing.",
            images: [
              img("photo-1552519507-da3b142c6e3d", "Mustang front quarter"),
              img("photo-1606664515524-ed2f786a0bd6", "Aggressive fascia"),
              img("photo-1544636331-e26879cd4d9b", "Sunset car shoot"),
              img("photo-1449965408869-eaa3f722e40d", "Open highway drive"),
            ],
          },
        ],
      },
      {
        name: "GT",
        slug: "gt",
        tagline: "Halo supercar with racing heritage.",
        years: [
          {
            year: 2019,
            slug: "2019",
            summary: "Mid-engine Ford GT with Le Mans DNA.",
            description:
              "Ford GT imagery highlights flying buttresses, door cut lines, and race-bred aero. Ideal for studying extreme proportions in a street-legal package.",
            images: [
              img("photo-1544636331-e26879cd4d9b", "Supercar dramatic light"),
              img("photo-1583121274602-3e2820c69888", "Exotic red car"),
              img("photo-1492144534655-ae79c964c9d7", "Night performance car"),
              img("photo-1503376780353-7e6692767b70", "Low-slung sports car"),
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Chevrolet",
    slug: "chevrolet",
    country: "USA",
    blurb: "Corvette legends and American performance staples.",
    coverImage: img(
      "photo-1552519507-da3b142c6e3d",
      "American performance car",
    ),
    models: [
      {
        name: "Corvette Stingray",
        slug: "corvette-stingray",
        tagline: "Mid-engine American sports car for the modern era.",
        years: [
          {
            year: 2020,
            slug: "2020",
            summary: "C8 Stingray reinvented with mid-engine layout.",
            description:
              "The C8 Corvette Stingray flipped the layout and the visual balance. Galleries emphasize the short nose, towering rear fenders, and removable roof panel lifestyle.",
            images: [
              img("photo-1552519507-da3b142c6e3d", "Corvette-style muscle car"),
              img("photo-1492144534655-ae79c964c9d7", "Sports car after dark"),
              img("photo-1503376780353-7e6692767b70", "Sports car wet pavement"),
              img("photo-1544636331-e26879cd4d9b", "Performance car dusk"),
              img("photo-1511919884226-fd3cad34687c", "Curvy sports car body"),
              img("photo-1606664515524-ed2f786a0bd6", "Front-end drama"),
            ],
          },
          {
            year: 2023,
            slug: "2023",
            summary: "Updated Stingray with sharper appearance packages.",
            description:
              "Later Stingray model years add appearance and aero packages that photograph with stronger contrast. Compare wheel designs and splitter shapes across this gallery set.",
            images: [
              img("photo-1617814076367-b759c7d7e738", "American sports car road"),
              img("photo-1617531653332-bd46c24f2068", "Coupe performance look"),
              img("photo-1489824904134-891ab64532f1", "Street car photography"),
              img("photo-1449965408869-eaa3f722e40d", "Road trip perspective"),
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Tesla",
    slug: "tesla",
    country: "USA",
    blurb: "Electric volume leaders with minimalist design language.",
    coverImage: img(
      "photo-1560958089-b8a1929cea89",
      "Tesla on coastal road",
    ),
    models: [
      {
        name: "Model S",
        slug: "model-s",
        tagline: "Flagship EV sedan with long range and speed.",
        years: [
          {
            year: 2021,
            slug: "2021",
            summary: "Plaid-era Model S with yoke steering and refreshed cabin.",
            description:
              "Model S photography focuses on flush door handles, clean body sides, and a screen-forward interior. Useful for modern EV editorial and product-style detail shots.",
            images: [
              img("photo-1560958089-b8a1929cea89", "Tesla Model S coastal"),
              img("photo-1617814076367-b759c7d7e738", "EV sedan performance"),
              img("photo-1553440569-bcc63803a83d", "Luxury EV presentation"),
              img("photo-1549317661-bd32c8ce0db2", "Scenic highway EV"),
              img("photo-1449965408869-eaa3f722e40d", "Driver highway view"),
            ],
          },
        ],
      },
      {
        name: "Model 3",
        slug: "model-3",
        tagline: "Compact electric sedan that scaled the brand.",
        years: [
          {
            year: 2020,
            slug: "2020",
            summary: "Volume EV with minimal controls and strong efficiency.",
            description:
              "Model 3 galleries show how restraint can still feel premium. Capture reflections on the hatch glass and the simplicity of the dashboard for catalog storytelling.",
            images: [
              img("photo-1560958089-b8a1929cea89", "Tesla on open road"),
              img("photo-1617531653332-bd46c24f2068", "Clean modern sedan"),
              img("photo-1489824904134-891ab64532f1", "City EV commute"),
              img("photo-1502877338535-766e1452684d", "Sedan side profile"),
            ],
          },
        ],
      },
    ],
  },
  {
    name: "McLaren",
    slug: "mclaren",
    country: "United Kingdom",
    blurb: "Carbon-tub supercars with dihedral doors and track focus.",
    coverImage: img(
      "photo-1544636331-e26879cd4d9b",
      "McLaren-style supercar",
    ),
    models: [
      {
        name: "720S",
        slug: "720s",
        tagline: "Twin-turbo V8 supercar with eye-socket headlights.",
        years: [
          {
            year: 2018,
            slug: "2018",
            summary: "Super Series McLaren with extreme aero efficiency.",
            description:
              "The 720S is defined by double-skin doors and distinctive lighting. Galleries reward careful study of negative space in the front fenders and the glass canopy silhouette.",
            images: [
              img("photo-1544636331-e26879cd4d9b", "McLaren supercar dusk"),
              img("photo-1583121274602-3e2820c69888", "Exotic supercar park"),
              img("photo-1492144534655-ae79c964c9d7", "Supercar neon night"),
              img("photo-1503376780353-7e6692767b70", "Sports car speed feel"),
              img("photo-1511919884226-fd3cad34687c", "Exotic body curves"),
              img("photo-1606664515524-ed2f786a0bd6", "Sharp front fascia"),
            ],
          },
        ],
      },
      {
        name: "Artura",
        slug: "artura",
        tagline: "Hybrid supercar for the next McLaren era.",
        years: [
          {
            year: 2023,
            slug: "2023",
            summary: "Plug-in hybrid with compact V6 and electric assist.",
            description:
              "Artura photography explores a new McLaren face and tighter packaging. Look for dihedral doors, active aero cues, and cabin minimalism in this set.",
            images: [
              img("photo-1617814076367-b759c7d7e738", "Modern supercar asphalt"),
              img("photo-1617531653332-bd46c24f2068", "Contemporary sports car"),
              img("photo-1618843479313-40f8afb4b4d8", "Premium coupe lines"),
              img("photo-1549317661-bd32c8ce0db2", "Scenic performance drive"),
            ],
          },
        ],
      },
    ],
  },
];
