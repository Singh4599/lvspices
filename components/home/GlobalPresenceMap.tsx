'use client';

import { useState, useRef } from 'react';

const CRIMSON = '#111111';
const SERIF   = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS    = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO    = 'var(--font-mono), "JetBrains Mono", monospace';

// ── Coordinates calibrated via pixel-density scan of map.png (969×460px) ──
// Reference anchors (measured): UK(0°E,51°N)→43.9%,25%; India(78°E,20°N)→70%,46.3%; Japan→81.9%,35%
const PINS: { country: string; left: number; top: number; major?: boolean }[] = [
  // Americas
  { country: 'USA',           left: 17.0, top: 33.9, major: true  },
  { country: 'Canada',        left: 17.6, top: 20.5              },
  { country: 'Mexico',        left: 14.4, top: 44.2              },
  { country: 'Brazil',        left: 30.7, top: 63.3, major: true  },
  { country: 'Chile',         left: 24.8, top: 77.0              },
  { country: 'Colombia',      left: 23.9, top: 55.4              },
  { country: 'Argentina',     left: 26.5, top: 77.6              },
  { country: 'Peru',          left: 23.3, top: 62.8              },
  // Europe
  { country: 'UK',            left: 43.9, top: 22.3              },
  { country: 'Ireland',       left: 41.9, top: 23.2              },
  { country: 'France',        left: 44.6, top: 28.4              },
  { country: 'Spain',         left: 42.9, top: 32.6              },
  { country: 'Portugal',      left: 41.9, top: 33.2              },
  { country: 'Germany',       left: 47.2, top: 25.0              },
  { country: 'Netherlands',   left: 45.6, top: 24.1              },
  { country: 'Italy',         left: 47.9, top: 31.2              },
  { country: 'Poland',        left: 50.6, top: 24.1              },
  { country: 'Sweden',        left: 49.9, top: 16.9              },
  { country: 'Norway',        left: 47.2, top: 15.2              },
  { country: 'Denmark',       left: 47.2, top: 20.5              },
  { country: 'Finland',       left: 52.6, top: 15.2              },
  { country: 'Ukraine',       left: 54.6, top: 26.4              },
  { country: 'Romania',       left: 52.3, top: 29.1              },
  { country: 'Greece',        left: 51.3, top: 33.2              },
  { country: 'Austria',       left: 48.6, top: 27.7              },
  { country: 'Czech Republic',left: 49.3, top: 25.7              },
  { country: 'Russia',        left: 62.3, top: 16.9              },
  // Middle East
  { country: 'Turkey',        left: 55.6, top: 33.2              },
  { country: 'Israel',        left: 55.6, top: 38.7              },
  { country: 'Iraq',          left: 58.6, top: 37.4              },
  { country: 'Iran',          left: 61.6, top: 38.1              },
  { country: 'Saudi Arabia',  left: 59.0, top: 43.6              },
  { country: 'Yemen',         left: 58.6, top: 49.1              },
  { country: 'Oman',          left: 63.0, top: 45.6              },
  { country: 'UAE',           left: 62.0, top: 43.6, major: true  },
  { country: 'Kuwait',        left: 59.6, top: 40.1              },
  { country: 'Qatar',         left: 61.0, top: 42.9              },
  // Africa
  { country: 'Egypt',         left: 53.9, top: 42.2              },
  { country: 'Libya',         left: 49.6, top: 41.5              },
  { country: 'Algeria',       left: 44.9, top: 40.8              },
  { country: 'Morocco',       left: 42.6, top: 38.1              },
  { country: 'Sudan',         left: 54.6, top: 49.1              },
  { country: 'Ethiopia',      left: 57.3, top: 53.1              },
  { country: 'Kenya',         left: 56.3, top: 57.6              },
  { country: 'Tanzania',      left: 55.6, top: 61.1              },
  { country: 'Nigeria',       left: 46.6, top: 52.5              },
  { country: 'Ghana',         left: 43.6, top: 53.7              },
  { country: 'Angola',        left: 49.9, top: 64.5              },
  { country: 'South Africa',  left: 52.3, top: 74.4, major: true  },
  { country: 'Madagascar',    left: 59.6, top: 69.0              },
  // South & Central Asia
  { country: 'Kazakhstan',    left: 66.3, top: 27.1              },
  { country: 'Afghanistan',   left: 65.7, top: 37.4              },
  { country: 'Pakistan',      left: 67.3, top: 39.4              },
  { country: 'India',         left: 70.0, top: 46.3, major: true  },
  { country: 'Nepal',         left: 71.3, top: 40.8              },
  { country: 'Bangladesh',    left: 72.5, top: 43.6              },
  { country: 'Sri Lanka',     left: 70.6, top: 53.1              },
  { country: 'Myanmar',       left: 73.8, top: 45.6              },
  // Southeast Asia
  { country: 'Thailand',      left: 74.8, top: 49.1              },
  { country: 'Vietnam',       left: 75.8, top: 48.6              },
  { country: 'Cambodia',      left: 75.6, top: 50.8              },
  { country: 'Malaysia',      left: 77.1, top: 55.9              },
  { country: 'Singapore',     left: 75.4, top: 57.1              },
  { country: 'Indonesia',     left: 78.4, top: 58.8              },
  { country: 'Philippines',   left: 79.2, top: 50.8              },
  // East Asia
  { country: 'China',         left: 75.4, top: 36.0, major: true  },
  { country: 'South Korea',   left: 80.4, top: 34.6              },
  { country: 'Japan',         left: 82.6, top: 35.3, major: true  },
  { country: 'Taiwan',        left: 79.0, top: 43.6              },
  // Oceania
  { country: 'Australia',     left: 81.7, top: 71.8, major: true  },
  { country: 'New Zealand',   left: 91.3, top: 82.2              },
];

// SVG teardrop map-pin with white inner circle
function PinIcon({ size, hovered }: { size: number; hovered: boolean }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.4)}
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: 'block',
        filter: hovered
          ? `drop-shadow(0 0 6px #1a56dbcc)`
          : `drop-shadow(0 2px 3px rgba(0,0,0,0.22))`,
        transform: hovered ? 'scale(1.35) translateY(-3px)' : 'scale(1)',
        transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), filter 0.2s',
      }}
    >
      {/* Teardrop body */}
      <path
        d="M12 0C7.03 0 3 4.03 3 9c0 7.25 9 21 9 21s9-13.75 9-21c0-4.97-4.03-9-9-9z"
        fill="#1a56db"
      />
      {/* Inner white circle */}
      <circle cx="12" cy="9" r="4" fill="white" />
    </svg>
  );
}

interface TooltipState { country: string; x: number; y: number; }

export default function GlobalPresenceMap() {
  const [tooltip,     setTooltip]    = useState<TooltipState | null>(null);
  const [hoveredPin,  setHoveredPin] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleEnter = (country: string, e: React.MouseEvent) => {
    const r = mapRef.current?.getBoundingClientRect();
    if (!r) return;
    setTooltip({ country, x: e.clientX - r.left, y: e.clientY - r.top });
    setHoveredPin(country);
  };
  const handleMove = (country: string, e: React.MouseEvent) => {
    const r = mapRef.current?.getBoundingClientRect();
    if (!r) return;
    setTooltip({ country, x: e.clientX - r.left, y: e.clientY - r.top });
  };
  const handleLeave = () => { setTooltip(null); setHoveredPin(null); };

  return (
    <section
      id="section-global-presence"
      style={{
        background: '#fff',
        padding: 'clamp(40px, 6vw, 80px) 0 clamp(32px, 4vw, 56px)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Radial warm tint */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 55% at 50% 60%, rgba(17,17,17,0.04) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 3vw, 40px)' }}>
          <p style={{
            fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: CRIMSON,
            marginBottom: 10, fontWeight: 700,
          }}>
            Our Reach
          </p>
          <h2 style={{
            fontFamily: SERIF,
            fontSize: 'clamp(28px, 5vw, 64px)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#111',
            margin: '0 0 12px',
          }}>
            Global{' '}
            <span style={{ color: '#111' }}>Presence.</span>
          </h2>
          <p style={{
            fontFamily: SANS,
            fontSize: 'clamp(13px, 1.1vw, 15px)',
            color: 'rgba(0,0,0,0.45)',
            maxWidth: 440,
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            From India&apos;s spice heartland to every continent — trusted by buyers across the globe.
          </p>
        </div>

        {/* ── Map ── */}
        <div
          ref={mapRef}
          style={{ position: 'relative', width: '100%', userSelect: 'none' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/map.png"
            alt="World map showing LV Spices global presence"
            style={{
              width: '100%', height: 'auto', display: 'block',
              pointerEvents: 'none', userSelect: 'none',
            }}
            draggable={false}
          />

          {/* Pins */}
          {PINS.map((pin) => {
            const isHov = hoveredPin === pin.country;
            const sz    = pin.major ? 18 : 13;
            return (
              <button
                key={pin.country}
                aria-label={`${pin.country} — LV Spices export destination`}
                onMouseEnter={(e) => handleEnter(pin.country, e)}
                onMouseMove={(e)  => handleMove(pin.country, e)}
                onMouseLeave={handleLeave}
                onTouchStart={() => setHoveredPin(pin.country)}
                onTouchEnd={() => setTimeout(() => setHoveredPin(null), 1600)}
                style={{
                  position: 'absolute',
                  left: `${pin.left}%`,
                  top:  `${pin.top}%`,
                  // anchor the TIP of the pin (bottom-centre) to the coordinate
                  transform: 'translate(-50%, -100%)',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  zIndex: isHov ? 30 : pin.major ? 10 : 5,
                  lineHeight: 0,
                  // Add touch target padding without affecting layout
                  outline: 'none',
                }}
              >
                <PinIcon size={sz} hovered={isHov} />
              </button>
            );
          })}

          {/* Tooltip */}
          {tooltip && (
            <div
              role="tooltip"
              style={{
                position: 'absolute',
                left: tooltip.x + 14,
                top:  tooltip.y - 46,
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
                boxShadow: '0 4px 20px rgba(17,17,17,0.45)',
                animation: 'gpTooltipIn 0.12s ease',
              }}
            >
              {tooltip.country}
              {/* Arrow */}
              <span style={{
                position: 'absolute',
                bottom: -5, left: 12,
                width: 10, height: 10,
                background: CRIMSON,
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }} />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes gpTooltipIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
