'use client';

import { useEffect, useRef, ReactNode } from 'react';
import ParticleTextEffect from '@/components/animation/ParticleTextEffect';
import GlobeBackground from '@/components/animation/GlobeBackground';

interface StatItem {
  icon: ReactNode;
  value: string;
  label: string;
}

interface TechHeroProps {
  breadcrumb: string;
  particleWords: string[];
  subtitle: string;
  stats: StatItem[];
  bottomText: ReactNode;
}

export default function TechHero({ breadcrumb, particleWords, subtitle, stats, bottomText }: TechHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const globeLayerRef = useRef<HTMLDivElement>(null);
  const gridLayerRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const curX = useRef(0);
  const curY = useRef(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      mouseX.current = (e.clientX - r.left - r.width / 2) / r.width;
      mouseY.current = (e.clientY - r.top - r.height / 2) / r.height;
    };

    const onTouch = (e: TouchEvent) => {
      const r = hero.getBoundingClientRect();
      mouseX.current = (e.touches[0].clientX - r.left - r.width / 2) / r.width;
      mouseY.current = (e.touches[0].clientY - r.top - r.height / 2) / r.height;
    };

    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      let progress = -rect.top / totalScroll;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      scrollProgressRef.current = progress;
    };

    let raf: number;
    const tick = () => {
      curX.current += (mouseX.current - curX.current) * 0.06;
      curY.current += (mouseY.current - curY.current) * 0.06;

      const x = curX.current;
      const y = curY.current;

      if (globeLayerRef.current)
        globeLayerRef.current.style.transform = `translate(${x * 50}px, ${y * 35}px)`;
      if (gridLayerRef.current)
        gridLayerRef.current.style.transform = `translate(${x * 22}px, ${y * 16}px)`;
      if (lightRef.current)
        lightRef.current.style.transform = `translateX(calc(-50% + ${x * 30}px))`;

      raf = requestAnimationFrame(tick);
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    onScroll();
    raf = requestAnimationFrame(tick);

    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('touchmove', onTouch);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: '1800vh', position: 'relative' }}>
      <section ref={heroRef} style={{ position: 'sticky', top: 0, height: '100vh', minHeight: '600px', overflow: 'hidden', background: '#000' }}>

        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: `
            linear-gradient(to right, rgba(0,0,0,0.92) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.92) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 40%, transparent 80%, rgba(0,0,0,0.8) 100%)
          `
        }} />

        {/* Perspective grid */}
        <div ref={gridLayerRef} style={{ position: 'absolute', inset: 0, zIndex: 0, willChange: 'transform' }}>
          <svg style={{ width: '100%', height: '100%', opacity: 0.12, pointerEvents: 'none' }} preserveAspectRatio="none">
            {[0.55, 0.65, 0.72, 0.78, 0.84, 0.9, 0.96].map((y, i) => (
              <line key={i} x1="0%" y1={`${y * 100}%`} x2="100%" y2={`${y * 100}%`} stroke="rgba(212,168,67,0.4)" strokeWidth="0.5" />
            ))}
            {[-0.8,-0.5,-0.2,0,0.2,0.5,0.8].map((offset, i) => (
              <line key={i} x1={`${50 + offset * 100}%`} y1="100%" x2="50%" y2="40%" stroke="rgba(212,168,67,0.3)" strokeWidth="0.5" />
            ))}
          </svg>
        </div>

        {/* Corner rays */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 35% 35% at 0% 0%, rgba(212,168,67,0.06) 0%, transparent 100%),
            radial-gradient(ellipse 35% 35% at 100% 0%, rgba(212,168,67,0.06) 0%, transparent 100%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(212,168,67,0.1) 0%, transparent 70%)
          `
        }} />

        {/* Globe — desktop: canvas, mobile: lightweight CSS SVG */}
        <div ref={globeLayerRef} style={{ position: 'absolute', inset: 0, zIndex: 1, willChange: 'transform' }}>
          {/* Desktop canvas globe */}
          <div className="hidden md:block">
            <GlobeBackground size={580} color="rgba(212,168,67," speed={0.0015} />
          </div>
          {/* Mobile CSS globe — zero canvas, zero JS */}
          <div className="md:hidden" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '92vw', height: '92vw', pointerEvents: 'none' }}>
            <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%', opacity: 0.82 }}>
              <defs>
                <radialGradient id="mGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(212,168,67,0.14)" />
                  <stop offset="100%" stopColor="rgba(212,168,67,0)" />
                </radialGradient>
                <style>{`
                  @keyframes mSpin  { to { transform: rotate(360deg);  } }
                  @keyframes mSpinR { to { transform: rotate(-360deg); } }
                  .ms  { animation: mSpin  28s linear infinite; transform-origin: 200px 200px; }
                  .msr { animation: mSpinR 40s linear infinite; transform-origin: 200px 200px; }
                `}</style>
              </defs>
              <circle cx="200" cy="200" r="195" fill="url(#mGlow)" />
              <circle cx="200" cy="200" r="168" fill="none" stroke="rgba(212,168,67,0.13)" strokeWidth="1" />
              {([-60,-35,-12,12,35,60] as number[]).map((lat,i) => {
                const c=Math.cos(lat*Math.PI/180),s=Math.sin(lat*Math.PI/180);
                const rx=168*c, ry=rx*0.27, cy=200+168*s;
                return <ellipse key={i} cx="200" cy={cy} rx={Math.max(rx,1)} ry={Math.max(ry,1)} fill="none" stroke={`rgba(212,168,67,${(0.07+c*0.12).toFixed(2)})`} strokeWidth="0.8" />;
              })}
              <g className="ms">
                {([0,40,80,120,160] as number[]).map((lon,i) => (
                  <ellipse key={i} cx="200" cy="200" rx={Math.max(168*Math.sin((lon+1)*Math.PI/180),0.5)} ry={168}
                    fill="none" stroke="rgba(212,168,67,0.07)" strokeWidth="0.8"
                    style={{transform:`rotate(${lon}deg)`,transformOrigin:'200px 200px'}} />
                ))}
                {Array.from({length:70},(_,i) => {
                  const a=(i/70)*Math.PI*2, lr=Math.sin(i*1.9)*0.65;
                  const x=200+168*Math.cos(lr)*Math.cos(a), y=200-168*Math.sin(lr);
                  return <circle key={i} cx={x} cy={y} r={i%4===0?1.4:0.8} fill={`rgba(212,168,67,${(0.22+(i%5)*0.07).toFixed(2)})`} />;
                })}
              </g>
              <g className="msr">
                {([0,45,90,135,180,225,270,315] as number[]).map((deg,i) => {
                  const rad=deg*Math.PI/180;
                  return <line key={i} x1={200+168*Math.cos(rad)} y1={200+168*Math.sin(rad)} x2={200+265*Math.cos(rad)} y2={200+265*Math.sin(rad)} stroke="rgba(212,168,67,0.07)" strokeWidth="0.6" />;
                })}
              </g>
            </svg>
          </div>
        </div>

        {/* Light point */}
        <div ref={lightRef} style={{
          position: 'absolute', bottom: '8%', left: '50%',
          transform: 'translateX(-50%)', zIndex: 1, pointerEvents: 'none', willChange: 'transform',
          width: 2, height: 2, borderRadius: '50%', background: 'rgba(255,200,60,0.9)',
          boxShadow: '0 0 40px 20px rgba(212,168,67,0.35), 0 0 100px 60px rgba(212,168,67,0.12)',
        }} />

        {/* Particle text */}
        <ParticleTextEffect
          words={particleWords}
          fullScreen
          goldMode
          subtitle={subtitle}
          scrollProgressRef={scrollProgressRef}
        />

        {/* Radar — mobile only, pure CSS SVG (zero canvas) */}
        <div className="md:hidden" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 2, pointerEvents: 'none' }}>
          <svg viewBox="0 0 300 300" style={{ width: 280, height: 280 }}>
            <defs>
              <linearGradient id="rB" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="rgba(255,210,60,0.88)" />
                <stop offset="40%" stopColor="rgba(212,168,67,0.3)" />
                <stop offset="100%" stopColor="rgba(212,168,67,0)" />
              </linearGradient>
              <style>{`
                @keyframes rP{0%,100%{opacity:.85}50%{opacity:.4}}
                @keyframes rB2{0%,100%{opacity:.9}50%{opacity:.5}}
              `}</style>
            </defs>
            {([25,50,75,100,125] as number[]).map((r,i) => (
              <ellipse key={i} cx="150" cy="195" rx={r} ry={r*0.3}
                fill="none" stroke={`rgba(212,168,67,${(0.6-i*0.09).toFixed(2)})`}
                strokeWidth={i===4?1.5:0.9}
                style={{animation:`rP 2.2s ease-in-out infinite ${(i*0.18).toFixed(2)}s`}} />
            ))}
            <line x1="15" y1="195" x2="285" y2="195" stroke="rgba(212,168,67,0.14)" strokeWidth="0.6" />
            <line x1="150" y1="145" x2="150" y2="235" stroke="rgba(212,168,67,0.14)" strokeWidth="0.6" />
            <polygon points="144,195 156,195 151,30 149,30" fill="url(#rB)" style={{animation:'rB2 1.6s ease-in-out infinite'}} />
            <ellipse cx="150" cy="195" rx="20" ry="6" fill="rgba(212,168,67,0.18)" style={{animation:'rP 1.8s ease-in-out infinite'}} />
            <circle cx="150" cy="195" r="4" fill="#fff8c0" style={{animation:'rB2 1.6s ease-in-out infinite'}} />
          </svg>
        </div>

        {/* Breadcrumb */}
        <div style={{ position: 'absolute', top: 'clamp(90px,10vh,120px)', left: 'clamp(24px,5vw,60px)', zIndex: 2, pointerEvents: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 20, height: 1, background: '#AC033B' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.3em', color: 'rgba(172,3,59,0.9)', textTransform: 'uppercase' }}>Our Process</span>
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>{breadcrumb}</span>
          </div>
        </div>

        {/* Stats — desktop only */}
        <div className="hidden md:flex" style={{ position: 'absolute', top: '50%', left: 'clamp(24px,5vw,60px)', transform: 'translateY(-50%)', zIndex: 2, pointerEvents: 'none', flexDirection: 'column', gap: 28 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ color: '#AC033B', marginTop: 2, flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: 'clamp(1rem,1.8vw,1.3rem)', fontWeight: 700, color: 'rgba(255,255,255,0.55)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline — desktop only */}
        <div className="hidden md:block" style={{ position: 'absolute', bottom: 40, left: 'clamp(24px,5vw,60px)', zIndex: 2, pointerEvents: 'none' }}>
          <p style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', lineHeight: 1.8 }}>
            {bottomText}
          </p>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, pointerEvents: 'none' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(172,3,59,0.7), transparent)', animation: 'scrollHint 2s ease-in-out infinite' }} />
        </div>

      </section>
    </div>
  );
}
