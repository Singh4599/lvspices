'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

const CR = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';

interface PageHeroProps {
  tag: string;          // small label above heading e.g. "Our Capabilities"
  heading: string;      // main h1 text
  headingRed?: string;  // optional second line in crimson italic
  subCopy?: string;     // optional supporting sentence below heading
  imageSrc: string;
  imageAlt: string;
  stats?: { value: string; label: string }[];
  minHeight?: string;   // default '60vh'
  overlay?: 'dark' | 'light' | 'gradient-left' | 'gradient-up'; // default 'gradient-up'
  textAlign?: 'left' | 'center';
}

export default function PageHero({
  tag,
  heading,
  headingRed,
  subCopy,
  imageSrc,
  imageAlt,
  stats,
  minHeight = 'clamp(440px, 60vw, 720px)',
  overlay = 'gradient-up',
  textAlign = 'left',
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
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
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 });

      // Tag
      tl.fromTo(tagRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0);

      // Heading line 1 — clip reveal
      if (line1Ref.current) {
        tl.fromTo(line1Ref.current,
          { clipPath: 'inset(0 0 100% 0)', y: 16 },
          { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.85 }, 0.15
        );
      }

      // Heading line 2 (red italic)
      if (line2Ref.current) {
        tl.fromTo(line2Ref.current,
          { clipPath: 'inset(0 0 100% 0)', y: 16 },
          { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.85 }, 0.28
        );
      }

      // Sub copy
      if (subRef.current) {
        tl.fromTo(subRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.45);
      }

      // Stats
      if (statsRef.current) {
        tl.fromTo(statsRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, 0.55
        );
      }

      // Scroll hint
      if (scrollRef.current) {
        tl.fromTo(scrollRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, 0.9);
      }

      // Parallax on scroll
      if (sectionRef.current) {
        gsap.to('.hero-bg-img', {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const overlayStyle: React.CSSProperties = (() => {
    switch (overlay) {
      case 'dark': return { background: 'rgba(0,0,0,0.55)' };
      case 'light': return { background: 'rgba(255,255,255,0.3)' };
      case 'gradient-left': return { background: 'linear-gradient(to right, rgba(0,0,0,0.88) 45%, rgba(0,0,0,0.15) 100%)' };
      default: return { background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.2) 100%)' };
    }
  })();

  const isCenter = textAlign === 'center';

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Background image */}
      <div className="hero-bg-img" style={{ position: 'absolute', inset: 0 }}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, ...overlayStyle }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        padding: 'clamp(40px,6vw,100px) clamp(24px,6vw,100px)',
        maxWidth: 1400,
        margin: '0 auto',
        textAlign: isCenter ? 'center' : 'left',
      }}>

        {/* Tag pill */}
        <div ref={tagRef} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(172,3,59,0.2)', border: '1px solid rgba(172,3,59,0.5)',
          borderRadius: 999, padding: '6px 18px', marginBottom: 22,
          backdropFilter: 'blur(8px)',
          opacity: 0,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: CR, display: 'inline-block' }} />
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: CR, fontWeight: 600 }}>
            {tag}
          </span>
        </div>

        {/* Heading */}
        <div style={{ overflow: 'hidden', marginBottom: headingRed ? 4 : 20 }}>
          <div ref={line1Ref} style={{
            fontFamily: SERIF,
            fontSize: 'clamp(38px, 6.5vw, 96px)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            clipPath: 'inset(0 0 100% 0)',
          }}>
            {heading}
          </div>
        </div>

        {/* Red italic line (optional) */}
        {headingRed && (
          <div style={{ overflow: 'hidden', marginBottom: 20 }}>
            <div ref={line2Ref} style={{
              fontFamily: SERIF,
              fontSize: 'clamp(34px, 5.5vw, 84px)',
              fontWeight: 700,
              fontStyle: 'italic',
              color: '#D0375C',
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              clipPath: 'inset(0 0 100% 0)',
            }}>
              {headingRed}
            </div>
          </div>
        )}

        {/* Sub copy */}
        {subCopy && (
          <p ref={subRef} style={{
            fontFamily: SANS,
            fontSize: 'clamp(14px, 1.2vw, 17px)',
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.75,
            maxWidth: isCenter ? 640 : 480,
            margin: isCenter ? '0 auto 36px' : '0 0 36px',
            opacity: 0,
          }}>
            {subCopy}
          </p>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div ref={statsRef} style={{
            display: 'flex',
            gap: 'clamp(24px,4vw,56px)',
            flexWrap: 'wrap',
            justifyContent: isCenter ? 'center' : 'flex-start',
            marginTop: 8,
          }}>
            {stats.map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(22px, 2.8vw, 38px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginTop: 5 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll hint */}
      <div ref={scrollRef} style={{
        position: 'absolute',
        bottom: 'clamp(20px, 3vw, 36px)',
        right: 'clamp(24px, 6vw, 80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        opacity: 0,
      }}>
        <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ width: 1, height: '40%', background: CR, animation: 'scrollDrop 1.6s ease-in-out infinite', position: 'absolute', top: 0 }} />
        </div>
        <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Scroll</span>
      </div>

      <style>{`
        @keyframes scrollDrop {
          0%   { top: 0%; opacity: 1; }
          80%  { top: 60%; opacity: 1; }
          100% { top: 60%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
