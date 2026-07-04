'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useShouldRender3D } from '@/hooks/useDevicePerformance';

// Lazy-loaded Three.js scenes with ssr: false
const SpiceParticleUniverse = dynamic(
  () => import('@/components/three/scenes/SpiceParticleUniverse'),
  { ssr: false }
);

const IndiaMapParticles = dynamic(
  () => import('@/components/three/scenes/IndiaMapParticles'),
  { ssr: false }
);

const CryogenicChamber = dynamic(
  () => import('@/components/three/scenes/CryogenicChamber'),
  { ssr: false }
);

const MoleculeExplorer = dynamic(
  () => import('@/components/three/scenes/MoleculeExplorer'),
  { ssr: false }
);

const QualityScanner3D = dynamic(
  () => import('@/components/three/scenes/QualityScanner3D'),
  { ssr: false }
);

const ExportGlobe = dynamic(
  () => import('@/components/three/scenes/ExportGlobe'),
  { ssr: false }
);

const ProductObjectScene = dynamic(
  () => import('@/components/three/scenes/ProductObjectScene'),
  { ssr: false }
);

// Loading fallback for 3D scenes
function SceneFallback({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border border-[#AC033B]/20 border-t-[#AC033B] animate-spin" />
        <span className="font-mono text-[10px] tracking-widest text-[#AC033B]/40 uppercase">
          Loading 3D
        </span>
      </div>
    </div>
  );
}

// Static fallback for low-end devices
function StaticFallback({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={`w-full h-full flex items-center justify-center bg-[rgba(172,3,59,0.02)] rounded-3xl ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full border border-[#AC033B]/15 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#AC033B" strokeWidth="1.5" opacity="0.4">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
        <span className="font-mono text-[10px] tracking-widest text-black/30 uppercase">{label}</span>
      </div>
    </div>
  );
}

// Performance-gated scene wrapper
interface SceneWrapperProps {
  scene: 'particles' | 'india' | 'cryo' | 'molecule' | 'scanner' | 'globe' | 'product';
  className?: string;
  fallbackLabel?: string;
}

export default function SceneWrapper({ scene, className = '', fallbackLabel }: SceneWrapperProps) {
  const shouldRender = useShouldRender3D();

  if (!shouldRender) {
    return <StaticFallback label={fallbackLabel || scene} className={className} />;
  }

  const sceneMap = {
    particles: <SpiceParticleUniverse className={className} />,
    india: <IndiaMapParticles className={className} />,
    cryo: <CryogenicChamber className={className} />,
    molecule: <MoleculeExplorer className={className} />,
    scanner: <QualityScanner3D className={className} />,
    globe: <ExportGlobe className={className} />,
    product: <ProductObjectScene className={className} />,
  };

  return (
    <Suspense fallback={<SceneFallback className={className} />}>
      {sceneMap[scene]}
    </Suspense>
  );
}

// Re-export individual dynamic components for direct use
export {
  SpiceParticleUniverse,
  IndiaMapParticles,
  CryogenicChamber,
  MoleculeExplorer,
  QualityScanner3D,
  ExportGlobe,
  ProductObjectScene,
  SceneFallback,
  StaticFallback,
};
