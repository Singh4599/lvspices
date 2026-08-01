# LV Spices - Project Tracker & Philosophy

This document is the **single source of truth** for the LV Spices website project. Update it every time a major section or page is completed.

---

## 🎯 Core Design Philosophy

**"Animation-First, Light Theme, Visual Storytelling"**

1. **No Boring Static Pages:** Users don't read long paragraphs. The website must be a **visual experience**.
2. **Interactive Playgrounds:** Every page must feature a jaw-dropping, interactive animated component as the main attraction.
3. **Hidden Depth:** Text is secondary. Details appear only on user interaction (click/hover to reveal).
4. **Zero Lag:** Use GSAP with optimised WebP assets or pure SVG code. Target smooth 60fps on mobile.
5. **99% Light Theme:** Premium, clean, breathable light theme throughout. Dark only for rare dramatic moments.
6. **Mobile-First:** Design for phone first. Desktop is an enhancement, not the primary target.
7. **No Emojis / No Generic Icons:** Use crimson accent lines, mono typography, and SVG-only icons.

---

## 📂 Full Site Map & Status

### ✅ Completed / In Progress
- [x] **Technology** (`/technology`)
  - Hero: "Built to Grind Perfectly" (About Us style, factory image, clip-path reveal, counter badge)
  - SpiceProcessingMachine (interactive clickable factory diagram)
  - TechProcessHorizontal (6-step horizontal scroll — images → **Coming Soon placeholders**)
  - CurvedLoop marquee divider
  - TechGlobeOverview (real ThreeGlobe with crimson arcs, vertical stat strip)
  - **TODO:** Replace 6 "Coming Soon" placeholders with real photography when available

- [x] **Facilities** (`/facilities`)
  - FactoryBlueprint (interactive isometric blueprint)

- [x] **Quality Assurance** (`/quality-assurance`)
  - Data Scanner Hero (QualityHero)
  - QALabBlueprint (interactive lab map)

---

### ⏳ Pending Pages (To Do — Animation-First Style)

| Page | Route | Suggested Interactive Component |
|---|---|---|
| **Home** | `/` | Full-screen animated hero with spice particles + globe |
| **About Us** | `/about-us` | Already has AboutHero + bowl — needs full audit |
| **Products** | `/products` | Interactive product filter / 3D spice display |
| **Chilli Speciality** | `/chilli-speciality` | Heat-map animation / Scoville scale visualiser |
| **Brands** | `/brands` | Animated brand logo wall + animated mockups |
| **Packaging & Private Label** | `/packaging-and-private-labelling` | Interactive box configurator or 3D box mockup |
| **Research & Development** | `/research-and-development` | Lab instrument animation / data chart reveal |
| **Quality Control & Training** | `/quality-control-and-training` | Animated certification timeline / checklist |
| **How We Operate** | `/how-we-operate` | Animated supply chain flow diagram |
| **Testimonials** | `/testimonials` | Cinematic quote carousel / world map with pins |
| **FAQ** | `/faq` | Accordion with smooth GSAP reveal |
| **Career** | `/career` | Animated job card grid |
| **Contact** | `/contact` | Interactive map + animated form |
| **E-Brochure** | `/e-brochure` | Flipbook-style PDF viewer animation |

---

## 🖼️ Missing Assets (Photography Needed)

These sections have **"Coming Soon"** placeholders until real photos are provided:

- `TechProcessHorizontal` — 6 step images:
  1. Seed Cleaning machine photo
  2. Milling line photo
  3. Roasting machine photo
  4. Steam Sterilization unit photo
  5. Cryogenic Grinding unit photo
  6. CFG Technology setup photo

---

## 🐛 Known Issues / Lint Warnings
- `hooks/useDevicePerformance.ts` — `setState` synchronously in effect (non-critical warning)
- `hooks/useMediaQuery.ts` — same pattern (non-critical)
- `components/ui/globe.tsx` — `globeRef.current` in dependency array (lint warning, not a bug)
- `scripts/` folder — CommonJS `require()` style imports (non-critical, scripts not part of build)

---

*Last Updated: 2026-07-29 | Next focus: Home Page & About Us audit*
