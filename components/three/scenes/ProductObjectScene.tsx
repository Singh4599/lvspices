'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ContactShadows, Environment } from '@react-three/drei';
import ProductPack from '@/components/three/objects/ProductPack';

interface ProductObjectSceneProps {
  className?: string;
}

export default function ProductObjectScene({ className = '' }: ProductObjectSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        shadows
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-3, 2, 2]} intensity={0.2} color="#AC033B" />

          <ProductPack />

          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.3}
            scale={5}
            blur={2}
            far={3}
            color="#AC033B"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
