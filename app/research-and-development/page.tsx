'use client';

import ScrollReveal, { StaggerReveal, AnimatedStat } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';
import RnDHero from '@/components/research/RnDHero';
import RnDProcessHorizontal from '@/components/research/RnDProcessHorizontal';
import RnDLabDiagram from '@/components/research/RnDLabDiagram';

const CR   = '#111111';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

const milestones = [
  { val: 425, suffix: '+', label: 'Blends Developed' },
  { val: 50,  suffix: '+', label: 'New Formulations / Year' },
  { val: 12,  suffix: '',  label: 'R&D Scientists' },
  { val: 3,   suffix: '',  label: 'Dedicated R&D Labs' },
];

const partnerships = ['CFTRI, Mysore', 'Spices Board of India', 'IIFPT, Thanjavur', 'Global Flavour Houses', 'NABL Accredited Labs', 'IIT Food Tech Division'];

export default function ResearchAndDevelopmentPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111', overflowX: 'hidden' }}>

      {/* ══ HERO ═════════════════════════════════════════════ */}
      <RnDHero />

      {/* ══ VELOCITY MARQUEE ════════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ INTERACTIVE R&D LAB DIAGRAM ═════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,120px) clamp(20px,5vw,72px)', background: '#fff' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>
              Our Process
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: '0 0 18px', lineHeight: 1.05 }}>
              The R&D Lab — <em style={{ color: CR, fontStyle: 'italic' }}>Explored</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,17px)', color: 'rgba(0,0,0,0.52)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
              Six interconnected stations take a flavour idea from concept to commercially-validated formulation. Click any station to see what happens inside.
            </p>
          </ScrollReveal>

          <RnDLabDiagram />
        </div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(48px,7vw,96px) clamp(20px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 'clamp(24px,6vw,80px)', justifyContent: 'center', flexWrap: 'wrap' }}>
          {milestones.map(m => (
            <div key={m.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, color: '#111', letterSpacing: '-0.04em', lineHeight: 1 }}>
                <AnimatedStat value={m.val} suffix={m.suffix} label={m.label} />
              </div>
              <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 8 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CURVED LOOP DIVIDER ══════════════════════════════════ */}
      <div style={{ position: 'relative', background: '#fff', paddingTop: 'clamp(16px,2vw,32px)', paddingBottom: 'clamp(40px,6vw,80px)' }}>
        <CurvedLoop marqueeText="INNOVATION • RESEARCH • 425+ BLENDS • NEW DEVELOPMENT • FLAVOUR SCIENCE • " speed={1.5} curveAmount={250} className="fill-[#111] uppercase font-mono tracking-widest" />
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          <span style={{ fontSize: 'clamp(28px,4vw,56px)', fontFamily: 'var(--font-display)', color: CR, fontWeight: 800 }}>LV</span>
          <span style={{ fontSize: 'clamp(9px,1vw,14px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</span>
        </div>
      </div>

      {/* ══ HORIZONTAL SCROLL — SENSORY TESTING PROCESS ═════════ */}
      <RnDProcessHorizontal />

      {/* ══ PARTNERSHIPS ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <ScrollReveal fromY={24}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>Partnerships</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: '0 0 20px' }}>
              Academic &amp;<br /><em style={{ color: CR, fontStyle: 'italic' }}>Industry Tie-ups</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.85, margin: '0 0 48px' }}>
              Our R&D division collaborates with leading research institutions. Joint research covers functional ingredients, novel extraction methods, and sustainable processing technologies.
            </p>
          </ScrollReveal>
          <StaggerReveal stagger={0.07} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {partnerships.map(partner => (
              <div key={partner}
                style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, padding: '12px 24px', borderRadius: 999, background: 'rgba(17,17,17,0.06)', border: '1px solid rgba(17,17,17,0.18)', color: '#111', transition: 'all 0.25s', cursor: 'default' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = CR; el.style.color = '#fff'; el.style.borderColor = CR; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(17,17,17,0.06)'; el.style.color = '#111'; el.style.borderColor = 'rgba(17,17,17,0.18)'; }}>
                {partner}
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: '#111', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none' }}>
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(80px,18vw,280px)', fontWeight: 900, color: 'rgba(255,255,255,0.03)', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>R&D</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal fromY={24}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#D0375C', marginBottom: 20 }}>Collaborate With Us</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,5.5vw,80px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
              Have a Custom<br />Blend in Mind?
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(15px,1.3vw,18px)', color: 'rgba(255,255,255,0.65)', maxWidth: 540, margin: '0 auto 48px', lineHeight: 1.75 }}>
              Share your product brief with our R&D team. We'll formulate, test, and validate a blend tailored to your sensory and regulatory needs.
            </p>
            <a href="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: CR, color: '#fff', fontFamily: SANS, fontWeight: 700, fontSize: 15, padding: '18px 40px', borderRadius: 999, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 8px 32px rgba(17,17,17,0.3)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
              Start a Conversation →
            </a>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
