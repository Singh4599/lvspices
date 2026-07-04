'use client';

import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { latLngToVector3 } from '@/lib/three-utils';

interface RouteArcProps {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  radius?: number;
  altitude?: number;
  color?: string;
  animated?: boolean;
}

export default function RouteArc({
  startLat,
  startLng,
  endLat,
  endLng,
  radius = 2,
  altitude = 0.4,
  color = '#AC033B',
}: RouteArcProps) {
  const points = useMemo(() => {
    const start = latLngToVector3(startLat, startLng, radius);
    const end = latLngToVector3(endLat, endLng, radius);

    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(radius + altitude);

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(50).map((p) => [p.x, p.y, p.z] as [number, number, number]);
  }, [startLat, startLng, endLat, endLng, radius, altitude]);

  return (
    <group>
      <Line
        points={points}
        color={color}
        lineWidth={1}
        transparent
        opacity={0.5}
      />

      {/* End point dot */}
      <mesh position={points[points.length - 1]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}
