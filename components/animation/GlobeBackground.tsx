'use client';

import { useEffect, useRef } from 'react';

interface GlobeProps {
  size?: number;
  color?: string;
  speed?: number;
}

export default function GlobeBackground({ size = 520, color = 'rgba(212,168,67,', speed = 0.002 }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const rotRef = useRef(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Responsive: fill 92vw on mobile, capped at size on desktop
    const getS = () => Math.min(size, window.innerWidth * 0.92);
    let s = getS();

    const applySize = () => {
      s = getS();
      canvas.width = s * dpr;
      canvas.height = s * dpr;
      canvas.style.width = `${s}px`;
      canvas.style.height = `${s}px`;
    };

    applySize();
    ctx.scale(dpr, dpr);

    // Generate globe points — latitude/longitude grid + random surface points
    const points: { lat: number; lon: number }[] = [];

    for (let lat = -90; lat <= 90; lat += 18) {
      for (let lon = 0; lon < 360; lon += 4) {
        points.push({ lat: lat * Math.PI / 180, lon: lon * Math.PI / 180 });
      }
    }
    for (let lon = 0; lon < 360; lon += 20) {
      for (let lat = -90; lat <= 90; lat += 3) {
        points.push({ lat: lat * Math.PI / 180, lon: lon * Math.PI / 180 });
      }
    }
    for (let i = 0; i < 600; i++) {
      points.push({ lat: (Math.random() - 0.5) * Math.PI, lon: Math.random() * Math.PI * 2 });
    }

    const draw = () => {
      // Pause animation if canvas is not visible
      if (!isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const cx = s / 2;
      const cy = s / 2;
      const r = s * 0.42;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rot = rotRef.current;

      // Outer glow ring
      const grd = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r * 1.1);
      grd.addColorStop(0, `${color}0.04)`);
      grd.addColorStop(1, `${color}0)`);
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Globe dots
      for (const p of points) {
        const lon = p.lon + rot;
        const cosLat = Math.cos(p.lat);
        const x3 = cosLat * Math.cos(lon);
        const y3 = Math.sin(p.lat);
        const z3 = cosLat * Math.sin(lon);
        const opacity = z3 > -0.15 ? (z3 + 1) / 2 : 0;
        if (opacity < 0.05) continue;
        const px = cx + x3 * r;
        const py = cy - y3 * r;
        const dotSize = z3 > 0.5 ? 1.2 : 0.7;
        ctx.beginPath();
        ctx.arc(px, py, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${(opacity * 0.7).toFixed(2)})`;
        ctx.fill();
      }

      // Equatorial ring
      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * 0.12, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}0.05)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Outer circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}0.07)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Radiating lines
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + rot * 0.3;
        const x1 = cx + Math.cos(angle) * r;
        const y1 = cy + Math.sin(angle) * r;
        const x2 = cx + Math.cos(angle) * (r * 1.6);
        const y2 = cy + Math.sin(angle) * (r * 1.6);
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, `${color}0.08)`);
        grad.addColorStop(1, `${color}0)`);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      rotRef.current += speed;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      applySize();
      // Re-init scale after resize
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Use IntersectionObserver to stop heavy rendering when scrolled out of view (e.g. mobile)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisibleRef.current = entry.isIntersecting;
      });
    }, { threshold: 0.01 });
    observer.observe(canvas);

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [size, color, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '92vw',
        maxHeight: '92vw',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.9,
      }}
    />
  );
}
