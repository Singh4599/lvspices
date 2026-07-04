'use client';
import { useEffect, useRef, Children } from 'react';
import './StickyStack.css';

interface StickyStackProps {
  children: React.ReactNode;
  cardCount: number;
}

export default function StickyStack({ children, cardCount }: StickyStackProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  const cards = Children.toArray(children);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const totalScroll = wrapper.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      // raw 0→1 progress through the whole section
      const progress = Math.min(0.9999, scrolled / Math.max(1, totalScroll));

      // each card owns 1/cardCount of the range
      const sliceSize = 1 / cardCount;

      cards.forEach((_, i) => {
        const cardEl = cardRefs.current[i];
        const dotEl = dotRefs.current[i];
        if (!cardEl) return;

        // rel: -1 (waiting) -> 0 (active) -> +N (pushed back)
        const rel = (progress - i * sliceSize) / sliceSize;
        // 80% slide in, 20% hold
        const rawP = Math.max(0, Math.min(1, (rel + 1) / 0.8));
        // Smooth sine ease
        const slideIn = -(Math.cos(Math.PI * rawP) - 1) / 2;

        let translateY: number;
        let scale: number;
        let opacity: number;

        if (slideIn < 1) {
          // Incoming phase
          translateY = (1 - slideIn) * 240; // Slide from 240px down
          scale = 0.85 + slideIn * 0.15; // Grow from 0.85 to 1.0
          // Fade in quickly over the first 40% of the slide, then fully opaque
          opacity = Math.min(1, slideIn * 2.5);
        } else {
          // Active & Pushback phase
          // Accumulate how much all SUBSEQUENT cards have slid in to determine our depth
          let d = 0;
          for (let j = i + 1; j < cardCount; j++) {
            const rel_j = (progress - j * sliceSize) / sliceSize;
            const rawP_j = Math.max(0, Math.min(1, (rel_j + 1) / 0.8));
            const slideIn_j = -(Math.cos(Math.PI * rawP_j) - 1) / 2;
            d += slideIn_j;
          }

          translateY = -d * 32; // Move up 32px per depth layer
          scale = 1 - d * 0.05; // Shrink 5% per depth layer
          opacity = Math.max(0, 1 - d * 0.2); // Fade slowly
        }

        cardEl.style.transform = `translateY(${translateY}px) scale(${scale})`;
        cardEl.style.opacity = String(opacity);

        // dots progress
        if (dotEl) {
          const activeIdx = Math.min(cardCount - 1, Math.floor(progress * cardCount));
          const isActiveDot = i === activeIdx;
          dotEl.style.width = isActiveDot ? '28px' : '8px';
          dotEl.style.background = isActiveDot ? '#AC033B' : 'rgba(255,255,255,0.2)';
        }
      });

      // counter
      if (counterRef.current) {
        const activeIdx = Math.min(
          cardCount - 1,
          Math.floor(progress * cardCount)
        );
        counterRef.current.textContent = `${String(activeIdx + 1).padStart(2, '0')} / ${String(cardCount).padStart(2, '0')}`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [cardCount, cards.length]);

  return (
    <div ref={wrapperRef} style={{ position: 'relative', height: `${cardCount * 100}vh` }}>
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          background: 'transparent',
          padding: '12vh clamp(16px, 4vw, 48px) 0',
        }}
      >
        {/* Card deck container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 1280,
            height: 'clamp(460px, 66vh, 640px)',
            perspective: '1200px',
          }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 20,
                overflow: 'hidden',
                background: 'rgba(10,10,10,0.72)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: '0 4px 48px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.07)',
                transformOrigin: 'top center',
                /* Initial state — future cards wait below */
                transform: 'translateY(80px) scale(0.95)',
                opacity: 0,
                zIndex: i,
                /* Driven purely by scroll position (Lenis handles smoothing) */
                willChange: 'transform, opacity',
              }}
            >
              {card}
            </div>
          ))}
        </div>

        {/* Dot progress */}
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {cards.map((_, i) => (
            <div
              key={i}
              ref={(el) => { dotRefs.current[i] = el; }}
              style={{
                width: i === 0 ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === 0 ? '#AC033B' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          ))}
        </div>

        {/* Counter */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            right: 'clamp(20px, 4vw, 56px)',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 11,
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          <span ref={counterRef}>01 / {String(cardCount).padStart(2, '0')}</span>
        </div>

        {/* Scroll hint on first card */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 'clamp(20px, 4vw, 56px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            opacity: 0.4,
          }}
        >
          <div style={{
            width: 1,
            height: 40,
            background: 'rgba(255,255,255,0.4)',
            animation: 'scrollHint 1.8s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}>scroll</span>
        </div>
      </div>
    </div>
  );
}
