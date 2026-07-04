'use client';

import { useLayoutEffect, useRef } from 'react';

/**
 * FloatingSpiceObject — zigzag left ↔ right across homepage sections.
 *
 * Movement pattern:
 *  Hero  → reveal center
 *  WhoWeAre enter  → FAR LEFT corner
 *  WhoWeAre scroll → sweep to FAR RIGHT corner
 *  Products        → right side staying
 *  CFG enter       → FAR LEFT corner
 *  CFG scroll      → sweep to FAR RIGHT corner
 *  Cryogenic enter → FAR LEFT corner
 *  Cryo scroll     → sweep to FAR RIGHT corner
 *  Dome            → center top
 *  Certs           → fade out
 *
 * Rules:
 *  - Fully isolated gsap.context() → ctx.revert() on cleanup
 *  - NEVER calls killTweensOf("*") or global ScrollTrigger.getAll()
 *  - pointer-events: none, z-index 20 (below navbar ~50)
 *  - Respects prefers-reduced-motion
 */
export default function FloatingSpiceObject() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ctxRef  = useRef<{ revert: () => void } | null>(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = wrapRef.current;
    if (!el) return;

    const mob = window.innerWidth < 768;

    /**
     * toPx converts xv/yv (percentage of viewport) to absolute GSAP x/y.
     * The element sits at CSS position fixed, top:0, left:0.
     * GSAP x = translateX applied to element.
     * To CENTER the element at (xv% of vw, yv% of vh):
     *   x = xv/100 * vw - el.offsetWidth/2
     *   y = yv/100 * vh - el.offsetHeight/2
     *
     * LEFT CORNER  (element left edge at ~0):     xv ≈ (el.offsetWidth/2) / vw * 100
     * RIGHT CORNER (element right edge at ~vw):   xv ≈ 100 - (el.offsetWidth/2) / vw * 100
     *
     * At el.offsetWidth=680px, vw=1440px:
     *   LEFT  corner center xv = 680/2/1440*100 = 23.6 → use 24
     *   RIGHT corner center xv = 100 - 23.6     = 76.4 → use 76
     *
     * For "partially off-screen" corners:
     *   FAR LEFT  (left edge at -120px): xv = (680/2 - 120)/1440*100 = 19.4 → use 19
     *   FAR RIGHT (right edge at vw+120): xv = 100 - 19 = 81
     *
     * Mobile (el.offsetWidth~400px, vw~390px): corners are clamped at ~5/95
     */
    const LEFT  = mob ? 5  : 19;   // FAR LEFT  (partially off-screen left edge)
    const RIGHT = mob ? 92 : 81;   // FAR RIGHT (partially off-screen right edge)
    const CX    = 50;              // CENTER X

    // prettier-ignore
    const pts = [
      //                    xv      yv       sc                  rot   op    filter
      /* 0  start hidden */ { xv: CX,    yv: 50, sc: 0,                  rot: 0,   op: 0,    fi: 'none' },
      /* 1  hero reveal  */ { xv: CX,    yv: 55, sc: mob?0.7:0.90,  rot: 15,  op: 0.92, fi: 'none' },
      /* 2  WWA – LEFT   */ { xv: LEFT,  yv: 48, sc: mob?0.8:1.00,  rot: 60,  op: 0.90, fi: 'none' },
      /* 3  WWA – RIGHT  */ { xv: RIGHT, yv: 62, sc: mob?0.8:1.00,  rot: 150, op: 0.88, fi: 'none' },
      /* 4  Products–R   */ { xv: RIGHT, yv: 38, sc: mob?0.7:0.90,  rot: 180, op: 0.82, fi: 'none' },
      /* 5  CFG – LEFT   */ { xv: LEFT,  yv: 44, sc: mob?0.8:0.96,  rot: 240, op: 0.80, fi: 'brightness(1.3) sepia(0.3) saturate(1.7)' },
      /* 6  CFG – RIGHT  */ { xv: RIGHT, yv: 54, sc: mob?0.8:0.96,  rot: 330, op: 0.78, fi: 'brightness(1.3) sepia(0.3) saturate(1.7)' },
      /* 7  Cryo – LEFT  */ { xv: LEFT,  yv: 46, sc: mob?0.8:0.94,  rot: 390, op: 0.78, fi: 'brightness(0.88) hue-rotate(195deg) saturate(1.5)' },
      /* 8  Cryo – RIGHT */ { xv: RIGHT, yv: 58, sc: mob?0.8:0.94,  rot: 480, op: 0.76, fi: 'brightness(0.88) hue-rotate(195deg) saturate(1.5)' },
      /* 9  Dome center  */ { xv: CX,    yv: 26, sc: mob?0.8:1.00,  rot: 540, op: 0.85, fi: 'none' },
      /* 10 Certs fade   */ { xv: CX,    yv: 72, sc: mob?0.5:0.70,  rot: 720, op: 0,    fi: 'none' },
    ];

    const vw = () => window.innerWidth;
    const vh = () => window.innerHeight;

    const toPx = (p: typeof pts[0]) => ({
      x:       p.xv / 100 * vw() - el.offsetWidth  / 2,
      y:       p.yv / 100 * vh() - el.offsetHeight / 2,
      scale:   p.sc,
      rotate:  p.rot,
      opacity: p.op,
      filter:  p.fi,
    });

    import('@/lib/gsap').then(({ gsap }) => {
      if (!wrapRef.current) return;

      const ctx = gsap.context(() => {
        // Set initial state
        gsap.set(el, { ...toPx(pts[0]), force3D: true });

        /**
         * Timeline scrubbed over the FULL page scroll.
         * The pinned sections (WWA, CFG, Cryo) each consume ~30–40% of total
         * page scroll, so we allocate proportionally more timeline units to them
         * to make the left→right sweep happen within their scroll range.
         *
         * Timeline structure (100 total units):
         *  0→4   : Hero reveal (small — hero pin is ~2500px of ~3M total)
         *  4→14  : WWA enter LEFT
         *  14→42 : WWA sweep LEFT→RIGHT  (WWA ≈ 38% of total scroll)
         *  42→46 : Products (brief)
         *  46→56 : CFG enter LEFT
         *  56→76 : CFG sweep LEFT→RIGHT  (CFG ≈ 30%)
         *  76→83 : Cryo enter LEFT
         *  83→93 : Cryo sweep LEFT→RIGHT (Cryo ≈ 30%)
         *  93→97 : Dome center
         *  97→100: Certs fade
         */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:             document.body,
            start:               'top top',
            end:                 'bottom bottom',
            scrub:               1.8,
            invalidateOnRefresh: true,
            onRefresh() {
              gsap.set(el, { ...toPx(pts[0]) });
            },
          },
        });

        // pt0 → pt1 : hero reveal
        tl.to(el, { ...toPx(pts[1]),  duration: 4,  ease: 'power2.out'   }, 0);
        // pt1 → pt2 : travel to WWA LEFT
        tl.to(el, { ...toPx(pts[2]),  duration: 10, ease: 'power2.inOut' }, 4);
        // pt2 → pt3 : WWA sweep LEFT → RIGHT (long — fills WWA pin scroll)
        tl.to(el, { ...toPx(pts[3]),  duration: 28, ease: 'power1.inOut' }, 14);
        // pt3 → pt4 : settle right through Products
        tl.to(el, { ...toPx(pts[4]),  duration: 4,  ease: 'power2.inOut' }, 42);
        // pt4 → pt5 : come back to CFG LEFT corner
        tl.to(el, { ...toPx(pts[5]),  duration: 10, ease: 'power2.inOut' }, 46);
        // pt5 → pt6 : CFG sweep LEFT → RIGHT
        tl.to(el, { ...toPx(pts[6]),  duration: 20, ease: 'power1.inOut' }, 56);
        // pt6 → pt7 : snap to Cryo LEFT corner
        tl.to(el, { ...toPx(pts[7]),  duration: 7,  ease: 'power2.inOut' }, 76);
        // pt7 → pt8 : Cryo sweep LEFT → RIGHT
        tl.to(el, { ...toPx(pts[8]),  duration: 10, ease: 'power1.inOut' }, 83);
        // pt8 → pt9 : Dome — float center
        tl.to(el, { ...toPx(pts[9]),  duration: 4,  ease: 'power2.inOut' }, 93);
        // pt9 → pt10: Certs — fade out
        tl.to(el, { ...toPx(pts[10]), duration: 3,  ease: 'power2.in'    }, 97);

        // Slow autonomous spin on the inner img (independent of scroll)
        const img = el.querySelector<HTMLImageElement>('img');
        if (img) {
          gsap.to(img, {
            rotate:          '+=360',
            duration:        24,
            ease:            'none',
            repeat:          -1,
            transformOrigin: 'center center',
          });
        }
      }, wrapRef);

      ctxRef.current = ctx;
    });

    return () => {
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         'clamp(200px, 22vw, 380px)',
        height:        'clamp(200px, 22vw, 380px)',
        pointerEvents: 'none',
        zIndex:        20,
        willChange:    'transform, opacity, filter',
        opacity:       0,
      }}
    >
      <img
        src="/float.png"
        alt=""
        draggable={false}
        style={{
          width:           '100%',
          height:          '100%',
          objectFit:       'contain',
          display:         'block',
          userSelect:      'none',
          filter:          'drop-shadow(0 8px 32px rgba(172,3,59,0.32))',
          transformOrigin: 'center center',
        }}
      />
    </div>
  );
}
