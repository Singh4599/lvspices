'use client';

import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import CountUp from '@/components/animation/CountUp';

const CR = '#AC033B';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const overviewStats = [
  { val: 7, suffix: '+', label: 'Manufacturing Units', desc: 'Across strategic processing hubs' },
  { val: 100000, suffix: '+', label: 'SqFt Built-up Area', desc: 'Dedicated to automated processing' },
  { val: 80000, suffix: '+', label: 'Mts Annual Capacity', desc: 'Output capacity across all lines' },
];

export default function TechStats() {
  return (
    <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: '#fff' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 'clamp(60px, 10vw, 120px)', flexWrap: 'wrap', alignItems: 'center' }}>
        
        {/* ── Left: Editorial Intro ── */}
        <ScrollReveal fromY={30} style={{ flex: '1 1 400px', maxWidth: 540 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <span style={{ width: 40, height: 1, background: CR }} />
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CR, fontWeight: 600 }}>Overview</span>
          </div>
          
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px,4.5vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
            Setting The Standard for Spice Processing.
          </h2>
          
          <p style={{ fontFamily: SANS, fontSize: 'clamp(15px,1.2vw,17px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.8, marginBottom: 20 }}>
            LV Spices was among the first Indian exporters to adopt fully automated seed cleaning and cryogenic grinding equipment. Our commitment to precision technology ensures we remain a trusted global processing hub.
          </p>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(15px,1.2vw,17px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.8, margin: 0 }}>
            Our automated systems reduce human intervention and ensure maximum safety, hygiene, and product integrity from raw material to final packaging.
          </p>
        </ScrollReveal>

        {/* ── Right: Architectural Stats List ── */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column' }}>
          <StaggerReveal stagger={0.15}>
            {overviewStats.map((s, i) => (
              <div 
                key={s.label} 
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  alignItems: 'baseline', 
                  justifyContent: 'space-between',
                  padding: 'clamp(32px, 4vw, 48px) 0',
                  borderTop: i === 0 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                  gap: 20
                }}
              >
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(48px,6vw,80px)', fontWeight: 700, color: '#111', lineHeight: 1, letterSpacing: '-0.04em' }}>
                  <CountUp to={s.val} duration={2} suffix={s.suffix} />
                </div>
                
                <div style={{ textAlign: 'right', flex: '1 1 200px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 600, marginBottom: 8 }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.45)', maxWidth: 200, lineHeight: 1.5 }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
        
      </div>
    </section>
  );
}
