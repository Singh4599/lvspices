'use client';

import PageHero from '@/components/ui/PageHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import BookFlip from '@/components/ebrochure/BookFlip';
import ScrollReveal from '@/components/ui/ScrollReveal';

const CRIMSON = '#111111';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const highlights = [
  { icon: '📦', label: '500+ SKUs', desc: 'Across 12 product categories' },
  { icon: '🌍', label: '40+ Countries', desc: 'Active export destinations' },
  { icon: '🏆', label: '10+ Certs', desc: 'ISO, FSSC, HACCP, BRC & more' },
  { icon: '🏭', label: '1L sq.ft.', desc: 'State-of-art manufacturing' },
];

export default function EBrochurePage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>
      <PageHero
        tag="E-Brochure"
        heading="Our Complete"
        headingRed="Product Range."
        subCopy="Explore our full digital catalogue — from premium whole spices and custom blends to private label solutions and bulk export. Flip through or download the PDF."
        imageSrc="/images/factory.png"
        imageAlt="LV Spices E-Brochure"
        overlay="gradient-up"
      />

      <VelocityMarquee dark />

      {/* ══ 3D BOOK FLIP ════════════════════════════════════════ */}
      <BookFlip />

      {/* ══ HIGHLIGHTS ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <ScrollReveal fromY={20} style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,60px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 14 }}>
              At a Glance
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: 0 }}>
              Why Source from <em style={{ color: CRIMSON, fontStyle: 'italic' }}>LV Spices?</em>
            </h2>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,210px),1fr))', gap: 'clamp(12px,2vw,20px)' }}>
            {highlights.map((h, i) => (
              <ScrollReveal key={i} fromY={20} delay={i * 0.1}>
                <div
                  style={{ background: '#fafafa', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 20, padding: 'clamp(24px,3vw,36px)', transition: 'all 0.25s', cursor: 'default', height: '100%' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.08)'; el.style.borderColor = 'rgba(17,17,17,0.25)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = 'rgba(0,0,0,0.07)'; }}
                >
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{h.icon}</div>
                  <div style={{ fontFamily: SERIF, fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: 6 }}>{h.label}</div>
                  <div style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.45)', lineHeight: 1.5 }}>{h.desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: CRIMSON, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(80px,18vw,260px)', fontWeight: 900, color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>CATALOGUE</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal fromY={20}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>Get Started</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,64px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 20px' }}>
              Ready to Place an<br />Export Order?
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(255,255,255,0.75)', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.75 }}>
              Our export sales team responds within 24 hours. Share your requirements and we'll send a tailored quotation.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" style={{ display: 'inline-block', padding: '15px 36px', background: '#fff', color: CRIMSON, textDecoration: 'none', borderRadius: 999, fontFamily: SANS, fontSize: 14, fontWeight: 700, transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 32px rgba(0,0,0,0.2)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = ''; }}
              >
                Contact Sales Team →
              </a>
              <a href="/brochure.pdf" download style={{ display: 'inline-block', padding: '15px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.4)', textDecoration: 'none', borderRadius: 999, fontFamily: SANS, fontSize: 14, fontWeight: 600, transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.4)'; }}
              >
                ↓ Download PDF
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
