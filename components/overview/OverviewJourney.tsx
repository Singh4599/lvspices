'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WorldGlobe from '@/components/globe/WorldGlobe';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    years: '1975 - 1980',
    title: 'The Foundation',
    desc: 'The patriarch of the organization imported the first set of machines, laying the roots of a generational family-owned enterprise.',
    align: 'left'
  },
  {
    years: '1995 - 2000',
    title: 'Processing Unit',
    desc: 'A purpose-built processing unit was set up across 30,000 sq ft, becoming pioneers to incorporate advanced aspirators and sorters.',
    align: 'right'
  },
  {
    years: '2005 - 2008',
    title: 'Organic Farming',
    desc: 'Major advancements with the Agri Division certified for Organic Farming. Additional milling lines installed.',
    align: 'left'
  },
  {
    years: '2015',
    title: 'Sustainability Leader',
    desc: 'Became the first company in India to achieve Rainforest Alliance (RFA) for Sustainable Farming in Spices.',
    align: 'right'
  },
  {
    years: '2019 - 2022',
    title: 'Private Label & Expansion',
    desc: 'Commenced operations for Private Labeling. Major upgrades with additional packing lines to meet growing global demands.',
    align: 'left'
  },
  {
    years: '2025 - 2026',
    title: '50 Years of Excellence',
    desc: 'Celebrating a half-century of quality, innovation, and global presence. Expanding our capabilities to set new benchmarks for the future.',
    align: 'right'
  }
];

export default function OverviewJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.matchMedia();
    
    ctx.add("all", () => {
      // Line drawing animation
      gsap.fromTo(".oj-line-path", 
        { strokeDasharray: 2000, strokeDashoffset: 2000 },
        { strokeDashoffset: 0, duration: 2, ease: "none", 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1
          }
        }
      );

      // Milestone dots and text
      gsap.fromTo(".oj-milestone",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ backgroundColor: '#000', padding: '100px 24px', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 64px)', color: '#fff', textAlign: 'center', marginBottom: '80px' }}>
        Our Journey
      </h2>

      <div style={{ position: 'relative', maxWidth: 1400, margin: '0 auto', display: 'flex', gap: '40px' }}>
        
        {/* Left Side: Vertical Timeline */}
        <div style={{ position: 'relative', width: '50%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: '40px' }}>
          
          {/* Central Line SVG */}
          <svg style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '4px', height: '100%', zIndex: 0 }} viewBox="0 0 4 1000" preserveAspectRatio="none">
            <line className="oj-line-path" x1="2" y1="0" x2="2" y2="1000" stroke="#333" strokeWidth="4" />
            <line className="oj-line-path" x1="2" y1="0" x2="2" y2="1000" stroke='#111111' strokeWidth="4" strokeDasharray="1000" strokeDashoffset="1000" />
          </svg>

          {/* Milestones */}
          <div style={{ width: '100%', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '80px', padding: '40px 0' }}>
            {MILESTONES.map((m, idx) => {
              return (
                <div key={idx} className="oj-milestone" style={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'flex-end',
                  position: 'relative'
                }}>
                  
                  {/* Text Content */}
                  <div style={{ width: 'calc(100% - 60px)', textAlign: 'right', paddingRight: '40px' }}>
                    <h3 style={{ color: '#111111', fontSize: '28px', fontWeight: 700, margin: '0 0 8px' }}>{m.years}</h3>
                    <h4 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, margin: '0 0 12px' }}>{m.title}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
                  </div>

                  {/* Marker */}
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#fff', borderRadius: '50%', border: '4px solid #111111', zIndex: 2, position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', boxShadow: '0 0 0 6px rgba(17, 17, 17, 0.2)' }} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Side: Sticky Globe/Map */}
        <div style={{ width: '50%', position: 'relative' }}>
          <div style={{ position: 'sticky', top: '150px', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <WorldGlobe />
          </div>
        </div>

      </div>
    </section>
  );
}
