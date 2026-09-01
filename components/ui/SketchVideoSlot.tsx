'use client';

/**
 * SketchVideoSlot
 * ─────────────────────────────────────────────────────
 * Drop-in video slot for the sketch theme.
 * - When the video file exists: plays it (autoPlay, muted, loop)
 * - When no video yet: shows an animated sketch-paper placeholder
 *   with a hand-drawn border that draws itself via CSS animation
 *
 * Usage:
 *   <SketchVideoSlot src="/videos/sketch/fac-a1-raw-material.mp4" label="Raw Material" />
 */

import { useEffect, useRef } from 'react';

interface Props {
  src?: string;
  label: string;
  aspectRatio?: string;        // e.g. '16/9' | '1/1' | '4/3'
  className?: string;
  style?: React.CSSProperties;
  showLabel?: boolean;
}

const SKETCH_CSS = `
  @keyframes sketchDraw {
    from { stroke-dashoffset: 900; }
    to   { stroke-dashoffset: 0;   }
  }
  @keyframes sketchFadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes sketchPulse {
    0%, 100% { opacity: 0.18; }
    50%       { opacity: 0.38; }
  }
  @keyframes sketchPen {
    0%  { stroke-dashoffset: 900; opacity: 1; }
    85% { stroke-dashoffset: 0;   opacity: 1; }
    100%{ stroke-dashoffset: 0;   opacity: 0.6; }
  }
`;

export default function SketchVideoSlot({
  src,
  label,
  aspectRatio = '16/9',
  className,
  style,
  showLabel = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Try to play video — some browsers need explicit call
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;
    v.play().catch(() => {/* autoplay blocked – ok, user gesture will trigger */});
  }, [src]);

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        aspectRatio,
        width: '100%',
        background: '#F8F4EE',
        overflow: 'hidden',
        borderRadius: 'inherit',
        ...style,
      }}
    >
      <style>{SKETCH_CSS}</style>

      {/* ── Video (when src exists) ────────────────────────── */}
      {src && (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}

      {/* ── Sketch placeholder (always rendered below video) ── */}
      {!src && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>

          {/* Paper texture overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(26,25,21,0.04) 27px, rgba(26,25,21,0.04) 28px)`,
          }} />

          {/* Animated sketch border SVG */}
          <svg
            viewBox="0 0 400 250"
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            {/* Outer dashed rectangle — draws itself */}
            <rect
              x="10" y="10" width="380" height="230" rx="4"
              fill="none"
              stroke="#1A1915"
              strokeWidth="1.2"
              strokeDasharray="6 4"
              strokeLinecap="round"
              style={{ animation: 'sketchPen 1.8s ease-out forwards' }}
            />
            {/* Corner marks */}
            {[
              'M 10 30 L 10 10 L 30 10',
              'M 370 10 L 390 10 L 390 30',
              'M 390 220 L 390 240 L 370 240',
              'M 30 240 L 10 240 L 10 220',
            ].map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="#1A1915"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ animation: `sketchPen 1.2s ${i * 0.12}s ease-out forwards`, opacity: 0.7 }}
              />
            ))}
            {/* Center cross-hatch */}
            {[...Array(5)].map((_, i) => (
              <line
                key={i}
                x1={180 + i * 8} y1="105" x2={160 + i * 8} y2="145"
                stroke="#1A1915" strokeWidth="0.7" opacity="0.12"
              />
            ))}
          </svg>

          {/* Pen icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 12, animation: 'sketchFadeIn 0.6s 1s ease-out both', opacity: 0 }}>
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#1A1915" opacity="0.3" />
          </svg>

          {/* Label */}
          {showLabel && (
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(9px,1vw,11px)',
              letterSpacing: '0.28em',
              color: 'rgba(26,25,21,0.45)',
              textTransform: 'uppercase',
              textAlign: 'center',
              animation: 'sketchFadeIn 0.6s 1.2s ease-out both',
              opacity: 0,
              lineHeight: 1.6,
            }}>
              {label}<br />
              <span style={{ fontSize: '0.8em', opacity: 0.6 }}>sketch animation</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
