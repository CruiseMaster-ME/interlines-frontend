type NavItem = {
  href: string;
  label: string;
};

export const primaryNav: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/cruise-lines", label: "Cruise Lines" },
  { href: "/faq", label: "FAQ" },
  { href: "/eligibility", label: "Eligibility" },
] as const;

export const headerNav: readonly NavItem[] = [];

export const legalNav: readonly NavItem[] = [
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
] as const;

export const cruiseLines = [
  {
    slug: "norwegian-cruise-line",
    name: "Norwegian Cruise Line",
    offersHref: "https://thecruisenews.com/cruises/norwegian-cruise-line/",
    logoSrc: "/assets/logos/partner-cruise-lines/norwegian-cruise-line.png",
    logoAlt: "Norwegian Cruise Line logo",
    logoClassName: "scale-[1.04]",
    imageSrc: "/assets/images/cruise-lines/norwegian-cruise-line.jpg",
    imageAlt: "Norwegian Luna at sea",
    detailImageSrc: "/assets/images/cruise-lines/norwegian-cruise-line-detail.jpg",
    detailImageAlt: "Norwegian Joy at sea",
    description:
      "Norwegian Cruise Line helped popularize flexible, resort-style cruising through its Freestyle concept, centered on open dining, casual dress and more personal pacing. It appeals to couples, families and groups looking for large-ship entertainment with plenty of choice.",
    descriptionParagraphs: [
      "Norwegian Cruise Line helped define modern flexible cruising through its Freestyle concept, replacing rigid dining schedules and formal structure with a more open, resort-style experience. It appeals to couples, families and groups who value choice in how they spend their time on board.",
      "The line stands out for specialty dining, big entertainment programming and activity-heavy ships, with newer vessels emphasizing outdoor space, ocean views and wellness-driven design. The Haven suite complex adds a more exclusive layer for guests wanting a quieter premium enclave within a larger ship.",
      "Its deployment is global, with strong Caribbean, Alaska, Europe and Hawaii programs alongside broader seasonal coverage in destinations such as Asia, South America, Australia and the South Pacific. The onboard mood is social, upbeat and deliberately unstructured.",
    ],
    ships: [
      "Norwegian Aqua",
      "Norwegian Aura",
      "Norwegian Bliss",
      "Norwegian Breakaway",
      "Norwegian Dawn",
      "Norwegian Encore",
      "Norwegian Epic",
      "Norwegian Escape",
      "Norwegian Gem",
      "Norwegian Getaway",
      "Norwegian Jade",
      "Norwegian Jewel",
      "Norwegian Joy",
      "Norwegian Luna",
      "Norwegian Pearl",
      "Norwegian Prima",
      "Norwegian Sky",
      "Norwegian Spirit",
      "Norwegian Star",
      "Norwegian Sun",
      "Norwegian Viva",
      "Pride of America",
    ],
    destinations: [],
  },
  {
    slug: "celestyal-cruises",
    name: "Celestyal Cruises",
    offersHref: "https://thecruisenews.com/cruises/celestyal/",
    logoSrc: "/assets/logos/partner-cruise-lines/celestyal-cruises.svg",
    logoAlt: "Celestyal Cruises logo",
    logoClassName: "scale-[1.08]",
    imageSrc: "/assets/images/cruise-lines/celestyal-cruises.png",
    imageAlt: "Celestyal Discovery at sea",
    detailImageSrc: "/assets/images/cruise-lines/celestyal-cruises-detail.jpg",
    detailImageAlt: "Celestyal Discovery at sea",
    description:
      "Celestyal focuses on shorter Eastern Mediterranean voyages built around the Greek islands, Turkey and nearby ports. The line is known for Greek hospitality, itinerary-led cruising and an easy, family-friendly onboard atmosphere.",
    descriptionParagraphs: [
      "Celestyal is centered on authentically Greek cruising, with shorter voyages around the Greek islands, Turkey and the Eastern Mediterranean. The line is especially known for itinerary-led travel, local flavor and a welcoming, easygoing onboard atmosphere.",
      "Its two mid-sized ships, Celestyal Discovery and Celestyal Journey, are positioned around value, comfort and destination access rather than large-ship attractions. Guests are drawn by Greek hospitality, included elements and cruise lengths that work well for shorter holidays.",
      "Beyond Greece, the line also operates Gulf and Adriatic itineraries, including sailings from Dubai and Doha as well as routes through Croatia, Montenegro, Italy, Cyprus and nearby regions. The product remains strongly culture-led and destination focused.",
    ],
    ships: ["Celestyal Discovery", "Celestyal Journey"],
    destinations: [],
  },
  {
    slug: "royal-caribbean-international",
    name: "Royal Caribbean International",
    offersHref:
      "https://thecruisenews.com/cruises/royal-caribbean-international/",
    logoSrc: "/assets/logos/partner-cruise-lines/royal-caribbean-international.png",
    logoAlt: "Royal Caribbean International logo",
    logoClassName: "scale-[0.88]",
    imageSrc: "/assets/images/cruise-lines/royal-caribbean-international.jpg",
    imageAlt: "Legend of the Seas at sea",
    detailImageSrc: "/assets/images/cruise-lines/royal-caribbean-international-detail.jpg",
    detailImageAlt: "Icon of the Seas at sea",
    description:
      "Royal Caribbean International is the world's largest cruise line by capacity and is known for pushing big-ship innovation. Its ships focus on neighborhood-style design, high-energy attractions and family-friendly resort experiences.",
    descriptionParagraphs: [
      "Royal Caribbean International is the world's largest cruise line by capacity and is known for continuously pushing large-ship innovation. Its biggest vessels are built around neighborhood-style planning, allowing guests to move between distinct entertainment, dining and relaxation zones.",
      "The brand is closely associated with industry-first attractions, from observation capsules and surf simulators to large waterparks, diving shows and major musical productions. That innovation sits alongside a strong family focus, with extensive kids' programming and a broad mix of activities for different age groups.",
      "While the Caribbean remains its core strength, Royal Caribbean also maintains major programs in Europe, Alaska and Asia. The line balances mass-market scale with tiered premium experiences such as Suite Class and exclusive guest-only spaces.",
    ],
    ships: [
      "Adventure of the Seas",
      "Allure of the Seas",
      "Anthem of the Seas",
      "Brilliance of the Seas",
      "Enchantment of the Seas",
      "Explorer of the Seas",
      "Freedom of the Seas",
      "Grandeur of the Seas",
      "Harmony of the Seas",
      "Hero of the Seas",
      "Icon of the Seas",
      "Independence of the Seas",
      "Jewel of the Seas",
      "Legend of the Seas",
      "Liberty of the Seas",
      "Mariner of the Seas",
      "Navigator of the Seas",
      "Oasis of the Seas",
      "Odyssey of the Seas",
      "Ovation of the Seas",
      "Quantum of the Seas",
      "Radiance of the Seas",
      "Rhapsody of the Seas",
      "Serenade of the Seas",
      "Spectrum of the Seas",
      "Star of the Seas",
      "Symphony of the Seas",
      "Utopia of the Seas",
      "Vision of the Seas",
      "Voyager of the Seas",
      "Wonder of the Seas",
    ],
    destinations: [],
  },
  {
    slug: "princess-cruises",
    name: "Princess Cruises",
    offersHref: "https://thecruisenews.com/cruises/princess/",
    logoSrc: "/assets/logos/partner-cruise-lines/princess-cruises.png",
    logoAlt: "Princess Cruises logo",
    logoClassName: "scale-[0.96]",
    imageSrc: "",
    imageAlt: "Image not available",
    detailImageSrc: "",
    detailImageAlt: "Image not available",
    description: "Data not available.",
    descriptionParagraphs: [],
    ships: [],
    destinations: [],
  },
  {
    slug: "cunard",
    name: "Cunard",
    offersHref: "https://thecruisenews.com/cruises/cunard/",
    logoSrc: "/assets/logos/partner-cruise-lines/cunard.png",
    logoAlt: "Cunard logo",
    logoClassName: "scale-[1.02]",
    imageSrc: "",
    imageAlt: "Image not available",
    detailImageSrc: "",
    detailImageAlt: "Image not available",
    description: "Data not available.",
    descriptionParagraphs: [],
    ships: [],
    destinations: [],
  },
  {
    slug: "p-and-o-cruises",
    name: "P&O Cruises",
    offersHref: "https://thecruisenews.com/cruises/poc/",
    logoSrc: "/assets/logos/partner-cruise-lines/p-and-o-cruises.png",
    logoAlt: "P&O Cruises logo",
    logoClassName: "scale-[0.9]",
    imageSrc: "",
    imageAlt: "Image not available",
    detailImageSrc: "",
    detailImageAlt: "Image not available",
    description: "Data not available.",
    descriptionParagraphs: [],
    ships: [],
    destinations: [],
  },
  {
    slug: "oceania-cruises",
    name: "Oceania Cruises",
    offersHref: "https://thecruisenews.com/cruises/oceania-cruises/",
    logoSrc: "/assets/logos/partner-cruise-lines/oceania-cruises.png",
    logoAlt: "Oceania Cruises logo",
    logoClassName: "scale-[0.94]",
    imageSrc: "",
    imageAlt: "Image not available",
    detailImageSrc: "",
    detailImageAlt: "Image not available",
    description: "Data not available.",
    descriptionParagraphs: [],
    ships: [],
    destinations: [],
  },
  {
    slug: "regent-seven-seas-cruises",
    name: "Regent Seven Seas Cruises",
    offersHref:
      "https://thecruisenews.com/cruises/regent-seven-seas-cruises/",
    logoSrc:
      "/assets/logos/partner-cruise-lines/regent-seven-seas-cruises.png",
    logoAlt: "Regent Seven Seas Cruises logo",
    logoClassName: "scale-[0.98]",
    imageSrc: "",
    imageAlt: "Image not available",
    detailImageSrc: "",
    detailImageAlt: "Image not available",
    description: "Data not available.",
    descriptionParagraphs: [],
    ships: [],
    destinations: [],
  },
  {
    slug: "celebrity-cruises",
    name: "Celebrity Cruises",
    offersHref: "https://thecruisenews.com/cruises/celebrity/",
    logoSrc: "/assets/logos/partner-cruise-lines/celebrity-cruises.png",
    logoAlt: "Celebrity Cruises logo",
    logoClassName: "scale-[0.98]",
    imageSrc: "",
    imageAlt: "Image not available",
    detailImageSrc: "",
    detailImageAlt: "Image not available",
    description: "Data not available.",
    descriptionParagraphs: [],
    ships: [],
    destinations: [],
  },
  {
    slug: "carnival-cruise-line",
    name: "Carnival Cruise Line",
    offersHref: "https://thecruisenews.com/cruises/carnival/",
    logoSrc: "/assets/logos/partner-cruise-lines/carnival-cruise-line.png",
    logoAlt: "Carnival Cruise Line logo",
    logoClassName: "scale-[1.02]",
    imageSrc: "",
    imageAlt: "Image not available",
    detailImageSrc: "",
    detailImageAlt: "Image not available",
    description: "Data not available.",
    descriptionParagraphs: [],
    ships: [],
    destinations: [],
  },
  {
    slug: "ama-waterways",
    name: "AMA Waterways",
    offersHref: "https://thecruisenews.com/cruises/amawaterways/",
    logoSrc: "/assets/logos/partner-cruise-lines/ama-waterways.png",
    logoAlt: "AMA Waterways logo",
    logoClassName: "scale-[1.02]",
    imageSrc: "",
    imageAlt: "Image not available",
    detailImageSrc: "",
    detailImageAlt: "Image not available",
    description: "Data not available.",
    descriptionParagraphs: [],
    ships: [],
    destinations: [],
  },
  {
    slug: "avalon-waterways",
    name: "Avalon Waterways",
    offersHref: "https://thecruisenews.com/cruises/avalon-waterways/",
    logoSrc: "/assets/logos/partner-cruise-lines/avalon-waterways.png",
    logoAlt: "Avalon Waterways logo",
    logoClassName: "scale-[0.98]",
    imageSrc: "",
    imageAlt: "Image not available",
    detailImageSrc: "",
    detailImageAlt: "Image not available",
    description: "Data not available.",
    descriptionParagraphs: [],
    ships: [],
    destinations: [],
  },
] as const;

export type CruiseLine = (typeof cruiseLines)[number];

export function getCruiseLineBySlug(slug: string): CruiseLine | undefined {
  return cruiseLines.find((line) => line.slug === slug);
}

export const partnerCruiseLines = cruiseLines.map((line) => ({
  name: line.name,
  href: `/cruise-lines/${line.slug}`,
  logoSrc: line.logoSrc,
  logoAlt: line.logoAlt,
  logoClassName: line.logoClassName,
}));

export const homeHeroSubtitle =
  "Exclusive discounted cruise fares for airline, travel, tourism and hospitality professionals across the Middle East.";

export const programmeSteps = [
  "Register with your business email for verification",
  "Get approved",
  "Log in and access interline rates",
  "Book with your discount applied",
] as const;

export const eligibleOrganisations = [
  "Airlines",
  "Airports and aviation services",
  "Travel agencies and tour operators",
  "Hotels and hospitality groups",
  "Tourism boards and destination management companies",
  "Cargo, charter and GSA representatives",
  "Ground handling and air services",
] as const;

export const expandedEligibleProfessions = [
  "Airlines",
  "Airports and aviation services",
  "Travel agencies and tour operators",
  "Hotels and hospitality groups",
  "Tourism boards and destination management companies",
  "Cargo, charter and GSA representatives",
  "Ground handling and air services",
] as const;

export const familyEligibility = [
  "Spouse",
  "Children",
  "Parents",
  "Friends",
] as const;

export const currentCruiseOffers = [
  "Mediterranean sailings with leading cruise brands",
  "Arabian Gulf voyages closer to home",
  "European and island itineraries with added benefits",
] as const;

export const homeIntroduction = [
  "For the ones who keep travel moving, this one’s for you.",
  "You help people turn travel dreams into memories. Whether you work across an airline, support travellers on the ground, welcome guests in hotels or shape the experiences that bring destinations to life, you play a part in creating holidays people never forget. You understand the excitement of a long awaited break, the joy of discovering somewhere new and the magic of a journey that unfolds exactly as it should.",
  "And because you spend so much of your energy making travel seamless for others, you deserve a holiday that feels just as effortless for you. A chance to step away from the pace of daily operations and into a world where everything is taken care of. Where you can unpack once, wake up somewhere new each morning, and enjoy the perfect blend of relaxation, entertainment and discovery that only a cruise can offer.",
  "That is exactly what Interline Cruises Middle East brings to you.",
  "A dedicated space where the travel community can access exclusive, verified interline rates on cruise holidays. Once you are registered and verified, you can browse offers, explore ships and destinations, and book directly with your industry discount already applied.",
  "These fares are not public. They exist as a quiet thank you, giving you the chance to enjoy a complete holiday experience that is as rewarding as it is relaxing.",
] as const;

export const whoWeAreParagraphs = [
  "Interline Cruises Middle East is the region’s first platform created specifically for the travel community. A place designed for those who live and breathe travel, where the cruise holidays you often recommend to others are now reserved for you.",
  "As a registered member, you can explore cruise lines and book your next holiday directly through a secure platform with your exclusive industry discount already included.",
] as const;

export const whyChooseUsParagraphs = [
  "When you work in travel, you are used to being the one who makes journeys possible. Here, you are the one being looked after. Interline Cruises Middle East was built exclusively for the region’s travel professionals, offering a trusted space where your industry status unlocks real value.",
  "Your verification protects genuine industry benefits, ensuring these fares remain reserved for those who have earned them. And because we partner directly with global cruise brands, you gain access to authentic interline discounts with no hidden fees or third party markups. And yes, your family and friends get to enjoy the perks too.",
  "One platform, one login, and a world of cruise holidays ready to explore.",
] as const;

export const homeEligibilityParagraph =
  "If you are part of the Middle East travel or hospitality ecosystem, you qualify for interline access once verified. Your role, your experience and your contribution to the industry is what opens the door.";

export const homeFamilyEligibilityParagraph =
  "Your interline benefits extend beyond you. Your spouse, children, parents and friends can sail using your industry access. Whether you are travelling together or gifting them a well-deserved break, your verification unlocks exclusive cruise savings for the people you care about.";

export const homeEligibilityClosing =
  "Join Interline Cruises Middle East and unlock exclusive cruise rates reserved for the travel industry.";

export const homePartnerCruiseLinesParagraphs = [
  "Cruising is one of the easiest ways to switch off and truly unwind. With your interline access, it becomes even more accessible, whether you are looking for a short escape or a longer voyage across continents.",
  "You will find offers across a wide range of the world’s most loved cruise lines, from contemporary and premium brands to luxury, river, expedition and niche experiences. Each one brings something different to the journey, and all of them are now within reach.",
  "All displayed fares already include your interline benefit. Additional promotions may apply where available. New offers are added regularly across destinations, seasons and cruise lines. Your next holiday might already be waiting.",
] as const;

export const partnerCruiseLinesSummary =
  "Norwegian Cruise Line, Celestyal Cruises, Royal Caribbean International, Princess Cruises, Cunard, P&O Cruises, Oceania Cruises, Regent Seven Seas Cruises, Celebrity Cruises, Carnival Cruise Line, AMA Waterways, Avalon Waterways and more.";

export type FaqItem = {
  question: string;
  paragraphs: readonly string[];
  listItems?: readonly string[];
  afterListParagraphs?: readonly string[];
};

export const faqItems: readonly FaqItem[] = [
  {
    question: "What are interline cruise rates?",
    paragraphs: [
      "Interline cruise rates are exclusive, privately offered fares that cruise lines reserve for professionals working in the airline, travel, tourism and hospitality industry.",
      "These fares are not available to the public.",
      "They are part of long standing industry partnerships that recognise the people who help keep global travel moving.",
      "Through Interline Cruises Middle East, eligible members can access these special cruise offers and book holidays at preferred industry only rates.",
    ],
  },
  {
    question: "Who qualifies for interline cruise rates?",
    paragraphs: [
      "Interline cruise rates are available to current employees working in airline, travel, tourism or hospitality organisations based in the Middle East.",
      "This includes professionals working across airlines, airports, travel agencies, tour operators, hotels, tourism boards and related organisations within the region.",
    ],
  },
  {
    question: "Can former travel industry employees apply?",
    paragraphs: [
      "No. Interline Cruises Middle East is currently available only to active, full time employees working in eligible organisations within the Middle East.",
    ],
  },
  {
    question: "Can family members travel at interline rates?",
    paragraphs: [
      "Yes. Your interline benefits extend to your spouse, children, parents and friends. They can travel with you, or you can book a cruise for them through your verified account.",
      "Your verification unlocks access for the people you care about.",
    ],
  },
  {
    question: "Do I need to prove my employment?",
    paragraphs: [
      "Yes. Verification is required to ensure that interline benefits remain exclusive to the travel industry.",
      "You can verify your eligibility using your business email address or by providing official proof of employment, such as a staff ID or company documentation.",
      "This helps maintain a secure and trusted platform for all members.",
    ],
  },
  {
    question: "Do I need to work in the Middle East to qualify?",
    paragraphs: [
      "Yes. You must be currently employed by an airline, travel, tourism or hospitality organisation based in the Middle East.",
      "These interline rates are specifically designed for professionals working within the region.",
    ],
  },
  {
    question: "Are interline fares lower than public cruise prices?",
    paragraphs: [
      "Interline fares are privately negotiated and often lower than publicly available cruise prices.",
      "They may also include access to selected promotions that are not offered to general travellers.",
    ],
  },
  {
    question: "Is there a cost to register?",
    paragraphs: [
      "No. Registration is free for eligible travel and hospitality professionals.",
      "The platform is designed as an industry benefit, giving you access to exclusive cruise offers.",
    ],
  },
  {
    question: "Can I book cruises directly through the website?",
    paragraphs: [
      "Yes. Once logged in, you can browse available cruise offers and complete your booking directly through the platform.",
      "Your interline discount is automatically applied, so you can book with confidence",
    ],
  },
];

export const privacyContactEmail = "privacy@interlinecruisesme.com";
