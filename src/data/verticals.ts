export type BusinessVertical =
  | "restaurant"
  | "realtor"
  | "home_services"
  | "tutor"
  | "med_spa"
  | "consultant";

export type VerticalConfig = {
  id: BusinessVertical;
  label: string;
  exampleOffer: string;
  painPoints: string[];
  proofAngles: string[];
  defaultCta: string;
};

export const verticals: VerticalConfig[] = [
  {
    id: "restaurant",
    label: "Restaurant / food business",
    exampleOffer: "Family dinner special this Thursday",
    painPoints: ["people nearby do not know the special exists", "food looks better than the current posts", "slow weekday demand"],
    proofAngles: ["fresh prep", "limited seats", "regular customers", "neighborhood favorite"],
    defaultCta: "Reserve or order today"
  },
  {
    id: "realtor",
    label: "Realtor / local agent",
    exampleOffer: "Free home valuation for owners in town",
    painPoints: ["owners are curious but not ready to call", "listings need more reach", "trust is hard to establish quickly"],
    proofAngles: ["local market knowledge", "recent sold examples", "neighborhood familiarity", "clear next steps"],
    defaultCta: "Request your local estimate"
  },
  {
    id: "home_services",
    label: "Home services",
    exampleOffer: "Book a spring cleaning estimate",
    painPoints: ["customers wait until the problem gets worse", "before/after proof matters", "availability fills up"],
    proofAngles: ["before and after", "licensed crew", "fast estimate", "clean work area"],
    defaultCta: "Book a free estimate"
  },
  {
    id: "tutor",
    label: "Tutor / class / coach",
    exampleOffer: "Beginner AI class for adults",
    painPoints: ["people feel behind", "they do not know where to start", "they want practical examples"],
    proofAngles: ["simple lesson plan", "beginner friendly", "real examples", "small group format"],
    defaultCta: "Save your seat"
  },
  {
    id: "med_spa",
    label: "Med spa / wellness",
    exampleOffer: "Intro consultation for new clients",
    painPoints: ["customers are unsure what treatment fits", "before/after content needs context", "trust and taste matter"],
    proofAngles: ["consultation first", "professional setting", "subtle results", "clear process"],
    defaultCta: "Book a consultation"
  },
  {
    id: "consultant",
    label: "Consultant / professional service",
    exampleOffer: "One-hour AI workflow audit",
    painPoints: ["workflows are repetitive", "owners do not know what to automate", "software feels overwhelming"],
    proofAngles: ["one practical fix", "plain-English plan", "small-business focus", "measurable time savings"],
    defaultCta: "Schedule the audit"
  }
];

export function getVerticalConfig(id: BusinessVertical): VerticalConfig {
  return verticals.find((vertical) => vertical.id === id) ?? verticals[0];
}
