export const ODYSSEUS_SITE_ITEM_ID =
  process.env.NEXT_PUBLIC_ODYSSEUS_SIID ??
  process.env.NEXT_PUBLIC_ODYSSEUS_SITE_ITEM_ID ??
  "1412312";

export const ODYSSEUS_LANGUAGE_ID = process.env.NEXT_PUBLIC_ODYSSEUS_LANGUAGE_ID ?? "1";

export const ODYSSEUS_DOMAIN = (
  process.env.NEXT_PUBLIC_ODYSSEUS_DOMAIN ?? "res.cruisemaster-me.com"
)
  .replace(/^https?:\/\//, "")
  .replace(/\/+$/, "");

export const ODYSSEUS_SID1 = process.env.NEXT_PUBLIC_ODYSSEUS_SID1 ?? "";
export const ODYSSEUS_SID2 = process.env.NEXT_PUBLIC_ODYSSEUS_SID2 ?? "";
export const ODYSSEUS_REFERRER = process.env.NEXT_PUBLIC_ODYSSEUS_REFERRER ?? "";

type DestinationDirectoryEntry = {
  id: number;
  name: string;
};

type ShipDirectoryEntry = {
  id: number;
  name: string;
  pathName?: string;
  aliases?: string[];
};

type CruiseLineShipDirectoryEntry = {
  cruiseLineId: number;
  pathPrefix: string;
  ships: ShipDirectoryEntry[];
};

type CruiseLineDirectoryEntry = {
  cruiseLineId: number;
  pathPrefix: string;
};

const destinationDirectory = [
  { id: 2, name: "Africa" },
  { id: 1, name: "Alaska" },
  { id: 99, name: "Amazon River (South America)" },
  { id: 54, name: "Arabian Gulf" },
  { id: 19, name: "Asia and Asia Pacific" },
  { id: 58, name: "Australasia" },
  { id: 104, name: "Australia" },
  { id: 29, name: "Australia/New Zealand" },
  { id: 7, name: "Bahamas" },
  { id: 55, name: "Baja Mexico" },
  { id: 142, name: "Baltic Sea (Europe)" },
  { id: 8, name: "Bermuda" },
  { id: 121, name: "British Isles" },
  { id: 26, name: "Canada / New England" },
  { id: 68, name: "Canary Islands" },
  { id: 9, name: "Caribbean" },
  { id: 10, name: "Caribbean Eastern" },
  { id: 13, name: "Caribbean Southern" },
  { id: 14, name: "Caribbean Western" },
  { id: 77, name: "Danube (Europe)" },
  { id: 82, name: "Dordogne (Europe)" },
  { id: 85, name: "Douro (Europe)" },
  { id: 80, name: "Dutchand Belgian Waterways (Europe)" },
  { id: 38, name: "Eastern Europe" },
  { id: 16, name: "Eastern Mediterranean" },
  { id: 15, name: "Europe" },
  { id: 176, name: "Fiji" },
  { id: 60, name: "Galapagos" },
  { id: 81, name: "Garonne (Europe)" },
  { id: 95, name: "Gironde (Europe)" },
  { id: 61, name: "Greenland" },
  { id: 119, name: "Ha Long Bay (Vietnam)" },
  { id: 21, name: "Hawaii" },
  { id: 122, name: "Iceland" },
  { id: 63, name: "Indian Ocean" },
  { id: 124, name: "Japan" },
  { id: 194, name: "Magdalena River" },
  { id: 78, name: "Main (Europe)" },
  { id: 75, name: "Mediterranean" },
  { id: 86, name: "Mekong (Asia)" },
  { id: 56, name: "Mexican Riviera" },
  { id: 24, name: "Mexico" },
  { id: 31, name: "Middle East" },
  { id: 79, name: "Moselle (Europe)" },
  { id: 105, name: "New Zealand" },
  { id: 94, name: "Nile (Africa)" },
  { id: 39, name: "Northern Europe" },
  { id: 188, name: "Norway" },
  { id: 45, name: "Pacific" },
  { id: 47, name: "Pacific Coastal" },
  { id: 49, name: "Panama Canal" },
  { id: 52, name: "Repositioning" },
  { id: 76, name: "Rhine (Europe)" },
  { id: 84, name: "Rhone (Europe)" },
  { id: 102, name: "Saone (Europe)" },
  { id: 83, name: "Seine (Europe)" },
  { id: 32, name: "South America" },
  { id: 44, name: "South Pacific" },
  { id: 130, name: "Southeast Asia" },
  { id: 40, name: "Southern Europe" },
  { id: 66, name: "Tasmania" },
  { id: 34, name: "Transatlantic" },
  { id: 192, name: "Transpacific" },
  { id: 175, name: "Vanuatu" },
  { id: 41, name: "Western Europe" },
  { id: 18, name: "Western Mediterranean" },
  { id: 36, name: "World Cruise" },
] satisfies DestinationDirectoryEntry[];

function normalizeDestinationName(name: string) {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

function toDestinationSlug(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[/'"]/g, " ")
    .replace(/[()]/g, " ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const destinationDirectoryByName = new Map(
  destinationDirectory.map((entry) => [normalizeDestinationName(entry.name), entry]),
);

export function getOdysseusDestinationByName(name: string) {
  return destinationDirectoryByName.get(normalizeDestinationName(name)) ?? null;
}

export function buildOdysseusDestinationUrl(name: string) {
  const destination = getOdysseusDestinationByName(name);

  if (!destination) {
    return null;
  }

  const url = new URL(
    `https://${ODYSSEUS_DOMAIN}/swift/cruise/destination/${toDestinationSlug(destination.name)}`,
  );

  url.searchParams.set("siid", ODYSSEUS_SITE_ITEM_ID);
  url.searchParams.set("lang", ODYSSEUS_LANGUAGE_ID);
  url.searchParams.set("destinations", String(destination.id));
  url.searchParams.set("destinationType", "All");
  url.searchParams.set("activeTab", "CruiseLineCalendar");
  url.searchParams.set("showPromoCodes", "true");

  return url.toString();
}

const cruiseLineShipDirectory = {
  "norwegian-cruise-line": {
    cruiseLineId: 6,
    pathPrefix: "norwegian-cruise-line",
    ships: [
      { id: 15329, name: "Norwegian Aqua" },
      { id: 15614, name: "Norwegian Aura" },
      { id: 13670, name: "Norwegian Bliss" },
      { id: 13507, name: "Norwegian Breakaway" },
      { id: 48, name: "Norwegian Dawn" },
      { id: 14090, name: "Norwegian Encore" },
      { id: 13236, name: "Norwegian Epic" },
      { id: 13669, name: "Norwegian Escape" },
      { id: 1100, name: "Norwegian Gem" },
      { id: 13608, name: "Norwegian Getaway" },
      { id: 1159, name: "Norwegian Jade" },
      { id: 95, name: "Norwegian Jewel" },
      { id: 13867, name: "Norwegian Joy" },
      { id: 15413, name: "Norwegian Luna" },
      { id: 1097, name: "Norwegian Pearl" },
      { id: 15089, name: "Norwegian Prima" },
      { id: 1179, name: "Norwegian Sky" },
      { id: 94, name: "Norwegian Spirit" },
      { id: 52, name: "Norwegian Star" },
      { id: 53, name: "Norwegian Sun" },
      { id: 15159, name: "Norwegian Viva" },
      { id: 56, name: "Pride of America" },
    ],
  },
  "celestyal-cruises": {
    cruiseLineId: 8224,
    pathPrefix: "celestyal-cruises",
    ships: [
      { id: 15337, name: "Celestyal Discovery" },
      { id: 15259, name: "Celestyal Journey" },
    ],
  },
  "royal-caribbean-international": {
    cruiseLineId: 8,
    pathPrefix: "royal-caribbean-international",
    ships: [
      { id: 71, name: "Adventure of the Seas" },
      { id: 13233, name: "Allure of the Seas" },
      { id: 13646, name: "Anthem of the Seas" },
      { id: 72, name: "Brilliance of the Seas" },
      { id: 73, name: "Enchantment of the Seas" },
      { id: 74, name: "Explorer of the Seas" },
      { id: 116, name: "Freedom of the Seas" },
      { id: 75, name: "Grandeur of the Seas" },
      { id: 13716, name: "Harmony of the Seas" },
      { id: 15128, name: "Icon of the Seas" },
      { id: 1116, name: "Independence of the Seas" },
      { id: 76, name: "Jewel of the Seas" },
      { id: 15469, name: "Legend of the Seas" },
      { id: 1093, name: "Liberty of the Seas" },
      { id: 79, name: "Mariner of the Seas" },
      { id: 81, name: "Navigator of the Seas" },
      { id: 1191, name: "Oasis of the Seas" },
      { id: 14698, name: "Odyssey of the Seas" },
      { id: 13717, name: "Ovation of the Seas" },
      { id: 13645, name: "Quantum of the Seas" },
      { id: 83, name: "Radiance of the Seas" },
      { id: 84, name: "Rhapsody of the Seas" },
      { id: 85, name: "Serenade of the Seas" },
      { id: 14118, name: "Spectrum of the Seas" },
      { id: 13825, name: "Symphony of the Seas" },
      { id: 15330, name: "Star of the Seas" },
      { id: 15215, name: "Utopia of the Seas" },
      { id: 88, name: "Vision of the Seas" },
      { id: 89, name: "Voyager of the Seas" },
      { id: 14719, name: "Wonder of the Seas" },
    ],
  },
  "princess-cruises": {
    cruiseLineId: 7,
    pathPrefix: "princess-cruises",
    ships: [
      { id: 57, name: "Caribbean Princess" },
      { id: 58, name: "Coral Princess" },
      { id: 114, name: "Crown Princess" },
      { id: 60, name: "Diamond Princess" },
      { id: 14718, name: "Discovery Princess" },
      { id: 1098, name: "Emerald Princess" },
      { id: 14304, name: "Enchanted Princess" },
      { id: 62, name: "Grand Princess" },
      { id: 63, name: "Island Princess" },
      { id: 13762, name: "Majestic Princess" },
      { id: 65, name: "Regal Princess" },
      { id: 66, name: "Royal Princess" },
      { id: 1162, name: "Ruby Princess" },
      { id: 67, name: "Sapphire Princess" },
      { id: 14053, name: "Sky Princess" },
      { id: 15302, name: "Star Princess" },
      { id: 15222, name: "Sun Princess" },
    ],
  },
  cunard: {
    cruiseLineId: 12,
    pathPrefix: "cunard",
    ships: [
      { id: 13231, name: "Queen Elizabeth" },
      { id: 15168, name: "Queen Anne" },
      { id: 118, name: "Queen Mary 2" },
      { id: 135, name: "Queen Victoria" },
    ],
  },
  "p-and-o-cruises": {
    cruiseLineId: 16,
    pathPrefix: "p-and-o-cruises",
    ships: [
      { id: 15107, name: "Arvia" },
      { id: 14277, name: "Iona" },
      { id: 13684, name: "Britannia" },
      { id: 13257, name: "Azura" },
      { id: 13258, name: "Ventura" },
      { id: 128, name: "Arcadia" },
      { id: 130, name: "Aurora" },
    ],
  },
  "oceania-cruises": {
    cruiseLineId: 14,
    pathPrefix: "oceania-cruises",
    ships: [
      { id: 15257, name: "Allura" },
      { id: 120, name: "Insignia", aliases: ["Oceania Insignia"] },
      { id: 13241, name: "Marina", aliases: ["Oceania Marina"] },
      { id: 121, name: "Nautica", aliases: ["Oceania Nautica"] },
      { id: 122, name: "Regatta", aliases: ["Oceania Regatta"] },
      { id: 13485, name: "Riviera", aliases: ["Oceania Riviera"] },
      { id: 13715, name: "Sirena", aliases: ["Oceania Sirena"] },
      { id: 15084, name: "Vista", aliases: ["Oceania Vista"] },
    ],
  },
  "regent-seven-seas-cruises": {
    cruiseLineId: 8116,
    pathPrefix: "regent-seven-seas-cruises",
    ships: [
      { id: 13713, name: "Seven Seas Explorer" },
      { id: 15109, name: "Seven Seas Grandeur" },
      { id: 13295, name: "Seven Seas Mariner" },
      { id: 13296, name: "Seven Seas Navigator" },
      {
        id: 15386,
        name: "Seven Seas Prestige (2026)",
        pathName: "Seven Seas Prestige",
        aliases: ["Seven Seas Prestige"],
      },
      { id: 14106, name: "Seven Seas Splendor" },
      { id: 13294, name: "Seven Seas Voyager" },
    ],
  },
  "celebrity-cruises": {
    cruiseLineId: 2,
    pathPrefix: "celebrity-cruises",
    ships: [
      { id: 14393, name: "Celebrity Apex" },
      { id: 15141, name: "Celebrity Ascent" },
      { id: 14948, name: "Celebrity Beyond" },
      { id: 21, name: "Celebrity Constellation" },
      { id: 13232, name: "Celebrity Eclipse" },
      { id: 13858, name: "Celebrity Edge" },
      { id: 1176, name: "Celebrity Equinox" },
      { id: 24, name: "Celebrity Infinity" },
      { id: 26, name: "Celebrity Millennium" },
      { id: 13486, name: "Celebrity Reflection" },
      { id: 13281, name: "Celebrity Silhouette" },
      { id: 1117, name: "Celebrity Solstice" },
      { id: 27, name: "Celebrity Summit" },
      { id: 15336, name: "Celebrity Xcel" },
      {
        id: 15602,
        name: "Celebrity Xcite (on order for 2028)",
        pathName: "Celebrity Xcite",
        aliases: ["Celebrity Xcite"],
      },
    ],
  },
  "carnival-cruise-line": {
    cruiseLineId: 1,
    pathPrefix: "carnival-cruise-line",
    ships: [
      { id: 15443, name: "Carnival Adventure" },
      { id: 13487, name: "Carnival Breeze" },
      { id: 14965, name: "Carnival Celebration" },
      { id: 1, name: "Carnival Conquest" },
      { id: 1182, name: "Carnival Dream" },
      { id: 11, name: "Carnival Elation" },
      { id: 15444, name: "Carnival Encounter" },
      { id: 15555, name: "Carnival Festivale" },
      { id: 1096, name: "Carnival Freedom" },
      { id: 15264, name: "Carnival Firenze" },
      { id: 3, name: "Carnival Glory" },
      { id: 13797, name: "Carnival Horizon" },
      { id: 15130, name: "Carnival Jubilee" },
      { id: 4, name: "Carnival Legend" },
      { id: 96, name: "Carnival Liberty" },
      { id: 15213, name: "Carnival Luminosa" },
      { id: 13256, name: "Carnival Magic" },
      { id: 5, name: "Carnival Miracle" },
      { id: 14073, name: "Carnival Panorama" },
      { id: 17, name: "Carnival Paradise" },
      { id: 18, name: "Carnival Pride" },
      { id: 14383, name: "Carnival Radiance" },
      { id: 6, name: "Carnival Spirit" },
      { id: 1163, name: "Carnival Splendor" },
      { id: 14270, name: "Carnival Sunrise" },
      { id: 13509, name: "Carnival Sunshine" },
      { id: 93, name: "Carnival Valor" },
      { id: 15239, name: "Carnival Venezia" },
      { id: 13712, name: "Carnival Vista" },
      { id: 14471, name: "Mardi Gras" },
    ],
  },
  "ama-waterways": {
    cruiseLineId: 8138,
    pathPrefix: "amawaterways",
    ships: [
      { id: 13393, name: "AmaBella" },
      { id: 13385, name: "AmaCello" },
      { id: 13500, name: "AmaCerto" },
      { id: 14829, name: "AmaDahlia" },
      { id: 13386, name: "AmaDante" },
      { id: 13696, name: "AmaDara" },
      { id: 13380, name: "AmaDolce" },
      { id: 13387, name: "AmaDouro" },
      { id: 15571, name: "AmaFiora" },
      {
        id: 13388,
        name: "AmaKaterina",
        pathName: "AmaKatarina",
        aliases: ["AmaKatarina"],
      },
      { id: 13772, name: "AmaKristina" },
      { id: 13796, name: "AmaLea" },
      { id: 15225, name: "AmaLilia" },
      { id: 14712, name: "AmaLucia" },
      { id: 13383, name: "AmaLyra" },
      { id: 15260, name: "AmaMagdalena" },
      { id: 14047, name: "AmaMagna" },
      { id: 15398, name: "AmaMaya" },
      { id: 15261, name: "AmaMelodia" },
      { id: 14045, name: "AmaMora" },
      { id: 13522, name: "AmaPrima" },
      { id: 15563, name: "AmaRudi" },
      { id: 13628, name: "AmaReina" },
      { id: 13695, name: "AmaSerena" },
      { id: 14472, name: "AmaSiena" },
      { id: 15305, name: "AmaSintra" },
      { id: 15397, name: "AmaSofia" },
      { id: 13627, name: "AmaSonata" },
      { id: 13733, name: "AmaStella" },
      { id: 13771, name: "AmaVenita" },
      { id: 13392, name: "AmaVerde" },
      { id: 13523, name: "AmaVida" },
      { id: 13734, name: "AmaViola" },
      { id: 13524, name: "Zambezi Queen" },
    ],
  },
  "avalon-waterways": {
    cruiseLineId: 8121,
    pathPrefix: "avalon-waterways",
    ships: [
      { id: 13309, name: "Avalon Artistry II" },
      { id: 15224, name: "Avalon Alegria" },
      { id: 14084, name: "Avalon Envision" },
      { id: 13528, name: "Avalon Expression" },
      { id: 13652, name: "Avalon Illumination" },
      { id: 13306, name: "Avalon Imagery II" },
      { id: 13653, name: "Avalon Impression" },
      { id: 13299, name: "Avalon Panorama" },
      { id: 14085, name: "Avalon Passion" },
      { id: 13308, name: "Avalon Poetry II" },
      { id: 14086, name: "Avalon Saigon" },
      { id: 13699, name: "Avalon Siem Reap" },
      { id: 13307, name: "Avalon Tapestry II" },
      { id: 13697, name: "Avalon Tranquility II" },
      { id: 14478, name: "Avalon View" },
      { id: 13489, name: "Avalon Visionary" },
      { id: 13490, name: "Avalon Vista" },
      {
        id: 14088,
        name: "Delfin III (Charter)",
        pathName: "Delfin III",
        aliases: ["Delfin III"],
      },
      {
        id: 14740,
        name: "MS Farah (Charter)",
        pathName: "MS Farah",
        aliases: ["MS Farah"],
      },
      {
        id: 14089,
        name: "Ganges Voyager (Charter)",
        pathName: "Ganges Voyager",
        aliases: ["Ganges Voyager"],
      },
      {
        id: 14087,
        name: "Treasure of Galapagos (Charter)",
        pathName: "Treasure of Galápagos",
        aliases: ["Treasure of Galápagos", "Treasure of Galapagos"],
      },
    ],
  },
} satisfies Record<string, CruiseLineShipDirectoryEntry>;

const cruiseLineShipLookup = new Map(
  Object.entries(cruiseLineShipDirectory).map(([slug, entry]) => {
    const shipMap = new Map<string, ShipDirectoryEntry>();

    for (const ship of entry.ships as readonly ShipDirectoryEntry[]) {
      shipMap.set(normalizeShipName(ship.name), ship);

      for (const alias of ship.aliases ?? []) {
        shipMap.set(normalizeShipName(alias), ship);
      }
    }

    return [
      slug,
      {
        cruiseLineId: entry.cruiseLineId,
        pathPrefix: entry.pathPrefix,
        ships: shipMap,
      },
    ] as const;
  }),
);

const cruiseLineDirectory: Record<string, CruiseLineDirectoryEntry> = {
  "norwegian-cruise-line": {
    cruiseLineId: 6,
    pathPrefix: "norwegian-cruise-line",
  },
  "celestyal-cruises": {
    cruiseLineId: 8224,
    pathPrefix: "celestyal-cruises",
  },
  "royal-caribbean-international": {
    cruiseLineId: 8,
    pathPrefix: "royal-caribbean",
  },
  "princess-cruises": {
    cruiseLineId: 7,
    pathPrefix: "princess-cruise-line",
  },
  cunard: {
    cruiseLineId: 12,
    pathPrefix: "cunard-line",
  },
  "p-and-o-cruises": {
    cruiseLineId: 16,
    pathPrefix: "p-o-cruises-uk",
  },
  "oceania-cruises": {
    cruiseLineId: 14,
    pathPrefix: "oceania-cruises",
  },
  "regent-seven-seas-cruises": {
    cruiseLineId: 8116,
    pathPrefix: "regent-seven-seas",
  },
  "celebrity-cruises": {
    cruiseLineId: 2,
    pathPrefix: "celebrity-cruises",
  },
  "carnival-cruise-line": {
    cruiseLineId: 1,
    pathPrefix: "carnival-cruise-line",
  },
  "ama-waterways": {
    cruiseLineId: 8138,
    pathPrefix: "amawaterways",
  },
  "avalon-waterways": {
    cruiseLineId: 8121,
    pathPrefix: "avalon-waterways",
  },
};

function normalizeShipName(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function buildOdysseusShipUrl(cruiseLineSlug: string, shipName: string) {
  const cruiseLine = cruiseLineShipLookup.get(cruiseLineSlug);

  if (!cruiseLine) {
    return null;
  }

  const ship = cruiseLine.ships.get(normalizeShipName(shipName));

  if (!ship) {
    return null;
  }

  const pathShipName = ship.pathName ?? ship.name;
  const url = new URL(
    `https://${ODYSSEUS_DOMAIN}/swift/cruise/ship/${cruiseLine.pathPrefix}-${toDestinationSlug(pathShipName)}`,
  );

  url.searchParams.set("siid", ODYSSEUS_SITE_ITEM_ID);
  url.searchParams.set("lang", ODYSSEUS_LANGUAGE_ID);
  url.searchParams.set("CruiseLine", String(cruiseLine.cruiseLineId));
  url.searchParams.set("ship", String(ship.id));
  url.searchParams.set("showPromoCodes", "true");

  return url.toString();
}

export function buildOdysseusCruiseLineUrl(cruiseLineSlug: string) {
  const cruiseLine = cruiseLineDirectory[cruiseLineSlug];

  if (!cruiseLine) {
    return null;
  }

  const url = new URL(
    `https://${ODYSSEUS_DOMAIN}/swift/cruise/cruiseline/${cruiseLine.pathPrefix}`,
  );

  url.searchParams.set("siid", ODYSSEUS_SITE_ITEM_ID);
  url.searchParams.set("lang", ODYSSEUS_LANGUAGE_ID);
  url.searchParams.set("cruiseline", String(cruiseLine.cruiseLineId));
  url.searchParams.set("showPromoCodes", "true");

  return url.toString();
}
