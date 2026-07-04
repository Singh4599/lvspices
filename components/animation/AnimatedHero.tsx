'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import CountUp from '@/components/animation/CountUp';

interface StatItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  /** If value is purely numeric, pass the number for CountUp */
  numeric?: number;
  suffix?: string;
  prefix?: string;
}

interface AnimatedHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  stats?: StatItem[];
  imageSrc: string;
  imageAlt: string;
  cta?: React.ReactNode;
  /** Optional: floating particle theme */
  particles?: 'spice' | 'leaf' | 'frost' | 'none';
}

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.04, x: 24 },
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.9, ease: 'easeOut' as const, delay: 0.2 } },
};

/**
 * AnimatedHero — replaces the static split-hero-grid on all interior pages.
 * Left: staggered text reveal + CountUp stats.
 * Right: Image with mouse-following 3D tilt.
 * Background: optional floating particles.
 */
export default function AnimatedHero({
  eyebrow,
  title,
  description,
  stats,
  imageSrc,
  imageAlt,
  cta,
  particles = 'spice',
}: AnimatedHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      setTilt({ x: dy * -8, y: dx * 8 });
    });
  };

  const handleMouseLeave = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      style={{
        paddingTop: 'clamp(120px, 9vw, 160px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '520px',
          alignItems: 'stretch',
          position: 'relative',
          zIndex: 1,
        }}
        className="split-hero-grid"
      >
        {/* LEFT — animated text */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate="visible"
          style={{
            paddingLeft: 'clamp(1.5rem, 6vw, 8rem)',
            paddingRight: 'clamp(2rem, 4vw, 5rem)',
            paddingBottom: '80px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}
          >
            <div style={{ width: '36px', height: '1.5px', background: '#AC033B', flexShrink: 0 }} />
            <span
              className="font-mono uppercase text-[#AC033B]"
              style={{ fontSize: '11px', letterSpacing: '0.28em' }}
            >
              {eyebrow}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold text-white"
            style={{
              fontSize: 'clamp(2.8rem, 5vw, 5.2rem)',
              lineHeight: '0.92',
              letterSpacing: '-0.02em',
              marginBottom: '28px',
            }}
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-white/45 leading-relaxed"
            style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', maxWidth: '440px', marginBottom: '48px' }}
          >
            {description}
          </motion.p>

          {/* Stats */}
          {stats && (
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', gap: '36px', flexWrap: 'wrap' }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  {s.icon && (
                    <div className="text-[#AC033B]" style={{ marginBottom: '8px', opacity: 0.7 }}>
                      {s.icon}
                    </div>
                  )}
                  <div
                    className="font-mono font-bold text-[#AC033B]"
                    style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', lineHeight: 1, marginBottom: '4px' }}
                  >
                    {s.numeric !== undefined ? (
                      <CountUp to={s.numeric} prefix={s.prefix} suffix={s.suffix} />
                    ) : (
                      s.value
                    )}
                  </div>
                  <div
                    className="font-mono uppercase text-white/35"
                    style={{ fontSize: '10px', letterSpacing: '0.15em' }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Optional CTA */}
          {cta && (
            <motion.div variants={itemVariants} style={{ marginTop: '40px' }}>
              {cta}
            </motion.div>
          )}
        </motion.div>

        {/* RIGHT — 3D tilt image */}
        <motion.div
          variants={imageVariants}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate="visible"
          style={{ position: 'relative', minHeight: '480px', padding: '24px 32px 24px 0', perspective: '1000px' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={imageWrapRef}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '24px',
              overflow: 'hidden',
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: shouldReduceMotion ? 'none' : 'transform 0.15s ease-out',
              willChange: 'transform',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="50vw"
              className="object-cover"
              style={{ transition: 'transform 0.4s ease-out', transform: `scale(${1 + Math.abs(tilt.x) * 0.003 + Math.abs(tilt.y) * 0.003})` }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(255,255,255,0.12) 0%, transparent 20%)',
              }}
            />
            {/* Shimmer highlight on tilt */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse at ${50 + tilt.y * 3}% ${50 + tilt.x * 3}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
                transition: 'background 0.15s ease-out',
                pointerEvents: 'none',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
