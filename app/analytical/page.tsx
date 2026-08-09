'use client';

import { useRef, useState } from 'react';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import CurvedLoop from '@/components/ui/CurvedLoop';
import AnalyticalLabFlow from '@/components/analytical/AnalyticalLabFlow';

const CR    = '#111111';
const INK   = '#1A1915';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

export default function AnalyticalPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: INK }}>
      
      {/* ── HERO ─────────────────────────────────────────── */}
      <TechTurbineHero badgeText="Analytical" marqueeText="ANALYTICAL" />

      <VelocityMarquee dark />

      {/* ── INTERACTIVE LAB HUB ───────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#FAFAF8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>
              In-House Testing
            </div>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
              Precision Labs.<br /><em style={{ color: CR, fontStyle: 'italic' }}>Uncompromised Quality.</em>
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', maxWidth: 620, margin: '0 auto', lineHeight: 1.8 }}>
              Click on any test node below to view our stringent analytical standards.
            </p>
          </ScrollReveal>

          <AnalyticalLabFlow />

        </div>
      </section>

    </main>
  );
}
