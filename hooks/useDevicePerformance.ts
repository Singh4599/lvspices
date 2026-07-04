'use client';

import { useEffect, useState } from 'react';
import { detectGPUTier } from '@/lib/three-utils';

export type PerformanceTier = 'high' | 'medium' | 'low';

export function useDevicePerformance(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>('medium');

  useEffect(() => {
    setTier(detectGPUTier());
  }, []);

  return tier;
}

export function useShouldRender3D(): boolean {
  const tier = useDevicePerformance();
  return tier !== 'low';
}
