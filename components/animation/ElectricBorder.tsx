'use client';
import React, { useEffect, useRef, useCallback, CSSProperties, ReactNode } from 'react';
import './ElectricBorder.css';

interface ElectricBorderProps {
  children?: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = '#AC033B',
  speed = 1,
  chaos = 0.12,
  borderRadius = 20,
  thickness = 2,
  className,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  const noise = useCallback((x: number, y: number, t: number): number => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const fx = x - xi, fy = y - yi;
    const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
    const r = (n: number) => (Math.sin(n * 127.1 + t * 311.7) * 43758.5453) % 1;
    const a = r(xi + yi * 57), b = r(xi + 1 + yi * 57);
    const c = r(xi + (yi + 1) * 57), d = r(xi + 1 + (yi + 1) * 57);
    return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
  }, []);

  const getPerimeterPoint = useCallback((t: number, w: number, h: number, r: number) => {
    const straight_w = Math.max(0, w - 2 * r);
    const straight_h = Math.max(0, h - 2 * r);
    const arc = (Math.PI / 2) * r;
    const total = 2 * straight_w + 2 * straight_h + 4 * arc;
    let d = ((t % 1 + 1) % 1) * total;

    // top edge
    if (d < straight_w) return { x: r + d, y: 0 };
    d -= straight_w;
    // top-right corner
    if (d < arc) { const a = -Math.PI / 2 + (d / arc) * (Math.PI / 2); return { x: w - r + r * Math.cos(a), y: r + r * Math.sin(a) }; }
    d -= arc;
    // right edge
    if (d < straight_h) return { x: w, y: r + d };
    d -= straight_h;
    // bottom-right corner
    if (d < arc) { const a = (d / arc) * (Math.PI / 2); return { x: w - r + r * Math.cos(a), y: h - r + r * Math.sin(a) }; }
    d -= arc;
    // bottom edge
    if (d < straight_w) return { x: w - r - d, y: h };
    d -= straight_w;
    // bottom-left corner
    if (d < arc) { const a = Math.PI / 2 + (d / arc) * (Math.PI / 2); return { x: r + r * Math.cos(a), y: h - r + r * Math.sin(a) }; }
    d -= arc;
    // left edge
    if (d < straight_h) return { x: 0, y: h - r - d };
    d -= straight_h;
    // top-left corner
    const a = Math.PI + (d / arc) * (Math.PI / 2);
    return { x: r + r * Math.cos(a), y: r + r * Math.sin(a) };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d')!;
    let w = 0, h = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const draw = () => {
      timeRef.current += 0.016 * speed;
      const t = timeRef.current;
      ctx.clearRect(0, 0, w, h);

      const SEGMENTS = 120;
      const r = Math.min(borderRadius, Math.min(w, h) / 2);

      // Parse color to get RGB
      const tmp = document.createElement('canvas');
      tmp.width = tmp.height = 1;
      const tc = tmp.getContext('2d')!;
      tc.fillStyle = color;
      tc.fillRect(0, 0, 1, 1);
      const [cr, cg, cb] = tc.getImageData(0, 0, 1, 1).data;

      for (let layer = 0; layer < 3; layer++) {
        const opacity = layer === 0 ? 0.6 : layer === 1 ? 0.35 : 0.15;
        const blur = layer === 0 ? thickness : layer === 1 ? thickness * 3 : thickness * 8;

        ctx.beginPath();
        for (let i = 0; i <= SEGMENTS; i++) {
          const progress = i / SEGMENTS;
          const noiseVal = noise(progress * 8, layer * 3.7, t * 0.5) * chaos * 20;
          const perp = noiseVal;
          const pt = getPerimeterPoint(progress, w, h, r);

          // Normal direction (outward)
          const ptNext = getPerimeterPoint((progress + 0.01) % 1, w, h, r);
          const dx = ptNext.x - pt.x, dy = ptNext.y - pt.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = -dy / len, ny = dx / len;

          const px = pt.x + nx * perp;
          const py = pt.y + ny * perp;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${opacity})`;
        ctx.lineWidth = blur;
        ctx.filter = `blur(${layer * 2}px)`;
        ctx.stroke();
        ctx.filter = 'none';
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [color, speed, chaos, borderRadius, thickness, noise, getPerimeterPoint]);

  return (
    <div ref={containerRef} className={`electric-border-wrapper ${className ?? ''}`} style={style}>
      <canvas ref={canvasRef} className="electric-border-canvas" />
      <div className="electric-border-content">{children}</div>
    </div>
  );
};

export default ElectricBorder;
