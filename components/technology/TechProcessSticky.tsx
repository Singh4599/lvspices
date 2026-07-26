'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const steps = [
  {
    id: '01',
    title: 'Seed Cleaning',
    desc: 'The line primarily removes farm admixtures, insect excreta, potential allergens, and ferrous/non-ferrous contaminants using Sifters, De-Stoners, Spirals, Gravity Separators, and the latest A+ Multivision Sortex with online Metal Detectors. Processing Capacity: 1 – 3 tons / hour.',
    img: '/images/tech_seed_cleaning.png'
  },
  {
    id: '02',
    title: 'Milling',
    desc: 'Temperature deltas are critically controlled to prevent overheating — ensuring retention of flavour, negligible SHU loss, ASTA colour, and volatile oil. We have 3 Milling Lines, each tailored for specific product needs.',
    img: '/images/tech_milling.png'
  },
  {
    id: '03',
    title: 'Roasting',
    desc: 'No Indian Spice Blend is complete without the special roasted flavour. Our dedicated Roasting Line perfectly achieves custom roasted blends to guarantee that extra special taste. Capacity: 4000 mts/yr.',
    img: '/images/tech_roasting.png'
  },
  {
    id: '04',
    title: 'Steam Sterilization',
    desc: 'An environmental-friendly and extremely effective sterilization method yielding a validated 5-log microbial reduction. The process uses high temperature, indirect contact and pre-heating, allowing for good retention of volatile oil and minimal colour changes.',
    img: '/images/tech_sterilization.png'
  },
  {
    id: '05',
    title: 'Cryogenic Grinding',
    desc: 'Cryogenic grinding at -150°C preserves 40% more essential oils, colour, and aroma than conventional ambient grinding — making it the gold standard for premium spice processing.',
    img: '/images/cryo-dark.png'
  },
  {
    id: '06',
    title: 'CFG Technology',
    desc: 'Continuous Flow Grinding (CFG) process is the most advanced spice processing technology in India. It eliminates batch-to-batch variation by continuously feeding, grinding, and classifying spices in a closed-loop system. FDA 21 CFR Part 117 FSMA validated.',
    img: '/images/tech_cfg.png'
  }
];

export default function TechProcessSticky() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Pin the right column
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: rightColRef.current,
        pinSpacing: false,
      });

      // Animate opacity of text and images based on scroll position
      textRefs.current.forEach((textEl, i) => {
        if (!textEl) return;
        
        ScrollTrigger.create({
          trigger: textEl,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            gsap.to(textEl, { opacity: 1, duration: 0.4, ease: 'power2.out' });
            if (imageRefs.current[i]) {
              gsap.to(imageRefs.current[i], { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' });
            }
          },
          onLeave: () => {
            gsap.to(textEl, { opacity: 0.25, duration: 0.4 });
            if (imageRefs.current[i] && i !== steps.length - 1) {
              gsap.to(imageRefs.current[i], { opacity: 0, scale: 1.05, duration: 0.6 });
            }
          },
          onEnterBack: () => {
            gsap.to(textEl, { opacity: 1, duration: 0.4, ease: 'power2.out' });
            if (imageRefs.current[i]) {
              gsap.to(imageRefs.current[i], { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' });
            }
          },
          onLeaveBack: () => {
            gsap.to(textEl, { opacity: 0.25, duration: 0.4 });
            if (imageRefs.current[i] && i !== 0) {
              gsap.to(imageRefs.current[i], { opacity: 0, scale: 1.05, duration: 0.6 });
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="tech-process-section" style={{ background: '#fafafa', color: '#111', position: 'relative', display: 'flex', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
      
      {/* ── Left Column: Text (Scrolls) ── */}
      <div ref={leftColRef} style={{ width: '50%', padding: '50vh clamp(24px, 5vw, 80px)' }}>
        {steps.map((step, i) => (
          <div 
            key={step.id} 
            ref={(el) => { textRefs.current[i] = el; }}
            style={{ 
              minHeight: '100vh', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              opacity: i === 0 ? 1 : 0.25 
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.25em', color: '#AC033B', marginBottom: 16 }}>{step.id}</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 4.5vw, 72px)', fontWeight: 700, margin: '0 0 24px', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#111' }}>
              {step.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px, 1.3vw, 18px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.8, maxWidth: 480 }}>
              {step.desc}
            </p>
            <div className="mobile-img" style={{ display: 'none', width: '100%', aspectRatio: '4/3', position: 'relative', marginTop: 32, borderRadius: 16, overflow: 'hidden' }}>
              <Image src={step.img} alt={step.title} fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Right Column: Pinned Images ── */}
      <div 
        ref={rightColRef} 
        style={{ 
          width: '50%', 
          height: '100vh', 
          position: 'relative',
          padding: 'clamp(40px, 5vw, 80px) clamp(24px, 5vw, 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 20px 80px rgba(0,0,0,0.08)' }}>
          {steps.map((step, i) => (
            <div 
              key={step.id}
              ref={(el) => { imageRefs.current[i] = el; }}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? 'scale(1)' : 'scale(1.05)',
                willChange: 'opacity, transform',
                background: '#fff'
              }}
            >
              <Image src={step.img} alt={step.title} fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 40px rgba(0,0,0,0.05)', pointerEvents: 'none' }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile Layout Overlay (hidden on desktop) ── */}
      <style>{`
        .tech-process-section {
          flex-direction: row;
        }
        @media (max-width: 900px) {
          .tech-process-section {
            flex-direction: column !important;
          }
          .tech-process-section > div:first-child {
            width: 100% !important;
            padding: 10vh 24px !important;
          }
          .tech-process-section > div:last-child {
            display: none !important;
          }
          .mobile-img {
            display: block !important;
          }
        }
      `}</style>

    </section>
  );
}
