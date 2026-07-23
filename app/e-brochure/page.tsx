'use client';

import PageHero from '@/components/ui/PageHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ScrollReveal from '@/components/ui/ScrollReveal';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

export default function EBrochurePage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>
      <PageHero
        tag="E-Brochure"
        heading="Our Complete"
        headingRed="Product Range."
        subCopy="Download our digital brochure to explore our entire collection of premium spices, herbs, seeds, and custom blends."
        imageSrc="/images/factory.png"
        imageAlt="LV Spices E-Brochure"
        overlay="gradient-up"
      />

      <VelocityMarquee dark />

      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)', textAlign: 'center' }}>
        <ScrollReveal fromY={24} style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: 'rgba(172,3,59,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
            color: CRIMSON,
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
          
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 16px' }}>
            New Brochure Coming Soon
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 16, color: 'rgba(0,0,0,0.5)', lineHeight: 1.7, marginBottom: 40 }}>
            We are currently updating our product catalog for the upcoming season. Check back soon for the latest comprehensive guide to our export offerings.
          </p>

          <a href="/contact" style={{
            display: 'inline-block', padding: '16px 40px', background: CRIMSON, color: '#fff',
            textDecoration: 'none', borderRadius: 999, fontFamily: SANS, fontSize: 15, fontWeight: 600,
            letterSpacing: '0.04em', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 24px rgba(172,3,59,0.3)'; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
          >
            Contact Sales Team →
          </a>
        </ScrollReveal>
      </section>
    </main>
  );
}
