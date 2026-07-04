'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

function Chamber() {
  const chamberRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Frost particles falling inside the chamber
  const particlePositions = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.8;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (chamberRef.current) {
      chamberRef.current.rotation.y += delta * 0.2;
    }

    if (particlesRef.current) {
      const posArr = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < posArr.length / 3; i++) {
        posArr[i * 3 + 1] -= delta * 0.5; // Fall down
        if (posArr[i * 3 + 1] < -1.5) {
          posArr[i * 3 + 1] = 1.5; // Reset to top
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Main chamber cylinder */}
      <group ref={chamberRef}>
        <mesh>
          <cylinderGeometry args={[1, 1, 3, 32, 1, true]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0.15}
            wireframe
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner chamber */}
        <mesh>
          <cylinderGeometry args={[0.85, 0.85, 2.8, 32, 1, true]} />
          <meshStandardMaterial
            color="#AC033B"
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Top ring */}
        <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.05, 8, 32]} />
          <meshStandardMaterial color="#AC033B" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Bottom ring */}
        <mesh position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.05, 8, 32]} />
          <meshStandardMaterial color="#AC033B" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Mid ring */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.02, 0.03, 8, 32]} />
          <meshStandardMaterial color="#AC033B" metalness={0.6} roughness={0.3} opacity={0.5} transparent />
        </mesh>
      </group>

      {/* Frost particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#AC033B"
          size={0.02}
          transparent
          opacity={0.3}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Temperature HUD */}
      <Html position={[1.8, 0, 0]} center>
        <div className="font-mono text-[14px] font-bold text-[#AC033B] whitespace-nowrap opacity-80">
          -40°C
        </div>
      </Html>

      <Html position={[1.8, -0.4, 0]} center>
        <div className="font-mono text-[9px] text-black/40 whitespace-nowrap tracking-widest uppercase">
          Liquid Nitrogen
        </div>
      </Html>
    </group>
  );
}

interface CryogenicChamberProps {
  className?: string;
}

export default function CryogenicChamber({ className = '' }: CryogenicChamberProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} color="#FFFFFF" />
          <pointLight position={[3, 3, 3]} intensity={0.4} color="#FFFFFF" />
          <pointLight position={[-2, -1, 2]} intensity={0.2} color="#AC033B" />
          <Chamber />
        </Suspense>
      </Canvas>
    </div>
  );
}
