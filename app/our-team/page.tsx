'use client';

import { useState } from 'react';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import CurvedLoop from '@/components/ui/CurvedLoop';

const CR    = '#AC033B';
const INK   = '#1A1915';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

const FOUNDER = {
  name: 'Bhavik Karani',
  title: 'Chief Executive Officer (CEO)',
  initials: 'BK',
  quote: '"The biggest success is that you have contentment. Hopelessness is not allowed in our religion. You should be persistent. If you are constantly working towards some goal, the divine help is also there for you. If you don\'t have a goal unfortunately things would go bad for you."',
  bio: `Bhavik Karani is a leading Indian entrepreneur and philanthropist who is the Founder and Chairman of LV Spices. Mr. Bhavik is a Tenured Space Journey with a dream to Run Globally. He was the first entrepreneur in his family. He started his journey with a small company that produced hygienic, packaged high-recipe mixes and pure spices.

5 years later, Mr. Bhavik has established a company with a strong presence in over 70 countries across the globe. Today, LV Spices is the number one choice of consumers due to its premium quality and traditional authentic taste.`,
  accent: CR,
};

const TEAM = [
  { name: 'Nina Karani',    title: 'Head of International Sales',      initials: 'NK', accent: '#AC033B', dept: 'Sales' },
  { name: 'Hiren Shah',     title: 'Procurement Manager',              initials: 'HS', accent: '#1A5FAB', dept: 'Procurement' },
  { name: 'Parth Karani',   title: 'Business Development Manager',     initials: 'PK', accent: '#2E6B3E', dept: 'Business Dev' },
  { name: 'Mukesh Vora',    title: 'Operations Manager',               initials: 'MV', accent: '#7B4E1B', dept: 'Operations' },
  { name: 'Minakshi Rao',   title: 'Quality Control Manager',          initials: 'MR', accent: '#6B2A6B', dept: 'Quality' },
  { name: 'Vinod Singh',    title: 'Export Documentation Specialist',  initials: 'VS', accent: '#0A4D6E', dept: 'Export Docs' },
  { name: 'Vishal Seth',    title: 'Logistics Manager',                initials: 'VS', accent: '#1A7A4A', dept: 'Logistics' },
];

const VALUES = [
  { icon: '◉', label: 'Real Ingredients', desc: 'We only use 100% authentic and safe ingredients.' },
  { icon: '◈', label: 'No Artificial Colour', desc: 'There is no artificial colour added to our products.' },
  { icon: '✦', label: 'Real Flavour', desc: 'The flavour of our product is extracted and genuine.' },
];

const CSS = `
  @keyframes team-card-in {
    from { opacity:0; transform: translateY(30px) scale(0.96); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }
  @keyframes team-avatar-glow {
    0%, 100% { box-shadow: 0 0 0 0 currentColor; }
    50%       { box-shadow: 0 0 0 8px transparent; }
  }
  @keyframes founder-line {
    from { width: 0; }
    to   { width: 48px; }
  }
  @keyframes float-orb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(20px, -15px) scale(1.05); }
    66%       { transform: translate(-10px, 10px) scale(0.97); }
  }

  .team-card {
    border-radius: 20px;
    border: 1.5px solid rgba(0,0,0,0.07);
    background: #fff;
    overflow: hidden;
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s;
    cursor: default;
  }
  .team-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 60px rgba(0,0,0,0.1);
  }

  .team-avatar {
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; letter-spacing: -0.04em;
    position: relative;
  }

  .founder-section {
    display: flex; gap: clamp(40px,8vw,100px); align-items: flex-start;
  }

  @media (max-width: 800px) {
    .founder-section { flex-direction: column !important; }
    .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width: 500px) {
    .team-grid { grid-template-columns: 1fr !important; }
  }
`;

function InitialsAvatar({ initials, accent, size = 120, fontSize = 36 }: {
  initials: string; accent: string; size?: number; fontSize?: number;
}) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: SERIF, fontSize, fontWeight: 800, color: '#fff',
      letterSpacing: '-0.04em', boxShadow: `0 8px 32px ${accent}40`,
      position: 'relative',
    }}>
      {initials}
      {/* Subtle ring */}
      <div style={{
        position: 'absolute', inset: -6, borderRadius: '50%',
        border: `1.5px solid ${accent}30`,
      }}/>
    </div>
  );
}

export default function OurTeamPage() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: INK }}>
      <style>{CSS}</style>

      <TechTurbineHero badgeText="Our Team" marqueeText="OUR TEAM" />
      <VelocityMarquee dark />

      {/* ── INTRO ─────────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#FAFAF8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>
              LV Spices Team
            </div>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
              The People Behind<br /><em style={{ color: CR, fontStyle: 'italic' }}>Every Shipment</em>
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
              We at LV Spices treat everyone equally. We believe that our workforce is a family rather than employees. There is a lot of trust and belief in the product that we produce, which helps us deliver optimal output even during hard times.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── OUR FOUNDER ───────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        {/* BG orbs */}
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: `${CR}06`, animation: 'float-orb 8s ease-in-out infinite', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(0,0,0,0.02)', animation: 'float-orb 10s ease-in-out infinite 2s', pointerEvents: 'none' }}/>

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <ScrollReveal fromY={24} style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>Our Founder</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.05 }}>
              At LV Spices, we believe that the best work is born from a shared sense of vision, innovation, commitment &amp; communication.
            </h2>
          </ScrollReveal>

          <div className="founder-section">
            {/* Avatar */}
            <ScrollReveal fromY={30}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                <InitialsAvatar initials="BK" accent={CR} size={180} fontSize={56} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 800, color: INK, letterSpacing: '-0.02em' }}>{FOUNDER.name}</div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: CR, marginTop: 6 }}>{FOUNDER.title}</div>
                </div>
              </div>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal fromY={24} style={{ flex: 1 }}>
              {/* Quote */}
              <blockquote style={{
                fontFamily: SERIF, fontSize: 'clamp(15px,1.3vw,18px)', fontStyle: 'italic',
                color: 'rgba(0,0,0,0.65)', lineHeight: 1.7, margin: '0 0 32px',
                paddingLeft: 24, borderLeft: `3px solid ${CR}`,
              }}>
                {FOUNDER.quote}
              </blockquote>
              {/* Bio paragraphs */}
              {FOUNDER.bio.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(0,0,0,0.62)', lineHeight: 1.85, margin: '0 0 16px' }}>
                  {para}
                </p>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── TEAM GRID ─────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#111' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 14 }}>
              Executive Leadership
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: 0, lineHeight: 1.05 }}>
              Meet the<br /><em style={{ color: CR, fontStyle: 'italic' }}>Core Team</em>
            </h2>
          </ScrollReveal>

          <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {TEAM.map((member, i) => (
              <ScrollReveal key={member.name} fromY={30} style={{ animationDelay: `${i * 0.07}s` }}>
                <div
                  className="team-card"
                  style={{ background: 'rgba(255,255,255,0.04)', border: `1.5px solid ${hoveredMember === member.name ? member.accent : 'rgba(255,255,255,0.08)'}` }}
                  onMouseEnter={() => setHoveredMember(member.name)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  {/* Accent strip */}
                  <div style={{ height: 3, background: member.accent, opacity: hoveredMember === member.name ? 1 : 0.4, transition: 'opacity 0.2s' }}/>

                  <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
                    {/* Avatar */}
                    <div style={{
                      width: 80, height: 80, borderRadius: '50%',
                      background: `linear-gradient(135deg, ${member.accent} 0%, ${member.accent}cc 100%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: SERIF, fontSize: 24, fontWeight: 800, color: '#fff',
                      letterSpacing: '-0.04em',
                      boxShadow: hoveredMember === member.name ? `0 8px 32px ${member.accent}60` : `0 4px 16px ${member.accent}30`,
                      transition: 'box-shadow 0.3s',
                    }}>
                      {member.initials}
                    </div>

                    {/* Name + title */}
                    <div>
                      <div style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 6 }}>{member.name}</div>
                      <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: member.accent }}>{member.title}</div>
                    </div>

                    {/* Dept badge */}
                    <span style={{
                      fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999,
                      background: `${member.accent}20`, color: member.accent,
                    }}>
                      {member.dept}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WE GROW TOGETHER ──────────────────────────── */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: '#FAFAF8', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <ScrollReveal fromY={24}>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', marginBottom: 12 }}>
              We work together
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,5vw,72px)', fontWeight: 900, color: INK, letterSpacing: '-0.04em', margin: '0 0 24px', lineHeight: 1 }}>
              — WE GROW TOGETHER. —
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.85, marginBottom: 48 }}>
              Our entire chain from production to retail gets executed with utter loyalty, and we grow together, which makes it even better. We work together, we grow together — always at dolore magna aliqua.
            </p>
          </ScrollReveal>

          {/* Values trio */}
          <StaggerReveal stagger={0.12} style={{ display: 'flex', gap: 'clamp(20px,4vw,48px)', justifyContent: 'center', flexWrap: 'wrap' }}>
            {VALUES.map(v => (
              <div key={v.label} style={{ flex: 1, minWidth: 180, textAlign: 'center' }}>
                <div style={{ fontFamily: SERIF, fontSize: 32, color: CR, marginBottom: 12 }}>{v.icon}</div>
                <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK, marginBottom: 8 }}>{v.label}</div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.5)', lineHeight: 1.6 }}>{v.desc}</div>
              </div>
            ))}
          </StaggerReveal>

          <ScrollReveal fromY={20} style={{ marginTop: 56 }}>
            <a href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: CR, color: '#fff', fontFamily: SANS, fontWeight: 700, fontSize: 15,
              padding: '18px 40px', borderRadius: 999, textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: `0 8px 32px ${CR}40`,
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Get in Touch with Our Team →
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CURVED LOOP ──────────────────────────────────── */}
      <div style={{ position: 'relative', background: '#FAFAF8', paddingTop: 'clamp(40px,5vw,72px)', paddingBottom: 'clamp(80px,10vw,120px)' }}>
        <CurvedLoop
          marqueeText="FAMILY • TRUST • GROWTH • EXCELLENCE • OUR PEOPLE • INNOVATION • "
          speed={1.5} curveAmount={250}
          className="fill-[#111] uppercase font-mono tracking-widest"
        />
      </div>
    </main>
  );
}
