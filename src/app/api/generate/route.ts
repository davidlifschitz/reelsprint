import { NextResponse } from "next/server";
import { BusinessProfile, createPromoPack } from "@/lib/generator";

async function generateWithOpenAI(profile: BusinessProfile) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content:
            "You generate concise, practical short-form video promo ideas for local businesses. Return valid JSON only."
        },
        {
          role: "user",
          content: `Create five legally distinct TikTok/Reels promo ideas for this business profile: ${JSON.stringify(profile)}. Return an array of objects with title, hook, caption, hashtags, shotList, and cta.`
        }
      ]
    })
  });

  if (!response.ok) return null;
  const data = await response.json();
  const text = data.output_text as string | undefined;
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const profile = (await request.json()) as BusinessProfile;
    const aiPack = await generateWithOpenAI(profile);
    const fallbackPack = createPromoPack(profile);

    return NextResponse.json({
      mode: aiPack ? "ai" : "local",
      pack: aiPack ?? fallbackPack,
      videoSpecs: fallbackPack.map((idea) => idea.videoSpec)
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Could not generate promo pack.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 400 }
    );
  }
}
