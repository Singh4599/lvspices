'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

const CRIMSON = '#111111';
const INK = '#111111';
const INK_L = 'rgba(0,0,0,0.5)';

interface FAQ {
  q: string;
  a: string;
}

interface Category {
  category: string;
  faqs: FAQ[];
  x: number;
  y: number;
  icon: string;
}

// Compact coordinates for a 400x400 viewBox (Perfect for Mobile & Desktop)
const CATEGORIES: Category[] = [
  { category: 'About LV Spices', x: 75, y: 200, icon: '🏢', faqs: [] },
  { category: 'Products & Range', x: 130, y: 90, icon: '🌶️', faqs: [] },
  { category: 'Export & Supply', x: 270, y: 90, icon: '🚢', faqs: [] },
  { category: 'Quality & Cert.', x: 325, y: 200, icon: '🔬', faqs: [] },
  { category: 'Private Label', x: 270, y: 310, icon: '🏷️', faqs: [] },
  { category: 'Orders & MOQ', x: 130, y: 310, icon: '📦', faqs: [] },
];

const CSS = `
  .fmm-wrapper {
    display: flex;
    flex-wrap: nowrap;
    gap: 40px;
    align-items: flex-start;
    width: 100%;
  }
  @media (max-width: 900px) {
    .fmm-wrapper {
      flex-direction: column;
      gap: 24px;
    }
  }

  .fmm-pulse-line {
    stroke-dasharray: 4 6;
    animation: fmmTravel 2s linear infinite;
  }
  @keyframes fmmTravel {
    to { stroke-dashoffset: -100; }
  }
  
  .fmm-node { cursor: pointer; }
  .fmm-node-g:hover .node-bg { fill: #fff !important; filter: drop-shadow(0 12px 24px rgba(17,17,17,0.15)) !important; }
  
  .blueprint-light {
    background-color: #Fdfcf9;
    background-image: 
      linear-gradient(rgba(17,17,17,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(17,17,17,0.04) 1px, transparent 1px);
    background-size: 20px 20px;
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 24px;
    position: relative;
    overflow: hidden;
  }

  /* Sweep animation for light mode */
  .blueprint-light::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    width: 200%; height: 200%;
    background: conic-gradient(from 0deg, transparent 70%, rgba(17,17,17,0.05) 100%);
    transform-origin: center;
    animation: radarSweep 8s linear infinite;
    pointer-events: none;
    margin-left: -100%; margin-top: -100%;
  }
`;

function FAQAccordionItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.5, ease: 'expo.out' });
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power3.inOut' });
    }
  }, [isOpen]);

  return (
    <div style={{
      borderBottom: `1px solid ${isOpen ? 'rgba(17,17,17,0.2)' : 'rgba(0,0,0,0.06)'}`,
      marginBottom: 8, transition: 'all 0.4s ease'
    }}>
      <button onClick={onToggle} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        padding: '24px 8px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
      }}>
        <span style={{ 
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px, 1.2vw, 16px)', 
          fontWeight: isOpen ? 700 : 500, color: isOpen ? CRIMSON : '#111', 
          lineHeight: 1.5, transition: 'all 0.3s' 
        }}>
          {faq.q}
        </span>
        <span style={{
          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
          background: isOpen ? 'rgba(17,17,17,0.05)' : 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isOpen ? CRIMSON : '#111', fontSize: 18, transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          transform: isOpen ? 'rotate(135deg)' : 'none'
        }}>
          +
        </span>
      </button>

      <div ref={contentRef} style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
        <div style={{ padding: '0 8px 32px 8px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px, 1.1vw, 15px)', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, margin: 0 }}>
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQMindMap({ faqData }: { faqData: { category: string; faqs: FAQ[] }[] }) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [openQ, setOpenQ] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<SVGGElement[]>([]);

  const nodes = CATEGORIES.map(c => {
    const match = faqData.find(d => d.category.includes(c.category.split(' ')[0]));
    return { ...c, faqs: match?.faqs || [] };
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      gsap.from('.fmm-line-base', { strokeDashoffset: 200, strokeDasharray: 200, duration: 1.5, ease: 'power3.inOut', stagger: 0.1 });
      gsap.from('.fmm-node-g', { scale: 0, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.5)', stagger: 0.1, transformOrigin: 'center', delay: 0.5 });
      gsap.from('.fmm-panel', { y: 40, opacity: 0, duration: 1, ease: 'expo.out', clearProps: 'all', delay: 1.2 });

      // Continuous floating animation for nodes
      nodesRef.current.forEach((node, i) => {
        if (node) {
          gsap.to(node, {
            y: '+=6',
            duration: 2 + (i % 3) * 0.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: i * 0.2
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleNodeClick = (idx: number) => {
    if (activeIdx === idx) return;
    
    const panel = containerRef.current?.querySelector('.fmm-panel-content');
    if (panel) {
      gsap.to(panel, {
        opacity: 0, x: 20, duration: 0.2, ease: 'power2.in', onComplete: () => {
          setActiveIdx(idx);
          setOpenQ(0);
          gsap.fromTo(panel, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'expo.out' });
        }
      });
    } else {
      setActiveIdx(idx);
      setOpenQ(0);
    }
  };

  const activeNode = nodes[activeIdx];

  return (
    <div ref={containerRef} className="fmm-wrapper">
      <style>{CSS}</style>

      {/* ── CENTRAL: Light WOW Blueprint Mind-Map ── */}
      <div className="blueprint-light" style={{
        width: '100%', maxWidth: 800, margin: '0 auto',
        padding: 'clamp(24px, 5vw, 48px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        
        {/* Compact viewBox 400x400 naturally scales to fit phone screen perfectly without scrollbars */}
        <svg viewBox="0 0 400 400" style={{ width: '100%', height: 'auto', maxWidth: 500, overflow: 'visible', marginBottom: 24 }}>
          
          <defs>
            <filter id="glow-crimson" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="drop-shadow-light">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(0,0,0,0.06)" />
            </filter>
          </defs>

          {/* Central Hub */}
          <g transform="translate(200,200)">
            <circle cx="0" cy="0" r="45" fill="#fff" filter="url(#drop-shadow-light)" />
            <circle cx="0" cy="0" r="35" fill="rgba(17,17,17,0.04)" />
            <circle cx="0" cy="0" r="30" fill="none" stroke={CRIMSON} strokeWidth="1.5" strokeDasharray="3 3" className="fmm-pulse-line" />
            <text x="0" y="4" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="800" fill={CRIMSON} letterSpacing="0.1em">FAQ</text>
          </g>

          {/* Connecting Lines */}
          <g stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" fill="none">
            {nodes.map((n, i) => (
              <g key={'line'+i}>
                <line x1="200" y1="200" x2={n.x} y2={n.y} className="fmm-line-base" />
                {activeIdx === i && (
                  <line x1="200" y1="200" x2={n.x} y2={n.y} stroke={CRIMSON} strokeWidth="2" className="fmm-pulse-line" filter="url(#glow-crimson)" />
                )}
              </g>
            ))}
          </g>

          {/* Nodes */}
          {nodes.map((n, i) => {
            const isActive = activeIdx === i;
            return (
              <g key={'node'+i} 
                ref={el => { if(el) nodesRef.current[i] = el; }}
                transform={`translate(${n.x}, ${n.y})`} 
                onClick={() => handleNodeClick(i)}
                className="fmm-node fmm-node-g"
                style={{ opacity: (activeIdx !== i && activeIdx !== -1) ? 0.6 : 1 }}
              >
                {/* Node Box (Light Glassmorphism) */}
                <rect x="-55" y="-30" width="110" height="60" rx="12" 
                      fill={isActive ? '#fff' : 'rgba(255,255,255,0.7)'} 
                      stroke={isActive ? CRIMSON : 'rgba(0,0,0,0.06)'} 
                      strokeWidth={isActive ? 1.5 : 1} 
                      className="node-bg"
                      style={{ transition: 'all 0.3s' }}
                      filter={isActive ? 'drop-shadow(0 8px 16px rgba(17,17,17,0.15))' : 'url(#drop-shadow-light)'}
                />
                
                {/* Icon */}
                <text x="0" y="-8" textAnchor="middle" fontSize="16">{n.icon}</text>
                
                {/* Label */}
                <text x="0" y="10" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="9" fontWeight="700" fill={isActive ? CRIMSON : INK} letterSpacing="0.02em">
                  {n.category.toUpperCase()}
                </text>
                
                {/* Question Count Badge */}
                <rect x="-16" y="16" width="32" height="14" rx="7" fill={isActive ? 'rgba(17,17,17,0.1)' : 'rgba(0,0,0,0.04)'} />
                <text x="0" y="26" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fontWeight="700" fill={isActive ? CRIMSON : INK_L}>
                  {n.faqs.length} Qs
                </text>
              </g>
            );
          })}
        </svg>

        <p style={{ fontFamily: 'var(--font-sans),system-ui', fontSize: 13, color: 'rgba(0,0,0,0.5)', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'center' }}>
          ← Click any node to explore FAQs →
        </p>
      </div>

      {/* Floating Modal Overlay */}
      {activeIdx !== -1 && activeNode && (
        <div className="school-modal-overlay" onClick={() => setActiveIdx(-1)} style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24, animation: 'school-slideUp 0.3s cubic-bezier(0.16,1,0.3,1)'
        }}>
          <div style={{
            background: '#fff', borderRadius: 0, border: `2px solid ${INK}`,
            padding: 'clamp(32px,5vw,48px)', maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto',
            boxShadow: `8px 8px 0px ${CRIMSON}`,
            animation: 'school-popup-reveal 0.3s cubic-bezier(0.16,1,0.3,1)',
            position: 'relative',
          }} onClick={e => e.stopPropagation()}>

            <button onClick={() => setActiveIdx(-1)} style={{
              position: 'absolute', top: 20, right: 20, background: INK, border: 'none',
              fontSize: 24, color: '#fff', cursor: 'pointer', width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', zIndex: 2,
            }}
              onMouseEnter={e => (e.currentTarget.style.background = CRIMSON)}
              onMouseLeave={e => (e.currentTarget.style.background = INK)}
            >×</button>

            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(17,17,17,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {activeNode.icon}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: CRIMSON, fontWeight: 700 }}>
                  Knowledge Base
                </div>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, color: '#111', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em', paddingRight: 40 }}>
                {activeNode.category}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {activeNode.faqs.map((faq, i) => (
                <FAQAccordionItem 
                  key={i} 
                  faq={faq} 
                  isOpen={openQ === i} 
                  onToggle={() => setOpenQ(prev => prev === i ? -1 : i)} 
                />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
