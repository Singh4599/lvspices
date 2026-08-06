'use client';

import Link from 'next/link';
import { SPICES } from '../data';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';

const CR    = '#AC033B';
const INK   = '#1A1915';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

interface Spice {
  slug: string;
  name: string;
  hindiName: string;
  emoji: string;
  color: string;
  tagline: string;
  history: string;
  cultivation: string;
  usage: string;
  benefits?: string;
}

const SECTIONS = [
  { key: 'history',     icon: '📜', label: 'History' },
  { key: 'cultivation', icon: '🌱', label: 'Cultivation' },
  { key: 'usage',       icon: '🫙', label: 'Usage / Storage' },
  { key: 'benefits',    icon: '💊', label: 'Beneficial Effects' },
] as const;

const CSS = `
  @keyframes spice-hero-float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50%       { transform: translateY(-10px) rotate(4deg); }
  }
  @keyframes spice-section-in {
    from { opacity:0; transform: translateX(-20px); }
    to   { opacity:1; transform: translateX(0); }
  }
  @keyframes spice-line-draw {
    from { width: 0; }
    to   { width: 100%; }
  }

  .spice-section {
    padding: 32px;
    border-radius: 20px;
    background: #fff;
    border: 1.5px solid rgba(0,0,0,0.07);
    margin-bottom: 24px;
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .spice-section:hover {
    transform: translateX(6px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.07);
  }

  .spice-nav-link {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 16px; border-radius: 12px;
    border: 1.5px solid rgba(0,0,0,0.07);
    background: #fff; text-decoration: none;
    color: inherit; transition: all 0.2s;
  }
  .spice-nav-link:hover {
    border-color: currentColor;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
`;

export default function SpiceDetailClient({ spice }: { spice: Spice }) {
  // Find adjacent spices for prev/next navigation
  const currentIdx = SPICES.findIndex(s => s.slug === spice.slug);
  const prev = SPICES[currentIdx - 1] ?? null;
  const next = SPICES[currentIdx + 1] ?? null;

  return (
    <main style={{ background: '#FAFAF8', minHeight: '100vh', color: INK }}>
      <style>{CSS}</style>

      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: spice.color, paddingTop: 'clamp(80px,12vw,160px)', paddingBottom: 'clamp(60px,10vw,130px)', textAlign: 'center' }}>
        {/* BG text */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none' }}>
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(80px,20vw,320px)', fontWeight: 900, color: 'rgba(255,255,255,0.08)', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>
            {spice.name.toUpperCase()}
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24, fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/spice-diary" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'} onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}>
              Spice Diary
            </Link>
            <span style={{ opacity: 0.4 }}>→</span>
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>{spice.name}</span>
          </div>

          {/* Emoji */}
          <div style={{ fontSize: 'clamp(60px,10vw,120px)', animation: 'spice-hero-float 3s ease-in-out infinite', display: 'inline-block', marginBottom: 24, filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.3))' }}>
            {spice.emoji}
          </div>

          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,6vw,80px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', margin: '0 0 12px', lineHeight: 1 }}>
            {spice.name}
          </h1>
          <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
            {spice.hindiName}
          </div>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,18px)', color: 'rgba(255,255,255,0.8)', maxWidth: 480, margin: '0 auto' }}>
            {spice.tagline}
          </p>
        </div>
      </section>

      {/* ── MARQUEE DIVIDER ─────────────────────────────── */}
      <VelocityMarquee dark />

      {/* ── CONTENT ─────────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          {SECTIONS.map((s, i) => (
            <ScrollReveal key={s.key} fromY={24} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="spice-section">
                {/* Section label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{
                    width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                    background: `${spice.color}15`, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 20,
                  }}>
                    {s.icon}
                  </span>
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: spice.color, marginBottom: 3 }}>
                      0{i + 1}
                    </div>
                    <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(18px,2vw,26px)', fontWeight: 800, color: INK, margin: 0, letterSpacing: '-0.02em' }}>
                      {s.label}
                    </h2>
                  </div>
                </div>

                {/* Progress line */}
                <div style={{ height: 1, background: `linear-gradient(to right, ${spice.color}, transparent)`, marginBottom: 20 }}/>

                {/* Text */}
                <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(0,0,0,0.65)', lineHeight: 1.9, margin: 0 }}>
                  {spice[s.key]}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── PREV / NEXT NAVIGATION ───────────────────────── */}
      <nav style={{ padding: 'clamp(32px,5vw,64px) clamp(24px,5vw,80px)', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', gap: 16, justifyContent: 'space-between' }}>
          {prev ? (
            <Link href={`/spice-diary/${prev.slug}`} className="spice-nav-link" style={{ color: prev.color }}>
              <span style={{ fontSize: 20 }}>{prev.emoji}</span>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', marginBottom: 2 }}>← Previous</div>
                <div style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 700, color: INK }}>{prev.name}</div>
              </div>
            </Link>
          ) : <div/>}

          <Link href="/spice-diary" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '10px 20px', borderRadius: 999,
            background: CR, color: '#fff', fontFamily: MONO, fontSize: 10,
            fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
            transition: 'transform 0.2s', flexShrink: 0,
          }}>
            All Spices
          </Link>

          {next ? (
            <Link href={`/spice-diary/${next.slug}`} className="spice-nav-link" style={{ color: next.color, textAlign: 'right' }}>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', marginBottom: 2 }}>Next →</div>
                <div style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 700, color: INK }}>{next.name}</div>
              </div>
              <span style={{ fontSize: 20 }}>{next.emoji}</span>
            </Link>
          ) : <div/>}
        </div>
      </nav>
    </main>
  );
}
