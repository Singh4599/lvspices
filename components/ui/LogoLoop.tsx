'use client';

import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import './LogoLoop.css';

const SMOOTH_TAU = 0.25;
const MIN_COPIES = 2;
const COPY_HEADROOM = 2;

const toCssLength = (v: number | string | undefined) =>
  typeof v === 'number' ? `${v}px` : (v ?? undefined);

type LogoItemNode = { node: React.ReactNode; title?: string; ariaLabel?: string; href?: string };
type LogoItemImg  = { src: string; srcSet?: string; sizes?: string; width?: number; height?: number; alt?: string; title?: string; href?: string };
export type LogoItem = LogoItemNode | LogoItemImg;

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const LogoLoop = memo(({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = 'Partner logos',
  className,
  style,
}: LogoLoopProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const seqRef       = useRef<HTMLUListElement>(null);

  const [seqWidth,  setSeqWidth]  = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true)  return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === 'up' || direction === 'down';

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed);
    const dir = isVertical
      ? (direction === 'up' ? 1 : -1)
      : (direction === 'left' ? 1 : -1);
    return mag * dir * (speed < 0 ? -1 : 1);
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const containerW = containerRef.current?.clientWidth ?? 0;
    const rect = seqRef.current?.getBoundingClientRect?.();
    const sw = rect?.width ?? 0;
    const sh = rect?.height ?? 0;
    if (isVertical) {
      const ph = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && ph > 0) {
        const t = Math.ceil(ph);
        if (containerRef.current.style.height !== `${t}px`) containerRef.current.style.height = `${t}px`;
      }
      if (sh > 0) {
        setSeqHeight(Math.ceil(sh));
        const vp = containerRef.current?.clientHeight ?? ph ?? sh;
        setCopyCount(Math.max(MIN_COPIES, Math.ceil(vp / sh) + COPY_HEADROOM));
      }
    } else if (sw > 0) {
      setSeqWidth(Math.ceil(sw));
      setCopyCount(Math.max(MIN_COPIES, Math.ceil(containerW / sw) + COPY_HEADROOM));
    }
  }, [isVertical]);

  // Resize observer
  useEffect(() => {
    const els = [containerRef, seqRef];
    if (!window.ResizeObserver) {
      window.addEventListener('resize', updateDimensions);
      updateDimensions();
      return () => window.removeEventListener('resize', updateDimensions);
    }
    const observers = els.map(r => {
      if (!r.current) return null;
      const o = new ResizeObserver(updateDimensions);
      o.observe(r.current);
      return o;
    });
    updateDimensions();
    return () => observers.forEach(o => o?.disconnect());
  }, [updateDimensions, logos, gap, logoHeight, isVertical]);

  // Image load
  useEffect(() => {
    const imgs = seqRef.current?.querySelectorAll('img') ?? [];
    if (!imgs.length) { updateDimensions(); return; }
    let rem = imgs.length;
    const onL = () => { rem--; if (rem === 0) updateDimensions(); };
    imgs.forEach(img => {
      if ((img as HTMLImageElement).complete) onL();
      else { img.addEventListener('load', onL, { once: true }); img.addEventListener('error', onL, { once: true }); }
    });
    return () => imgs.forEach(img => { img.removeEventListener('load', onL); img.removeEventListener('error', onL); });
  }, [updateDimensions, logos, gap, logoHeight, isVertical]);

  // Animation loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const seqSize = isVertical ? seqHeight : seqWidth;
    if (seqSize > 0) {
      const off0 = ((0 % seqSize) + seqSize) % seqSize;
      track.style.transform = isVertical ? `translate3d(0,${-off0}px,0)` : `translate3d(${-off0}px,0,0)`;
    }
    let rafId: number | null = null;
    let lastTs: number | null = null;
    let offset = 0;
    let velocity = 0;

    const animate = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const dt = Math.max(0, ts - lastTs) / 1000;
      lastTs = ts;
      const target = isHovered && effectiveHoverSpeed !== undefined ? effectiveHoverSpeed : targetVelocity;
      const ease = 1 - Math.exp(-dt / SMOOTH_TAU);
      velocity += (target - velocity) * ease;
      if (seqSize > 0) {
        let next = offset + velocity * dt;
        next = ((next % seqSize) + seqSize) % seqSize;
        offset = next;
        track.style.transform = isVertical ? `translate3d(0,${-offset}px,0)` : `translate3d(${-offset}px,0,0)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => { if (rafId) cancelAnimationFrame(rafId); lastTs = null; };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical]);

  const cssVars = useMemo(() => ({
    '--logoloop-gap': `${gap}px`,
    '--logoloop-logoHeight': `${logoHeight}px`,
    ...(fadeOutColor ? { '--logoloop-fadeColor': fadeOutColor } : {}),
  } as React.CSSProperties), [gap, logoHeight, fadeOutColor]);

  const rootCls = useMemo(() =>
    ['logoloop', isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
      fadeOut && 'logoloop--fade', scaleOnHover && 'logoloop--scale-hover', className]
      .filter(Boolean).join(' '),
    [isVertical, fadeOut, scaleOnHover, className]);

  const onEnter = useCallback(() => { if (effectiveHoverSpeed !== undefined) setIsHovered(true); }, [effectiveHoverSpeed]);
  const onLeave = useCallback(() => { if (effectiveHoverSpeed !== undefined) setIsHovered(false); }, [effectiveHoverSpeed]);

  const renderLogoItem = useCallback((item: LogoItem, key: React.Key) => {
    if (renderItem) return <li className="logoloop__item" key={key} role="listitem">{renderItem(item, key)}</li>;
    const isNode = 'node' in item;
    const content = isNode
      ? <span className="logoloop__node" aria-hidden={!!(item as LogoItemNode).href}>{(item as LogoItemNode).node}</span>
      : <img src={(item as LogoItemImg).src} alt={(item as LogoItemImg).alt ?? ''} loading="lazy" decoding="async" draggable={false} />;
    const label = isNode ? (item as LogoItemNode).ariaLabel ?? (item as LogoItemNode).title : (item as LogoItemImg).alt ?? (item as LogoItemImg).title;
    const wrapped = (item as LogoItemNode | LogoItemImg).href
      ? <a className="logoloop__link" href={(item as any).href} aria-label={label ?? 'logo'} target="_blank" rel="noreferrer noopener">{content}</a>
      : content;
    return <li className="logoloop__item" key={key} role="listitem">{wrapped}</li>;
  }, [renderItem]);

  const lists = useMemo(() =>
    Array.from({ length: copyCount }, (_, ci) => (
      <ul className="logoloop__list" key={`c-${ci}`} role="list" aria-hidden={ci > 0} ref={ci === 0 ? seqRef : undefined}>
        {logos.map((item, ii) => renderLogoItem(item, `${ci}-${ii}`))}
      </ul>
    )), [copyCount, logos, renderLogoItem]);

  const containerStyle = useMemo(() => ({
    width: isVertical ? (toCssLength(width) === '100%' ? undefined : toCssLength(width)) : (toCssLength(width) ?? '100%'),
    ...cssVars,
    ...style,
  }), [width, cssVars, style, isVertical]);

  return (
    <div ref={containerRef} className={rootCls} style={containerStyle} role="region" aria-label={ariaLabel}>
      <div className="logoloop__track" ref={trackRef} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {lists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';
export default LogoLoop;
