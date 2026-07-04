'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/* ─────────────────────────────────────────────────────────────────
   ScrollFrameCanvas
   
   A reusable scroll-driven frame-by-frame canvas animation.
   Preloads WebP frames, pins the section during scroll, and scrubs
   through them using GSAP ScrollTrigger.

   Usage:
     <ScrollFrameCanvas
       basePath="/frames/hero"
       desktopFrames={120}
       mobileFrames={96}
       scrollLength="300vh"
     />
   ───────────────────────────────────────────────────────────────── */

interface ScrollFrameCanvasProps {
  /** Base path inside /public (no trailing slash). E.g. "/frames/hero" */
  basePath: string;
  /** Total number of DESKTOP frames (files: frame_0001.webp … frame_NNNN.webp) */
  desktopFrames: number;
  /** Total number of MOBILE frames */
  mobileFrames: number;
  /** How long the pinned scroll section lasts. Default: "300vh" */
  scrollLength?: string;
  /** Breakpoint in px below which we use mobile frames. Default: 768 */
  mobileBreakpoint?: number;
  /** Optional className for the outer wrapper */
  className?: string;
  /** Optional inline styles for the outer wrapper */
  style?: React.CSSProperties;
  /** Children rendered on top of the canvas (overlay content) */
  children?: React.ReactNode;
}

/** Pad a number to 4 digits: 1 → "0001" */
function pad(n: number): string {
  return String(n).padStart(4, '0');
}

export default function ScrollFrameCanvas({
  basePath,
  desktopFrames,
  mobileFrames,
  scrollLength = '300vh',
  mobileBreakpoint = 768,
  className,
  style,
  children,
}: ScrollFrameCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef<{ value: number }>({ value: 0 });
  const displayedFrameRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  /* ── Determine device tier ─────────────────────────────────── */
  const getIsMobile = useCallback(
    () => typeof window !== 'undefined' && window.innerWidth < mobileBreakpoint,
    [mobileBreakpoint],
  );

  /* ── Draw a frame onto the canvas (object-cover style) ────── */
  const drawFrame = useCallback((img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // object-cover: scale to fill, crop overflow
    const scale = Math.max(cw / iw, ch / ih);
    const sw = cw / scale;
    const sh = ch / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  /* ── Main effect: preload + GSAP setup ─────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const isMobile = getIsMobile();
    const totalFrames = isMobile ? mobileFrames : desktopFrames;

    /* ── Size canvas to viewport ──────────────────────────────── */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Redraw current frame after resize
      const imgs = imagesRef.current;
      const idx = Math.round(frameIndexRef.current.value);
      if (imgs[idx]) drawFrame(imgs[idx], canvas);
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Preload all frames ───────────────────────────────────── */
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    const onLoad = () => {
      loaded++;
      // Draw first frame as soon as it arrives
      if (loaded === 1 && images[0]) {
        drawFrame(images[0], canvas);
      }
      if (loaded === totalFrames) {
        setIsLoaded(true);
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `${basePath}/frame_${pad(i)}.jpg`;
      img.onload = onLoad;
      img.onerror = onLoad; // count errors too so we don't block forever
      images.push(img);
    }
    imagesRef.current = images;

    const obj = frameIndexRef.current;
    obj.value = 0;
    displayedFrameRef.current = 0;

    /* ── RAF lerp loop for buttery smooth frame transitions ─── */
    const renderLoop = () => {
      const cvs = canvasRef.current;
      if (!cvs) return; // stop loop if unmounted
      const target = obj.value;
      const current = displayedFrameRef.current;
      // Lerp toward target — factor 0.12 gives smooth inertia feel
      const next = current + (target - current) * 0.12;
      const idx = Math.round(next);
      const imgs = imagesRef.current;
      if (imgs[idx] && Math.abs(next - current) > 0.01) {
        drawFrame(imgs[idx], canvas);
      }
      displayedFrameRef.current = next;
      rafRef.current = requestAnimationFrame(renderLoop);
    };
    rafRef.current = requestAnimationFrame(renderLoop);

    const tween = gsap.to(obj, {
      value: totalFrames - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: `+=${scrollLength}`,
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
      },
    });

    /* ── Cleanup ──────────────────────────────────────────────── */
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.refresh();
      imagesRef.current = [];
    };
  }, [basePath, desktopFrames, mobileFrames, scrollLength, getIsMobile, drawFrame]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Canvas layer */}
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

      {/* Spin keyframe — always rendered to avoid React DOM reconciliation error */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Loading indicator (disappears once frames are loaded) */}
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.85)',
            zIndex: 10,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              border: '3px solid rgba(255,255,255,0.15)',
              borderTopColor: '#fff',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
        </div>
      )}

      {/* Overlay content (children rendered on top) */}
      {children && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <div style={{ pointerEvents: 'auto' }}>{children}</div>
        </div>
      )}
    </div>
  );
}
