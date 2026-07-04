'use client';

import { useEffect, useRef } from 'react';

export default function RadarHUD({ size = 340 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size * 0.58; // center slightly below middle
    const maxR = size * 0.46;

    // Scattered random particles
    const particles = Array.from({ length: 60 }, () => ({
      x: (Math.random() - 0.5) * size,
      y: (Math.random() - 0.5) * size * 0.5,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random(),
    }));

    let t = 0;

    const draw = () => {
      // Pause animation if canvas is not visible
      if (!isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, size, size);
      t += 0.012;

      // ── Concentric rings ──────────────────────────────────
      const ringCount = 7;
      for (let i = 1; i <= ringCount; i++) {
        const frac = i / ringCount;
        const r = maxR * frac;

        // Ellipse (perspective tilt)
        const ry = r * 0.28;

        ctx.beginPath();
        ctx.ellipse(cx, cy, r, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212,168,67,${0.5 - frac * 0.38})`;
        ctx.lineWidth = i === ringCount ? 1.5 : 0.8;
        ctx.stroke();

        // Small tick marks on outer ring
        if (i === ringCount) {
          for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
            const px = cx + Math.cos(a) * r;
            const py = cy + Math.sin(a) * ry;
            const tx = cx + Math.cos(a) * (r + 5);
            const ty = cy + Math.sin(a) * (ry + 2);
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(tx, ty);
            ctx.strokeStyle = 'rgba(212,168,67,0.55)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Cross-hairs
      ctx.beginPath();
      ctx.moveTo(cx - maxR - 8, cy);
      ctx.lineTo(cx + maxR + 8, cy);
      ctx.strokeStyle = 'rgba(212,168,67,0.18)';
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy - maxR * 0.28 - 4);
      ctx.lineTo(cx, cy + maxR * 0.28 + 4);
      ctx.strokeStyle = 'rgba(212,168,67,0.18)';
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // ── Center glow ───────────────────────────────────────
      const pulse = 0.7 + 0.3 * Math.sin(t * 2.4);
      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18 * pulse);
      g1.addColorStop(0, 'rgba(255,210,60,0.95)');
      g1.addColorStop(0.35, 'rgba(212,168,67,0.55)');
      g1.addColorStop(1, 'rgba(212,168,67,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 18 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = g1;
      ctx.fill();

      // Bright core dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff8d0';
      ctx.fill();

      // ── Vertical beam shooting up ─────────────────────────
      const beamH = size * 0.7;
      const beamGrad = ctx.createLinearGradient(cx, cy, cx, cy - beamH);
      beamGrad.addColorStop(0, `rgba(255,210,60,${0.82 * pulse})`);
      beamGrad.addColorStop(0.18, `rgba(212,168,67,${0.45 * pulse})`);
      beamGrad.addColorStop(0.55, `rgba(212,168,67,0.08)`);
      beamGrad.addColorStop(1, 'rgba(212,168,67,0)');

      // Wide glow
      ctx.beginPath();
      ctx.moveTo(cx - 16, cy);
      ctx.lineTo(cx + 16, cy);
      ctx.lineTo(cx + 1, cy - beamH);
      ctx.lineTo(cx - 1, cy - beamH);
      ctx.closePath();
      ctx.fillStyle = beamGrad;
      ctx.fill();

      // Narrow sharp core
      const coreGrad = ctx.createLinearGradient(cx, cy, cx, cy - beamH * 0.7);
      coreGrad.addColorStop(0, `rgba(255,240,160,${0.9 * pulse})`);
      coreGrad.addColorStop(0.4, 'rgba(255,220,80,0.3)');
      coreGrad.addColorStop(1, 'rgba(255,220,80,0)');
      ctx.beginPath();
      ctx.moveTo(cx - 2, cy);
      ctx.lineTo(cx + 2, cy);
      ctx.lineTo(cx + 0.3, cy - beamH * 0.7);
      ctx.lineTo(cx - 0.3, cy - beamH * 0.7);
      ctx.closePath();
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // ── Scattered particles ───────────────────────────────
      for (const p of particles) {
        const blink = 0.3 + 0.7 * Math.abs(Math.sin(t * p.a * 3 + p.x));
        ctx.beginPath();
        ctx.arc(cx + p.x, cy + p.y - size * 0.1, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,168,67,${(blink * 0.6).toFixed(2)})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Use IntersectionObserver to stop heavy rendering when scrolled out of view (e.g. desktop)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisibleRef.current = entry.isIntersecting;
      });
    }, { threshold: 0.01 });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, display: 'block', pointerEvents: 'none' }}
    />
  );
}
