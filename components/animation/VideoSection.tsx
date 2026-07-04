'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface VideoSectionProps {
  src: string;
  aspectRatio?: string;
}

/**
 * VideoSection — GSAP ScrollTrigger video scrubbing.
 * As the user scrolls past this section, the video plays forward.
 * No autoplay, no loop — fully scroll-driven via currentTime.
 */
export default function VideoSection({ src, aspectRatio = '16/10' }: VideoSectionProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    // Proxy object GSAP will tween
    const proxy = { t: 0 };
    let st: ScrollTrigger | null = null;

    const init = () => {
      if (!video.duration || !wrap) return;

      st = ScrollTrigger.create({
        trigger: wrap,
        start: 'top 80%',       // start scrub when card enters view
        end: 'bottom 20%',      // end when card leaves view
        scrub: 1.5,             // smooth scrub lag
        onUpdate: (self) => {
          video.currentTime = self.progress * video.duration;
        },
      });
    };

    // Wait for metadata so we have duration
    video.addEventListener('loadedmetadata', init, { once: true });

    // Card reveal animation (separate from scrub)
    gsap.fromTo(
      wrap,
      { opacity: 0, y: 48 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      st?.kill();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        width: '100%',
        aspectRatio,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.06)',
        opacity: 0, // GSAP reveal
      }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      {/* Subtle vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
