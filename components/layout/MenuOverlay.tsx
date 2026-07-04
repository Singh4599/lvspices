'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { mainNavItems, secondaryNavItems } from '@/data/navigation';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !linksRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const links = linksRef.current.querySelectorAll('.menu-link');
      const tl = gsap.timeline();

      tl.fromTo(
        overlayRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power3.inOut' }
      ).fromTo(
        links,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.06 },
        '-=0.2'
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.4,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[95] bg-black flex flex-col"
      style={{ clipPath: 'inset(0 0 100% 0)' }}
    >
      {/* Close button */}
      <div className="flex justify-end p-6">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center text-white hover:text-[#AC033B] transition-colors"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Links */}
      <div
        ref={linksRef}
        className="flex-1 flex flex-col justify-center px-8 md:px-16 gap-2"
      >
        {mainNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="menu-link block"
          >
            <span className="font-display text-[36px] md:text-[48px] font-bold text-white hover:text-[#AC033B] transition-colors duration-300 relative group">
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#AC033B] group-hover:w-full transition-all duration-500" />
            </span>
          </Link>
        ))}

        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-4">
            {secondaryNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="menu-link text-[14px] font-sans text-white/60 hover:text-[#AC033B] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom info */}
      <div className="px-8 md:px-16 pb-8">
        <p className="font-mono text-[11px] text-white/40 tracking-wider">
          THE SPICE SPECIALIST — EST. 1975
        </p>
      </div>
    </div>
  );
}
