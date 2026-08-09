'use client';

import { useState, useRef } from 'react';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

// The dotted world map image (map.png) has whitespace padding on all sides.
// These pin coords are carefully calibrated to the actual land masses in the image.
// The image is ~978x480px. Landmass starts ~5% from left, ~8% from top.
const PINS: { country: string; left: number; top: number; major?: boolean }[] = [
  // ── Americas ──
  { country: 'USA',          left: 17.5, top: 31,   major: true },
  { country: 'Canada',       left: 16.5, top: 19 },
  { country: 'Mexico',       left: 13.5, top: 43 },
  { country: 'Brazil',       left: 27.5, top: 63,   major: true },
  { country: 'Chile',        left: 23,   top: 74 },
  { country: 'Colombia',     left: 22,   top: 53 },
  // ── Europe ──
  { country: 'UK',           left: 44,   top: 22 },
  { country: 'Germany',      left: 47,   top: 21 },
  { country: 'France',       left: 45.5, top: 24 },
  { country: 'Netherlands',  left: 46.5, top: 19 },
  { country: 'Spain',        left: 43,   top: 27 },
  { country: 'Italy',        left: 48,   top: 27 },
  { country: 'Poland',       left: 49.5, top: 20 },
  { country: 'Russia',       left: 60,   top: 15 },
  { country: 'Ukraine',      left: 52,   top: 22 },
  { country: 'Greece',       left: 50,   top: 29 },
  // ── Middle East & Africa ──
  { country: 'UAE',          left: 60.5, top: 40,   major: true },
  { country: 'Saudi Arabia', left: 57.5, top: 41 },
  { country: 'Turkey',       left: 53,   top: 28 },
  { country: 'Egypt',        left: 52,   top: 37 },
  { country: 'South Africa', left: 50,   top: 74 },
  { country: 'Nigeria',      left: 46.5, top: 52 },
  { country: 'Kenya',        left: 54.5, top: 57 },
  // ── Asia & Oceania ──
  { country: 'India',        left: 64.5, top: 43,   major: true },
  { country: 'China',        left: 72.5, top: 30,   major: true },
  { country: 'Japan',        left: 80.5, top: 28 },
  { country: 'South Korea',  left: 79,   top: 29 },
  { country: 'Thailand',     left: 72.5, top: 46 },
  { country: 'Vietnam',      left: 74.5, top: 46 },
  { country: 'Malaysia',     left: 74.5, top: 54 },
  { country: 'Singapore',    left: 75,   top: 56 },
  { country: 'Indonesia',    left: 77.5, top: 60 },
  { country: 'Australia',    left: 81.5, top: 70,   major: true },
  { country: 'Bangladesh',   left: 67.5, top: 42 },
  { country: 'Sri Lanka',    left: 65.5, top: 51 },
  { country: 'Philippines',  left: 78,   top: 48 },
  { country: 'Pakistan',     left: 62.5, top: 37 },
];

interface TooltipState { country: string; x: number; y: number; }

export default function GlobalPresenceMap() {
  const [tooltip, setTooltip]     = useState<TooltipState | null>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleEnter = (country: string, e: React.MouseEvent) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ country, x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHoveredPin(country);
  };
  const handleMove = (country: string, e: React.MouseEvent) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ country, x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleLeave = () => { setTooltip(null); setHoveredPin(null); };

  return (
    <section
      id="section-global-presence"
      style={{
        background: '#fff',
        padding: 'clamp(40px, 6vw, 80px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Subtle warm tint */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(172,3,59,0.04) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 3.5vw, 48px)' }}>
          <p style={{
            fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: CRIMSON,
            marginBottom: 12, fontWeight: 700,
          }}>
            Global Export Network
          </p>
          <h2 style={{
            fontFamily: SERIF,
            fontSize: 'clamp(30px, 5vw, 68px)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#111',
            margin: '0 0 14px',
          }}>
            Reaching{' '}
            <span style={{ fontStyle: 'italic', color: CRIMSON }}>40+</span>{' '}
            Countries.
          </h2>
          <p style={{
            fontFamily: SANS,
            fontSize: 'clamp(13px, 1.1vw, 16px)',
            color: 'rgba(0,0,0,0.45)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            From India&apos;s spice heartland to every continent — serving bulk buyers worldwide with full traceability.
          </p>
        </div>

        {/* MAP */}
        <div
          ref={mapRef}
          style={{ position: 'relative', width: '100%', userSelect: 'none' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/map.png"
            alt="World map showing LV Spices export destinations"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              pointerEvents: 'none',
              userSelect: 'none',
              opacity: 0.9,
            }}
            draggable={false}
          />

          {PINS.map((pin) => {
            const isHov   = hoveredPin === pin.country;
            const dot     = pin.major ? 10 : 7;
            const ring    = pin.major ? 24 : 17;
            return (
              <button
                key={pin.country}
                aria-label={`Export: ${pin.country}`}
                onMouseEnter={(e) => handleEnter(pin.country, e)}
                onMouseMove={(e)  => handleMove(pin.country, e)}
                onMouseLeave={handleLeave}
                onTouchStart={() => setHoveredPin(pin.country)}
                onTouchEnd={() => setTimeout(() => setHoveredPin(null), 1600)}
                style={{
                  position: 'absolute',
                  left: `${pin.left}%`,
                  top:  `${pin.top}%`,
                  transform: 'translate(-50%, -50%)',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  zIndex: isHov ? 20 : pin.major ? 10 : 5,
                  width: ring + 8,
                  height: ring + 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Pulsing ring */}
                <span style={{
                  position: 'absolute',
                  width: ring, height: ring,
                  borderRadius: '50%',
                  border: `1.5px solid ${CRIMSON}`,
                  opacity: isHov ? 1 : 0.5,
                  animation: isHov ? 'mapPingOut 0.85s ease-out infinite' : 'none',
                  transition: 'opacity 0.18s',
                }} />
                {/* Core dot */}
                <span style={{
                  display: 'block',
                  width: dot, height: dot,
                  borderRadius: '50%',
                  background: CRIMSON,
                  boxShadow: isHov
                    ? `0 0 0 2.5px #fff, 0 0 0 4px ${CRIMSON}, 0 0 14px ${CRIMSON}`
                    : `0 0 4px ${CRIMSON}88`,
                  transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                  transform: isHov ? 'scale(1.4)' : 'scale(1)',
                }} />
              </button>
            );
          })}

          {/* Tooltip */}
          {tooltip && (
            <div style={{
              position: 'absolute',
              left: tooltip.x + 14,
              top:  tooltip.y - 42,
              background: CRIMSON,
              color: '#fff',
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              padding: '6px 14px',
              borderRadius: 3,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              zIndex: 100,
              boxShadow: '0 4px 20px rgba(172,3,59,0.4)',
              animation: 'tooltipIn 0.12s ease',
            }}>
              {tooltip.country}
              <span style={{
                position: 'absolute',
                bottom: -5, left: 10,
                width: 10, height: 10,
                background: CRIMSON,
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }} />
            </div>
          )}
        </div>

        {/* Stats strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'clamp(24px, 5vw, 64px)',
          flexWrap: 'wrap',
          marginTop: 'clamp(28px, 4vw, 48px)',
          paddingTop: 'clamp(20px, 2.5vw, 32px)',
          borderTop: '1px solid rgba(0,0,0,0.07)',
        }}>
          {[
            { value: '40+',  label: 'Countries' },
            { value: '50+',  label: 'Years Export' },
            { value: '500+', label: 'Containers / Yr' },
            { value: '6',    label: 'Continents' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: SERIF,
                fontSize: 'clamp(22px, 3.5vw, 44px)',
                fontWeight: 700,
                fontStyle: 'italic',
                color: CRIMSON,
                lineHeight: 1,
                marginBottom: 5,
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: MONO,
                fontSize: 9,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.38)',
                fontWeight: 700,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes mapPingOut {
          0%   { transform: scale(1);   opacity: 0.85; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
