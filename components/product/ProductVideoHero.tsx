'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Package, Shield, Users, Award } from 'lucide-react';

const VIDEO_SRC = '/product-loop.mp4';

// Particle configs
const PARTICLE_COLORS = {
  spice: ['#AC033B', '#e8975c', '#c8a96e', '#AC033B'],
  leaf: ['#2d8f4e', '#5ab870', '#91c788', '#3aad5e'],
  frost: ['#a8d4f5', '#deeffe', '#7fb3e8', '#c5e4fb'],
  none: [],
};

function FloatingParticles({ theme }: { theme: 'spice' | 'leaf' | 'frost' | 'none' }) {
  if (theme === 'none') return null;
  const colors = PARTICLE_COLORS[theme];

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <style>{`
        @keyframes lv-float-particle {
          0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-120px) translateX(var(--lv-px, 20px)) rotate(360deg); opacity: 0; }
        }
        .lv-particle {
          position: absolute;
          border-radius: 50%;
          animation: lv-float-particle var(--lv-dur, 6s) var(--lv-delay, 0s) ease-in-out infinite;
          will-change: transform, opacity;
        }
      `}</style>
      {Array.from({ length: 18 }).map((_, i) => {
        const size = 3 + Math.random() * 5;
        const color = colors[i % colors.length];
        return (
          <div
            key={i}
            className="lv-particle"
            style={{
              width: size,
              height: size,
              background: color,
              left: `${5 + Math.random() * 90}%`,
              bottom: `${Math.random() * 40}%`,
              opacity: 0,
              // @ts-ignore CSS custom properties
              '--lv-dur': `${4 + Math.random() * 5}s`,
              '--lv-delay': `${Math.random() * 5}s`,
              '--lv-px': `${(Math.random() - 0.5) * 60}px`,
            }}
          />
        );
      })}
    </div>
  );
}

interface ProductVideoHeroProps {
  categoryName: string;
  categoryIndex: number;
  description: string;
  productsCount: number;
  buyerTypesCount: number;
  certificationsCount: number;
  moq: string;
  certifications: string[];
}

export default function ProductVideoHero({
  categoryName,
  categoryIndex,
  description,
  productsCount,
  buyerTypesCount,
  certificationsCount,
  moq,
  certifications,
}: ProductVideoHeroProps) {

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '-80px',
        paddingTop: '140px',
      }}
    >
      {/* ── Animated Background ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: 'hidden',
          background: '#0a0a0a',
        }}
      >
        <FloatingParticles theme="spice" />

        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom,
              #0a0a0a 0%,
              rgba(10,10,10,0.8) 15%,
              rgba(10,10,10,0.4) 45%,
              rgba(10,10,10,0.8) 85%,
              #0a0a0a 100%
            )`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      </div>

      {/* ── Hero Content ── */}
      <div
        className="pvh-content-wrap"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '900px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Category Label */}
        <div
          className="pvh-anim-1"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '28px',
          }}
        >
          <div style={{ width: '36px', height: '1.5px', background: '#AC033B', flexShrink: 0 }} />
          <span
            className="font-mono"
            style={{
              fontSize: '11px',
              letterSpacing: '0.28em',
              color: '#AC033B',
              textTransform: 'uppercase',
            }}
          >
            Category {String(categoryIndex + 1).padStart(2, '0')}
          </span>
          <div style={{ width: '36px', height: '1.5px', background: '#AC033B', flexShrink: 0 }} />
        </div>

        {/* Headline */}
        <h1
          className="pvh-anim-1 pvh-headline font-display"
          style={{
            fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-2.46px',
            fontWeight: 700,
            margin: 0,
            maxWidth: '100%',
            textWrap: 'balance',
          }}
        >
          <span style={{ color: '#ffffff' }}>{categoryName}</span>
          <br />
          <span
            className="font-serif"
            style={{
              color: '#AC033B',
              fontWeight: 500,
              fontStyle: 'italic',
            }}
          >
            crafted to perfection.
          </span>
        </h1>

        {/* Description */}
        <p
          className="pvh-anim-2"
          style={{
            fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '540px',
            marginTop: '32px',
          }}
        >
          {description}
        </p>

        {/* Stats — moved up, replacing chips */}
        <div
          className="pvh-anim-2 pvh-stats-row"
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: productsCount, label: 'Products' },
            { value: buyerTypesCount, label: 'Buyer Types' },
            { value: certificationsCount, label: 'Certifications' },
          ].map((s) => (
            <div
              key={s.label}
              className="pvh-stat-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.72)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.9)',
                borderRadius: '16px',
                padding: '14px 10px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                flex: 1,
                maxWidth: '160px',
                minWidth: '140px',
              }}
            >
              <span
                className="font-mono pvh-stat-num"
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: '#AC033B',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}
              >
                {s.value}+
              </span>
              <span
                className="font-mono pvh-stat-label"
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.18em',
                  color: 'rgba(255,255,255,0.45)',
                  textTransform: 'uppercase',
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

        {/* CTA Buttons */}
        <div
          className="pvh-anim-3 pvh-cta-wrap"
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '36px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <Link
            href="/contact"
            className="pvh-btn-primary-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 48px',
              background: '#AC033B',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              borderRadius: '999px',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(172,3,59,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Request Quotation
          </Link>
          <Link
            href="/products"
            className="pvh-btn-outline-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 48px',
              background: 'transparent',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              borderRadius: '999px',
              border: '1.5px solid rgba(0,0,0,0.12)',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.borderColor = '#AC033B';
              e.currentTarget.style.color = '#AC033B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)';
              e.currentTarget.style.color = '#000000';
            }}
          >
            All Products
          </Link>
        </div>

      {/* ── Scroll indicator ── */}
      <div
        className="pvh-anim-3"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: '1px',
            height: '28px',
            background: 'rgba(0,0,0,0.15)',
            animation: 'pvh-scroll-pulse 2s ease-in-out infinite',
          }}
        />
        <span
          className="font-mono"
          style={{
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
      </div>

      {/* Inline style for animations */}
      <style jsx>{`
        @keyframes pvh-fade-rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pvh-scroll-pulse {
          0%, 100% { opacity: 0.3; height: 28px; }
          50%      { opacity: 0.6; height: 44px; }
        }
        .pvh-anim-1 {
          opacity: 0;
          animation: pvh-fade-rise 0.8s ease-out forwards;
        }
        .pvh-anim-2 {
          opacity: 0;
          animation: pvh-fade-rise 0.8s ease-out 0.2s forwards;
        }
        .pvh-anim-3 {
          opacity: 0;
          animation: pvh-fade-rise 0.8s ease-out 0.4s forwards;
        }

        /* ── Mobile Responsive ── */
        @media (max-width: 768px) {
          section {
            min-height: 100svh !important;
            padding-top: 180px !important;
          }

          /* Left-align REMOVED — keep centered on mobile too */
          .pvh-content-wrap {
            padding: 0 20px !important;
            max-width: 100% !important;
          }

          /* Larger, bolder headline on mobile with perfect symmetry */
          .pvh-headline {
            font-size: clamp(3.2rem, 14vw, 4rem) !important;
            line-height: 0.95 !important;
            letter-spacing: -2px !important;
            text-wrap: balance !important;
          }

          /* Category label smaller gap on mobile */
          .pvh-anim-1:first-child {
            margin-bottom: 20px !important;
          }

          /* Full-width stacked buttons */
          .pvh-cta-wrap {
            flex-direction: column !important;
            width: 100% !important;
            gap: 10px !important;
          }
          .pvh-btn-primary-link,
          .pvh-btn-outline-link {
            width: 100% !important;
            padding: 15px 24px !important;
            font-size: 15px !important;
          }

          /* Compact stats: 1 row on mobile */
          .pvh-stats-row {
            gap: 8px !important;
            flex-wrap: nowrap !important;
            width: 100% !important;
            justify-content: space-between !important;
          }
          .pvh-stat-card {
            padding: 10px 8px !important;
            min-width: 0 !important;
            flex: 1 !important;
            border-radius: 12px !important;
          }
          .pvh-stat-num {
            font-size: 1.35rem !important;
          }
          .pvh-stat-label {
            font-size: 7.5px !important;
            letter-spacing: 0.12em !important;
          }

          /* Chips wrap nicely */
          .pvh-anim-2 {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
