'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useMemo, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

// Simplified India boundary points (normalized to roughly -3 to 3 coordinate space)
const INDIA_POINTS: [number, number][] = [
  // Western coast (Gujarat to Kerala)
  [-2.2, 2.5], [-2.5, 2.0], [-2.8, 1.5], [-2.6, 1.0], [-2.3, 0.5],
  [-2.5, 0.0], [-2.7, -0.5], [-2.4, -1.0], [-2.2, -1.5], [-2.0, -2.0],
  [-1.5, -2.8],
  // Southern tip
  [-0.8, -3.2], [0, -3.5], [0.8, -3.0],
  // Eastern coast (Tamil Nadu to West Bengal)
  [1.0, -2.5], [1.3, -2.0], [1.5, -1.5], [1.8, -1.0], [2.0, -0.5],
  [2.2, 0.0], [2.0, 0.5], [1.8, 1.0], [2.0, 1.5], [1.8, 2.0],
  // Northern border
  [1.5, 2.5], [1.0, 2.8], [0.5, 3.0], [0, 3.2],
  [-0.5, 3.0], [-1.0, 3.2], [-1.5, 3.0], [-2.0, 2.8],
];

interface Region {
  name: string;
  center: [number, number, number];
  spices: string;
  color: string;
}

const REGIONS: Region[] = [
  { name: 'West India', center: [-2.0, 1.5, 0], spices: 'Cumin, Fenugreek', color: '#AC033B' },
  { name: 'South India', center: [-0.5, -2.0, 0], spices: 'Black Pepper, Turmeric, Chilli', color: '#AC033B' },
  { name: 'North India', center: [-0.5, 2.8, 0], spices: 'Kashmiri Chilli, Ginger', color: '#AC033B' },
  { name: 'East India', center: [1.5, 1.0, 0], spices: 'Turmeric', color: '#AC033B' },
];

function IndiaDots() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Generate dots filling the India shape
  const dots = useMemo(() => {
    const result: { pos: [number, number, number]; size: number; region: string | null }[] = [];

    for (let i = 0; i < 600; i++) {
      const x = (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 7;

      // Simple point-in-polygon-ish check (approximate)
      const inBounds =
        x > -3 && x < 2.5 &&
        y > -3.5 && y < 3.5 &&
        // Rough India shape masking
        Math.abs(x) < 2.5 - Math.abs(y) * 0.3 + Math.random() * 0.8;

      if (inBounds) {
        // Determine region
        let region: string | null = null;
        for (const r of REGIONS) {
          const dist = Math.sqrt(
            (x - r.center[0]) ** 2 + (y - r.center[1]) ** 2
          );
          if (dist < 1.8) {
            region = r.name;
            break;
          }
        }

        result.push({
          pos: [x, y, 0],
          size: Math.random() * 0.04 + 0.02,
          region,
        });
      }
    }

    return result;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(Date.now() * 0.0003) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {dots.map((dot, i) => (
        <mesh
          key={i}
          position={dot.pos}
          onPointerOver={() => dot.region && setHoveredRegion(dot.region)}
          onPointerOut={() => setHoveredRegion(null)}
        >
          <circleGeometry args={[dot.size, 8]} />
          <meshBasicMaterial
            color="#AC033B"
            transparent
            opacity={
              hoveredRegion
                ? dot.region === hoveredRegion
                  ? 0.9
                  : 0.15
                : 0.4
            }
          />
        </mesh>
      ))}

      {/* Region labels */}
      {REGIONS.map((region) => (
        <Html
          key={region.name}
          position={region.center}
          center
          style={{
            opacity: hoveredRegion === region.name ? 1 : 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
          }}
        >
          <div className="glass-card px-4 py-2 text-center whitespace-nowrap">
            <p className="font-mono text-[11px] font-bold text-[#AC033B]">{region.name}</p>
            <p className="text-[10px] text-black/60">{region.spices}</p>
          </div>
        </Html>
      ))}
    </group>
  );
}

interface IndiaMapParticlesProps {
  className?: string;
}

export default function IndiaMapParticles({ className = '' }: IndiaMapParticlesProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <IndiaDots />
        </Suspense>
      </Canvas>
    </div>
  );
}
