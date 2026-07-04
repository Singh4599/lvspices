'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { OrbitControls, Html } from '@react-three/drei';
import Molecule from '@/components/three/objects/Molecule';
import ParticleField from '@/components/three/effects/ParticleField';

interface MoleculeExplorerProps {
  className?: string;
}

const COMPOUND_INFO: Record<string, string> = {
  'Curcumin': 'Primary compound in turmeric — anti-inflammatory, golden color',
  'Piperine': 'Active compound in black pepper — bioavailability enhancer',
  'Capsaicin': 'Heat compound in chilli — Scoville scale determinant',
  'Cinnamaldehyde': 'Dominant compound in cinnamon — sweet-spicy aroma',
  'Eugenol': 'Key compound in cloves — analgesic properties',
  'Cuminaldehyde': 'Primary aroma compound in cumin — warm, earthy notes',
  'Linalool': 'Found in coriander — floral, citrus aroma',
  'Gingerol': 'Active compound in ginger — pungent, warming',
};

function InteractiveMolecule() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes = [
    { position: [0, 0, 0] as [number, number, number], label: 'Curcumin' },
    { position: [2, 1, 0.5] as [number, number, number], label: 'Piperine' },
    { position: [-1.5, 1.5, -0.5] as [number, number, number], label: 'Capsaicin' },
    { position: [1, -1.5, 1] as [number, number, number], label: 'Cinnamaldehyde' },
    { position: [-2, -0.5, 0.8] as [number, number, number], label: 'Eugenol' },
    { position: [0.5, 2, -1] as [number, number, number], label: 'Cuminaldehyde' },
    { position: [-1, -2, -0.5] as [number, number, number], label: 'Linalool' },
    { position: [2.5, -0.5, -1] as [number, number, number], label: 'Gingerol' },
  ];

  return (
    <group>
      <Molecule animated={!selectedNode} />

      {/* Clickable labels */}
      {nodes.map((node) => (
        <Html
          key={node.label}
          position={[node.position[0], node.position[1] + 0.3, node.position[2]]}
          center
        >
          <button
            className={`px-2 py-1 rounded-full text-[9px] font-mono tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer
              ${selectedNode === node.label
                ? 'bg-[#AC033B] text-white scale-110'
                : 'bg-white/80 text-[#AC033B] hover:bg-[#AC033B] hover:text-white border border-[#AC033B]/20'
              }`}
            onClick={() => setSelectedNode(selectedNode === node.label ? null : node.label!)}
          >
            {node.label}
          </button>
        </Html>
      ))}

      {/* Selected compound info */}
      {selectedNode && (
        <Html position={[0, -3, 0]} center>
          <div className="glass-card px-5 py-3 max-w-[240px] text-center">
            <p className="font-mono text-[11px] font-bold text-[#AC033B]">{selectedNode}</p>
            <p className="text-[10px] text-black/60 mt-1">
              {COMPOUND_INFO[selectedNode]}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function MoleculeExplorer({ className = '' }: MoleculeExplorerProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#FFFFFF" />
          <pointLight position={[-3, -2, 3]} intensity={0.2} color="#AC033B" />

          <InteractiveMolecule />

          {/* Background particles */}
          <ParticleField
            count={1000}
            color="#AC033B"
            size={0.005}
            radius={8}
            speed={0.01}
            opacity={0.1}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI * 0.75}
            minPolarAngle={Math.PI * 0.25}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
