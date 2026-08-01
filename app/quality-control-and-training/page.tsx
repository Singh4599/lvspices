'use client';

import QCHero from '@/components/quality/QCHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import QCLabFloorPlan from '@/components/quality/QCLabFloorPlan';
import ScrollReveal from '@/components/ui/ScrollReveal';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

export default function QualityControlAndTrainingPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111', overflowX: 'hidden' }}>

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <QCHero />

      {/* ══ VELOCITY MARQUEE ════════════════════════════════════ */}
      <VelocityMarquee dark={false} />

      {/* ══ INTERACTIVE FLOOR PLAN ════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,56px)', background: '#fff' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>

          {/* Heading */}
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 'clamp(32px,4vw,56px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 12 }}>
              Explore Our Facility
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 16px' }}>
              The QC Lab, <em style={{ color: CRIMSON }}>Mapped.</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,16px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto' }}>
              Click on any room in our interactive floor plan to explore what happens inside — from raw material sampling to final dispatch verification.
            </p>
          </ScrollReveal>

          {/* Interactive Floor Plan + Mobile Scroll wrapper */}
          <QCLabFloorPlan />

        </div>
      </section>

    </main>
  );
}
