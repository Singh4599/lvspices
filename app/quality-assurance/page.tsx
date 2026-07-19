'use client';

import Image from 'next/image';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

/* ── QA Parameters ────────────────────────────────────────── */
const qaTests = [
  { category: 'Physical Parameters', tests: ['Moisture Content', 'Bulk Density', 'Particle Size Distribution', 'Mesh Analysis', 'Foreign Matter', 'Volatile Oil Content', 'Extraneous Matter'] },
  { category: 'Chemical Parameters', tests: ['Total Ash', 'Acid Insoluble Ash', 'Crude Fibre', 'Total Fat', 'Protein Content', 'Carbohydrates', 'pH Value', 'Heavy Metals (Pb, Cd, As, Hg)'] },
  { category: 'Colour & Sensory', tests: ['ASTA Colour Units', 'SHU (Capsaicin)', 'Curcumin Content', 'Essential Oil (GC Analysis)', 'Organoleptic Evaluation', 'Colour Stability Test'] },
  { category: 'Microbiological', tests: ['Total Plate Count (TPC)', 'Yeast & Mould', 'E. coli', 'Salmonella', 'Staphylococcus aureus', 'Aerobic Mesophilic Count', 'Enterobacteriaceae'] },
  { category: 'Contaminants', tests: ['Pesticide Residue (200+ molecules)', 'Mycotoxins (Aflatoxin B1,G1,B2,G2)', 'Ochratoxin A', 'Sudan Dyes', 'Allergens (14 major)', 'PAH Compounds'] },
  { category: 'Packaging & Label', tests: ['Net Weight Verification', 'Sealing Strength', 'Pack Integrity Test', 'Label Accuracy Check', 'Barcode Scan Verification', 'Shelf Life Validation'] },
];

/* ── Certifications ───────────────────────────────────────── */
const certifications = [
  { name: 'FSSAI', desc: 'Food Safety & Standards Authority of India' },
  { name: 'ISO 9001:2015', desc: 'Quality Management System' },
  { name: 'ISO 22000:2018', desc: 'Food Safety Management System' },
  { name: 'FSSC 22000', desc: 'Food Safety System Certification' },
  { name: 'HACCP', desc: 'Hazard Analysis Critical Control Points' },
  { name: 'NABL', desc: 'National Accreditation Board for Laboratories' },
  { name: 'USFDA', desc: 'US Food & Drug Administration Compliant' },
  { name: 'EU Compliant', desc: 'European Food Safety Standards' },
  { name: 'Spices Board', desc: 'Spices Board of India Certified' },
  { name: 'APEDA', desc: 'Agricultural & Processed Food Export' },
  { name: 'BRC', desc: 'British Retail Consortium Global Standard' },
  { name: 'Kosher', desc: 'Certified Kosher by Authorised Agency' },
];

/* ── QA Process ───────────────────────────────────────────── */
const qaProcess = [
  { num: '01', title: 'Raw Material Sampling', desc: 'Each incoming lot is sampled using AOAC/ISO standard sampling protocols. Representative samples are drawn at multiple points of the consignment.' },
  { num: '02', title: 'In-house Pre-screening', desc: 'Physical parameters (moisture, extraneous matter, colour) are checked at our in-house QC lab within 2 hours of receipt before unloading is permitted.' },
  { num: '03', title: 'Third-party Lab Analysis', desc: 'Pesticide residue, mycotoxin, heavy metals, and microbiological tests are sent to our 3 NABL-accredited third-party labs every lot.' },
  { num: '04', title: 'QC Hold & Release System', desc: 'No material enters production until a COA (Certificate of Analysis) is approved by our Head of QA. SAP-integrated hold/release system prevents bypasses.' },
  { num: '05', title: 'In-process Monitoring', desc: 'Online sensors monitor temperature, moisture, and particle size in real time during milling. Reject alarms are triggered automatically for out-of-spec parameters.' },
  { num: '06', title: 'Finished Goods Testing', desc: 'Pre-shipment samples are tested against the customer\'s specification sheet. A CoA is generated and shared before dispatch.' },
];

/* ─────────────────────────────────────────────────────────── */

export default function QualityAssurancePage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px) 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(172,3,59,0.12)', border: '1px solid rgba(172,3,59,0.35)',
            borderRadius: 999, padding: '6px 18px', marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: CRIMSON, display: 'inline-block' }} />
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON }}>Our Standards</span>
          </div>
          <h1 style={{
            fontFamily: SERIF, fontSize: 'clamp(36px,6vw,88px)', fontWeight: 700,
            color: '#111', lineHeight: 1.0, letterSpacing: '-0.03em', margin: '0 0 24px',
          }}>
            Quality Assurance
          </h1>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.75, margin: 0 }}>
            A team of 30+ enthusiastic professionals working round the clock to monitor quality testing, analysis and research along with new product development and delivery of reliable finished products to our customers.
          </p>
        </div>
      </section>

      {/* ══ OVERVIEW IMAGE ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          {/* Pill-shaped image container */}
          <div style={{
            borderRadius: 'clamp(32px,5vw,80px)',
            overflow: 'hidden',
            position: 'relative',
            height: 'clamp(280px,40vw,520px)',
          }}>
            <Image src="/images/lab.png" alt="LV Spices Quality Lab" fill style={{ objectFit: 'cover', opacity: 0.75 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)' }} />

            {/* Badge overlay */}
            <div style={{
              position: 'absolute', left: 'clamp(24px,4vw,60px)', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(172,3,59,0.3)',
              borderRadius: 20, padding: '20px 28px',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <span style={{ fontSize: 40 }}>🔬</span>
              <div>
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: '#111', lineHeight: 1 }}>30+</div>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', marginTop: 6 }}>Enthusiastic<br />Professionals</div>
              </div>
            </div>
          </div>

          {/* Supporting text */}
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.85, textAlign: 'center', maxWidth: 780, margin: '40px auto 0' }}>
            Each member of the team is equipped with the necessary qualifications and experience based on their position, ensuring maximum efficiency and the best possible outcomes on the shop floor. The expertise of appropriate internal and external training are conducted from time to time, helping the team to equip themselves with current trends and knowledge and available information in the field. We in the Quality Assurance department believe in understanding the product and processes thoroughly so that any non-conformances identified are taken care of before the product release itself. This ensures minimum quality complaints and maximum quality standards for all our customers.
          </p>
        </div>
      </section>

      {/* ══ ABOUT THE LAB ══════════════════════════════════════ */}
      <section style={{ padding: '0 clamp(24px,5vw,80px) clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 'clamp(40px,5vw,80px)', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Image */}
            <div style={{ flex: '0 0 clamp(260px,38vw,440px)', borderRadius: 20, overflow: 'hidden', position: 'relative', height: 'clamp(240px,28vw,340px)' }}>
              <Image src="/images/lab.png" alt="QA Lab" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
            </div>
            {/* Text */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 16 }}>Lab Accreditation</div>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,3.5vw,48px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 20px', lineHeight: 1.1 }}>About The Lab</h2>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.85, marginBottom: 20 }}>
                The lab is accredited for ISO 17025:2017 by NABL and we are accredited for most of the test parameters that are essential for the spice industry. Our tests for heavy metals, mycotoxins, pesticide residues and allergens are included in the scope of accreditation. Being equipped with various instruments to carry out analysis with utmost precision and calibrated from third party accredited labs on an annual frequency.
              </p>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.85 }}>
                The QC Team alone is responsible for running three labs viz. the Raw material Analytical Lab, Microbiological lab and the Instrumentation Lab. The labs are responsible for monitoring 200+ quality parameters and issuing Certificates of Analysis per various globally acknowledged standards, providing a certificate of analysis for every individual product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ROW ══════════════════════════════════════════ */}
      <section style={{ padding: '0 clamp(24px,5vw,80px) clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(0,0,0,0.4)', textAlign: 'center', margin: '0 0 36px' }}>
            The three labs &amp; qualified team at LV Spices
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 20 }}>
            {[
              { val: '200+', label: 'Analytical Tests', icon: '🧪' },
              { val: '15', label: 'Microbiological Tests', icon: '🦠' },
              { val: '9', label: 'Instrumentation Tests', icon: '⚙️' },
              { val: '30+', label: 'Qualified Team Members', icon: '👩‍🔬' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 16, padding: '28px 20px',
                textAlign: 'center',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(172,3,59,0.4)'; el.style.background = 'rgba(172,3,59,0.05)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(0,0,0,0.07)'; el.style.background = 'rgba(0,0,0,0.03)'; }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, color: '#111', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 10, lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: SANS, fontSize: 12.5, color: 'rgba(0,0,0,0.3)', textAlign: 'center', marginTop: 20 }}>
            The lab is performing pesticide residues and OTA/ZON analysis in-house with great precision and accuracy.
          </p>
        </div>
      </section>

      {/* ══ QA PROCESS ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>Our QA Flow</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 48px' }}>
            From Lot Receipt to Customer Delivery
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {qaProcess.map((step, i) => (
              <div key={step.num} style={{ display: 'flex', gap: 20, paddingBottom: i < qaProcess.length - 1 ? 32 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${CRIMSON}, #6B0025)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: MONO, fontSize: 12, fontWeight: 700, color: '#111',
                    boxShadow: '0 4px 16px rgba(172,3,59,0.3)',
                    flexShrink: 0,
                  }}>{step.num}</div>
                  {i < qaProcess.length - 1 && <div style={{ width: 1, flex: 1, background: 'rgba(172,3,59,0.18)', marginTop: 8 }} />}
                </div>
                <div style={{ paddingTop: 10 }}>
                  <h3 style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: '#111', margin: '0 0 8px' }}>{step.title}</h3>
                  <p style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TEST PARAMETERS ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>200+ Parameters</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 40px' }}>
            What We Test
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px,28vw,340px), 1fr))', gap: 20 }}>
            {qaTests.map(cat => (
              <div key={cat.category} style={{
                background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 16, padding: '24px 24px 28px',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(172,3,59,0.4)'; el.style.background = 'rgba(172,3,59,0.04)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(0,0,0,0.07)'; el.style.background = 'rgba(0,0,0,0.03)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: CRIMSON, flexShrink: 0 }} />
                  <h3 style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#111', margin: 0 }}>{cat.category}</h3>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {cat.tests.map(t => (
                    <li key={t} style={{ fontFamily: SANS, fontSize: 12.5, color: 'rgba(255,255,255,0.42)', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ color: CRIMSON, flexShrink: 0, marginTop: 2 }}>›</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CERTIFICATIONS ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>Accreditations</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 40px' }}>
            Certifications &amp; Compliance
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(140px,14vw,190px), 1fr))', gap: 14 }}>
            {certifications.map(cert => (
              <div key={cert.name} style={{
                background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 14, padding: '20px 16px', textAlign: 'center',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(172,3,59,0.4)'; el.style.background = 'rgba(172,3,59,0.06)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(0,0,0,0.07)'; el.style.background = 'rgba(0,0,0,0.03)'; }}
              >
                <div style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 6 }}>{cert.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(0,0,0,0.4)', lineHeight: 1.5 }}>{cert.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
