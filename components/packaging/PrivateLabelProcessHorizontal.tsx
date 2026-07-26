'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const steps = [
  {
    id: '01',
    title: 'Brand Vision',
    desc: 'Tell us your brand story, target market, pack sizes, and the products you want to launch. A simple one-page brief is enough for our team to get started.',
    stat: 'FAST ONBOARDING',
    img: '/images/spice_portrait.png'
  },
  {
    id: '02',
    title: 'Artwork & Design',
    desc: 'Concepts, mockups, and final print-ready files — built by our in-house design team. Multiple revisions are included at no extra cost to ensure perfection.',
    stat: 'IN-HOUSE DESIGN',
    img: '/images/fac_lab.png'
  },
  {
    id: '03',
    title: 'Final Approval',
    desc: 'Iterate as much as you need. We only move forward to printing and packing once you sign off on the final artwork and regulatory compliance checks are complete.',
    stat: '100% COMPLIANT',
    img: '/images/lab.png'
  },
  {
    id: '04',
    title: 'Source & Pack',
    desc: 'Pan-India sourcing from certified farms, processing at our plant, and your brand on every pack. We handle everything from 50g pouches to 25kg bulk bags.',
    stat: 'FSSC 22000 PLANT',
    img: '/images/fac_pack.png'
  },
  {
    id: '05',
    title: 'Quality Check',
    desc: 'Lab-tested batches, labels validated for the destination market, and a full Certificate of Analysis (COA) for each lot. We strictly maintain a zero-defect policy.',
    stat: 'ZERO DEFECTS',
    img: '/images/fac_sorting.png'
  },
  {
    id: '06',
    title: 'Shipped & Delivered',
    desc: 'Container loaded securely. All export documentation (Certificate of Origin, APEDA, Phyto-sanitary) is prepared and handed over for smooth customs clearance.',
    stat: 'GLOBAL SHIPPING',
    img: '/images/fac_warehouse.png'
  }
];

export default function PrivateLabelProcessHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current || !containerRef.current) return;

    // Use mm.add for responsive logic
    let ctx = gsap.matchMedia();
    
    ctx.add("(min-width: 900px)", () => {
      // Horizontal Scroll Animation
      const sections = gsap.utils.toArray('.pl-process-panel');
      
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
    <section ref={sectionRef} style={{ background: '#111', overflow: 'hidden', position: 'relative' }}>
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
            className="pl-process-panel"
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
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '5%',
              transform: 'translateY(-50%)',
              fontFamily: 'var(--font-display)',
              fontSize: '40vw',
              fontWeight: 900,
              color: 'rgba(255,255,255,0.02)',
              pointerEvents: 'none',
              lineHeight: 1,
              zIndex: 0
            }}>
              {step.id}
            </div>

            <div style={{ display: 'flex', width: '100%', height: '100%', maxWidth: 1600, margin: '0 auto', gap: 'clamp(40px, 8vw, 120px)', alignItems: 'center', zIndex: 10, position: 'relative' }}>
              
              {/* Text Side */}
              <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.25em', color: '#AC033B', fontWeight: 700 }}>STAGE {step.id} / 06</span>
                  <span style={{ width: 40, height: 1, background: '#AC033B' }} />
                </div>
                
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 6vw, 90px)', fontWeight: 800, margin: '0 0 24px', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
                  {step.title}
                </h3>
                
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 1.4vw, 20px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 480, margin: '0 0 40px' }}>
                  {step.desc}
                </p>

                <div style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, display: 'inline-block', alignSelf: 'flex-start', backdropFilter: 'blur(10px)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Advantage</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>{step.stat}</div>
                </div>
              </div>

              {/* Image Side */}
              <div style={{ flex: '1 1 500px', height: '70vh', position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}>
                <div className="panel-image" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  <Image src={step.img} alt={step.title} fill style={{ objectFit: 'cover' }} />
                  {/* Subtle Gradient Overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,17,17,0.3), transparent)', pointerEvents: 'none' }} />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Mobile Styles (Stack normally instead of horizontal scroll) */}
      <style>{`
        @media (max-width: 900px) {
          .horizontal-container {
            flex-direction: column !important;
            width: 100% !important;
            height: auto !important;
          }
          .pl-process-panel {
            width: 100% !important;
            height: auto !important;
            min-height: 100vh;
            padding: 80px 24px !important;
          }
          .pl-process-panel > div:last-child {
            flex-direction: column !important;
            gap: 40px !important;
          }
          .pl-process-panel > div:last-child > div:last-child {
            height: 50vh !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
