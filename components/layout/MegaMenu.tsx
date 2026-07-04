'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import type { NavGroup } from '@/data/navigation';

interface MegaMenuProps {
  groups: NavGroup[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function MegaMenu({ groups, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }
    );
  }, []);

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-1/2 -translate-x-1/2 pt-0 mt-0"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white/98 backdrop-blur-xl shadow-[0_15px_30px_-5px_rgba(172,3,59,0.1)] border border-black/5 w-[360px] overflow-hidden rounded-b-2xl border-t-2 border-t-[#AC033B]">
        {groups.map((group, groupIdx) => (
          <div key={group.title} className="flex flex-col">
            {group.items.map((item, itemIdx) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex flex-col py-4 px-6 hover:bg-[#AC033B]/[0.02] transition-all duration-300 ${
                  itemIdx !== group.items.length - 1 ? 'border-b border-black/5' : ''
                }`}
              >
                <div className="flex items-center justify-between text-[13px] font-bold text-white group-hover:text-[#AC033B] transition-colors duration-300">
                  {item.label}
                  <svg className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#AC033B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                {item.description && (
                  <span className="text-[11.5px] font-medium text-white/30 mt-1.5 transition-colors duration-300">
                    {item.description}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
