'use client';

import { useEffect, useRef, useState } from 'react';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';

const CR    = '#AC033B';
const INK   = '#1A1915';
const GOLD  = '#7B4E1B';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

interface Country {
  code: string;
  name: string;
  flag: string;
  lat: number;
  lng: number;
  spices: string[];
  description: string;
  importVolume: string;
  keyProducts: string[];
}

const COUNTRIES: Country[] = [
  {
    code: 'US', name: 'United States', flag: '🇺🇸', lat: 38, lng: -97,
    spices: ['Black Pepper', 'Paprika', 'Cumin', 'Coriander', 'Turmeric'],
    description: 'The United States is one of LV Spices\' largest export markets. USFDA-registered shipments to distributors across California, New York, New Jersey, and Texas. Full FSMA compliance documentation provided with every consignment.',
    importVolume: 'Large Volume',
    keyProducts: ['Red Chilli Powder', 'Turmeric', 'Cumin Seeds', 'Coriander'],
  },
  {
    code: 'GB', name: 'United Kingdom', flag: '🇬🇧', lat: 54, lng: -2,
    spices: ['Black Pepper', 'Cardamom', 'Turmeric', 'Cinnamon'],
    description: 'UK is a mature market for LV Spices with BRC Grade AA certification enabling seamless supply to major UK retailers and distributors. Key demand for blended spice mixes, retail packs, and ethnic food products.',
    importVolume: 'Premium Volume',
    keyProducts: ['Blended Spices', 'Chilli Powder', 'Garam Masala', 'Turmeric'],
  },
  {
    code: 'DE', name: 'Germany', flag: '🇩🇪', lat: 51, lng: 10,
    spices: ['Black Pepper', 'Paprika', 'Caraway', 'Nutmeg'],
    description: 'Germany is LV Spices\' gateway to the European Union market. Shipments comply with EU MRL regulations. Eurofins Germany serves as our third-party testing lab for EU-bound consignments.',
    importVolume: 'Growing Market',
    keyProducts: ['Organic Spices', 'Black Pepper', 'Paprika', 'Fennel'],
  },
  {
    code: 'FR', name: 'France', flag: '🇫🇷', lat: 46, lng: 2,
    spices: ['Saffron', 'Herbes de Provence', 'Black Pepper', 'Vanilla'],
    description: 'France is a premium destination for LV Spices speciality products. Focus on high-quality single-origin spices, organic certified product lines, and food-service packs for fine dining supply chains.',
    importVolume: 'Specialty Market',
    keyProducts: ['Organic Turmeric', 'Cardamom', 'White Pepper', 'Cloves'],
  },
  {
    code: 'JP', name: 'Japan', flag: '🇯🇵', lat: 36, lng: 138,
    spices: ['Wasabi', 'Shichimi', 'Black Pepper', 'Ginger'],
    description: 'Japan requires extremely stringent quality standards — LV Spices meets all Japanese import regulations with strict pesticide and mycotoxin testing. Export of clean-label, allergen-free spice products for the Japanese food manufacturing sector.',
    importVolume: 'Premium Quality',
    keyProducts: ['Ginger', 'White Pepper', 'Cinnamon', 'Cloves'],
  },
  {
    code: 'AU', name: 'Australia', flag: '🇦🇺', lat: -25, lng: 133,
    spices: ['Black Pepper', 'Turmeric', 'Cumin', 'Coriander'],
    description: 'Australia\'s growing multicultural food market presents excellent demand for LV Spices\' authentic Indian spice lines. AQIS compliance ensured with fumigation certification and phytosanitary documentation.',
    importVolume: 'Emerging Market',
    keyProducts: ['Turmeric', 'Curry Blends', 'Cumin Seeds', 'Chilli'],
  },
  {
    code: 'CA', name: 'Canada', flag: '🇨🇦', lat: 56, lng: -106,
    spices: ['Black Pepper', 'Turmeric', 'Cumin', 'Cardamom'],
    description: 'Canada is served through cross-border distribution with our US operations. CFIA-compliant documentation for all shipments. Strong demand from Canada\'s South Asian community for authentic spice blends.',
    importVolume: 'Good Volume',
    keyProducts: ['Cardamom', 'Coriander Seeds', 'Cumin', 'Black Pepper'],
  },
  {
    code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', lat: 24, lng: 45,
    spices: ['Cardamom', 'Saffron', 'Cinnamon', 'Black Pepper'],
    description: 'The Middle East market led by Saudi Arabia. All products are Halal certified. Cardamom and premium Arabic spice blends are the primary exports. Saudi SFDA compliance documentation maintained.',
    importVolume: 'Strategic Market',
    keyProducts: ['Green Cardamom', 'Cinnamon', 'Cloves', 'Bay Leaves'],
  },
  {
    code: 'AE', name: 'UAE', flag: '🇦🇪', lat: 24, lng: 54,
    spices: ['Black Pepper', 'Cardamom', 'Saffron', 'Turmeric'],
    description: 'Dubai serves as the key re-export hub for LV Spices across the GCC region. Supply to Jebel Ali Free Zone distributors. Strong demand for branded retail packs targeting the South Asian expatriate community.',
    importVolume: 'Hub Market',
    keyProducts: ['Premium Spice Blends', 'Cardamom', 'Turmeric', 'Chilli'],
  },
  {
    code: 'IN', name: 'India', flag: '🇮🇳', lat: 20, lng: 77,
    spices: ['All Spices', 'Specialty Blends'],
    description: 'LV Spices is headquartered in Rajkot, Gujarat, India. Sourcing from across India — spices are procured from their natural growing regions: Rajasthan (cumin, coriander, fenugreek), Kerala (black pepper, cardamom), Andhra Pradesh (chilli).',
    importVolume: 'Source Country',
    keyProducts: ['All Spices', 'Direct Farm Sourcing'],
  },
  {
    code: 'CN', name: 'China', flag: '🇨🇳', lat: 35, lng: 104,
    spices: ['Cassia', 'Star Anise', 'Ginger', 'Chilli'],
    description: 'Export of Indian-origin spices to China including red chilli, turmeric, and cumin. All products comply with China\'s AQSIQ import regulations with full pesticide testing documentation.',
    importVolume: 'Emerging',
    keyProducts: ['Red Chilli', 'Turmeric', 'Cumin Seeds', 'Coriander'],
  },
  {
    code: 'BR', name: 'Brazil', flag: '🇧🇷', lat: -10, lng: -53,
    spices: ['Black Pepper', 'Cumin', 'Coriander', 'Turmeric'],
    description: 'Brazil is a growing market for Indian spices, particularly among the country\'s large food manufacturing sector. Supply of bulk ground spices and seed spices for industrial use.',
    importVolume: 'New Market',
    keyProducts: ['Cumin Seeds', 'Coriander Seeds', 'Black Pepper', 'Chilli'],
  },
  {
    code: 'ZA', name: 'South Africa', flag: '🇿🇦', lat: -29, lng: 25,
    spices: ['Curry Blends', 'Black Pepper', 'Turmeric', 'Cardamom'],
    description: 'South Africa\'s large Indian-origin community drives strong demand for authentic Indian spices and curry blends. Cape Malay cuisine also creates unique demand for whole spices and aromatic blends.',
    importVolume: 'Consistent Market',
    keyProducts: ['Curry Blends', 'Turmeric', 'Cardamom', 'Coriander'],
  },
  {
    code: 'SG', name: 'Singapore', flag: '🇸🇬', lat: 1, lng: 104,
    spices: ['All Spices', 'Premium Blends'],
    description: 'Singapore is LV Spices\' gateway to Southeast Asia. Supply of Halal-certified, SFA-compliant spice products for Singapore\'s diverse food manufacturing and hospitality sector.',
    importVolume: 'Gateway Market',
    keyProducts: ['Mixed Spices', 'Chilli Powder', 'Turmeric', 'Curry Blends'],
  },
  {
    code: 'KE', name: 'Kenya', flag: '🇰🇪', lat: -1, lng: 37,
    spices: ['Black Pepper', 'Cardamom', 'Cinnamon', 'Chilli'],
    description: 'Kenya and East Africa represent a strong and growing market for LV Spices. Supply of whole spices and blended powders to Nairobi\'s food distributors.',
    importVolume: 'Growing Market',
    keyProducts: ['Cardamom', 'Cloves', 'Cinnamon', 'Black Pepper'],
  },
];

// ── MAP HELPERS ──────────────────────────────────────────────────────────────

function lngLatToXY(lng: number, lat: number, w: number, h: number) {
  const x = ((lng + 180) / 360) * w;
  const y = ((90 - lat) / 180) * h;
  return { x, y };
}

const CSS = `
  @keyframes ew-dot-pulse {
    0%, 100% { transform: scale(1); opacity:1; }
    50%       { transform: scale(1.4); opacity:0.7; }
  }
  @keyframes ew-dot-ring {
    0%   { transform: scale(1); opacity:0.8; }
    100% { transform: scale(3); opacity:0; }
  }
  @keyframes ew-panel-in {
    from { opacity:0; transform: translateY(20px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes ew-line-draw {
    from { stroke-dashoffset: 200; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes ew-country-hover {
    from { r: 5; }
    to   { r: 8; }
  }

  .ew-country-dot {
    cursor: pointer;
    transition: all 0.2s;
  }
  .ew-country-dot:hover circle { r: 9; }

  .ew-sidebar-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px; border-radius: 10px;
    cursor: pointer; transition: all 0.2s;
    border: 1px solid transparent;
  }
  .ew-sidebar-item:hover { background: rgba(172,3,59,0.06); border-color: rgba(172,3,59,0.15); }
  .ew-sidebar-item.active { background: rgba(172,3,59,0.1); border-color: rgba(172,3,59,0.3); }

  .ew-info-panel {
    animation: ew-panel-in 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }

  .ew-tag {
    display: inline-block; padding: 3px 10px; border-radius: 999px;
    font-family: var(--font-mono); font-size: 9px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
  }

  @media (max-width: 900px) {
    .ew-layout { flex-direction: column !important; }
    .ew-sidebar { width: 100% !important; max-height: 220px !important; }
    .ew-map-area { height: 320px !important; }
  }
`;

// Simple SVG world map with real country positions as dots
const WORLD_SVG_PATH = `M 0 0 h 360 v 180 h -360 Z`;

export default function ExploreWorldPage() {
  const [selected, setSelected] = useState<Country | null>(COUNTRIES[9]); // Default: India
  const mapW = 800;
  const mapH = 400;

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: INK }}>
      <style>{CSS}</style>

      <TechTurbineHero badgeText="Explore World" marqueeText="EXPLORE WORLD" />
      <VelocityMarquee dark />

      {/* ── INTRO ─────────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#FAFAF8' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>
              Global Presence
            </div>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
              LV Spices<br /><em style={{ color: CR, fontStyle: 'italic' }}>Across 70+ Countries</em>
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
              Click any country on the map to discover how LV Spices serves buyers across every major continent — from US food distributors to UAE re-export hubs.
            </p>
          </ScrollReveal>

          {/* Stats row */}
          <StaggerReveal stagger={0.08} style={{ display: 'flex', gap: 'clamp(16px,3vw,48px)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
            {[
              { n: '70+', label: 'Export Countries' },
              { n: '40+', label: 'Active Markets' },
              { n: '3', label: 'Export Ports' },
              { n: '15+', label: 'Years of Export' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(26px,3.5vw,48px)', fontWeight: 900, color: INK, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </StaggerReveal>

          {/* ── MAP + SIDEBAR ─────────────────────────── */}
          <div className="ew-layout" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

            {/* Sidebar: country list */}
            <div className="ew-sidebar" style={{
              width: 240, flexShrink: 0, maxHeight: 480, overflowY: 'auto',
              background: '#fff', border: '1.5px solid rgba(0,0,0,0.07)',
              borderRadius: 16, padding: 12,
              scrollbarWidth: 'thin',
            }}>
              <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', padding: '8px 14px', marginBottom: 4 }}>
                Select Country
              </div>
              {COUNTRIES.map(c => (
                <div
                  key={c.code}
                  className={`ew-sidebar-item ${selected?.code === c.code ? 'active' : ''}`}
                  onClick={() => setSelected(c)}
                >
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{c.flag}</span>
                  <div>
                    <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: INK }}>{c.name}</div>
                    <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)' }}>{c.importVolume}</div>
                  </div>
                  {selected?.code === c.code && (
                    <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: CR, flexShrink: 0 }}/>
                  )}
                </div>
              ))}
            </div>

            {/* Map area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* SVG World Map */}
              <div className="ew-map-area" style={{
                background: '#F0F4F8',
                borderRadius: 20, overflow: 'hidden',
                border: '1.5px solid rgba(0,0,0,0.07)',
                position: 'relative', height: 400,
              }}>
                <svg
                  viewBox={`0 0 ${mapW} ${mapH}`}
                  style={{ width: '100%', height: '100%', display: 'block' }}
                >
                  {/* Ocean background */}
                  <rect width={mapW} height={mapH} fill="#E8F0F8"/>

                  {/* Grid lines */}
                  {Array.from({ length: 7 }, (_, i) => (
                    <line key={`h${i}`} x1={0} y1={(i + 1) * (mapH / 8)} x2={mapW} y2={(i + 1) * (mapH / 8)} stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
                  ))}
                  {Array.from({ length: 11 }, (_, i) => (
                    <line key={`v${i}`} x1={(i + 1) * (mapW / 12)} y1={0} x2={(i + 1) * (mapW / 12)} y2={mapH} stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
                  ))}

                  {/* Continents — simplified shapes */}
                  {/* North America */}
                  <ellipse cx={155} cy={125} rx={80} ry={70} fill="#D4D8DC" opacity="0.7"/>
                  {/* South America */}
                  <ellipse cx={200} cy={280} rx={50} ry={70} fill="#D4D8DC" opacity="0.7"/>
                  {/* Europe */}
                  <ellipse cx={400} cy={100} rx={45} ry={40} fill="#D4D8DC" opacity="0.7"/>
                  {/* Africa */}
                  <ellipse cx={410} cy={240} rx={60} ry={80} fill="#D4D8DC" opacity="0.7"/>
                  {/* Asia */}
                  <ellipse cx={560} cy={120} rx={110} ry={70} fill="#D4D8DC" opacity="0.7"/>
                  {/* India subcontinent */}
                  <ellipse cx={530} cy={185} rx={28} ry={35} fill="#CACED4" opacity="0.9"/>
                  {/* Australia */}
                  <ellipse cx={625} cy={290} rx={55} ry={40} fill="#D4D8DC" opacity="0.7"/>

                  {/* Connection lines from India to other dots */}
                  {COUNTRIES.filter(c => c.code !== 'IN').map(c => {
                    const from = lngLatToXY(77, 20, mapW, mapH);
                    const to   = lngLatToXY(c.lng, c.lat, mapW, mapH);
                    return (
                      <line
                        key={`line-${c.code}`}
                        x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                        stroke={selected?.code === c.code ? CR : 'rgba(172,3,59,0.1)'}
                        strokeWidth={selected?.code === c.code ? 1.5 : 0.8}
                        strokeDasharray="4 3"
                        opacity={selected?.code === c.code ? 1 : 0.4}
                        style={{ transition: 'stroke 0.3s, stroke-width 0.3s, opacity 0.3s' }}
                      />
                    );
                  })}

                  {/* Country dots */}
                  {COUNTRIES.map(c => {
                    const { x, y } = lngLatToXY(c.lng, c.lat, mapW, mapH);
                    const isSelected = selected?.code === c.code;
                    return (
                      <g key={c.code} onClick={() => setSelected(c)} style={{ cursor: 'pointer' }}>
                        {/* Pulse ring */}
                        {isSelected && (
                          <circle cx={x} cy={y} r={14}
                            fill="none" stroke={CR} strokeWidth="1.5" opacity="0.4"
                            style={{ animation: 'ew-dot-ring 1.5s ease-out infinite' }}/>
                        )}
                        {/* Main dot */}
                        <circle
                          cx={x} cy={y}
                          r={isSelected ? 8 : 6}
                          fill={isSelected ? CR : c.code === 'IN' ? GOLD : 'rgba(172,3,59,0.6)'}
                          stroke="#fff" strokeWidth="2"
                          style={{ transition: 'r 0.25s, fill 0.25s' }}
                        />
                        {/* Country code label */}
                        <text x={x} y={y - 14}
                          fill={isSelected ? CR : 'rgba(0,0,0,0.5)'}
                          fontSize={isSelected ? 9 : 7}
                          fontWeight={isSelected ? 700 : 500}
                          textAnchor="middle"
                          style={{ fontFamily: 'monospace', pointerEvents: 'none', transition: 'font-size 0.2s' }}
                        >
                          {c.code}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Map legend */}
                <div style={{
                  position: 'absolute', bottom: 12, right: 12,
                  background: 'rgba(255,255,255,0.9)', borderRadius: 10, padding: '8px 12px',
                  display: 'flex', flexDirection: 'column', gap: 6,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: GOLD }}/>
                    <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)' }}>Source (India)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: CR }}/>
                    <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)' }}>Export Market</span>
                  </div>
                </div>
              </div>

              {/* ── COUNTRY INFO PANEL ─────────────────── */}
              {selected && (
                <div className="ew-info-panel" key={selected.code} style={{
                  background: '#fff', borderRadius: 20, padding: 28,
                  border: '1.5px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
                }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                    <span style={{ fontSize: 48, lineHeight: 1 }}>{selected.flag}</span>
                    <div>
                      <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 800, color: INK, letterSpacing: '-0.02em', margin: '0 0 6px', lineHeight: 1.1 }}>
                        {selected.name}
                      </h2>
                      <span className="ew-tag" style={{ background: `${CR}15`, color: CR }}>
                        {selected.importVolume}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1vw,15px)', color: 'rgba(0,0,0,0.62)', lineHeight: 1.85, margin: '0 0 20px' }}>
                    {selected.description}
                  </p>

                  {/* Key products */}
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 10 }}>
                      Key Products Exported
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {selected.keyProducts.map(p => (
                        <span key={p} className="ew-tag" style={{ background: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.6)' }}>{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: INK, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none' }}>
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(80px,18vw,280px)', fontWeight: 900, color: 'rgba(255,255,255,0.03)', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>GLOBAL</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal fromY={24}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,5vw,72px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
              Don't See Your<br />Country?
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.75 }}>
              We export to 70+ countries. If your market isn't listed, contact us — we likely already supply your region through a distributor, or can set up a direct supply line.
            </p>
            <a href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: CR, color: '#fff', fontFamily: SANS, fontWeight: 700, fontSize: 15,
              padding: '18px 40px', borderRadius: 999, textDecoration: 'none',
              transition: 'transform 0.2s', boxShadow: `0 8px 32px ${CR}40`,
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Enquire for Your Market →
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
