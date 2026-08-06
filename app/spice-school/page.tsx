'use client';

import { useState } from 'react';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import CurvedLoop from '@/components/ui/CurvedLoop';

const CR    = '#AC033B';
const INK   = '#1A1915';
const GOLD  = '#7B4E1B';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

export const LESSONS = [
  {
    n: 1, name: 'Black Pepper', emoji: '⚫', color: '#2C3E50',
    tag: 'Pepper',
    desc: 'Peppers are actually a tiny fruit that has the shape of a flowering climbing vine known as a spice pepper. A source of capsaicin native to its natural environment and is abundant in South and Southeast Asia.',
  },
  {
    n: 2, name: 'Paprika', emoji: '🫑', color: '#C0392B',
    tag: 'Pepper',
    desc: 'Paprika is a ground spice made from dried and fresh of the pepper and comes from the fruit of the sweet Capsicum annuum, called bell pepper or sweet pepper.',
  },
  {
    n: 3, name: 'Cardamom', emoji: '🫙', color: '#1A6B3E',
    tag: 'Seed',
    desc: 'Cardamom is a spice that comes from the seeds of various plants in the ginger family. This spice is native to Southern India, and is also grown across the Tropics.',
  },
  {
    n: 4, name: 'Garlic', emoji: '🧄', color: '#8B4513',
    tag: 'Allium',
    desc: 'Garlic is a species in the onion genus Allium and is native to Central Asia. It has been used throughout its history in both cook, both food and also shows.',
  },
  {
    n: 5, name: 'Turmeric', emoji: '💛', color: '#F9A825',
    tag: 'Root',
    desc: 'Turmeric is a rhizomatous herbaceous perennial plant and member of the ginger family, native to Southeast Asia and found in great amounts of South Asia.',
  },
  {
    n: 6, name: 'Onion', emoji: '🧅', color: '#A0522D',
    tag: 'Allium',
    desc: 'Many consider this, unknown and bad between bad between ones more — what Parisians taste inspired to collect their flavour from their deep-sea water farm which their city has very recently been known for.',
  },
  {
    n: 7, name: 'Chili Pepper', emoji: '🌶', color: '#C0392B',
    tag: 'Pepper',
    desc: 'Chili pepper is a perennial and a piece of flowering plants in the nightshade family, Solanaceae, which is native to tropical Americas.',
  },
  {
    n: 8, name: 'Cumin', emoji: '🌾', color: '#795548',
    tag: 'Seed',
    desc: 'Cumin is a member in the East origins of Asia. It is a small, flowering herb belonging to the Apiaceae family of the genus Cuminum.',
  },
  {
    n: 9, name: 'Ginger', emoji: '🫚', color: '#F57F17',
    tag: 'Root',
    desc: 'Ginger is a flowering plant that traces proper back to Southeast Asia. It belongs to the Zingiberaceae family and is closely related to turmeric, cardamom, and galangal.',
  },
  {
    n: 10, name: 'Nutmeg', emoji: '🫀', color: '#6D4C41',
    tag: 'Seed',
    desc: 'Nutmeg is the seed or ground spice of several species of the genus Myristica. It is the most common species in the flavour, a type of spice of Malabar.',
  },
  {
    n: 11, name: 'Red Pepper', emoji: '🔴', color: '#E53935',
    tag: 'Pepper',
    desc: 'Red pepper belongs to the family Solanaceae and is made from the dried harvest of plants from the family Capsicum annuum.',
  },
  {
    n: 12, name: 'Cinnamon', emoji: '🌰', color: '#8B4513',
    tag: 'Bark',
    desc: 'Cinnamon comes from the inner bark of several tree species from the family called Cinnamomum.',
  },
  {
    n: 13, name: 'White Pepper', emoji: '⚪', color: '#9E9E9E',
    tag: 'Pepper',
    desc: 'White pepper is native to Southeast Asia and is made from the same source as black pepper — fully ripened berries with the outer skin removed.',
  },
  {
    n: 14, name: 'Ancho Pepper', emoji: '🫑', color: '#4E342E',
    tag: 'Pepper',
    desc: 'Ancho pepper is native to Puebla, Mexico and ancestors of the sweet pepper Capsicum.',
  },
  {
    n: 15, name: 'Coriander', emoji: '🌿', color: '#388E3C',
    tag: 'Seed',
    desc: 'Coriander comes from the parsley-set software plant and is native to the Mediterranean and Middle East areas.',
  },
  {
    n: 16, name: 'Oregano', emoji: '🌱', color: '#2E7D32',
    tag: 'Herb',
    desc: 'Oregano is a perennial herb that belongs to the mint family, Lamiaceae.',
  },
  {
    n: 17, name: 'Guajillo', emoji: '🫑', color: '#B71C1C',
    tag: 'Pepper',
    desc: 'Guajillo is the dried form of the mirasol pepper, a chilli variety of the species Capsicum annuum shrub.',
  },
  {
    n: 18, name: 'Cassia', emoji: '🌰', color: '#6D4C41',
    tag: 'Bark',
    desc: 'Cassia originates from Southern China and is a member of the cinnamon family.',
  },
  {
    n: 19, name: 'Chili Powder', emoji: '🌶', color: '#D32F2F',
    tag: 'Blend',
    desc: 'Chili powder is a blend of dried chilies from a usually combined chili fruits seeds and spices, such as oregano, cumin, and curries used.',
  },
  {
    n: 20, name: 'Curry Powder', emoji: '🫙', color: '#F57F17',
    tag: 'Blend',
    desc: 'Curry powder is a complex spice blend that belongs to the flavour in India. The blend has its bright golden colour which comes from turmeric.',
  },
  {
    n: 21, name: 'Cayenne', emoji: '🔥', color: '#E53935',
    tag: 'Pepper',
    desc: 'Cayenne peppers belong to the nightshade family Solanaceae. It is a cultivar of Capsicum annuum and is related to bell peppers, jalapeños, paprika.',
  },
  {
    n: 22, name: 'Marjoram', emoji: '🌿', color: '#388E3C',
    tag: 'Herb',
    desc: 'Marjoram is a fragrant, aromatic perennial herb that looking to the mint family Lamiaceae. It is related to both oregano and is native to temperate French Grains.',
  },
];

const TAGS = ['All', 'Pepper', 'Seed', 'Root', 'Bark', 'Herb', 'Allium', 'Blend'];

const TAG_COLORS: Record<string, string> = {
  'Pepper': '#C0392B',
  'Seed': '#795548',
  'Root': '#F57F17',
  'Bark': '#6D4C41',
  'Herb': '#388E3C',
  'Allium': '#8B4513',
  'Blend': '#7B4E1B',
};

const CSS = `
  @keyframes lesson-in {
    from { opacity:0; transform: translateY(20px) scale(0.97); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }
  @keyframes lesson-glow {
    0%,100% { box-shadow: 0 0 0 0 rgba(172,3,59,0); }
    50%      { box-shadow: 0 0 0 6px rgba(172,3,59,0.1); }
  }
  @keyframes lesson-tag-pulse {
    0%,100% { opacity:1; }
    50%      { opacity:0.7; }
  }

  .lesson-card {
    display: flex; gap: 16px; align-items: flex-start;
    padding: 20px 24px;
    background: #fff;
    border: 1.5px solid rgba(0,0,0,0.07);
    border-radius: 14px;
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s, border-color 0.25s;
    cursor: default;
  }
  .lesson-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.08);
  }

  .lesson-num {
    font-family: var(--font-mono);
    font-size: 10px; font-weight: 700;
    color: rgba(0,0,0,0.2);
    min-width: 24px; padding-top: 3px;
    transition: color 0.2s;
  }
  .lesson-card:hover .lesson-num { color: rgba(0,0,0,0.5); }

  .lesson-emoji-wrap {
    width: 48px; height: 48px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; flex-shrink: 0;
    transition: transform 0.3s;
  }
  .lesson-card:hover .lesson-emoji-wrap { transform: scale(1.15) rotate(-5deg); }

  .lesson-tag {
    display: inline-block; padding: 2px 10px; border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 8px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  }

  .filter-pill {
    padding: 7px 18px; border-radius: 999px;
    font-family: var(--font-mono); font-size: 10px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    border: 1.5px solid rgba(0,0,0,0.1);
    background: none; cursor: pointer;
    transition: all 0.2s; color: rgba(0,0,0,0.5);
  }
  .filter-pill.active { background: #AC033B; border-color: #AC033B; color: #fff; }
  .filter-pill:hover:not(.active) { border-color: #AC033B; color: #AC033B; }

  @media (max-width: 600px) {
    .ss-lesson-grid { grid-template-columns: 1fr !important; }
  }
`;

export default function SpiceSchoolPage() {
  const [activeTag, setActiveTag] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = LESSONS.filter(l => {
    const matchTag = activeTag === 'All' || l.tag === activeTag;
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: INK }}>
      <style>{CSS}</style>

      <TechTurbineHero badgeText="Spice School" marqueeText="SPICE SCHOOL" />
      <VelocityMarquee dark />

      {/* ── INTRO ─────────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#FAFAF8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>
              Spice Academy
            </div>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
              Learn About<br /><em style={{ color: CR, fontStyle: 'italic' }}>Every Spice</em>
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', maxWidth: 620, margin: '0 auto 32px', lineHeight: 1.8 }}>
              Top organisations are always learning, and our team wholeheartedly agrees with this philosophy. We believe that class is always in session. To continue to help your business in offering outstanding food products and services, we are bringing you an in-home spice facts. Our experts can help you get the best of each ingredient. Spice facts are available in inventory reports, and if you become an email subscriber, we deliver them to your inbox.
            </p>

            {/* Search */}
            <div style={{ position: 'relative', maxWidth: 400, margin: '0 auto' }}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search spices..."
                style={{
                  width: '100%', padding: '14px 20px 14px 44px',
                  borderRadius: 999, border: '1.5px solid rgba(0,0,0,0.1)',
                  fontFamily: SANS, fontSize: 14, outline: 'none',
                  background: '#fff', color: INK,
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = CR}
                onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
              />
              <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="7.5" cy="7.5" r="5.5" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
                <path d="M12 12l3.5 3.5" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </ScrollReveal>

          {/* Filter tags */}
          <ScrollReveal fromY={16} style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {TAGS.map(tag => (
                <button
                  key={tag}
                  className={`filter-pill ${activeTag === tag ? 'active' : ''}`}
                  onClick={() => setActiveTag(tag)}
                  style={activeTag === tag ? {} : { color: TAG_COLORS[tag] || 'rgba(0,0,0,0.5)', borderColor: `${TAG_COLORS[tag] || 'rgba(0,0,0,0.1)'}40` }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Count */}
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: 'rgba(0,0,0,0.3)', textAlign: 'center', marginBottom: 32 }}>
            {filtered.length} lesson{filtered.length !== 1 ? 's' : ''}
          </div>

          {/* Lessons list */}
          <div className="ss-lesson-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {filtered.map((lesson, i) => (
              <ScrollReveal key={lesson.n} fromY={16} style={{ animationDelay: `${(i % 6) * 0.05}s` }}>
                <div
                  className="lesson-card"
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = lesson.color}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.07)'}
                >
                  {/* Number */}
                  <span className="lesson-num">{String(lesson.n).padStart(2, '0')}</span>

                  {/* Emoji */}
                  <div className="lesson-emoji-wrap" style={{ background: `${lesson.color}12` }}>
                    {lesson.emoji}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(14px,1.2vw,17px)', fontWeight: 700, color: INK, margin: 0, letterSpacing: '-0.01em' }}>
                        Lesson {lesson.n}: {lesson.name} Facts
                      </h3>
                    </div>
                    <span className="lesson-tag" style={{ background: `${lesson.color}12`, color: lesson.color, marginBottom: 8, display: 'inline-block' }}>
                      {lesson.tag}
                    </span>
                    <p style={{ fontFamily: SANS, fontSize: 'clamp(11px,0.9vw,13px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.65, margin: 0 }}>
                      {lesson.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(0,0,0,0.3)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.1em' }}>No lessons found for "{search}"</div>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: GOLD, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none' }}>
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(80px,18vw,280px)', fontWeight: 900, color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>LEARN</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal fromY={24}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,5vw,72px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
              Subscribe to the<br />Spice Newsletter
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(255,255,255,0.8)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.75 }}>
              All the spice lessons featured are part of our online inventory. New lessons delivered to your inbox every week.
            </p>
            <a href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: '#fff', color: GOLD, fontFamily: SANS, fontWeight: 700, fontSize: 15,
              padding: '18px 40px', borderRadius: 999, textDecoration: 'none',
              transition: 'transform 0.2s', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Subscribe for Spice Lessons →
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CURVED LOOP ──────────────────────────────────── */}
      <div style={{ position: 'relative', background: GOLD, paddingTop: 'clamp(40px,5vw,72px)', paddingBottom: 'clamp(80px,10vw,120px)' }}>
        <CurvedLoop
          marqueeText="SPICE FACTS • LEARN • DISCOVER • KNOW YOUR SPICE • EDUCATION • QUALITY • "
          speed={1.5} curveAmount={250}
          className="fill-[#fff] uppercase font-mono tracking-widest opacity-30"
        />
      </div>
    </main>
  );
}
