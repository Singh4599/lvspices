'use client';

import React, { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const CR = '#e62e04'; // Red
const INK = '#2C1200'; // Dark brown
const GREEN = '#2E6B3E'; // IPM Green
const ORANGE = '#E8760A';

interface NodeData {
  id: number;
  title: string;
  desc: string;
  accent: string;
  icon: React.ReactNode;
}

const NODES: NodeData[] = [
  {
    id: 1,
    title: 'The Core of Indian Cuisine',
    desc: 'One of the things that people find intimidating about cooking Indian Food is the vast array of spices used. Rich in antioxidants and alluring tastes, spices are the secret ingredient every good diet boasts of.',
    accent: ORANGE,
    icon: (
      <g>
        <path d="M12 28 C 12 40, 24 44, 32 44 C 40 44, 52 40, 52 28" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M10 28 L 54 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Steam */}
        <path d="M25 18 C 25 10, 30 14, 30 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="steam-anim" />
        <path d="M39 20 C 39 12, 34 16, 34 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="steam-anim" style={{ animationDelay: '0.4s' }} />
      </g>
    )
  },
  {
    id: 2,
    title: 'Our Pioneer Legacy',
    desc: 'LV Spices remains central to its pioneer status today. Chilli has been the backbone of our empire. Our capability to process large volumes has turned us into a cohesive Export House delivering long term food safety.',
    accent: INK,
    icon: (
      <g>
        <circle cx="32" cy="32" r="18" fill="none" stroke="currentColor" strokeWidth="3" />
        <ellipse cx="32" cy="32" rx="18" ry="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M32 14 L 32 50" stroke="currentColor" strokeWidth="2" />
        <path d="M18 19 L 46 19" stroke="currentColor" strokeWidth="2" />
        <path d="M18 45 L 46 45" stroke="currentColor" strokeWidth="2" />
      </g>
    )
  },
  {
    id: 3,
    title: 'IPM & Traceability',
    desc: "Our IPM programme and Strong Backward Integration model aims at 'producing the buy rather than buying the produce'. This ecological approach controls pests without relying solely on pesticides.",
    accent: GREEN,
    icon: (
      <g>
        <path d="M32 48 L 32 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M32 38 C 20 38, 16 30, 16 20 C 24 20, 32 28, 32 38" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M32 30 C 44 30, 48 22, 48 12 C 40 12, 32 20, 32 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="spin-slow" />
      </g>
    )
  },
  {
    id: 4,
    title: '50+ Chilli Variations',
    desc: 'We boast of more than 50 Products in different forms of chillies. From Raw to Stemless to Crushed to Ground, fulfilling requirements for both domestic and international markets.',
    accent: CR,
    icon: (
      <g>
        <path d="M22 14 C 35 10, 48 20, 44 42 C 43 48, 35 50, 30 46 C 20 35, 12 25, 22 14 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M22 14 C 18 10, 18 5, 22 5 C 26 5, 28 8, 28 12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  }
];

export default function ChilliIntroMap() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div style={{ position: 'relative', width: '100%', margin: '40px 0 20px' }}>
      <style>{`
        @keyframes flowDash {
          to { stroke-dashoffset: -24; }
        }
        @keyframes steamFloat {
          0% { opacity: 0; transform: translateY(4px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }
        .flow-line {
          animation: flowDash 1s linear infinite;
        }
        .steam-anim {
          animation: steamFloat 2s ease-in-out infinite;
        }
        .spin-slow {
          animation: spinSlow 10s linear infinite;
          transform-origin: 32px 32px;
        }

        .chilli-map-container {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          position: relative;
          gap: 20px;
        }
        .chilli-node {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .chilli-track {
          position: absolute;
          top: 40px;
          left: 12%;
          right: 12%;
          height: 3px;
          z-index: 1;
        }

        @media (max-width: 900px) {
          .chilli-map-container {
            flex-direction: column;
            gap: 40px;
          }
          .chilli-node {
            flex-direction: row;
            text-align: left;
            align-items: flex-start;
            gap: 24px;
          }
          .chilli-track {
            top: 40px;
            bottom: 40px;
            left: 39px;
            width: 3px;
            height: auto;
            right: auto;
          }
        }
      `}</style>

      <ScrollReveal fromY={20}>
        <div className="chilli-map-container">
          
          {/* Background Track SVG */}
          <div className="chilli-track">
            <svg width="100%" height="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
              <line x1="0" y1="0" x2="100%" y2="0" stroke="#ddd" strokeWidth="3" className="desktop-line" />
              <line x1="0" y1="0" x2="100%" y2="0" stroke={CR} strokeWidth="3" strokeDasharray="8 8" className="flow-line desktop-line" />
              
              <line x1="0" y1="0" x2="0" y2="100%" stroke="#ddd" strokeWidth="3" className="mobile-line" />
              <line x1="0" y1="0" x2="0" y2="100%" stroke={CR} strokeWidth="3" strokeDasharray="8 8" className="flow-line mobile-line" />
              
              <style>{`
                .mobile-line { display: none; }
                @media (max-width: 900px) {
                  .desktop-line { display: none; }
                  .mobile-line { display: block; }
                }
              `}</style>
            </svg>
          </div>

          {NODES.map((n, i) => (
            <div 
              key={n.id} 
              className="chilli-node"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Icon Circle */}
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: active === i ? n.accent : '#fff',
                border: `2px solid ${active === i ? n.accent : '#eaeaea'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: active === i ? '#fff' : n.accent,
                boxShadow: active === i ? `0 10px 24px ${n.accent}40` : '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                flexShrink: 0,
                position: 'relative'
              }}>
                <svg width="40" height="40" viewBox="0 0 64 64" style={{ overflow: 'visible' }}>
                  {n.icon}
                </svg>
                
                {/* Node Number Badge */}
                <div style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#111',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  border: '2px solid #fff'
                }}>
                  {n.id}
                </div>
              </div>

              {/* Text Content */}
              <div style={{ flex: 1, marginTop: 16 }} className="chilli-node-text">
                <style>{`
                  @media (max-width: 900px) {
                    .chilli-node-text { margin-top: 0 !important; padding-top: 10px; }
                  }
                `}</style>
                <h3 style={{ 
                  fontFamily: 'var(--font-display), serif', 
                  fontSize: 'clamp(18px, 1.5vw, 22px)', 
                  fontWeight: 800, 
                  color: '#111',
                  marginBottom: 12,
                  lineHeight: 1.2
                }}>
                  {n.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-sans), sans-serif',
                  fontSize: 'clamp(13.5px, 1.1vw, 15px)',
                  color: '#555',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {n.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
