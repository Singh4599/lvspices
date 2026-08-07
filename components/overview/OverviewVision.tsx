'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { id: 'vision', label: 'Vision', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> },
  { id: 'mission', label: 'Mission', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
  { id: 'values', label: 'Values', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg> }
];

const CONTENT = {
  vision: "To lead the spice industry with a commitment to sustainability, innovation, and integrity. We prioritize integrating cutting-edge technology and adopting sustainable practices to remain adaptable in a dynamic world. By delivering exceptional flavor, wellness, and value, supporting farmers through equitable partnerships, and implementing eco-friendly initiatives, we aim to uphold our responsibility to our customers, communities, and the planet.",
  mission: "We are committed to excellence through innovation, sustainability, and integrity. We enhance flavor, promote health, and ensure food safety using cutting-edge technology. We champion sustainability with initiatives like the Green Footprint Program and uphold transparency and supply chain integrity to ensure trust and quality.",
  values: "Our family-owned enterprise is a legacy founded on trust. Seven generations later, we have taken the business beyond ever-widening horizons while modernizing both technically and qualitatively. Since the beginning, the company's culture has been compliant to Vintage Values, Technology of Tomorrow, and Global Presence."
};

export default function OverviewVision() {
  const [activeTab, setActiveTab] = useState<'vision' | 'mission' | 'values'>('mission');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade in text on tab change
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    }
  }, [activeTab]);

  return (
    <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px' }}>
      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image src="/images/hero-bowl.png" alt="Spices Background" fill style={{ objectFit: 'cover' }} quality={90} priority />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, width: '100%' }}>
        
        {/* Glass Panel */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(20,20,20,0.8), rgba(0,0,0,0.6))', 
          backdropFilter: 'blur(16px)', 
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: 24, 
          padding: '48px', 
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.5)'
        }}>
          
          {/* Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '24px' }}>
            {TABS.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    color: isActive ? '#8bc34a' : 'rgba(255,255,255,0.4)',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ transition: 'transform 0.3s ease', transform: isActive ? 'scale(1.1)' : 'scale(1)' }}>
                    {tab.icon}
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: isActive ? 600 : 400 }}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <div style={{ position: 'absolute', bottom: '-25px', left: 0, right: 0, height: 2, background: '#8bc34a', borderRadius: '2px' }} />
                  )}
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div ref={contentRef} style={{ minHeight: '180px' }}>
            <p style={{ color: '#fff', fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.8, textAlign: 'center', margin: 0, fontWeight: 300, opacity: 0.9 }}>
              {CONTENT[activeTab]}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
