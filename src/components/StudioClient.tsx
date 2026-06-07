"use client";

import { FormEvent, useMemo, useState } from "react";
import { verticals, BusinessVertical } from "@/data/verticals";
import { BusinessProfile, createPromoPack, defaultProfile, PromoVideoIdea } from "@/lib/generator";
import { contentCalendar } from "@/lib/contentCalendar";

export function StudioClient() {
  const [profile, setProfile] = useState<BusinessProfile>(defaultProfile);
  const [pack, setPack] = useState<PromoVideoIdea[]>(() => createPromoPack(defaultProfile));
  const [mode, setMode] = useState<"local" | "ai" | "loading">("local");
  const [activeIdeaId, setActiveIdeaId] = useState(pack[0]?.id ?? "");

  const activeIdea = useMemo(() => pack.find((idea) => idea.id === activeIdeaId) ?? pack[0], [pack, activeIdeaId]);
  const samplePosts = useMemo(() => contentCalendar.slice(0, 12), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMode("loading");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
      const data = await response.json();
      const nextPack = data.pack?.length ? data.pack : createPromoPack(profile);
      setPack(nextPack);
      setActiveIdeaId(nextPack[0]?.id ?? "");
      setMode(data.mode ?? "local");
    } catch {
      const nextPack = createPromoPack(profile);
      setPack(nextPack);
      setActiveIdeaId(nextPack[0]?.id ?? "");
      setMode("local");
    }
  }

  return (
    <main>
      <section className="hero-shell">
        <nav className="nav">
          <div className="brand-mark">RS</div>
          <div className="brand-copy">
            <strong>ReelSprint</strong>
            <span>Promo video packs for local businesses</span>
          </div>
          <a className="nav-link" href="#studio">Build a pack</a>
        </nav>

        <div className="hero-grid">
          <div>
            <p className="eyebrow">Legally distinct wedge: not another generic video editor</p>
            <h1>Turn one local business offer into five TikTok/Reels-ready promo concepts.</h1>
            <p className="lede">
              ReelSprint starts with the narrow job that local businesses actually need: a clear offer, a short hook,
              a shot list, captions, hashtags, and a simple vertical video structure.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#studio">Generate sample pack</a>
              <a className="button secondary" href="#calendar">View 100-post system</a>
            </div>
          </div>

          <div className="hero-card">
            <p className="card-label">Sample output</p>
            <h2>{activeIdea?.title}</h2>
            <p>{activeIdea?.hook}</p>
            <div className="phone-preview">
              <div className="phone-bar" />
              <div className="phone-caption">{activeIdea?.videoSpec?.scenes?.[0]?.caption}</div>
              <div className="phone-cta">{activeIdea?.cta}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="section studio-grid">
        <form className="panel form-panel" onSubmit={handleSubmit}>
          <p className="eyebrow">MVP generator</p>
          <h2>Create a promo pack</h2>

          <label>
            Business name
            <input
              value={profile.businessName}
              onChange={(event) => setProfile({ ...profile, businessName: event.target.value })}
              placeholder="David AI Consulting"
            />
          </label>

          <label>
            Business type
            <select
              value={profile.vertical}
              onChange={(event) => setProfile({ ...profile, vertical: event.target.value as BusinessVertical })}
            >
              {verticals.map((vertical) => (
                <option key={vertical.id} value={vertical.id}>
                  {vertical.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Location
            <input
              value={profile.location}
              onChange={(event) => setProfile({ ...profile, location: event.target.value })}
              placeholder="New Jersey"
            />
          </label>

          <label>
            Offer
            <textarea
              value={profile.offer}
              onChange={(event) => setProfile({ ...profile, offer: event.target.value })}
              placeholder="One-hour AI workflow audit"
              rows={3}
            />
          </label>

          <label>
            Audience
            <input
              value={profile.audience}
              onChange={(event) => setProfile({ ...profile, audience: event.target.value })}
              placeholder="local business owners"
            />
          </label>

          <label>
            Tone
            <select
              value={profile.tone}
              onChange={(event) => setProfile({ ...profile, tone: event.target.value as BusinessProfile["tone"] })}
            >
              <option value="friendly">Friendly</option>
              <option value="premium">Premium</option>
              <option value="bold">Bold</option>
              <option value="calm">Calm</option>
            </select>
          </label>

          <button className="button primary full" type="submit" disabled={mode === "loading"}>
            {mode === "loading" ? "Generating..." : "Generate pack"}
          </button>
          <p className="fine-print">Mode: {mode === "ai" ? "OpenAI-backed" : mode === "loading" ? "loading" : "local deterministic fallback"}</p>
        </form>

        <div className="panel output-panel">
          <div className="output-header">
            <div>
              <p className="eyebrow">Generated assets</p>
              <h2>Five video concepts</h2>
            </div>
          </div>

          <div className="idea-tabs">
            {pack.map((idea, index) => (
              <button
                key={idea.id}
                className={idea.id === activeIdea?.id ? "tab active" : "tab"}
                onClick={() => setActiveIdeaId(idea.id)}
              >
                Concept {index + 1}
              </button>
            ))}
          </div>

          {activeIdea ? (
            <article className="idea-detail">
              <h3>{activeIdea.title}</h3>
              <p className="hook">{activeIdea.hook}</p>
              <div className="two-col">
                <div>
                  <h4>Caption</h4>
                  <p>{activeIdea.caption}</p>
                  <h4>Hashtags</h4>
                  <p>{activeIdea.hashtags.join(" ")}</p>
                </div>
                <div>
                  <h4>Shot list</h4>
                  <ul>
                    {activeIdea.shotList.map((shot) => (
                      <li key={shot}>{shot}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <h4>20-second video structure</h4>
              <div className="scene-list">
                {activeIdea.videoSpec.scenes.map((scene) => (
                  <div key={scene.id} className="scene-row">
                    <span>{scene.durationSeconds}s</span>
                    <strong>{scene.caption}</strong>
                    <small>{scene.motion} · {scene.visual}</small>
                  </div>
                ))}
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section id="calendar" className="section">
        <div className="section-heading">
          <p className="eyebrow">Distribution system</p>
          <h2>First 100 TikToks/Reels without spam behavior</h2>
          <p>
            The repo includes a 100-post calendar. The product angle is repeated, but every post has a different hook,
            format, or niche example.
          </p>
        </div>
        <div className="calendar-grid">
          {samplePosts.map((post, index) => (
            <article key={`${post.day}-${post.slot}-${index}`} className="calendar-card">
              <span>Day {post.day} · {post.slot}</span>
              <strong>{post.hook}</strong>
              <small>{post.bucket} · {post.format}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section pricing-grid">
        <div className="price-card">
          <span>Free</span>
          <h3>$0</h3>
          <p>3 promo packs/month. Good for validation and collecting leads.</p>
        </div>
        <div className="price-card featured">
          <span>Pro</span>
          <h3>$14.99/mo</h3>
          <p>Unlimited drafts, exports, captions, and local-business template packs.</p>
        </div>
        <div className="price-card">
          <span>Business</span>
          <h3>$29.99/mo</h3>
          <p>Multiple businesses, saved brand kits, and reusable campaign history.</p>
        </div>
      </section>

      <footer className="footer">
        <strong>ReelSprint</strong>
        <span>Build local-business promo assets without cloning another app.</span>
      </footer>
    </main>
  );
}
