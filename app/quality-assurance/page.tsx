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

const qaTests = [
  { category: 'Physical Parameters', tests: ['Moisture Content', 'Bulk Density', 'Particle Size Distribution', 'Mesh Analysis', 'Foreign Matter', 'Volatile Oil Content'] },
  { category: 'Chemical Parameters', tests: ['Total Ash', 'Acid Insoluble Ash', 'Crude Fibre', 'Total Fat', 'Protein Content', 'pH Value', 'Heavy Metals'] },
  { category: 'Colour & Sensory', tests: ['ASTA Colour Units', 'SHU (Capsaicin)', 'Curcumin Content', 'Essential Oil (GC)', 'Organoleptic Evaluation'] },
  { category: 'Microbiological', tests: ['Total Plate Count (TPC)', 'Yeast & Mould', 'E. coli', 'Salmonella', 'Aerobic Mesophilic Count'] },
  { category: 'Contaminants', tests: ['Pesticide Residue (200+)', 'Mycotoxins (Aflatoxin B1,G1)', 'Ochratoxin A', 'Sudan Dyes', 'Allergens (14 major)'] },
  { category: 'Packaging & Label', tests: ['Net Weight Verification', 'Sealing Strength', 'Pack Integrity Test', 'Label Accuracy', 'Shelf Life Validation'] },
];

const certifications = [
  { name: 'FSSAI', desc: 'Food Safety & Standards' },
  { name: 'ISO 9001:2015', desc: 'Quality Management' },
  { name: 'ISO 22000:2018', desc: 'Food Safety Mgmt.' },
  { name: 'FSSC 22000', desc: 'Food Safety Certification' },
  { name: 'HACCP', desc: 'Hazard Analysis Control' },
  { name: 'NABL', desc: 'Lab Accreditation' },
  { name: 'USFDA', desc: 'US Compliant' },
  { name: 'EU Compliant', desc: 'European Standards' },
  { name: 'Spices Board', desc: 'India Certified' },
  { name: 'APEDA', desc: 'Export Accreditation' },
  { name: 'BRC Tier 2', desc: 'British Retail Consortium' },
  { name: 'Kosher', desc: 'Kosher Certified' },
];

const qaProcess = [
  { num: '01', title: 'Raw Material Sampling', desc: 'Each incoming lot is sampled using AOAC/ISO standard protocols at multiple points of the consignment.' },
  { num: '02', title: 'In-house Pre-screening', desc: 'Physical parameters are checked at our in-house QC lab within 2 hours of receipt before unloading.' },
  { num: '03', title: 'Third-party Lab Analysis', desc: 'Pesticide residue, mycotoxin, heavy metals, and microbiological tests sent to 3 NABL-accredited labs per lot.' },
  { num: '04', title: 'QC Hold & Release System', desc: 'No material enters production until a COA is approved by our Head of QA.' },
  { num: '05', title: 'In-process Monitoring', desc: 'Online sensors monitor temperature, moisture, and particle size in real time during milling.' },
  { num: '06', title: 'Finished Goods Testing', desc: 'Pre-shipment samples tested against customer specification sheet before dispatch.' },
];

const labStats = [
  { val: 200, suffix: '+', label: 'Analytical Tests' },
  { val: 15, suffix: '', label: 'Micro Tests' },
  { val: 9, suffix: '', label: 'Instrumentation Tests' },
  { val: 30, suffix: '+', label: 'QA Team Members' },
];

export default function QualityAssurancePage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <PageHero
        tag="Our Standards"
        heading="Quality"
        headingRed="Assurance."
        subCopy="30+ enthusiastic professionals working round the clock to monitor quality testing, analysis and research — ensuring every product meets the highest global standards."
        imageSrc="/images/lab.png"
        imageAlt="LV Spices Quality Assurance Lab"
        overlay="gradient-up"
        stats={[
          { value: '200+', label: 'Parameters Tested' },
          { value: '30+', label: 'QA Professionals' },
          { value: '12+', label: 'Certifications' },
        ]}
      />

      {/* ══ VELOCITY MARQUEE DIVIDER ══════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ OVERVIEW + FULL LAB IMAGE ══════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>About Our Lab</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
              NABL Accredited.<br />Globally Trusted.
            </h2>
          </ScrollReveal>

          {/* Full-width rounded image */}
          <ScrollReveal fromY={20} delay={0.1} style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'clamp(24px,4vw,60px)', overflow: 'hidden',
              position: 'relative', height: 'clamp(260px,38vw,480px)',
            }}>
              <Image src="/images/lab.png" alt="LV Spices Quality Lab" fill style={{ objectFit: 'cover', opacity: 0.8 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 100%)' }} />

              {/* Badge overlay */}
              <div style={{
                position: 'absolute', left: 'clamp(20px,4vw,60px)', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(172,3,59,0.3)', borderRadius: 20, padding: '20px 28px',
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <span style={{ fontSize: 36 }}>🔬</span>
                <div>
                  <div style={{ fontFamily: SERIF, fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>30+</div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>QA<br />Professionals</div>
                </div>
              </div>
            </div>

            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.85, textAlign: 'center', maxWidth: 780, margin: '40px auto 0' }}>
              The lab is accredited for ISO 17025:2017 by NABL and is equipped for most test parameters essential for the spice industry. Our tests for heavy metals, mycotoxins, pesticide residues, and allergens are all included in the scope of accreditation.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ STATS COUNTERS ════════════════════════════════════ */}
      <section style={{ padding: '0 clamp(24px,5vw,80px) clamp(60px,8vw,100px)', background: '#fafafa' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <StaggerReveal
            stagger={0.1}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 20 }}
          >
            {labStats.map(s => (
              <div key={s.label} style={{
                background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 20, padding: 'clamp(24px,3vw,36px) 20px',
                textAlign: 'center',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(172,3,59,0.4)'; el.style.background = 'rgba(172,3,59,0.03)'; el.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.07)'; el.style.background = '#fff'; el.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, color: '#111', lineHeight: 1 }}>
                  <AnimatedStat value={s.val} suffix={s.suffix} label={s.label} />
                </div>
                <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 10, lineHeight: 1.5 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ QA PROCESS FLOW ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>QA Flow</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 56px' }}>
              From Lot Receipt to Customer Delivery
            </h2>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {qaProcess.map((step, i) => (
              <ScrollReveal key={step.num} fromY={20} delay={i * 0.05} style={{ display: 'flex', gap: 20, paddingBottom: i < qaProcess.length - 1 ? 28 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${CRIMSON}, #6B0025)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: MONO, fontSize: 12, fontWeight: 700, color: '#fff',
                    boxShadow: '0 4px 16px rgba(172,3,59,0.25)', flexShrink: 0,
                  }}>{step.num}</div>
                  {i < qaProcess.length - 1 && <div style={{ width: 1, flex: 1, background: 'rgba(172,3,59,0.15)', marginTop: 8 }} />}
                </div>
                <div style={{ paddingTop: 10 }}>
                  <h3 style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: '#111', margin: '0 0 8px' }}>{step.title}</h3>
                  <p style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(0,0,0,0.52)', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VELOCITY DIVIDER ══════════════════════════════════ */}
      <VelocityMarquee />

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
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 5vw, 64px)', color: '#fff', margin: 0, lineHeight: 1.1, maxWidth: 600 }}>Uncompromising Standards</h2>
          </div>
        </ParallaxCard>
      </div>

      {/* ══ TEST PARAMETERS ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>200+ Parameters</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 40px' }}>
              What We Test
            </h2>
          </ScrollReveal>

          <StaggerReveal
            stagger={0.08}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px,26vw,320px), 1fr))', gap: 20 }}
          >
            {qaTests.map(cat => (
              <div key={cat.category} style={{
                background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 16, padding: '24px 24px 28px',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(172,3,59,0.4)'; el.style.background = 'rgba(172,3,59,0.03)'; el.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.07)'; el.style.background = '#fff'; el.style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: CRIMSON, flexShrink: 0 }} />
                  <h3 style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#111', margin: 0 }}>{cat.category}</h3>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {cat.tests.map(t => (
                    <li key={t} style={{ fontFamily: SANS, fontSize: 12.5, color: 'rgba(0,0,0,0.52)', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ color: CRIMSON, flexShrink: 0, marginTop: 2 }}>›</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ CERTIFICATIONS ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>Accreditations</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 40px' }}>
              Certifications & Compliance
            </h2>
          </ScrollReveal>

          <StaggerReveal
            stagger={0.06}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(130px,13vw,180px), 1fr))', gap: 14 }}
          >
            {certifications.map(cert => (
              <div key={cert.name} style={{
                background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 14, padding: '20px 16px', textAlign: 'center',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = CRIMSON; el.style.background = 'rgba(172,3,59,0.05)'; el.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.07)'; el.style.background = '#fff'; el.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 6 }}>{cert.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(0,0,0,0.42)', lineHeight: 1.5 }}>{cert.desc}</div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ CURVED LOOP ════════════════════════════════════════ */}
      <div style={{ position: 'relative', background: '#F8F6F1', paddingBottom: 'clamp(40px, 6vw, 80px)', paddingTop: 'clamp(40px, 6vw, 80px)' }}>
        <CurvedLoop 
          marqueeText="QUALITY ASSURANCE • 100% TESTED • GLOBALLY COMPLIANT • "
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
