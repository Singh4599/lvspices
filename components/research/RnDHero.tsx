'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const CR = '#AC033B';

export default function RnDHero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const line1Ref     = useRef<HTMLDivElement>(null);
  const line2Ref     = useRef<HTMLDivElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const imgRef       = useRef<HTMLDivElement>(null);
  const tagRef       = useRef<HTMLDivElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const scrollHintRef= useRef<HTMLDivElement>(null);
  const sectionNumRef= useRef<HTMLDivElement>(null);
  const counterRef   = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      if (counterRef.current) counterRef.current.textContent = '425';
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });

      tl.fromTo(tagRef.current,         { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0);
      tl.fromTo(line1Ref.current,       { clipPath: 'inset(0 0 100% 0)', y: 12 }, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.75 }, 0.15);
      tl.fromTo(line2Ref.current,       { clipPath: 'inset(0 0 100% 0)', y: 12 }, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.75 }, 0.28);
      tl.fromTo(subRef.current,         { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.5);
      tl.fromTo(sectionNumRef.current,  { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.4);
      tl.fromTo(imgRef.current,         { scale: 1.07, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out' }, 0.08);
      tl.fromTo({ val: 0 }, { val: 425 }, {
        val: 425, duration: 1.4, ease: 'power2.out',
        onUpdate: function () {
          if (counterRef.current) counterRef.current.textContent = String(Math.round(this.targets()[0].val));
        },
      }, 0.35);
      tl.fromTo(badgeRef.current,       { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.75);
      tl.fromTo(scrollHintRef.current,  { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.95);

      // Scroll exit parallax
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=80%',
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          if (line1Ref.current)  gsap.set(line1Ref.current,  { y: -p * 70, opacity: 1 - p * 1.5 });
          if (line2Ref.current)  gsap.set(line2Ref.current,  { y: -p * 50, opacity: 1 - p * 1.3 });
          if (subRef.current)    gsap.set(subRef.current,    { y: -p * 35, opacity: 1 - p * 2.2 });
          if (tagRef.current)    gsap.set(tagRef.current,    { y: -p * 30, opacity: 1 - p * 3 });
          if (imgRef.current)    gsap.set(imgRef.current,    { scale: 1 + p * 0.06, x: p * -24 });
          if (badgeRef.current)  gsap.set(badgeRef.current,  { y: -p * 50, opacity: 1 - p * 2 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="rnd-hero"
      style={{
        minHeight: '100svh',
        background: '#fff',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'clamp(90px,10vw,120px)',
      }}
    >
      {/* Section number spine */}
      <div ref={sectionNumRef} style={{ position: 'absolute', left: 'clamp(16px,3vw,40px)', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: 0 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(17,17,17,0.28)', letterSpacing: '0.14em', writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>01</span>
        <div style={{ width: 1, height: 56, background: CR, opacity: 0.5 }} />
      </div>

      {/* Main grid */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          padding: '0 clamp(64px,8vw,140px) clamp(60px,8vw,100px)',
          gap: 'clamp(32px,5vw,80px)',
          maxWidth: 1440,
          margin: '0 auto',
          width: '100%',
        }}
        className="rnd-hero-grid"
      >
        <style>{`
          @media (max-width: 767px) {
            .rnd-hero-grid {
              grid-template-columns: 1fr !important;
              padding: 0 24px clamp(60px,12vw,100px) !important;
              gap: 32px !important;
            }
          }
        `}</style>

        {/* Left — Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* Tag */}
          <div ref={tagRef} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, opacity: 0 }}>
            <div style={{ width: 24, height: 1, background: CR }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: CR, textTransform: 'uppercase', fontWeight: 600 }}>Innovation Hub</span>
          </div>

          {/* Headline line 1 */}
          <div style={{ overflow: 'hidden', marginBottom: 2 }}>
            <div ref={line1Ref} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 6.5vw, 96px)', fontWeight: 800, color: '#111', lineHeight: 1.02, letterSpacing: '-0.04em', clipPath: 'inset(0 0 100% 0)' }}>
              Research &amp;
            </div>
          </div>

          {/* Headline line 2 red italic */}
          <div style={{ overflow: 'hidden', marginBottom: 28 }}>
            <div ref={line2Ref} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 6vw, 90px)', fontWeight: 700, fontStyle: 'italic', color: CR, lineHeight: 1.02, letterSpacing: '-0.03em', clipPath: 'inset(0 0 100% 0)' }}>
              Development.
            </div>
          </div>

          {/* Sub */}
          <p ref={subRef} style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px, 1.15vw, 17px)', color: '#6D6962', lineHeight: 1.75, maxWidth: 340, opacity: 0, marginBottom: 40 }}>
            From raw spice to commercially validated formulation — powered by science, sensory expertise, and 50 years of flavour knowledge.
          </p>

          {/* Stats strip */}
          <div style={{ display: 'flex', gap: 'clamp(24px,3vw,48px)', flexWrap: 'wrap' }}>
            {[
              { value: '425+', label: 'Blends Developed' },
              { value: '50+',  label: 'New / Year' },
              { value: '12',   label: 'Scientists' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.5vw,34px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: '#6D6962', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Lab image */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: '80%', aspectRatio: '1/1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(172,3,59,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div ref={imgRef} style={{ position: 'relative', width: '100%', maxWidth: 560, aspectRatio: '4/5', opacity: 0, borderRadius: 24, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.1)' }}>
            <Image
              src="/images/lab.png"
              alt="LV Spices R&D Laboratory"
              fill
              priority
              style={{ objectFit: 'cover' }}
              sizes="(max-width:768px) 90vw, 50vw"
            />
            {/* gradient overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(172,3,59,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
          </div>

          {/* Badge */}
          <div ref={badgeRef} style={{ position: 'absolute', bottom: '2%', right: 0, textAlign: 'right', opacity: 0, padding: '16px 20px', borderLeft: `2px solid ${CR}` }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5vw,70px)', fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.06em' }}>
              <span ref={counterRef}>0</span>
              <span style={{ fontSize: '0.45em', verticalAlign: 'top', marginLeft: 2 }}>+</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: '#6D6962', textTransform: 'uppercase', marginTop: 4 }}>Blends Developed</div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={scrollHintRef} style={{ position: 'absolute', bottom: 'clamp(20px,3vw,36px)', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0 }}>
        <div style={{ width: 1, height: 40, background: 'rgba(17,17,17,0.2)' }}>
          <div style={{ width: 1, height: '40%', background: CR, animation: 'rndScrollDrop 1.6s ease-in-out infinite' }} />
        </div>
        <style>{`@keyframes rndScrollDrop { 0%{height:0%;opacity:1} 80%{height:100%;opacity:1} 100%{height:100%;opacity:0} }`}</style>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', color: '#6D6962', textTransform: 'uppercase' }}>Scroll to explore</span>
      </div>
    </section>
  );
}
