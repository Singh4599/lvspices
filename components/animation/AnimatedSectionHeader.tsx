'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface AnimatedSectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  center?: boolean;
}

/**
 * AnimatedSectionHeader — replaces all the repetitive static section-heading blocks.
 * Eyebrow line draws in from left.
 * Title fades up with stagger.
 * Description fades in last.
 */
export function AnimatedSectionHeader({
  eyebrow,
  title,
  description,
  center = true,
}: AnimatedSectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: center ? 'center' : 'flex-start',
        textAlign: center ? 'center' : 'left',
        marginBottom: '72px',
      }}
    >
      {eyebrow && (
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}
        >
          <motion.div
            initial={reduced ? false : { scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ width: '40px', height: '1px', background: '#AC033B', transformOrigin: 'left' }}
          />
          <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>
            {eyebrow}
          </span>
          {center && (
            <motion.div
              initial={reduced ? false : { scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              style={{ width: '40px', height: '1px', background: '#AC033B', transformOrigin: 'right' }}
            />
          )}
        </motion.div>
      )}

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: 'easeOut' as const, delay: 0.15 }}
        className="font-display font-bold text-white"
        style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: description ? '20px' : 0 }}
      >
        {title}
      </motion.div>

      {description && (
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          className="text-white/45 leading-relaxed"
          style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)', maxWidth: '600px' }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
