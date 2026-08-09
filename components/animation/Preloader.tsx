'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Prevent scroll during load
    document.body.style.overflow = 'hidden';

    // 1. Entry Animation (Text fading in)
    const tlIn = gsap.timeline();
    tlIn.fromTo(
      line1Ref.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      0.3
    ).fromTo(
      line2Ref.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      0.55
    );

    let isCompleted = false;

    // 3. Exit Animation (triggered when loading finishes)
    const finishLoading = () => {
      if (isCompleted) return;
      isCompleted = true;

      const tlOut = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
        }
      });

      // Force bar to 100% smoothly before exiting
      tlOut.to(barRef.current, { scaleX: 1, duration: 0.3, ease: 'power2.out' })
        .to({}, { duration: 0.2 }) // small hold
        .to(line1Ref.current, { y: -40, opacity: 0, duration: 0.5, ease: 'power2.in' })
        .to(line2Ref.current, { y: -30, opacity: 0, duration: 0.4, ease: 'power2.in' }, '<0.05')
        .to(wrap, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.2')
        .set(wrap, { display: 'none' });
    };

    // Safety timeout in case some media hangs
    const fallbackTimeout = setTimeout(finishLoading, 5000);

    // 2. Preload Logic
    const initPreloader = () => {
      const mediaElements = Array.from(document.querySelectorAll('img, video')) as (HTMLImageElement | HTMLVideoElement)[];
      const totalMedia = mediaElements.length;
      let loadedCount = 0;

      if (totalMedia === 0) {
        // No media on page, just run a mock loading bar for 1 second
        gsap.to(barRef.current, { scaleX: 1, duration: 1, ease: 'power2.inOut', onComplete: finishLoading });
        return;
      }

      const updateProgress = () => {
        loadedCount++;
        const progress = loadedCount / totalMedia;
        gsap.to(barRef.current, { scaleX: progress, duration: 0.3, ease: 'power1.out' });
        
        if (loadedCount >= totalMedia) {
          finishLoading();
        }
      };

      mediaElements.forEach((media) => {
        if (media.tagName === 'IMG') {
          const img = media as HTMLImageElement;
          if (img.complete) {
            updateProgress();
          } else {
            img.addEventListener('load', updateProgress);
            img.addEventListener('error', updateProgress);
          }
        } else if (media.tagName === 'VIDEO') {
          const video = media as HTMLVideoElement;
          if (video.readyState >= 3) {
            updateProgress();
          } else {
            video.addEventListener('loadeddata', updateProgress);
            video.addEventListener('error', updateProgress);
          }
        }
      });
    };

    // Small delay to let Next.js render DOM nodes
    const startTimeout = setTimeout(() => {
      if (document.readyState === 'complete') {
        initPreloader();
      } else {
        window.addEventListener('load', initPreloader);
      }
    }, 100);

    return () => {
      tlIn.kill();
      clearTimeout(fallbackTimeout);
      clearTimeout(startTimeout);
      window.removeEventListener('load', initPreloader);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
      }}
    >
      {/* LV logo mark */}
      <div
        ref={line1Ref}
        style={{
          fontFamily: 'var(--font-display), Georgia, serif',
          fontSize: 'clamp(40px, 8vw, 96px)',
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          opacity: 0,
        }}
      >
        LV <span style={{ color: '#111111' }}>SPICES</span>
      </div>

      <div
        ref={line2Ref}
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 'clamp(9px, 1.2vw, 12px)',
          letterSpacing: '0.4em',
          color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
          opacity: 0,
        }}
      >
        Est. 1975 · Mumbai, India
      </div>

      {/* Progress bar */}
      <div
        style={{
          marginTop: 32,
          width: 'clamp(160px, 30vw, 280px)',
          height: 1,
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
          borderRadius: 1,
        }}
      >
        <div
          ref={barRef}
          style={{
            height: '100%',
            background: '#111111',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </div>
  );
}
