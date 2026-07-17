'use client';

import Image from 'next/image';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

/* ── R&D Focus Areas ──────────────────────────────────────── */
const focusAreas = [
  {
    icon: '🌶️',
    title: 'New Product Development',
    desc: 'Our R&D team develops 50+ new formulations annually — from fusion spice blends to functional food ingredients — driven by market intelligence and customer briefs.',
  },
  {
    icon: '🧪',
    title: 'Flavour Science & Innovation',
    desc: 'Using GC-MS flavour profiling and advanced sensory panels, we analyse and recreate complex flavour systems for private label and export customers.',
  },
  {
    icon: '⚗️',
    title: 'Process Optimisation',
    desc: 'Continuous R&D into milling parameters, roasting profiles, and blending ratios to improve colour, pungency, and shelf life without compromise.',
  },
  {
    icon: '🌿',
    title: 'Functional Ingredients',
    desc: 'Research into curcumin bioavailability, piperine enhancement, and antioxidant-rich spice extracts for nutraceutical and health-food applications.',
  },
  {
    icon: '📦',
    title: 'Packaging & Shelf Life',
    desc: 'Accelerated shelf life studies, nitrogen-flush trials, and modified atmosphere packaging research to extend product life across different climate zones.',
  },
  {
    icon: '🤝',
    title: 'Custom Blend Formulation',
    desc: 'Working closely with global food manufacturers and restaurant chains to develop signature spice blends meeting exact sensory and regulatory specifications.',
  },
];

/* ── Sensory Panel Steps ──────────────────────────────────── */
const sensorySteps = [
  { title: 'Sample Preparation', desc: 'Blind samples of new formulations are prepared under controlled conditions — identical in presentation to remove visual bias.' },
  { title: 'Panel Evaluation', desc: 'Trained sensory panellists evaluate aroma, colour, heat level, mouthfeel, aftertaste, and overall acceptance against a reference standard.' },
  { title: 'Scoring & Analysis', desc: 'Scores are statistically analysed using spider charts and QDA (Quantitative Descriptive Analysis) to pinpoint improvement areas.' },
  { title: 'Consumer Trials', desc: 'For private label blends, scaled consumer trials are conducted to confirm market acceptability before production sign-off.' },
];

/* ── Milestones ───────────────────────────────────────────── */
const milestones = [
  { val: '425+', label: 'Spice Blends Developed To Date' },
  { val: '50+', label: 'New Formulations Per Year' },
  { val: '12', label: 'Full-time R&D Scientists' },
  { val: '3', label: 'Dedicated R&D Labs' },
];

/* ─────────────────────────────────────────────────────────── */

export default function ResearchAndDevelopmentPage() {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: 'clamp(380px,50vw,620px)', overflow: 'hidden' }}>
        <Image
          src="/images/lab.png"
          alt="Research & Development"
          fill
          style={{ objectFit: 'cover', opacity: 0.6 }}
          priority
        />
        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.25) 100%)',
        }} />

        {/* Tag */}
        <div style={{ position: 'absolute', bottom: 'clamp(32px,6vw,80px)', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <div style={{
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(172,3,59,0.4)',
            borderRadius: 12, padding: '14px 32px',
          }}>
            <h1 style={{
              fontFamily: SERIF,
              fontSize: 'clamp(24px,4vw,56px)',
              fontWeight: 700, color: '#fff',
              lineHeight: 1, letterSpacing: '-0.02em',
              margin: 0,
            }}>
              Research &amp; Development
            </h1>
          </div>
        </div>
      </section>

      {/* ══ PRODUCT RESEARCH ══════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 24px', lineHeight: 1.1 }}>
            Product Research and<br />New Product Development
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, marginBottom: 16 }}>
            Spices are an integral part of our food. In fact, in India it is almost impossible to imagine food without any spices. Indian foods without spices are almost like baking cake without sugar. They are so synonymous with India not only because they shape Indian foods but also because they're known to shape India's history.
          </p>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.85, marginBottom: 16 }}>
            Ever since the Middle Ages, Indian spices have had enormous value. With heavy demand, the star of the show "Black Pepper" also known as black gold, was also valued at the worth of an individual's life.
          </p>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.85 }}>
            However, unlike earlier times when monopolies dominated spice trade, commerce in spice is now relatively decentralised. Throughout the world, spice and herbs are frequently used in multiple cuisines, thus introducing new tastes and bringing out new flavours in the dish.
          </p>
        </div>
      </section>

      {/* ══ INLINE IMAGE + TEXT ════════════════════════════════ */}
      <section style={{ padding: '0 clamp(24px,5vw,80px) clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Image */}
          <div style={{ flex: '0 0 clamp(240px,35vw,400px)', borderRadius: 20, overflow: 'hidden', position: 'relative', height: 280 }}>
            <Image src="/images/lab.png" alt="R&D Lab" fill style={{ objectFit: 'cover', opacity: 0.8 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(172,3,59,0.15), transparent)' }} />
          </div>
          {/* Text */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 16 }}>Market Context</div>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(20px,2.5vw,36px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 20px', lineHeight: 1.2 }}>
              A Decentralised Spice Trade Creates New Opportunities
            </h3>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, marginBottom: 16 }}>
              However, unlike earlier times when monopolies dominated spice trade, commerce in spice is now relatively decentralised. Throughout the world, spice and herbs are frequently used in multiple cuisines, thus introducing new tastes and bringing out new flavours in the dish.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.85 }}>
              At LV Spices, we have a dedicated team that is working round-the-clock to work on increasing demands of customers by developing new and improved products and combination blends each day. With our fully agile blends developed in-house, it has always been our mission to ensure the blends are conceptualised and formulated as per the required taste, keeping in mind the regulatory requirements for allergens and Pesticides limits.
            </p>
          </div>
        </div>
      </section>

      {/* ══ MILESTONES ════════════════════════════════════════ */}
      <section style={{ padding: '0 clamp(24px,5vw,80px) clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {milestones.map((m, i) => (
            <div key={m.label} style={{
              background: i === 0
                ? `linear-gradient(135deg, rgba(172,3,59,0.15), rgba(172,3,59,0.05))`
                : 'rgba(255,255,255,0.03)',
              border: `1px solid ${i === 0 ? 'rgba(172,3,59,0.35)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 20, padding: 'clamp(24px,3vw,40px) clamp(28px,4vw,52px)',
              textAlign: 'center', flex: '1 1 clamp(160px,18vw,220px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(172,3,59,0.45)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = i === 0 ? 'rgba(172,3,59,0.35)' : 'rgba(255,255,255,0.07)'; }}
            >
              <div style={{ fontFamily: SERIF, fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{m.val}</div>
              <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FOCUS AREAS ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>What We Research</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 700, color: '#fff', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 40px' }}>
            R&amp;D Focus Areas
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px,28vw,340px), 1fr))', gap: 20 }}>
            {focusAreas.map(area => (
              <div key={area.title} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, padding: '28px 24px',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(172,3,59,0.4)'; el.style.background = 'rgba(172,3,59,0.05)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.background = 'rgba(255,255,255,0.03)'; }}
              >
                <div style={{ fontSize: 30, marginBottom: 14 }}>{area.icon}</div>
                <h3 style={{ fontFamily: SANS, fontSize: 14.5, fontWeight: 700, color: '#fff', margin: '0 0 10px' }}>{area.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, margin: 0 }}>{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SENSORY TESTING ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Pill image */}
          <div style={{
            borderRadius: 'clamp(32px,5vw,80px)',
            overflow: 'hidden',
            position: 'relative',
            height: 'clamp(260px,35vw,440px)',
            marginBottom: 60,
          }}>
            <Image src="/images/farm-editorial.png" alt="Sensory Testing" fill style={{ objectFit: 'cover', opacity: 0.55 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)' }} />
            {/* Centre label */}
            <div style={{
              position: 'absolute', bottom: 'clamp(20px,4vw,48px)', left: 0, right: 0,
              textAlign: 'center',
            }}>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,4vw,56px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 12px' }}>Sensory Testing</h2>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(12px,1vw,14px)', color: 'rgba(255,255,255,0.55)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7, padding: '0 24px' }}>
                It is thus necessary to analyse the sensory characteristics of the control sample before creating any new spice formulation. After an evaluation of all parameters established for the product, a recipe is developed. To create a blend based on a formulated recipe, a correct recipe tool be followed, ensuring it achieves the desired specifications.
              </p>
            </div>
          </div>

          {/* Sensory Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(220px,22vw,280px), 1fr))', gap: 20 }}>
            {sensorySteps.map((step, i) => (
              <div key={step.title} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, padding: '24px 20px',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(172,3,59,0.4)'; el.style.background = 'rgba(172,3,59,0.04)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.background = 'rgba(255,255,255,0.03)'; }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${CRIMSON}, #6B0025)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: MONO, fontSize: 12, fontWeight: 700, color: '#fff',
                  marginBottom: 14,
                }}>{String(i + 1).padStart(2, '0')}</div>
                <h3 style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{step.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 12.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COLLABORATIONS ════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)',
        background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 16 }}>Partnerships</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 20px' }}>
            Industry Collaborations &amp; Academic Tie-ups
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.85, margin: '0 0 40px' }}>
            Our R&D division collaborates with premier food science institutions, CFTRI Mysore, Spices Board India, and global flavour houses to stay at the cutting edge of spice innovation. Joint research programs cover functional ingredients, novel extraction methods, and sustainable processing technologies.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['CFTRI, Mysore', 'Spices Board of India', 'IIFPT, Thanjavur', 'Global Flavour Houses', 'NABL Accredited Labs'].map(partner => (
              <div key={partner} style={{
                fontFamily: SANS, fontSize: 13, fontWeight: 500,
                padding: '10px 20px', borderRadius: 999,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.55)',
              }}>{partner}</div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
