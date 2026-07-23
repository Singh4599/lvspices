'use client';

import React from 'react';

export default function CurvedLoop({ marqueeText = "Welcome to LV Spices ✦" }: { marqueeText?: string }) {
  const repeatedText = Array(12).fill(marqueeText).join(' ');
  return (
    <div style={{ position: 'relative', width: '100%', height: 'clamp(200px, 30vw, 400px)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @keyframes text-spin {
          0% { stroke-dashoffset: 0; transform: rotate(0deg); }
          100% { stroke-dashoffset: 1000; transform: rotate(-360deg); }
        }
        .curved-loop-text {
          fill: #111;
          font-family: var(--font-inter), sans-serif;
          font-size: clamp(14px, 1.5vw, 20px);
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
      `}</style>
      <svg viewBox="0 0 500 500" style={{ width: '100%', height: '100%', animation: 'text-spin 60s linear infinite', transformOrigin: 'center center' }}>
        <path id="curve" d="M 250 50 A 200 200 0 1 1 249.9 50" fill="transparent" />
        <text className="curved-loop-text">
          <textPath href="#curve" startOffset="0%">
            {repeatedText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
