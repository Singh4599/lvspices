'use client';

import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import LabelRevealHero from '@/components/packaging/LabelRevealHero';
import PrivateLabelBlueprint from '@/components/packaging/PrivateLabelBlueprint';
import PrivateLabelProcessHorizontal from '@/components/packaging/PrivateLabelProcessHorizontal';
import PhoneContactForm from '@/components/packaging/PhoneContactForm';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const productCats = [
  { icon: '🌶️', name: 'Spices',         count: '150+ SKUs' },
  { icon: '🫘', name: 'Pulses',         count: '30+ SKUs'  },
  { icon: '🌾', name: 'Flours',         count: '20+ SKUs'  },
  { icon: '🍚', name: 'Rice',           count: '15+ SKUs'  },
  { icon: '🥜', name: 'Nuts & Dry Fruits', count: '25+ SKUs' },
  { icon: '🍿', name: 'Snacks',         count: '40+ SKUs'  },
  { icon: '🧄', name: 'Masalas',        count: '80+ SKUs'  },
  { icon: '🍵', name: 'Tea & Beverages', count: '20+ SKUs' },
];

export default function PrivateLabelPage() {

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111', overflowX: 'hidden' }}>

      {/* ══ LABEL REVEAL HERO ══════════════════════════════════════ */}
      <LabelRevealHero />

      {/* ══ VELOCITY MARQUEE ════════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ BLUEPRINT SVG FEATURES ═══════════════════════════════════ */}
      <PrivateLabelBlueprint />

      {/* ══ HOW IT WORKS ════════════════════════════════════════ */}
      <PrivateLabelProcessHorizontal />

      {/* ══ PRODUCT CATEGORIES ══════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal fromY={20} style={{ marginBottom: 'clamp(40px,5vw,64px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 14 }}>Available Categories</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: 0 }}>
              500+ Products for<br /><em style={{ color: CRIMSON, fontStyle: 'italic' }}>Private Label</em>
            </h2>
          </ScrollReveal>
          <StaggerReveal stagger={0.04} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))', gap: 16, marginBottom: 40 }}>
            {productCats.map(cat => (
              <div key={cat.name} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: '28px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, transition: 'all 0.25s', cursor: 'default' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = CRIMSON; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = '0 12px 30px rgba(172,3,59,0.1)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.08)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
                <span style={{ fontSize: 32 }}>{cat.icon}</span>
                <div>
                  <div style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 700, color: '#111', marginBottom: 4 }}>{cat.name}</div>
                  <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: CRIMSON }}>{cat.count}</div>
                </div>
              </div>
            ))}
          </StaggerReveal>
          <ScrollReveal fromY={16}>
            <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.5)' }}>
              Don't see your category?{' '}
              <a href="#contact-form" style={{ color: CRIMSON, textDecoration: 'none', fontWeight: 600 }}>Ask us — we likely have it →</a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ CONTACT & CTA SECTION (Side-by-side) ══════════════════════════════════════════ */}
      <div style={{ display: 'flex', flexWrap: 'wrap', background: '#F8F6F1' }}>
        
        {/* Left Side: Curved Loop */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 'clamp(60px,10vw,120px) 24px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CurvedLoop marqueeText="PRIVATE LABELLING • CUSTOM PACKAGING • YOUR BRAND • 500+ PRODUCTS • " speed={1.5} curveAmount={200} className="fill-[#111] uppercase font-mono tracking-widest" />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
              <text style={{ fontSize: 'clamp(24px,3.5vw,48px)', fontFamily: 'var(--font-display)', color: CRIMSON, fontWeight: 800 }}>LV</text>
              <text style={{ fontSize: 'clamp(8px,1vw,12px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</text>
            </div>
          </div>
        </div>

        {/* Right Side: Phone Contact Form */}
        <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'clamp(60px,10vw,120px) 24px', position: 'relative', zIndex: 10 }}>
          <PhoneContactForm />
        </div>

      </div>

    </main>
  );
}
