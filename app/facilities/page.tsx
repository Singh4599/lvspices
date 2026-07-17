'use client';

import { useState } from 'react';
import Image from 'next/image';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

/* ── Facilities Data ──────────────────────────────────────── */
const facilities = [
  {
    id: 'processing',
    title: 'Processing Units',
    content: 'LV Spices operates 7+ state-of-the-art processing units spanning over 1,00,000 sq. ft. of built-up area. Our facilities are equipped with automated cleaning lines, gravity separators, and destoners to ensure 99.9% physical purity. The core of our processing relies on proprietary Cryogenic Grinding technology operating at -150°C, which prevents the volatilisation of essential oils, ensuring maximum flavour, aroma, and colour retention.',
    image: '/images/products.png',
  },
  {
    id: 'sterilization',
    title: 'Steam Sterilization',
    content: 'We house a fully automated, continuous steam sterilization facility designed to meet stringent global food safety standards. The process uses high-temperature, short-time (HTST) steam treatment followed by rapid vacuum cooling. This ensures a validated 5-log microbial reduction (including Salmonella and E. coli) without compromising the spice\'s organoleptic properties or volatile oil content.',
    image: '/images/farm-editorial.png',
  },
  {
    id: 'analytical',
    title: 'Analytical & Instrument Lab',
    content: 'Our NABL-accredited (ISO/IEC 17025:2017) in-house analytical laboratory is equipped with world-class instrumentation. We utilise LC-MS/MS and GC-MS/MS for comprehensive pesticide residue analysis covering 500+ compounds. Additionally, HPLC systems are used for quantifying curcuminoids, piperine, and capsaicin (SHU), while ICP-MS ensures strict compliance with heavy metal limits.',
    image: '/images/lab.png',
  },
  {
    id: 'micro',
    title: 'Microbiology Lab',
    content: 'Separate from our main analytical wing, the Microbiology Lab is a sterile environment dedicated to pathogen detection. Every lot undergoes rigorous testing for Total Plate Count (TPC), Yeast & Mould, Coliforms, E. coli, and Salmonella. Our rapid-testing protocols and strict environmental monitoring guarantee the microbiological safety of all outgoing shipments.',
    image: '/images/lab.png',
  },
  {
    id: 'rnd',
    title: 'Research & Development',
    content: 'Our R&D centre is the innovation hub of LV Spices. Manned by food technologists and flavour scientists, it focuses on new product development, custom blend formulation for global FMCG brands, and shelf-life enhancement studies. The facility includes a dedicated sensory evaluation panel to ensure consistency in taste, aroma, and mouthfeel across all our product lines.',
    image: '/images/lab.png',
  },
  {
    id: 'packaging',
    title: 'Private Labelling & Packaging',
    content: 'We offer end-to-end private labelling solutions backed by a robust packaging infrastructure. Our temperature and humidity-controlled packing units feature automated multi-head weighers, form-fill-seal (FFS) machines, and nitrogen flushing capabilities. Every line is integrated with inline metal detectors and check-weighers to ensure 100% compliance with international retail standards.',
    image: '/images/products.png',
  },
];

/* ── Accordion Item ───────────────────────────────────────── */
function FacilityAccordion({ 
  title, 
  content, 
  image, 
  isOpen, 
  onToggle 
}: { 
  title: string; 
  content: string; 
  image: string; 
  isOpen: boolean; 
  onToggle: () => void 
}) {
  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 0',
          background: 'none',
          border: 'none', cursor: 'pointer',
          textAlign: 'left',
          transition: 'all 0.3s',
        }}
        onMouseEnter={e => { const el = e.currentTarget.querySelector('span'); if(el) el.style.color = CRIMSON; }}
        onMouseLeave={e => { const el = e.currentTarget.querySelector('span'); if(el) el.style.color = isOpen ? CRIMSON : '#fff'; }}
      >
        <span style={{ 
          fontFamily: SANS, fontSize: 'clamp(16px,2vw,20px)', fontWeight: 600, 
          color: isOpen ? CRIMSON : '#fff', transition: 'color 0.3s' 
        }}>
          {title}
        </span>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
          border: `1px solid ${isOpen ? CRIMSON : 'rgba(255,255,255,0.2)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? CRIMSON : "rgba(255,255,255,0.6)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      <div style={{ 
        maxHeight: isOpen ? '1000px' : '0px', 
        opacity: isOpen ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{ paddingBottom: 32, display: 'flex', gap: 'clamp(24px,4vw,40px)', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,15.5px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, margin: 0 }}>
              {content}
            </p>
          </div>
          <div style={{ flex: '0 0 clamp(200px,30vw,360px)', height: 200, position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
            <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(172,3,59,0.15), transparent)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

export default function FacilitiesPage() {
  const [openItem, setOpenItem] = useState<string | null>('processing');

  const toggle = (id: string) => {
    setOpenItem(prev => prev === id ? null : id);
  };

  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: 'clamp(300px,40vw,500px)', overflow: 'hidden' }}>
        <Image
          src="/images/farm.png"
          alt="LV Spices Facilities"
          fill
          style={{ objectFit: 'cover', opacity: 0.6 }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.3) 100%)' }} />
        
        <div style={{ position: 'absolute', bottom: 'clamp(40px,6vw,80px)', left: 0, right: 0, textAlign: 'center', padding: '0 24px' }}>
           <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(172,3,59,0.12)', border: '1px solid rgba(172,3,59,0.35)',
              borderRadius: 999, padding: '6px 18px', marginBottom: 20,
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: CRIMSON, display: 'inline-block' }} />
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON }}>Infrastructure</span>
            </div>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>
            World-Class Facilities
          </h1>
        </div>
      </section>

      {/* ══ FACILITIES ACCORDION ══════════════════════════════ */}
      <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {facilities.map((fac) => (
              <FacilityAccordion
                key={fac.id}
                title={fac.title}
                content={fac.content}
                image={fac.image}
                isOpen={openItem === fac.id}
                onToggle={() => toggle(fac.id)}
              />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
