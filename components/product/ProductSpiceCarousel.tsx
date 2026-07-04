'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ProductItem } from '@/data/products';

interface Props {
  products: ProductItem[];
  categorySlug: string;
  categoryName: string;
}

/* ── Section background — clean white LV theme ──────────────────── */
const TINTS: Record<string, string> = {
  'Turmeric Powder':  '#ffffff',
  'Chilli Powder':    '#ffffff',
  'Coriander Powder': '#ffffff',
  'Cumin Powder':     '#ffffff',
  'Black Pepper':     '#ffffff',
  'Garam Masala':     '#ffffff',
  'Biryani Masala':   '#ffffff',
  'Sambar Powder':    '#ffffff',
  'Rasam Powder':     '#ffffff',
  'Meat Masala':      '#ffffff',
};

/* ── Radial glow color per spice (for the spotlight behind center img) ─── */
const GLOWS: Record<string, string> = {
  'Turmeric Powder':  'rgba(245,170,20,0.30)',
  'Chilli Powder':    'rgba(200,10,40,0.22)',
  'Coriander Powder': 'rgba(50,160,70,0.20)',
  'Cumin Powder':     'rgba(190,130,20,0.26)',
  'Black Pepper':     'rgba(40,40,40,0.16)',
  'Garam Masala':     'rgba(210,80,10,0.24)',
  'Biryani Masala':   'rgba(210,150,0,0.26)',
  'Sambar Powder':    'rgba(195,80,10,0.22)',
  'Rasam Powder':     'rgba(185,65,0,0.20)',
  'Meat Masala':      'rgba(160,5,5,0.22)',
};

const getTint = (n: string) => TINTS[n]  ?? '#FAFAFA';
const getGlow = (n: string) => GLOWS[n]  ?? 'rgba(172,3,59,0.18)';

const EASE = 'cubic-bezier(0.4,0,0.2,1)';
const DUR  = '650ms';
const T    = (prop: string) => `${prop} ${DUR} ${EASE}`;
const TRANSITION = [
  T('transform'), T('filter'), T('opacity'), T('left'), T('bottom'), T('height'),
].join(', ');

type Role = 'center' | 'left' | 'right' | 'back' | 'hidden';

const KEYFRAMES = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

  @keyframes sc-slide-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes sc-ghost-in {
    from { opacity: 0; transform: scale(1.08); }
    to   { opacity: 1; transform: scale(1);    }
  }
  @keyframes sc-desc-in {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 0.45; transform: translateY(0); }
  }
  @keyframes sc-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes sc-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .sc-name { animation: sc-slide-up 0.55s ${EASE} forwards; }
  .sc-desc { animation: sc-desc-in  0.65s ${EASE} 0.08s forwards; opacity: 0; }
  .sc-ghost { animation: sc-ghost-in 0.7s ${EASE} forwards; }
  .sc-index { animation: sc-fade-in  0.4s ${EASE} forwards; }
  .sc-marquee-track { animation: sc-marquee 12s linear infinite; display: flex; white-space: nowrap; width: max-content; }
  .sc-marquee-track:hover { animation-play-state: paused; }

  .sc-btn-outline:hover { background: #AC033B !important; color: #fff !important; transform: scale(1.06); }
  .sc-btn-solid:hover   { transform: scale(1.06); box-shadow: 0 8px 28px rgba(172,3,59,0.38) !important; }
  .sc-quote:hover       { background: #AC033B !important; color: #fff !important; }
  .sc-quote:hover .sc-quote-arrow { transform: translateX(4px); }
  .sc-quote-arrow { transition: transform 220ms ease; }
`;

export default function ProductSpiceCarousel({ products, categorySlug, categoryName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);
  const [mounted,     setMounted]     = useState(false);
  const touchStartX = useRef<number | null>(null);
  const n = products.length;

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* preload images */
  useEffect(() => {
    products.forEach(p => {
      if (p.image) { const img = new window.Image(); img.src = p.image; }
    });
  }, [products]);

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(prev => dir === 'next' ? (prev + 1) % n : (prev + n - 1) % n);
    setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating, n]);

  const jumpTo = useCallback((i: number) => {
    if (isAnimating || i === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(i);
    setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating, activeIndex]);

  /* touch / swipe */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 48) navigate(delta < 0 ? 'next' : 'prev');
    touchStartX.current = null;
  };

  /* roles */
  const center = activeIndex;
  const left   = (activeIndex + n - 1) % n;
  const right  = (activeIndex + 1) % n;
  const back   = (activeIndex + 2) % n;

  const getRole = (i: number): Role => {
    if (i === center) return 'center';
    if (i === left)   return 'left';
    if (i === right)  return 'right';
    if (i === back)   return 'back';
    return 'hidden';
  };

  const mobile = mounted && isMobile;

  const styleFor = (role: Role): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      transition: TRANSITION,
      willChange: 'transform, filter, opacity',
    };
    switch (role) {
      case 'center': return {
        ...base,
        /* 1:1 square container + objectFit:contain on 1:1 image = 100% fill */
        aspectRatio: '1 / 1',
        transform: 'translateX(-50%)',
        filter: 'none',
        opacity: 1, zIndex: 20,
        left: '50%',
        height: mobile ? '72%' : '100%',
        bottom: mobile ? '14%' : '0%',
      };
      case 'left': return {
        ...base,
        aspectRatio: '1 / 1',
        transform: 'translateX(-50%)',
        filter: 'blur(3px)',
        opacity: 0.60, zIndex: 10,
        left: mobile ? '12%' : '23%',
        height: mobile ? '26%' : '36%',
        bottom: mobile ? '34%' : '6%',
      };
      case 'right': return {
        ...base,
        aspectRatio: '1 / 1',
        transform: 'translateX(-50%)',
        filter: 'blur(3px)',
        opacity: 0.60, zIndex: 10,
        left: mobile ? '88%' : '77%',
        height: mobile ? '26%' : '36%',
        bottom: mobile ? '34%' : '6%',
      };
      case 'back': return {
        ...base,
        aspectRatio: '1 / 1',
        transform: 'translateX(-50%)',
        filter: 'blur(6px)',
        opacity: 0.22, zIndex: 5,
        left: '50%',
        height: mobile ? '13%' : '19%',
        bottom: mobile ? '42%' : '16%',
      };
      default: return {
        ...base,
        aspectRatio: '1 / 1',
        transform: 'translateX(-50%) scale(0.3)',
        opacity: 0, zIndex: -1,
        pointerEvents: 'none',
        left: '50%',
        height: '6%', bottom: 0,
      };
    }
  };

  const active    = products[activeIndex];
  const tint      = getTint(active.name);
  const glow      = getGlow(active.name);
  const ghostWord = active.name.split(' ')[0].toUpperCase();

  return (
    <>
      <style>{KEYFRAMES}</style>

      <section
        aria-label={`${categoryName} product showcase`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          position: 'relative',
          width: '100%',
          height: mobile ? '82vh' : '100vh',
          minHeight: '600px',
          overflow: 'hidden',
          backgroundColor: tint,
          transition: `background-color ${DUR} ${EASE}`,
          fontFamily: 'Inter, sans-serif',
          cursor: 'grab',
        }}
      >

        {/* ── Grain texture ──────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            pointerEvents: 'none', zIndex: 50,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px',
            opacity: 0.38,
          }}
        />

        {/* ── TOP white→transparent fade — seamless hero transition ──────── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '28%',
            background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.6) 45%, transparent 100%)',
            zIndex: 52,
            pointerEvents: 'none',
          }}
        />

        {/* ── Scrolling marquee ticker ───────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: mobile ? '48px' : '68px', left: 0, right: 0,
            overflow: 'hidden',
            zIndex: 55,
            pointerEvents: 'none',
          }}
        >
          <div className="sc-marquee-track" style={{ animationDuration: mobile ? '25s' : '35s' }}>
            {/* duplicate for seamless loop */}
            {[...products, ...products].map((p, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'monospace',
                  fontSize: mobile ? '18px' : '28px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'rgba(172,3,59,0.75)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontWeight: 600,
                }}
              >
                <span style={{ paddingLeft: '52px', paddingRight: '52px' }}>{p.name}</span>
                <span style={{ color: 'rgba(172,3,59,0.35)', fontSize: mobile ? '13px' : '16px' }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Ghost word — BIG, animated on change ───────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            top: mobile ? '-18%' : '0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none', userSelect: 'none', zIndex: 2,
          }}
        >
          <span
            key={ghostWord}           /* re-mounts on change → triggers CSS anim */
            className="sc-ghost"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: mobile ? '20vw' : 'clamp(80px, 28vw, 380px)',
              fontWeight: 900,
              color: 'rgba(172,3,59,0.09)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
            }}
          >
            {ghostWord}
          </span>
        </div>

        {/* ── Radial GLOW ORB behind center image ────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%', bottom: mobile ? '15%' : '-2%',
            transform: 'translateX(-50%)',
            width: mobile ? '70%' : '55%',
            height: mobile ? '55%' : '72%',
            background: `radial-gradient(ellipse at 50% 80%, ${glow} 0%, transparent 68%)`,
            transition: `background ${DUR} ${EASE}`,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        {/* ── Subtle bottom-fade vignette ─────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '6%',
            background: `linear-gradient(to top, ${tint} 0%, transparent 100%)`,
            transition: `background ${DUR} ${EASE}`,
            zIndex: 26,
            pointerEvents: 'none',
          }}
        />
        {/* ── Decorative center horizontal line ─────────────────────────── */}
        {!mobile && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%', left: '72px', right: '40px',
              height: '1px',
              background: 'linear-gradient(to right, rgba(172,3,59,0.12) 0%, rgba(172,3,59,0.05) 40%, rgba(172,3,59,0.05) 60%, rgba(172,3,59,0.12) 100%)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        )}


        {/* ── Carousel images ───────────────────────────────────────────── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
          {products.map((product, i) => {
            const role = getRole(i);
            return (
              <div key={product.name} style={styleFor(role)}>
                <div style={{ position: 'relative', width: '100%', height: '100%', transform: `scale(${product.scale || 1})`, transformOrigin: 'center bottom', transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1)' }}>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width:640px) 70vw, 50vw"
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center bottom',
                      }}
                      draggable={false}
                      priority={i < 2}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%', height: '100%',
                        background: 'rgba(172,3,59,0.07)',
                        borderRadius: '20px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '12px', color: '#AC033B',
                        fontFamily: 'monospace', letterSpacing: '0.1em',
                        textTransform: 'uppercase', textAlign: 'center', padding: '16px',
                      }}
                    >
                      {product.name}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM-LEFT: product info + nav ───────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            bottom: mobile ? '20px' : '62px',
            left:   mobile ? '16px' : '72px',
            zIndex: 60,
            maxWidth: mobile ? '210px' : '400px',
          }}
        >
          {/* Red bar + index */}
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              marginBottom: '10px',
            }}
          >
            <div style={{ width: '28px', height: '2px', background: '#AC033B', flexShrink: 0, borderRadius: '2px' }} />
            <span
              key={`idx-${activeIndex}`}
              className="sc-index"
              style={{
                fontFamily: 'monospace', fontSize: '10px',
                letterSpacing: '0.26em', textTransform: 'uppercase',
                color: '#AC033B',
              }}
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Product name — animated slide-up on change */}
          <h2
            key={`name-${active.name}`}
            className="sc-name"
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: mobile
                ? 'clamp(1.4rem, 5.5vw, 2rem)'
                : 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 700, color: '#0A0A0A',
              lineHeight: 1.05, letterSpacing: '-0.025em',
              margin: 0, marginBottom: mobile ? '14px' : '8px',
            }}
          >
            {active.name}
          </h2>

          {/* Desc — desktop only, animated */}
          {!mobile && (
            <p
              key={`desc-${active.name}`}
              className="sc-desc"
              style={{
                fontSize: '13px',
                lineHeight: 1.7, marginBottom: '24px',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              {active.desc}
            </p>
          )}

        </div>

        {/* ── BOTTOM-RIGHT: prev/next nav buttons ─────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            bottom: mobile ? '20px' : '62px',
            right: mobile ? '16px' : '48px',
            zIndex: 60,
            display: 'flex', gap: '10px', alignItems: 'center',
          }}
        >
          <button
            id="spice-carousel-prev"
            className="sc-btn-outline"
            onClick={() => navigate('prev')}
            aria-label="Previous product"
            style={{
              width: mobile ? '44px' : '52px',
              height: mobile ? '44px' : '52px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              border: '1.5px solid rgba(172,3,59,0.25)',
              color: '#AC033B',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 180ms ease, background 180ms ease, color 180ms ease, box-shadow 180ms ease',
              flexShrink: 0,
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <ArrowLeft size={mobile ? 16 : 19} strokeWidth={2} />
          </button>
          <button
            id="spice-carousel-next"
            className="sc-btn-solid"
            onClick={() => navigate('next')}
            aria-label="Next product"
            style={{
              width: mobile ? '44px' : '52px',
              height: mobile ? '44px' : '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #AC033B 0%, #d4044a 100%)',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 180ms ease, box-shadow 180ms ease',
              flexShrink: 0,
              boxShadow: '0 4px 20px rgba(172,3,59,0.35)',
            }}
          >
            <ArrowRight size={mobile ? 16 : 19} strokeWidth={2} />
          </button>
        </div>




      </section>
    </>
  );
}
