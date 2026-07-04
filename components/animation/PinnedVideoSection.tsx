'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface PinnedVideoSectionProps {
  /** e.g. 'raw' → loads /frames/raw/frame_0001.jpg */
  framesDir: string;
  frameCount: number;
  /** Extra scroll distance (px) — more = slower / longer hold */
  scrollDistance?: number;
}

/**
 * PinnedVideoSection
 * ─────────────────────────────────────────────────────────────────
 * Wraps a sticky section so that:
 *  1. When the canvas enters the viewport the parent container pins it.
 *  2. As the user scrolls through `scrollDistance` pixels, GSAP
 *     scrubs through all extracted JPEG frames on a <canvas>.
 *  3. Images are pre-loaded in parallel; first frame draws immediately.
 *
 * This matches the hero section pattern exactly.
 */
export default function PinnedVideoSection({
  framesDir,
  frameCount,
  scrollDistance = 600,
}: PinnedVideoSectionProps) {
  const outerRef = useRef<HTMLDivElement>(null);   // tall scroll container
  const stickyRef = useRef<HTMLDivElement>(null);  // sticky inner
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const outer  = outerRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    if (!outer || !sticky || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // ── Size canvas to match its CSS size ─────────────────────────
    const dpr = Math.min(window.devicePixelRatio, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width  = r.width  * dpr;
      canvas.height = r.height * dpr;
      ctx.scale(dpr, dpr);
      const img = images[Math.round(frameObj.value)];
      if (img?.complete && img.naturalWidth) drawFrame(img);
    };

    // ── Frame image array ──────────────────────────────────────────
    const images: HTMLImageElement[] = new Array(frameCount);
    const frameObj = { value: 0 };
    let rafId: number | null = null;
    let pendingIdx = 0;

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

    const scheduleDraw = (idx: number) => {
      pendingIdx = idx;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const img = images[pendingIdx];
        if (img?.complete && img.naturalWidth) drawFrame(img);
      });
    };

    // ── Pre-load all frames ────────────────────────────────────────
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

    // ── GSAP ScrollTrigger — pin + scrub ──────────────────────────
    const tween = gsap.to(frameObj, {
      value: frameCount - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: outer,
        start: 'top 80%',          // start when card is 80% down viewport
        end: `+=${scrollDistance}`,
        pin: sticky,               // pin the sticky inner div
        anticipatePin: 1,
        scrub: 1,
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

  return (
    /* Outer tall div gives scroll room; inner is pinned by GSAP */
    <div
      ref={outerRef}
      style={{ position: 'relative' }}
    >
      <div
        ref={stickyRef}
        style={{ width: '100%' }}
      >
        {/* Reveal animation wrapper */}
        <div
          style={{
            width: '100%',
            aspectRatio: '16/10',
            borderRadius: 16,
            overflow: 'hidden',
            position: 'relative',
            background: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
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
          {/* Subtle vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.25) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}
