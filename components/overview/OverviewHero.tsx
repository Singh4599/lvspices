'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OverviewHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.matchMedia();
    
    ctx.add("all", () => {
      gsap.fromTo(
        ".oh-logo-quad", 
        { scale: 0.8, opacity: 0, rotation: -10 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.2, stagger: 0.1, ease: "power3.out" }
      );
      
      gsap.fromTo(
        ".oh-text-elem",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.3 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ backgroundColor: '#000', padding: '120px 24px', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
        
        {/* Left Side: 4 Quadrant Logo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', width: '100%', maxWidth: '400px', margin: '0 auto', borderRadius: '40px', overflow: 'hidden' }}>
          {/* Quad 1: Red Chili */}
          <div className="oh-logo-quad" style={{ backgroundColor: '#d32f2f', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: '40px' }}>
            <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12c-1.5 0-3-1-4.5-3a8 8 0 0 0-9 1 8 8 0 0 0 1 9c2 1.5 3 3 3 4.5" />
              <path d="M16.5 4.5A2.5 2.5 0 0 0 14 7c0 1.5-1 3-3 4.5" />
            </svg>
          </div>
          {/* Quad 2: Light Green Leaf */}
          <div className="oh-logo-quad" style={{ backgroundColor: '#8bc34a', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopRightRadius: '40px' }}>
            <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>
          {/* Quad 3: Green Leaf */}
          <div className="oh-logo-quad" style={{ backgroundColor: '#4caf50', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: '40px' }}>
            <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20" />
              <path d="M12 22A10 10 0 0 1 2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10z" />
            </svg>
          </div>
          {/* Quad 4: Dark Red Flower */}
          <div className="oh-logo-quad" style={{ backgroundColor: '#b71c1c', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottomRightRadius: '40px' }}>
            <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 12 7 7" />
              <path d="m12 12 5-5" />
              <path d="m12 12 5 5" />
              <path d="m12 12-5 5" />
            </svg>
          </div>
        </div>

        {/* Right Side: Text */}
        <div style={{ color: '#fff' }}>
          <h1 className="oh-text-elem" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, margin: '0 0 24px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            About LV Spices
          </h1>
          <p className="oh-text-elem" style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 24px', lineHeight: 1.6, color: '#f5f5f5' }}>
            As a family-owned enterprise, LV Spices owes its legacy to the parent company founded in 1975.
          </p>
          <p className="oh-text-elem" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', margin: '0 0 24px', lineHeight: 1.8 }}>
            Today, generations later, the family is still rooted firmly in the spice business. With an unwavering commitment to quality and service, each generation has singularly contributed to technically and qualitatively modernizing the business, always widening the horizons. 
          </p>
          <p className="oh-text-elem" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.8 }}>
            The firm mantra since inception has been consistent adherence to Vintage Values, Tomorrow's Technology & Global Presence.
          </p>
        </div>

      </div>
    </section>
  );
}
