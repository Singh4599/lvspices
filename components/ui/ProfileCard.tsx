'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

/* ─── Sparkle particle helper ─────────────────────────────────────────────── */
function Sparkle({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x, top: y,
        width: 6, height: 6,
        borderRadius: '50%',
        background: color,
        pointerEvents: 'none',
        zIndex: 20,
      }}
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.4, 0],
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 60,
      }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
  );
}

/* ─── Types ────────────────────────────────────────────────────────────────── */
export interface ProfileCardProps {
  name: string;
  title: string;
  dept?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  avatarUrl?: string;
  initials?: string;
  accentColor?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  onContactClick?: () => void;
  behindGlowEnabled?: boolean;
  innerGradient?: string;
  /** Short tagline / fun fact shown on back face */
  backTagline?: string;
  /** Stats shown on the back face  e.g. [{ label:'Countries', value:'70+' }] */
  backStats?: { label: string; value: string }[];
}

/* ─── Main Component ────────────────────────────────────────────────────────── */
export default function ProfileCard({
  name,
  title,
  dept,
  handle,
  status = 'Active',
  contactText = 'Contact Me',
  avatarUrl,
  initials,
  accentColor = '#AC033B',
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick,
  behindGlowEnabled = true,
  innerGradient = 'linear-gradient(145deg, #ffffff 0%, #f4f6f8 100%)',
  backTagline,
  backStats,
}: ProfileCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped]           = useState(false);
  const [sparkles, setSparkles]         = useState<{ id: number; x: number; y: number }[]>([]);
  const [isMobile, setIsMobile]         = useState(false);
  const sparkleIdRef                    = useRef(0);

  /* mobile detection */
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Mouse-tracking for the glow orb (front face only) ─────────────────── */
  const orbX = useMotionValue(0.5);
  const orbY = useMotionValue(0.5);
  const orbXSpring = useSpring(orbX, { stiffness: 200, damping: 20 });
  const orbYSpring = useSpring(orbY, { stiffness: 200, damping: 20 });

  /* ── 3-D tilt (front face only) ────────────────────────────────────────── */
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, { stiffness: 280, damping: 28 });
  const tiltYSpring = useSpring(tiltY, { stiffness: 280, damping: 28 });
  const rotateX = useTransform(tiltYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(tiltXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  /* ── Shine (shimmer sweep) ──────────────────────────────────────────────── */
  const shinePos = useMotionValue(-100);
  const shineSpring = useSpring(shinePos, { stiffness: 120, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped || !wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;

    orbX.set(xPct);
    orbY.set(yPct);

    if (enableTilt && (!isMobile || enableMobileTilt)) {
      tiltX.set(xPct - 0.5);
      tiltY.set(yPct - 0.5);
    }

    // Shine tracks horizontal cursor
    shinePos.set((xPct - 0.5) * 200);
  }, [flipped, isMobile, enableTilt, enableMobileTilt, orbX, orbY, tiltX, tiltY, shinePos]);

  const handleMouseLeave = useCallback(() => {
    if (flipped) return;
    orbX.set(0.5); orbY.set(0.5);
    tiltX.set(0);  tiltY.set(0);
    shinePos.set(-100);
  }, [flipped, orbX, orbY, tiltX, tiltY, shinePos]);

  /* ── Sparkle burst on hover enter ──────────────────────────────────────── */
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const newSparkles = Array.from({ length: 7 }, () => ({
      id: ++sparkleIdRef.current,
      x: cx + (Math.random() - 0.5) * 40,
      y: cy + (Math.random() - 0.5) * 40,
    }));
    setSparkles(prev => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
    }, 900);
  }, []);

  /* ── Card dimensions for flip ───────────────────────────────────────────── */
  const CARD_H = 420;

  const cardStyle: React.CSSProperties = {
    width: '100%',
    height: CARD_H,
    position: 'relative',
    transformStyle: 'preserve-3d',
    cursor: 'pointer',
    borderRadius: 24,
  };

  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: 24,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    overflow: 'hidden',
  };

  return (
    <div
      style={{ perspective: '1000px', position: 'relative', width: '100%', maxWidth: 320, margin: '0 auto' }}
    >
      {/* ── Behind glow ───────────────────────────────────────────── */}
      {behindGlowEnabled && (
        <motion.div
          animate={{ opacity: flipped ? 0.5 : 0.7, scale: flipped ? 1.05 : 1 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'absolute',
            inset: -24,
            background: `radial-gradient(circle at center, ${accentColor}50 0%, transparent 65%)`,
            filter: 'blur(36px)',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* ── Card wrapper (handles flip) ───────────────────────────── */}
      <motion.div
        ref={wrapperRef}
        style={cardStyle}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={() => setFlipped(f => !f)}
        whileHover={{ y: flipped ? -4 : -8 }}
      >
        {/* ═══════════════════════════════════════════════════════════
            FRONT FACE
        ═══════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            ...faceStyle,
            background: innerGradient,
            boxShadow: '0 24px 56px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
            border: '1px solid rgba(0,0,0,0.06)',
            transformStyle: 'preserve-3d',
            rotateX: flipped ? 0 : rotateX,
            rotateY: flipped ? 0 : rotateY,
          }}
        >
          {/* Sparkles */}
          {sparkles.map(s => (
            <Sparkle key={s.id} x={s.x} y={s.y} color={accentColor} />
          ))}

          {/* Animated mouse-following glow orb */}
          <motion.div
            style={{
              position: 'absolute',
              width: 180, height: 180,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
              pointerEvents: 'none',
              zIndex: 1,
              left: useTransform(orbXSpring, v => `${v * 100}%`),
              top:  useTransform(orbYSpring, v => `${v * 100}%`),
              x: '-50%', y: '-50%',
              filter: 'blur(20px)',
            }}
          />

          {/* Shine / shimmer sweep */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0, bottom: 0,
              width: '60%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 5,
              left: useTransform(shineSpring, v => `calc(${v}% - 30%)`),
              filter: 'blur(4px)',
              transform: 'skewX(-15deg)',
            }}
          />

          {/* Top accent bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 4,
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88, ${accentColor})`,
            backgroundSize: '200% 100%',
          }}>
            {/* Animated shimmer on bar */}
            <motion.div
              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
            />
          </div>

          {/* Card content */}
          <div style={{
            position: 'relative', zIndex: 2,
            height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '32px 24px', gap: 16, transform: 'translateZ(0px)',
          }}>
            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={name}
                  style={{
                    width: 110, height: 110, borderRadius: '50%',
                    objectFit: 'cover', objectPosition: 'top',
                    border: `3px solid ${accentColor}`,
                    boxShadow: `0 8px 24px ${accentColor}40`,
                  }}
                />
              ) : (
                <div style={{
                  width: 110, height: 110, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 34, fontWeight: 800,
                  border: '3px solid rgba(255,255,255,0.6)',
                  boxShadow: `0 8px 24px ${accentColor}40`,
                }}>
                  {initials}
                </div>
              )}
              {/* Animated ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: -6, borderRadius: '50%',
                  border: `2px dashed ${accentColor}50`,
                  pointerEvents: 'none',
                }}
              />
              {/* Status dot */}
              {status && (
                <div style={{
                  position: 'absolute', bottom: 4, right: 4,
                  width: 16, height: 16, borderRadius: '50%',
                  background: '#10B981',
                  border: '3px solid #fff',
                  boxShadow: '0 0 0 2px #10B98140',
                }}>
                  {/* Pulse */}
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: '#10B98160' }}
                  />
                </div>
              )}
            </div>

            {/* Info */}
            {showUserInfo && (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 800, color: '#1A1915', letterSpacing: '-0.02em' }}>
                  {name}
                </h3>
                <p style={{ margin: '0 0 10px', fontSize: 13, color: 'rgba(0,0,0,0.55)', fontWeight: 500, lineHeight: 1.4 }}>
                  {title}
                </p>
                {dept && (
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 14px', borderRadius: 999,
                    background: `${accentColor}15`,
                    color: accentColor,
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                    border: `1px solid ${accentColor}30`,
                  }}>
                    {dept}
                  </span>
                )}
              </div>
            )}

            {/* Hint to flip */}
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: `${accentColor}12`,
                border: `1.5px solid ${accentColor}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: accentColor, fontSize: 14,
              }}>↻</div>
              <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>flip card</span>
            </motion.div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
            BACK FACE
        ═══════════════════════════════════════════════════════════ */}
        <div
          style={{
            ...faceStyle,
            background: `linear-gradient(145deg, ${accentColor} 0%, ${accentColor}cc 60%, #1A1915 100%)`,
            transform: 'rotateY(180deg)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '32px 28px', gap: 0,
            boxShadow: `0 24px 56px ${accentColor}40`,
          }}
        >
          {/* Animated noise-like dots background */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.08, 0.18, 0.08],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.25 }}
              style={{
                position: 'absolute',
                width: 8 + (i % 3) * 4, height: 8 + (i % 3) * 4,
                borderRadius: '50%',
                background: '#fff',
                left: `${10 + (i * 7) % 80}%`,
                top: `${5 + (i * 11) % 90}%`,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Shiny stripe sweep on back */}
          <motion.div
            animate={{ x: ['-150%', '250%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            style={{
              position: 'absolute', top: 0, bottom: 0, width: '40%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
              pointerEvents: 'none', transform: 'skewX(-15deg)',
            }}
          />

          {/* Back content */}
          <div style={{ position: 'relative', zIndex: 2, width: '100%', textAlign: 'center' }}>

            {/* Small avatar circle on back */}
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              border: '2.5px solid rgba(255,255,255,0.5)',
              margin: '0 auto 16px',
              overflow: 'hidden',
              backdropFilter: 'blur(8px)',
            }}>
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 20 }}>
                  {initials}
                </div>
              )}
            </div>

            {/* Name */}
            <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
              {name}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, margin: '0 0 20px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {dept || title}
            </p>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', marginBottom: 20 }} />

            {/* Tagline */}
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13.5, lineHeight: 1.6, margin: '0 0 20px', fontStyle: 'italic' }}>
              {backTagline || `Driving excellence in ${dept || 'every domain'} at LV Spices.`}
            </p>

            {/* Stats */}
            {backStats && backStats.length > 0 && (
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
                {backStats.map(st => (
                  <div key={st.label} style={{
                    background: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 12, padding: '10px 16px',
                    backdropFilter: 'blur(8px)',
                    minWidth: 70,
                  }}>
                    <div style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>{st.value}</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{st.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA button */}
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.stopPropagation(); onContactClick?.(); }}
              style={{
                background: '#fff',
                color: accentColor,
                border: 'none',
                borderRadius: 999,
                padding: '12px 28px',
                fontWeight: 700, fontSize: 13,
                cursor: 'pointer',
                letterSpacing: '0.04em',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                width: '100%',
              }}
            >
              {contactText} →
            </motion.button>

            {/* Hint to flip back */}
            <div style={{ marginTop: 14, color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              click to flip back
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
