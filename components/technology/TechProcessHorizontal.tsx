'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import Image from 'next/image';

const steps = [
  {
    id: '01',
    title: 'Seed Cleaning',
    desc: 'The line primarily removes farm admixtures, insect excreta, potential allergens, and ferrous/non-ferrous contaminants using Sifters, De-Stoners, Spirals, Gravity Separators, and the latest A+ Multivision Sortex with online Metal Detectors.',
    stat: '1–3 TONS/HR',
    img: '/images/seedcleaner.png'
  },
  {
    id: '02',
    title: 'Milling',
    desc: 'Temperature deltas are critically controlled to prevent overheating — ensuring retention of flavour, negligible SHU loss, ASTA colour, and volatile oil. We have 3 Milling Lines, each tailored for specific product needs.',
    stat: 'ZERO SHU LOSS',
    img: '/images/milling.png'
  },
  {
    id: '03',
    title: 'Roasting',
    desc: 'No Indian Spice Blend is complete without the special roasted flavour. Our dedicated Roasting Line perfectly achieves custom roasted blends to guarantee that extra special taste.',
    stat: '4000 MTS/YR',
    img: '/images/roasting.png'
  },
  {
    id: '04',
    title: 'Steam Sterilization',
    desc: 'An environmental-friendly and extremely effective sterilization method yielding a validated 5-log microbial reduction. The process uses high temperature, indirect contact and pre-heating.',
    stat: '5-LOG REDUCTION',
    img: '/images/steamsterlization.png'
  },
  {
    id: '05',
    title: 'Cryogenic Grinding',
    desc: 'Cryogenic grinding at -150°C preserves 40% more essential oils, colour, and aroma than conventional ambient grinding — making it the gold standard for premium spice processing.',
    stat: '-150°C TEMP',
    img: '/images/cryogenic.png'
  },
  {
    id: '06',
    title: 'CFG Technology',
    desc: 'Continuous Flow Grinding (CFG) process is the most advanced spice processing technology in India. It eliminates batch-to-batch variation by continuously feeding, grinding, and classifying spices in a closed-loop system.',
    stat: 'FSMA VALIDATED',
    img: '/images/cfg.png'
  }
];

export default function TechProcessHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current || !containerRef.current) return;

    // Enable horizontal scroll on all screen sizes
    let ctx = gsap.matchMedia();
    
    ctx.add("(min-width: 0px)", () => {
      // Horizontal Scroll Animation
      const sections = gsap.utils.toArray('.process-panel');
      
      const tl = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + containerRef.current?.offsetWidth
        }
      });
      
      // Image Parallax within panels
      sections.forEach((sec: any) => {
        const img = sec.querySelector('.panel-image');
        if(img) {
          gsap.fromTo(img, 
            { scale: 1.15, transformOrigin: 'right center' },
            { 
              scale: 1, 
              ease: "none",
              scrollTrigger: {
                trigger: sec,
                containerAnimation: tl,
                start: "left right",
                end: "left left",
                scrub: true
              }
            }
          );
        }
      });

      return () => {
        tl.kill();
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: '#fafafa', overflow: 'hidden', position: 'relative' }}>
      <div 
        ref={containerRef} 
        style={{ 
          display: 'flex', 
          width: `${steps.length * 100}vw`,
          height: '100vh',
          willChange: 'transform'
        }}
        className="horizontal-container"
      >
        {steps.map((step, i) => (
          <div 
            key={step.id} 
            className="process-panel"
            style={{ 
              width: '100vw', 
              height: '100vh', 
              display: 'flex',
              alignItems: 'center',
              padding: 'clamp(24px, 5vw, 80px)',
              position: 'relative'
            }}
          >
            {/* Background Step Number Watermark */}
            <div className="step-watermark" style={{
              position: 'absolute',
              top: '50%',
              left: '5%',
              transform: 'translateY(-50%)',
              fontFamily: 'var(--font-display)',
              fontSize: '40vw',
              fontWeight: 900,
              color: 'rgba(0,0,0,0.02)',
              pointerEvents: 'none',
              lineHeight: 1,
              zIndex: 0
            }}>
              {step.id}
            </div>

            <div className="panel-inner" style={{ display: 'flex', width: '100%', height: '100%', maxWidth: 1600, margin: '0 auto', gap: 'clamp(40px, 8vw, 120px)', alignItems: 'center', zIndex: 10, position: 'relative' }}>
              
              {/* Text Side */}
              <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.25em', color: '#AC033B', fontWeight: 700 }}>STEP {step.id} / 06</span>
                  <span style={{ width: 40, height: 1, background: '#AC033B' }} />
                </div>
                
                <h3 className="panel-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 90px)', fontWeight: 800, margin: '0 0 24px', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#111' }}>
                  {step.title}
                </h3>
                
                <p className="panel-desc" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px, 1.4vw, 20px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.8, maxWidth: 480, margin: '0 0 40px' }}>
                  {step.desc}
                </p>

                <div className="panel-metric" style={{ padding: '16px 24px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, display: 'inline-block', alignSelf: 'flex-start', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 4 }}>Key Metric</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: '#111', letterSpacing: '0.05em' }}>{step.stat}</div>
                </div>
              </div>

              {/* Real Photo */}
              <div className="panel-img-wrap" style={{ flex: '1 1 500px', height: '70vh', position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.12)' }}>
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  className="panel-image"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width:900px) 90vw, 50vw"
                  priority={i < 2}
                />
                {/* Subtle gradient overlay for text contrast */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(172,3,59,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Mobile Styles - Keep horizontal scroll but stack text and image internally */}
      <style>{`
        @media (max-width: 900px) {
          .process-panel {
            padding: 120px 24px 40px !important; /* Space for navbar */
          }
          .panel-inner {
            flex-direction: column !important;
            gap: 24px !important;
            justify-content: flex-start !important;
          }
          .panel-inner > div:first-child {
            flex: 0 0 auto !important; /* Text side doesn't grow */
          }
          .panel-title {
            margin-bottom: 12px !important;
          }
          .panel-desc {
            margin-bottom: 24px !important;
          }
          .panel-img-wrap {
            height: 40vh !important; /* Smaller image on mobile */
            width: 100% !important;
            flex: 1 1 auto !important;
          }
          .step-watermark {
            font-size: 70vw !important;
            top: 10% !important;
            left: -5% !important;
          }
          .panel-metric {
            padding: 12px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
