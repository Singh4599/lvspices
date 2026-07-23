'use client';

import Image from 'next/image';
import PageHero from '@/components/ui/PageHero';
import ScrollReveal, { StaggerReveal, AnimatedStat } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ParallaxCard from '@/components/ui/ParallaxCard';
import CurvedLoop from '@/components/ui/CurvedLoop';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const focusAreas = [
  { icon: '🌶️', title: 'New Product Development', desc: 'Our R&D team develops 50+ new formulations annually — from fusion spice blends to functional food ingredients — driven by market intelligence and customer briefs.' },
  { icon: '🧪', title: 'Flavour Science & Innovation', desc: 'Using GC-MS flavour profiling and advanced sensory panels, we analyse and recreate complex flavour systems for private label and export customers.' },
  { icon: '⚗️', title: 'Process Optimisation', desc: 'Continuous R&D into milling parameters, roasting profiles, and blending ratios to improve colour, pungency, and shelf life without compromise.' },
  { icon: '🌿', title: 'Functional Ingredients', desc: 'Research into curcumin bioavailability, piperine enhancement, and antioxidant-rich spice extracts for nutraceutical and health-food applications.' },
  { icon: '📦', title: 'Packaging & Shelf Life', desc: 'Accelerated shelf life studies, nitrogen-flush trials, and modified atmosphere packaging research to extend product life across climate zones.' },
  { icon: '🤝', title: 'Custom Blend Formulation', desc: 'Working with global food manufacturers and restaurant chains to develop signature spice blends meeting exact sensory and regulatory specifications.' },
];

const sensorySteps = [
  { title: 'Sample Preparation', desc: 'Blind samples of new formulations prepared under controlled conditions — identical in presentation to remove visual bias.' },
  { title: 'Panel Evaluation', desc: 'Trained panellists evaluate aroma, colour, heat level, mouthfeel, aftertaste, and overall acceptance against a reference standard.' },
  { title: 'Scoring & Analysis', desc: 'Scores statistically analysed using spider charts and QDA (Quantitative Descriptive Analysis) to pinpoint improvement areas.' },
  { title: 'Consumer Trials', desc: 'For private label blends, scaled consumer trials are conducted to confirm market acceptability before production sign-off.' },
];

const milestones = [
  { val: 425, suffix: '+', label: 'Spice Blends Developed' },
  { val: 50, suffix: '+', label: 'New Formulations / Year' },
  { val: 12, suffix: '', label: 'R&D Scientists' },
  { val: 3, suffix: '', label: 'Dedicated R&D Labs' },
];

export default function ResearchAndDevelopmentPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <PageHero
        tag="Innovation"
        heading="Research &"
        headingRed="Development."
        subCopy="A dedicated team working round-the-clock on new products and improved combination blends — keeping LV Spices at the cutting edge of global flavour science."
        imageSrc="/images/lab.png"
        imageAlt="LV Spices Research & Development"
        overlay="gradient-up"
        stats={[
          { value: '425+', label: 'Blends Developed' },
          { value: '50+', label: 'New / Year' },
          { value: '12', label: 'Scientists' },
        ]}
      />

      {/* ══ VELOCITY MARQUEE ══════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ PRODUCT RESEARCH ══════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 'clamp(40px,6vw,80px)', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Image */}
          <ScrollReveal fromY={20} style={{ flex: '0 0 clamp(240px,34vw,400px)', borderRadius: 20, overflow: 'hidden', position: 'relative', height: 320 }}>
            <Image src="/images/lab.png" alt="R&D Lab" fill style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(172,3,59,0.2), transparent)' }} />
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal fromY={20} delay={0.1} style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 16 }}>Innovation Hub</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,3.5vw,52px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 20px', lineHeight: 1.1 }}>
              Product Research & New Development
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, marginBottom: 16 }}>
              Spices are an integral part of our food. In India, it is almost impossible to imagine food without them. LV Spices has always had a dedicated team working round-the-clock to increase the demands of customers by developing new and improved products.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.85 }}>
              With our fully agile blends developed in-house, it has always been our mission to ensure blends are conceptualised and formulated as per the required taste, keeping in mind regulatory requirements for allergens and pesticide limits.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ MILESTONES COUNTERS ════════════════════════════════ */}
      <section style={{ padding: '0 clamp(24px,5vw,80px) clamp(60px,8vw,100px)', background: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', paddingTop: 'clamp(60px,8vw,100px)' }}>
          <StaggerReveal stagger={0.1} style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            {milestones.map((m, i) => (
              <div key={m.label} style={{
                background: i === 0
                  ? `linear-gradient(135deg, rgba(172,3,59,0.12), rgba(172,3,59,0.04))`
                  : '#fff',
                border: `1px solid ${i === 0 ? 'rgba(172,3,59,0.3)' : 'rgba(0,0,0,0.07)'}`,
                borderRadius: 20, padding: 'clamp(24px,3vw,40px) clamp(28px,4vw,52px)',
                textAlign: 'center', flex: '1 1 clamp(160px,18vw,220px)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(172,3,59,0.45)'; el.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = i === 0 ? 'rgba(172,3,59,0.3)' : 'rgba(0,0,0,0.07)'; el.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, color: '#111', lineHeight: 1 }}>
                  <AnimatedStat value={m.val} suffix={m.suffix} label={m.label} />
                </div>
                <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', lineHeight: 1.5 }}>{m.label}</div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ FOCUS AREAS ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>What We Research</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 48px' }}>
              R&D Focus Areas
            </h2>
          </ScrollReveal>

          <StaggerReveal
            stagger={0.07}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px,26vw,320px), 1fr))', gap: 20 }}
          >
            {focusAreas.map(area => (
              <div key={area.title} style={{
                background: '#fafafa', border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 16, padding: '28px 24px',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(172,3,59,0.4)'; el.style.background = 'rgba(172,3,59,0.04)'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 8px 24px rgba(172,3,59,0.08)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.07)'; el.style.background = '#fafafa'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{area.icon}</div>
                <h3 style={{ fontFamily: SANS, fontSize: 14.5, fontWeight: 700, color: '#111', margin: '0 0 10px' }}>{area.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.52)', lineHeight: 1.7, margin: 0 }}>{area.desc}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ VELOCITY DIVIDER ══════════════════════════════════ */}
      <VelocityMarquee reverse />

      {/* ══ PARALLAX SECTION ═════════════════════════════════ */}
      <div style={{ padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px)', background: '#fff' }}>
        <ParallaxCard
          imageSrc="/images/lab.png"
          tilt={false}
          parallaxStrength={0.2}
          style={{ height: 'clamp(300px, 40vh, 500px)', width: '100%', borderRadius: 24, border: 'none' }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)', zIndex: 1 }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: 'clamp(32px, 6vw, 80px)', position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffb3c6', marginBottom: 16 }}>Our Commitment</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 5vw, 64px)', color: '#fff', margin: 0, lineHeight: 1.1, maxWidth: 600 }}>Advancing Flavour Science</h2>
          </div>
        </ParallaxCard>
      </div>

      {/* ══ SENSORY TESTING ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: '#111' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Full pill image */}
          <ScrollReveal fromY={20}>
            <div style={{
              borderRadius: 'clamp(24px,4vw,60px)', overflow: 'hidden',
              position: 'relative', height: 'clamp(240px,32vw,420px)', marginBottom: 56,
            }}>
              <Image src="/images/farm-editorial.png" alt="Sensory Testing" fill style={{ objectFit: 'cover', opacity: 0.55 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 'clamp(20px,4vw,48px)', left: 0, right: 0, textAlign: 'center', padding: '0 24px' }}>
                <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,4vw,56px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 12px' }}>Sensory Testing</h2>
                <p style={{ fontFamily: SANS, fontSize: 'clamp(12px,1vw,14px)', color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
                  It is necessary to analyse sensory characteristics of the control sample before creating any new formulation. After evaluating all established parameters, a recipe is developed to achieve desired specifications.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Sensory Steps */}
          <StaggerReveal
            stagger={0.08}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(200px,20vw,260px), 1fr))', gap: 20 }}
          >
            {sensorySteps.map((step, i) => (
              <div key={step.title} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16, padding: '24px 20px',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(172,3,59,0.4)'; el.style.background = 'rgba(172,3,59,0.08)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.background = 'rgba(255,255,255,0.04)'; }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${CRIMSON}, #6B0025)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: MONO, fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 14,
                }}>{String(i + 1).padStart(2, '0')}</div>
                <h3 style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{step.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 12.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ COLLABORATIONS ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 16 }}>Partnerships</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 20px' }}>
              Industry Collaborations & Academic Tie-ups
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.85, margin: '0 0 40px' }}>
              Our R&D division collaborates with CFTRI Mysore, Spices Board India, and global flavour houses. Joint research covers functional ingredients, novel extraction methods, and sustainable processing technologies.
            </p>
          </ScrollReveal>

          <StaggerReveal stagger={0.07} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['CFTRI, Mysore', 'Spices Board of India', 'IIFPT, Thanjavur', 'Global Flavour Houses', 'NABL Accredited Labs'].map(partner => (
              <div key={partner} style={{
                fontFamily: SANS, fontSize: 13, fontWeight: 500,
                padding: '10px 22px', borderRadius: 999,
                background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.2)',
                color: '#111', transition: 'all 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = CRIMSON; el.style.color = '#fff'; el.style.borderColor = CRIMSON; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(172,3,59,0.06)'; el.style.color = '#111'; el.style.borderColor = 'rgba(172,3,59,0.2)'; }}
              >{partner}</div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ CURVED LOOP ════════════════════════════════════════ */}
      <div style={{ position: 'relative', background: '#F8F6F1', paddingBottom: 'clamp(40px, 6vw, 80px)', paddingTop: 'clamp(40px, 6vw, 80px)' }}>
        <CurvedLoop 
          marqueeText="INNOVATION • RESEARCH • NEW DEVELOPMENT • "
          speed={1.5}
          curveAmount={250}
          className="fill-[#111] uppercase font-mono tracking-widest"
        />
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
           <text style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontFamily: 'var(--font-display)', color: CRIMSON, fontWeight: 800 }}>LV</text>
           <text style={{ fontSize: 'clamp(9px, 1vw, 14px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</text>
        </div>
      </div>

    </main>
  );
}
