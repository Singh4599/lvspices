'use client';

import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import LabelRevealHero from '@/components/packaging/LabelRevealHero';
import PrivateLabelBlueprint from '@/components/packaging/PrivateLabelBlueprint';
import PrivateLabelProcessHorizontal from '@/components/packaging/PrivateLabelProcessHorizontal';
import PhoneContactForm from '@/components/packaging/PhoneContactForm';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';



const productCats = [
  { icon: '🌶️', name: 'Spices',         count: '150+ SKUs' },
  { icon: '🫘', name: 'Pulses',         count: '30+ SKUs'  },
  { icon: '🌾', name: 'Flours',         count: '20+ SKUs'  },
  { icon: '🍚', name: 'Rice',           count: '15+ SKUs'  },
  { icon: '🍿', name: 'Snacks',         count: '40+ SKUs'  },
  { icon: '🧄', name: 'Masalas',        count: '80+ SKUs'  },
  { icon: '🍵', name: 'Tea & Beverages', count: '20+ SKUs' },
];

export default function PrivateLabelPage() {

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111', overflowX: 'hidden' }}>

      {/* ══ LABEL REVEAL HERO ══════════════════════════════════════ */}
      <LabelRevealHero />

      {/* ══ VELOCITY MARQUEE ════════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ BLUEPRINT SVG FEATURES ═══════════════════════════════════ */}
      <PrivateLabelBlueprint />

      {/* ══ HOW IT WORKS ════════════════════════════════════════ */}
      <PrivateLabelProcessHorizontal />


      {/* ══ CONTACT & CTA SECTION (Side-by-side) ══════════════════════════════════════════ */}
      <div style={{ display: 'flex', flexWrap: 'wrap', background: '#F8F6F1' }}>
        
        {/* Left Side: Curved Loop */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 'clamp(60px,10vw,120px) 24px', overflow: 'hidden' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CurvedLoop marqueeText="PRIVATE LABELLING • CUSTOM PACKAGING • YOUR BRAND • 500+ PRODUCTS • " speed={1.5} curveAmount={200} className="fill-[#111] uppercase font-mono tracking-widest" />
            <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
              <text style={{ fontSize: 'clamp(24px,3.5vw,48px)', fontFamily: 'var(--font-display)', color: CRIMSON, fontWeight: 800 }}>LV</text>
              <text style={{ fontSize: 'clamp(8px,1vw,12px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</text>
            </div>
          </div>
        </div>

        {/* Right Side: Phone Contact Form */}
        <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'clamp(60px,10vw,120px) 24px', position: 'relative', zIndex: 10 }}>
          <PhoneContactForm />
        </div>

      </div>

    </main>
  );
}
