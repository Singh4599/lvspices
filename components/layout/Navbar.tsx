'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ── Data ─────────────────────────────────────────────── */
const topBarLinks = [
  { label: 'Certifications', href: '/certifications' },
  { label: 'Quality Assurance', href: '/technology/quality-assurance' },
  { label: 'Private Label', href: '/private-label' },
  { label: 'E-Brochure', href: '/catalog' },
  { label: 'Contact Us', href: '/contact' },
];

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    children: [
      { label: 'Our Story', href: '/story' },
      { label: 'Mission & Vision', href: '/mission' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Global Network', href: '/global-network' },
    ],
  },
  {
    label: 'Technology',
    children: [
      { label: 'Overview', href: '/technology' },
      { label: 'Cryogenic Grinding', href: '/technology/cryogenic-grinding' },
      { label: 'Steam Sterilization', href: '/technology/steam-sterilization' },
      { label: 'CFG Science (R&D)', href: '/technology/cfg-science' },
      { label: 'Quality Control', href: '/technology/quality-assurance' },
      { label: 'Infrastructure', href: '/technology/infrastructure' },
      { label: 'Process Flow', href: '/technology/process-flow' },
    ],
  },
  {
    label: 'Products',
    children: [
      { label: 'All Products', href: '/products' },
      { label: 'Spices & Seasoning', href: '/products/spices-seasoning' },
      { label: 'Curry Powder', href: '/products/curry-powder' },
      { label: 'Snack Seasoning', href: '/products/snack-seasoning' },
      { label: 'Agri Products', href: '/products/agri-products' },
      { label: 'Organic', href: '/products/organic' },
      { label: 'Chilli Speciality', href: '/products/chilli-speciality' },
      { label: 'Dehydrated', href: '/products/dehydrated' },
      { label: 'Botanical Powders', href: '/products/botanical-powders' },
      { label: 'Herbal Teas', href: '/products/herbal-teas' },
      { label: 'Private Label', href: '/products/private-label' },
    ],
  },
  { label: 'Contact Us', href: '/contact' },
];

/* ── Dropdown (desktop) ───────────────────────────────── */
function NavDropdown({
  item, isOpen, onEnter, onLeave,
}: {
  item: NavItem;
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const hasChildren = !!item.children?.length;

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={hasChildren ? onEnter : undefined}
      onMouseLeave={hasChildren ? onLeave : undefined}
    >
      <Link
        href={item.href || '#'}
        onClick={e => { if (hasChildren && !item.href) e.preventDefault(); }}
        style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '6px 14px',
          fontSize: 14, fontWeight: 600,
          color: '#111',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          transition: 'color 0.18s',
        }}
        onMouseEnter={e => { if (!hasChildren) (e.currentTarget as HTMLElement).style.color = '#AC033B'; }}
        onMouseLeave={e => { if (!hasChildren) (e.currentTarget as HTMLElement).style.color = '#111'; }}
      >
        {item.label}
        {hasChildren && (
          <svg
            width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none', color: '#AC033B' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>

      {/* Dropdown panel */}
      {hasChildren && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          minWidth: 220,
          background: '#fff',
          boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
          borderTop: '2px solid #AC033B',
          borderRadius: '0 0 8px 8px',
          overflow: 'hidden',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 0.2s, transform 0.2s',
          zIndex: 1000,
        }}>
          {item.children!.map(child => (
            <Link
              key={child.href}
              href={child.href}
              style={{
                display: 'block',
                padding: '10px 18px',
                fontSize: 13.5,
                color: '#333',
                textDecoration: 'none',
                borderBottom: '1px solid #f2f2f2',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#fff5f7';
                (e.currentTarget as HTMLElement).style.color = '#AC033B';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#fff';
                (e.currentTarget as HTMLElement).style.color = '#333';
              }}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Mobile accordion item ────────────────────────────── */
function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!item.children?.length;

  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
      {hasChildren ? (
        <>
          <button
            onClick={() => setOpen(p => !p)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 24px', fontSize: 15, fontWeight: 600, color: '#111',
              background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
            }}
          >
            {item.label}
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#AC033B" strokeWidth="2.5"
              style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open && (
            <div style={{ background: '#fafafa', paddingBottom: 8 }}>
              {item.children!.map(child => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '11px 32px', fontSize: 13.5, color: '#444',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#AC033B', flexShrink: 0 }} />
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.href!}
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 24px', fontSize: 15, fontWeight: 600, color: '#111',
            textDecoration: 'none',
          }}
        >
          {item.label}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}

/* ── Main Navbar ──────────────────────────────────────── */
export default function Navbar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const handleEnter = useCallback((i: number) => {
    clearTimeout(timers.current[i]);
    setOpenIndex(i);
  }, []);

  const handleLeave = useCallback((i: number) => {
    timers.current[i] = setTimeout(() => setOpenIndex(prev => prev === i ? null : prev), 180);
  }, []);

  return (
    <>
      {/* ─── TOP UTILITY BAR ─────────────────────────── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10000,
        background: '#111', height: 36,
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      }}>
        <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
          {topBarLinks.map((link, i) => (
            <span key={link.href} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 2px', fontSize: 10 }}>|</span>}
              <Link
                href={link.href}
                style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', padding: '0 8px', letterSpacing: '0.04em', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </div>
      </div>

      {/* ─── MAIN NAVBAR ─────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 36, left: 0, right: 0, zIndex: 9999,
        background: '#fff',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(0,0,0,0.07)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.1)' : 'none',
        transition: 'box-shadow 0.3s, border-color 0.3s',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <Image src="/logo.png" alt="LV Spices" width={48} height={48} style={{ objectFit: 'contain' }} priority />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.08em', color: '#AC033B' }}>LV SPICES</div>
              <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.12em', color: '#888', textTransform: 'uppercase' }}>Since 1985</div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }} className="desktop-nav">
            {navItems.map((item, i) => (
              <NavDropdown
                key={item.label}
                item={item}
                isOpen={openIndex === i}
                onEnter={() => handleEnter(i)}
                onLeave={() => handleLeave(i)}
              />
            ))}
          </div>

          {/* Right: CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* CTA — desktop */}
            <Link
              href="/contact"
              className="desktop-nav"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#AC033B', color: '#fff',
                padding: '10px 22px', borderRadius: 999,
                fontSize: 12.5, fontWeight: 700, letterSpacing: '0.08em',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 12px rgba(172,3,59,0.25)',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#8e0231';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 18px rgba(172,3,59,0.4)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#AC033B';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(172,3,59,0.25)';
              }}
            >
              Get Quote
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Hamburger — mobile */}
            <button
              className="mobile-nav"
              onClick={() => setIsMobileOpen(p => !p)}
              aria-label="Toggle menu"
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                width: 40, height: 40, gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 22, height: 2, background: '#111', borderRadius: 2,
                  transition: 'transform 0.28s cubic-bezier(.5,0,.5,1), opacity 0.2s',
                  transform: isMobileOpen
                    ? i === 0 ? 'translateY(7px) rotate(45deg)'
                    : i === 1 ? 'scaleX(0)'
                    : 'translateY(-7px) rotate(-45deg)'
                    : 'none',
                  opacity: isMobileOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── MOBILE MENU ─────────────────────────────── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        pointerEvents: isMobileOpen ? 'auto' : 'none',
      }}>
        {/* Backdrop */}
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)',
            opacity: isMobileOpen ? 1 : 0, transition: 'opacity 0.3s',
          }}
        />

        {/* Drawer */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: 'min(340px, 88vw)', height: '100%',
          background: '#fff', overflowY: 'auto',
          transform: isMobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: '4px 0 32px rgba(0,0,0,0.15)',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Drawer header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 24px', borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#fff', flexShrink: 0,
          }}>
            <Link href="/" onClick={() => setIsMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <Image src="/logo.png" alt="LV Spices" width={38} height={38} style={{ objectFit: 'contain' }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: '#AC033B' }}>LV SPICES</div>
                <div style={{ fontSize: 9, color: '#aaa', letterSpacing: '0.08em' }}>SINCE 1985</div>
              </div>
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close"
              style={{
                width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#f5f5f5', borderRadius: 8, border: 'none', cursor: 'pointer',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {navItems.map(item => (
              <MobileNavItem key={item.label} item={item} onClose={() => setIsMobileOpen(false)} />
            ))}
          </div>

          {/* Quick links */}
          <div style={{ padding: '12px 16px', background: '#f8f8f8', borderTop: '1px solid rgba(0,0,0,0.06)', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {topBarLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  style={{
                    fontSize: 11, color: '#555', textDecoration: 'none', padding: '4px 10px',
                    background: '#eee', borderRadius: 999, letterSpacing: '0.03em',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: '#AC033B', color: '#fff', padding: '14px',
                borderRadius: 10, fontSize: 13.5, fontWeight: 700, letterSpacing: '0.06em',
                textDecoration: 'none',
              }}
            >
              Get a Free Quote
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-nav  { display: none  !important; }
        @media (max-width: 1024px) {
          .desktop-nav { display: none  !important; }
          .mobile-nav  { display: flex  !important; }
        }
      `}</style>
    </>
  );
}
