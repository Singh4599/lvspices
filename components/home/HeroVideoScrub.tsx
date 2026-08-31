'use client';

/**
 * HeroVideoScrub
 * ──────────────────────────────────────────────────────────────────
 * Full-viewport hero with GSAP ScrollTrigger video scrubbing.
 *
 * Technique:
 *  - <video> element is loaded with preload="auto" so the browser
 *    buffers all frames before scroll begins.
 *  - ScrollTrigger's `onUpdate` callback maps scroll progress (0→1)
 *    to video.currentTime (0 → duration).
 *  - The section height = 100svh (pinned) + scrollDistance so the
 *    pin lasts exactly as long as the video.
 *  - Text overlay fades out as scroll begins (parallax feel).
 */

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import Link from 'next/link';

// How many extra viewport-heights of scroll to consume the full video.
// 10s video @ comfortable scrub pace → 3× viewport feels natural.
const SCROLL_MULTIPLIER = 3;

export default function HeroVideoScrub() {
  const sectionRef    = useRef<HTMLElement>(null);
  const videoRef      = useRef<HTMLVideoElement>(null);
  const overlayRef    = useRef<HTMLDivElement>(null);
  const headRef       = useRef<HTMLDivElement>(null);
  const subRef        = useRef<HTMLDivElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);   // thin scrub progress bar
  const [ready, setReady] = useState(false);

  // ── 1. Wait for video metadata (duration known) then set ready ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => setReady(true);

    // readyState >= 1 = metadata loaded (duration known) — enough to start scrubbing
    if (video.readyState >= 1) {
      onReady();
    } else {
      video.addEventListener('loadedmetadata', onReady, { once: true });
      video.addEventListener('loadeddata', onReady, { once: true });
    }
    return () => {
      video.removeEventListener('loadedmetadata', onReady);
      video.removeEventListener('loadeddata', onReady);
    };
  }, []);

  // ── 2. Wire GSAP ScrollTrigger once video is ready ──
  useEffect(() => {
    if (!ready) return;
    const video    = videoRef.current!;
    const section  = sectionRef.current!;
    const duration = video.duration || 10;

    // Pause & mute — scrubbing controls playback
    video.pause();
    video.currentTime = 0;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // rAF handle — batch seeks to the next paint frame to avoid jitter
    let rafId = 0;
    let targetTime = 0;

    function seekFrame() {
      if (video && Math.abs(video.currentTime - targetTime) > 0.001) {
        video.currentTime = targetTime;
      }
      rafId = 0;
    }

    const ctx = gsap.context(() => {

      // ── Scrub trigger ──────────────────────────────────────────
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${SCROLL_MULTIPLIER * 100}%`,
        pin: true,
        anticipatePin: 1,
        // scrub: false → we manage seeking manually via rAF for zero jitter
        scrub: false,
        onUpdate: (self) => {
          if (!video) return;

          // Map scroll progress → video time
          targetTime = Math.min(Math.max(self.progress * duration, 0), duration);

          // Batch to next animation frame — avoids multiple seeks per frame
          if (!rafId) {
            rafId = requestAnimationFrame(seekFrame);
          }

          // Progress bar — CSS width, no layout thrash
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
        },
      });


      // ── Text parallax / fade ───────────────────────────────────
      if (!prefersReduced) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${SCROLL_MULTIPLIER * 100}%`,
            scrub: true,
          },
        });

        // Overlay darkens slightly as user scrolls
        tl.to(overlayRef.current, { opacity: 0.55, duration: 1 }, 0);

        // Headline drifts up & fades
        tl.to(headRef.current, { y: -80, opacity: 0, duration: 0.4 }, 0);
        tl.to(subRef.current,  { y: -50, opacity: 0, duration: 0.4 }, 0.05);
        tl.to(ctaRef.current,  { y: -30, opacity: 0, duration: 0.3 }, 0.08);
      }

      // ── Entrance animation (text on load) ─────────────────────
      if (!prefersReduced) {
        const enter = gsap.timeline({ delay: 0.3 });
        enter.fromTo(headRef.current,
          { clipPath: 'inset(0 0 100% 0)', y: 16 },
          { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.9, ease: 'power3.out' }
        );
        enter.fromTo(subRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        );
        enter.fromTo(ctaRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );
      }

    }, section);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [ready]);

  return (
    <>
      {/*
        The section is SCROLL_MULTIPLIER × 100vh tall.
        GSAP pins it so it stays fixed while the extra scroll height
        drives the video scrubber.
      */}
      <section
        ref={sectionRef}
        id="hero"
        style={{
          position: 'relative',
          width: '100%',
          height: '100svh',
          overflow: 'hidden',
          background: '#0a0a0a',
        }}
      >
        {/* ── Video ──────────────────────────────────────────── */}
        <video
          ref={videoRef}
          src="/videos/hero-scrub.mp4"
          poster="/images/hero-scrub-poster.jpg"
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            filter: 'saturate(0.92) contrast(1.05)',
          }}
        />

        {/* ── Dark gradient overlay ───────────────────────────── */}
        <div
          ref={overlayRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)',
            opacity: 0.42,
          }}
        />

        {/* ── Loading shimmer (shown until video is ready) ─────── */}
        {!ready && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #0a0a0a 25%, #1a1a1a 50%, #0a0a0a 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s ease-in-out infinite',
          }}>
            <style>{`
              @keyframes shimmer {
                0%   { background-position: -200% 0; }
                100% { background-position:  200% 0; }
              }
            `}</style>
          </div>
        )}

        {/* ── Text overlay ────────────────────────────────────── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(32px,5vw,80px) clamp(24px,5vw,80px) clamp(60px,8vw,100px)',
          pointerEvents: 'none',
          zIndex: 2,
        }}>

          {/* Tag line */}
          <div ref={subRef} style={{ opacity: 0, marginBottom: 16 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(9px,1vw,11px)',
                letterSpacing: '0.28em',
                color: 'rgba(255,255,255,0.65)',
                textTransform: 'uppercase',
              }}>
                Est. 1975 · India&apos;s Trusted Spice Manufacturer
              </span>
            </div>
          </div>

          {/* Main headline */}
          <div style={{ overflow: 'hidden' }}>
            <div ref={headRef} style={{ clipPath: 'inset(0 0 100% 0)' }}>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(44px,8vw,128px)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
                color: '#fff',
                margin: 0,
              }}>
                Spices,<br />
                <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.82)' }}>Crafted</span><br />
                to Perfection.
              </h1>
            </div>
          </div>

          {/* CTAs */}
          <div
            ref={ctaRef}
            style={{
              opacity: 0,
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
              marginTop: 36,
              pointerEvents: 'all',
            }}
          >
            <Link
              href="/our-services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 28px',
                background: '#fff',
                color: '#111',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: 2,
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#111';
                (e.currentTarget as HTMLElement).style.color = '#fff';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#fff';
                (e.currentTarget as HTMLElement).style.color = '#111';
              }}
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '13px 28px',
                background: 'transparent',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.45)',
                textDecoration: 'none',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#fff';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.45)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* ── Scrub progress bar (bottom edge) ────────────────── */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 2,
          background: 'rgba(255,255,255,0.1)',
          zIndex: 10,
        }}>
          <div
            ref={progressRef}
            style={{
              height: '100%',
              width: '0%',
              background: '#fff',
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        {/* ── Scroll hint ─────────────────────────────────────── */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(28px,4vw,48px)',
          right: 'clamp(24px,4vw,64px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 5,
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.4s',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.24em',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            writingMode: 'vertical-lr',
            transform: 'rotate(180deg)',
          }}>
            Scroll
          </span>
          <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.25)', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '40%',
              background: '#fff',
              animation: 'scrollDrop 1.8s ease-in-out infinite',
            }} />
          </div>
          <style>{`
            @keyframes scrollDrop {
              0%   { transform: translateY(-100%); opacity: 1; }
              80%  { transform: translateY(250%);  opacity: 1; }
              100% { transform: translateY(250%);  opacity: 0; }
            }
          `}</style>
        </div>
      </section>

      {/*
        Spacer: the GSAP pin adds scroll distance dynamically,
        but we also need the DOM flow to have the right height
        so sections below don't overlap during SSR / before hydration.
        GSAP adjusts this automatically when pin:true + ScrollTrigger are active.
      */}
    </>
  );
}
