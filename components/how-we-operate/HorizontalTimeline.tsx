'use client';

import React from 'react';
import { Leaf, Search, ShieldX, Wind, Layers, Snowflake, CheckCircle, Package } from 'lucide-react';

const steps = [
  { id: 1, title: 'Spices are procured from finest farms', icon: <Leaf size={28} /> },
  { id: 2, title: '360 inspection and testing', icon: <Search size={28} /> },
  { id: 3, title: 'Rejection of low grade spices', icon: <ShieldX size={28} /> },
  { id: 4, title: 'Automated cleaning to remove dust & impurities', icon: <Wind size={28} /> },
  { id: 5, title: 'Grading & blending of spices', icon: <Layers size={28} /> },
  { id: 6, title: 'Cryogenic grinding at -150 C', icon: <Snowflake size={28} /> },
  { id: 7, title: 'Testing by professionals', icon: <CheckCircle size={28} /> },
  { id: 8, title: 'Automated & hygienic packaging process', icon: <Package size={28} /> },
];

export default function HorizontalTimeline() {
  return (
    <section style={{ padding: '80px 24px', background: '#FAFAFA' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        <h2 style={{ 
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', 
          fontWeight: 700, color: '#111', lineHeight: 1.2, maxWidth: 800, marginBottom: 80 
        }}>
          We are leading the Spice Industry with State-of-the-Art Infrastructure and Top-Class Facilities
        </h2>

        {/* Desktop Zigzag / Flow container */}
        <div className="timeline-container hidden md:block relative" style={{ position: 'relative', minHeight: 400 }}>
          
          {/* Dashed line background */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} xmlns="http://www.w3.org/2000/svg">
             {/* Simple snake path connecting top row and bottom row */}
             <path 
                d="M 120 80 L 1080 80 Q 1120 80 1120 120 L 1120 200 Q 1120 240 1080 240 L 120 240"
                fill="none" 
                stroke="#C2A878" 
                strokeWidth="2" 
                strokeDasharray="8 8" 
             />
             {/* Arrows at end */}
             <polygon points="120,240 135,232 135,248" fill="#C2A878" />
             <polygon points="1120,200 1112,185 1128,185" fill="#C2A878" />
          </svg>

          {/* Nodes */}
          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', padding: '0 40px' }}>
            {/* Top Row: 1 to 4 */}
            {steps.slice(0, 4).map((step, i) => (
              <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%', background: '#4CAF50', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '8px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  marginBottom: 16
                }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#333', maxWidth: 160 }}>{step.title}</div>
              </div>
            ))}
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', padding: '0 40px', marginTop: 80, direction: 'rtl' }}>
            {/* Bottom Row: 5 to 8 (RTL so 5 is on the right) */}
            {steps.slice(4, 8).map((step) => (
              <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', direction: 'ltr' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%', background: '#4CAF50', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '8px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  marginBottom: 16
                }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#333', maxWidth: 160 }}>{step.title}</div>
              </div>
            ))}
          </div>

        </div>

        {/* Mobile vertical flow */}
        <div className="timeline-mobile md:hidden flex flex-col gap-8 relative" style={{ paddingLeft: 24 }}>
          {/* Vertical dashed line */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 63, width: 2, background: 'repeating-linear-gradient(to bottom, #C2A878, #C2A878 8px, transparent 8px, transparent 16px)' }} />
          
          {steps.map((step) => (
            <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: 24, position: 'relative', zIndex: 1 }}>
              <div style={{
                  width: 80, height: 80, borderRadius: '50%', background: '#4CAF50', color: '#fff', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '8px solid #FAFAFA', boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }}>
                  {step.icon}
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#333' }}>{step.title}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
