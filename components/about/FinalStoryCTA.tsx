'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const CR = '#AC033B';

export default function FinalStoryCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 25%',
          scrub: 0.7,
        },
      });

      // Family photo reveals L→R
      tl.fromTo(imgRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power2.out' }, 0
      );

      // "50 Years." rises
      tl.fromTo(line1Ref.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.2
      );

      // "Still Going." follows
      tl.fromTo(line2Ref.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.38
      );

      // CTA fades up
      tl.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.55
      );

      // Warm light sweep — plays once
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          gsap.fromTo(lightRef.current,
            { x: '-100%', opacity: 0.4 },
            { x: '200%', opacity: 0, duration: 1.4, ease: 'power1.inOut' }
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cta" style={{ background: '#111', position: 'relative', overflow: 'hidden', minHeight: 'clamp(480px, 60vw, 720px)', display: 'flex', alignItems: 'center' }}>

      {/* Section number */}
      <div style={{ position: 'absolute', left: 'clamp(16px,3vw,40px)', top: 'clamp(60px,10vw,120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 3 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>08</span>
        <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.15)' }} />
      </div>

      {/* Background family photo */}
      <div ref={imgRef} style={{ position: 'absolute', inset: 0, clipPath: 'inset(0 100% 0 0)' }}>
        <Image
          src="/images/farm-editorial.png"
          alt="Three generations of the LV Spices family together, inspecting spices at golden hour"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.5) 50%, rgba(17,17,17,0.3) 100%)' }} />
      </div>

      {/* Warm light sweep */}
      <div ref={lightRef} style={{ position: 'absolute', top: 0, bottom: 0, width: '30%', background: 'linear-gradient(to right, transparent, rgba(255,200,100,0.08), transparent)', pointerEvents: 'none', zIndex: 2 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, padding: 'clamp(60px,8vw,120px) clamp(60px,7vw,120px)', maxWidth: 700 }}>
        <div style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div ref={line1Ref} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px,9vw,120px)', fontWeight: 800, color: '#F8F6F1', lineHeight: 1, letterSpacing: '-0.05em', opacity: 0 }}>
            50 Years.
          </div>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 32 }}>
          <div ref={line2Ref} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(56px,8.5vw,115px)', fontWeight: 700, fontStyle: 'italic', color: CR, lineHeight: 1, letterSpacing: '-0.04em', opacity: 0 }}>
            Still Going.
          </div>
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1.1vw,16px)', color: 'rgba(248,246,241,0.6)', marginBottom: 40, lineHeight: 1.65 }}>
          Same Passion. Stronger Tomorrow.
        </p>
        <div ref={ctaRef} style={{ opacity: 0 }}>
          <Link href="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: CR, color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, letterSpacing: '0.06em', padding: '16px 36px', borderRadius: 40, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = `0 12px 40px rgba(172,3,59,0.4)`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = 'none';
            }}
          >
            Partner With Us
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
