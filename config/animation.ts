export const animationConfig = {
  duration: {
    instant: 0.1,
    fast: 0.3,
    normal: 0.6,
    slow: 0.8,
    slower: 1.2,
    slowest: 1.8,
  },
  ease: {
    smooth: 'power3.out',
    smoothInOut: 'power3.inOut',
    expo: 'expo.out',
    expoInOut: 'expo.inOut',
    circ: 'circ.out',
    back: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.3)',
  },
  stagger: {
    fast: 0.02,
    normal: 0.04,
    slow: 0.06,
    text: 0.03,
  },
  scroll: {
    triggerStart: 'top 85%',
    triggerEnd: 'bottom 15%',
    pinSpacing: true,
  },
  reveal: {
    y: 40,
    opacity: 0,
    duration: 0.8,
  },
  magnetic: {
    radius: 80,
    strength: 0.3,
    ease: 0.2,
  },
} as const;

export type AnimationConfig = typeof animationConfig;
