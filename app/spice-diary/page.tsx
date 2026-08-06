'use client';

import Link from 'next/link';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import CurvedLoop from '@/components/ui/CurvedLoop';

const CR    = '#AC033B';
const INK   = '#1A1915';
const GOLD  = '#7B4E1B';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

import { SPICES } from './data';


const CSS = `
  @keyframes diary-card-in {
    from { opacity:0; transform: scale(0.94) translateY(16px); }
    to   { opacity:1; transform: scale(1) translateY(0); }
  }
  @keyframes diary-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .diary-card {
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    background: #fff;
    border: 1.5px solid rgba(0,0,0,0.07);
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s;
    cursor: pointer;
    text-decoration: none;
    display: block;
  }
  .diary-card:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 24px 60px rgba(0,0,0,0.12);
  }
  .diary-card:hover .diary-emoji { transform: scale(1.2) rotate(-6deg); }

  .diary-emoji {
    font-size: 52px;
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
    display: block; line-height: 1;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
  }

  .diary-tag {
    display: inline-block;
    padding: 3px 10px; border-radius: 999px;
    font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  @media (max-width:700px) {
    .diary-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width:400px) {
    .diary-grid { grid-template-columns: 1fr !important; }
  }
`;

export default function SpiceDiaryPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: INK }}>
      <style>{CSS}</style>

      <TechTurbineHero badgeText="Spice Diary" marqueeText="SPICE DIARY" />
      <VelocityMarquee dark />

      {/* ── INTRO ─────────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#FAFAF8' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>
              Your Spice Encyclopaedia
            </div>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
              The Spice Diary —<br /><em style={{ color: CR, fontStyle: 'italic' }}>Stories of Every Spice</em>
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
              Each spice has a story — of ancient trade routes, culinary traditions, and healing wisdom. Explore the history, cultivation, and benefits of every spice we export.
            </p>
          </ScrollReveal>

          {/* Grid */}
          <div className="diary-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {SPICES.map((spice, i) => (
              <ScrollReveal key={spice.slug} fromY={24} style={{ animationDelay: `${(i % 4) * 0.07}s` }}>
                <Link href={`/spice-diary/${spice.slug}`} className="diary-card">
                  {/* Color header */}
                  <div style={{ height: 100, background: spice.color, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    {/* BG text */}
                    <span style={{
                      position: 'absolute', fontFamily: SERIF, fontSize: 'clamp(48px,6vw,80px)',
                      fontWeight: 900, color: 'rgba(255,255,255,0.1)', letterSpacing: '-0.05em',
                      whiteSpace: 'nowrap', pointerEvents: 'none',
                    }}>
                      {spice.name.toUpperCase()}
                    </span>
                    <span className="diary-emoji">{spice.emoji}</span>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '18px 20px 20px' }}>
                    <div style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 700, color: INK, marginBottom: 4, letterSpacing: '-0.01em' }}>
                      {spice.name}
                    </div>
                    <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 10 }}>
                      {spice.hindiName}
                    </div>
                    <div style={{ fontFamily: SANS, fontSize: 12, color: 'rgba(0,0,0,0.52)', lineHeight: 1.5, marginBottom: 12 }}>
                      {spice.tagline}
                    </div>
                    <span className="diary-tag" style={{ background: `${spice.color}15`, color: spice.color }}>
                      Explore →
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURVED LOOP ──────────────────────────────────── */}
      <div style={{ position: 'relative', background: '#FAFAF8', paddingTop: 'clamp(40px,5vw,72px)', paddingBottom: 'clamp(80px,10vw,120px)' }}>
        <CurvedLoop
          marqueeText="BAY LEAVES • BLACK PEPPER • CARDAMOM • CINNAMON • CLOVES • TURMERIC • CUMIN • GINGER • "
          speed={1.5} curveAmount={250}
          className="fill-[#111] uppercase font-mono tracking-widest"
        />
      </div>
    </main>
  );
}
