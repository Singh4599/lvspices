'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';

const CR    = '#AC033B';
const INK   = '#1A1915';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

interface Cert {
  id: string;
  name: string;
  shortName: string;
  desc: string;
  images: string[];
  category: string;
  validity?: string;
}

const CERTS: Cert[] = [
  {
    id: 'usfda',
    name: 'USFDA Registration',
    shortName: 'USFDA',
    category: 'International',
    desc: 'United States Food and Drug Administration registration. Authorises LV Spices to export food products directly to the United States market in compliance with all FDA food safety regulations.',
    images: ['/certificates/usfda.jpg'],
  },
  {
    id: 'valitit',
    name: 'Valid IT Certification',
    shortName: 'Valid IT',
    category: 'Traceability',
    desc: 'Valid IT digital traceability certification — provides end-to-end product transparency from farm to shelf using blockchain-based supply chain verification.',
    images: ['/certificates/valitit.png'],
  },
  {
    id: 'kosher',
    name: 'Kosher Certification',
    shortName: 'Kosher',
    category: 'Dietary',
    desc: 'Kosher certified by an internationally recognised certifying body. Confirms that all products meet the strict dietary standards required by Jewish law, enabling supply to kosher-observant consumers worldwide.',
    images: ['/certificates/kosher.png'],
  },
  {
    id: 'halal',
    name: 'Halal Certification',
    shortName: 'Halal',
    category: 'Dietary',
    desc: 'Halal certified for Muslim consumer markets across 40+ countries. Covers raw material sourcing, processing, packaging, and handling — certified in line with international Halal food standards.',
    images: ['/certificates/halal.jpg'],
  },
  {
    id: 'fsma',
    name: 'FSMA Compliance',
    shortName: 'FSMA',
    category: 'International',
    desc: 'Food Safety Modernization Act (FSMA) compliance — the landmark US legislation that shifted focus from responding to foodborne illness to preventing it. Required for all exporters supplying the US food market.',
    images: ['/certificates/fsma.webp'],
  },
  {
    id: 'brc',
    name: 'BRC Global Food Safety Standard',
    shortName: 'BRC Grade AA',
    category: 'Food Safety',
    desc: 'BRC (British Retail Consortium) Global Standard for Food Safety — Grade AA, the highest achievable rating. Recognised by the Global Food Safety Initiative (GFSI) and required by most UK, European, and multinational retailers.',
    images: ['/certificates/brc.webp'],
  },
  {
    id: 'opu',
    name: 'Organic Processing Unit',
    shortName: 'Organic Processing Unit',
    category: 'Organic',
    desc: 'Certified Organic Processing Unit under the National Programme for Organic Production (NPOP), India. Authorises the processing, handling, and export of certified organic spices under EU and USDA NOP standards.',
    images: ['/certificates/opu1.webp', '/certificates/opu2.webp', '/certificates/opu3.webp'],
  },
  {
    id: 'taxcerti',
    name: 'Tax Certificate',
    shortName: 'Tax Certificate',
    category: 'Legal',
    desc: 'Statutory tax registration certificate confirming LV Spices is a fully registered, compliant entity under Indian tax law — including GST registration and income tax compliance.',
    images: ['/certificates/taxcerti.png'],
  },
  {
    id: 'iso',
    name: 'ISO 22000:2018',
    shortName: 'ISO 22000:2018',
    category: 'Food Safety',
    desc: 'ISO 22000:2018 — Food Safety Management Systems. International standard specifying requirements for any organisation in the food chain. Demonstrates a systematic approach to food safety hazard control.',
    images: ['/certificates/iso.png'],
  },
  {
    id: 'msme',
    name: 'MSME Udyam Registration',
    shortName: 'MSME Udyam',
    category: 'Legal',
    desc: 'Udyam Registration under the Ministry of Micro, Small & Medium Enterprises, Government of India. Grants eligibility for government export promotion schemes and priority lending.',
    images: ['/certificates/msme.png'],
  },
  {
    id: 'spiceboard',
    name: 'Spices Board of India',
    shortName: 'Spices Board',
    category: 'Export',
    desc: 'Registered exporter with the Spices Board of India, the apex body for development and worldwide promotion of Indian spices. Mandatory for all authorised spice exporters.',
    images: ['/certificates/spiceboard.png'],
  },
  {
    id: 'coffeeboard',
    name: 'Coffee Board Registration',
    shortName: 'Coffee Board',
    category: 'Export',
    desc: 'Registered with the Coffee Board of India for the handling and export of coffee and related products. Demonstrates compliance with coffee export standards and traceability requirements.',
    images: ['/certificates/coffeeboard.jpg'],
  },
  {
    id: 'rcmc',
    name: 'RCMC — Registration-Cum-Membership Certificate',
    shortName: 'RCMC',
    category: 'Export',
    desc: 'Registration-Cum-Membership Certificate (RCMC) issued by the Export Promotion Council. Required to avail export incentives under the Foreign Trade Policy of India.',
    images: ['/certificates/rcmc.png'],
  },
  {
    id: 'apeda',
    name: 'APEDA Registration',
    shortName: 'APEDA',
    category: 'Export',
    desc: 'Agricultural & Processed Food Products Export Development Authority (APEDA) registration. Mandatory for exporters of scheduled products including processed food, fruits, vegetables, and spices.',
    images: ['/certificates/apeda.jpg'],
  },
  {
    id: 'fssai',
    name: 'FSSAI License',
    shortName: 'FSSAI',
    category: 'Food Safety',
    desc: 'Food Safety and Standards Authority of India (FSSAI) license — the primary food safety regulator in India. Covers manufacturing, processing, storage, distribution, and sale of food products across India.',
    images: ['/certificates/fssai.jpg'],
  },
  {
    id: 'iec',
    name: 'IEC — Import Export Code',
    shortName: 'IEC',
    category: 'Export',
    desc: 'Import Export Code (IEC) issued by the Directorate General of Foreign Trade (DGFT), Government of India. A mandatory 10-digit business identification number for any entity engaged in import or export.',
    images: ['/certificates/iec.jpg'],
  },
];

const CATEGORIES = ['All', 'Food Safety', 'International', 'Export', 'Dietary', 'Organic', 'Traceability', 'Legal'];

const CATEGORY_COLORS: Record<string, string> = {
  'Food Safety': '#2E6B3E',
  'International': '#1A5FAB',
  'Export': '#7B4E1B',
  'Dietary': '#AC033B',
  'Organic': '#2E6B3E',
  'Traceability': '#0A4D6E',
  'Legal': '#4A4A4A',
};

const CSS = `
  @keyframes cert-slide-in {
    from { opacity:0; transform: translateY(-12px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes cert-shine {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes cert-pulse-ring {
    0%   { transform: scale(1); opacity: 0.8; }
    70%  { transform: scale(1.5); opacity: 0; }
    100% { transform: scale(1.5); opacity: 0; }
  }
  @keyframes cert-float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-6px); }
  }
  @keyframes cert-counter-line {
    from { width: 0; }
    to   { width: 100%; }
  }

  .cert-item {
    border-bottom: 1px solid rgba(0,0,0,0.07);
    transition: background 0.2s;
  }
  .cert-item:hover { background: rgba(172,3,59,0.02); }

  .cert-trigger {
    display: flex; align-items: center; gap: 20px;
    padding: 22px 28px;
    cursor: pointer;
    width: 100%;
    background: none; border: none;
    text-align: left;
  }

  .cert-panel {
    overflow: hidden;
    animation: cert-slide-in 0.35s cubic-bezier(0.16,1,0.3,1) both;
  }

  .cert-badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .cert-img-wrap {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    animation: cert-float 4s ease-in-out infinite;
  }

  .cert-shine-bar {
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
    background-size: 200% 100%;
    animation: cert-shine 2.5s ease-in-out infinite;
    pointer-events: none;
  }

  .cert-progress {
    height: 2px;
    background: linear-gradient(to right, #AC033B, rgba(172,3,59,0.3));
    animation: cert-counter-line 0.6s ease-out forwards;
  }

  .cert-num {
    font-variant-numeric: tabular-nums;
  }

  @media (max-width: 700px) {
    .cert-trigger { padding: 16px 20px !important; gap: 14px !important; }
    .cert-panel-inner { flex-direction: column !important; }
  }
`;

function CertItem({ cert, index, isOpen, onToggle }: {
  cert: Cert;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const accentColor = CATEGORY_COLORS[cert.category] || CR;

  return (
    <div className="cert-item" style={{ background: isOpen ? `${accentColor}04` : 'transparent' }}>
      <button className="cert-trigger" onClick={onToggle} aria-expanded={isOpen}>
        {/* Index number */}
        <span className="cert-num" style={{
          fontFamily: MONO, fontSize: 11, fontWeight: 700,
          color: isOpen ? accentColor : 'rgba(0,0,0,0.25)',
          minWidth: 28, transition: 'color 0.2s',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Animated dot */}
        <span style={{ position: 'relative', width: 10, height: 10, flexShrink: 0 }}>
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: isOpen ? accentColor : 'rgba(0,0,0,0.15)',
            transition: 'background 0.25s',
          }}/>
          {isOpen && (
            <span className="cert-pulse-ring" style={{
              position: 'absolute', inset: -3, borderRadius: '50%',
              border: `1.5px solid ${accentColor}`,
              animation: 'cert-pulse-ring 1.2s ease-out infinite',
            }}/>
          )}
        </span>

        {/* Name */}
        <span style={{
          fontFamily: SERIF, fontSize: 'clamp(14px,1.4vw,18px)', fontWeight: 700,
          color: INK, flex: 1, letterSpacing: '-0.02em', transition: 'color 0.2s',
        }}>
          {cert.name}
        </span>

        {/* Category badge */}
        <span className="cert-badge" style={{
          background: `${accentColor}15`, color: accentColor,
          fontFamily: MONO,
        }}>
          {cert.category}
        </span>

        {/* Chevron */}
        <svg
          width="18" height="18" viewBox="0 0 18 18" fill="none"
          style={{ transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
        >
          <path d="M4 6.5L9 11.5L14 6.5" stroke={isOpen ? accentColor : 'rgba(0,0,0,0.35)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Progress bar under trigger */}
      {isOpen && <div className="cert-progress" style={{ background: `linear-gradient(to right, ${accentColor}, ${accentColor}30)` }}/>}

      {/* Expandable panel */}
      {isOpen && (
        <div ref={panelRef} className="cert-panel" style={{ padding: '0 28px 32px' }}>
          <div className="cert-panel-inner" style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>

            {/* Left: description + metadata */}
            <div style={{ flex: 1, paddingTop: 4 }}>
              <p style={{
                fontFamily: SANS, fontSize: 'clamp(13px,1vw,15px)',
                color: 'rgba(0,0,0,0.62)', lineHeight: 1.85, margin: '0 0 24px',
              }}>
                {cert.desc}
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span className="cert-badge" style={{
                  background: `${accentColor}12`, color: accentColor,
                  fontFamily: MONO, padding: '6px 14px', borderRadius: 8, fontSize: 10,
                }}>
                  ✓ Verified & Active
                </span>
                <span className="cert-badge" style={{
                  background: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.5)',
                  fontFamily: MONO, padding: '6px 14px', borderRadius: 8, fontSize: 10,
                }}>
                  {cert.shortName}
                </span>
              </div>
            </div>

            {/* Right: certificate image(s) */}
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
              {/* Main image */}
              <div className="cert-img-wrap" style={{
                width: 'clamp(180px,22vw,260px)', height: 'clamp(130px,16vw,190px)',
                border: `1.5px solid ${accentColor}25`,
                boxShadow: `0 12px 40px ${accentColor}18`,
                position: 'relative',
              }}>
                <Image
                  src={cert.images[imgIdx]}
                  alt={cert.name}
                  fill
                  style={{ objectFit: 'contain', padding: 12 }}
                  sizes="260px"
                />
                {/* Shine overlay */}
                <div className="cert-shine-bar" style={{
                  position: 'absolute', inset: 0, borderRadius: 12,
                }}/>
              </div>

              {/* Thumbnail strip if multiple images */}
              {cert.images.length > 1 && (
                <div style={{ display: 'flex', gap: 8 }}>
                  {cert.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      style={{
                        width: 48, height: 36,
                        border: `1.5px solid ${i === imgIdx ? accentColor : 'rgba(0,0,0,0.12)'}`,
                        borderRadius: 6, overflow: 'hidden',
                        position: 'relative', cursor: 'pointer',
                        background: 'none', padding: 0, transition: 'border-color 0.2s',
                      }}
                    >
                      <Image src={img} alt={`${cert.name} ${i + 1}`} fill style={{ objectFit: 'contain', padding: 2 }} sizes="48px"/>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CertificationsPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? CERTS
    : CERTS.filter(c => c.category === activeCategory);

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: INK }}>
      <style>{CSS}</style>

      {/* ── HERO ─────────────────────────────────────────── */}
      <TechTurbineHero badgeText="Certifications" marqueeText="CERTIFIED" />

      {/* ── VELOCITY DIVIDER ─────────────────────────────── */}
      <VelocityMarquee dark />

      {/* ── INTRO STATS ──────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#FAFAF8' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>
              Our Standards
            </div>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
              Certifications That<br /><em style={{ color: CR, fontStyle: 'italic' }}>Speak For Us</em>
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
              16 internationally recognised certifications covering food safety, traceability, dietary standards, and export compliance — audited, verified, and active.
            </p>
          </ScrollReveal>

          {/* Stats row */}
          <StaggerReveal stagger={0.1} style={{ display: 'flex', gap: 'clamp(16px,3vw,48px)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'clamp(48px,6vw,72px)' }}>
            {[
              { n: '16', label: 'Active Certifications' },
              { n: 'GFSI', label: 'Recognised Standard' },
              { n: 'BRC AA', label: 'Highest Grade' },
              { n: '40+', label: 'Export Markets' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 900, color: INK, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </StaggerReveal>

          {/* Category filter pills */}
          <ScrollReveal fromY={16}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 'clamp(32px,4vw,56px)' }}>
              {CATEGORIES.map(cat => {
                const isActive = cat === activeCategory;
                const col = CATEGORY_COLORS[cat] || CR;
                return (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setOpenId(null); }}
                    style={{
                      fontFamily: MONO, fontSize: 10, fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '8px 18px', borderRadius: 999,
                      background: isActive ? (cat === 'All' ? CR : col) : 'rgba(0,0,0,0.05)',
                      color: isActive ? '#fff' : 'rgba(0,0,0,0.5)',
                      border: 'none', cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Certificates accordion */}
          <ScrollReveal fromY={24}>
            <div style={{
              background: '#fff', border: '1.5px solid rgba(0,0,0,0.07)',
              borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 4px 40px rgba(0,0,0,0.05)',
            }}>
              {/* Header row */}
              <div style={{
                padding: '14px 28px',
                background: '#F8F6F1',
                display: 'flex', gap: 20,
                borderBottom: '1px solid rgba(0,0,0,0.07)',
              }}>
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', minWidth: 28 }}>#</span>
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', flex: 1 }}>Certificate Name</span>
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)' }}>Category</span>
              </div>
              {filtered.map((cert, idx) => (
                <CertItem
                  key={cert.id}
                  cert={cert}
                  index={idx}
                  isOpen={openId === cert.id}
                  onToggle={() => setOpenId(prev => prev === cert.id ? null : cert.id)}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CURVED LOOP ──────────────────────────────────── */}
      <div style={{ position: 'relative', background: '#FAFAF8', paddingTop: 'clamp(40px,5vw,72px)', paddingBottom: 'clamp(80px,10vw,120px)' }}>
        <CurvedLoop
          marqueeText="CERTIFIED • TRUSTED • COMPLIANT • GLOBAL STANDARDS • FOOD SAFETY • QUALITY ASSURED • "
          speed={1.5} curveAmount={250}
          className="fill-[#111] uppercase font-mono tracking-widest"
        />
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          <span style={{ fontSize: 'clamp(28px,4vw,56px)', fontFamily: 'var(--font-display)', color: CR, fontWeight: 800 }}>LV</span>
          <span style={{ fontSize: 'clamp(9px,1vw,14px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</span>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: CR, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none' }}>
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(80px,18vw,280px)', fontWeight: 900, color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>CERTIFIED</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal fromY={24}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,5vw,72px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
              Every Certificate.<br />Every Standard.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(255,255,255,0.75)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.75 }}>
              Our certifications are not checkboxes — they are commitments. Request a full compliance dossier for your import requirements.
            </p>
            <a href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: '#fff', color: CR, fontFamily: SANS, fontWeight: 700, fontSize: 15,
              padding: '18px 40px', borderRadius: 999, textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Request Compliance Dossier →
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
