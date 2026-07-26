'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

interface ScrollExpansionHeroProps {
  imageSrc: string;
  headingText: string;
  headingRed?: string;
  subText: string;
  badge?: string;
  stats?: { value: string; label: string }[];
}

const CR = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

export default function ScrollExpansionHero({ imageSrc, headingText, headingRed, subText, badge, stats }: ScrollExpansionHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  
  // Refs for text animation on load
  const tagRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // Expand image from small center block to full screen
      scrubTl.fromTo(mediaRef.current,
        { 
          clipPath: 'inset(25% 25% 25% 25% round 32px)',
          filter: 'brightness(0.9)'
        },
        { 
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          filter: 'brightness(0.5)',
          ease: 'power2.inOut'
        }
      );

      // Text elements reveal on scrub
      const textElements = [
        tagRef.current,
        line1Ref.current,
        line2Ref.current,
        subRef.current,
        statsRef.current
      ];

      scrubTl.fromTo(textElements,
        { scale: 0.8, opacity: 0, y: 60 },
        { scale: 1, opacity: 1, y: 0, stagger: 0.05, ease: 'power2.out' },
        '<' // start at the same time as image expansion
      );

      // Scroll hint fades out on scroll
      if (scrollRef.current) {
        scrubTl.to(scrollRef.current, { opacity: 0, duration: 0.2 }, '<');
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '250vh', background: '#000' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* The Media Layer */}
        <div ref={mediaRef} style={{ position: 'absolute', inset: 0, zIndex: 1, willChange: 'clip-path, filter' }}>
          <Image src={imageSrc} alt="Hero Media" fill style={{ objectFit: 'cover' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }} />
        </div>

        {/* The Text Layer (over the image) */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#fff', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          
          {badge && (
            <div ref={tagRef} style={{ 
              fontFamily: MONO, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', 
              color: '#fff', background: 'rgba(172,3,59,0.35)', backdropFilter: 'blur(8px)',
              padding: '8px 18px', borderRadius: 999, marginBottom: 24, border: '1px solid rgba(172,3,59,0.5)',
              display: 'inline-flex', alignItems: 'center', gap: 8, opacity: 0
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
              {badge}
            </div>
          )}

          <div style={{ overflow: 'hidden', marginBottom: headingRed ? 4 : 20 }}>
            <h1 ref={line1Ref} style={{ fontFamily: SERIF, fontSize: 'clamp(40px, 8vw, 120px)', fontWeight: 800, margin: 0, lineHeight: 1.05, letterSpacing: '-0.02em', textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
              {headingText}
            </h1>
          </div>

          {headingRed && (
            <div style={{ overflow: 'hidden', marginBottom: 20 }}>
              <div ref={line2Ref} style={{
                fontFamily: SERIF, fontSize: 'clamp(34px, 7vw, 100px)', fontWeight: 700, fontStyle: 'italic',
                color: '#D0375C', lineHeight: 1.05, letterSpacing: '-0.03em',
                textShadow: '0 10px 40px rgba(0,0,0,0.5)'
              }}>
                {headingRed}
              </div>
            </div>
          )}

          <p ref={subRef} style={{ fontFamily: SANS, fontSize: 'clamp(14px, 1.5vw, 20px)', fontWeight: 500, margin: '0 auto 40px', maxWidth: 640, textShadow: '0 4px 12px rgba(0,0,0,0.5)', lineHeight: 1.7 }}>
            {subText}
          </p>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div ref={statsRef} style={{
              display: 'flex', gap: 'clamp(16px,4vw,64px)', flexWrap: 'wrap', justifyContent: 'center', marginTop: 8
            }}>
              {stats.map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: SERIF, fontSize: 'clamp(24px, 3.5vw, 48px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1, textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                    {s.value}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 'clamp(9px, 1vw, 10px)', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginTop: 8 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scroll hint (visible initially) */}
        <div ref={scrollRef} style={{
          position: 'absolute', bottom: 'clamp(20px, 3vw, 36px)', right: 'clamp(24px, 6vw, 80px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10
        }}>
          <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: 1, height: '40%', background: CR, animation: 'scrollDrop 1.6s ease-in-out infinite', position: 'absolute', top: 0 }} />
          </div>
          <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Scroll</span>
        </div>

      </div>

      <style>{`
        @keyframes scrollDrop {
          0%   { top: 0%; opacity: 1; }
          80%  { top: 60%; opacity: 1; }
          100% { top: 60%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
