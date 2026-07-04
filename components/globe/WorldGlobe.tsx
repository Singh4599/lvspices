'use client';

import { useEffect, useRef } from 'react';
import createGlobe, { COBEOptions } from 'cobe';

const ARCS = [
  { from: [19.076, 72.877] as [number, number], to: [51.505, -0.09] as [number, number] },
  { from: [19.076, 72.877] as [number, number], to: [40.712, -74.006] as [number, number] },
  { from: [19.076, 72.877] as [number, number], to: [25.204, 55.270] as [number, number] },
  { from: [19.076, 72.877] as [number, number], to: [1.352, 103.820] as [number, number] },
  { from: [19.076, 72.877] as [number, number], to: [-33.868, 151.209] as [number, number] },
  { from: [19.076, 72.877] as [number, number], to: [50.110, 8.682] as [number, number] },
  { from: [19.076, 72.877] as [number, number], to: [43.653, -79.383] as [number, number] },
  { from: [19.076, 72.877] as [number, number], to: [-1.286, 36.817] as [number, number] },
  { from: [19.076, 72.877] as [number, number], to: [24.688, 46.724] as [number, number] },
  { from: [19.076, 72.877] as [number, number], to: [52.377, 4.907] as [number, number] },
];

const MARKERS = [
  { location: [19.076, 72.877] as [number, number], size: 0.08 },   // Mumbai HQ
  { location: [51.505, -0.09] as [number, number], size: 0.045 },
  { location: [40.712, -74.006] as [number, number], size: 0.045 },
  { location: [25.204, 55.270] as [number, number], size: 0.045 },
  { location: [1.352, 103.820] as [number, number], size: 0.045 },
  { location: [50.110, 8.682] as [number, number], size: 0.045 },
  { location: [-1.286, 36.817] as [number, number], size: 0.04 },
  { location: [35.681, 139.767] as [number, number], size: 0.04 },
  { location: [-33.868, 151.209] as [number, number], size: 0.04 },
  { location: [43.653, -79.383] as [number, number], size: 0.04 },
];

export default function WorldGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = canvas.offsetWidth || 500;

    const opts: COBEOptions = {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.25,
      dark: 0,
      diffuse: 1.6,
      mapSamples: 20000,
      mapBrightness: 7,
      baseColor: [1, 1, 1],
      markerColor: [0.675, 0.012, 0.231],
      glowColor: [0.95, 0.95, 0.95],
      markers: MARKERS,
      arcs: ARCS,
      arcColor: [0.675, 0.012, 0.231],
    };

    globeRef.current = createGlobe(canvas, opts);

    // Rotate by polling update
    function animate() {
      phiRef.current += 0.0025;
      globeRef.current?.update({ phi: phiRef.current });
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      globeRef.current?.destroy();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
