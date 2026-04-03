export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/cruise-lines", label: "Cruise Lines" },
  { href: "/faq", label: "FAQ" },
  { href: "/eligibility", label: "Eligibility" },
] as const;

export const headerNav = [
  { href: "/offers", label: "Special Offers" },
  { href: "/cruise-lines", label: "Cruise Lines" },
] as const;

export const legalNav = [
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
] as const;

export const cruiseLines = [
  {
    slug: "msc-cruises",
    name: "MSC Cruises",
    logoSrc: "/assets/logos/cruise-lines/msc-cruises.png",
    logoAlt: "MSC Cruises logo",
    logoClassName: "scale-[0.94]",
    imageSrc: "/assets/images/cruise-lines/msc-cruises.jpg",
    imageAlt: "MSC World America at sea",
    detailImageSrc: "/assets/images/cruise-lines/msc-cruises-detail.jpg",
    detailImageAlt: "MSC Bellissima at sea",
    description:
      "MSC Cruises is the Swiss-Italian contemporary brand within the wider MSC Group and one of the fastest-growing cruise lines in the world. It operates large resort-style ships with strong reach across Europe, South America, the Middle East and Southern Africa.",
    descriptionParagraphs: [
      "MSC Cruises is a Swiss-Italian cruise line and one of the fastest-growing brands in global cruising, positioned as the contemporary arm of the wider MSC Group. It has built a particularly strong presence across Europe, South America, the Middle East and Southern Africa.",
      "The line is known for European flair, large resort-style ships and a strong focus on families and multi-generational travel. Recent fleet development has leaned into next-generation design, including LNG-powered World Class ships and the broader sustainability story around Ocean Cay MSC Marine Reserve in the Bahamas.",
      "Operations span more than 240 destinations worldwide, with year-round programs in the Mediterranean and Caribbean plus seasonal deployment across Northern Europe, North America, Asia, South America, the Middle East and Southern Africa. On board, the atmosphere is international, lively and distinctly Mediterranean in tone.",
    ],
    ships: [
      "MSC Armonia",
      "MSC Bellissima",
      "MSC Divina",
      "MSC Euribia",
      "MSC Fantasia",
      "MSC Grandiosa",
      "MSC Lirica",
      "MSC Magnifica",
      "MSC Meraviglia",
      "MSC Musica",
      "MSC Opera",
      "MSC Orchestra",
      "MSC Poesia",
      "MSC Preziosa",
      "MSC Seascape",
      "MSC Seashore",
      "MSC Seaside",
      "MSC Seaview",
      "MSC Sinfonia",
      "MSC Splendida",
      "MSC Virtuosa",
      "MSC World America",
      "MSC World Asia",
      "MSC World Atlantic",
      "MSC World Europa",
    ],
  },
  {
    slug: "costa-cruises",
    name: "Costa Cruises",
    logoSrc: "/assets/logos/cruise-lines/costa-cruises.png",
    logoAlt: "Costa Cruises logo",
    logoClassName: "scale-[0.96]",
    imageSrc: "/assets/images/cruise-lines/costa-cruises.jpg",
    imageAlt: "Costa Toscana at sea",
    detailImageSrc: "/assets/images/cruise-lines/costa-cruises-detail.jpg",
    detailImageAlt: "Costa Toscana at sea",
    description:
      "Costa Cruises is an Italian line built around lively, sociable holidays with a strong Mediterranean identity. It is known for family-friendly ships, energetic nightlife and an onboard style that feels more relaxed and vibrant than formal.",
    descriptionParagraphs: [
      "Costa Cruises is built around a lively Italian holiday style, combining sociable ships, Mediterranean itineraries and a more energetic onboard atmosphere than traditional premium lines. It appeals strongly to families and guests looking for fun, relaxed cruising rather than a formal experience.",
      "The onboard feel is colorful and upbeat, with Italian dining, family entertainment, late-night venues and a generally informal rhythm. Costa has also invested in newer LNG-powered ships such as Costa Smeralda and Costa Toscana while continuing to modernize the fleet.",
      "Its route network centers on the Mediterranean, but the line also sails Northern Europe, the Canaries, the Middle East, the Caribbean, Asia and South America. The overall positioning is mainstream value with a distinct Italian identity.",
    ],
    ships: [
      "Costa Serena",
      "Costa Smeralda",
      "Costa Toscana",
      "Costa Deliziosa",
      "Costa Diadema",
      "Costa Fascinosa",
      "Costa Favolosa",
      "Costa Fortuna",
      "Costa Pacifica",
    ],
  },
  {
    slug: "celestyal-cruises",
    name: "Celestyal Cruises",
    logoSrc: "/assets/logos/cruise-lines/celestyal-cruises.png",
    logoAlt: "Celestyal Cruises logo",
    logoClassName: "scale-[1.2]",
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
  },
  {
    slug: "aroya-cruises",
    name: "Aroya Cruises",
    logoSrc: "/assets/logos/cruise-lines/aroya-cruises.jpg",
    logoAlt: "Aroya Cruises logo",
    logoClassName: "scale-[0.9]",
    imageSrc: "/assets/images/cruise-lines/aroya-cruises.jpg",
    imageAlt: "AROYA ship at sea",
    detailImageSrc: "/assets/images/cruise-lines/aroya-cruises-detail.jpg",
    detailImageAlt: "AROYA at sea",
    description:
      "AROYA Cruises was created by Cruise Saudi as a cruise line designed around Saudi and wider Arabian travel preferences. It combines large-ship resort facilities with Arabic-led service and Red Sea itineraries aimed at Middle Eastern family travel.",
    descriptionParagraphs: [
      "AROYA Cruises is the first cruise line designed from the ground up around Saudi and wider Arabian travel preferences. Developed by Cruise Saudi, it launched with a large refurbished resort-style ship and a service approach tailored to regional family travel.",
      "The onboard concept blends large-ship facilities with Middle Eastern hospitality cues, including Arabic and international dining, family-oriented spaces, prayer areas and a mix of familiar cruise amenities adapted for regional expectations. The result is positioned to feel accessible for first-time cruise guests from the region.",
      "After its initial Red Sea program from Jeddah, AROYA expanded into Mediterranean operations and is positioning itself for broader Gulf deployment. Its itineraries are designed to work both as regional getaways and as a bridge between Middle Eastern and European holiday markets.",
    ],
    ships: ["AROYA"],
  },
  {
    slug: "norwegian-cruise-line",
    name: "Norwegian Cruise Line",
    logoSrc: "/assets/logos/cruise-lines/norwegian-cruise-line.png",
    logoAlt: "Norwegian Cruise Line logo",
    logoClassName: "scale-[1.12]",
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
  },
  {
    slug: "royal-caribbean-international",
    name: "Royal Caribbean International",
    logoSrc: "/assets/logos/cruise-lines/royal-caribbean-international.png",
    logoAlt: "Royal Caribbean International logo",
    logoClassName: "scale-[0.9]",
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
  },
] as const;

export type CruiseLine = (typeof cruiseLines)[number];

export function getCruiseLineBySlug(slug: string) {
  return cruiseLines.find((line) => line.slug === slug);
}

export const whyChooseUs = [
  "Built exclusively for the Middle East travel community",
  "Verified access that protects genuine industry benefits",
  "Direct partnerships with trusted global cruise brands",
  "Seamless registration, verification and booking in one place",
  "Exclusive discounts starting from 10 percent",
  "Access for both current and retired professionals and their families",
] as const;

export const memberBenefits = [
  "Minimum 10 percent savings on selected cruises",
  "Access to exclusive interline-only promotions",
  "Eligibility extended to your immediate family",
  "One central hub for cruise offers across brands",
  "Direct booking with no third-party service fees",
] as const;

export const programmeSteps = [
  "Register using your company email",
  "Get verified through email or employment proof",
  "Receive login access",
  "Browse cruise offers with your discount included",
  "Book and receive confirmation directly",
] as const;

export const registrationSteps = [
  "Complete the registration form",
  "Submit your company email or employment proof",
  "Get verified and approved",
  "Log in and start exploring",
] as const;

export const eligibleOrganisations = [
  "Airlines",
  "Airports and aviation organisations",
  "Travel agencies, tour operators, GSAs and DMCs",
  "Hotels and hospitality groups",
  "Tourism boards",
] as const;

export const expandedEligibleProfessions = [
  "Airline staff",
  "Airport and aviation professionals",
  "Travel agents and tour operators",
  "Hotel and hospitality employees",
  "Tourism boards and destination management companies",
  "Cargo, charter and GSA representatives",
  "Ground handling and air services staff",
] as const;

export const familyEligibility = [
  "Spouse or partner",
  "Dependent children",
  "Parents",
] as const;

export const currentCruiseOffers = [
  "Mediterranean sailings with leading cruise brands",
  "Arabian Gulf voyages closer to home",
  "European and island itineraries with added benefits",
] as const;

export const homeIntroduction = [
  "While in the air, have you ever wished you were at sea instead?",
  "If you work in travel or hospitality, you spend your days helping others explore the world. This is your chance to experience it yourself at exclusive, industry-only rates.",
  "Interline Cruises Middle East brings together leading cruise lines offering verified travel professionals access to special fares, including a guaranteed 10% interline discount.",
  "Once registered, you can browse offers, explore cruise lines and book directly, with your discount already applied.",
  "These rates are not available to the public. They are a small thank you to those who keep the world moving, giving you the opportunity to see it from a different perspective.",
] as const;

export const whoWeAreParagraphs = [
  "We are the region’s first dedicated platform connecting Middle East travel and hospitality professionals with exclusive cruise offers from leading global cruise lines.",
  "Created for those who live and breathe travel, this platform gives you access to experiences you would usually recommend, now reserved for you.",
] as const;

export const whoWeAreMemberActions = [
  "Browse current interline cruise offers",
  "Explore ships, itineraries and destinations",
  "Book directly through a secure platform with your discount applied",
] as const;

export const formerEmployeeProofItems = [
  "Previous staff ID card or business card",
  "Company documentation",
  "Other supporting records",
] as const;

export const faqItems = [
  {
    question: "What are interline cruise rates?",
    paragraphs: [
      "Interline cruise rates are special discounted fares offered by cruise lines to professionals working in the travel and hospitality industry.",
      "These rates are extended to airline employees, travel agents, tourism professionals and other industry staff as part of long-standing travel partnerships.",
      "Through Interline Cruises Middle East, eligible members can access exclusive cruise offers with a 10% interline discount, giving you the opportunity to experience leading cruise lines at preferred rates.",
    ],
  },
  {
    question: "Who qualifies for interline cruise rates?",
    paragraphs: [
      "Interline cruise rates are available to current and former employees working in organisations in the travel and hospitality sector in the Middle East.",
      "This includes professionals from airlines, airports, travel agencies, tour operators, hotels, tourism boards and related organisations.",
    ],
  },
  {
    question: "Can former travel industry employees apply?",
    paragraphs: [
      "Yes. If you have previously worked for an eligible travel or hospitality organisation in the Middle East, you can still apply.",
      "You will need to provide proof of your previous employment during registration, such as:",
    ],
    listItems: [
      "a former employee ID card or business card",
      "company documentation",
      "other supporting records",
    ],
    afterListParagraphs: [
      "Once verified, you will receive access to the platform and available cruise offers.",
    ],
  },
  {
    question: "Can family members travel at interline rates?",
    paragraphs: [
      "Yes. Registered members can extend interline benefits to their immediate family.",
      "This typically includes:",
    ],
    listItems: ["spouse", "children", "parents"],
    afterListParagraphs: [
      "Family members can travel with you, or bookings can be made through your verified account.",
    ],
  },
  {
    question: "Do I need to prove my employment?",
    paragraphs: [
      "Yes. Verification is required to ensure that interline benefits remain exclusive to the travel industry.",
      "You can verify your eligibility using:",
    ],
    listItems: [
      "your company email address",
      "proof of employment such as an ID card or official documentation",
    ],
    afterListParagraphs: [
      "This process helps maintain a secure and trusted platform.",
    ],
  },
  {
    question: "Do I need to work in the Middle East to qualify?",
    paragraphs: [
      "Yes. You must be employed by and based within a Middle East travel or hospitality organisation to qualify.",
      "These interline rates are specifically designed for professionals working within the region.",
    ],
  },
  {
    question: "Are interline fares lower than public cruise prices?",
    paragraphs: [
      "Interline fares are privately negotiated and are often lower than publicly available cruise prices.",
      "They may also include access to selected promotions that are not available to general travellers.",
    ],
  },
  {
    question: "Is there a cost to register?",
    paragraphs: [
      "No. Registration is free for eligible travel and hospitality professionals.",
      "The platform is designed as a benefit for the industry, giving you access to exclusive cruise offers.",
    ],
  },
  {
    question: "Can I book cruises directly through the website?",
    paragraphs: [
      "Yes. Once logged in, you can browse available cruise offers and complete your booking directly through the platform.",
      "Your interline discount is automatically applied, so you can book with confidence.",
    ],
  },
] as const;

export const privacyContactEmail = "privacy@interlinecruisesme.com";
