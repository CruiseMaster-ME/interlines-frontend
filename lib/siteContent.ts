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
  },
  {
    slug: "costa-cruises",
    name: "Costa Cruises",
  },
  {
    slug: "celestyal-cruises",
    name: "Celestyal Cruises",
  },
  {
    slug: "aroya-cruises",
    name: "Aroya Cruises",
  },
  {
    slug: "norwegian-cruise-line",
    name: "Norwegian Cruise Line",
  },
  {
    slug: "royal-caribbean-international",
    name: "Royal Caribbean International",
  },
] as const;

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
