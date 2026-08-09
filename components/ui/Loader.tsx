'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Reset loader state on route change if you want it to appear on every page, 
    // but typically a splash screen is only needed on the first initial load.
    // If you want it on every page navigation, uncomment the next line:
    // setIsLoading(true); 
  }, [pathname]);

  useEffect(() => {
    if (!isLoading) return;

    let isCompleted = false;

    const finishLoading = () => {
      if (isCompleted) return;
      isCompleted = true;

      const tl = gsap.timeline({
        onComplete: () => setIsLoading(false),
      });

      tl.to('.loader-line', {
        width: '100%',
        duration: 0.4,
        ease: 'power2.out',
      })
        .to(
          '.loader-text',
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.2'
        )
        .to('.loader-container', {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          delay: 0.4,
        })
        .set('.loader-container', { display: 'none' });
    };

    // Fallback timeout in case some media never triggers load/error
    const fallbackTimeout = setTimeout(finishLoading, 4000);

    const initPreloader = () => {
      const mediaElements = Array.from(document.querySelectorAll('img, video')) as (HTMLImageElement | HTMLVideoElement)[];
      const totalMedia = mediaElements.length;
      let loadedCount = 0;

      if (totalMedia === 0) {
        finishLoading();
        return;
      }

      const updateProgress = () => {
        loadedCount++;
        const progress = (loadedCount / totalMedia) * 100;
        gsap.to('.loader-line', { width: `${progress}%`, duration: 0.3, ease: 'power1.out' });
        
        if (loadedCount >= totalMedia) {
          finishLoading();
        }
      };

      mediaElements.forEach((media) => {
        if (media.tagName === 'IMG') {
          const img = media as HTMLImageElement;
          if (img.complete) {
            updateProgress();
          } else {
            img.addEventListener('load', updateProgress);
            img.addEventListener('error', updateProgress);
          }
        } else if (media.tagName === 'VIDEO') {
          const video = media as HTMLVideoElement;
          if (video.readyState >= 3) {
            updateProgress();
          } else {
            video.addEventListener('loadeddata', updateProgress);
            video.addEventListener('error', updateProgress);
          }
        }
      });
    };

    // Wait a brief moment to allow Next.js to render the DOM elements
    const startTimeout = setTimeout(() => {
      if (document.readyState === 'complete') {
        initPreloader();
      } else {
        window.addEventListener('load', initPreloader);
      }
    }, 150);

    return () => {
      clearTimeout(fallbackTimeout);
      clearTimeout(startTimeout);
      window.removeEventListener('load', initPreloader);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="loader-container fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black">
      {/* Animated line */}
      <div className="relative w-48 h-[1px] bg-black/10 mb-8 overflow-hidden rounded-full">
        <div
          className="loader-line absolute top-0 left-0 h-full bg-[#111111]"
          style={{ width: '0%' }}
        />
      </div>

      {/* Brand text */}
      <div
        className="loader-text font-mono text-[11px] tracking-[0.3em] uppercase text-white/60"
        style={{ opacity: 0, transform: 'translateY(10px)' }}
      >
        LV Spices
      </div>
    </div>
  );
}
