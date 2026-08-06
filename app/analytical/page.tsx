'use client';

import { useRef, useState } from 'react';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import CurvedLoop from '@/components/ui/CurvedLoop';

const CR    = '#AC033B';
const INK   = '#1A1915';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

// ── DATA ─────────────────────────────────────────────────────────────────────

const CHEMICAL_TESTS = [
  {
    id: 'color',
    name: 'Colour in Chilli',
    icon: '🌶',
    unit: 'ASTA Units',
    desc: 'Characterises the colour of the moisture-free fruits of the species Capsicum by the presence of pigments such as chlorophyll and carotenoids. Measured using ASTA method.',
    range: '80–200 ASTA',
    accent: '#C0392B',
  },
  {
    id: 'capsaicin',
    name: 'Capsaicin — Chilli Content',
    icon: '🔥',
    unit: 'Scoville / %',
    desc: 'The pungency of chilli can be expressed in Scoville heat units and traces of allied chemicals can be objectively confirmed by extracting the capsaicin content.',
    range: '0.1–2.0%',
    accent: '#E67E22',
  },
  {
    id: 'moisture',
    name: 'Moisture Content',
    icon: '💧',
    unit: '% w/w',
    desc: 'Water content is a measure of the quantity of water contained in a material. Crucial for shelf life, mould prevention, and microbial stability.',
    range: '≤12%',
    accent: '#2980B9',
  },
  {
    id: 'totalash',
    name: 'Total Ash',
    icon: '⚗️',
    unit: '% w/w',
    desc: 'Total ash content is a measure of the total amount of minerals present within a food, indicating purity and absence of adulteration.',
    range: '≤8%',
    accent: '#7F8C8D',
  },
  {
    id: 'curcuminoid',
    name: 'Curcuminoid Content in Turmeric',
    icon: '🌿',
    unit: '% w/w',
    desc: 'Curcuminoids are natural compounds that are responsible for the bright yellow colour of turmeric — the key active bioactive compounds with antioxidant properties.',
    range: '2–5%',
    accent: '#F39C12',
  },
  {
    id: 'piperine',
    name: 'Piperine Content in Pepper',
    icon: '🫙',
    unit: '% w/w',
    desc: 'A pungent alkaloid that is concentrated in the outer skin of pepper berries. Piperine is the primary active compound giving black pepper its characteristic heat.',
    range: '4–9%',
    accent: '#2C3E50',
  },
  {
    id: 'volatile',
    name: 'Volatile Oil',
    icon: '🧴',
    unit: 'ml/100g',
    desc: 'A measure of the flavour and aroma of the spices. Essential oils carry the characteristic fragrance and are key quality determinants for buyers.',
    range: '1–4 ml/100g',
    accent: '#1ABC9C',
  },
  {
    id: 'crudefiber',
    name: 'Crude Fiber',
    icon: '🌾',
    unit: '% w/w',
    desc: 'The insoluble residue of an acid hydrolysis, followed by an alkali treatment. Crude fibre of spices mainly contains true cellulose and lignin.',
    range: '15–30%',
    accent: '#8E44AD',
  },
  {
    id: 'particle',
    name: 'Particle Size Distribution',
    icon: '🔬',
    unit: 'μm (microns)',
    desc: 'An index indicating what size of particles make up a given volume. Ensures powder particle density is within standard limits for proper dispersion in recipes.',
    range: '< 500 μm',
    accent: '#16A085',
  },
];

const MICRO_TESTS = [
  {
    id: 'salmonella',
    name: 'Salmonella',
    icon: '🦠',
    desc: 'Food poisoning caused by infection with the Salmonella bacteria. Micro testing in products provides critical safety assurance against ingestion of contaminated food.',
    standard: 'Absent / 25g',
    severity: 'Critical',
  },
  {
    id: 'moulds',
    name: 'Moulds',
    icon: '🍄',
    desc: 'Cause biodegradation of natural materials, which can be prevented when it is known where and how mould develops in food processing conditions and settings.',
    standard: '≤ 10⁴ CFU/g',
    severity: 'High',
  },
  {
    id: 'ecoli',
    name: 'E. Coli',
    icon: '🔴',
    desc: 'Can cause serious illness in humans. Infection causes symptoms and signs such as nausea, bloody diarrhoea, stomach cramps, vomiting, and occasionally fever.',
    standard: 'Absent / g',
    severity: 'Critical',
  },
  {
    id: 'coliforms',
    name: 'Coliforms',
    icon: '🔵',
    desc: 'Group of bacteria that are used as indicators of the potential presence of pathogens, viruses, or parasites in a sample. Indicator organism for sanitation.',
    standard: '≤ 10 MPN/g',
    severity: 'Moderate',
  },
  {
    id: 'tvc',
    name: 'Total Viable Count',
    icon: '🧫',
    desc: 'This is a count for the number of bacteria, fungi, yeast & mould that are capable of growing and multiplying under appropriate and standard conditions.',
    standard: '≤ 10⁵ CFU/g',
    severity: 'Moderate',
  },
  {
    id: 'others',
    name: 'Others',
    icon: '⚠️',
    desc: 'Yeast and fungi are commonly found on soil and surfaces. Other micro-organisms such as mites such as Acarus on bird surfaces and on top of soil nutrients.',
    standard: 'As per FSSAI/ASTA',
    severity: 'Low',
  },
];

const PESTICIDE_TESTS = [
  {
    id: 'aflatoxin',
    name: 'Aflatoxins B1, B2, G1, G2',
    icon: '⚗️',
    desc: 'Naturally occurring mycotoxins produced by Aspergillus flavus and Aspergillus parasiticus. Aflatoxin B1 is among the most carcinogenic substances known.',
    limit: '≤ 10 ppb (total)',
    class: 'Mycotoxin',
  },
  {
    id: 'organochloro',
    name: 'Organochlorine',
    icon: '🧪',
    desc: 'An organic compound combined with chlorinated aromatic molecules. They are used primarily as an alternative to chlorinated hydrocarbons that persist in the environment.',
    limit: '≤ 0.05 mg/kg',
    class: 'Pesticide',
  },
  {
    id: 'organophos',
    name: 'Organophosphorous',
    icon: '🔬',
    desc: 'Used primarily as insect pest control as well as an alternative to chlorinated hydrocarbons that persist in the environment.',
    limit: '≤ 0.05 mg/kg',
    class: 'Pesticide',
  },
  {
    id: 'pesticide',
    name: 'Pesticide',
    icon: '🌱',
    desc: 'A substance used for destroying insects or other organisms harmful to cultivated plants or to animals. EU MRLs are strictly adhered to for all export shipments.',
    limit: 'EU MRL / CODEX',
    class: 'Pesticide',
  },
  {
    id: 'mycotoxins',
    name: 'Mycotoxins',
    icon: '🧫',
    desc: 'Secondary metabolites produced by micro-organisms that are capable of causing disease and death in humans, animals, and other organisms.',
    limit: 'Per EC 1881/2006',
    class: 'Mycotoxin',
  },
  {
    id: 'ochratoxin',
    name: 'Ochratoxin A',
    icon: '⚠️',
    desc: 'Ochratoxin A (OTA) is a naturally occurring mycotoxic compound found in a wide variety of agricultural commodities worldwide — particularly dried spices.',
    limit: '≤ 30 μg/kg',
    class: 'Mycotoxin',
  },
];

// ── COMPONENTS ───────────────────────────────────────────────────────────────

const CSS = `
  @keyframes lab-in {
    from { opacity:0; transform: translateY(20px) scale(0.97); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }
  @keyframes flask-fill {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }
  @keyframes scan-line {
    0%   { top: 0; }
    100% { top: 100%; }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity:1; }
    50%       { opacity:0.4; }
  }

  .lab-card {
    border: 1.5px solid rgba(0,0,0,0.07);
    border-radius: 16px;
    padding: 24px;
    background: #fff;
    position: relative; overflow: hidden;
    transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
    cursor: default;
  }
  .lab-card:hover {
    box-shadow: 0 16px 48px rgba(0,0,0,0.09);
    transform: translateY(-4px);
  }

  .micro-badge {
    display: inline-block;
    padding: 2px 10px; border-radius: 999px;
    font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .micro-badge.critical { background: #FFE5E5; color: #C0392B; }
  .micro-badge.high     { background: #FFF3E0; color: #E67E22; }
  .micro-badge.moderate { background: #E8F4FD; color: #2980B9; }
  .micro-badge.low      { background: #E8F8F5; color: #1ABC9C; }

  .pesticide-badge {
    display: inline-block; padding: 2px 10px; border-radius: 999px;
    font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  }
  .pesticide-badge.Mycotoxin { background: #F3E5F5; color: #7B1FA2; }
  .pesticide-badge.Pesticide  { background: #E8F5E9; color: #2E7D32; }

  @media (max-width: 700px) {
    .lab-grid-3 { grid-template-columns: 1fr !important; }
    .lab-grid-2 { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 900px) {
    .lab-grid-3 { grid-template-columns: repeat(2,1fr) !important; }
    .lab-grid-2 { grid-template-columns: 1fr !important; }
  }
`;

function FlaskIcon({ accent }: { accent: string }) {
  return (
    <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
      <path d="M13 2h10M13 2v14L3 40h30L23 16V2H13z" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 32h24" stroke={accent} strokeWidth="1.2" strokeDasharray="3 3"/>
      <ellipse cx="14" cy="36" rx="2.5" ry="2.5" fill={accent} opacity="0.6"/>
      <ellipse cx="22" cy="38" rx="1.5" ry="1.5" fill={accent} opacity="0.4"/>
    </svg>
  );
}

function MicroIcon({ color }: { color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="10" stroke={color} strokeWidth="1.5"/>
      <circle cx="18" cy="18" r="5" fill={color} opacity="0.15"/>
      <circle cx="21" cy="15" r="2" fill={color} opacity="0.7"/>
      <circle cx="14" cy="20" r="1.5" fill={color} opacity="0.5"/>
      <path d="M18 4v4M18 28v4M4 18h4M28 18h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function PestIcon({ color }: { color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 6L24 14H12L18 6Z" fill={color} opacity="0.2"/>
      <rect x="12" y="14" width="12" height="16" rx="6" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5"/>
      <path d="M6 16l6 4M30 16l-6 4M6 24l6-2M30 24l-6-2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="22" r="2" fill={color}/>
    </svg>
  );
}

function SectionHeading({ label, title, subtitle, light }: { label: string; title: string; subtitle?: string; light?: boolean }) {
  const textColor = light ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.52)';
  const headingColor = light ? '#fff' : INK;
  return (
    <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}>
      <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: light ? 'rgba(255,255,255,0.55)' : CR, marginBottom: 14 }}>
        {label}
      </div>
      <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,4.5vw,56px)', fontWeight: 800, color: headingColor, letterSpacing: '-0.03em', margin: '0 0 18px', lineHeight: 1.05 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,17px)', color: textColor, maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}

export default function AnalyticalPage() {
  const [activeTest, setActiveTest] = useState<string | null>(null);

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: INK }}>
      <style>{CSS}</style>

      {/* ── HERO ─────────────────────────────────────────── */}
      <TechTurbineHero badgeText="Analytical" marqueeText="ANALYTICAL" />

      <VelocityMarquee dark />

      {/* ── INTRO ────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#FAFAF8' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>
              In-House Testing
            </div>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
              Precision Labs.<br /><em style={{ color: CR, fontStyle: 'italic' }}>Uncompromised Quality.</em>
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', maxWidth: 620, margin: '0 auto', lineHeight: 1.8 }}>
              We perform all tests in our in-house laboratory in accordance to FSSAI and ASTA norms. Raw material not conforming to our standards is rejected and sent back to the supplier.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION 1: CHEMICAL TESTS ────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading label="Chemical Analysis" title="Analytical Tests" subtitle="Nine standardised tests applied to every spice batch — from colour and pungency to moisture and particle distribution." />

          <div className="lab-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {CHEMICAL_TESTS.map((test, i) => (
              <ScrollReveal key={test.id} fromY={24} style={{ animationDelay: `${i * 0.08}s` }}>
                <div
                  className="lab-card"
                  onClick={() => setActiveTest(prev => prev === test.id ? null : test.id)}
                  style={{ borderColor: activeTest === test.id ? test.accent : 'rgba(0,0,0,0.07)' }}
                >
                  {/* Accent bar at top */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: test.accent, borderRadius: '16px 16px 0 0', opacity: activeTest === test.id ? 1 : 0.4 }} />

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                    <FlaskIcon accent={test.accent} />
                    <div>
                      <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: test.accent, marginBottom: 6 }}>{test.unit}</div>
                      <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(13px,1.1vw,16px)', fontWeight: 700, color: INK, margin: 0, lineHeight: 1.3 }}>{test.name}</h3>
                    </div>
                  </div>
                  <p style={{ fontFamily: SANS, fontSize: 'clamp(11px,0.85vw,13px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.7, margin: '0 0 16px' }}>
                    {test.desc}
                  </p>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: `${test.accent}12`, borderRadius: 8,
                    padding: '5px 12px',
                  }}>
                    <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', color: test.accent, fontWeight: 700 }}>RANGE: {test.range}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: MICROBIOLOGICAL ───────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#111' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading label="Microbiology" title={`Micro Biological\nTesting`} subtitle="Special care is taken to keep the microbiological count low to keep the product safe. Each batch is tested against internationally recognised limits." light />

          <div className="lab-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {MICRO_TESTS.map((test, i) => (
              <ScrollReveal key={test.id} fromY={24} style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{
                  padding: 24, borderRadius: 16,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1.5px solid rgba(255,255,255,0.08)',
                  transition: 'background 0.25s, transform 0.25s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
                    <MicroIcon color="#fff" />
                    <div>
                      <span className={`micro-badge ${test.severity.toLowerCase()}`} style={{ fontFamily: MONO, marginBottom: 6, display: 'block' }}>{test.severity}</span>
                      <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(13px,1.1vw,16px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.3 }}>{test.name}</h3>
                    </div>
                  </div>
                  <p style={{ fontFamily: SANS, fontSize: 'clamp(11px,0.85vw,13px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: '0 0 16px' }}>{test.desc}</p>
                  <div style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                    LIMIT: <span style={{ color: 'rgba(255,255,255,0.7)' }}>{test.standard}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PESTICIDE & MYCOTOXINS ────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#FAFAF8' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading label="Pesticide Control" title="Pesticide & Mycotoxins" subtitle="Our procurement team ensures that raw material with the least exposure to pesticides is processed. Strict policies when it comes to health and hazard." />

          <div className="lab-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {PESTICIDE_TESTS.map((test, i) => (
              <ScrollReveal key={test.id} fromY={24} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="lab-card" style={{ background: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
                    <PestIcon color={test.class === 'Mycotoxin' ? '#7B1FA2' : '#2E7D32'} />
                    <div>
                      <span className={`pesticide-badge ${test.class}`} style={{ fontFamily: MONO, marginBottom: 6, display: 'block' }}>{test.class}</span>
                      <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(12px,1vw,15px)', fontWeight: 700, color: INK, margin: 0, lineHeight: 1.3 }}>{test.name}</h3>
                    </div>
                  </div>
                  <p style={{ fontFamily: SANS, fontSize: 'clamp(11px,0.85vw,13px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.7, margin: '0 0 16px' }}>{test.desc}</p>
                  <div style={{
                    fontFamily: MONO, fontSize: 10,
                    background: test.class === 'Mycotoxin' ? '#F3E5F5' : '#E8F5E9',
                    color: test.class === 'Mycotoxin' ? '#7B1FA2' : '#2E7D32',
                    borderRadius: 8, padding: '5px 12px', display: 'inline-block',
                  }}>
                    LIMIT: {test.limit}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURVED LOOP ──────────────────────────────────── */}
      <div style={{ position: 'relative', background: '#FAFAF8', paddingTop: 'clamp(40px,5vw,72px)', paddingBottom: 'clamp(80px,10vw,120px)' }}>
        <CurvedLoop
          marqueeText="ANALYTICAL • LAB CERTIFIED • FSSAI • ASTA NORMS • MICRO TESTED • PESTICIDE FREE • "
          speed={1.5} curveAmount={250}
          className="fill-[#111] uppercase font-mono tracking-widest"
        />
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: CR, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none' }}>
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(80px,18vw,280px)', fontWeight: 900, color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>LAB</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal fromY={24}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,5vw,72px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
              Request a<br />Test Report
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(255,255,255,0.75)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.75 }}>
              All our test reports are available on request. Get the full analytical report for any spice or blend you're interested in importing.
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
              Request Full Lab Report →
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
