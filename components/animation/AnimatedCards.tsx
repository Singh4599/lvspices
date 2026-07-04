'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface CardItem {
  number: string;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  bullets?: string[];
  badge?: string;
  extra?: React.ReactNode;
}

interface AnimatedCardsProps {
  cards: CardItem[];
  columns?: 2 | 3 | 4;
  /** Show connector line between steps */
  showFlow?: boolean;
}


/**
 * AnimatedCard — single card with 3D tilt on hover, stagger on scroll.
 */
function AnimatedCard({ card, index }: { card: CardItem; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0, glow: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6, glow: true });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0, glow: false });

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: { opacity: 0, y: 48 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            ease: 'easeOut' as const,
            delay: index * 0.1,
          },
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: 'clamp(24px, 3vw, 36px)',
        display: 'flex',
        flexDirection: 'column',
        transition: shouldReduceMotion ? 'none' : 'box-shadow 0.3s ease, transform 0.15s ease-out',
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        boxShadow: tilt.glow
          ? '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(172,3,59,0.2)'
          : '0 2px 12px rgba(0,0,0,0.4)',
        willChange: 'transform',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      {/* Number watermark */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: '16px',
          right: '20px',
          fontFamily: 'var(--font-display), Georgia, serif',
          fontSize: '5rem',
          fontWeight: 700,
          lineHeight: 1,
          color: '#fff',
          opacity: tilt.glow ? 0.08 : 0.04,
          transition: 'opacity 0.3s',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {card.number}
      </span>

      {/* Shimmer glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          background: tilt.glow
            ? `radial-gradient(ellipse at ${50 + tilt.y * 5}% ${50 + tilt.x * 5}%, rgba(172,3,59,0.05) 0%, transparent 60%)`
            : 'none',
          transition: 'background 0.15s ease-out',
          pointerEvents: 'none',
        }}
      />

      {/* Icon */}
      {card.icon && (
        <motion.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.12, rotate: 5 }}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '13px',
            background: 'rgba(172,3,59,0.15)',
            border: '1px solid rgba(172,3,59,0.25)',
            marginBottom: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#AC033B',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {card.icon}
        </motion.div>
      )}

      {/* Title */}
      <h3
        className="font-display font-bold text-white"
        style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', lineHeight: 1.2, marginBottom: card.subtitle ? '4px' : '18px', position: 'relative', zIndex: 1 }}
      >
        {card.title}
      </h3>

      {/* Subtitle */}
      {card.subtitle && (
        <p
          className="font-mono text-white/30 uppercase"
          style={{ fontSize: '10px', letterSpacing: '0.1em', marginBottom: '18px', position: 'relative', zIndex: 1 }}
        >
          {card.subtitle}
        </p>
      )}

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: 'rgba(255,255,255,0.08)',
          marginBottom: '20px',
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* Bullets */}
      {card.bullets && (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '9px', flex: 1, position: 'relative', zIndex: 1 }}>
          {card.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 + i * 0.06, duration: 0.5, ease: 'easeOut' }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}
            >
              <span
                className="text-[#AC033B] font-bold shrink-0"
                style={{ fontSize: '12px', lineHeight: '1.65' }}
              >
                —
              </span>
              <span className="text-white/55" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                {b}
              </span>
            </motion.li>
          ))}
        </ul>
      )}

      {/* Badge */}
      {card.badge && (
        <div style={{ marginTop: '20px', position: 'relative', zIndex: 1 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'rgba(172,3,59,0.06)',
              fontSize: '11px',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              color: '#AC033B',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#AC033B',
                display: 'inline-block',
                animation: 'lv-pulse-dot 1.8s ease-in-out infinite',
              }}
            />
            {card.badge}
          </span>
        </div>
      )}

      {/* Extra slot */}
      {card.extra && (
        <div style={{ marginTop: '20px', position: 'relative', zIndex: 1 }}>{card.extra}</div>
      )}
    </motion.div>
  );
}

/**
 * AnimatedCards — replaces all static `infrastructure-grid` sections.
 * Cards stagger-reveal on scroll. Each card has 3D tilt + glow on hover.
 */
export default function AnimatedCards({ cards, columns = 4 }: AnimatedCardsProps) {

  const gridCols =
    columns === 4
      ? 'repeat(auto-fill, minmax(260px, 1fr))'
      : columns === 3
      ? 'repeat(auto-fill, minmax(300px, 1fr))'
      : 'repeat(auto-fill, minmax(360px, 1fr))';

  return (
    <>
      <style>{`
        @keyframes lv-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }
      `}</style>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: gridCols,
          gap: '20px',
        }}
      >
        {cards.map((card, i) => (
          <AnimatedCard key={card.number} card={card} index={i} />
        ))}
      </div>
    </>
  );
}
