'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface RevealTextProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: 'chars' | 'words';
}

export default function RevealText({
  children,
  as: Tag = 'p',
  className = '',
  delay = 0,
  stagger = 0.04,
  splitBy = 'words',
}: RevealTextProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef = useRef<any>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion) return;

    // Split text into spans
    const text = el.textContent || '';
    const items =
      splitBy === 'chars'
        ? text.split('')
        : text.split(/(\s+)/);

    el.innerHTML = '';
    const wrapperDiv = document.createElement('span');
    wrapperDiv.style.display = 'inline';

    items.forEach((item: string) => {
      if (item.match(/^\s+$/)) {
        // Whitespace — add as-is
        wrapperDiv.appendChild(document.createTextNode(item));
      } else {
        const span = document.createElement('span');
        span.textContent = item;
        span.style.display = 'inline-block';
        span.style.overflow = 'hidden';

        const inner = document.createElement('span');
        inner.textContent = item;
        inner.style.display = 'inline-block';
        inner.style.willChange = 'transform, opacity';
        inner.className = 'reveal-char';

        span.textContent = '';
        span.appendChild(inner);
        wrapperDiv.appendChild(span);
      }
    });

    el.appendChild(wrapperDiv);

    const chars = el.querySelectorAll('.reveal-char');

    const ctx = gsap.context(() => {
      gsap.from(chars, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger,
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, el);

    return () => ctx.revert();
  }, [children, delay, stagger, splitBy, prefersReducedMotion]);

  return (
    <Tag
      ref={containerRef}
      className={className}
      aria-label={children}
    >
      {children}
    </Tag>
  );
}
