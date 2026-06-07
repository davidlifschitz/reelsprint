export type ContentPost = {
  day: number;
  slot: "morning" | "afternoon" | "evening" | "bonus";
  bucket: "pain" | "demo" | "niche" | "build" | "tutorial";
  hook: string;
  format: string;
  cta: string;
};

const buckets = ["pain", "demo", "niche", "tutorial"] as const;

export const contentCalendar: ContentPost[] = Array.from({ length: 100 }, (_, index) => {
  const day = Math.floor(index / 4) + 1;
  const slot = (["morning", "afternoon", "evening", "bonus"] as const)[index % 4];
  const bucket = index % 10 === 0 ? "build" : buckets[index % buckets.length];

  const hooksByBucket = {
    pain: [
      "POV: you run a local business and still have no idea what to post today.",
      "Your offer is good. The post explaining it is the bottleneck.",
      "Small businesses do not need more editing tools. They need finished posts.",
      "You should not need a content team to post one clean promo."
    ],
    demo: [
      "One offer in. Five promo concepts out.",
      "Turning a plain service description into a TikTok script.",
      "Here is the same offer in restaurant, realtor, and tutor formats.",
      "This is what a 20-second local business promo can look like."
    ],
    niche: [
      "TikTok ideas for dentists who hate sounding salesy.",
      "Promo ideas for realtors who do not want generic listing videos.",
      "How a local restaurant can post without dancing or trends.",
      "A tutor can turn one class description into a month of posts."
    ],
    build: [
      "Day one: building the app I wish local businesses had.",
      "I am narrowing the app on purpose: one customer, one job, one output.",
      "The market is broad. The product has to start narrow.",
      "I am not building a video editor. I am building a promo pack generator."
    ],
    tutorial: [
      "Step 1: enter your business. Step 2: enter your offer. Step 3: export posts.",
      "How to use ReelSprint when you only have one product photo.",
      "The fastest way to make five local promo hooks.",
      "How to pick the right CTA for a local business video."
    ]
  } as const;

  const hookList = hooksByBucket[bucket];

  return {
    day,
    slot,
    bucket,
    hook: hookList[index % hookList.length],
    format: index % 3 === 0 ? "screen recording + voiceover" : index % 3 === 1 ? "talking head + demo overlay" : "before/after carousel video",
    cta: index % 5 === 0 ? "Comment your business type and I’ll make one." : "Try the free promo pack generator."
  };
});
