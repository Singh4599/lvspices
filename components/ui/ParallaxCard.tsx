'use client';

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxCardProps {
  children: React.ReactNode;
  /** Image shown as the parallax background inside the card */
  imageSrc?: string;
  imageAlt?: string;
  /** 0–1, how much the image moves relative to scroll. Default 0.22 */
  parallaxStrength?: number;
  /** Enable mouse-hover 3D tilt. Default true */
  tilt?: boolean;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
}

export default function ParallaxCard({
  children,
  imageSrc,
  imageAlt = '',
  parallaxStrength = 0.22,
  tilt = true,
  className = '',
  style = {},
}: ParallaxCardProps) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number | null>(null);
  const currentRot = useRef({ x: 0, y: 0 });

  /* ── GSAP Scroll Parallax on the image layer ──────────────────────── */
  useEffect(() => {
    if (!imgRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -(parallaxStrength * 100) },
        {
          yPercent: parallaxStrength * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [parallaxStrength]);

  /* ── Mouse-hover 3D tilt ──────────────────────────────────────────── */
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;  // -0.5 → 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5;

    const targetX = -y * 12;   // pitch
    const targetY =  x * 12;   // yaw

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const animate = () => {
      currentRot.current.x += (targetX - currentRot.current.x) * 0.12;
      currentRot.current.y += (targetY - currentRot.current.y) * 0.12;

      if (cardRef.current) {
        cardRef.current.style.transform =
          `perspective(900px) rotateX(${currentRot.current.x}deg) rotateY(${currentRot.current.y}deg) translateZ(0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = '1';
        glowRef.current.style.left   = `${(x + 0.5) * 100}%`;
        glowRef.current.style.top    = `${(y + 0.5) * 100}%`;
      }

      const stillMoving =
        Math.abs(targetX - currentRot.current.x) > 0.02 ||
        Math.abs(targetY - currentRot.current.y) > 0.02;
      if (stillMoving) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
  }, [tilt]);

  const onMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const ease = () => {
      currentRot.current.x *= 0.88;
      currentRot.current.y *= 0.88;
      if (cardRef.current) {
        cardRef.current.style.transform =
          `perspective(900px) rotateX(${currentRot.current.x}deg) rotateY(${currentRot.current.y}deg) translateZ(0)`;
      }
      if (glowRef.current) glowRef.current.style.opacity = '0';

      if (Math.abs(currentRot.current.x) > 0.05 || Math.abs(currentRot.current.y) > 0.05) {
        rafRef.current = requestAnimationFrame(ease);
      } else {
        if (cardRef.current) cardRef.current.style.transform = '';
      }
    };
    rafRef.current = requestAnimationFrame(ease);
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        transition: 'box-shadow 300ms ease',
        ...style,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Parallax image layer — sits behind content */}
      {imageSrc && (
        <div
          style={{
            position: 'absolute',
            inset: `-${parallaxStrength * 100 + 5}% 0`,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <div
            ref={imgRef}
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              willChange: 'transform',
            }}
            aria-label={imageAlt}
            role="img"
          />
          {/* Overlay so text stays readable */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.72) 100%)',
            }}
          />
        </div>
      )}

      {/* Cursor glow blob */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(172,3,59,0.10) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 300ms ease',
          zIndex: 1,
        }}
      />

      {/* Card content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
