'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

/* ── Process Flow Steps ────────────────────────────────────── */
const processSteps = [
  {
    num: '01',
    title: 'Raw Material Procurement',
    desc: 'Spices are sourced directly from the finest farms across India — Rajasthan, Madhya Pradesh, Gujarat, and Kerala — ensuring full farm-to-shelf traceability.',
    img: '/images/farm.png',
  },
  {
    num: '02',
    title: '360° Inspection & Testing',
    desc: 'Every incoming lot undergoes 360° physical and chemical inspection in our NABL-accredited in-house laboratory before entering production.',
    img: '/images/lab.png',
  },
  {
    num: '03',
    title: 'Automated Cleaning & Sorting',
    desc: 'State-of-the-art automated cleaning and multi-stage optical sorting systems remove damaged material, foreign contaminants, and sub-standard spices.',
    img: '/images/factory.png',
  },
  {
    num: '04',
    title: 'Cryogenic / Precision Grinding',
    desc: 'Proprietary cryogenic grinding at -150°C locks in volatile essential oils, natural colour, and aroma — dramatically outperforming conventional ambient grinding.',
    img: '/images/cryo-dark.png',
  },
  {
    num: '05',
    title: 'Steam Sterilization (CFG)',
    desc: 'Our patented Continuous Flow Grinding (CFG) + steam sterilization process achieves 5-log microbial reduction, meeting FDA, EU, and FSSAI standards.',
    img: '/images/cfg-bg.png',
  },
  {
    num: '06',
    title: 'Quality Testing & Certification',
    desc: 'Post-process QC tests cover 200+ parameters: moisture, colour, particle size, microbiology, pesticide residue, heavy metals, and mycotoxin levels.',
    img: '/images/lab.png',
  },
  {
    num: '07',
    title: 'Hygienic Packaging',
    desc: 'Automated filling lines handle everything from 50g retail pouches to 25kg bulk bags in nitrogen-flushed, food-grade packaging — preserving shelf life up to 24 months.',
    img: '/images/products.png',
  },
  {
    num: '08',
    title: 'Cold Storage & Dispatch',
    desc: 'Finished goods move into temperature-controlled cold storage, then dispatched via our global logistics network to 40+ countries with full export documentation.',
    img: '/images/farm-editorial.png',
  },
];

/* ── Infrastructure Grid ──────────────────────────────────── */
const infraItems = [
  {
    title: 'High Production Capacity',
    desc: 'Our manufacturing plant spans 2 lakh sq. ft. with a daily throughput exceeding 200 metric tonnes across all product categories.',
    img: '/images/factory.png',
  },
  {
    title: 'Individual Grinding Lines',
    desc: '10+ independent grinding lines that eliminate cross-contamination and maintain complete flavour integrity of each spice variety.',
    img: '/images/cryo-dark.png',
  },
  {
    title: 'Cryogenic Grinding Plant',
    desc: 'Our proprietary -150°C cryogenic system preserves 40% more essential oils than conventional grinding — unmatched in the industry.',
    img: '/images/cryogenic-bg.png',
  },
  {
    title: 'Blender',
    desc: 'Industrial ribbon blenders and fluidised bed mixers ensure a perfectly uniform blend across every batch for consistent flavour delivery.',
    img: '/images/factory.png',
  },
  {
    title: 'Hopper',
    desc: 'Large capacity hoppers with advanced flow-control guarantee a smooth, uninterrupted feed to downstream processing equipment.',
    img: '/images/farm.png',
  },
  {
    title: 'Nitrogen Scavenger',
    desc: 'Nitrogen scavenging in our packaging lines displaces oxygen, extending shelf life and preventing oxidative rancidity in sensitive products.',
    img: '/images/products.png',
  },
  {
    title: 'Dust Collector',
    desc: 'High-efficiency dust collection systems maintain a clean, safe working environment and eliminate product loss during milling operations.',
    img: '/images/factory.png',
  },
  {
    title: 'Cold Grinding',
    desc: 'Cold grinding technology used for heat-sensitive botanicals and herbs that cannot withstand the temperature rise of ambient milling.',
    img: '/images/cryo-dark.png',
  },
  {
    title: 'Vacuum Grinding',
    desc: 'Vacuum grinding lines are used to prevent oxidation and preserve the natural colour and bioactive compounds in premium spices.',
    img: '/images/lab.png',
  },
  {
    title: 'Roasting',
    desc: 'Our controlled-atmosphere roasting equipment delivers precise flavour development — from light toast to deep roast — without scorching.',
    img: '/images/farm-editorial.png',
  },
  {
    title: 'Low Friction Grinding',
    desc: 'Low friction pin mills are deployed for ultra-fine powdering of spices where particle size uniformity and heat sensitivity are critical.',
    img: '/images/cfg-bg.png',
  },
  {
    title: 'Blending',
    desc: 'Our blending machines are calibrated to mix specific quantities and quickly produce consistent flavour-locked spice blends at scale.',
    img: '/images/products.png',
  },
];

/* ── GMP Accordion Items ──────────────────────────────────── */
const gmpItems = [
  {
    title: 'Hygiene and Cleanliness',
    desc: 'To avoid contamination and ensure product safety, it is essential to maintain a clean and hygienic workspace. This also ensures hygienic food production and fosters the exposure and responsibility of employees and suppliers.',
  },
  {
    title: 'Quality Control',
    desc: 'Strong GMP is a quality management system. It ensures quality at each process, including sourcing, manufacturing, packaging, processing, and distribution. The institution must follow a series of checks and balances, use automated systems, and ensure there is always a quality control team.',
  },
  {
    title: 'Training and Competence',
    desc: 'To carry out their tasks, staff requires the commitment/environment for reliable, qualified, and efficient competency. It facilitates the following responsibilities of every employee and assists them in improving their skills.',
  },
  {
    title: 'Facility and Equipment Maintenance',
    desc: 'To establish the desired quality in the production of a certified product, it is essential to regularly inspect and maintain all machinery, tools. Good GMP also requires that only authorised personnel perform maintenance procedures.',
  },
  {
    title: 'Managed Production Practices',
    desc: 'Good manufacturing practices (GMP) by an organisation or company are established based on a series of guidelines, industry standards and regulations. They must involve all production activities — planning, sourcing, manufacturing, quality assurance and customer service.',
  },
  {
    title: 'Documentation and Record-Keeping',
    desc: 'Data compliance is another GMP requirement. It includes maintaining files for laboratory testing, conducting regular internal audits, and documenting all production, quality control and distribution records.',
  },
];

/* ── Hero Banner ──────────────────────────────────────────── */
function HeroBanner() {
  return (
    <section style={{ position: 'relative', height: 'clamp(320px,45vw,560px)', overflow: 'hidden', background: '#0a0a0a' }}>
      <Image
        src="/images/factory.png"
        alt="LV Spices Manufacturing Facility"
        fill
        style={{ objectFit: 'cover', opacity: 0.45 }}
        priority
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.2) 100%)',
        display: 'flex', alignItems: 'flex-end',
        padding: 'clamp(24px,5vw,80px)',
      }}>
        <div style={{ maxWidth: 680 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(172,3,59,0.15)', border: '1px solid rgba(172,3,59,0.4)',
            borderRadius: 999, padding: '6px 16px', marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: CRIMSON, display: 'inline-block' }} />
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON }}>How We Operate</span>
          </div>
          <h1 style={{
            fontFamily: SERIF,
            fontSize: 'clamp(28px,5vw,72px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
          }}>
            LV Spices Infrastructure
          </h1>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 540 }}>
            Hathi Spices is one of the leading producers of Spices in Himmatnagar offering Branded as well as B2B supply to qualified producers with premium standards for infrastructure. Hathi Spices always brings the best of the most 5 years of experience in the Food processing Industry like storage, cleaning and processing conditions and focusses towards products that maximize our profitability and secure success.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Process Steps (Zigzag like Hathi) ───────────────────── */
function ProcessZigzag() {
  return (
    <section style={{ padding: 'clamp(40px,6vw,96px) clamp(20px,5vw,80px)', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ position: 'relative' }}>
        {/* Vertical center line */}
        <div style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0,
          width: 1, background: 'rgba(172,3,59,0.25)',
          transform: 'translateX(-50%)',
        }} />

        {processSteps.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div key={step.num} style={{
              display: 'flex',
              justifyContent: isLeft ? 'flex-start' : 'flex-end',
              marginBottom: 'clamp(32px,5vw,64px)',
              position: 'relative',
            }}>
              {/* Connector dot */}
              <div style={{
                position: 'absolute', left: '50%', top: '50%',
                width: 14, height: 14,
                borderRadius: '50%',
                background: CRIMSON,
                border: '3px solid #000',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
              }} />

              <div style={{
                width: '46%',
                display: 'flex',
                flexDirection: isLeft ? 'row' : 'row-reverse',
                gap: 20,
                alignItems: 'center',
              }}>
                {/* Image */}
                <div style={{
                  width: 'clamp(120px,15vw,180px)',
                  height: 'clamp(90px,11vw,135px)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <Image src={step.img} alt={step.title} width={180} height={135} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* Text */}
                <div style={{ textAlign: isLeft ? 'right' : 'left' }}>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: CRIMSON, marginBottom: 6 }}>STEP {step.num}</div>
                  <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(15px,1.5vw,20px)', fontWeight: 700, color: '#fff', margin: '0 0 8px', lineHeight: 1.2 }}>{step.title}</h3>
                  <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Headline Banner ───────────────────────────────────────── */
function HeadlineBanner() {
  return (
    <section style={{ padding: 'clamp(40px,5vw,72px) clamp(20px,5vw,80px)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
        <h2 style={{
          fontFamily: SERIF,
          fontSize: 'clamp(24px,3.5vw,52px)',
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          flex: '1 1 400px',
          margin: 0,
        }}>
          We are leading the Spice Industry with<br />
          <span style={{ color: CRIMSON }}>State-of-the-Art</span> Infrastructure<br />
          and Top-Class Facilities
        </h2>
        <div style={{ flex: '0 0 auto', height: 2, width: 'clamp(60px,15vw,200px)', background: `linear-gradient(to right, ${CRIMSON}, transparent)` }} />
      </div>
    </section>
  );
}

/* ── Infrastructure Grid ──────────────────────────────────── */
function InfraGrid() {
  return (
    <section style={{ padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px,28vw,340px), 1fr))', gap: 'clamp(20px,2.5vw,32px)' }}>
          {infraItems.map((item) => (
            <div key={item.title} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16,
              overflow: 'hidden',
              transition: 'border-color 0.3s',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(172,3,59,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
            >
              <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover', opacity: 0.75 }} />
              </div>
              <div style={{ padding: '20px 20px 24px' }}>
                <h3 style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{item.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 12.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── GMP Accordion ────────────────────────────────────────── */
function GMPSection() {
  return (
    <section style={{ padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,80px)', background: 'rgba(255,255,255,0.015)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 'clamp(32px,5vw,80px)', flexWrap: 'wrap' }}>
          {/* Left — label */}
          <div style={{ flex: '0 0 clamp(200px,25vw,320px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 16 }}>Standards</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3vw,48px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
              Good Manufacturing<br />Practices (GMP)
            </h2>
          </div>
          {/* Right — items */}
          <div style={{ flex: 1, minWidth: 280 }}>
            {gmpItems.map((item, i) => (
              <details key={item.title} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 0 }}>
                <summary style={{
                  fontFamily: SANS,
                  fontSize: 'clamp(13px,1.1vw,15px)',
                  fontWeight: 600,
                  color: '#fff',
                  padding: '20px 0',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  listStyle: 'none',
                }}>
                  <span>{item.title}</span>
                  <span style={{ color: CRIMSON, fontSize: 20, fontWeight: 300, flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, paddingBottom: 20, margin: 0 }}>{item.desc}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function HowWeOperatePage() {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>
      <HeroBanner />
      <ProcessZigzag />
      <HeadlineBanner />
      <InfraGrid />
      <GMPSection />
    </main>
  );
}
