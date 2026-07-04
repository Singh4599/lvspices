'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
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

/**
 * StickyProcessStep
 * ─────────────────────────────────────────────────────────────
 * • outerRef  — tall scroll container; GSAP watches this
 * • innerRef  — 100vh centred wrapper; GSAP PINS this whole div
 *               so text + canvas stay together AND are centred
 * • canvasRef — draws JPEG frames scrubbed by GSAP progress
 */
export default function StickyProcessStep({
  num,
  title,
  desc,
  mobileDesc,
  framesDir,
  frameCount,
  imageRight,
  scrollDistance = 600,
}: StickyProcessStepProps) {
  const outerRef  = useRef<HTMLDivElement>(null);
  const innerRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const outer  = outerRef.current;
    const inner  = innerRef.current;
    const canvas = canvasRef.current;
    if (!outer || !inner || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const frameObj = { value: 0 };
    const images: HTMLImageElement[] = new Array(frameCount);
    let rafId: number | null = null;
    let pendingIdx = 0;

    /* ── draw a frame ───────────────────────────────────────── */
    const drawFrame = (img: HTMLImageElement) => {
      const cw = canvas.width  / dpr;
      const ch = canvas.height / dpr;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih || !cw || !ch) return;
      const scale = Math.max(cw / iw, ch / ih);
      ctx.drawImage(
        img,
        (iw - cw / scale) / 2, (ih - ch / scale) / 2,
        cw / scale, ch / scale,
        0, 0, cw, ch,
      );
    };

    /* ── raf-throttled draw ─────────────────────────────────── */
    const scheduleDraw = (idx: number) => {
      pendingIdx = idx;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const img = images[pendingIdx];
        if (img?.complete && img.naturalWidth) drawFrame(img);
      });
    };

    /* ── resize canvas ──────────────────────────────────────── */
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width  = r.width  * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      const img = images[Math.round(frameObj.value)];
      if (img?.complete && img.naturalWidth) drawFrame(img);
    };

    /* ── preload frames ─────────────────────────────────────── */
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      images[i] = img;
      img.src = `/frames/${framesDir}/frame_${String(i + 1).padStart(4, '0')}.jpg`;
      img.decoding = 'async';
      img.decode()
        .then(() => { if (i === 0) { resize(); drawFrame(img); } })
        .catch(() => {});
    }

    resize();
    window.addEventListener('resize', resize);

    /* ── GSAP: pin innerRef (full row), scrub frames ────────── */
    const tween = gsap.to(frameObj, {
      value: frameCount - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: inner,
        start: 'center 55%',
        end: `+=${scrollDistance}`,
        pin: inner,          // pins when card reaches optical center below navbar
        anticipatePin: 1,
        scrub: 1.2,
        invalidateOnRefresh: true,
        onRefresh: () => resize(),
      },
      onUpdate: () => scheduleDraw(Math.round(frameObj.value)),
    });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [framesDir, frameCount, scrollDistance]);

  /* ─── JSX ──────────────────────────────────────────────────── */
  return (
    <div ref={outerRef} style={{ padding: 'clamp(24px, 4vw, 48px) 0' }}>

      {/*
        innerRef: pinned by GSAP when it reaches viewport center (start: 'center center').
        This ensures each step stops directly in the middle of the screen while scrubbing.
      */}
      <div
        ref={innerRef}
        style={{
          width: '100%',
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

    </div>
  );
}
