'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FloatingChillis() {
  const chilliRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chilliRef.current;
    if (!el) return;

    // Enable 3D perspective on this element
    gsap.set(el, {
      transformPerspective: 900,
      transformOrigin: 'center center',
      x: 0,
      y: '-12vh',
      rotation: 90,   // pointing downward (chilli is horizontal image, so 90° = tip down)
      rotateY: 0,
      opacity: 0,
    });

    const ctx = gsap.context(() => {
      /**
       * PATH:
       *  Phase 1 → Straight DOWN on right side until infra section
       *  Transition → 3D barrel roll: rotation changes from 90° to 0° (pivots to face left)
       *  Phase 2 → Straight LEFT across screen (completely horizontal, no vertical)
       *  Transition → 3D barrel roll: rotation changes from 0° to -90° (pivots to face down)
       *  Phase 3 → Straight DOWN on left side until bottom
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      });

      // ── Appear ──
      tl.to(el, {
        opacity: 1,
        duration: 0.4,
        ease: 'none',
      })

      // ── Phase 1: Straight down on RIGHT ──
      .to(el, {
        y: '40vh',        // stop at infra section height
        rotation: 90,
        rotateY: 0,
        ease: 'none',
        duration: 3,
      })

      // ── 3D Turn 1: pivot from pointing-down to pointing-left ──
      // Mid-point: rotateY=90 makes chilli appear edge-on (disappears momentarily = true 3D feel)
      .to(el, {
        rotation: 45,
        rotateY: 90,     // chilli goes edge-on
        ease: 'none',
        duration: 0.8,
      })
      .to(el, {
        rotation: 0,     // now horizontal (pointing left since image is flipped by scaleX)
        rotateY: 0,
        scaleX: -1,      // flip to face left direction
        ease: 'none',
        duration: 0.8,
      })

      // ── Phase 2: Straight LEFT (completely horizontal, no y change) ──
      .to(el, {
        x: '-82vw',      // slide all the way to left side
        rotation: 0,
        rotateY: 0,
        ease: 'none',
        duration: 3,
      })

      // ── 3D Turn 2: pivot from pointing-left to pointing-down ──
      .to(el, {
        rotation: -45,
        rotateY: 90,     // edge-on again
        ease: 'none',
        duration: 0.8,
      })
      .to(el, {
        rotation: -90,   // now pointing downward
        rotateY: 0,
        scaleX: 1,       // restore flip
        ease: 'none',
        duration: 0.8,
      })

      // ── Phase 3: Straight DOWN on LEFT side ──
      .to(el, {
        y: '115vh',
        rotation: -90,
        ease: 'none',
        duration: 3,
      })

      // ── Fade out at bottom ──
      .to(el, {
        opacity: 0,
        duration: 0.4,
        ease: 'none',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={chilliRef}
      style={{
        position: 'fixed',
        top: 0,
        right: '3vw',   // anchored to right side
        zIndex: 5,
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }}
    >
      <Image
        src="/chilli-3d.webp"
        alt="chilli"
        width={200}
        height={200}
        priority
        style={{
          width: 'clamp(100px, 12vw, 165px)',
          height: 'auto',
          filter: 'drop-shadow(0 8px 32px rgba(200,20,20,0.6))',
          userSelect: 'none',
          display: 'block',
        }}
      />
    </div>
  );
}
