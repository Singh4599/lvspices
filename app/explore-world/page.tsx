'use client';

import { useEffect, useRef, useState } from 'react';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import { ComposableMap, ZoomableGroup, Geographies, Geography, Marker, Line } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CR    = '#111111';
const INK   = '#1A1915';
const GOLD  = '#555555';
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
    description: 'The United States is our largest B2B export market. We supply USFDA-registered, FSMA-compliant bulk spices to major food distributors and processors across California, New York, and Texas. All consignments include comprehensive traceability and Certificate of Analysis (CoA) documentation.',
    importVolume: 'Strategic Volume',
    keyProducts: ['ASTA-graded Chilli Powder', 'High-Curcumin Turmeric', 'Machine-Cleaned Cumin', 'Coriander'],
  },
  {
    code: 'GB', name: 'United Kingdom', flag: '🇬🇧', lat: 54, lng: -2,
    spices: ['Black Pepper', 'Cardamom', 'Turmeric', 'Cinnamon'],
    description: 'A mature market where our BRCGS Grade AA certification ensures seamless integration into UK retail and foodservice supply chains. We are a primary supplier of bespoke Curry Powders and Garam Masala blends to leading UK food manufacturers.',
    importVolume: 'Premium Volume',
    keyProducts: ['Bespoke Spice Blends', 'Kashmiri Chilli Powder', 'Garam Masala', 'Turmeric'],
  },
  {
    code: 'DE', name: 'Germany', flag: '🇩🇪', lat: 51, lng: 10,
    spices: ['Black Pepper', 'Paprika', 'Caraway', 'Nutmeg'],
    description: 'Our strategic gateway into the European Union. We strictly adhere to EU MRL (Maximum Residue Limit) regulations. Eurofins Germany serves as our designated third-party testing partner for verifying pesticide, aflatoxin, and microbiology compliance.',
    importVolume: 'Compliance Driven',
    keyProducts: ['EU-Compliant Spices', 'Steam Sterilized Pepper', 'Paprika', 'Fennel'],
  },
  {
    code: 'FR', name: 'France', flag: '🇫🇷', lat: 46, lng: 2,
    spices: ['Saffron', 'Herbes de Provence', 'Black Pepper', 'Vanilla'],
    description: 'France demands the highest sensory standards. We supply premium, single-origin whole spices and organically certified (NPOP/EU) product lines directly to French gastronomical and fine-dining supply networks.',
    importVolume: 'Specialty Market',
    keyProducts: ['Organic Alleppey Turmeric', 'Green Cardamom', 'White Pepper', 'Cloves'],
  },
  {
    code: 'JP', name: 'Japan', flag: '🇯🇵', lat: 36, lng: 138,
    spices: ['Wasabi', 'Shichimi', 'Black Pepper', 'Ginger'],
    description: 'Meeting Japan\'s Positive List system for agricultural chemicals, we provide clean-label, 100% allergen-free spice formulations. Every batch undergoes rigorous pesticide residue and mycotoxin screening prior to dispatch.',
    importVolume: 'High Precision',
    keyProducts: ['Pesticide-Free Ginger', 'White Pepper', 'Cassia', 'Cloves'],
  },
  {
    code: 'AU', name: 'Australia', flag: '🇦🇺', lat: -25, lng: 133,
    spices: ['Black Pepper', 'Turmeric', 'Cumin', 'Coriander'],
    description: 'Supplying Australia\'s diverse commercial food sector. Full compliance with DAFF (formerly AQIS) biosecurity import conditions, backed by mandatory methyl bromide fumigation and phytosanitary certificates.',
    importVolume: 'Emerging Market',
    keyProducts: ['Turmeric Finger', 'Commercial Curry Blends', 'Cumin Seeds', 'Chilli'],
  },
  {
    code: 'CA', name: 'Canada', flag: '🇨🇦', lat: 56, lng: -106,
    spices: ['Black Pepper', 'Turmeric', 'Cumin', 'Cardamom'],
    description: 'Serviced efficiently via our US distribution hubs or direct shipment. Full compliance with CFIA (Canadian Food Inspection Agency) regulations, supplying raw materials for Canada\'s expanding multicultural food manufacturing sector.',
    importVolume: 'Good Volume',
    keyProducts: ['Jumbo Cardamom', 'Machine Cleaned Coriander', 'Cumin', 'Black Pepper'],
  },
  {
    code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', lat: 24, lng: 45,
    spices: ['Cardamom', 'Saffron', 'Cinnamon', 'Black Pepper'],
    description: 'The dominant market for our premium whole spices. All exports are 100% Halal certified and strictly adhere to Saudi SFDA technical regulations. A primary destination for our 8mm Jumbo Green Cardamom and custom Arabic spice blends (Baharat).',
    importVolume: 'Strategic Market',
    keyProducts: ['8mm Green Cardamom', 'Ceylon Cinnamon', 'Cloves', 'Bay Leaves'],
  },
  {
    code: 'AE', name: 'UAE', flag: '🇦🇪', lat: 24, lng: 54,
    spices: ['Black Pepper', 'Cardamom', 'Saffron', 'Turmeric'],
    description: 'Dubai functions as our primary re-export hub for the broader MENA region. We supply bulk spices to JAFZA (Jebel Ali Free Zone) processors and customized retail-ready private label packs for the GCC market.',
    importVolume: 'Hub Market',
    keyProducts: ['Private Label Blends', 'Cardamom', 'Turmeric', 'Chilli'],
  },
  {
    code: 'IN', name: 'India', flag: '🇮🇳', lat: 20, lng: 77,
    spices: ['All Spices', 'Specialty Blends'],
    description: 'Our global headquarters and processing hub in Gujarat, India. We leverage direct farm-gate sourcing across key agricultural belts: Rajasthan (Seed Spices), Kerala (Pepper/Cardamom), and Andhra Pradesh (Chilli).',
    importVolume: 'Source Origin',
    keyProducts: ['End-to-End Processing', 'Direct Farm Sourcing'],
  },
  {
    code: 'CN', name: 'China', flag: '🇨🇳', lat: 35, lng: 104,
    spices: ['Cassia', 'Star Anise', 'Ginger', 'Chilli'],
    description: 'A massive industrial market for bulk Indian spices. We export high volumes of red chilli, turmeric, and cumin, ensuring absolute compliance with GACC (General Administration of Customs China) import standards.',
    importVolume: 'High Volume',
    keyProducts: ['Stemless Red Chilli', 'Turmeric Bulb', 'Cumin', 'Coriander'],
  },
  {
    code: 'BR', name: 'Brazil', flag: '🇧🇷', lat: -10, lng: -53,
    spices: ['Black Pepper', 'Cumin', 'Coriander', 'Turmeric'],
    description: 'A rapidly expanding destination for bulk Indian spices, particularly driven by Brazil\'s massive meat processing and commercial food sectors. We supply industrial-grade ground spices and seed spices.',
    importVolume: 'New Market',
    keyProducts: ['Sortex Cleaned Cumin', 'Coriander Splits', 'Black Pepper', 'Chilli'],
  },
  {
    code: 'ZA', name: 'South Africa', flag: '🇿🇦', lat: -29, lng: 25,
    spices: ['Curry Blends', 'Black Pepper', 'Turmeric', 'Cardamom'],
    description: 'South Africa represents a robust market for our specialized curry powders and whole spices, driven by both traditional Indian demographics and the unique culinary requirements of Cape Malay cuisine.',
    importVolume: 'Consistent Market',
    keyProducts: ['Commercial Curry Blends', 'Turmeric', 'Cardamom', 'Coriander'],
  },
  {
    code: 'SG', name: 'Singapore', flag: '🇸🇬', lat: 1, lng: 104,
    spices: ['All Spices', 'Premium Blends'],
    description: 'Our strategic gateway into the ASEAN region. We supply SFA-compliant, Halal-certified ingredients to Singapore\'s highly regulated food manufacturing and premium hospitality sectors.',
    importVolume: 'Gateway Market',
    keyProducts: ['Specialty Mixed Spices', 'Chilli Powder', 'Turmeric', 'Curry Blends'],
  },
  {
    code: 'KE', name: 'Kenya', flag: '🇰🇪', lat: -1, lng: 37,
    spices: ['Black Pepper', 'Cardamom', 'Cinnamon', 'Chilli'],
    description: 'East Africa is a strong growth vector for LV Spices. We supply bulk whole spices and commercial blended powders to major food distributors and processors centered in Nairobi.',
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
    from { stroke-dashoffset: 1000; }
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
  .ew-sidebar-item:hover { background: rgba(17,17,17,0.06); border-color: rgba(17,17,17,0.15); }
  .ew-sidebar-item.active { background: rgba(17,17,17,0.1); border-color: rgba(17,17,17,0.3); }

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
                <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }} width={800} height={400} style={{ width: '100%', height: '100%', display: 'block' }}>
                  <ZoomableGroup 
                    center={selected ? [selected.lng, selected.lat] : [77, 20]} 
                    zoom={selected ? 3 : 1}
                    filterZoomEvent={(e: any) => {
                      if (e.type === "wheel") return false;
                      return true;
                    }}
                  >
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#D4D8DC"
                            stroke="#FFFFFF"
                            strokeWidth={0.5}
                            style={{
                              default: { outline: "none" },
                              hover: { fill: "#C0C5CB", outline: "none" },
                              pressed: { outline: "none" },
                            }}
                          />
                        ))
                      }
                    </Geographies>

                    {/* Connection lines from India to other dots */}
                    {COUNTRIES.filter(c => c.code !== 'IN').map(c => {
                      const isSelected = selected?.code === c.code;
                      return (
                        <Line
                          key={`line-${c.code}`}
                          from={[77, 20]}
                          to={[c.lng, c.lat]}
                          stroke={isSelected ? CR : 'rgba(17,17,17,0.1)'}
                          strokeWidth={isSelected ? 1.5 : 0.8}
                          strokeDasharray={isSelected ? "1000" : "4 3"}
                          strokeDashoffset={0}
                          opacity={isSelected ? 1 : 0.4}
                          style={{ 
                            transition: 'stroke 0.3s, stroke-width 0.3s, opacity 0.3s',
                            animation: isSelected ? 'ew-line-draw 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'
                          }}
                        />
                      );
                    })}

                    {/* Country dots */}
                    {COUNTRIES.map(c => {
                      const isSelected = selected?.code === c.code;
                      return (
                        <Marker key={c.code} coordinates={[c.lng, c.lat]} onClick={() => setSelected(c)}>
                          <g style={{ cursor: 'pointer' }}>
                            {/* Pulse ring */}
                            {isSelected && (
                              <circle r={14}
                                fill="none" stroke={CR} strokeWidth="1.5" opacity="0.4"
                                style={{ animation: 'ew-dot-ring 1.5s ease-out infinite' }}/>
                            )}
                            {/* Main dot */}
                            <circle
                              r={isSelected ? 8 : 6}
                              fill={isSelected ? CR : c.code === 'IN' ? GOLD : 'rgba(17,17,17,0.6)'}
                              stroke="#fff" strokeWidth="2"
                              style={{ transition: 'r 0.25s, fill 0.25s' }}
                            />
                            {/* Country code label */}
                            <text y={-14}
                              fill={isSelected ? CR : 'rgba(0,0,0,0.5)'}
                              fontSize={isSelected ? 9 : 7}
                              fontWeight={isSelected ? 700 : 500}
                              textAnchor="middle"
                              style={{ fontFamily: 'monospace', pointerEvents: 'none', transition: 'font-size 0.2s' }}
                            >
                              {c.code}
                            </text>
                          </g>
                        </Marker>
                      );
                    })}
                  </ZoomableGroup>
                </ComposableMap>

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
