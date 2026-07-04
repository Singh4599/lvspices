'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navColumns = [
  {
    key: 'overview',
    label: 'OVERVIEW',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 mb-3">
        <circle cx="20" cy="20" r="19" stroke="#AC033B" strokeWidth="1.5" fill="#fff5f7"/>
        <path d="M13 20h14M20 13v14" stroke="#AC033B" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="4" stroke="#AC033B" strokeWidth="1.5"/>
      </svg>
    ),
    href: '/technology',
    links: [
      { label: 'Overview', href: '/technology' },
      { label: 'Cryogenic Grinding', href: '/technology/cryogenic-grinding' },
      { label: 'Steam Sterilization', href: '/technology/steam-sterilization' },
      { label: 'CFG Science (R&D Centre)', href: '/technology/cfg-science' },
      { label: 'Quality Control', href: '/technology/quality-assurance' },
      { label: 'Infrastructure', href: '/technology/infrastructure' },
      { label: 'Process Flow', href: '/technology/process-flow' },
    ],
    viewAll: '/technology',
  },
  {
    key: 'products',
    label: 'PRODUCTS',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 mb-3">
        <circle cx="20" cy="20" r="19" stroke="#AC033B" strokeWidth="1.5" fill="#fff5f7"/>
        <path d="M14 16h12v10a2 2 0 01-2 2h-8a2 2 0 01-2-2V16z" stroke="#AC033B" strokeWidth="1.5"/>
        <path d="M17 16v-2a3 3 0 016 0v2" stroke="#AC033B" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    href: '/products',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Spices & Seasoning', href: '/products/spices-seasoning' },
      { label: 'No Onion No Garlic', href: '/products/no-onion-no-garlic' },
      { label: 'Curry Powder', href: '/products/curry-powder' },
      { label: 'Snack Seasoning', href: '/products/snack-seasoning' },
      { label: 'Agri Products', href: '/products/agri-products' },
      { label: 'Organic', href: '/products/organic' },
      { label: 'Supermarket', href: '/products/supermarket' },
      { label: 'Millet', href: '/products/millet' },
      { label: 'Chilli Speciality', href: '/products/chilli-speciality' },
      { label: 'Dehydrated', href: '/products/dehydrated' },
      { label: 'Botanical Powders', href: '/products/botanical-powders' },
      { label: 'Herbal Teas', href: '/products/herbal-teas' },
      { label: 'Private Label', href: '/products/private-label' },
    ],
    viewAll: '/products',
  },
  {
    key: 'company',
    label: 'COMPANY',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 mb-3">
        <circle cx="20" cy="20" r="19" stroke="#AC033B" strokeWidth="1.5" fill="#fff5f7"/>
        <rect x="12" y="14" width="16" height="14" rx="1.5" stroke="#AC033B" strokeWidth="1.5"/>
        <path d="M16 14v-2h8v2M16 20h2M22 20h2M16 24h2M22 24h2" stroke="#AC033B" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    href: '/story',
    links: [
      { label: 'Our Story', href: '/story' },
      { label: 'Mission & Vision', href: '/mission' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Careers', href: '/contact' },
      { label: 'News & Media', href: '/blog' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Private Label', href: '/private-label' },
    ],
    viewAll: '/story',
  },
  {
    key: 'global',
    label: 'GLOBAL NETWORK',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 mb-3">
        <circle cx="20" cy="20" r="19" stroke="#AC033B" strokeWidth="1.5" fill="#fff5f7"/>
        <circle cx="20" cy="20" r="8" stroke="#AC033B" strokeWidth="1.5"/>
        <path d="M20 12c-2 2-3 5-3 8s1 6 3 8M20 12c2 2 3 5 3 8s-1 6-3 8M12 20h16" stroke="#AC033B" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    href: '/global-network',
    links: [
      { label: 'West India', href: '/global-network' },
      { label: 'South India', href: '/global-network' },
      { label: 'North India', href: '/global-network' },
      { label: 'East India', href: '/global-network' },
      { label: 'Exports Worldwide', href: '/global-network' },
      { label: 'Logistics & Shipping', href: '/global-network' },
      { label: 'Events & Exhibitions', href: '/global-network' },
    ],
    viewAll: '/global-network',
  },
];

const topNavLinks = [
  { label: 'HOME', href: '/' },
  { label: 'OVERVIEW', hasDropdown: true },
  { label: 'OUR PRODUCTS', href: '/products', hasDropdown: true },
  { label: 'CATALOG', href: '/catalog' },
  { label: 'BLOG', href: '/blog' },
  { label: 'CONTACT US', href: '/contact' },
];

const mobileNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Technology', href: '/technology' },
  { label: 'Cryogenic Grinding', href: '/technology/cryogenic-grinding' },
  { label: 'Steam Sterilization', href: '/technology/steam-sterilization' },
  { label: 'CFG Science', href: '/technology/cfg-science' },
  { label: 'Quality Assurance', href: '/technology/quality-assurance' },
  { label: 'Infrastructure', href: '/technology/infrastructure' },
  { label: 'Process Flow', href: '/technology/process-flow' },
  { label: 'Products', href: '/products' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'Our Story', href: '/story' },
  { label: 'Mission', href: '/mission' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Global Network', href: '/global-network' },
  { label: 'Private Label', href: '/private-label' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsDropdownOpen(false), 300);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 backdrop-blur-xl border-b ${
          scrolled
            ? 'bg-black/80 border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
            : 'bg-black/40 border-white/5'
        }`}
      >
        {/* Main bar */}
        <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.png" alt="LV Spices" width={52} height={52} style={{ objectFit: 'contain' }} priority />
            <span className="text-[11px] font-bold tracking-[0.18em] text-[#AC033B] leading-tight hidden sm:block">
              LV SPICES
            </span>
          </Link>

          {/* Center nav links — desktop only */}
          <div className="hidden lg:flex items-center gap-1">
            {topNavLinks.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={item.hasDropdown ? handleMouseEnter : undefined}
                onMouseLeave={item.hasDropdown ? handleMouseLeave : undefined}
              >
                <Link
                  href={item.href || '#'}
                  onClick={(e) => { if (item.hasDropdown && !item.href) e.preventDefault(); }}
                  className={`flex items-center gap-1 px-4 py-2 text-[12px] font-bold tracking-wider transition-colors duration-200 rounded-md
                    ${isDropdownOpen && item.hasDropdown
                      ? 'text-[#AC033B]'
                      : 'text-white/70 hover:text-[#AC033B]'
                    }`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#AC033B]' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* CTA button — desktop */}
            <Link
              href="/contact"
              className="hidden lg:flex items-center gap-2 bg-[#AC033B] text-white text-[12px] font-bold tracking-wider px-6 py-3 rounded-full hover:bg-[#8e0231] transition-colors duration-300 shadow-md"
            >
              GET STARTED
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] rounded-md"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              <span
                style={{
                  display: 'block', width: 22, height: 2,
                  background: '#fff',
                  borderRadius: 2,
                  transition: 'transform 0.3s, opacity 0.3s',
                  transform: isMobileOpen ? 'translateY(8px) rotate(45deg)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block', width: 22, height: 2,
                  background: '#fff',
                  borderRadius: 2,
                  transition: 'opacity 0.2s',
                  opacity: isMobileOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block', width: 22, height: 2,
                  background: '#fff',
                  borderRadius: 2,
                  transition: 'transform 0.3s, opacity 0.3s',
                  transform: isMobileOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        {/* Mega Dropdown — desktop */}
        {isDropdownOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-black/80 backdrop-blur-2xl border-t border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-[1400px] mx-auto px-6 py-8">
              <div className="grid grid-cols-4 gap-8">
                {navColumns.map((col) => (
                  <div key={col.key}>
                    {col.icon}
                    <div className="mb-1">
                      <span className="text-[11px] font-black tracking-[0.2em] text-white/80 uppercase">
                        {col.label}
                      </span>
                      <div className="mt-1 w-8 h-[2px] bg-[#AC033B] rounded-full" />
                    </div>
                    <ul className="mt-3 space-y-2">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="flex items-center gap-2 text-[13px] text-white/60 hover:text-[#AC033B] transition-colors duration-200 group"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <svg className="w-3 h-3 text-white/30 group-hover:text-[#AC033B] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={col.viewAll}
                      className="inline-flex items-center gap-1.5 mt-4 text-[12px] font-bold text-[#AC033B] hover:gap-2.5 transition-all duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      View All
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          pointerEvents: isMobileOpen ? 'auto' : 'none',
        }}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            opacity: isMobileOpen ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Drawer panel */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 'min(320px, 90vw)',
            height: '100%',
            background: '#0a0a0a',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            transform: isMobileOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Image src="/logo.png" alt="LV Spices" width={36} height={36} style={{ objectFit: 'contain' }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#AC033B' }}>LV SPICES</span>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: 8, border: 'none', cursor: 'pointer' }}
              aria-label="Close menu"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <nav style={{ flex: 1, padding: '16px 0' }}>
            {mobileNavLinks.map((link, i) => (
              <Link
                key={link.href + i}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '13px 24px',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.75)',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#AC033B'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'; }}
              >
                {link.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4 }}>
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <Link
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: '#AC033B', color: '#fff',
                padding: '14px 24px', borderRadius: 999,
                fontSize: 13, fontWeight: 700, letterSpacing: '0.1em',
                textDecoration: 'none',
              }}
            >
              GET STARTED
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}


