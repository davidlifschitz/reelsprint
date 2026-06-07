# ReelSprint

ReelSprint is a legally distinct MVP for generating short-form promo video packs for local businesses.

The product is intentionally narrower than a general-purpose video editor. The first customer is a local business owner who has one offer, one or two photos, and no time to plan content.

## What it does now

- Collects a small business profile: business type, location, offer, audience, and tone.
- Generates five TikTok/Reels promo concepts.
- Produces hooks, captions, hashtags, shot lists, CTAs, and a 20-second scene structure.
- Shows a 100-post distribution system for launch content.
- Uses local deterministic generation by default.
- Can optionally call OpenAI through `/api/generate` when `OPENAI_API_KEY` is set.

## What it does not do

- It does not clone another app's branding, UI, assets, templates, or code.
- It does not automate spam, fake engagement, or repetitive posting.
- It does not render final MP4 files yet. The current MVP outputs a `VideoSpec` that a renderer can consume next.

## Stack

- Next.js App Router
- React
- TypeScript
- Plain CSS
- Optional OpenAI Responses API call via server route

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Optional AI mode

Add an API key to `.env.local`:

```bash
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1-mini
```

Without a key, the app uses deterministic local generation.

## Push to GitHub

The GitHub connector available in ChatGPT did not expose repository creation, so this scaffold is ready to push manually:

```bash
cd reelsprint
git init
git add .
git commit -m "Initial ReelSprint MVP"
gh repo create davidlifschitz/reelsprint --public --source=. --remote=origin --push
```

Or create an empty public repo named `reelsprint` in GitHub, then run:

```bash
git remote add origin git@github.com:davidlifschitz/reelsprint.git
git branch -M main
git push -u origin main
```

## Product wedge

> Promo video packs for local businesses, not a generic video editor.

The first version should optimize for getting one usable campaign out quickly:

1. Business profile
2. Offer
3. Tone
4. Five promo concepts
5. Captions + shot lists + scene specs
6. Later: MP4 rendering and brand kit persistence

## Next build tasks

1. Save generated packs to Supabase.
2. Add Stripe subscriptions.
3. Add brand kit upload: logo, colors, fonts.
4. Implement video rendering with Remotion or FFmpeg.
5. Export MP4 + caption file + hashtag file.
6. Add campaign history and duplicate/edit workflow.
