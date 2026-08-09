'use client';

import { useState, useRef } from 'react';

const CRIMSON = '#AC033B';
const SERIF   = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS    = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO    = 'var(--font-mono), "JetBrains Mono", monospace';

// ── Pin coordinates calibrated against map.png (969×460px) ──
// map.png has subtle whitespace; landmasses start ~5% L, ~8% T
// left% = x / 969 * 100,  top% = y / 460 * 100
const PINS: { country: string; left: number; top: number; major?: boolean }[] = [
  // Americas
  { country: 'USA',          left: 16.5, top: 32.5, major: true  },
  { country: 'Canada',       left: 16.0, top: 20.0              },
  { country: 'Mexico',       left: 13.5, top: 44.5              },
  { country: 'Brazil',       left: 27.5, top: 65.0, major: true  },
  { country: 'Chile',        left: 23.0, top: 76.5              },
  { country: 'Colombia',     left: 21.5, top: 54.0              },
  // Europe
  { country: 'UK',           left: 44.8, top: 22.0              },
  { country: 'Germany',      left: 47.5, top: 21.0              },
  { country: 'France',       left: 46.0, top: 25.5              },
  { country: 'Netherlands',  left: 46.8, top: 19.5              },
  { country: 'Spain',        left: 43.5, top: 28.0              },
  { country: 'Italy',        left: 48.3, top: 27.8              },
  { country: 'Poland',       left: 50.0, top: 19.8              },
  { country: 'Russia',       left: 60.0, top: 16.0              },
  { country: 'Ukraine',      left: 52.5, top: 22.5              },
  { country: 'Greece',       left: 50.5, top: 29.0              },
  // Middle East
  { country: 'Turkey',       left: 53.8, top: 28.5              },
  { country: 'UAE',          left: 60.5, top: 42.0, major: true  },
  { country: 'Saudi Arabia', left: 57.5, top: 41.0              },
  { country: 'Egypt',        left: 52.5, top: 38.0              },
  // Africa
  { country: 'Nigeria',      left: 47.0, top: 54.0              },
  { country: 'Kenya',        left: 55.5, top: 57.5              },
  { country: 'South Africa', left: 51.0, top: 77.0              },
  // South & Southeast Asia
  { country: 'Pakistan',     left: 63.0, top: 37.5              },
  { country: 'India',        left: 65.0, top: 44.0, major: true  },
  { country: 'Bangladesh',   left: 67.8, top: 41.0              },
  { country: 'Sri Lanka',    left: 65.8, top: 52.0              },
  { country: 'Thailand',     left: 73.5, top: 47.0              },
  { country: 'Vietnam',      left: 75.2, top: 47.5              },
  { country: 'Malaysia',     left: 74.5, top: 55.0              },
  { country: 'Singapore',    left: 75.0, top: 57.5              },
  { country: 'Indonesia',    left: 77.0, top: 60.0              },
  { country: 'Philippines',  left: 78.5, top: 48.5              },
  // East Asia & Oceania
  { country: 'China',        left: 72.5, top: 32.0, major: true  },
  { country: 'South Korea',  left: 79.5, top: 30.5              },
  { country: 'Japan',        left: 81.5, top: 29.5              },
  { country: 'Australia',    left: 82.5, top: 71.0, major: true  },
  { country: 'New Zealand',  left: 88.0, top: 79.0              },
];

interface TooltipState { country: string; x: number; y: number; }

// SVG location pin icon — teardrop with inner circle
function PinIcon({ size, color, glowing }: { size: number; color: string; glowing: boolean }) {
  return (
    <svg
      width={size}
      height={size * 1.35}
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: glowing ? `drop-shadow(0 0 5px ${color})` : `drop-shadow(0 2px 3px rgba(0,0,0,0.25))`,
        transition: 'filter 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        transform: glowing ? 'scale(1.3) translateY(-2px)' : 'scale(1)',
        display: 'block',
      }}
    >
      <path
        d="M12 0C7.03 0 3 4.03 3 9c0 6.75 9 19 9 19s9-12.25 9-19c0-4.97-4.03-9-9-9z"
        fill={color}
      />
      <circle cx="12" cy="9" r="4" fill="white" />
    </svg>
  );
}

export default function GlobalPresenceMap() {
  const [tooltip,    setTooltip]    = useState<TooltipState | null>(null);
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
        padding: 'clamp(40px, 6vw, 80px) 0 clamp(32px, 4vw, 56px)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Subtle warm glow behind map */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 55% at 50% 60%, rgba(172,3,59,0.04) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 3vw, 40px)' }}>
          <p style={{
            fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: CRIMSON,
            marginBottom: 10, fontWeight: 700,
          }}>
            Global Export Network
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
            Reaching{' '}
            <span style={{ fontStyle: 'italic', color: CRIMSON }}>40+</span>{' '}
            Countries.
          </h2>
          <p style={{
            fontFamily: SANS,
            fontSize: 'clamp(13px, 1.1vw, 15px)',
            color: 'rgba(0,0,0,0.45)',
            maxWidth: 440,
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            From India&apos;s spice heartland to every continent — serving bulk buyers worldwide with full traceability.
          </p>
        </div>

        {/* Map */}
        <div
          ref={mapRef}
          style={{ position: 'relative', width: '100%', userSelect: 'none' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/map.png"
            alt="World map showing LV Spices export destinations"
            style={{
              width: '100%', height: 'auto', display: 'block',
              pointerEvents: 'none', userSelect: 'none',
            }}
            draggable={false}
          />

          {/* Pins */}
          {PINS.map((pin) => {
            const isHov  = hoveredPin === pin.country;
            const sz     = pin.major ? 20 : 15;
            return (
              <button
                key={pin.country}
                aria-label={`Export destination: ${pin.country}`}
                onMouseEnter={(e) => handleEnter(pin.country, e)}
                onMouseMove={(e)  => handleMove(pin.country, e)}
                onMouseLeave={handleLeave}
                onTouchStart={() => setHoveredPin(pin.country)}
                onTouchEnd={() => setTimeout(() => setHoveredPin(null), 1600)}
                style={{
                  position: 'absolute',
                  left: `${pin.left}%`,
                  top:  `${pin.top}%`,
                  // anchor at the tip of the pin (bottom-center)
                  transform: 'translate(-50%, -100%)',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  zIndex: isHov ? 30 : pin.major ? 10 : 5,
                  lineHeight: 0,
                }}
              >
                <PinIcon size={sz} color={CRIMSON} glowing={isHov} />
              </button>
            );
          })}

          {/* Tooltip */}
          {tooltip && (
            <div style={{
              position: 'absolute',
              left: tooltip.x + 14,
              top:  tooltip.y - 44,
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
              boxShadow: '0 4px 20px rgba(172,3,59,0.45)',
              animation: 'tooltipIn 0.12s ease',
            }}>
              {tooltip.country}
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
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
