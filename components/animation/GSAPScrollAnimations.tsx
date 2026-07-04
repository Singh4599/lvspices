'use client';
import { useEffect } from 'react';

/**
 * GSAPScrollAnimations
 * Runs once on mount and wires up all scroll-driven animations site-wide.
 * No JSX — pure side effect.
 */
export default function GSAPScrollAnimations() {
  useEffect(() => {
    let cleanup: (() => void) | null = null;

    // Small delay so Lenis + DOM are ready
    const timer = setTimeout(() => {
      import('@/lib/gsap').then(({ gsap, ScrollTrigger }) => {

      // ── 1. Fade + rise — every [data-gsap="fade-up"] ─────────────────
      gsap.utils.toArray<HTMLElement>('[data-gsap="fade-up"]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── 2. Fade + rise — [data-gsap="split"] ──────────────────────
      gsap.utils.toArray<HTMLElement>('[data-gsap="split"]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── 2b. Fade reveal — [data-gsap="scroll-reveal"] ───────────────
      gsap.utils.toArray<HTMLElement>('[data-gsap="scroll-reveal"]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            duration: 0.9,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── 3. Scale reveal — [data-gsap="scale"] ──────────────────────
      gsap.utils.toArray<HTMLElement>('[data-gsap="scale"]').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.88, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── 4. Clip-path curtain reveal — [data-gsap="curtain"] ────────
      gsap.utils.toArray<HTMLElement>('[data-gsap="curtain"]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── 5. Stagger children — [data-gsap="stagger"] ────────────────
      gsap.utils.toArray<HTMLElement>('[data-gsap="stagger"]').forEach((el) => {
        const children = el.children;
        gsap.fromTo(
          children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── 6. Horizontal line reveal — [data-gsap="line"] ─────────────
      gsap.utils.toArray<HTMLElement>('[data-gsap="line"]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── 7. Parallax sections — [data-gsap="parallax"] ──────────────
      gsap.utils.toArray<HTMLElement>('[data-gsap="parallax"]').forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0.15');
        gsap.to(el, {
          yPercent: -speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // ── 8. Counter number animation — [data-gsap="counter"] ────────
      gsap.utils.toArray<HTMLElement>('[data-gsap="counter"]').forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = Math.round(obj.val).toString();
              },
            });
          },
        });
      });

      // ── 9. Section PIN — [data-gsap="pin"] ─────────────────────────
      // The section sticks while inner content animates
      gsap.utils.toArray<HTMLElement>('[data-gsap="pin"]').forEach((section) => {
        const inner = section.querySelector<HTMLElement>('[data-gsap="pin-inner"]');
        if (!inner) return;

        const items = inner.querySelectorAll<HTMLElement>('[data-gsap="pin-item"]');
        if (!items.length) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${items.length * 80}vh`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        items.forEach((item, i) => {
          if (i === 0) return; // first already visible
          tl.fromTo(
            item,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1, ease: 'power2.inOut' }
          );
        });
      });

      // ── 10. Skew on scroll ──────────────────────────────────────────
      let skewActive = false;
      const proxy = { skew: 0 };

      const skewSetter = gsap.quickSetter('[data-gsap="skew-on-scroll"]', 'skewY', 'deg');
      const clamp = gsap.utils.clamp(-4, 4);

      ScrollTrigger.create({
        onUpdate: (self) => {
          const vel = clamp(self.getVelocity() / 200);
          if (Math.abs(vel) > Math.abs(proxy.skew)) {
            proxy.skew = vel;
            if (!skewActive) {
              skewActive = true;
              gsap.to(proxy, {
                skew: 0,
                duration: 0.6,
                ease: 'power3',
                overwrite: true,
                onUpdate: () => skewSetter(proxy.skew),
                onComplete: () => { skewActive = false; },
              });
            }
          }
        },
      });

      // ── 11. Horizontal scroll track ─────────────────────────────────
      const hTrack = document.querySelector<HTMLElement>('[data-gsap="h-scroll"]');
      if (hTrack) {
        const hItems = hTrack.querySelector<HTMLElement>('[data-gsap="h-scroll-inner"]');
        if (hItems) {
          const scrollAmt = hItems.scrollWidth - hTrack.offsetWidth;
          gsap.to(hItems, {
            x: -scrollAmt,
            ease: 'none',
            scrollTrigger: {
              trigger: hTrack,
              start: 'top top',
              end: `+=${scrollAmt}`,
              scrub: 1.2,
              pin: true,
              anticipatePin: 1,
            },
          });
        }
      }

        ScrollTrigger.refresh();
        cleanup = () => { /* no-op: GSAP cleans up its own ScrollTriggers on page unload */ };
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      cleanup?.();
    };
  }, []);

  return null;
}
