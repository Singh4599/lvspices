'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

function Scanner() {
  const scanLineRef = useRef<THREE.Mesh>(null);
  const sampleRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  // Analysis points
  const analysisPoints = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 20; i++) {
      pts.push([
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 1.5,
      ]);
    }
    return pts;
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta;

    // Scan line animation
    if (scanLineRef.current) {
      scanLineRef.current.position.y = Math.sin(timeRef.current * 0.8) * 1.2;
    }

    // Sample rotation
    if (sampleRef.current) {
      sampleRef.current.rotation.y += delta * 0.3;
    }

    // Particles shimmer
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Sample platform */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.05, 32]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.3} />
      </mesh>

      {/* Spice sample */}
      <group ref={sampleRef} position={[0, -0.2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.6, 0.6, 0.15, 32]} />
          <meshStandardMaterial color="#AC033B" roughness={0.6} metalness={0.1} opacity={0.7} transparent />
        </mesh>
      </group>

      {/* Scan line */}
      <mesh ref={scanLineRef} position={[0, 0, 0]}>
        <planeGeometry args={[3, 0.02]} />
        <meshBasicMaterial color="#AC033B" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* Scan beam (vertical line) */}
      <mesh position={[0, 0.5, 0]}>
        <planeGeometry args={[0.005, 2.5]} />
        <meshBasicMaterial color="#AC033B" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Analysis detection points */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(analysisPoints.flat()), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#AC033B"
          size={0.04}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Scanner frame */}
      {[[-1.3, 1.3], [1.3, 1.3], [-1.3, -0.8], [1.3, -0.8]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#AC033B" opacity={0.4} transparent />
        </mesh>
      ))}

      {/* HUD readout */}
      <Html position={[2, 0.8, 0]} center>
        <div className="font-mono text-[9px] leading-relaxed whitespace-nowrap text-left opacity-80 space-y-1">
          <div className="text-[#AC033B] font-bold tracking-widest">SCAN ANALYSIS</div>
          <div className="text-black/50">PATHOGENS: <span className="text-[#AC033B]">0 DETECTED</span></div>
          <div className="text-black/50">PESTICIDES: <span className="text-[#AC033B]">COMPLIANT</span></div>
          <div className="text-black/50">MOISTURE: <span className="text-[#AC033B]">8.2%</span></div>
          <div className="text-black/50">VOLATILE OIL: <span className="text-[#AC033B]">3.4%</span></div>
        </div>
      </Html>
    </group>
  );
}

interface QualityScanner3DProps {
  className?: string;
}

export default function QualityScanner3D({ className = '' }: QualityScanner3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 1, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 5, 3]} intensity={0.6} color="#FFFFFF" />
          <pointLight position={[0, 2, 0]} intensity={0.3} color="#AC033B" />
          <Scanner />
        </Suspense>
      </Canvas>
    </div>
  );
}
