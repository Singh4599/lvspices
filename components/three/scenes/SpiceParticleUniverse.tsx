'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import ParticleField from '@/components/three/effects/ParticleField';

interface SpiceParticleUniverseProps {
  className?: string;
  particleCount?: number;
  opacity?: number;
}

export default function SpiceParticleUniverse({
  className = '',
  particleCount = 15000,
  opacity = 0.2,
}: SpiceParticleUniverseProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={0.3} color="#AC033B" />

          <ParticleField
            count={particleCount}
            color="#AC033B"
            size={0.015}
            radius={4}
            speed={0.05}
            opacity={opacity}
          />

          {/* Secondary smaller particles for depth */}
          <ParticleField
            count={Math.floor(particleCount * 0.3)}
            color="#AC033B"
            size={0.008}
            radius={6}
            speed={0.02}
            opacity={opacity * 0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
