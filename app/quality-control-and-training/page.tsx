'use client';

import Image from 'next/image';

import PageHero from '@/components/ui/PageHero';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ParallaxCard from '@/components/ui/ParallaxCard';
import CurvedLoop from '@/components/ui/CurvedLoop';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';



const allergenSteps = [
  'A dedicated Sourcing Director shortlists suppliers and ensures raw materials are free from allergen cross-contamination.',
  'Every Wheat Product used as a filler in some blends was thoroughly reviewed and problematic blends were discontinued.',
  'We thoroughly monitor all incoming raw materials for any allergen contamination from the supplier end.',
  'We continuously work to pass on allergen knowledge to our farming partners and agricultural network.',
  'All in-house Allergen Testing Labs run ELISA analysis on 12 major allergen categories including Sesame, Gluten, Mustard, and Nuts.',
  'Stringent product changeovers are maintained in a correct sequence on the factory floor at all times.',
  'Third-party lab verification of allergens such as celery is done via PCR at specified frequencies.',
];

const trainingModules = [
  { icon: '🦠', title: 'Good Manufacturing Practices', desc: 'All shop floor staff complete mandatory GMP training every 6 months. Covers hygiene, contamination prevention, PPE, and equipment sanitation.' },
  { icon: '🧼', title: 'Personal Hygiene & Food Safety', desc: 'Comprehensive hygiene training including hand-washing discipline, illness reporting, hair/beard nets, glove usage, and allergen cross-contact prevention.' },
  { icon: '🔬', title: 'HACCP & Food Safety Fundamentals', desc: 'Lab personnel and supervisors are trained in identifying critical control points, risk assessment, corrective actions, and deviation documentation.' },
  { icon: '📋', title: 'Documentation & Traceability', desc: 'Training on batch record keeping, CoA interpretation, SAP-integrated traceability systems, and non-conformance reporting.' },
  { icon: '🌱', title: 'Farmer Partner Programs', desc: 'Regular training for farmers on good agricultural practices, responsible pesticide use, and post-harvest handling as part of our backward integration.' },
  { icon: '⚠️', title: 'Allergen Awareness', desc: 'Annual allergen awareness training for all staff handling multi-product lines — covering 14 major allergens, changeover procedures, and ELISA testing.' },
];

const qcChecklist = [
  'Daily Metal Detector Calibration',
  'No Glass & Jewellery Policy — 100% compliance',
  'Weight Verification at every filling station',
  'Sealing integrity checks every 30 mins',
  'Batch-wise CoA issuance before dispatch',
  'Online moisture & colour sensors on milling lines',
];

export default function QualityControlAndTrainingPage() {


  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <PageHero
        tag="Capabilities"
        heading="Quality Control"
        headingRed="& Training."
        subCopy="Our Quality Control team works collectively with Quality Assurance, Hygiene and Food Safety Teams — ensuring every product meets the highest global standards."
        imageSrc="/images/lab.png"
        imageAlt="LV Spices Quality Control"
        overlay="gradient-up"
        stats={[
          { value: '169', label: 'Pesticide Residues Tested' },
          { value: 'ISO 17025', label: 'NABL Accredited' },
          { value: 'BRC Tier 2', label: 'Certified' },
        ]}
      />



      {/* ══ VELOCITY MARQUEE ══════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ PARALLAX SECTION ═════════════════════════════════ */}
      <div style={{ padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px)', background: '#fff' }}>
        <ParallaxCard
          imageSrc="/images/factory.png"
          tilt={false}
          parallaxStrength={0.2}
          style={{ height: 'clamp(300px, 40vh, 500px)', width: '100%', borderRadius: 24, border: 'none' }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)', zIndex: 1 }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: 'clamp(32px, 6vw, 80px)', position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffb3c6', marginBottom: 16 }}>Our Commitment</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 5vw, 64px)', color: '#fff', margin: 0, lineHeight: 1.1, maxWidth: 600 }}>Empowering Through Training</h2>
          </div>
        </ParallaxCard>
      </div>

      {/* ══ PESTICIDE TESTING ══════════════════════════════════ */}
      <section id="pesticide-testing" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: '#fafafa' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 12 }}>NABL Accredited</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 24px' }}>Pesticide Testing</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.85, marginBottom: 12 }}>
              Our lab is accredited for ISO 17025:2017 by NABL. We are now accredited for most tests including heavy metals, mycotoxins, pesticide residues, and allergens.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.85, marginBottom: 40 }}>
              The Lab is accredited for 169 pesticide residues, Ochratoxin, Aflatoxin, NDPA colour value, Curcumin, and Moisture. The Instrumentation Lab is equipped with advanced GC-MS/MS and LC-MS/MS.
            </p>
          </ScrollReveal>

          {/* Stat Badges */}
          <StaggerReveal stagger={0.1} style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            {[
              { top: 'Accreditation', main: 'ISO', sub: '17025', foot: 'Certified' },
              { top: 'Pesticide Molecules', main: '200+', sub: '', foot: 'Pesticides Screened' },
              { top: 'Instruments', main: 'GC-MS', sub: '', foot: '+ LC-MS/MS' },
            ].map(b => (
              <div key={b.top} style={{
                background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 20, padding: '28px 36px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                minWidth: 140, transition: 'all 0.3s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = CRIMSON; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 8px 32px rgba(172,3,59,0.1)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.08)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
              >
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>{b.top}</div>
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(32px,5vw,64px)', fontWeight: 700, color: '#111', lineHeight: 1 }}>{b.main}</div>
                {b.sub && <div style={{ fontFamily: SERIF, fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: CRIMSON, lineHeight: 1 }}>{b.sub}</div>}
                <div style={{ fontFamily: SANS, fontSize: 12, color: 'rgba(0,0,0,0.4)', marginTop: 4 }}>{b.foot}</div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ ALLERGEN CONTROLS ═════════════════════════════════ */}
      <section id="allergen-controls" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 12 }}>Safety First</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 16px' }}>Allergen Controls</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.75, margin: '0 0 48px', maxWidth: 620, marginLeft: 'auto', marginRight: 'auto' }}>
              LV Spices has taken proactive steps to provide customers with safe and allergen-free products.
            </p>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {allergenSteps.map((step, i) => (
              <ScrollReveal key={i} fromY={16} delay={i * 0.05}>
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16,
                  background: '#fafafa', border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: 14, padding: '18px 20px', textAlign: 'left',
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(172,3,59,0.35)'; el.style.background = 'rgba(172,3,59,0.03)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.07)'; el.style.background = '#fafafa'; }}
                >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${CRIMSON}, #6B0025)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: MONO, fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>{i + 1}</div>
                <p style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(0,0,0,0.55)', lineHeight: 1.7, margin: 0 }}>{step}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ QUALITY CONTROL ════════════════════════════════════ */}
      <section id="quality-control" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 12 }}>Standards</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 48px' }}>Quality Control</h2>
          </ScrollReveal>

          <div style={{ display: 'flex', gap: 'clamp(32px,5vw,72px)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Text */}
            <ScrollReveal fromY={20} style={{ flex: 1, minWidth: 280 }}>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, marginBottom: 20 }}>
                The Quality Control Team is always collectively working with Quality Assurance, Hygiene and Food Safety Team. We follow a daily calibration system to check various models — metal detectors, magnets, heat sealing machines, and weighing machines.
              </p>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.85, marginBottom: 32 }}>
                Under Microbiology, various pH parameters including pathogens are in scope of accreditation. Key chemical and physical indicators like water activity, total ash, particle size and total ferrous content are also in our lab testing scope.
              </p>

              {/* QC Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {qcChecklist.map(item => (
                  <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: '#22c55e', fontWeight: 700, marginTop: 1, fontSize: 15 }}>✓</span>
                    <span style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(0,0,0,0.55)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Image collage */}
            <ScrollReveal fromY={20} delay={0.1} style={{ flex: '0 0 clamp(260px,36vw,420px)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ borderRadius: 12, overflow: 'hidden', position: 'relative', height: 220 }}>
                <Image src="/images/lab.png" alt="Quality Control Lab" fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ borderRadius: 10, overflow: 'hidden', position: 'relative', height: 130 }}>
                  <Image src="/images/factory.png" alt="QC Floor" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ borderRadius: 10, overflow: 'hidden', position: 'relative', height: 130 }}>
                  <Image src="/images/products.png" alt="QC Products" fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ VELOCITY DIVIDER ══════════════════════════════════ */}
      <VelocityMarquee reverse />

      {/* ══ TRAINING ══════════════════════════════════════════ */}
      <section id="training" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: '#111' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#D0375C', textAlign: 'center', marginBottom: 12 }}>BRC Tier 2</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#fff', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 20px' }}>Training</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 720, margin: '0 auto 48px', textAlign: 'center' }}>
              Our Processing Units are BRC Food Tier 2 certified. A dedicated team of Systems Experts monitors all mandatory requirements for documentation, training, and certifications.
            </p>
          </ScrollReveal>

          <StaggerReveal
            stagger={0.07}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px,26vw,320px), 1fr))', gap: 20 }}
          >
            {trainingModules.map(mod => (
              <div key={mod.title} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16, padding: '28px 24px', backdropFilter: 'blur(8px)',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(172,3,59,0.5)'; el.style.background = 'rgba(172,3,59,0.08)'; el.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.background = 'rgba(255,255,255,0.04)'; el.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{mod.icon}</div>
                <h3 style={{ fontFamily: SANS, fontSize: 14.5, fontWeight: 700, color: '#fff', margin: '0 0 10px' }}>{mod.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>{mod.desc}</p>
              </div>
            ))}
          </StaggerReveal>

          {/* BRC Banner */}
          <ScrollReveal fromY={20} delay={0.1}>
            <div style={{
              marginTop: 48,
              background: 'rgba(172,3,59,0.1)', border: '1px solid rgba(172,3,59,0.3)',
              borderRadius: 20, padding: 'clamp(20px,3vw,36px) clamp(24px,4vw,48px)',
              display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
            }}>
              <div style={{ fontSize: 40 }}>🏆</div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>BRC Food Grade Tier 2 Certified</div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  Our processing units comply with BRC Food Tier 2 standards — requiring rigorous documentation, training calendars, and annual third-party audits.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                {[{ val: 'Annual', label: 'Training Cycle' }, { val: '100%', label: 'Staff Covered' }].map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ CURVED LOOP ════════════════════════════════════════ */}
      <div style={{ position: 'relative', background: '#F8F6F1', paddingBottom: 'clamp(40px, 6vw, 80px)', paddingTop: 'clamp(40px, 6vw, 80px)' }}>
        <CurvedLoop 
          marqueeText="QUALITY CONTROL • TRAINING • BRC CERTIFIED • "
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
