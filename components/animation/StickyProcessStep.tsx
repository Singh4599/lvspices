'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

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

export default function StickyProcessStep({
  num,
  title,
  desc,
  mobileDesc,
  framesDir,
  frameCount,
  imageRight,
  scrollDistance = 1000,
}: StickyProcessStepProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = `/frames/${framesDir}/frame_${String(i + 1).padStart(4, '0')}.jpg`;
      img.decoding = 'async';
      loadedImages[i] = img;
      
      img.onload = () => {
        loadedCount++;
        if (i === 0) {
          drawSpecificFrame(loadedImages[0]);
        }
      };
    }
    setImages(loadedImages);
  }, [framesDir, frameCount]);

  const drawSpecificFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    
    if (canvas.width !== r.width * dpr || canvas.height !== r.height * dpr) {
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    
    ctx.drawImage(
      img,
      (iw - cw / scale) / 2, (ih - ch / scale) / 2,
      cw / scale, ch / scale,
      0, 0, cw, ch
    );
  };

  useGSAP(() => {
    if (images.length === 0 || !containerRef.current) return;

    const frameObj = { value: 0 };
    let rafId: number | null = null;
    let pendingIdx = 0;

    const scheduleDraw = (idx: number) => {
      pendingIdx = idx;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const img = images[pendingIdx];
        if (img) drawSpecificFrame(img);
      });
    };

    setTimeout(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        start: "center center",
        end: `+=${scrollDistance}`,
        scrub: 0.5,
        animation: gsap.to(frameObj, {
          value: frameCount - 1,
          ease: 'none',
          onUpdate: () => scheduleDraw(Math.round(frameObj.value))
        }),
        invalidateOnRefresh: true,
      });
      ScrollTrigger.refresh();
    }, 100);

    const handleResize = () => {
      const img = images[Math.round(frameObj.value)];
      if (img) drawSpecificFrame(img);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, { scope: containerRef, dependencies: [images] });

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: 1400,
        margin: '0 auto',
        padding: `0 ${PAGE_PAD}`,
        paddingTop: '60px',
        paddingBottom: '60px',
      }}
      className="process-showcase-grid"
    >
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
  );
}
