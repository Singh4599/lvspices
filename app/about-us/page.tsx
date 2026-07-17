'use client';

import { useState } from 'react';
import Image from 'next/image';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

/* ── Vision / Mission / Values ────────────────────────────── */
const vmv = [
  {
    label: 'Vision',
    icon: '🔭',
    content: 'To be the most trusted name in Indian spice exports — building a world where premium quality, food safety, and sustainable sourcing are inseparable. We envision LV Spices as the first choice for global food manufacturers, private label brands, and retail giants seeking a reliable, certified Indian spice partner.',
  },
  {
    label: 'Mission',
    icon: '🎯',
    content: [
      'Deliver consistently high-quality spices through rigorous in-house quality control and third-party lab verification.',
      'Champion sustainable farming by working directly with farmers and promoting Good Agricultural Practices.',
      'Invest in state-of-the-art processing technology — from cryogenic grinding to steam sterilization — to set new standards for Indian spice processing.',
      'Build long-term, trust-based relationships with every customer, supplier, and stakeholder.',
    ],
  },
  {
    label: 'Values',
    icon: '🌿',
    content: [
      'Integrity — We are transparent in every transaction, from farm procurement to final shipment.',
      'Excellence — Mediocrity is not in our vocabulary. Every batch, every shipment is held to the highest standard.',
      'Innovation — We never stop improving — our processes, our products, and our people.',
      'Sustainability — We believe business growth and environmental responsibility go hand-in-hand.',
      'Partnership — Our farmers, our customers, and our team are not vendors — they are partners in a shared vision.',
    ],
  },
];

/* ── Why Us ───────────────────────────────────────────────── */
const whyUs = [
  { icon: '🌿', title: 'Sustainable Sourcing', desc: 'Direct farm partnerships across major spice-growing belts of India.' },
  { icon: '🔬', title: 'In-house NABL Lab', desc: '200+ quality parameters tested per lot — pesticides, mycotoxins, allergens.' },
  { icon: '🌍', title: 'Global Presence', desc: 'Exporting to 40+ countries across 6 continents.' },
  { icon: '⚙️', title: 'Advanced Technology', desc: 'Cryogenic grinding, steam sterilization, automated CFG lines.' },
  { icon: '🏆', title: 'Certified Excellence', desc: 'FSSAI, ISO 22000, FSSC 22000, HACCP, NABL, BRC Tier 2.' },
  { icon: '📦', title: 'Farm-to-Fork Traceability', desc: 'Every lot traced from field to final pack with full documentation.' },
  { icon: '🎨', title: 'Private Label Expertise', desc: 'In-house design, packing, and compliance — your brand, our expertise.' },
  { icon: '💨', title: 'Steam Sterilization', desc: '5-log microbial reduction in EuroFins-validated continuous sterilization lines.' },
];

/* ── Timeline ─────────────────────────────────────────────── */
const timeline = [
  {
    year: '1975',
    title: 'Founded',
    desc: 'LV Spices is established with a single vision — to bring the finest Indian spices to the world with uncompromising quality.',
    color: CRIMSON,
  },
  {
    year: '1985',
    title: 'First Export',
    desc: 'First international export shipment dispatched. This milestone marked the beginning of LV Spices\' global journey.',
    color: '#7C3AED',
  },
  {
    year: '1995',
    title: 'Infrastructure Expansion',
    desc: 'A purpose-built processing unit is established. Buhler seed cleaning and sorting machines are installed — making LV Spices one of the first mechanised Indian spice processors.',
    color: '#0EA5E9',
  },
  {
    year: '2005',
    title: 'Technology Leap',
    desc: 'New milling lines installed. HACCP certification achieved. The in-house QC lab is set up with advanced instrumentation.',
    color: '#10B981',
  },
  {
    year: '2012',
    title: 'Steam Sterilization',
    desc: 'State-of-the-art steam sterilization facility inaugurated — one of the first in India to achieve a 5-log microbial reduction validated by EuroFins.',
    color: '#F59E0B',
  },
  {
    year: '2017',
    title: 'Private Label Division',
    desc: 'Dedicated private label packaging unit launched, complete with in-house design, packing lines, and regulatory compliance support.',
    color: '#EC4899',
  },
  {
    year: '2020',
    title: 'NABL Accreditation',
    desc: 'In-house lab achieves NABL ISO 17025:2017 accreditation for pesticide residues, mycotoxins, heavy metals, and allergen testing.',
    color: '#8B5CF6',
  },
  {
    year: '2025',
    title: '50 Years of Excellence',
    desc: 'Celebrating five decades of quality, trust, and innovation. LV Spices now exports to 40+ countries with 100,000+ sq. ft. processing capacity and 80,000+ mts annual output.',
    color: CRIMSON,
  },
];

/* ─────────────────────────────────────────────────────────── */

export default function AboutUsPage() {
  const [activeVMV, setActiveVMV] = useState(0);

  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', overflow: 'hidden' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px) 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 'clamp(40px,6vw,100px)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Left — Image collage */}
          <div style={{ flex: '0 0 clamp(260px,38vw,440px)', position: 'relative' }}>
            {/* Main image */}
            <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', height: 'clamp(300px,40vw,480px)' }}>
              <Image src="/images/farm.png" alt="LV Spices — 50 Years" fill style={{ objectFit: 'cover', opacity: 0.85 }} priority />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(172,3,59,0.2), transparent)' }} />
            </div>
            {/* 50 year badge */}
            <div style={{
              position: 'absolute', top: 20, right: -20,
              background: `linear-gradient(135deg, ${CRIMSON}, #6B0025)`,
              borderRadius: '50%', width: 100, height: 100,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(172,3,59,0.5)',
              border: '2px solid rgba(255,255,255,0.15)',
            }}>
              <div style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 700, color: '#fff', lineHeight: 1 }}>50</div>
              <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginTop: 3 }}>Years</div>
            </div>
            {/* Small stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
              {[
                { val: '40+', label: 'Countries' },
                { val: '80,000+', label: 'Mts/Yr' },
                { val: '500+', label: 'Products' },
                { val: '1975', label: 'Est.' },
              ].map(s => (
                <div key={s.label} style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12, padding: '14px 16px', textAlign: 'center',
                }}>
                  <div style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: 5 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Text */}
          <div style={{ flex: 1, minWidth: 260, paddingTop: 'clamp(16px,2vw,40px)' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(172,3,59,0.12)', border: '1px solid rgba(172,3,59,0.35)',
              borderRadius: 999, padding: '6px 18px', marginBottom: 24,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: CRIMSON, display: 'inline-block' }} />
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON }}>Since 1975</span>
            </div>

            <h1 style={{
              fontFamily: SERIF, fontSize: 'clamp(32px,5.5vw,80px)', fontWeight: 700,
              color: '#fff', lineHeight: 1.0, letterSpacing: '-0.03em', margin: '0 0 28px',
            }}>
              About<br />LV Spices
            </h1>

            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, marginBottom: 20 }}>
              As a family-owned enterprise, LV Spices has been at the forefront of premium spice processing and exports for over 50 years. Founded in 1975 with a commitment to quality and integrity, we have grown from a single processing unit into one of India's most respected spice exporters.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.85, marginBottom: 20 }}>
              Today, spanning 7+ manufacturing units across 1,00,000 sq. ft. of built-up area, LV Spices serves customers in 40+ countries — from retail spice brands and food manufacturers to private label importers and restaurant chains. With an unwavering commitment to quality and service, each decade has seen us invest in new technology, expand our reach, and deepen our roots in sustainable sourcing.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.4)', lineHeight: 1.85 }}>
              The firm mantra at LV Spices since inception has been consistent adherence to <em style={{ color: CRIMSON, fontStyle: 'normal' }}>Vintage Values, Tomorrow's Technology &amp; Global Presence</em>.
            </p>
          </div>
        </div>
      </section>

      {/* ══ VISION / MISSION / VALUES ═════════════════════════ */}
      <section style={{ marginTop: 80, position: 'relative', overflow: 'hidden' }}>
        {/* Spice BG */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/products.png" alt="" fill style={{ objectFit: 'cover', opacity: 0.08 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.95) 100%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          {/* Tab buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 48, flexWrap: 'wrap' }}>
            {vmv.map((item, i) => (
              <button key={item.label} onClick={() => setActiveVMV(i)} style={{
                fontFamily: SANS, fontSize: 15, fontWeight: 600,
                padding: '12px 32px', borderRadius: 999,
                background: activeVMV === i ? CRIMSON : 'rgba(255,255,255,0.05)',
                border: `1px solid ${activeVMV === i ? CRIMSON : 'rgba(255,255,255,0.12)'}`,
                color: '#fff', cursor: 'pointer', transition: 'all 0.25s',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20, padding: 'clamp(28px,4vw,48px)',
            backdropFilter: 'blur(12px)', textAlign: 'left',
          }}>
            {typeof vmv[activeVMV].content === 'string' ? (
              <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, margin: 0 }}>
                {vmv[activeVMV].content as string}
              </p>
            ) : (
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {(vmv[activeVMV].content as string[]).map((point, i) => (
                  <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(135deg, ${CRIMSON}, #6B0025)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: MONO, fontSize: 10, fontWeight: 700, color: '#fff',
                      marginTop: 1,
                    }}>{i + 1}</span>
                    <span style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* ══ WHY US ════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,60px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 16px' }}>Why Us?</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.4)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              For five decades, we have always strived to outperform ourselves by introducing innovative technology and processes to increase efficiency and outcome.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(200px,22vw,260px), 1fr))', gap: 16 }}>
            {whyUs.map(item => (
              <div key={item.title} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, padding: '24px 20px', textAlign: 'center',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(172,3,59,0.4)'; el.style.background = 'rgba(172,3,59,0.05)'; el.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.background = 'rgba(255,255,255,0.03)'; el.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{item.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 12.5, color: 'rgba(255,255,255,0.38)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OUR JOURNEY TIMELINE ══════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 'clamp(40px,6vw,100px)', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 56 }}>
            <div style={{ flex: '0 0 clamp(200px,28vw,320px)' }}>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,60px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 20px', lineHeight: 1.0 }}>Our Journey</h2>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
                A company that laid its roots in 1975, LV Spices has grown with every generation — modernising the approach, technically and qualitatively, while taking the business beyond ever-widening horizons.
              </p>
            </div>
          </div>

          {/* Timeline list */}
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: 'clamp(16px,2vw,22px)', top: 0, bottom: 0,
              width: 2, background: 'linear-gradient(to bottom, rgba(172,3,59,0.6), rgba(172,3,59,0.05))',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {timeline.map((item, i) => (
                <div key={item.year} style={{ display: 'flex', gap: 'clamp(24px,4vw,52px)', alignItems: 'flex-start', paddingBottom: i < timeline.length - 1 ? 40 : 0 }}>
                  {/* Dot */}
                  <div style={{ flexShrink: 0, position: 'relative', zIndex: 1, marginTop: 4 }}>
                    <div style={{
                      width: 'clamp(32px,4vw,44px)', height: 'clamp(32px,4vw,44px)', borderRadius: '50%',
                      background: item.color === CRIMSON ? `linear-gradient(135deg, ${CRIMSON}, #6B0025)` : `${item.color}22`,
                      border: `2px solid ${item.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 4px 16px ${item.color}40`,
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color === CRIMSON ? '#fff' : item.color }} />
                    </div>
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, paddingTop: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                      <span style={{
                        fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
                        color: item.color, background: `${item.color}15`,
                        border: `1px solid ${item.color}40`,
                        borderRadius: 999, padding: '3px 12px',
                      }}>{item.year}</span>
                      <h3 style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.5vw,17px)', fontWeight: 700, color: '#fff', margin: 0 }}>{item.title}</h3>
                    </div>
                    <p style={{ fontFamily: SANS, fontSize: 'clamp(12.5px,1vw,14px)', color: 'rgba(255,255,255,0.42)', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,56px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 16px' }}>
          50 Years. Still Going Strong.
        </h2>
        <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.4)', margin: '0 0 32px', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
          Partner with us and experience five decades of spice expertise, cutting-edge technology, and a relentless commitment to quality.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/contact" style={{
            display: 'inline-block', fontFamily: SANS, fontSize: 14, fontWeight: 600,
            background: CRIMSON, color: '#fff', padding: '14px 32px', borderRadius: 999,
            textDecoration: 'none', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            Get in Touch →
          </a>
          <a href="/how-we-operate" style={{
            display: 'inline-block', fontFamily: SANS, fontSize: 14, fontWeight: 500,
            border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)',
            padding: '14px 32px', borderRadius: 999, textDecoration: 'none', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(172,3,59,0.5)'; el.style.color = '#fff'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.2)'; el.style.color = 'rgba(255,255,255,0.6)'; }}
          >
            How We Operate
          </a>
        </div>
      </section>

    </main>
  );
}
