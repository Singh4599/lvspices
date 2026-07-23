'use client';

import { useEffect, useRef, ReactNode, HTMLAttributes } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ScrollRevealProps {
  children: ReactNode;
  /** Delay within a stagger group. Default 0 */
  delay?: number;
  /** From Y offset. Default 40 */
  fromY?: number;
  /** Duration seconds. Default 0.75 */
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  /** tag to render, defaults to div */
  as?: React.ElementType;
  /** start trigger position. Default 'top 88%' */
  start?: string;
  [key: string]: unknown;
}

/**
 * Wraps children in a scroll-triggered GSAP reveal:
 * opacity: 0 → 1, y: fromY → 0.
 * Usage: <ScrollReveal><YourContent /></ScrollReveal>
 */
export default function ScrollReveal({
  children,
  delay = 0,
  fromY = 40,
  duration = 0.75,
  className,
  style,
  as: Tag = 'div',
  start = 'top 88%',
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: fromY, opacity: 0 },
        {
          y: 0, opacity: 1, duration, delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ctx.revert();
  }, [delay, fromY, duration, start]);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className} style={{ opacity: 0, ...style }} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
      {children}
    </div>
  );
}

/**
 * Stagger-reveals a list of children. Each child gets a staggered delay.
 */
export function StaggerReveal({
  children,
  stagger = 0.1,
  fromY = 32,
  start = 'top 88%',
  className,
  style,
}: {
  children: ReactNode;
  stagger?: number;
  fromY?: number;
  start?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el.children,
        { y: fromY, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ctx.revert();
  }, [stagger, fromY, start]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/**
 * Count-up animation for a numeric stat.
 */
export function AnimatedStat({
  value,
  suffix = '',
  label,
  duration: countDuration = 1.5,
  start: triggerStart = 'top 85%',
}: {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
  start?: string;
}) {
  const numRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      if (numRef.current) numRef.current.textContent = String(value);
      return;
    }
    const el = wrapRef.current;
    if (!el || !numRef.current) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: triggerStart,
        onEnter: () => {
          gsap.to(obj, {
            val: value,
            duration: countDuration,
            ease: 'power2.out',
            onUpdate: () => {
              if (numRef.current) {
                numRef.current.textContent = Math.round(obj.val) + suffix;
              }
            },
          });
        },
        once: true,
      });
    });
    return () => ctx.revert();
  }, [value, suffix, countDuration, triggerStart]);

  return (
    <div ref={wrapRef}>
      <span ref={numRef} style={{ display: 'inline' }}>0{suffix}</span>
    </div>
  );
}
