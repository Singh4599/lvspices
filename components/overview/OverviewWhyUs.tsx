'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, SearchCheck, Globe2, Cpu, Target, FileCheck, Factory } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { label: 'Organic & Sustainable', icon: <Leaf size={40} /> },
  { label: 'Purity and Superior Quality', icon: <SearchCheck size={40} /> },
  { label: 'Global Presence', icon: <Globe2 size={40} /> },
  { label: 'State of Art Processing', icon: <Cpu size={40} /> },
  { label: 'Globally Certified and Tested', icon: <Target size={40} /> },
  { label: 'Farm to Fork Traceability', icon: <FileCheck size={40} /> },
  { label: 'Steam Sterilization Unit', icon: <Factory size={40} /> }
];

export default function OverviewWhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.matchMedia();
    
    ctx.add("all", () => {
      gsap.fromTo(
        ".wu-item",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ backgroundColor: '#000', padding: '120px 24px', minHeight: '80vh', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 64px)', color: '#fff', marginBottom: '80px', fontWeight: 600 }}>
        Why Us?
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 800, margin: '0 auto 80px', fontSize: '18px', lineHeight: 1.6 }}>
        For more than a century now, we at LV Spices have always strived to outperform ourselves by introducing innovative technology and processes to increase efficiency and outcome.
      </p>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '40px', 
        maxWidth: 1200, 
        margin: '0 auto' 
      }}>
        {FEATURES.map((feat, idx) => (
          <div key={idx} className="wu-item" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '240px',
            gap: '24px' 
          }}>
            <div style={{ color: '#8bc34a' }}>
              {feat.icon}
            </div>
            <div style={{ color: '#fff', fontSize: '15px', fontWeight: 500 }}>
              {feat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
