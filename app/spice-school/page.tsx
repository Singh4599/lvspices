'use client';

import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CurvedLoop from '@/components/ui/CurvedLoop';
import SpiceSchoolFlow from '@/components/technology/SpiceSchoolFlow';

const CR    = '#AC033B';
const INK   = '#1A1915';
const GOLD  = '#7B4E1B';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';

export default function SpiceSchoolPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: INK }}>
      <TechTurbineHero badgeText="Spice School" marqueeText="SPICE SCHOOL" />
      <VelocityMarquee dark />

      {/* ── INTRO ─────────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#FAF9F6', paddingBottom: 0 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>
              Spice Academy
            </div>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
              Learn About<br /><em style={{ color: CR, fontStyle: 'italic' }}>Every Spice</em>
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', maxWidth: 620, margin: '0 auto', lineHeight: 1.8 }}>
              Top organisations are always learning, and our team wholeheartedly agrees with this philosophy. We believe that class is always in session. Explore our interactive modules below to master the facts, origins, and uses of each ingredient.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── INTERACTIVE FACTORY COMPONENT ─────────────── */}
      <SpiceSchoolFlow />

      {/* ── CTA BANNER ──────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: GOLD, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none' }}>
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(80px,18vw,280px)', fontWeight: 900, color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>LEARN</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: 40, marginTop: -60 }}>
            <CurvedLoop
              marqueeText="SPICE FACTS • LEARN • DISCOVER • KNOW YOUR SPICE • EDUCATION • QUALITY • "
              speed={1.5} curveAmount={250}
              className="fill-[#fff] uppercase font-mono tracking-widest opacity-30"
            />
          </div>
          <ScrollReveal fromY={24}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,5vw,72px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
              Subscribe to the<br />Spice Newsletter
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(255,255,255,0.8)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.75 }}>
              All the spice lessons featured are part of our online inventory. New lessons delivered to your inbox every week.
            </p>
            <a href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: '#fff', color: GOLD, fontFamily: SANS, fontWeight: 700, fontSize: 15,
              padding: '18px 40px', borderRadius: 999, textDecoration: 'none',
              transition: 'transform 0.2s', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Subscribe for Spice Lessons →
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
