'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface CountUpProps {
  to: number;
  /** Optional prefix e.g. "$" */
  prefix?: string;
  /** Optional suffix e.g. "+", "%", "K" */
  suffix?: string;
  duration?: number; // ms
  className?: string;
  style?: React.CSSProperties;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * CountUp — animates a number from 0 to `to` when it enters the viewport.
 * Uses IntersectionObserver + requestAnimationFrame. No dependencies beyond React.
 */
export default function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1800,
  className = '',
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const [value, setValue] = useState(prefersReduced ? to : 0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (prefersReduced) {
      setValue(to);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          observer.disconnect();

          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            setValue(Math.round(eased * to));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration, prefersReduced]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{value}{suffix}
    </span>
  );
}
