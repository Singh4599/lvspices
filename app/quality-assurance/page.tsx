'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import ScrollReveal, { StaggerReveal, AnimatedStat } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';
import ScrollExpansionHero from '@/components/ui/ScrollExpansionHero';
import { gsap } from '@/lib/gsap';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const qaTests = [
  { category: 'Physical Parameters', icon: '⚖️', tests: ['Moisture Content', 'Bulk Density', 'Particle Size Distribution', 'Mesh Analysis', 'Foreign Matter', 'Volatile Oil Content'] },
  { category: 'Chemical Parameters', icon: '🧪', tests: ['Total Ash', 'Acid Insoluble Ash', 'Crude Fibre', 'Total Fat', 'Protein Content', 'pH Value', 'Heavy Metals'] },
  { category: 'Colour & Sensory', icon: '🎨', tests: ['ASTA Colour Units', 'SHU (Capsaicin)', 'Curcumin Content', 'Essential Oil (GC)', 'Organoleptic Evaluation'] },
  { category: 'Microbiological', icon: '🦠', tests: ['Total Plate Count (TPC)', 'Yeast & Mould', 'E. coli', 'Salmonella', 'Aerobic Mesophilic Count'] },
  { category: 'Contaminants', icon: '🛡️', tests: ['Pesticide Residue (500+)', 'Mycotoxins (Aflatoxin B1,G1)', 'Ochratoxin A', 'Sudan Dyes', 'Allergens (14 major)'] },
  { category: 'Packaging & Label', icon: '📦', tests: ['Net Weight Verification', 'Sealing Strength', 'Pack Integrity Test', 'Label Accuracy', 'Shelf Life Validation'] },
];

const certifications = [
  { name: 'FSSAI', desc: 'Food Safety & Standards Authority' },
  { name: 'ISO 9001:2015', desc: 'Quality Management System' },
  { name: 'ISO 22000:2018', desc: 'Food Safety Management' },
  { name: 'FSSC 22000', desc: 'GFSI-Recognised Standard' },
  { name: 'HACCP', desc: 'Hazard Analysis & CCP' },
  { name: 'NABL', desc: 'ISO/IEC 17025:2017 Lab' },
  { name: 'US FDA', desc: 'US Market Compliant' },
  { name: 'EU Compliant', desc: 'European Standards' },
  { name: 'Spices Board', desc: 'India Certified Exporter' },
  { name: 'APEDA', desc: 'Agricultural Export Dev.' },
  { name: 'BRC Grade AA', desc: 'British Retail Consortium' },
  { name: 'Kosher', desc: 'Kosher Certified' },
];

const qaProcess = [
  { num: '01', title: 'Raw Material Sampling', desc: 'Each incoming lot is sampled using AOAC/ISO standard protocols at multiple points of the consignment before unloading begins.' },
  { num: '02', title: 'In-house Pre-screening', desc: 'Physical parameters — moisture, colour, size — are checked at our QC lab within 2 hours of receipt, ensuring only approved material enters the plant.' },
  { num: '03', title: 'Third-party Lab Analysis', desc: 'Pesticide residue, mycotoxin, heavy metals, and microbiological tests are sent to 3 NABL-accredited external labs per lot for independent verification.' },
  { num: '04', title: 'QC Hold & Release System', desc: 'No material enters production until a full Certificate of Analysis (COA) is reviewed and approved by the Head of Quality Assurance. Zero exceptions.' },
  { num: '05', title: 'In-process Monitoring', desc: 'Online sensors track temperature, moisture, and particle size in real time during milling. Any deviation triggers an automatic hold.' },
  { num: '06', title: 'Finished Goods Dispatch', desc: 'Pre-shipment samples are tested against the customer specification sheet and regulatory requirements of the destination country before every dispatch.' },
];

const labStats = [
  { val: 500, suffix: '+', label: 'Compounds Screened' },
  { val: 30, suffix: '+', label: 'QA Professionals' },
  { val: 100, suffix: '%', label: 'Lots Tested' },
  { val: 12, suffix: '+', label: 'Certifications' },
];

// GSAP zoom image
function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: wrapRef.current, start: 'top 85%', end: 'top 20%', scrub: 0.8 },
      })
        .fromTo('.qi', { scale: 1.25, filter: 'brightness(0.6)' }, { scale: 1, filter: 'brightness(1)', ease: 'power2.out' })
        .fromTo('.qo', { opacity: 0.7 }, { opacity: 0.2 }, '<');
    }, wrapRef);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 24 }}>
      <div className="qi" style={{ position: 'absolute', inset: -20 }}>
        <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} />
      </div>
      <div className="qo" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(172,3,59,0.2), rgba(0,0,0,0.4))', zIndex: 1 }} />
    </div>
  );
}

// Tilt card
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isD = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isD) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / r.height) * -10;
    const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 10;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    el.style.boxShadow = `${-ry * 1.5}px ${rx * 1.5}px 36px rgba(172,3,59,0.15)`;
    el.style.borderColor = 'rgba(172,3,59,0.35)';
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
    el.style.boxShadow = 'none';
    el.style.borderColor = 'rgba(0,0,0,0.07)';
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px 24px', willChange: 'transform', transition: 'transform 0.12s, box-shadow 0.12s, border-color 0.12s' }}>
      {children}
    </div>
  );
}

export default function QualityAssurancePage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111', overflowX: 'hidden' }}>

      {/* ══ SCROLL EXPANSION HERO ════════════════════════════════ */}
      <ScrollExpansionHero
        badge="Our Standards"
        headingText="Quality"
        headingRed="Assurance."
        subText="30+ enthusiastic professionals working round the clock — monitoring, testing, and perfecting every product to the highest global standards."
        imageSrc="/images/lab.png"
        stats={[
          { value: '500+', label: 'Parameters Tested' },
          { value: '30+', label: 'QA Professionals' },
          { value: '12+', label: 'Certifications' },
        ]}
      />

      {/* ══ VELOCITY MARQUEE ════════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ INTRO SECTION ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 'clamp(48px,8vw,100px)', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 460px', height: 'clamp(360px,42vw,540px)', minWidth: 0 }}>
            <ZoomImage src="/images/lab.png" alt="NABL Lab" />
          </div>
          <ScrollReveal fromY={24} style={{ flex: '1 1 340px', minWidth: 0 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 16 }}>NABL Accredited</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
              Globally Trusted.<br /><em style={{ color: CRIMSON, fontStyle: 'italic' }}>Zero Compromises.</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, margin: '0 0 16px' }}>
              Our analytical laboratory, accredited by NABL to ISO/IEC 17025:2017, is equipped with LC-MS/MS and GC-MS/MS for comprehensive pesticide and mycotoxin residue analysis across 500+ compounds simultaneously.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, margin: 0 }}>
              Every export lot receives a full, independently verified Certificate of Analysis before dispatch — covering physical, chemical, microbiological, and contaminant parameters. No exceptions.
            </p>
            {/* Stats */}
            <div style={{ display: 'flex', gap: 'clamp(20px,4vw,48px)', marginTop: 36, flexWrap: 'wrap' }}>
              {labStats.map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3vw,40px)', fontWeight: 800, color: '#111', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    <AnimatedStat value={s.val} suffix={s.suffix} label={s.label} />
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 8 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ QA PROCESS FLOW ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: '#111' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 'clamp(48px,8vw,100px)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <ScrollReveal fromY={24} style={{ flex: '0 0 clamp(220px,30vw,380px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#D0375C', marginBottom: 16 }}>QA Flow</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,56px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
              Lot Receipt<br />to Customer<br /><em style={{ color: '#D0375C' }}>Delivery.</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, margin: 0 }}>
              A six-stage quality gate system. No material moves forward unless it passes every checkpoint — inspected by our QA team and independent NABL labs.
            </p>
          </ScrollReveal>
          <div style={{ flex: 1, minWidth: 280 }}>
            {qaProcess.map((step, i) => (
              <ScrollReveal key={step.num} fromY={20} delay={i * 0.05} style={{ display: 'flex', gap: 20, paddingBottom: i < qaProcess.length - 1 ? 36 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: 46, height: 46, borderRadius: '50%', background: `linear-gradient(135deg, ${CRIMSON}, #6B0025)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 12, fontWeight: 700, color: '#fff', boxShadow: '0 4px 16px rgba(172,3,59,0.3)', flexShrink: 0 }}>{step.num}</div>
                  {i < qaProcess.length - 1 && <div style={{ width: 1, flex: 1, background: 'rgba(172,3,59,0.2)', marginTop: 8 }} />}
                </div>
                <div style={{ paddingTop: 10 }}>
                  <h3 style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{step.title}</h3>
                  <p style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, margin: 0 }}>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TEST PARAMETERS — TILT CARDS ══════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: '#fafafa' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <ScrollReveal fromY={30} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,80px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 14 }}>200+ Parameters</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: 0 }}>
              What We <em style={{ color: CRIMSON, fontStyle: 'italic' }}>Test</em>
            </h2>
          </ScrollReveal>
          <StaggerReveal stagger={0.08} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 'clamp(14px,1.8vw,24px)' }}>
            {qaTests.map(cat => (
              <TiltCard key={cat.category}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <div style={{ fontSize: 22, width: 44, height: 44, borderRadius: 12, background: 'rgba(172,3,59,0.07)', border: '1px solid rgba(172,3,59,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{cat.icon}</div>
                  <h3 style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 700, color: '#111', margin: 0 }}>{cat.category}</h3>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {cat.tests.map(t => (
                    <li key={t} style={{ fontFamily: SANS, fontSize: 12.5, color: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ color: CRIMSON, flexShrink: 0, marginTop: 2 }}>›</span>{t}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ CURVED LOOP ══════════════════════════════════════════ */}
      <div style={{ position: 'relative', background: '#F8F6F1', paddingTop: 'clamp(16px,2vw,32px)', paddingBottom: 'clamp(40px,6vw,80px)' }}>
        <CurvedLoop marqueeText="NABL ACCREDITED • 100% TESTED • ISO 22000 • FSSC 22000 • BRC AA • " speed={1.5} curveAmount={250} className="fill-[#111] uppercase font-mono tracking-widest" />
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          <text style={{ fontSize: 'clamp(28px,4vw,56px)', fontFamily: 'var(--font-display)', color: CRIMSON, fontWeight: 800 }}>LV</text>
          <text style={{ fontSize: 'clamp(9px,1vw,14px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</text>
        </div>
      </div>

      {/* ══ CERTIFICATIONS ══════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <ScrollReveal fromY={30} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 14 }}>Accreditations</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: 0 }}>
              Certifications &<br /><em style={{ color: CRIMSON, fontStyle: 'italic' }}>Compliance</em>
            </h2>
          </ScrollReveal>
          <StaggerReveal stagger={0.05} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 170px), 1fr))', gap: 'clamp(10px,1.5vw,18px)' }}>
            {certifications.map(cert => (
              <div key={cert.name} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: '24px 16px', textAlign: 'center', transition: 'all 0.25s', cursor: 'default' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = CRIMSON; el.style.background = 'rgba(172,3,59,0.05)'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 10px 30px rgba(172,3,59,0.1)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.08)'; el.style.background = '#fff'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
                <div style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 6 }}>{cert.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(0,0,0,0.42)', lineHeight: 1.4 }}>{cert.desc}</div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: CRIMSON, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none' }}>
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(80px,18vw,280px)', fontWeight: 900, color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>QUALITY</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal fromY={24}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 20 }}>Request Documents</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,5.5vw,80px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
              Need Our COA<br />or Lab Reports?
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(15px,1.3vw,18px)', color: 'rgba(255,255,255,0.8)', maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.75 }}>
              We can share product-specific Certificates of Analysis, third-party lab reports, and our NABL accreditation scope document within 24 hours.
            </p>
            <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#fff', color: CRIMSON, fontFamily: SANS, fontWeight: 700, fontSize: 15, padding: '18px 40px', borderRadius: 999, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'; }}>
              Request Documents →
            </a>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
