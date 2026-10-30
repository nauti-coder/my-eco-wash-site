/**
 * Single source of truth for My Eco Wash business content.
 * Everything here was transcribed from myecowash.com (via a screen recording of the live site).
 * Items marked TODO were not visible on the original site and need the owner's input.
 */

export const site = {
  name: "My Eco Wash",
  logoAlt: "My Eco Wash Car Wash",
  description:
    "Eco-friendly express car wash on Pines Blvd in Pembroke Pines, FL. Unlimited Eco Wash Club memberships from $24.99/month, free vacuums and air, open every day 8am–8pm.",
  url: "https://www.myecowash.com",
  phone: { display: "(954) 391-7017", href: "tel:+19543917017" },
  email: { display: "info@myecowash.com", href: "mailto:info@myecowash.com" },
  address: {
    street: "18440 Pines Blvd.",
    city: "Pembroke Pines",
    state: "FL",
    zip: "33029",
    full: "18440 Pines Blvd., Pembroke Pines, FL 33029",
  },
  hours: {
    days: "Open every day",
    time: "8:00 am – 8:00 pm",
    // Wording from the plans page.
    closures: "Closed only on specified public holidays and during hurricanes.",
  },
  maps: {
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent("My Eco Wash, 18440 Pines Blvd, Pembroke Pines, FL 33029"),
    embed:
      "https://maps.google.com/maps?q=" +
      encodeURIComponent("18440 Pines Blvd, Pembroke Pines, FL 33029") +
      "&z=14&output=embed",
  },
  social: {
    // TODO: Replace with the real profile URLs (the icons on the original site link to them; the handles were not visible).
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },
  announcement: {
    text: "Sign up, save & wash every day.",
    cta: "Join the My Eco Wash Club today",
    href: "/join",
  },
} as const;

/** Internal routes. Every link on the site should come from here or point at one of these. */
export const routes = {
  home: "/",
  plans: "/unlimited-wash-plans",
  workWithUs: "/work-with-us",
  faq: "/faq",
  contact: "/contact-us",
  privacy: "/privacy-policy",
  join: "/join",
  manageMembership: "/contact-us#membership",
  clubTerms: "/unlimited-wash-plans#terms",
} as const;

/** Header navigation, same order as the original site. */
export const mainNav = [
  { label: "Home", href: routes.home },
  { label: "Unlimited Wash Plans", href: routes.plans },
  { label: "Work With Us", href: routes.workWithUs },
  { label: "FAQ", href: routes.faq },
] as const;

export const footerNav = {
  policies: [
    { label: "Privacy Policy & Terms of Service", href: routes.privacy },
    { label: "FAQ", href: routes.faq },
  ],
  company: [
    { label: "Contact Us", href: routes.contact },
    { label: "Work With Us", href: routes.workWithUs },
    { label: "Unlimited Wash Plans", href: routes.plans },
    { label: "Join the Club", href: routes.join },
  ],
} as const;

/**
 * Membership sign-up. The original site's "Join" links open an external checkout
 * (plan picker + card form) whose URL was not visible in the recording.
 * TODO: set `onlineSignupUrl` to that checkout as the interim online sign-up. It is used only
 * until the Nautilus checkout (`nautilusCheckout` below) is switched on.
 */
export const membership = {
  onlineSignupUrl: null as string | null,
  clubName: "Unlimited Eco Wash Club",
  waysToJoin: [
    {
      title: "Online",
      body: "Pick your package and sign up in a couple of minutes.",
    },
    {
      title: "At the pay kiosk",
      body: "Choose the Unlimited Eco Wash Club at our automated pay kiosk on your next visit.",
    },
    {
      title: "With our team",
      body: "Ask any team member on site, or give us a call — we'll get you set up.",
    },
  ],
} as const;

/**
 * Nautilus membership checkout (preferred). My Eco Wash is not a Nautilus organization yet, so this is off.
 * TODO: after onboarding, fill these from Nautilus — the org's storefront slug, the Pembroke Pines Site.id,
 * and the active recurring SalesItem.id that matches each club package (match by tier and monthly price).
 * Copy the IDs exactly; never invent them. Once slug + locationId are set, every package "Join" button opens
 * the real Nautilus checkout in the membership drawer, and the loader script is added to the page.
 */
export const nautilusCheckout = {
  loaderSrc: "https://app.nautilus.co/embed/loader.js",
  storefrontSlug: null as string | null,
  locationId: null as string | null,
  productIds: {} as Partial<Record<"manager-special" | "the-ultimate" | "wheel-and-clean", string>>,
};

export const nautilusCheckoutEnabled = Boolean(nautilusCheckout.storefrontSlug && nautilusCheckout.locationId);

/** Storefront checkout src for one package. A package with no matched product falls back to the location's full storefront. */
export function checkoutSrc(planId: PlanId): string | null {
  if (!nautilusCheckout.storefrontSlug || !nautilusCheckout.locationId) return null;
  const base = `/c/storefront/${nautilusCheckout.storefrontSlug}?locationId=${nautilusCheckout.locationId}`;
  const productId = nautilusCheckout.productIds[planId];
  return productId ? `${base}&productId=${productId}` : base;
}

/** Where a package's Join button goes while the Nautilus drawer is off: the current online sign-up, else our /join page. */
export const packageJoinHref = (planId: PlanId) => membership.onlineSignupUrl ?? `${routes.join}?plan=${planId}`;

/**
 * Where Join CTAs that name no package go. With the drawer on they lead to the package cards
 * (a checkout without a package would list everything); otherwise to the online sign-up or /join.
 */
export const joinCtaHref = nautilusCheckoutEnabled ? routes.plans : (membership.onlineSignupUrl ?? routes.join);

export type PlanId = "manager-special" | "the-ultimate" | "wheel-and-clean";

export type ClubPlan = {
  id: PlanId;
  name: string;
  /** Name as shown on the original store listing. */
  listingName: string;
  priceMonthly: number;
  services: string[];
};

/**
 * Unlimited Eco Wash Club plans, cheapest first (exactly as listed on the original site).
 * Note: the original lists Underbody Rinse for Manager Special and Wheel & Clean but not for The Ultimate.
 * TODO: confirm with the owner whether The Ultimate includes Underbody Rinse.
 */
export const clubPlans: ClubPlan[] = [
  {
    id: "wheel-and-clean",
    name: "Wheel & Clean",
    listingName: "Unlimited Eco Wash Club – Wheel & Clean",
    priceMonthly: 24.99,
    services: [
      "Pre-Soak",
      "Soft Cloth Automatic Wash",
      "Underbody Rinse",
      "Triple Foam Polish",
      "Spot Free Rinse",
      "Jet Dry",
      "Step 1 & 2 Wheel Cleaner",
    ],
  },
  {
    id: "the-ultimate",
    name: "The Ultimate",
    listingName: "Unlimited Eco Wash Club – The Ultimate",
    priceMonthly: 32.99,
    services: [
      "Pre-Soak",
      "Soft Cloth Automatic Wash",
      "Wheel Cleaner",
      "Hot Wax & Shine",
      "Triple Foam Polish",
      "Spot Free Rinse",
      "Jet Dry",
      "Black Magic Tire Shine",
      "Step 1 & 2 Wheel Cleaner",
      "Rain-X",
    ],
  },
  {
    id: "manager-special",
    name: "Manager Special",
    listingName: "Unlimited Eco Wash Club – Manager Special",
    priceMonthly: 39.99,
    services: [
      "Pre-Soak",
      "Soft Cloth Automatic Wash",
      "Underbody Rinse",
      "Wheel Cleaner",
      "Hot Wax & Shine",
      "Triple Foam Polish",
      "Spot Free Rinse",
      "Jet Dry",
      "Black Magic Tire Shine",
      "Step 1 & 2 Wheel Cleaner",
      "Rain-X",
      "Automatic Dry N' Shine",
    ],
  },
];

/** Every service across all plans, in wash order — for comparison tables. */
export const allServices = [
  "Pre-Soak",
  "Soft Cloth Automatic Wash",
  "Underbody Rinse",
  "Wheel Cleaner",
  "Step 1 & 2 Wheel Cleaner",
  "Triple Foam Polish",
  "Hot Wax & Shine",
  "Spot Free Rinse",
  "Jet Dry",
  "Black Magic Tire Shine",
  "Rain-X",
  "Automatic Dry N' Shine",
] as const;

export const planIncludes = (plan: ClubPlan, service: string) => plan.services.includes(service);

/**
 * Single (pay-per-visit) express washes, as shown on the original homepage.
 * TODO: single-wash prices were not shown on the original site, and neither was what The Basic includes.
 * Until the owner confirms, show names only — never invent prices.
 */
export const singleWashes = [
  { id: "manager-special", name: "Manager Special", clubPlanId: "manager-special" as PlanId | null },
  { id: "the-ultimate", name: "The Ultimate", clubPlanId: "the-ultimate" as PlanId | null },
  { id: "wheel-and-clean", name: "Wheel & Clean", clubPlanId: "wheel-and-clean" as PlanId | null },
  { id: "the-basic", name: "The Basic", clubPlanId: null as PlanId | null },
] as const;

/** "How the club works" facts from the plans page and FAQ. */
export const clubFacts = [
  {
    title: "Wash once a day",
    body: "Wash your vehicle once every 24 hours, all month long, for one flat monthly fee.",
  },
  {
    title: "Drive up, scan, go",
    body: "An RFID decal on the inside of your front windshield is scanned at the pay kiosk — no further action required.",
  },
  {
    title: "Month-to-month",
    body: "No long-term commitments or hidden cancellation charges. Your membership renews on the same date each month.",
  },
  {
    title: "One vehicle per membership",
    body: "Each membership is tied to one vehicle. Got a new car? Contact us to update your vehicle and get a new RFID decal.",
  },
] as const;

/** Club terms that appear on the original plans page (the full T&C document was linked but not visible). */
export const clubTerms = [
  "The Unlimited Eco Wash Club is vehicle-specific and can only be associated with one vehicle.",
  "A radio frequency identification decal (RFID) must be placed on your vehicle's windscreen; it approves your membership each visit.",
  "You may wash your vehicle once every 24 hours during the month.",
  "My Eco Wash charges your credit card month-to-month. There are no long-term commitments or hidden cancellation charges.",
  "To cancel, My Eco Wash must receive written notice 14 days before your next billing date. Ask for a cancellation form at the store or give us a call.",
  "No refunds or credits will be given for partial periods; you may continue to use your membership until your expiry date.",
  "After your first payment, visit us at My Eco Wash to have your RFID sticker placed on your vehicle's windscreen.",
] as const;

/** Copy from the original homepage. */
export const story = {
  missionTitle: "Our Mission",
  mission:
    "We strive to provide the best car washes and customer service experiences possible. Our formula is simple: making people feel good by delivering an eco-friendly alternative, spotless, and professional car wash every single time. We believe that no matter what you drive, you will feel happier about your car after visiting our car wash!",
  impactTitle: "Our Impact",
  impact:
    "My Eco Wash is a business that relies on water, which is a precious resource. By washing your vehicle at My Eco Wash, you help us conserve water through our water-saving technology. We are committed to providing you with the best experience through state-of-the-art equipment, products, and service.",
  pillars: [
    {
      number: "1",
      title: "State-of-the-art water reclaim system",
      body: "At My Eco Wash, we have the capacity to store over 120,000 liters of reclaimed water at any one point in time!",
    },
    {
      number: "2",
      title: "Eco-friendly biodegradable soaps and detergents",
      body: "Did you know that washing your car at home can introduce non-biodegradable soaps, oils, brake dust, and other pollutants into our streams, rivers, lakes, and oceans? At My Eco Wash, we only use premium soaps and chemicals.",
    },
    {
      number: "3",
      title: "Fundraising & our community",
      body: "Our commitment extends beyond the car wash tunnel. We actively participate in our local community through various programs and events. Part of being a conscious neighbor is looking for ways to improve and provide a brighter future for our team members, community, and the world we live in.",
    },
  ],
} as const;

export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
  list?: string[];
  link?: { label: string; href: string };
  topic: "membership" | "the-wash" | "on-site";
};

/** All FAQ content from the original FAQ page, in the original order. */
export const faqs: FaqItem[] = [
  {
    id: "sign-up",
    topic: "membership",
    question: "How do I sign up for the Unlimited Eco Wash Club?",
    answer: [
      "The Unlimited Eco Wash Club is available for purchase online, at every My Eco Wash location through our automated pay kiosk, or by speaking with our team!",
    ],
    link: { label: "Choose from our Unlimited Eco Wash Club packages", href: routes.plans },
  },
  {
    id: "water-recycled",
    topic: "the-wash",
    question: "Does any of the water used in the car wash get recycled?",
    answer: [
      "Throughout the entire car wash process at My Eco Wash, we use the most advanced water reclamation technology and equipment (Reverse Osmosis Filtration Systems).",
    ],
  },
  {
    id: "how-club-works",
    topic: "membership",
    question: "How does the Unlimited Eco Wash Club work?",
    answer: [
      "Our memberships allow you to wash up to once per day at any My Eco Wash location.",
      "You will receive an RFID sticker that will be placed on the inside of your front windshield.",
      "Our system will automatically scan your decal when you drive up to our pay kiosk area. This will allow you to enter the car wash without any further action required.",
      "On the date your purchase is confirmed, your membership will renew automatically every month on that date.",
    ],
  },
  {
    id: "how-often",
    topic: "membership",
    question: "How often can I wash with the Unlimited Eco Wash Club?",
    answer: [
      "You may wash your vehicle once every 24 hours during the month.",
      "My Eco Wash will only be closed on specified public holidays and during hurricanes.",
    ],
  },
  {
    id: "new-vehicle",
    topic: "membership",
    question: "What if I get a new vehicle?",
    answer: [
      "The Unlimited Eco Wash Club is vehicle-specific and can only be associated with one vehicle.",
      "If you purchase a new vehicle, simply contact us to update your vehicle profile and have a new RFID installed.",
    ],
    link: { label: "Contact us", href: routes.contact },
  },
  {
    id: "billing",
    topic: "membership",
    question: "How am I charged each month?",
    answer: [
      "My Eco Wash charges your credit card month-to-month. There are no long-term commitments or hidden cancellation charges.",
      "In the event that you would like to cancel your membership, My Eco Wash must receive written notice 14 days before your next billing date. No refunds or credits will be given for partial periods; however, you may continue to use your membership until your expiry date.",
    ],
  },
  {
    id: "after-sign-up",
    topic: "membership",
    question: "What happens after I sign up?",
    answer: [
      "After your first payment is made, please visit us at My Eco Wash to place your RFID sticker onto your vehicle's windscreen.",
      "For more information, please call or visit us, and our staff will be very happy to assist you.",
    ],
  },
  {
    id: "cancel",
    topic: "membership",
    question: "How do I cancel my Unlimited Eco Wash Club membership?",
    answer: [
      "Membership plans can be canceled at any time up to 14 days before your monthly recharge date.",
      "Please ask to fill out a cancellation form at the store or give us a call.",
      "Be sure to continue washing through the end of your last paid month.",
    ],
  },
  {
    id: "soaps",
    topic: "the-wash",
    question: "What kind of soaps and waxes do you use?",
    answer: [
      "All of our cleansers, soaps, and waxes are 100% biodegradable. They are carefully tested to ensure they are safe for both your vehicle and the environment.",
      "We have invested in state-of-the-art chemical mixing technology that delivers precise amounts of crystal-clear water and gentle, effective cleansers, soaps, and waxes.",
    ],
  },
  {
    id: "vehicle-safety",
    topic: "the-wash",
    question: "Is your car wash safe for my vehicle?",
    answer: [
      "Our car washes are designed to leave your vehicle clean, shiny, and dry, with no damage. However, we cannot be responsible for the following items:",
    ],
    list: [
      "Antennas (we recommend lowering/removing before washing).",
      "Rearview mirrors (we recommend folding them in before washing).",
      "Rear hitch/spare tire (if not removed, the back of your vehicle will not be cleaned).",
      "Windshield wipers (ensure they are off before washing).",
      "Pre-existing damage to any exterior part/surface (known/unknown).",
      "Non-factory or dealer-installed equipment.",
      "Moldings/chrome/decals/pin striping.",
      "Bug shields and guards.",
      "Convertible soft tops.",
      "Damaged/oxidations on paint or clear coat.",
      "Anything on vehicles 1 year or older.",
    ],
  },
  {
    id: "vehicle-restrictions",
    topic: "the-wash",
    question: "Are there any kinds of vehicles that cannot be washed?",
    answer: ["Yes, for your safety, we cannot wash vehicles with the following items:"],
    list: [
      "Vehicles with excessive mud.",
      "Vehicles taller than 7 feet.",
      "Dual-wheel trucks.",
      "Tires wider than 12 inches.",
      "Truck beds with debris, oil, or fuel tanks.",
      "Vehicles with less than 4 inches of ground clearance.",
      "Vehicles with excessive body damage or loose parts.",
      "No trailers or vehicles longer than 21 feet.",
    ],
  },
  {
    id: "vacuums",
    topic: "on-site",
    question: "How long can I use the vacuums?",
    answer: [
      "Our vacuums are free to use with the purchase of any wash or membership plan and can be used as long as needed. During busy times, we ask that you please limit your vacuum use to 10 minutes so that others may utilize our free services.",
    ],
  },
];

export const faqTopics = [
  { id: "membership", label: "Membership" },
  { id: "the-wash", label: "The wash" },
  { id: "on-site", label: "On site" },
] as const;

/** Careers (Work With Us page). */
export const careers = {
  title: "We Are Now Hiring!",
  eyebrow: "Ready to join the My Eco Wash team?",
  intro:
    "We place great value on recruiting, developing, and training professionals who are passionate about their work. We are looking for detail-oriented team players who take pride in their work and serve customers by providing car wash services in a safe, fast, and friendly environment at My Eco Wash.",
  roles: [
    // TODO: the original buttons link to job postings whose URLs were not visible; these fall back to an email application.
    {
      title: "Sales Agent",
      applyHref: "mailto:info@myecowash.com?subject=" + encodeURIComponent("Application: Sales Agent"),
    },
    {
      title: "Express Crew Member",
      applyHref: "mailto:info@myecowash.com?subject=" + encodeURIComponent("Application: Express Crew Member"),
    },
  ],
} as const;
