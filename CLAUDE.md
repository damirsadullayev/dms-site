# CLAUDE.md — DMS Project Source of Truth

> Read this entire file before generating any code, copy, or design decision.
> This file wins any conflict with reference material, screenshots, or templates.
> If a request contradicts this file, ask the user before proceeding.

---

## 0. Hard Rules (Non-Negotiable)

These rules exist because previous AI tools have repeatedly defaulted to violations. Active vigilance required.

1. **NEVER use italic styling on any display headline.** Emphasis is achieved exclusively through the lime accent color (`var(--accent)`). If you generate `font-style: italic` on a headline, you have violated the design system. Re-check before output.

2. **NEVER use colors outside the locked palette.** No gradients, no glows, no neon, no rainbow accents. Only the six core tokens defined in Section 6.

3. **NEVER use border-radius greater than 8px on rectangular surfaces.** Pills (border-radius: 999px) are reserved exclusively for navigation containers and primary CTA buttons.

4. **NEVER apologize for DMS being new, solo, or pre-revenue in any copy.** Solo and focused is the offer, not the caveat.

5. **NEVER generate copy beyond what's in this file without asking the user first.** No "trusted by" logos, fake testimonials, AI-generated quotes, or filler statistics.

6. **NEVER use emojis** in code, markup, text content, or alt text.

7. **NEVER use serif fonts on dashboards or software UIs.** Instrument Serif is for the marketing site's display headlines only.

8. **NEVER use `h-screen` for full-height sections.** Always use `min-h-[100dvh]` — `h-screen` causes layout jumping on iOS Safari.

9. **NEVER use raw `<img>` tags.** Always use `next/image`. Never use raw `<a>` tags for internal links — always use `next/link`.

10. **NEVER use bounce or elastic/spring easing.** All animations use `cubic-bezier(0.23, 1, 0.32, 1)`. Real objects decelerate smoothly.

---

## 1. What DMS Is

DMS is an influencer marketing operation built specifically for gaming and tech hardware brands. Monitors, peripherals, PC parts, gaming chairs, capture cards, streaming gear.

Run by Damir Sadullaev. One operator, by design. No handoffs, no account managers, no junior staff between the brand and the work.

One sentence:

**Gaming and tech hardware influencer marketing — one operator, every deal, start to finish.**

---

## 2. Positioning

**Category:** Influencer marketing — gaming and tech hardware vertical.

**Target audience (equal weight):**
- **Brands:** Monitor makers, PC parts (GPU, CPU, RAM, storage, motherboards, cases), peripherals (keyboards, mice, headsets, mics, controllers), gaming chairs, capture cards, streaming software, gaming-adjacent SaaS.
- **Creators:** Tech and gaming YouTube, Twitch, TikTok, Instagram creators.

**Positioning frame:** Not the cheapest. Not the biggest. The **specialist** — the one buyers and creators come to when they want gaming and tech hardware done by someone who actually gets it.

---

## 3. The Edge

1. **Speed.** Decisions in hours, not weeks. 24h first reply. 5-day shortlist.
2. **Specialist focus.** Only gaming and tech hardware. No fashion, no fitness, no "we also do gaming."
3. **Cultural fluency.** Damir is the audience — plays the games, builds the PCs.
4. **Honest both ways.** Bad deals get killed. Brands get fair rates, creators get fair splits.
5. **Direct pricing.** No retainers. Project-based or commission-based.

---

## 4. Key Messages (Hierarchy)

Every page should reinforce at least the top three.

1. Built only for gaming and tech hardware.
2. One operator, every deal — no handoffs.
3. Speed is the product.
4. Cultural fluency — run by the audience, not someone selling to it.
5. Honest both ways.

---

## 5. Voice & Tone Rules

**Voice = direct, operational, slightly understated. Confident, never apologetic.**

- Reads like a competent operator, not a marketing agency.
- Uses "DMS" everywhere, "I" only in personal moments.
- Numbers and concrete actions beat adjectives.
- Short sentences. One idea per line.
- Never apologize for being new, small, or solo.

**Words DMS uses:** shortlist, outreach, deal, terms, brief, deliverable, pass, ship, reply, scope, contract, owner, commission, fit, signal, operator, specialist, vertical.

**Words DMS NEVER uses:** journey, partner with purpose, storytelling, authentic voice, drive results, unlock value, level up, reimagine, holistic, curated experiences, passionate, synergy, ecosystem, amplify, elevate, transformative, best-in-class, thought leader, seamless, unleash, next-gen.

### Content Authenticity Rules

- **Never use generic placeholder names** like "John Doe," "Sarah Chan," "Acme Corp," "Nexus," "SmartFlow."
- **Never use predictable numbers** like 99.99%, 50%, 1,234 users. Use organic numbers: 47.2%, 1,847 reach, 2.3M views.
- **For phone placeholders**, use realistic format: `+1 (312) 847-1928`, not `555-1234`.
- **Avatar placeholders**: specific styled SVG or real photos. Never generic user icons.

---

## 6. Design System — Locked Tokens

### Colors (the only six allowed)

```css
:root {
  --bg: #0a0a0a;                          /* warm black background */
  --bg-elevated: #111111;                 /* modals, popovers */
  --accent: #c8ff00;                      /* lime — 2-3 elements per section max */
  --fg: #f0f0f0;                          /* primary text */
  --fg-muted: rgba(240, 240, 240, 0.45);  /* secondary text */
  --fg-faint: rgba(240, 240, 240, 0.25);  /* placeholders, disabled */
}
```

### Surfaces & Borders

```css
--surface: rgba(255, 255, 255, 0.04);
--surface-hover: rgba(255, 255, 255, 0.06);
--border-default: rgba(200, 255, 0, 0.15);
--border-hover: rgba(200, 255, 0, 0.35);
--hairline: rgba(240, 240, 240, 0.08);
```

### Typography

**Three fonts only. Load via Google Fonts in src/app/layout.tsx.**

```css
--font-display: 'Instrument Serif', serif;
--font-ui: 'Manrope', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

**Type scale:**

| Token | Font | Weight | Size | Line-height | Letter-spacing | Use |
|-------|------|--------|------|-------------|----------------|-----|
| Display 1 | Instrument Serif | 400 | clamp(48px, 8vw, 76px) | 0.92 | -0.03em | Hero headline |
| Display 2 | Instrument Serif | 400 | clamp(32px, 5vw, 48px) | 0.96 | -0.025em | Section openers |
| Display 3 | Instrument Serif | 400 | 32px | 1.0 | -0.02em | Subsection display |
| H1 | Manrope | 700 | 40px | 1.08 | -0.02em | Section headlines |
| H2 | Manrope | 700 | 28px | 1.12 | -0.015em | Subsection titles |
| H3 | Manrope | 600 | 20px | 1.2 | -0.01em | Service item titles |
| Body LG | Manrope | 400 | 18px | 1.5 | — | Hero subhead |
| Body | Manrope | 400 | 16px | 1.55 | — | Default body |
| Body SM | Manrope | 400 | 14px | 1.5 | — | Footer, metadata |
| Button | Manrope | 600 | 14px | 1.0 | 0 | CTAs |
| Eyebrow | JetBrains Mono | 500 | 11px | 1.0 | 0.12em uppercase | Section eyebrows |
| Stat Label | JetBrains Mono | 500 | 11px | 1.0 | 0.12em uppercase | Stats descriptors |

### Headline Emphasis Rule

Lime accent on the meaning-carrying word. **Never italic. Never bold. Never a different font.**

```tsx
// CORRECT
<h1>Brands meet creators. <span style={{ color: 'var(--accent)' }}>Without the noise.</span></h1>

// WRONG — italic
<h1>Brands meet creators. <em>Without the noise.</em></h1>
```

**CRITICAL — preserve space before accent span:**
```tsx
// CORRECT — space before span
Without <span style={{ color: 'var(--accent)' }}>the noise.</span>

// WRONG — words touch
Without<span style={{ color: 'var(--accent)' }}>the noise.</span>
```

### Spacing Scale

```css
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
--space-5: 24px;  --space-6: 32px;  --space-7: 48px;  --space-8: 64px;
--space-9: 96px;  --space-10: 128px;
```

Every padding, margin, and gap must come from this scale. Never arbitrary pixel values.

### Radii

```css
--radius-0: 0px;      /* dividers, strips */
--radius-xs: 2px;     /* chips, badges */
--radius-sm: 4px;     /* form inputs */
--radius-md: 6px;     /* utility */
--radius-lg: 8px;     /* cards — MAX for rectangles */
--radius-pill: 999px; /* nav + CTAs ONLY */
```

### Motion — Emil Kowalski Principles

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);   /* all UI interactions */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1); /* on-screen movement */
--duration-fast: 140ms;   /* press/hover feedback */
--duration-base: 220ms;   /* dropdowns, cards, reveals */
--duration-slow: 420ms;   /* modals, drawers */
--stagger: 60ms;           /* between sequential elements */
```

**Emil's Animation Decision Rule — run this before adding ANY animation:**

| How often will users see this? | Decision |
|---|---|
| 100+ times/day (keyboard shortcuts, command palette) | NO animation. Ever. |
| Tens of times/day (hover effects, list nav) | Remove or drastically reduce |
| Occasional (modals, drawers, toasts) | Standard animation (220ms) |
| Rare/first-time (hero entrance, onboarding) | Can add delight |

**Never animate keyboard-initiated actions.**

**Motion rules (all mandatory):**
- Animate `transform` and `opacity` ONLY. Never `width`, `height`, `padding`, `margin`, `top`, `left`.
- For height changes: use `grid-template-rows` transitions.
- Use `ease-out` for entering elements (starts fast, feels responsive).
- Use `ease-in-out` for elements moving on-screen.
- Use `linear` for constant motion (marquee, progress bars).
- No bounce. No spring overshoots. No elastic easing. (Hard Rule #10)
- Press feedback: `translateY(2px)` + shadow compression at 60ms.
- Card hover: border opacity 15%→35% only. No transform.
- Always implement `useReducedMotion()` — users with motion sensitivity must be respected.
- `useMotionValue` + `useTransform` for cursor tracking — NEVER `useState` (re-renders on every mouse move).
- Gate hover animations: `@media (hover: hover) and (pointer: fine)`.
- Stagger delays: 30-80ms between items. Never longer — makes interface feel slow.
- Asymmetric timing: enter slower than exit. Exit always snappy (200ms ease-out).
- CSS animations for predetermined sequences (hardware accelerated). Framer Motion for dynamic/interruptible.
- `<AnimatePresence>` for mount/unmount transitions.

### Iconography

- Library: `lucide-react` ONLY.
- Stroke width: 1.5px.
- Sizes: 16, 20, or 24px only.
- Inherits `currentColor`.
- Never `fill`. Never emoji. Never custom SVG without asking.

---

## 7. Component Rules

### 7.1 Wordmark / Logo

HTML text only. Never an image.

```tsx
<span className="wordmark">
  dms<span style={{ color: 'var(--accent)' }}>.</span>
</span>
```

```css
.wordmark {
  font-family: var(--font-ui);
  font-weight: 800;
  letter-spacing: -0.045em;
  text-transform: lowercase;
  color: var(--fg);
}
```

The period is the Manrope ExtraBold native glyph — naturally square at this weight. This is intentional and owned. Never replace with a CSS pseudo-element or SVG square.

### 7.2 Buttons — 3D Press Physics

Two button styles only. Both have mechanical press feel.

**Primary (lime pill):**

```css
.btn-primary {
  background: var(--accent);
  color: var(--bg);
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 14px;
  height: 44px;
  padding: 0 var(--space-5);
  border: none;
  border-radius: var(--radius-pill);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.35), 0 4px 16px rgba(200, 255, 0, 0.12);
  transform: translateY(0);
  transition: transform 80ms var(--ease-out), box-shadow 80ms var(--ease-out);
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.35), 0 6px 22px rgba(200, 255, 0, 0.2);
}
.btn-primary:active {
  transform: translateY(2px);
  box-shadow: 0 0 0 rgba(0,0,0,0), 0 2px 8px rgba(200,255,0,0.1);
  transition: transform 60ms var(--ease-out), box-shadow 60ms var(--ease-out);
}
```

**Ghost (outline pill):**

```css
.btn-ghost {
  background: transparent;
  color: var(--fg);
  border: 0.5px solid rgba(255, 255, 255, 0.18);
  height: 44px;
  padding: 0 var(--space-5);
  border-radius: var(--radius-pill);
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  transform: translateY(0);
  transition: transform 80ms var(--ease-out), box-shadow 80ms var(--ease-out), border-color 180ms var(--ease-out);
}
.btn-ghost:hover { transform: translateY(-1px); border-color: rgba(255,255,255,0.35); }
.btn-ghost:active { transform: translateY(1px); transition: transform 60ms var(--ease-out); }
```

Total travel: 3px (-1px hover → +2px pressed). Press 60ms (faster than release 80ms — Emil's rule).
Never invent a third button style.

### 7.3 Navbar — Scroll-Triggered Floating Pill

At top (scrollY < 50): full-width, transparent, no border-radius.
After scroll: shrinks to centered floating pill with dark glass.

```tsx
// Behavior — useEffect scroll listener
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  let rafId: number;
  const onScroll = () => {
    rafId = requestAnimationFrame(() => setScrolled(window.scrollY > 50));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
}, []);
```

```css
/* Scrolled state — the container becomes a floating pill */
.navbar-inner.scrolled {
  max-width: 900px;
  margin: 8px auto 0;
  background: rgba(10, 10, 10, 0.55);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border-radius: 16px;
  border: 0.5px solid rgba(255, 255, 255, 0.06);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
```

Inner pill nav (Work/Approach/Proof/Contact):
- **Visible** when NOT scrolled (has background + border)
- **Hidden/transparent** when scrolled (outer container IS the pill — inner pill redundant)
- Transition: opacity/background 220ms var(--ease-out)

**Forbidden:** Glass on any other element. Light/frosted-white glass. Glow borders on glass.

### 7.4 Cards (Service / Numbered)

```tsx
<div className="card">
  <div className="eyebrow">01 — Sourcing</div>
  <h2>Hand-built shortlists</h2>
  <p>Creators vetted for audience fit, engagement quality, and brand safety.</p>
  <p className="closer">Not a database export.</p>
</div>
```

- Background: `var(--surface)`, border: `var(--border-default)`, radius: 8px
- Hover: border opacity 15%→35%. No scale, no shadow, no translate.
- **Closer rule:** Every card ends with a short declarative sentence defining the opposite. Mandatory.

### 7.5 Status Pills

State only. Never action. No hover, no click.

- JetBrains Mono 500, 11px, uppercase, 0.12em tracking
- Lime dot 5px: `opacity: 1 → 0.25 → 1` at 2.2s infinite
- Border: lime hairline 25%

### 7.6 Forms

- Background: `var(--surface)`, border: `var(--hairline)` default, `var(--border-hover)` focus
- Radius: 4px. Label above with 8px gap. No focus rings, no shadows.
- Placeholder: brand-toned — "Skip the deck." not "Tell us more..."

### 7.7 Stats Bar

Number font: Manrope 800. Label font: JetBrains Mono 500 11px uppercase.
First stat "24h": the "24" is lime, "h" is white. All others white. Intentional.

```
24h — FIRST REPLY    ← "24" lime
5d  — SHORTLIST      ← white
1:1 — SINGLE OWNER   ← white
0   — HANDOFFS       ← white
```

---

## 8. Quality Bar — The Frontend-Design Slop Filter

**Run this before outputting any component.**

### The AI Slop Test

*"If someone said 'AI made this,' would they believe me immediately?"*

If yes — the component fails. Rebuild with sharper opinions. A distinctive interface makes someone ask *"how was this made?"* not *"which AI made this?"*

The differentiator for DMS is intentionality. Every value is a decision. Nothing is inherited default.

### Design Direction (Commit to This)

DMS aesthetic = **dark editorial with operational tension.**
- Not gaming-aggressive (not Razer)
- Not generic SaaS (not Linear clone)
- Editorial restraint (like a high-end magazine that happens to be about gear)
- Operational texture (data, numbers, process — not lifestyle vibes)
- The one unforgettable thing: lime on black, Instrument Serif, square period. Owned.

### Cards & Containers

- Don't wrap everything in cards. Not everything needs a container.
- Don't nest cards inside cards. Flatten hierarchy.
- Don't use identical 3-column grids (icon + heading + text repeated). Vary sizes, use asymmetry.
- Cards exist ONLY when elevation communicates hierarchy. Otherwise: `border-t`, `divide-y`, or negative space.

### Buttons & Hierarchy

- Not every button is primary. One primary CTA + ghost links converts better than six primary buttons.
- Progressive disclosure: start simple, reveal sophistication through interaction.
- Every interactive surface: full state cycle (hover, active, focus, disabled).

### Modals

Don't use unless no better alternative. Try inline expansion or dedicated routes (`/contact`, `/approach`) first.

### Typography & Color

- No gradient text. No gray text on colored backgrounds.
- No pure `#000` or `#fff`. DMS uses `#0a0a0a` and `#f0f0f0`.
- No monospace as decoration. JetBrains Mono = operational data only.
- Vary font weights and sizes for visual hierarchy. Fluid sizing with `clamp()`.
- Pair Instrument Serif (feeling) with Manrope (clarity) — two fonts, two clear jobs, no overlap.

### Layout & Composition

- `max-w-7xl mx-auto` for page containment.
- CSS Grid over flex math. `grid-cols-3 gap-6` not `w-[calc(33%-1rem)]`.
- Left-align text. Center alignment for hero-only moments.
- Break the grid intentionally for emphasis. Asymmetry feels designed.
- Create rhythm through varied spacing — tight groupings AND generous separations.
- Use fluid spacing with `clamp()` that breathes on larger screens.

### Empty / Loading / Error States

- Loading: skeletal loaders matching layout. Not generic spinners.
- Empty states teach: "No projects yet — send a brief to start one."
- Error: clear, inline. Not generic "Something went wrong."

### Responsive

- Mobile-first. `min-h-[100dvh]` always.
- Adapt at breakpoints — don't just shrink. Asymmetric layouts collapse to single-column on mobile.
- Never hide critical functionality on mobile. Adapt it.
- Use `@container` queries for component-level responsiveness.

### Decorative Elements — Forbidden List

Never appear in DMS:

- Glassmorphism anywhere except the scroll-triggered navbar
- Radial gradient blob backgrounds (lava-lamp mesh gradients)
- Rounded elements with thick colored border on one side
- Sparklines as decoration
- Generic drop shadows (`shadow-md`, `shadow-lg` without customization)
- Large icons with rounded corners above every heading
- Cyan-on-dark color schemes
- Purple-to-blue gradients
- Neon glowing accents
- Hero metric template (big number + small label + supporting stats + gradient accent)
- Custom mouse cursors
- Centered hero text over a dark image (use asymmetric: text left, visual right)
- Generic Unsplash photos without curation

### The Final Two Filters

1. **Removal test:** Remove one decorative element. Better or worse? If better, remove permanently. Repeat.
2. **Specificity test:** Could this work for any startup with colors swapped? If yes — start over.

---

## 9. Engineering Hardening

### Stack (locked)

- **Next.js 14+ App Router** (NOT Pages Router)
- **TypeScript** throughout — all files `.tsx` or `.ts`, never `.jsx` or `.js`
- **Tailwind CSS v3** (Next.js ships v3 — do not upgrade to v4)
- **Framer Motion** for animation
- **lucide-react** for icons
- **next/image** for all images. **next/link** for all internal navigation.
- No shadcn/ui unless explicitly asked. If used, customize all radii/colors/shadows to DMS tokens.

### Component Architecture

- Server Components by default.
- Add `'use client'` ONLY when using `useState`, `useEffect`, `useRef`, or browser APIs.
- Navbar and Hero both require `'use client'` (scroll listeners + Framer Motion).
- File structure: `src/app/` for pages/layouts, `src/components/` for components.
- Local `useState`/`useReducer` for isolated UI. Global state only for deep prop-drilling.

### Layout & Viewport

- Full-height sections: `min-h-[100dvh]` ALWAYS. Never `h-screen`. (Hard Rule #8)
- Page containment: `max-w-7xl mx-auto`
- CSS Grid over flex math
- Mobile fallback: asymmetric layouts above `md:` MUST collapse to single column below 768px

### Performance

- Animate ONLY `transform` and `opacity`. Never layout properties.
- `useMotionValue` + `useTransform` for cursor/magnetic effects. Never `useState`.
- Grain/noise: only on `fixed inset-0 pointer-events-none` pseudo-elements.
- Always cleanup `useEffect` listeners.
- `will-change: transform` sparingly — only on actively animating elements.
- `<AnimatePresence>` for dynamic list mount/unmount.
- CSS animations for predetermined sequences (off main thread). Framer Motion for dynamic.

### TypeScript Rules

- Explicit prop types for every component — no `any`.
- Use `interface` for component props, `type` for unions/intersections.
- Type all `useRef` — `useRef<HTMLDivElement>(null)`.
- Import React types: `import type { FC, ReactNode } from 'react'`.

### Dependency Verification

Installed packages (verify before importing):
- `next`, `react`, `react-dom`
- `framer-motion`
- `lucide-react`
- `tailwindcss`, `postcss`, `autoprefixer`
- `typescript`, `@types/react`, `@types/node`

Never assume a library exists. Check `package.json` first.

---

## 10. Page Architecture

Site sections in order:

1. **Hero** — the offer in one breath
2. **Who it's for** — brands / creators split
3. **Services** — five numbered cards
4. **Why DMS** — comparison vs. traditional agency
5. **Approach** — working session, not sales pitch
6. **Contact** — three ways in
7. **Footer** — minimal, no fake org chart

---

## 11. Section Copy (Exact — Do Not Deviate)

### Hero

**Eyebrow:** `Gaming & tech hardware partnerships`
**Headline:** `Brands meet creators. Without the noise.`
(White on "Brands meet creators." — Lime on "Without the noise." — space preserved before "Without")
**Subhead:** `Influencer marketing built only for gaming and tech hardware. One operator running every deal from first email to final invoice.`
**Primary CTA:** `Start a project` + ArrowUpRight icon
**Secondary CTA:** `How it works`
**Stats:** `24h — First reply` · `5d — Shortlist` · `1:1 — Single owner` · `0 — Handoffs`

### Who It's For

**Heading:** `Two sides. One operator.`

**For brands:** You make monitors, peripherals, PC parts, or gaming software. You want creators whose audience actually buys what you sell — not just whoever has the biggest follower count. DMS sources the shortlist, runs the outreach, negotiates the terms, and manages delivery. You see one inbox and one invoice.
**CTA:** `Brief a project →`

**For creators:** You make tech or gaming content. You're tired of one-line pitches from agencies that have clearly never watched your channel. DMS only brings you deals where the brand is right, the rate is fair, and the brief respects your audience. Commission-based — DMS gets paid when you do.
**CTA:** `Get on the roster →`

### Services

`01 — Sourcing` — Hand-built shortlists of creators in tech and gaming. Vetted for audience fit, engagement quality, and brand safety. *Not a database export.*
`02 — Outreach` — Human-written first contact. No templates. No mass blasts. *Every pitch is specific.*
`03 — Negotiation` — Rate, scope, deliverables, usage rights, timeline. Written down. *Signed before anything ships.*
`04 — Production ops` — Brief review, content approval, revision rounds, posting schedule. *One thread, one owner.*
`05 — Reporting` — Plain numbers. What ran, what it cost, what it returned. *No vanity metrics.*

### Why DMS

**Heading:** `Five people, one week. Or one person, one day.`

Traditional agency: Account exec scopes → Junior sources from database → Manager reshuffles → Director presents → Project manager runs delivery. Every step adds a day. Every layer adds a fee.

DMS: DMS reads the brief. DMS sources the creators. DMS pitches the brand. DMS runs delivery. DMS reports. One operator. One thread. One invoice.

### Approach

**Heading:** `See the approach before you commit.`
**Body:** DMS works narrow on purpose — gaming and tech hardware only. That focus means the first call isn't a sales pitch. It's a working session: send a category, a budget range, or a campaign you're considering, and you'll get a real take on creator fit, expected rates, and what would actually move your numbers. No deck, no upsell.
**What you get:** Sample shortlist of 3-5 creators · Honest rate read · Angles a generalist misses · Timeline and price
**CTA:** `Book the first call →`

### Contact

**Heading:** `Three ways in.`
- **Brand brief** — Send what you're launching, your budget range, and your category. Reply in 24 hours.
- **Creator intro** — Send your channel, your usual rate, and one brand you'd want to work with.
- **Just a question** — Reply with whatever. Every email gets read.
**CTA:** `damir@dms.[domain] →`

### Footer

```
DMS — Influencer marketing for gaming and tech hardware.
Email — damir@dms.[domain] · Reply window — 24h, weekdays
```

No Careers, Press, Partners, or Team links.

---

## 12. Build Order

One section at a time. Stop after each for review.

1. [ ] `src/app/globals.css` — design tokens + Google Fonts + base styles
2. [ ] `src/app/layout.tsx` — font loading, metadata, base layout
3. [ ] `src/components/Navbar.tsx` — scroll-triggered floating pill
4. [ ] `src/components/Hero.tsx` — full hero with stats bar
5. [ ] Stop. Wait for review.
6. [ ] `src/components/WhoItsFor.tsx`
7. [ ] Continue section by section.

---

## 13. Pre-Flight Check (Run Before Every Commit)

- [ ] AI Slop Test passed?
- [ ] Removal Test passed? (removed decoration = better?)
- [ ] Specificity Test passed? (unmistakably DMS, not any startup?)
- [ ] Colors only from six locked tokens?
- [ ] Spacing only from 10-step scale?
- [ ] Radii within locked options (max 8px for rectangles)?
- [ ] Motion uses `--ease-out` and locked durations?
- [ ] `min-h-[100dvh]` not `h-screen`?
- [ ] Only `transform` + `opacity` animated?
- [ ] `useEffect` listeners cleaned up?
- [ ] `useReducedMotion()` implemented?
- [ ] Empty/loading/error states provided?
- [ ] Any italic on a headline? (Hard Rule #1 — if yes, REGENERATE)
- [ ] Space preserved before lime accent span?
- [ ] Button press physics per Section 7.2?
- [ ] Glass only on scroll navbar?
- [ ] Generic placeholder names used? (John Doe, Acme — FORBIDDEN)
- [ ] Predictable numbers used? (99.99%, 50% — FORBIDDEN)
- [ ] `next/image` for all images?
- [ ] `next/link` for all internal links?
- [ ] `'use client'` only where actually needed?
- [ ] All TypeScript types explicit — no `any`?

---

## 14. What This File Is For

- **Claude Code:** Read this entire file before generating any code. Every component reinforces Section 5 voice and Section 4 key messages. This file wins all conflicts.
- **Damir:** Read before changing anything. If a new idea contradicts this file, update the file first or kill the idea.
- **Future collaborators:** Sections 5, 6, 7, 8 are the design contract.

Reference skill files (philosophical background) live at `/dms-site/design-references/`. CLAUDE.md is the active enforcement layer. Skills are reference only.

Last updated: Next.js + TypeScript migration.
