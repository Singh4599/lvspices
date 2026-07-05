'use client';

import { useEffect, useRef } from 'react';

const SERIF   = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS    = 'var(--font-sans), Inter, system-ui, sans-serif';
const CRIMSON = '#AC033B';
const PAGE_PAD = 'clamp(20px, 5vw, 64px)';

interface StickyProcessStepProps {
  num: string;
  title: string;
  desc: string;
  mobileDesc?: string;
  framesDir: string;
  frameCount: number;
  imageRight: boolean;
  scrollDistance?: number;
}

/*
 * APPROACH: GSAP and Sticky logic turned OFF completely as requested.
 * This is now a simple, static layout component. It will just render the
 * text and draw the first frame of the animation on the canvas.
 * No pinning, no scroll scrubbing, just normal page scroll.
 */
export default function StickyProcessStep({
  num,
  title,
  desc,
  mobileDesc,
  framesDir,
  imageRight,
}: StickyProcessStepProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx2d = canvas.getContext('2d', { alpha: false });
    if (!ctx2d) return;

    const dpr = Math.min(window.devicePixelRatio, 2);

    const drawFrame = (img: HTMLImageElement) => {
      const cw = canvas.width  / dpr;
      const ch = canvas.height / dpr;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih || !cw || !ch) return;
      const scale = Math.max(cw / iw, ch / ih);
      ctx2d.drawImage(
        img,
        (iw - cw / scale) / 2, (ih - ch / scale) / 2,
        cw / scale, ch / scale,
        0, 0, cw, ch,
      );
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      canvas.width  = r.width  * dpr;
      canvas.height = r.height * dpr;
      ctx2d.setTransform(1, 0, 0, 1, 0, 0);
      ctx2d.scale(dpr, dpr);
    };

    // Load only the very first frame to display it statically
    const img = new window.Image();
    img.src = `/frames/${framesDir}/frame_0001.jpg`;
    img.decoding = 'async';
    img.onload = () => {
      resize();
      drawFrame(img);
    };

    window.addEventListener('resize', () => {
      resize();
      if (img.complete && img.naturalWidth) drawFrame(img);
    });

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [framesDir]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        padding: '8px 0',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto',
          padding: `0 ${PAGE_PAD}`,
        }}
        className="process-showcase-grid"
      >
        {/* TEXT COLUMN */}
        <div style={{ order: imageRight ? 0 : 1 }} className="text-col">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 20 }}>
            <span style={{
              fontFamily: SERIF,
              fontSize: 'clamp(48px,6vw,100px)',
              fontWeight: 700,
              fontStyle: 'italic',
              color: CRIMSON,
              lineHeight: 1,
              opacity: 0.2,
              userSelect: 'none',
              flexShrink: 0,
            }}>
              {num}
            </span>
            <div style={{ paddingTop: 'clamp(10px,1.2vw,20px)' }}>
              <h3 style={{
                fontFamily: SERIF,
                fontSize: 'clamp(24px,2.8vw,42px)',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: 16,
                whiteSpace: 'pre-line',
              }}>
                {title}
              </h3>
              <p className="desktop-desc" style={{
                fontFamily: SANS,
                fontSize: 'clamp(14px,1vw,15px)',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.75,
                maxWidth: 400,
              }}>
                {desc}
              </p>
              <p className="mobile-desc" style={{
                fontFamily: SANS,
                fontSize: 'clamp(14px,1vw,15px)',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.75,
                maxWidth: 400,
              }}>
                {mobileDesc ?? desc}
              </p>
            </div>
          </div>
        </div>

        {/* CANVAS COLUMN */}
        <div style={{ order: imageRight ? 1 : 0 }} className="canvas-col">
          <div style={{
            width: '100%',
            aspectRatio: '16/10',
            borderRadius: 16,
            overflow: 'hidden',
            position: 'relative',
            background: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom,rgba(0,0,0,0.1) 0%,transparent 20%,transparent 80%,rgba(0,0,0,0.2) 100%)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
