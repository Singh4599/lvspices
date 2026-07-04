'use client';

import { useEffect, useRef } from 'react';

/* ══════════════════════════════════════════════════════════════
   ParticleUniverse
   
   Scroll-driven shape morphing using plain scroll event
   (avoids Lenis ↔ GSAP ScrollTrigger conflicts).

   Progress 0→3:
     0 = 🌶️ chilli   (hero)
     1 = ⚙️ gear      (products section)
     2 = 🔬 microscope (process section)
     3 = 🌿 leaf      (dome section)

   Per transition (progress N→N+1):
     0.00–0.38  shape A → scatter  (breaking)
     0.38–0.62  floating scattered
     0.62–1.00  scatter → shape B  (reforming)
══════════════════════════════════════════════════════════════ */

const N_SHAPE = 2400;
const N_STAR  = 320;

const EMOJIS = ['🌶️', '⚙️', '🔬', '🌿'];

function easeIn3(t: number)  { return t * t * t; }
function easeOut3(t: number) { return 1 - Math.pow(1 - t, 3); }

// ── Pixel-sample an emoji into screen-space points ──────────
function sampleEmoji(emoji: string, n: number, cx: number, cy: number, size: number) {
  const S = 400;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const ctx = c.getContext('2d')!;
  ctx.font = `${S * 0.84}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.fillText(emoji, S / 2, S / 2);

  const d    = ctx.getImageData(0, 0, S, S).data;
  const pool: {x:number;y:number}[] = [];
  for (let y = 0; y < S; y += 2)
    for (let x = 0; x < S; x += 2)
      if (d[((y * S + x) << 2) + 3] > 60) pool.push({x, y});

  // shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const scale = size / S;
  const pts = pool.slice(0, n).map(p => ({
    x: cx + (p.x - S / 2) * scale,
    y: cy + (p.y - S / 2) * scale,
  }));
  while (pts.length < n) {
    const s = pts[(Math.random() * pts.length) | 0];
    pts.push({ x: s.x + (Math.random() - .5) * 6, y: s.y + (Math.random() - .5) * 6 });
  }
  return pts;
}

// ── Compute globalProgress purely from scroll ────────────────
function computeProgress(scrollY: number, W: number): number {
  const sections = [
    { id: 'section-products', fromV: 0, toV: 1 },
    { id: 'section-process',  fromV: 1, toV: 2 },
    { id: 'section-dome',     fromV: 2, toV: 3 },
  ];

  // Trigger: section enters at 70vh, exits at 30vh from top
  const triggerStart = W * 0.70;   // 70% of viewport height used as proxy (W=H here is wrong, recalc in closure)
  let progress = 0;

  for (const { id, fromV, toV } of sections) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top    = (el as HTMLElement).getBoundingClientRect().top + scrollY;
    const bottom = top + el.getBoundingClientRect().height;
    const H = window.innerHeight;
    const start  = top - H * 0.72;
    const end    = bottom - H * 0.28;

    if (scrollY < start) break;           // haven't reached yet
    if (scrollY >= end) { progress = toV; continue; } // fully past

    // Inside this section
    const t = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));
    progress = fromV + t;
    break;
  }

  return progress;
}

interface SP {
  x: number; y: number;
  vx: number; vy: number;
  formations: { x: number; y: number }[];
  scatter: { x: number; y: number };
  r: number; g: number; b: number;
  sz: number; al: number; ph: number;
  isStar: boolean;
}

export default function ParticleUniverse() {
  const cvs  = useRef<HTMLCanvasElement>(null);
  const gpRef = useRef(0);           // raw target progress
  const smRef = useRef(0);           // smoothed progress (lerped)

  useEffect(() => {
    const canvas = cvs.current!;
    const ctx    = canvas.getContext('2d')!;
    let W = 0, H = 0, alive = true;
    let raf: number;

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    // ── Build all 4 shape formations ──────────────────────────
    const SZ = () => Math.min(W, H) * 0.52;
    const formations = EMOJIS.map(e => sampleEmoji(e, N_SHAPE, W / 2, H / 2, SZ()));

    // ── Init particles ─────────────────────────────────────────
    const particles: SP[] = [];

    // Stars
    for (let i = 0; i < N_STAR; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .1, vy: (Math.random() - .5) * .1,
        formations: [], scatter: {x:0,y:0},
        r: 200, g: 210, b: 240,
        sz: .3 + Math.random() * .6,
        al: .08 + Math.random() * .18,
        ph: Math.random() * Math.PI * 2,
        isStar: true,
      });
    }

    // Shape particles — gold dominant
    for (let i = 0; i < N_SHAPE; i++) {
      const gold = Math.random() < .72;
      // Each particle's scatter = explosion target (far from center)
      const ang = Math.random() * Math.PI * 2;
      const rad = Math.min(W, H) * (.5 + Math.random() * .7);
      particles.push({
        x: formations[0][i].x + (Math.random() - .5) * W,
        y: formations[0][i].y + (Math.random() - .5) * H,
        vx: 0, vy: 0,
        formations: formations.map(f => f[i]),
        scatter: { x: W/2 + Math.cos(ang)*rad, y: H/2 + Math.sin(ang)*rad },
        r: gold ? 212 : 90,
        g: gold ? 165 : 180,
        b: gold ? 60  : 210,
        sz: .6 + Math.random() * 1.6,
        al: .5  + Math.random() * .5,
        ph: Math.random() * Math.PI * 2,
        isStar: false,
      });
    }

    // ── Scroll listener ────────────────────────────────────────
    const onScroll = () => {
      gpRef.current = computeProgress(window.scrollY, W);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // init

    // ── Target position from smoothed progress ─────────────────
    const getTarget = (p: SP, gp: number): {x:number; y:number} => {
      const stageRaw = Math.min(gp, EMOJIS.length - 1 - 0.001);
      const stage    = Math.floor(stageRaw);
      const local    = stageRaw - stage;

      const fA = p.formations[stage];
      const fB = p.formations[Math.min(stage + 1, EMOJIS.length - 1)];
      const fs = p.scatter;

      const BREAK = 0.38, REFORM = 0.62;

      if (local <= BREAK) {
        const t = easeIn3(local / BREAK);
        return { x: fA.x*(1-t) + fs.x*t, y: fA.y*(1-t) + fs.y*t };
      } else if (local < REFORM) {
        return fs;
      } else {
        const t = easeOut3((local - REFORM) / (1 - REFORM));
        return { x: fs.x*(1-t) + fB.x*t, y: fs.y*(1-t) + fB.y*t };
      }
    };

    // ── Render ─────────────────────────────────────────────────
    let t = 0;

    const draw = () => {
      if (!alive) return;
      raf = requestAnimationFrame(draw);
      t  += 0.018;

      // Smooth progress toward target (lerp speed = responsiveness)
      const prevSm = smRef.current;
      smRef.current += (gpRef.current - smRef.current) * 0.055;
      const scrolling = Math.abs(smRef.current - prevSm) > 0.0005;

      // Motion trail (partial clear — usta.agency ghost effect)
      ctx.fillStyle = 'rgba(0,0,0,0.10)';
      ctx.fillRect(0, 0, W, H);

      const gp = smRef.current;

      for (const p of particles) {
        if (p.isStar) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
          ctx.globalAlpha = p.al * (.5 + .5 * Math.sin(t * 1.3 + p.ph));
          ctx.fillStyle   = `rgb(${p.r},${p.g},${p.b})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.sz, 0, Math.PI*2);
          ctx.fill();
          continue;
        }

        const tgt = getTarget(p, gp);

        // Lerp — faster when scrolling, dreamy when idle
        const lr = scrolling ? .10 + Math.random() * .04 : .028;
        p.x += (tgt.x - p.x) * lr;
        p.y += (tgt.y - p.y) * lr;

        // Idle shimmer
        if (!scrolling) {
          p.x += Math.sin(t * 1.1 + p.ph) * 0.3;
          p.y += Math.cos(t * 0.9 + p.ph) * 0.3;
        }

        // Alpha dims during scatter
        const stage  = Math.min(Math.floor(gp), EMOJIS.length - 2);
        const local  = gp - stage;
        const shaped = local < 0.38 ? 1 - local/0.38 : local > 0.62 ? (local-0.62)/0.38 : 0;
        const al = p.al * (.28 + .72 * shaped);

        // Speed = distance to target → size boost when flying
        const dist = Math.hypot(tgt.x - p.x, tgt.y - p.y);
        const sz   = p.sz + Math.min(dist * 0.008, 0.9);

        ctx.globalAlpha = Math.min(.92, al);
        ctx.fillStyle   = `rgb(${p.r},${p.g},${p.b})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI*2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    draw();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={cvs}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
