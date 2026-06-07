export type Scene = {
  id: string;
  durationSeconds: number;
  visual: string;
  caption: string;
  motion: "push" | "pan" | "cut" | "zoom" | "hold";
};

export type VideoSpec = {
  title: string;
  aspectRatio: "9:16";
  totalSeconds: number;
  musicMood: "clean" | "upbeat" | "calm" | "bold";
  scenes: Scene[];
};

export function createVideoSpec(params: {
  title: string;
  hook: string;
  offer: string;
  proof: string;
  cta: string;
  brandTone: string;
}): VideoSpec {
  const scenes: Scene[] = [
    {
      id: "hook",
      durationSeconds: 3,
      visual: "Hero image or short product/service clip with strong text overlay.",
      caption: params.hook,
      motion: "push"
    },
    {
      id: "problem",
      durationSeconds: 4,
      visual: "Close crop of the common customer problem or messy before state.",
      caption: `Most people wait too long before checking ${params.offer.toLowerCase()}.`,
      motion: "cut"
    },
    {
      id: "proof",
      durationSeconds: 5,
      visual: "Show process, staff, workspace, food, room, class, or finished result.",
      caption: params.proof,
      motion: "pan"
    },
    {
      id: "offer",
      durationSeconds: 5,
      visual: "Offer card with brand colors, simple price/value framing, and clean CTA.",
      caption: params.offer,
      motion: "zoom"
    },
    {
      id: "cta",
      durationSeconds: 3,
      visual: "Logo, location, handle, and one action only.",
      caption: params.cta,
      motion: "hold"
    }
  ];

  return {
    title: params.title,
    aspectRatio: "9:16",
    totalSeconds: scenes.reduce((total, scene) => total + scene.durationSeconds, 0),
    musicMood: params.brandTone.toLowerCase().includes("calm") ? "calm" : "upbeat",
    scenes
  };
}
