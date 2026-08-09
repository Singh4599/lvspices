'use client';

import { useRef } from 'react';
import { milestones } from '@/data/journey';
import JourneyMilestone from './JourneyMilestone';

const CR = '#111111';

export default function JourneyTimeline() {
  return (
    <section id="timeline" style={{ background: '#FFFFFF', padding: 'clamp(60px,10vw,120px) 0', position: 'relative' }}>

      {/* Section number */}
      <div style={{ position: 'absolute', left: 'clamp(16px,3vw,40px)', top: 'clamp(60px,10vw,120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(17,17,17,0.28)', letterSpacing: '0.14em', writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>03</span>
        <div style={{ width: 1, height: 56, background: 'rgba(17,17,17,0.12)' }} />
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(64px,8vw,140px)' }}>

        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 'clamp(40px,6vw,80px)', alignItems: 'end' }}
          className="timeline-header">
          <style>{`.timeline-header { @media (max-width:767px) { grid-template-columns: 1fr !important; } }`}</style>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 24, height: 1, background: CR }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: CR, textTransform: 'uppercase', fontWeight: 600 }}>Our Journey</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4.5vw,64px)', fontWeight: 800, color: '#111', lineHeight: 1.03, letterSpacing: '-0.04em' }}>
              Five Decades,<br />One Purpose.
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1.1vw,16px)', color: '#6D6962', lineHeight: 1.75, maxWidth: 340 }}>
            From a small home kitchen in 1975 to a globally trusted spice brand — every step built on quality, passion and purpose.
          </p>
        </div>

        {/* Year pills row */}
        <div style={{ display: 'flex', gap: 'clamp(8px,1.5vw,20px)', marginBottom: 'clamp(40px,6vw,72px)', flexWrap: 'wrap' }}>
          {milestones.map((m) => (
            <div key={m.year} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'rgba(17,17,17,0.4)', padding: '5px 12px', border: '1px solid rgba(17,17,17,0.1)', borderRadius: 40 }}>
              {m.year}
            </div>
          ))}
        </div>

        {/* Milestone rows with central spine */}
        <div style={{ position: 'relative' }}>
          {/* Central vertical line */}
          <div
            style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(17,17,17,0.08)', transform: 'translateX(-50%)', zIndex: 0 }}
            className="spine-line"
          />
          <style>{`
            @media (max-width: 767px) {
              .spine-line { left: 14px !important; transform: none !important; }
            }
          `}</style>

          {milestones.map((m, i) => (
            <JourneyMilestone key={m.year} milestone={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
