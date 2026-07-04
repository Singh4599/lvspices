'use client';
import dynamic from 'next/dynamic';

const Preloader          = dynamic(() => import('@/components/animation/Preloader'),          { ssr: false });
const GSAPScrollAnimations = dynamic(() => import('@/components/animation/GSAPScrollAnimations'), { ssr: false });

export default function ClientEffects() {
  return (
    <>
      <Preloader />
      <GSAPScrollAnimations />
    </>
  );
}

