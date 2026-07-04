'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  titleTheme?: 'split' | 'all-red' | 'all-dark';
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  subtitle,
  description,
  scrollToExpand = 'Scroll to explore',
  textBlend,
  titleTheme = 'split',
  children,
}: ScrollExpandMediaProps) => {
  // scrollProgress: 0 = small video in center, 1 = fully expanded fullscreen
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedVideo = useRef(false);
  const progressRef = useRef(0);
  const expandedRef = useRef(false);
  const touchStartYRef = useRef(0);

  useEffect(() => { progressRef.current = scrollProgress; }, [scrollProgress]);
  useEffect(() => { expandedRef.current = mediaFullyExpanded; }, [mediaFullyExpanded]);

  // Lock body scroll while video is expanding
  useEffect(() => {
    if (!mediaFullyExpanded) {
      // Lock the page
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      // Unlock the page
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [mediaFullyExpanded]);

  // Mobile check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Main scroll handler
  useEffect(() => {
    const applyDelta = (delta: number) => {
      // Start video on first scroll
      if (!hasStartedVideo.current && videoRef.current) {
        videoRef.current.play().catch(() => {});
        hasStartedVideo.current = true;
      }

      if (expandedRef.current) {
        // If we are at the top of the page and scrolling up, we un-expand and start shrinking
        if (delta < 0 && window.scrollY <= 5) {
          setMediaFullyExpanded(false);
          expandedRef.current = false;
          
          // Apply the first shrink delta immediately
          const step = delta * 0.0009;
          const next = Math.max(progressRef.current + step, 0);
          progressRef.current = next;
          setScrollProgress(next);
        }
        return; // Otherwise let the normal page scroll happen
      }

      const step = delta * 0.0009;
      const next = Math.min(Math.max(progressRef.current + step, 0), 1);
      progressRef.current = next;
      setScrollProgress(next);

      if (next >= 1) {
        setMediaFullyExpanded(true);
        expandedRef.current = true;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!expandedRef.current) {
        e.preventDefault();
        applyDelta(e.deltaY);
      } else if (e.deltaY < 0 && window.scrollY <= 5) {
        e.preventDefault();
        applyDelta(e.deltaY);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchStartYRef.current) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;

      if (!expandedRef.current) {
        e.preventDefault();
        applyDelta(deltaY * 5);
      } else if (deltaY < 0 && window.scrollY <= 5) {
        e.preventDefault();
        applyDelta(deltaY * 5);
      }
      touchStartYRef.current = touchY;
    };

    const onTouchEnd = () => { touchStartYRef.current = 0; };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // ── Computed values ───────────────────────────────────────────────
  // On mobile, start square (260x260) and expand to a landscape shape so the video isn't heavily cropped
  const mediaWidth  = (isMobile ? 260 : 300) + scrollProgress * (isMobile ? 800 : 1250);
  const mediaHeight = (isMobile ? 260 : 400) + scrollProgress * (isMobile ? 40 : 400);
  const textTranslateX = scrollProgress * (isMobile ? 180 : 150);

  const firstWord   = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  // Dynamic font sizing — each word independently sized, shared height so both look equal
  const getVw = (text: string) => {
    const len = text.length;
    if (len <= 3) return 9;      // CFG
    if (len <= 5) return 7.5;    // FLOW, STEAM, TECH
    if (len <= 7) return 6.5;    // PROCESS, SCIENCE
    if (len <= 9) return 5.5;    // OVERVIEW, GRINDING, CRYOGENIC
    if (len <= 11) return 4.8;   // ASSURANCE, PRESSURIZED
    if (len <= 13) return 4.2;   // STERILIZATION, MANUFACTURING
    return 3.5;                  // INFRASTRUCTURE (14+)
  };
  // Use the SMALLER of the two so both words fit — short words use letter-spacing to fill width
  const titleVw = Math.min(getVw(firstWord), getVw(restOfTitle));

  return (
    <div className="transition-colors duration-700 ease-in-out" style={{ overflowX: 'clip' }}>
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* ── Background image — fades out as video expands ──────── */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.05 }}
            style={{ backgroundColor: bgImageSrc ? 'transparent' : '#ffffff' }}
          >
            {bgImageSrc && (
              <>
                <Image
                  src={bgImageSrc}
                  alt="Background"
                  width={1920}
                  height={1080}
                  className="w-screen h-screen"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  priority
                />
                <div className="absolute inset-0 bg-black/20" />
              </>
            )}
          </motion.div>

          <div className="w-full flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* ── Expanding video window ────────────────────────────── */}
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '98vw',
                  maxHeight: '90vh',
                  boxShadow: scrollProgress > 0 ? '0px 0px 80px rgba(0, 0, 0, 0.4)' : 'none',
                  transition: 'none',
                }}
              >
                {mediaType === 'video' ? (
                  <div className="relative w-full h-full pointer-events-none">
                    <video
                      ref={videoRef}
                      src={mediaSrc}
                      poster={posterSrc}
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover rounded-xl"
                      disablePictureInPicture
                    />
                    <div className="absolute inset-0 z-10" style={{ pointerEvents: 'none' }} />
                    <motion.div
                      className="absolute inset-0 bg-black/30 rounded-xl"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 0.5 - scrollProgress * 0.4 }}
                      transition={{ duration: 0.05 }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media'}
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/50 rounded-xl"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.05 }}
                    />
                  </div>
                )}

                {/* Scroll hint below video */}
                <div className="flex flex-col items-center text-center relative z-10 mt-4" style={{ transition: 'none' }}>
                  {scrollToExpand && (
                    <p
                      className="text-white/50 font-mono text-xs tracking-[0.25em] uppercase flex items-center gap-2"
                      style={{
                        transform: `translateX(${textTranslateX}vw)`,
                        opacity: Math.max(0, 1 - scrollProgress * 3),
                        transition: 'none',
                      }}
                    >
                      <span className="animate-bounce">↓</span>
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* ── Title: responsive layout ──────────────────────────── */}
              {title && (
                isMobile ? (
                  /* MOBILE: word above and below the video */
                  <>
                    <div
                      style={{
                        position: 'absolute',
                        top: `calc(50% - ${mediaHeight / 2}px - 44px)`,
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        zIndex: 20,
                        pointerEvents: 'none',
                        transition: 'none',
                        transform: `translateY(-${scrollProgress * 60}px)`,
                      }}
                    >
                      <h1
                        className={`font-display font-bold uppercase ${titleTheme === 'all-red' ? 'text-[#AC033B]' : 'text-slate-900'}`}
                        style={{
                          fontSize: `clamp(1.8rem, ${restOfTitle.length <= 5 ? 13 : restOfTitle.length <= 9 ? 10 : 7}vw, 5rem)`,
                          letterSpacing: firstWord.length <= 3 ? '0.25em' : '-0.04em',
                          lineHeight: 0.95,
                          whiteSpace: 'nowrap',
                          transition: 'none',
                        }}
                      >
                        {firstWord}
                      </h1>
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        top: `calc(50% + ${mediaHeight / 2}px + 2px)`,
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        zIndex: 20,
                        pointerEvents: 'none',
                        transition: 'none',
                        transform: `translateY(${scrollProgress * 60}px)`,
                      }}
                    >
                      <h1
                        className={
                          titleTheme === 'all-red' ? 'font-display font-bold text-[#AC033B] uppercase'
                          : titleTheme === 'all-dark' ? 'font-display font-bold text-slate-900 uppercase'
                          : 'font-serif italic font-bold text-[#AC033B] uppercase'
                        }
                        style={{
                          fontSize: `clamp(1.8rem, ${restOfTitle.length <= 5 ? 13 : restOfTitle.length <= 9 ? 10 : 7}vw, 5rem)`,
                          letterSpacing: (titleTheme === 'all-red' || titleTheme === 'all-dark') ? '-0.04em' : '-0.02em',
                          lineHeight: 0.95,
                          whiteSpace: 'nowrap',
                          transition: 'none',
                        }}
                      >
                        {restOfTitle}
                      </h1>
                    </div>

                    {/* Mobile sub heading — shows below bottom word, fades on scroll */}
                    {description && (
                      <div
                        style={{
                          position: 'absolute',
                          top: `calc(50% + ${mediaHeight / 2}px + 68px)`,
                          left: '24px',
                          right: '24px',
                          display: 'flex',
                          justifyContent: 'center',
                          zIndex: 20,
                          pointerEvents: 'none',
                          transition: 'none',
                          opacity: Math.max(0, 1 - scrollProgress * 4),
                          transform: `translateY(${scrollProgress * 40}px)`,
                        }}
                      >
                        <p
                          className="text-slate-500 text-center leading-relaxed"
                          style={{ fontSize: '13px', maxWidth: '300px' }}
                        >
                          {description}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  /* DESKTOP: flex row with video-width spacer */
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      right: 0,
                      transform: 'translateY(-50%)',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      zIndex: 20,
                      pointerEvents: 'none',
                      transition: 'none',
                    }}
                  >
                    {/* LEFT word — right-aligned, slides left on scroll */}
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'flex-end', paddingRight: '24px', transition: 'none', overflow: 'visible' }}>
                      <h1
                        className={`font-display font-bold uppercase ${titleTheme === 'all-red' ? 'text-[#AC033B]' : 'text-slate-900'}`}
                        style={{
                          fontSize: `clamp(2rem, ${titleVw}vw, 10rem)`,
                          letterSpacing: firstWord.length <= 3 ? '0.25em' : '-0.04em',
                          lineHeight: 0.95,
                          whiteSpace: 'nowrap',
                          transform: `translateX(-${scrollProgress * 120}px)`,
                          transition: 'none',
                        }}
                      >
                        {firstWord}
                      </h1>
                    </div>

                    {/* Invisible spacer — exact width of the video frame */}
                    <div style={{ width: `${mediaWidth}px`, flexShrink: 0, transition: 'none' }} />

                    {/* RIGHT word — left-aligned, slides right on scroll */}
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'flex-start', paddingLeft: '24px', transition: 'none', overflow: 'visible' }}>
                      <h1
                        className={
                          titleTheme === 'all-red' ? 'font-display font-bold text-[#AC033B] uppercase'
                          : titleTheme === 'all-dark' ? 'font-display font-bold text-slate-900 uppercase'
                          : 'font-serif italic font-bold text-[#AC033B] uppercase'
                        }
                        style={{
                          fontSize: `clamp(2rem, ${titleVw}vw, 10rem)`,
                          letterSpacing: (titleTheme === 'all-red' || titleTheme === 'all-dark') ? '-0.04em' : '-0.02em',
                          lineHeight: 0.95,
                          whiteSpace: 'nowrap',
                          transform: `translateX(${scrollProgress * 120}px)`,
                          transition: 'none',
                        }}
                      >
                        {restOfTitle}
                      </h1>
                    </div>
                  </div>
                )
              )}

              {/* Subtitle — below heading, above description */}
              {subtitle && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '116px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    opacity: Math.max(0, 1 - scrollProgress * 3),
                    transition: 'none',
                    textAlign: 'center',
                  }}
                >
                  <p className="font-mono uppercase text-[#AC033B] tracking-widest" style={{ fontSize: '13px' }}>
                    {subtitle}
                  </p>
                </div>
              )}

              {/* Description */}
              {description && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '72px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    opacity: Math.max(0, 1 - scrollProgress * 3),
                    transition: 'none',
                    textAlign: 'center',
                    width: 'min(500px, 90vw)',
                  }}
                >
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {description}
                  </p>
                </div>
              )}
            </div>

            {/* ── Page content — revealed after full expansion ────────── */}
            <motion.div
              className="flex flex-col w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: mediaFullyExpanded ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
