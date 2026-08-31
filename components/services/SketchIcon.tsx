'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

// ── Sketch icon SVG paths ───────────────────────────────────────────────
// Each icon is defined with multiple paths to animate independently
// giving a "drawn one stroke at a time" feel

export const SKETCH_ICONS = {
  // OEM Manufacturing — factory/house
  factory: {
    viewBox: '0 0 80 80',
    paths: [
      // Roof
      { d: 'M8 34 L40 10 L72 34', length: 90 },
      // Left wall
      { d: 'M14 34 L14 72', length: 38 },
      // Right wall
      { d: 'M66 34 L66 72', length: 38 },
      // Floor
      { d: 'M14 72 L66 72', length: 52 },
      // Door
      { d: 'M32 72 L32 50 L48 50 L48 72', length: 60 },
      // Left window
      { d: 'M20 42 L20 58 L30 58 L30 42 Z', length: 56 },
      // Right window
      { d: 'M50 42 L50 58 L60 58 L60 42 Z', length: 56 },
      // Chimney
      { d: 'M52 10 L52 28 M58 10 L58 28', length: 36 },
      // Smoke puffs
      { d: 'M52 8 Q50 4 54 2 Q58 4 55 8', length: 22 },
    ],
  },
  // Private Labelling — tag/label
  label: {
    viewBox: '0 0 80 80',
    paths: [
      // Tag body
      { d: 'M10 10 L50 10 L70 40 L50 70 L10 70 Z', length: 160 },
      // Hole
      { d: 'M22 40 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0', length: 52 },
      // Lines on tag
      { d: 'M36 30 L62 30', length: 26 },
      { d: 'M36 40 L65 40', length: 29 },
      { d: 'M36 50 L62 50', length: 26 },
      // String
      { d: 'M14 40 Q4 30 8 18 Q12 6 22 10', length: 50 },
    ],
  },
  // Bulk Spice Supply — globe
  globe: {
    viewBox: '0 0 80 80',
    paths: [
      // Outer circle
      { d: 'M40 8 a32 32 0 1 0 0.01 0', length: 202 },
      // Equator
      { d: 'M8 40 L72 40', length: 64 },
      // Prime meridian
      { d: 'M40 8 L40 72', length: 64 },
      // Left longitude
      { d: 'M40 8 Q20 24 20 40 Q20 56 40 72', length: 70 },
      // Right longitude
      { d: 'M40 8 Q60 24 60 40 Q60 56 40 72', length: 70 },
      // Top tropic
      { d: 'M16 26 Q40 20 64 26', length: 54 },
      // Bottom tropic
      { d: 'M16 54 Q40 60 64 54', length: 54 },
    ],
  },
  // Custom Blend — flask/beaker
  flask: {
    viewBox: '0 0 80 80',
    paths: [
      // Flask neck
      { d: 'M30 8 L30 32 L12 62 Q10 72 20 72 L60 72 Q70 72 68 62 L50 32 L50 8', length: 190 },
      // Flask top
      { d: 'M26 8 L54 8', length: 28 },
      // Liquid line
      { d: 'M22 58 Q40 52 58 58', length: 40 },
      // Bubbles
      { d: 'M32 46 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0', length: 26 },
      { d: 'M46 52 m-3,0 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0', length: 20 },
      { d: 'M38 38 m-2.5,0 a2.5,2.5 0 1,0 5,0 a2.5,2.5 0 1,0 -5,0', length: 16 },
    ],
  },
};

interface SketchIconProps {
  icon: keyof typeof SKETCH_ICONS;
  size?: number;
  color?: string;
  strokeWidth?: number;
  triggerRef: React.RefObject<HTMLElement | null>;
  delay?: number;
  /** if true, animates on mount; otherwise uses ScrollTrigger */
  immediate?: boolean;
}

export default function SketchIcon({
  icon,
  size = 80,
  color = '#111111',
  strokeWidth = 2,
  triggerRef,
  delay = 0,
  immediate = false,
}: SketchIconProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const iconData = SKETCH_ICONS[icon];

  useEffect(() => {
    if (!svgRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];

    // Measure actual path lengths for accurate dasharray
    paths.forEach(path => {
      const len = path.getTotalLength?.() ?? iconData.paths[paths.indexOf(path)].length;
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
    });

    if (prefersReduced) {
      paths.forEach(p => { p.style.strokeDashoffset = '0'; });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay,
        ...(immediate
          ? {}
          : {
              scrollTrigger: {
                trigger: triggerRef.current,
                start: 'top 75%',
              },
            }),
      });

      // Draw each path sequentially — like a hand drawing each stroke
      paths.forEach((path, i) => {
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 0.45 + i * 0.05,
            ease: 'none', // linear = pen moving at constant speed
          },
          i === 0 ? 0 : `-=0.15` // slight overlap = feels like continuous hand movement
        );
      });
    }, svgRef);

    return () => ctx.revert();
  }, [delay, icon, immediate]);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={iconData.viewBox}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ overflow: 'visible', display: 'block' }}
    >
      {iconData.paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          ref={el => { pathRefs.current[i] = el; }}
          style={{
            strokeDasharray: p.length,
            strokeDashoffset: p.length,
            // Slight variation in stroke width per path — hand-drawn feel
            strokeWidth: strokeWidth * (0.85 + (i % 3) * 0.1),
          }}
        />
      ))}
    </svg>
  );
}
