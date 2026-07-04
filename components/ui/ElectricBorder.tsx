'use client';

import React, { ReactNode } from 'react';

interface ElectricBorderProps {
  children?: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number; // Kept for compatibility but unused in CSS version
  borderRadius?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = '#00ffd1',
  speed = 1,
  borderRadius = 24,
  className,
  style,
}) => {
  return (
    <div
      className={`relative w-full h-full ${className ?? ''}`}
      style={{ borderRadius: `${borderRadius}px`, ...style }}
    >
      {/* High-performance glowing border mask */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          borderRadius: 'inherit',
          padding: '1.5px', // Border thickness
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: '-100%',
            left: '-100%',
            width: '300%',
            height: '300%',
            background: `conic-gradient(from 0deg at 50% 50%, transparent 70%, ${color} 100%, transparent 100%)`,
            animation: `spin-border ${2.5 / Math.max(0.1, speed)}s linear infinite`,
          }}
        />
      </div>

      <div className="relative z-[1] h-full w-full" style={{ borderRadius: `${borderRadius}px` }}>
        {children}
      </div>

      <style>{`
        @keyframes spin-border {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ElectricBorder;
