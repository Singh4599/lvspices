'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

interface ProductPackProps {
  color?: string;
  size?: [number, number, number];
}

export default function ProductPack({
  color = '#AC033B',
  size = [1, 1.4, 0.4],
}: ProductPackProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Pack body */}
        <mesh castShadow>
          <boxGeometry args={size} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.15}
            metalness={0.05}
          />
        </mesh>

        {/* Front label (crimson face) */}
        <mesh position={[0, 0, size[2] / 2 + 0.001]}>
          <planeGeometry args={[size[0] * 0.85, size[1] * 0.6]} />
          <meshStandardMaterial
            color={color}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        {/* Brand strip */}
        <mesh position={[0, size[1] * 0.25, size[2] / 2 + 0.002]}>
          <planeGeometry args={[size[0] * 0.7, 0.08]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>

        {/* Bottom accent line */}
        <mesh position={[0, -size[1] / 2 + 0.02, size[2] / 2 + 0.002]}>
          <planeGeometry args={[size[0], 0.03]} />
          <meshBasicMaterial color={color} />
        </mesh>

        {/* Subtle shadow catcher */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -size[1] / 2 - 0.01, 0]} receiveShadow>
          <planeGeometry args={[3, 3]} />
          <shadowMaterial opacity={0.15} />
        </mesh>
      </group>
    </Float>
  );
}
