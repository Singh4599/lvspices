'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, Line } from '@react-three/drei';
import RouteArc from '@/components/three/objects/RouteArc';
import { latLngToVector3 } from '@/lib/three-utils';
import { exportDestinations } from '@/data/export-markets';

// Mumbai origin
const ORIGIN = { lat: 19.076, lng: 72.8777 };

function Globe() {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.05;
    }
  });

  // Latitude/longitude lines
  const gridLines = useMemo(() => {
    const lines: [number, number, number][][] = [];

    // Latitude circles
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts: [number, number, number][] = [];
      for (let lng = 0; lng <= 360; lng += 5) {
        const v = latLngToVector3(lat, lng, 2);
        pts.push([v.x, v.y, v.z]);
      }
      lines.push(pts);
    }

    // Longitude lines
    for (let lng = 0; lng < 360; lng += 30) {
      const pts: [number, number, number][] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        const v = latLngToVector3(lat, lng, 2);
        pts.push([v.x, v.y, v.z]);
      }
      lines.push(pts);
    }

    return lines;
  }, []);

  return (
    <group ref={globeRef}>
      {/* Globe sphere */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.9}
          metalness={0.0}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Grid lines */}
      {gridLines.map((pts, i) => (
        <Line
          key={`grid-${i}`}
          points={pts}
          color="#AC033B"
          lineWidth={0.5}
          transparent
          opacity={0.08}
        />
      ))}

      {/* Origin point (Mumbai) */}
      <mesh position={latLngToVector3(ORIGIN.lat, ORIGIN.lng, 2.02)}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#AC033B" />
      </mesh>

      {/* Trade route arcs */}
      {exportDestinations
        .filter((d) => d.city !== 'Mumbai')
        .map((dest) => (
          <RouteArc
            key={dest.city}
            startLat={ORIGIN.lat}
            startLng={ORIGIN.lng}
            endLat={dest.lat}
            endLng={dest.lng}
            radius={2}
            altitude={0.3 + Math.random() * 0.3}
            color="#AC033B"
          />
        ))}

      {/* Destination dots */}
      {exportDestinations.map((dest) => {
        const pos = latLngToVector3(dest.lat, dest.lng, 2.02);
        return (
          <mesh key={dest.city} position={pos}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color="#AC033B" opacity={0.7} transparent />
          </mesh>
        );
      })}

      {/* Mumbai label */}
      <Html position={latLngToVector3(ORIGIN.lat, ORIGIN.lng, 2.15)} center>
        <div className="font-mono text-[8px] font-bold text-[#AC033B] whitespace-nowrap tracking-wider">
          MUMBAI HQ
        </div>
      </Html>
    </group>
  );
}

interface ExportGlobeProps {
  className?: string;
}

export default function ExportGlobe({ className = '' }: ExportGlobeProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 1, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} color="#FFFFFF" />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <pointLight position={[-3, 2, 3]} intensity={0.15} color="#AC033B" />
          <Globe />
        </Suspense>
      </Canvas>
    </div>
  );
}
