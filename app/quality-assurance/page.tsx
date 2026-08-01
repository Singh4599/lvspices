'use client';

import { useEffect, useRef, useState } from 'react';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import QALabBlueprint from '@/components/quality/QALabBlueprint';
import QualityHero from '@/components/quality/QualityHero';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const CR = '#AC033B';

// ── Data ─────────────────────────────────────────────────────────────────────

const qaTests = [
  { id: 'physical', label: 'Physical', tests: ['Moisture Content', 'Bulk Density', 'Particle Size Distribution', 'Mesh Analysis', 'Foreign Matter', 'Volatile Oil Content'] },
  { id: 'chemical', label: 'Chemical', tests: ['Total Ash', 'Acid Insoluble Ash', 'Crude Fibre', 'Total Fat', 'Protein Content', 'pH Value', 'Heavy Metals'] },
  { id: 'colour',   label: 'Colour & Sensory', tests: ['ASTA Colour Units', 'SHU (Capsaicin)', 'Curcumin Content', 'Essential Oil (GC)', 'Organoleptic Evaluation'] },
  { id: 'micro',    label: 'Microbiological', tests: ['Total Plate Count', 'Yeast & Mould', 'E. coli', 'Salmonella', 'Aerobic Mesophilic Count'] },
  { id: 'contam',   label: 'Contaminants', tests: ['Pesticide Residue (500+)', 'Mycotoxins (Aflatoxin B1,G1)', 'Ochratoxin A', 'Sudan Dyes', 'Allergens (14 major)'] },
  { id: 'pack',     label: 'Packaging & Label', tests: ['Net Weight Verification', 'Sealing Strength', 'Pack Integrity Test', 'Label Accuracy', 'Shelf Life Validation'] },
];

const certifications = [
  { name: 'FSSAI',       desc: 'Food Safety Standards' },
  { name: 'ISO 9001',    desc: 'Quality Management' },
  { name: 'ISO 22000',   desc: 'Food Safety Mgmt' },
  { name: 'FSSC 22000',  desc: 'GFSI-Recognised' },
  { name: 'HACCP',       desc: 'Hazard Analysis' },
  { name: 'NABL',        desc: 'ISO/IEC 17025 Lab' },
  { name: 'US FDA',      desc: 'US Market Ready' },
  { name: 'EU Compliant',desc: 'European Standards' },
  { name: 'Spices Board',desc: 'India Certified' },
  { name: 'APEDA',       desc: 'Agri Export Dev.' },
  { name: 'BRC Grade AA',desc: 'British Retail Consortium' },
  { name: 'Kosher',      desc: 'Kosher Certified' },
];

const qaProcess = [
  { num: '01', title: 'Raw Material Sampling',    desc: 'Each incoming lot sampled using AOAC/ISO protocols at multiple consignment points before unloading.' },
  { num: '02', title: 'In-house Pre-screening',   desc: 'Physical parameters — moisture, colour, size — checked in our QC lab within 2 hours of receipt.' },
  { num: '03', title: 'Third-party Lab Analysis', desc: 'Pesticide, mycotoxin, heavy metals & micro tests sent to 3 NABL-accredited external labs per lot.' },
  { num: '04', title: 'QC Hold & Release',        desc: 'No material enters production without a full COA reviewed by the Head of QA. Zero exceptions.' },
  { num: '05', title: 'In-process Monitoring',    desc: 'Sensors track temperature, moisture, particle size in real time. Any deviation triggers auto-hold.' },
  { num: '06', title: 'Finished Goods Dispatch',  desc: 'Pre-shipment samples tested against customer spec sheet and destination-country regulations.' },
];

// ── Interactive Test Panel ────────────────────────────────────────────────────
function TestPanel() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const switchTab = (i: number) => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll('.test-item');
    gsap.fromTo(items,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'power3.out' }
    );
    setActive(i);
  };

  useEffect(() => {
    if (listRef.current) {
      const items = listRef.current.querySelectorAll('.test-item');
      gsap.fromTo(items, { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power3.out' });
    }
  }, [active]);

  return (
    <div className="test-panel-container">
      <style>{`
        .test-panel-container { display: flex; gap: clamp(24px,4vw,64px); flex-wrap: wrap; align-items: flex-start; }
        .test-panel-tabs { flex: 0 0 auto; display: flex; flex-direction: column; gap: 2px; min-width: 180px; }
        .test-panel-divider { width: 1px; background: rgba(0,0,0,0.07); align-self: stretch; flex-shrink: 0; }
        @media (max-width: 768px) {
          .test-panel-container { flex-wrap: nowrap !important; gap: 16px !important; }
          .test-panel-tabs { min-width: 120px !important; width: 120px !important; }
          .test-panel-tabs button { padding: 10px 12px !important; font-size: 11px !important; }
          /* tests will just flex to take remaining space */
        }
      `}</style>

      {/* Tab list */}
      <div className="test-panel-tabs">
        {qaTests.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => switchTab(i)}
            style={{
              all: 'unset', cursor: 'pointer',
              padding: '12px 20px',
              borderRadius: 10,
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: active === i ? 700 : 500,
              color: active === i ? CR : 'rgba(0,0,0,0.5)',
              background: active === i ? 'rgba(172,3,59,0.07)' : 'transparent',
              borderLeft: active === i ? `3px solid ${CR}` : '3px solid transparent',
              transition: 'all 0.2s ease',
              textAlign: 'left',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="test-panel-divider" />

      {/* Test list */}
      <div ref={listRef} style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: CR, marginBottom: 20, fontWeight: 700 }}>
          {qaTests[active].tests.length} Tests
        </div>
        {qaTests[active].tests.map((t) => (
          <div key={t} className="test-item" style={{
            padding: '14px 0',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1vw,15px)',
            color: '#222', display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: CR, flexShrink: 0 }} />
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Animated QA Timeline ──────────────────────────────────────────────────────
function QATimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = ref.current?.querySelectorAll('.qa-step');
      const line = ref.current?.querySelector('.timeline-line-fill') as HTMLElement;

      if (line) {
        gsap.fromTo(line, { scaleY: 0 }, {
          scaleY: 1, transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 30%', scrub: 1 },
        });
      }

      steps?.forEach((step, i) => {
        gsap.fromTo(step,
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 80%', toggleActions: 'play none none none' },
            delay: i * 0.05,
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ display: 'flex', gap: 32 }}>
      {/* Vertical line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 6 }}>
        <div style={{ position: 'relative', width: 2, flex: 1, background: 'rgba(0,0,0,0.06)' }}>
          <div className="timeline-line-fill" style={{ position: 'absolute', inset: 0, background: CR, transformOrigin: 'top', scaleY: 0 }} />
        </div>
      </div>

      {/* Steps */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {qaProcess.map((s, i) => (
          <div key={s.num} className="qa-step" style={{
            display: 'flex', gap: 20, paddingBottom: i < qaProcess.length - 1 ? 36 : 0, alignItems: 'flex-start', opacity: 0,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', border: `2px solid ${CR}`,
              background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginLeft: -19,
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: CR,
            }}>
              {s.num}
            </div>
            <div style={{ paddingTop: 6 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,1.4vw,20px)', fontWeight: 700, color: '#111', marginBottom: 6 }}>
                {s.title}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(12px,0.95vw,14px)', color: 'rgba(0,0,0,0.45)', lineHeight: 1.7, maxWidth: 480 }}>
                {s.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Certification Stamps ──────────────────────────────────────────────────────
function CertBadges() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const badges = ref.current?.querySelectorAll('.cert-badge');
      badges?.forEach((badge, i) => {
        gsap.fromTo(badge,
          { scale: 0.4, opacity: 0, rotation: -8 + Math.random() * 16 },
          {
            scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: badge, start: 'top 88%', toggleActions: 'play none none none' },
            delay: (i % 4) * 0.06,
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <style>{`
        .cert-badges-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: clamp(8px,1.2vw,16px);
        }
        .cert-badge {
          padding: 18px 14px;
        }
        @media (max-width: 1024px) {
          .cert-badges-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 768px) {
          .cert-badges-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          .cert-badge {
            padding: 12px 8px;
          }
          .cert-badge > div:nth-child(2) { font-size: 11px !important; }
        }
        @media (max-width: 480px) {
          .cert-badges-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
      <div className="cert-badges-grid">
      {certifications.map((cert) => (
        <div
          key={cert.name}
          className="cert-badge"
          style={{
            background: '#fff',
            border: `1.5px solid rgba(172,3,59,0.12)`,
            borderRadius: 14, padding: '18px 14px', textAlign: 'center',
            cursor: 'default', opacity: 0,
            transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = CR;
            el.style.transform = 'translateY(-4px) scale(1.02)';
            el.style.boxShadow = `0 12px 32px rgba(172,3,59,0.12)`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = 'rgba(172,3,59,0.12)';
            el.style.transform = 'translateY(0) scale(1)';
            el.style.boxShadow = 'none';
          }}
        >
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(172,3,59,0.08)', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l2.5 2.5L10 3.5" stroke={CR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(10px,0.9vw,13px)', fontWeight: 700, color: '#111', marginBottom: 4, lineHeight: 1.2 }}>{cert.name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(0,0,0,0.35)', letterSpacing: '0.08em', lineHeight: 1.4 }}>{cert.desc}</div>
        </div>
      ))}
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function QualityAssurancePage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111', overflowX: 'hidden' }}>

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <QualityHero />

      {/* ══ VELOCITY MARQUEE ════════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ QA LAB BLUEPRINT ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,64px)', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(24px,3vw,40px)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 12 }}>QA Flow</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: '0 0 12px', lineHeight: 1.05 }}>
              Lot Receipt to<br /><em style={{ color: CR }}>Customer Delivery.</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(12px,1vw,14px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto' }}>
              Six quality gates. No material moves forward unless it passes every checkpoint — inspected by our team and independent NABL labs.
            </p>
          </div>
          <QALabBlueprint />
        </div>
      </section>

      {/* ══ QA TIMELINE ═════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,64px)', background: '#F8F6F1' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(28px,3.5vw,48px)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CR, marginBottom: 10 }}>6-Stage Gate</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3.5vw,48px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1 }}>
              Our QA <em style={{ color: CR }}>Process.</em>
            </h2>
          </div>
          <QATimeline />
        </div>
      </section>

      {/* ══ TEST PARAMETERS — INTERACTIVE TAB ═══════════════════ */}
      <section style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,64px)', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(28px,3.5vw,48px)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CR, marginBottom: 10 }}>200+ Parameters</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3.5vw,48px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: 0 }}>
              What We <em style={{ color: CR, fontStyle: 'italic' }}>Test.</em>
            </h2>
          </div>
          <TestPanel />
        </div>
      </section>

      {/* ══ CERTIFICATIONS — STAMP BADGES ═══════════════════════ */}
      <section style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,64px)', background: '#F8F6F1' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(28px,3.5vw,48px)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CR, marginBottom: 10 }}>Accreditations</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3.5vw,48px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: 0 }}>
              Certifications & <em style={{ color: CR, fontStyle: 'italic' }}>Compliance.</em>
            </h2>
          </div>
          <CertBadges />
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,110px) clamp(20px,5vw,64px)', background: CR, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(80px,18vw,280px)', fontWeight: 900, color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>QUALITY</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>Request Documents</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,5vw,72px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
            Need Our COA<br />or Lab Reports?
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1.2vw,16px)', color: 'rgba(255,255,255,0.75)', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.75 }}>
            We share product-specific COA, third-party lab reports, and NABL accreditation scope documents within 24 hours.
          </p>
          <a
            href="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', color: CR, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, padding: '16px 36px', borderRadius: 999, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.25)'; }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)'; }}
          >
            Request Documents →
          </a>
        </div>
      </section>

    </main>
  );
}
