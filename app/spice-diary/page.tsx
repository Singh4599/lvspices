'use client';

import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import SpiceDiaryFlow from '@/components/technology/SpiceDiaryFlow';


const CR   = '#111111';
const INK  = '#1A1915';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';

export default function SpiceDiaryPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: INK }}>
      <TechTurbineHero badgeText="Spice Diary" marqueeText="SPICE DIARY" />
      <VelocityMarquee dark />

      {/* ── Assembly line flow ─────────────────── */}
      <SpiceDiaryFlow />

      {/* ── CTA ─────────────────────────────────── */}
      <section style={{
        padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
        background: CR, textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none' }}>
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(80px,18vw,280px)', fontWeight: 900, color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>
            SPICES
          </span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,5vw,72px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
            Ready to Source<br />a Spice?
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(255,255,255,0.75)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.75 }}>
            Every spice we export is traceable, residue-tested, and packed to your specification. Let's talk.
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: '#fff', color: CR, fontFamily: SANS, fontWeight: 700, fontSize: 15,
              padding: '18px 40px', borderRadius: 999, textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            Request a Sample →
          </a>
        </div>
      </section>


    </main>
  );
}
