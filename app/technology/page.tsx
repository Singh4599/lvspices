'use client';

import ScrollExpansionHero from '@/components/ui/ScrollExpansionHero';
import ScrollReveal, { StaggerReveal, AnimatedStat } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ParallaxCard from '@/components/ui/ParallaxCard';
import CurvedLoop from '@/components/ui/CurvedLoop';
import TechProcessHorizontal from '@/components/technology/TechProcessHorizontal';
import SpiceProcessingMachine from '@/components/technology/SpiceProcessingMachine';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const overviewStats = [
  { val: 7, suffix: '+', label: 'Manufacturing Units' },
  { val: 80000, suffix: '+', label: 'Mts Annual Capacity' },
];

export default function TechnologyPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <ScrollExpansionHero
        badge="Our Capabilities"
        headingText="Precision"
        headingRed="Technology"
        subText="LV Spices is a certified spice manufacturer & exporter from India — among the first to adopt fully automated seed cleaning, cryogenic grinding, and steam sterilization for export-quality spice production."
        imageSrc="/images/tech_cfg.png"
        stats={[
          { value: '7+', label: 'Plants' },
          { value: '80k mts', label: 'Annual Capacity' },
          { value: '100k sqft', label: 'Built-up Area' },
        ]}
      />

      {/* ══ VELOCITY MARQUEE DIVIDER ══════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ PARALLAX SECTION ═════════════════════════════════ */}
      <div style={{ padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px)', background: '#fff' }}>
        <ParallaxCard
          imageSrc="/images/tech_milling.png"
          tilt={false}
          parallaxStrength={0.2}
          style={{ height: 'clamp(300px, 40vh, 500px)', width: '100%', borderRadius: 24, border: 'none' }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)', zIndex: 1 }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: 'clamp(32px, 6vw, 80px)', position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffb3c6', marginBottom: 16 }}>Our Commitment</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 5vw, 64px)', color: '#fff', margin: 0, lineHeight: 1.1, maxWidth: 600 }}>Driven By Innovation</h2>
          </div>
        </ParallaxCard>
      </div>

      {/* ══ OVERVIEW ══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 16 }}>Overview</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,5vw,64px)', fontWeight: 700, color: '#111', letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
              Setting The Standard for<br />Spice Processing
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.8, marginBottom: 12 }}>
              LV Spices is India&apos;s trusted spice manufacturer &amp; exporter — among the first to adopt fully automated seed cleaning and cryogenic grinding. Our FSSC 22000, HACCP, and Halal certified processing ensures export-quality spices for bulk buyers, OEM manufacturers, and private label brands worldwide.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.8, margin: '0 0 56px' }}>
              Spread across 7+ units with a built-up area of 100,000 sq. ft., we produce over 80,000 mts annually — supplying clean-label, preservative-free spices and custom seasoning blends to 40+ countries globally.
            </p>
          </ScrollReveal>

          {/* Stats with animated counters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(8px, 2vw, 16px)' }}>
            <StaggerReveal stagger={0.12}>
              {overviewStats.map(s => (
                <div key={s.label} style={{
                  background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.18)',
                  borderRadius: 'clamp(12px, 2vw, 20px)', 
                  padding: 'clamp(16px, 2vw, 40px) clamp(12px, 2vw, 52px)',
                  display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  minWidth: 'clamp(100px, 28vw, 260px)', margin: '4px',
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(172,3,59,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(172,3,59,0.18)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: SERIF, fontSize: 'clamp(24px,4vw,48px)', fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.04em' }}>
                      <AnimatedStat value={s.val} suffix={s.suffix} label={s.label} />
                    </div>
                    <div style={{ fontFamily: MONO, fontSize: 'clamp(8px, 1vw, 10px)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginTop: 8 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* ══ CURVED LOOP ════════════════════════════════════════ */}
      {/* ══ CURVED LOOP ════════════════════════════════════════ */}
      <div style={{ background: '#F8F6F1', overflow: 'hidden', paddingBottom: 'clamp(60px, 8vw, 120px)', paddingTop: 'clamp(40px, 8vw, 100px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Centre badge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none', zIndex: 10, marginBottom: 'clamp(16px, 4vw, 40px)' }}>
           <div style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontFamily: 'var(--font-display)', color: CRIMSON, fontWeight: 800, lineHeight: 1 }}>LV</div>
           <div style={{ fontSize: 'clamp(8px, 0.9vw, 13px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.22em', marginTop: 5 }}>SPICES</div>
        </div>

        <div style={{ width: '100%' }}>
          <CurvedLoop 
            marqueeText="STATE OF THE ART • ADVANCED PROCESSING • HYGIENE FIRST • "
            speed={1.5}
            curveAmount={100}
          />
        </div>
      </div>

      {/* ══ INTERACTIVE FACTORY DIAGRAM ════════════════════════ */}
      <SpiceProcessingMachine />

      {/* ══ HORIZONTAL SCROLL PROCESS ══════════════════════════ */}
      <TechProcessHorizontal />

    </main>
  );
}
