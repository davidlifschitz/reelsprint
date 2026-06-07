import { BusinessVertical, getVerticalConfig } from "@/data/verticals";
import { VideoSpec, createVideoSpec } from "@/lib/videoSpec";

export type BusinessProfile = {
  businessName: string;
  vertical: BusinessVertical;
  location: string;
  offer: string;
  tone: "friendly" | "premium" | "bold" | "calm";
  audience: string;
};

export type PromoVideoIdea = {
  id: string;
  title: string;
  hook: string;
  caption: string;
  hashtags: string[];
  shotList: string[];
  cta: string;
  videoSpec: VideoSpec;
};

const toneWords: Record<BusinessProfile["tone"], string[]> = {
  friendly: ["simple", "approachable", "neighborhood", "human"],
  premium: ["polished", "high-trust", "minimal", "tasteful"],
  bold: ["direct", "high-energy", "urgent", "clear"],
  calm: ["steady", "reassuring", "plain-spoken", "low-pressure"]
};

function slug(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "promo";
}

export function createPromoPack(profile: BusinessProfile): PromoVideoIdea[] {
  const vertical = getVerticalConfig(profile.vertical);
  const offer = profile.offer.trim() || vertical.exampleOffer;
  const audience = profile.audience.trim() || "local customers";
  const location = profile.location.trim() || "your area";
  const businessName = profile.businessName.trim() || "Your Business";
  const cta = vertical.defaultCta;

  const hooks = [
    `POV: you need ${offer.toLowerCase()}, but you do not want a complicated process.`,
    `Before you book ${offer.toLowerCase()}, watch this.`,
    `${location} customers: this is the simple way to handle ${offer.toLowerCase()}.`,
    `Three signs it may be time to consider ${offer.toLowerCase()}.`,
    `We turned one local offer into a clean 20-second promo.`
  ];

  return hooks.map((hook, index) => {
    const proof = vertical.proofAngles[index % vertical.proofAngles.length];
    const pain = vertical.painPoints[index % vertical.painPoints.length];
    const tone = toneWords[profile.tone][index % toneWords[profile.tone].length];
    const title = `${businessName}: ${["Problem/Solution", "Before You Book", "Local Proof", "Three Signs", "Offer Card"][index]}`;

    const caption = [
      hook,
      `${businessName} helps ${audience} with ${offer.toLowerCase()} in a ${tone} way.`,
      `The real problem: ${pain}.`,
      `${cta}.`
    ].join(" ");

    const videoSpec = createVideoSpec({
      title,
      hook,
      offer,
      proof: `Proof angle: ${proof}. Keep the visual specific and real.`,
      cta,
      brandTone: profile.tone
    });

    return {
      id: `${slug(businessName)}-${index + 1}`,
      title,
      hook,
      caption,
      hashtags: [
        `#${slug(location).replace(/-/g, "")}`,
        "#smallbusiness",
        "#localbusiness",
        `#${slug(vertical.label).replace(/-/g, "")}`,
        "#reels"
      ],
      shotList: [
        "1 vertical photo or short clip of the product/service",
        "1 process shot that proves the work is real",
        "1 clean logo or brand card",
        "1 CTA screen with handle, phone, URL, or booking link"
      ],
      cta,
      videoSpec
    };
  });
}

export const defaultProfile: BusinessProfile = {
  businessName: "David AI Consulting",
  vertical: "consultant",
  location: "New Jersey",
  offer: "One-hour AI workflow audit",
  tone: "friendly",
  audience: "local business owners"
};
