'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

/* ── Nav Tabs ─────────────────────────────────────────────── */
const TABS = [
  { id: 'pesticide-testing', label: 'Pesticide Testing' },
  { id: 'allergen-controls', label: 'Allergen Controls' },
  { id: 'quality-control', label: 'Quality Control' },
  { id: 'training', label: 'Training' },
];

/* ── Allergen Steps ───────────────────────────────────────── */
const allergenSteps = [
  'A dedicated Sourcing Director to shortlist suppliers and ensure that raw materials as allergens to avoid contamination.',
  'Every Wheat Product is required as a filler in some blends of our product line. The same set of blends were discontinued.',
  'Thoroughly monitor all raw materials that is received for presence of any allergen contamination from the supplier end.',
  'We are also continuously working to pass on the knowledge on allergens to our farmers and therefore our farming partners as well.',
  'All our in-house Allergen Testing Labs run analysis (ELISA) on allergens for twelve major categories including Products: Sesame, Gluten, Mustard and Nuts.',
  'In order to maintain proper hygiene checks and to avoid the possibility of biosensor blends, stringent product changeovers are maintained in a correct sequence from the factory floor at any given time.',
  'Third party lab verification of allergens such as celery are PCR-ed at a specified frequency.',
];

/* ── Training Modules ─────────────────────────────────────── */
const trainingModules = [
  {
    icon: '🦠',
    title: 'Good Manufacturing Practices',
    desc: 'All shop floor staff complete mandatory GMP training every 6 months. Modules cover hygiene, contamination prevention, PPE usage, and equipment sanitation protocols.',
  },
  {
    icon: '🧼',
    title: 'Personal Hygiene & Food Safety',
    desc: 'Comprehensive hygiene training including hand-washing discipline, illness reporting protocols, hair/beard nets, glove usage, and allergen cross-contact prevention.',
  },
  {
    icon: '🔬',
    title: 'HACCP & Food Safety Fundamentals',
    desc: 'Lab personnel and line supervisors are trained in identifying critical control points, risk assessment, corrective actions, and deviation documentation.',
  },
  {
    icon: '📋',
    title: 'Documentation & Traceability',
    desc: 'Training on batch record keeping, CoA interpretation, SAP-integrated traceability systems, and non-conformance reporting using our in-house digital forms.',
  },
  {
    icon: '🌱',
    title: 'Farmer Partner Programs',
    desc: 'As part of our backward integration program, we conduct regular training for farmers on good agricultural practices, responsible pesticide use, and post-harvest handling.',
  },
  {
    icon: '⚠️',
    title: 'Allergen Awareness',
    desc: 'Annual allergen awareness training for all staff handling multi-product lines — covering the 14 major allergens, changeover procedures, and ELISA testing interpretation.',
  },
];

/* ─────────────────────────────────────────────────────────── */

export default function QualityControlAndTrainingPage() {
  const [activeTab, setActiveTab] = useState('pesticide-testing');
  const navRef = useRef<HTMLDivElement>(null);
  const [navSticky, setNavSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) setNavSticky(navRef.current.getBoundingClientRect().top <= 64);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px) clamp(40px,6vw,70px)',
        textAlign: 'center',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(172,3,59,0.1) 0%, transparent 70%)',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(172,3,59,0.12)', border: '1px solid rgba(172,3,59,0.35)',
            borderRadius: 999, padding: '6px 18px', marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: CRIMSON, display: 'inline-block' }} />
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON }}>Capabilities</span>
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,6vw,80px)', fontWeight: 700, color: '#111', lineHeight: 1.0, letterSpacing: '-0.03em', margin: '0 0 20px' }}>
            Quality Control<br />&amp; Training
          </h1>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.75, margin: 0 }}>
            Our Quality Control team is always collectively working with Quality Assurance, Hygiene and Food Safety Teams — ensuring every product meets the highest global standards before it leaves our facility.
          </p>
        </div>
      </section>

      {/* ══ STICKY NAV ════════════════════════════════════════ */}
      <div ref={navRef} style={{
        position: 'sticky', top: 64, zIndex: 30,
        background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', overflowX: 'auto' }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => scrollTo(tab.id)} style={{
              fontFamily: SANS, fontSize: 13, fontWeight: 500,
              padding: '18px clamp(20px,3vw,48px)',
              flex: 1,
              background: activeTab === tab.id ? CRIMSON : 'transparent',
              color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.45)',
              border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              borderBottom: activeTab === tab.id ? `2px solid ${CRIMSON}` : '2px solid transparent',
              transition: 'all 0.25s',
            }}>{tab.label}</button>
          ))}
        </div>
      </div>

      {/* ══ PESTICIDE TESTING ══════════════════════════════════ */}
      <section id="pesticide-testing" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 24px' }}>Pesticide Testing</h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.85, marginBottom: 16 }}>
            Our lab has been accredited for ISO 17025: 2017 by NABL and we faced the Third Party Proficiency audit conducted by National Accreditation Board for Testing and Calibration Laboratories (NABL) for ISO 17025:2017 with great outcomes. We may proudly announce that we are now accredited for most of the tests including heavy metals, mycotoxins, pesticide residues and allergens.
          </p>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.85, marginBottom: 16 }}>
            In total, the Lab is accredited for 169 pesticide residues, Ochratoxin, Aflatoxin, Patupcin, NDPA color value, Curcumin, Moisture. The allergen testing lab is accredited for quantification of allergens like Gluten, Sesame, Peanut and Mustard.
          </p>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.85, marginBottom: 40 }}>
            The Instrumentation Lab is equipped with advanced GCMSMS and LCMSMS which is used for pesticide and multiresidue testing and these can be done simultaneously. Testing activities can be interpreted to various other parameters like Formaldehyde analysis, Polyaromatic Hydrocarbons, various organic solvents in future.
          </p>

          {/* ISO Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{
              background: 'rgba(172,3,59,0.08)', border: '1px solid rgba(172,3,59,0.25)',
              borderRadius: 20, padding: '32px 40px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)' }}>Accreditation</div>
              <div style={{ fontFamily: SERIF, fontSize: 'clamp(36px,6vw,80px)', fontWeight: 700, color: '#111', lineHeight: 1 }}>ISO</div>
              <div style={{ fontFamily: SERIF, fontSize: 'clamp(32px,5vw,64px)', fontWeight: 700, color: CRIMSON, lineHeight: 1 }}>17025</div>
              <div style={{ fontFamily: SANS, fontSize: 12, color: 'rgba(0,0,0,0.4)', marginTop: 4 }}>Certified</div>
            </div>
            <div style={{
              background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: 20, padding: '32px 40px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)' }}>Pesticide Molecules</div>
              <div style={{ fontFamily: SERIF, fontSize: 'clamp(36px,6vw,80px)', fontWeight: 700, color: '#111', lineHeight: 1 }}>200+</div>
              <div style={{ fontFamily: SANS, fontSize: 12, color: 'rgba(0,0,0,0.4)', marginTop: 4 }}>Pesticides Screened</div>
            </div>
            <div style={{
              background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: 20, padding: '32px 40px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)' }}>Instruments</div>
              <div style={{ fontFamily: SERIF, fontSize: 'clamp(36px,6vw,80px)', fontWeight: 700, color: '#111', lineHeight: 1 }}>GC-MS</div>
              <div style={{ fontFamily: SANS, fontSize: 12, color: 'rgba(0,0,0,0.4)', marginTop: 4 }}>+ LC-MS/MS</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ALLERGEN CONTROLS ═════════════════════════════════ */}
      <section id="allergen-controls" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 16px' }}>Allergen Controls</h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.75, margin: '0 0 48px', maxWidth: 620, marginLeft: 'auto', marginRight: 'auto' }}>
            Considering Allergen Awareness amongst people around the world, LV Spices has taken many proactive steps to provide customers with safe and allergen-free products. These include:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {allergenSteps.map((step, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 14, padding: '18px 20px', textAlign: 'left',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(172,3,59,0.35)'; el.style.background = 'rgba(172,3,59,0.04)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(0,0,0,0.07)'; el.style.background = 'rgba(0,0,0,0.03)'; }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${CRIMSON}, #6B0025)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: MONO, fontSize: 11, fontWeight: 700, color: '#111',
                  flexShrink: 0,
                }}>{i + 1}</div>
                <p style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0 }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ QUALITY CONTROL ════════════════════════════════════ */}
      <section id="quality-control" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 48px' }}>Quality Control</h2>

          <div style={{ display: 'flex', gap: 'clamp(32px,5vw,72px)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Text */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, marginBottom: 20 }}>
                The Quality Control Team is always collectively working with Quality Assurance, Hygiene and Food Safety Team. We are always striving to adhere to Good Manufacturing &amp; Hygiene Practices. The No Glass &amp; Jewellery Policy and other related policies have always been strictly complied by the team. We follow a daily calibration system to keep a check on various models of calibration by working with metal detectors, magnets, heat sealing machines, weighing machines etc. thus delivering a superior quality product to the end consumer.
              </p>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.85, marginBottom: 32 }}>
                Under Microbiology, various pH parameters including pathogens are in scope of accreditation. Key Chemical and physical indicators like water activity, total ash, particle size and total ferrous content are also tests in scope of our lab testing.
              </p>

              {/* QC Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Daily Metal Detector Calibration',
                  'No Glass & Jewellery Policy — 100% compliance',
                  'Weight Verification at every filling station',
                  'Sealing integrity checks every 30 mins',
                  'Batch-wise CoA issuance before dispatch',
                  'Online moisture &amp; colour sensors on milling lines',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: '#4ade80', fontWeight: 700, marginTop: 1 }}>✓</span>
                    <span style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(0,0,0,0.5)' }} dangerouslySetInnerHTML={{ __html: item }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Image collage */}
            <div style={{ flex: '0 0 clamp(260px,36vw,420px)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', height: 200 }}>
                <Image src="/images/lab.png" alt="Quality Control Lab" fill style={{ objectFit: 'cover', opacity: 0.75 }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ borderRadius: 14, overflow: 'hidden', position: 'relative', height: 120 }}>
                  <Image src="/images/factory.png" alt="QC Floor" fill style={{ objectFit: 'cover', opacity: 0.7 }} />
                </div>
                <div style={{ borderRadius: 14, overflow: 'hidden', position: 'relative', height: 120 }}>
                  <Image src="/images/products.png" alt="QC Products" fill style={{ objectFit: 'cover', opacity: 0.7 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TRAINING ══════════════════════════════════════════ */}
      <section id="training" style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/farm-editorial.png" alt="Training" fill style={{ objectFit: 'cover', opacity: 0.1 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.95) 100%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 20px' }}>Training</h2>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8, maxWidth: 720, margin: '0 auto' }}>
                Besides other certifications, our Processing Units are also BRC Food Tier 2 thus obliging the team to be on-edge and streamlined. A dedicated team of Systems Experts are also employed with us to monitor all and any mandatory requirements for documentation, training and the BRC certifications.
                At LV Spices, we have devised an annual training calendar to cover all key significant areas of activities wherein various audit tools are used to well-Control and run the lab, this allowing us to cover all significant areas simultaneously and to maintain all food safety and health areas of site. As a part of our backward integration program, we conduct training at regular intervals to farmers on ground-level.
              </p>
            </div>

            {/* Training Modules Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px,28vw,340px), 1fr))', gap: 20 }}>
              {trainingModules.map(mod => (
                <div key={mod.title} style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 16, padding: '28px 24px',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(172,3,59,0.4)'; el.style.background = 'rgba(172,3,59,0.06)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(0,0,0,0.08)'; el.style.background = 'rgba(255,255,255,0.04)'; }}
                >
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{mod.icon}</div>
                  <h3 style={{ fontFamily: SANS, fontSize: 14.5, fontWeight: 700, color: '#111', margin: '0 0 10px' }}>{mod.title}</h3>
                  <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, margin: 0 }}>{mod.desc}</p>
                </div>
              ))}
            </div>

            {/* BRC Banner */}
            <div style={{
              marginTop: 48,
              background: 'rgba(172,3,59,0.08)', border: '1px solid rgba(172,3,59,0.25)',
              borderRadius: 16, padding: 'clamp(20px,3vw,32px) clamp(24px,4vw,48px)',
              display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
            }}>
              <div style={{ fontSize: 40 }}>🏆</div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 6 }}>BRC Food Grade Tier 2 Certified</div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.5)', lineHeight: 1.6 }}>
                  Our processing units comply with BRC Food Tier 2 standards — requiring rigorous documentation, training calendars, and annual third-party audits.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {[{ val: 'Annual', label: 'Training Cycle' }, { val: '100%', label: 'Staff Covered' }].map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: '#111', lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
