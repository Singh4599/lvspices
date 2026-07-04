'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoScrubProps {
  src: string;
  scrollLength?: string;
  overlay?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * ScrollVideoScrub
 *
 * Scroll-driven video playback using canvas. The video scrubs
 * forward/backward frame-by-frame as the user scrolls.
 * Works like Apple-style scroll animations.
 *
 * The section pins while the video plays through on scroll.
 */
export default function ScrollVideoScrub({
  src,
  scrollLength = '200vh',
  overlay,
  className,
  style,
}: ScrollVideoScrubProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create hidden video element
    const video = document.createElement('video');
    video.src = src;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.crossOrigin = 'anonymous';
    videoRef.current = video;

    // Sizing
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = wrap.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    // Draw current video frame to canvas (object-cover style)
    const drawFrame = () => {
      if (!video || video.readyState < 2) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh) return;

      // object-cover math
      const scale = Math.max(cw / vw, ch / vh);
      const sw = cw / scale;
      const sh = ch / scale;
      const sx = (vw - sw) / 2;
      const sy = (vh - sh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch);
    };

    let tween: gsap.core.Tween | null = null;

    const setupScrollTrigger = () => {
      resize();
      drawFrame();
      setLoaded(true);

      const duration = video.duration;
      const obj = { time: 0 };

      // RAF loop for smooth drawing
      let rafId: number;
      const renderLoop = () => {
        // Seek video to current time
        if (Math.abs(video.currentTime - obj.time) > 0.02) {
          video.currentTime = obj.time;
        }
        drawFrame();
        rafId = requestAnimationFrame(renderLoop);
      };
      rafId = requestAnimationFrame(renderLoop);

      tween = gsap.to(obj, {
        time: duration,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: `+=${scrollLength}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
        onUpdate: () => {
          // obj.time is updated by GSAP
        },
      });

      // Cleanup RAF on unmount
      return () => {
        cancelAnimationFrame(rafId);
      };
    };

    let cleanupRaf: (() => void) | null = null;

    // Wait for video metadata + first frame
    const onCanPlay = () => {
      cleanupRaf = setupScrollTrigger() || null;
    };

    if (video.readyState >= 2) {
      cleanupRaf = setupScrollTrigger() || null;
    } else {
      video.addEventListener('canplay', onCanPlay, { once: true });
    }

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      video.removeEventListener('canplay', onCanPlay);
      if (tween) {
        tween.scrollTrigger?.kill();
        tween.kill();
      }
      if (cleanupRaf) cleanupRaf();
      video.pause();
      video.src = '';
      videoRef.current = null;
      ScrollTrigger.refresh();
    };
  }, [src, scrollLength]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
        ...style,
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

      {/* Loading spinner */}
      <style>{`@keyframes scrub-spin { to { transform: rotate(360deg); } }`}</style>
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.9)',
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              border: '3px solid rgba(255,255,255,0.12)',
              borderTopColor: '#AC033B',
              borderRadius: '50%',
              animation: 'scrub-spin 0.7s linear infinite',
            }}
          />
        </div>
      )}

      {/* Overlay content */}
      {overlay && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{ pointerEvents: 'auto' }}>{overlay}</div>
        </div>
      )}
    </div>
  );
}
