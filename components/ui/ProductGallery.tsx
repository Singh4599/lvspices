"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface ProductGalleryItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  keyProducts?: string[];
  index: number;
}

interface ProductGalleryProps {
  items: ProductGalleryItem[];
}

const CARD_W = 340;   // card width px
const GAP    = 20;    // gap px

const ProductGallery = ({ items }: ProductGalleryProps) => {
  const trackRef        = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  /* ── sync dot + buttons with scroll position ─────────────────── */
  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const maxScroll  = el.scrollWidth - el.clientWidth;
    const step       = CARD_W + GAP;
    const idx        = Math.round(scrollLeft / step);
    setCurrent(Math.min(idx, items.length - 1));
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft < maxScroll - 4);
  }, [items.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollTo = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * (CARD_W + GAP), behavior: "smooth" });
  };

  const scrollPrev = () => scrollTo(Math.max(current - 1, 0));
  const scrollNext = () => scrollTo(Math.min(current + 1, items.length - 1));

  return (
    <section style={{ paddingTop: '120px', paddingBottom: '160px' }}>

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="container-lv" style={{ marginBottom: '56px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
              <span style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#AC033B' }}>
                All Categories
              </span>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '16px' }}>
              12 categories.{' '}
              <span className="text-[#AC033B] italic font-serif font-medium">One source.</span>
            </h2>
            <p className="text-white/50" style={{ fontSize: 'clamp(0.95rem,1.3vw,1.05rem)', maxWidth: '560px', lineHeight: 1.65 }}>
              Every category is export-certified, customizable, and available in bulk or private label formats.
            </p>
          </div>

          {/* nav buttons — desktop */}
          <div className="pg-nav" style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <button
              onClick={scrollPrev} disabled={!canPrev} aria-label="Previous"
              style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: canPrev ? 'rgba(172,3,59,0.06)' : 'rgba(0,0,0,0.03)',
                border: `1.5px solid ${canPrev ? 'rgba(172,3,59,0.25)' : 'rgba(0,0,0,0.08)'}`,
                color: canPrev ? '#AC033B' : 'rgba(0,0,0,0.25)',
                cursor: canPrev ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 200ms ease',
              }}
            >
              <ArrowLeft size={19} strokeWidth={2} />
            </button>
            <button
              onClick={scrollNext} disabled={!canNext} aria-label="Next"
              style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: canNext ? 'linear-gradient(135deg,#AC033B,#d4044a)' : 'rgba(0,0,0,0.03)',
                border: 'none',
                color: canNext ? '#fff' : 'rgba(0,0,0,0.25)',
                cursor: canNext ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 200ms ease',
                boxShadow: canNext ? '0 4px 20px rgba(172,3,59,0.35)' : 'none',
              }}
            >
              <ArrowRight size={19} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Scroll track ────────────────────────────────────────── */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: `${GAP}px`,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          paddingLeft: 'clamp(1.2rem,6vw,8rem)',
          paddingRight: 'clamp(1.2rem,6vw,8rem)',
          paddingBottom: '8px',
          scrollbarWidth: 'none',
        }}
        className="pg-track"
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            style={{
              textDecoration: 'none',
              display: 'block',
              flex: `0 0 ${CARD_W}px`,
              scrollSnapAlign: 'start',
            }}
            className="pg-card group"
          >
            <div style={{ position: 'relative', height: '440px', borderRadius: '20px', overflow: 'hidden' }}>

              {/* Background image */}
              <img
                src={item.image}
                alt={item.title}
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center',
                  transition: 'transform 550ms ease',
                }}
                className="pg-img"
              />

              {/* Number watermark */}
              <span style={{
                position: 'absolute', top: '20px', right: '22px',
                fontFamily: 'var(--font-display,Georgia)', fontSize: '5rem',
                fontWeight: 900, lineHeight: 1, color: 'rgba(255,255,255,0.13)',
                userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.02em', zIndex: 2,
              }}>
                {String(item.index + 1).padStart(2, '0')}
              </span>

              {/* Dark gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.88) 100%)',
                zIndex: 1,
              }} />

              {/* Card content */}
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 0,
                padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 3,
              }}>
                {/* Red bar + label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ width: '24px', height: '2px', background: '#AC033B', borderRadius: '2px' }} />
                  <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
                    Category {String(item.index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-display,Georgia)', fontSize: 'clamp(1.25rem,2vw,1.55rem)',
                  fontWeight: 700, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '10px',
                }}>
                  {item.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '12.5px', lineHeight: 1.6, color: 'rgba(255,255,255,0.62)',
                  marginBottom: '16px',
                  display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {item.description}
                </p>

                {/* Key product pills */}
                {item.keyProducts && item.keyProducts.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '18px' }}>
                    {item.keyProducts.slice(0, 3).map((p) => (
                      <span key={p} style={{
                        padding: '3px 10px', borderRadius: '20px',
                        background: 'rgba(255,255,255,0.11)',
                        border: '1px solid rgba(255,255,255,0.17)',
                        fontSize: '10px', color: 'rgba(255,255,255,0.78)',
                        fontFamily: 'monospace', letterSpacing: '0.04em',
                        backdropFilter: 'blur(4px)',
                      }}>
                        {p}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA button */}
                <div className="pg-cta" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#fff',
                  padding: '10px 20px', background: '#AC033B', borderRadius: '8px',
                  width: 'fit-content', transition: 'background 200ms ease, transform 200ms ease',
                }}>
                  Explore <ArrowRight size={12} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Dot indicators ──────────────────────────────────────── */}
      <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px', borderRadius: '4px', border: 'none', padding: 0, cursor: 'pointer',
              background: i === current ? '#AC033B' : 'rgba(172,3,59,0.18)',
              transition: 'all 300ms ease',
            }}
          />
        ))}
      </div>

      <style>{`
        .pg-track::-webkit-scrollbar { display: none; }
        .pg-card:hover .pg-img { transform: scale(1.06); }
        .pg-card:hover .pg-cta { background: #8a0230 !important; }
        @media (max-width:640px) { .pg-nav { display: none !important; } }
      `}</style>
    </section>
  );
};

export { ProductGallery };
