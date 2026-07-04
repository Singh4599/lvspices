'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

interface MoleculeProps {
  nodes?: { position: [number, number, number]; label?: string }[];
  edges?: [number, number][];
  color?: string;
  nodeSize?: number;
  animated?: boolean;
}

const defaultNodes: { position: [number, number, number]; label?: string }[] = [
  { position: [0, 0, 0], label: 'Curcumin' },
  { position: [2, 1, 0.5], label: 'Piperine' },
  { position: [-1.5, 1.5, -0.5], label: 'Capsaicin' },
  { position: [1, -1.5, 1], label: 'Cinnamaldehyde' },
  { position: [-2, -0.5, 0.8], label: 'Eugenol' },
  { position: [0.5, 2, -1], label: 'Cuminaldehyde' },
  { position: [-1, -2, -0.5], label: 'Linalool' },
  { position: [2.5, -0.5, -1], label: 'Gingerol' },
];

const defaultEdges: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 5], [2, 6], [3, 7], [4, 6],
  [5, 7], [1, 3],
];

export default function Molecule({
  nodes = defaultNodes,
  edges = defaultEdges,
  color = '#AC033B',
  nodeSize = 0.12,
  animated = true,
}: MoleculeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current || !animated) return;
    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.rotation.x += delta * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Nodes (atoms) */}
      {nodes.map((node, i) => (
        <mesh key={`node-${i}`} position={node.position}>
          <sphereGeometry args={[nodeSize, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Edges (bonds) — using drei Line */}
      {edges.map(([a, b], i) => (
        <Line
          key={`edge-${i}`}
          points={[nodes[a].position, nodes[b].position]}
          color={color}
          lineWidth={1}
          transparent
          opacity={0.4}
        />
      ))}

      {/* Outer orbital ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.25, 64]} />
        <meshBasicMaterial color={color} opacity={0.08} transparent side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[0.8, 0.5, 0]}>
        <ringGeometry args={[3.5, 3.54, 64]} />
        <meshBasicMaterial color={color} opacity={0.05} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
