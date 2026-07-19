"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const R2_BASE = process.env.NEXT_PUBLIC_R2_BASE || 'https://pub-28f522ecde014dfcadf2f5fc2bd3dc0d.r2.dev';
const SERIF = 'var(--font-display)';

export function ScrubCanvas({ framesDir, frameCount, triggerId, zIndex }: { framesDir: string; frameCount: number; triggerId: string; zIndex: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(frameCount);
    const frameObj = { value: 0 };
    let rafId: number | null = null;
    let pendingIdx = 0;

    const drawFrame = (img: HTMLImageElement) => {
      const cw = canvas.width, ch = canvas.height;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      if (!iw || !ih || !cw || !ch) return;
      const scale = Math.max(cw / iw, ch / ih);
      ctx.drawImage(img,
        (iw - cw / scale) / 2, (ih - ch / scale) / 2, cw / scale, ch / scale,
        0, 0, cw, ch
      );
    };

    const scheduleDraw = (idx: number) => {
      pendingIdx = idx;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const img = images[pendingIdx];
        if (img?.complete && img?.naturalWidth) drawFrame(img);
      });
    };

    const resize = () => {
      const dpr = window.innerWidth <= 768 ? 1 : Math.min(window.devicePixelRatio, 1.5);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const img = images[Math.round(frameObj.value)];
      if (img?.complete && img?.naturalWidth) drawFrame(img);
    };

    const startGSAP = () => {
      resize();
      
      // Scrub animation
      gsap.to(frameObj, {
        value: frameCount - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerId,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: () => resize(),
        },
        onUpdate: () => scheduleDraw(Math.round(frameObj.value)),
      });

      // Opacity animation (fade in when active)
      gsap.to(canvas, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: triggerId,
          start: 'top 50%',
          end: 'bottom 50%',
          toggleActions: 'play reverse play reverse'
        }
      });
    };

    const loadFrames = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;
      for (let i = 0; i < frameCount; i++) {
        const img = new window.Image();
        images[i] = img;
        img.src = `${R2_BASE}/frames/${framesDir}/frame_${String(i + 1).padStart(4, '0')}.webp`;
        img.decoding = 'async';
        img.decode()
          .then(() => { if (i === 0) { resize(); drawFrame(img); } })
          .catch(() => {});
      }
      startGSAP();
    };

    window.addEventListener('resize', resize);
    
    // Load frames when the trigger element gets close (150% viewport height away)
    ScrollTrigger.create({
      trigger: triggerId,
      start: 'top 150%',
      onEnter: loadFrames,
      once: true
    });

    return () => { window.removeEventListener('resize', resize); };
  }, [framesDir, frameCount, triggerId]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        display: 'block', opacity: zIndex === 0 ? 1 : 0, zIndex
      }}
    />
  );
}

export function StickyScrubSection({ 
  headerTitle, steps, idPrefix 
}: { 
  headerTitle: string; 
  steps: any[];
  idPrefix: string;
}) {
  return (
    <section style={{ position: 'relative', background: '#fff' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap-reverse', maxWidth: 1600, margin: '0 auto' }}>
        
        {/* Left Column: Text Steps */}
        <div style={{ flex: 1, minWidth: 'min(100%, 400px)', padding: `clamp(40px, 6vw, 80px) 4vw`, paddingBottom: '30vh' }}>
          
          <div style={{ marginBottom: '30vh', paddingTop: '10vh' }}>
             <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(40px,6vw,96px)', fontWeight: 700, color: '#111', lineHeight: 1.0, letterSpacing: '-0.03em' }}>
               {headerTitle}
             </h2>
          </div>

          {steps.map((step, i) => (
            <div id={`${idPrefix}-step-${i}`} key={i} style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontFamily: SERIF, fontSize: 'clamp(48px, 6vw, 80px)', fontStyle: 'italic', color: '#AC033B', lineHeight: 1, marginBottom: 16 }}>{step.num}</div>
              <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4.5vw, 64px)', fontWeight: 700, color: '#111', whiteSpace: 'pre-line', lineHeight: 1.1 }}>{step.title}</h3>
            </div>
          ))}
        </div>

        {/* Right Column: Sticky Media */}
        <div style={{ flex: 1, minWidth: 'min(100%, 400px)', position: 'relative' }}>
          {/* Sticky container */}
          <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', background: 'red', overflow: 'hidden' }}>
            {steps.map((step, i) => (
              <ScrubCanvas 
                key={i}
                framesDir={step.framesDir}
                frameCount={step.frameCount}
                triggerId={`#${idPrefix}-step-${i}`}
                zIndex={i}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
