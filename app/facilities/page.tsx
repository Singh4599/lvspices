'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';
import SketchVideoSlot from '@/components/ui/SketchVideoSlot';

const INK    = '#1A1915';
const CREAM  = '#F8F4EE';
const WARM_G = '#8A8580';
const SERIF  = 'var(--font-display), Georgia, serif';
const MONO   = 'var(--font-mono), monospace';
const SANS   = 'var(--font-sans), Inter, sans-serif';

const STEPS = [
  { n:'01', title:'Raw Material\nIntake',       stat:'10,000+ MT/yr',    video:'/videos/sketch/fac-a1-raw-material.mp4',        desc:'All inbound raw spices are received in secure, weather-proof bays. Automated pneumatic sampling probes draw representative samples with zero contamination. Every lot is GPS-tagged and undergoes rigorous pre-cleaning QA clearance before entering the facility.' },
  { n:'02', title:'Sorting &\nCleaning',         stat:'99.9% Purity',     video:'/videos/fac_process_2.mp4',             desc:'Multi-stage European automated sorting guarantees 99.9% physical purity — Vibro Sifters, De-Stoners, Magnetic Separators, and AI-powered Buhler Sortex optical machines surgically eliminate all foreign matter.' },
  { n:'03', title:'Cryogenic\nGrinding',         stat:'−196°C Liquid N₂', video:'/videos/fac_process_3.mp4',       desc:'Our liquid-nitrogen cryogenic process operates at an ultra-low −196°C — locking in up to 40% more natural essential oils, volatile aromatics, and vibrant ASTA colour that conventional grinding destroys.' },
  { n:'04', title:'Steam\nSterilisation',        stat:'5-Log Reduction',  video:'/videos/fac_process_4.mp4', desc:'FDA-compliant Continuous Flow HTST steam sterilisation delivers a validated 5-log reduction in pathogens — Salmonella, E. coli, Listeria — without degrading flavour, colour, or essential-oil content.' },
  { n:'05', title:'NABL\nAccredited Lab',        stat:'500+ Parameters',  video:'/videos/fac_process_5.mp4',            desc:'Our in-house ISO/IEC 17025 NABL-accredited laboratory conducts comprehensive physical, chemical, and microbiological analyses — heavy metals, aflatoxins, pesticide residues via advanced LC-MS/MS. No batch ships without a full CoA.' },
  { n:'06', title:'Clean Room\nPackaging',       stat:'Class 100K HEPA',  video:'/videos/fac_process_6.mp4',  desc:'Final products are packed in isolated Class 100,000 HEPA-filtered clean rooms under strict positive air pressure. Automated Form-Fill-Seal lines with Nitrogen flushing displace oxygen and maximise shelf life.' },
  { n:'07', title:'Smart\nWarehouse',            stat:'Climate Monitored', video:'/videos/fac_process_7.mp4',    desc:'Finished goods rest in our climate-controlled smart warehouse. 24/7 temperature and humidity monitoring paired with automated FIFO inventory management guarantees every shipment is at peak freshness.' },
  { n:'08', title:'Export\nDispatch',            stat:'40+ Countries',    video:'/videos/fac_process_8.mp4',      desc:'Container loading bays feature tamper-evident sealing and pre-shipment inspections — ensuring full compliance with international regulations for export to 40+ countries, from EU and US FDA to Middle East Halal requirements.' },
];

const HIGHLIGHTS = [
  { label:'Cryogenic Grinding',  caption:'Proprietary Liquid N₂ — 40% more aromatic oils preserved.',          video:'/videos/fac_process_3.mp4'       },
  { label:'Steam Sterilisation', caption:'FDA-compliant HTST: validated 5-log microbial kill.',                 video:'/videos/fac_process_4.mp4'      },
  { label:'Smart Warehouse',     caption:'Climate-controlled 24/7 with FIFO automated inventory.',             video:'/videos/fac_process_7.mp4'  },
  { label:'NABL Laboratory',     caption:'ISO/IEC 17025 accredited — 500+ stringent tests per batch.',         video:'/videos/fac_process_5.mp4'        },
  { label:'Auto Packaging',      caption:'Class 100,000 HEPA clean rooms with N₂ flushed sealing.',           video:'/videos/fac_process_6.mp4'  },
  { label:'Sorting & Cleaning',  caption:'Buhler Sortex optical sorting — 99.9% physical purity guaranteed.', video:'/videos/fac_process_2.mp4'    },
];

const METRICS = [
  { label:'Microbial Safety',    pct:99.999, desc:'5-Log Salmonella & E.coli kill. HTST validated.'          },
  { label:'Heavy Metal Testing', pct:100,    desc:'Lead, Cadmium, Arsenic — EU 2023/915 compliant.'          },
  { label:'Pesticide Residues',  pct:100,    desc:'500+ banned compounds screened via LC-MS/MS.'              },
  { label:'Moisture Control',    pct:98,     desc:'Inline NIR continuous monitoring — mold prevention.'       },
  { label:'Aflatoxin Detection', pct:99.5,   desc:'HPLC-FD — strictly below EU/USFDA limits.'                },
  { label:'Oil Retention',       pct:95,     desc:'40% higher vs conventional ambient grinding.'              },
];

const NUMBERS = [
  { val:11000, suffix:'+',  label:'Sq Ft',     sub:'Total built-up area'  },
  { val:7,     suffix:'+',  label:'Plants',    sub:'Processing units'     },
  { val:80,    suffix:'K+', label:'MT / Year', sub:'Annual output'        },
  { val:500,   suffix:'+',  label:'Products',  sub:'SKUs produced'        },
];

const CERTS = [
  { name:'FSSAI',        detail:'Lic. 10020042004726'       },
  { name:'ISO 22000',    detail:'Food Safety Management'    },
  { name:'BRCGS',        detail:'Global Food Standard AA'   },
  { name:'Halal',        detail:'Internationally Certified' },
  { name:'Kosher',       detail:'Star-K Certified'          },
  { name:'US FDA',       detail:'Registered Facility'       },
  { name:'APEDA',        detail:'Export Authorized'         },
  { name:'Spices Board', detail:'Government of India'       },
];

const MARQUEE_IMGS = [
  '/images/sketch/facilities/fac-marquee-1.jpg','/images/sketch/facilities/fac-marquee-2.jpg',
  '/images/sketch/facilities/fac-marquee-3.jpg','/images/sketch/facilities/fac-marquee-4.jpg',
  '/images/sketch/facilities/fac-marquee-5.jpg','/images/sketch/facilities/fac-marquee-6.jpg',
  '/images/sketch/facilities/fac-marquee-7.jpg','/images/sketch/facilities/fac-marquee-8.jpg',
];
const MARQUEE_LABELS = ['Raw Material','Sorting','Cryogenic Grinding','Steam Tunnel','Laboratory','Clean Room','Warehouse','Export'];

function InkLabel({ text }: { text: string }) {
  return (
    <div style={{display:'inline-flex',alignItems:'center',gap:10,marginBottom:16}}>
      <div style={{width:24,height:1,background:INK,opacity:0.4}} />
      <span style={{fontFamily:MONO,fontSize:10,letterSpacing:'0.3em',textTransform:'uppercase',color:INK,opacity:0.45,fontWeight:600}}>{text}</span>
    </div>
  );
}

/* ── HERO ───────────────────────────────────── */
function Hero() {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef  = useRef<HTMLVideoElement>(null);
  const rafRef     = useRef<number>(0);
  const targetT    = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Pick active video based on viewport
    const getActive = () =>
      window.innerWidth < 768 ? mobileRef.current : desktopRef.current;

    // Load both
    desktopRef.current?.load();
    mobileRef.current?.load();

    // rAF lerp — updates whichever is currently visible
    const tick = () => {
      const v = getActive();
      if (v && v.readyState >= 2) {
        const diff = targetT.current - v.currentTime;
        if (Math.abs(diff) > 0.001) v.currentTime += diff * 0.18;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // GSAP ScrollTrigger — pin + scrub
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top',
        end: '+=220%',
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const dur = getActive()?.duration || 4;
          targetT.current = self.progress * dur;
        },
      });
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', height: '100svh', background: '#F8F4EE', overflow: 'hidden' }}>

      {/* ── Desktop video (landscape 16:9) ── */}
      <video
        ref={desktopRef}
        src="/videos/sketch/fac-hero-scrub.mp4"
        muted playsInline preload="auto"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        className="fac-desktop-vid"
      />

      {/* ── Mobile video (portrait 9:16) ── */}
      <video
        ref={mobileRef}
        src="/videos/sketch/fac-hero-scrub-mobile.mp4"
        muted playsInline preload="auto"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          display: 'none',
        }}
        className="fac-mobile-vid"
      />

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10,
      }}>
        <div style={{ width: 1, height: 40, background: '#1A1915', opacity: 0.2, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, width: '100%', height: '40%', background: '#1A1915', opacity: 0.5, animation: 'fhScrollDrop 1.8s ease-in-out infinite' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', color: '#1A1915', opacity: 0.3, textTransform: 'uppercase' }}>scroll</span>
      </div>

      <style>{`
        @keyframes fhScrollDrop{0%{transform:translateY(-100%);opacity:1}80%{transform:translateY(250%);opacity:1}100%{transform:translateY(250%);opacity:0}}
        @media(max-width:767px){
          .fac-desktop-vid{display:none!important;}
          .fac-mobile-vid{display:block!important;}
        }
      `}</style>
    </div>
  );
}

/* ── TICKER ─────────────────────────────────── */
function TickerStrip() {
  const items = ['ISO 22000:2018','FSSC 22000 v6','BRC Grade AA','NABL ISO/IEC 17025','FSSAI','Halal Certified','Kosher','APEDA','US FDA','EU Compliant','Spices Board India'];
  const doubled = [...items,...items];
  return (
    <div style={{background:INK,padding:'13px 0',overflow:'hidden',whiteSpace:'nowrap'}}>
      <div style={{display:'inline-flex',animation:'facScroll 28s linear infinite',willChange:'transform'}}>
        {doubled.map((c,i)=><span key={i} style={{fontFamily:MONO,fontSize:10,letterSpacing:'0.24em',color:'rgba(255,255,255,0.75)',textTransform:'uppercase',padding:'0 36px',flexShrink:0}}>✦ {c}</span>)}
      </div>
    </div>
  );
}

/* ── PROCESS STEPS — timeline spine + vignette video ── */
const BLUE = '#1D6FE8';

const PSR_CSS = `
  .psr-row { display: grid; grid-template-columns: 1fr 56px 1fr; align-items: center; margin-bottom: clamp(16px,4vw,52px); position: relative; }
  @media(max-width:767px){
    .psr-row { grid-template-columns: 1fr 28px 1fr; margin-bottom: 28px; }
    .psr-vid-wrap { height: clamp(220px,62vw,340px) !important; width: 100% !important; }
    .psr-num  { font-size: clamp(40px,11vw,72px) !important; }
    .psr-title{ font-size: clamp(14px,4.5vw,22px) !important; }
    .psr-desc { display: none !important; }
    .psr-stat { padding: 3px 9px !important; }
    .psr-dot  { width: 10px !important; height: 10px !important; }
  }
`;

function ProcessStepRow({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const vidRef    = useRef<HTMLDivElement>(null);
  const vidInner  = useRef<HTMLDivElement>(null);
  const isEven    = index % 2 === 0;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapRef.current, start: 'top 86%', end: 'top 20%', scrub: 0.65 },
      });
      /* JourneyMilestone-style clip-path reveal on the video */
      tl.fromTo(vidRef.current,
        { clipPath: 'inset(12% 12% 12% 12%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power2.out' }, 0
      );
      tl.fromTo(vidInner.current,
        { scale: 1.1 },
        { scale: 1,   duration: 1.1, ease: 'power2.out' }, 0
      );
      /* Dot pop */
      tl.fromTo('.psr-dot',
        { scale: 0 },
        { scale: 1, duration: 0.4, ease: 'back.out(2)' }, 0.08
      );
      /* Number + text stagger */
      tl.fromTo('.psr-num',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }, 0
      );
      tl.fromTo('.psr-txt',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.08 }, 0.2
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  /* ── Vignette video ── */
  const VideoVignette = () => (
    <div ref={vidRef} className="psr-vid-wrap" style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(200px, 28vw, 380px)',
      clipPath: 'inset(12% 12% 12% 12%)',  /* GSAP animates this */
      overflow: 'visible',
    }}>
      <div ref={vidInner} style={{ position: 'absolute', inset: 0, scale: '1.1' }}>
        <SketchVideoSlot
          src={step.video}
          label={step.title.replace('\n', ' ')}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', aspectRatio: 'unset', borderRadius: 0 }}
        />
      </div>
      {/* Strong radial vignette — tight transparent center, heavy CREAM fade */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: `radial-gradient(ellipse 55% 58% at 50% 50%, transparent 30%, ${CREAM} 62%, ${CREAM} 100%)`,
      }} />
      {/* Extra blur strips on all 4 edges for feathered look */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        mask: 'radial-gradient(ellipse 56% 60% at 50% 50%, transparent 40%, black 68%)',
        WebkitMask: 'radial-gradient(ellipse 56% 60% at 50% 50%, transparent 40%, black 68%)',
      }} />
    </div>
  );

  /* ── Text block ── */
  const TextBlock = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Ghost step number */}
      <div className="psr-num" style={{
        fontFamily: SERIF, fontWeight: 800, fontStyle: 'italic',
        fontSize: 'clamp(52px,6vw,96px)',
        color: INK, opacity: 0.07, lineHeight: 1, letterSpacing: '-0.06em',
        marginBottom: -6, userSelect: 'none',
      }}>{step.n}</div>

      {/* Stat pill */}
      <div className="psr-txt psr-stat" style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        border: `1px solid rgba(29,111,232,0.28)`, borderRadius: 100,
        padding: '4px 12px', width: 'fit-content',
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: BLUE, flexShrink: 0 }} />
        <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: BLUE, fontWeight: 600 }}>{step.stat}</span>
      </div>

      {/* Title */}
      <h3 className="psr-txt psr-title" style={{
        fontFamily: SERIF, fontWeight: 800,
        fontSize: 'clamp(18px,2.2vw,36px)',
        color: INK, letterSpacing: '-0.04em', lineHeight: 1.08, margin: 0, whiteSpace: 'pre-line',
      }}>{step.title}</h3>

      {/* Description (hidden on mobile via CSS) */}
      <p className="psr-txt psr-desc" style={{
        fontFamily: SANS, fontSize: 'clamp(11px,0.85vw,14px)',
        color: WARM_G, lineHeight: 1.85, margin: 0, maxWidth: 300,
      }}>{step.desc}</p>
    </div>
  );

  return (
    <div ref={wrapRef} className="psr-row">
      {/* Left slot */}
      <div style={{ paddingRight: 'clamp(8px,2vw,36px)', display: 'flex', alignItems: 'center', justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
        {isEven ? <VideoVignette /> : <TextBlock />}
      </div>

      {/* Center spine dot */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="psr-dot" style={{
          width: 14, height: 14, borderRadius: '50%', background: BLUE, flexShrink: 0,
          boxShadow: `0 0 0 4px rgba(29,111,232,0.15), 0 0 0 8px rgba(29,111,232,0.07)`,
          zIndex: 2, position: 'relative',
        }} />
      </div>

      {/* Right slot */}
      <div style={{ paddingLeft: 'clamp(8px,2vw,36px)', display: 'flex', alignItems: 'center', justifyContent: isEven ? 'flex-start' : 'flex-end' }}>
        {isEven ? <TextBlock /> : <VideoVignette />}
      </div>
    </div>
  );
}

function ProcessSteps() {
  return (
    <section id="process" style={{ background: CREAM, overflow: 'hidden' }}>
      <style>{PSR_CSS}</style>

      {/* Header */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: 'clamp(64px,10vw,120px) clamp(20px,5vw,96px) clamp(24px,4vw,48px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 24, height: 1.5, background: BLUE, borderRadius: 2 }} />
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: BLUE, fontWeight: 600 }}>Core Process — 8 Steps</span>
        </div>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,5vw,84px)', fontWeight: 800, color: INK, letterSpacing: '-0.045em', lineHeight: 0.95, margin: 0 }}>
          From Raw<br />
          <em style={{ fontStyle: 'italic', opacity: 0.35 }}>To Remarkable.</em>
        </h2>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(12px,4vw,96px) clamp(48px,8vw,100px)', position: 'relative' }}>
        {/* Central spine */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(26,25,21,0.08)', transform: 'translateX(-50%)', zIndex: 0 }} />

        {STEPS.map((step, i) => (
          <ProcessStepRow key={step.n} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ── CURVED LOOP BREAK ──────────────────────── */
function CurvedLoopBreak() {
  return (
    <div style={{position:'relative',background:CREAM,paddingTop:'clamp(20px,3.5vw,52px)',paddingBottom:'clamp(60px,10vw,140px)',overflow:'hidden'}}>

      <CurvedLoop marqueeText="NABL ACCREDITED • FSSC 22000 • BRC GRADE AA • FDA REGISTERED • HALAL • KOSHER • APEDA • SPICES BOARD • " speed={1.8} curveAmount={260} className="fill-[rgba(26,25,21,0.35)] uppercase tracking-widest"/>
      <div style={{position:'absolute',top:'14%',left:'50%',transform:'translate(-50%,0)',display:'flex',flexDirection:'column',alignItems:'center',pointerEvents:'none',zIndex:2}}>
        <span style={{fontFamily:SERIF,fontSize:'clamp(22px,3.2vw,44px)',fontWeight:800,color:INK,lineHeight:1}}>LV</span>
        <span style={{fontFamily:MONO,fontSize:'clamp(7px,0.7vw,11px)',color:INK,opacity:0.35,letterSpacing:'0.24em',marginTop:4}}>SPICES</span>
      </div>
    </div>
  );
}

/* ── SKETCH IMAGE MARQUEE ───────────────────── */
function SketchImageMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const doubled  = [...MARQUEE_IMGS,...MARQUEE_IMGS];

  useEffect(()=>{
    const el = trackRef.current; if (!el) return;
    let x=0; let raf: number;
    const totalW = el.scrollWidth/2;
    const tick=()=>{ x-=0.55; if(x<=-totalW) x=0; el.style.transform=`translateX(${x}px)`; raf=requestAnimationFrame(tick); };
    raf=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(raf);
  },[]);

  return (
    <div style={{overflow:'hidden',background:'#fff',padding:'clamp(36px,5vw,60px) 0'}}>
      <div ref={trackRef} style={{display:'flex',gap:14,width:'max-content',willChange:'transform'}}>
        {doubled.map((src,i)=>(
          <div key={i} style={{position:'relative',width:230,height:290,flexShrink:0,borderRadius:8,overflow:'hidden',border:'1px solid rgba(26,25,21,0.09)'}}>
            {/* Fallback placeholder — sits BEHIND the image */}
            <div style={{position:'absolute',inset:0,background:CREAM,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',zIndex:0,backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 23px,rgba(26,25,21,0.045) 23px,rgba(26,25,21,0.045) 24px)`}}>
              <svg viewBox="0 0 200 240" width="100%" height="100%" style={{position:'absolute',inset:0}}>
                <rect x="8" y="8" width="184" height="224" rx="3" fill="none" stroke={INK} strokeWidth="1" strokeDasharray="5 4" opacity="0.18"/>
              </svg>
              <span style={{fontFamily:MONO,fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:INK,opacity:0.28,textAlign:'center',padding:'0 16px'}}>{MARQUEE_LABELS[i%8]}</span>
            </div>
            {/* Real image — sits ON TOP of fallback */}
            <img
              src={src}
              alt={MARQUEE_LABELS[i%8]}
              onError={e=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
              style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',zIndex:1}}
            />
            {/* Label badge — always on top */}
            <div style={{position:'absolute',bottom:12,left:12,zIndex:2}}>
              <span style={{fontFamily:MONO,fontSize:8,letterSpacing:'0.14em',textTransform:'uppercase',color:INK,opacity:0.5,background:'rgba(248,244,238,0.85)',padding:'3px 8px',borderRadius:4}}>{MARQUEE_LABELS[i%8]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── HIGHLIGHTS ─────────────────────────────── */
function Highlights() {
  const secRef = useRef<HTMLElement>(null);
  useEffect(()=>{
    if (typeof window==='undefined') return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const ctx = gsap.context(()=>{
      gsap.fromTo('.hl-head',{y:32,opacity:0},{y:0,opacity:1,duration:0.9,scrollTrigger:{trigger:secRef.current,start:'top 82%'}});
      gsap.utils.toArray<HTMLElement>('.hl-card').forEach((el,i)=>{
        gsap.fromTo(el,{y:60,opacity:0},{y:0,opacity:1,duration:0.85,ease:'power2.out',scrollTrigger:{trigger:secRef.current,start:'top 74%'},delay:i*0.08});
      });
    },secRef);
    return ()=>ctx.revert();
  },[]);

  return (
    <section ref={secRef} style={{background:CREAM,padding:'clamp(80px,10vw,130px) clamp(24px,4vw,80px)'}}>
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <div className="hl-head" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'clamp(40px,5vw,72px)',flexWrap:'wrap',gap:24,opacity:0}}>
          <div>
            <InkLabel text="Infrastructure Highlights"/>
            <h2 style={{fontFamily:SERIF,fontSize:'clamp(32px,4vw,60px)',fontWeight:800,color:INK,letterSpacing:'-0.04em',lineHeight:1.06,margin:0}}>Inside<br/>The Plant.</h2>
          </div>
          <p style={{fontFamily:SANS,fontSize:15,color:WARM_G,lineHeight:1.8,maxWidth:330,margin:0}}>Six precision facilities that define every batch — built for science, not shortcuts.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'clamp(12px,1.5vw,18px)'}} className="hl-grid">
          <style>{`@media(max-width:780px){.hl-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:500px){.hl-grid{grid-template-columns:1fr!important;}}.hl-card{transition:transform .35s ease,box-shadow .35s ease;}.hl-card:hover{transform:translateY(-4px);box-shadow:0 20px 60px rgba(26,25,21,0.1)!important;}.hl-card:hover .hl-cap{opacity:1!important;transform:translateY(0)!important;}`}</style>
          {HIGHLIGHTS.map((item,i)=>(
            <div key={i} className="hl-card" style={{position:'relative',borderRadius:8,overflow:'hidden',aspectRatio:'1/1',opacity:0,border:'1px solid rgba(26,25,21,0.09)'}}>
              <SketchVideoSlot src={item.video} label={item.label} aspectRatio="1/1" style={{position:'absolute',inset:0,borderRadius:0}}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(26,25,21,0.72) 0%,rgba(26,25,21,0.06) 55%,transparent 75%)',pointerEvents:'none'}}/>
              <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'clamp(14px,2vw,22px)'}}>
                <div style={{fontFamily:SERIF,fontSize:'clamp(13px,1.3vw,17px)',fontWeight:700,color:'#fff',marginBottom:5}}>{item.label}</div>
                <div className="hl-cap" style={{fontFamily:SANS,fontSize:11,color:'rgba(255,255,255,0.65)',lineHeight:1.55,opacity:0,transform:'translateY(8px)',transition:'opacity .3s ease,transform .3s ease'}}>{item.caption}</div>
              </div>
              <div style={{position:'absolute',top:12,right:12,background:'rgba(248,244,238,0.88)',borderRadius:100,padding:'3px 10px',backdropFilter:'blur(4px)'}}>
                <span style={{fontFamily:MONO,fontSize:9,letterSpacing:'0.14em',color:INK}}>0{i+1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── QUALITY FIRST ──────────────────────────── */
function MetricRow({label,desc,pct,index}:{label:string;desc:string;pct:number;index:number}) {
  const lineRef = useRef<SVGLineElement>(null);
  const dotRef  = useRef<SVGCircleElement>(null);
  const rowRef  = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if (typeof window==='undefined') return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const ctx = gsap.context(()=>{
      const W=180, target=(pct/100)*W;
      const st={trigger:rowRef.current!,start:'top 90%',once:true};
      gsap.fromTo(lineRef.current,{attr:{x2:0}},{attr:{x2:target},duration:1.4,ease:'power3.out',scrollTrigger:st});
      gsap.fromTo(dotRef.current, {attr:{cx:0}},{attr:{cx:target},duration:1.4,ease:'power3.out',scrollTrigger:st});
      gsap.fromTo(rowRef.current,{x:-20,opacity:0},{x:0,opacity:1,duration:0.6,ease:'power2.out',scrollTrigger:{trigger:rowRef.current!,start:'top 92%',once:true},delay:index*0.08});
    });
    return ()=>ctx.revert();
  },[pct,index]);
  return (
    <div ref={rowRef} style={{display:'flex',alignItems:'center',gap:20,paddingBottom:18,borderBottom:'1px solid rgba(26,25,21,0.06)',marginBottom:18,opacity:0}}>
      <div style={{flex:1}}>
        <div style={{fontFamily:SERIF,fontSize:'clamp(12px,1vw,15px)',fontWeight:700,color:INK,marginBottom:3}}>{label}</div>
        <div style={{fontFamily:SANS,fontSize:11,color:WARM_G,lineHeight:1.5}}>{desc}</div>
      </div>
      <div style={{flexShrink:0,width:180}}>
        <svg width="180" height="18" viewBox="0 0 180 18">
          <line x1="0" y1="9" x2="180" y2="9" stroke="rgba(26,25,21,0.07)" strokeWidth="1"/>
          <line ref={lineRef} x1="0" y1="9" x2="0" y2="9" stroke={INK} strokeWidth="1.5"/>
          <circle ref={dotRef} cx="0" cy="9" r="4" fill={INK}/>
        </svg>
        <div style={{fontFamily:MONO,fontSize:9,color:INK,letterSpacing:'0.1em',textAlign:'right',marginTop:3,opacity:0.5}}>{pct}%</div>
      </div>
    </div>
  );
}

function QualityFirst() {
  const secRef   = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if (typeof window==='undefined') return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const ctx=gsap.context(()=>{
      gsap.fromTo(videoRef.current,{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:1.4,ease:'power2.out',scrollTrigger:{trigger:secRef.current,start:'top 72%'}});
      gsap.fromTo(textRef.current,{x:48,opacity:0},{x:0,opacity:1,duration:0.9,ease:'power2.out',scrollTrigger:{trigger:secRef.current,start:'top 72%'},delay:0.2});
    },secRef);
    return ()=>ctx.revert();
  },[]);
  return (
    <section ref={secRef} style={{background:'#fff',overflow:'hidden'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'clamp(500px,58vw,760px)',alignItems:'stretch'}} className="qf-grid">
        <style>{`@media(max-width:860px){.qf-grid{grid-template-columns:1fr!important;}}`}</style>
        <div ref={videoRef} style={{position:'relative',minHeight:'clamp(340px,48vw,100%)',clipPath:'inset(0 100% 0 0)',overflow:'hidden'}}>
          <SketchVideoSlot src="/videos/sketch/fac-c1-quality-wide.mp4" label="Quality — NABL Lab" aspectRatio="unset" style={{position:'absolute',inset:0,aspectRatio:'unset',height:'100%',borderRadius:0}}/>
        </div>
        <div ref={textRef} style={{display:'flex',flexDirection:'column',justifyContent:'center',padding:'clamp(48px,7vw,96px) clamp(32px,5vw,64px)',opacity:0}}>
          <InkLabel text="Quality First"/>
          <h2 style={{fontFamily:SERIF,fontSize:'clamp(28px,3.3vw,50px)',fontWeight:800,color:INK,letterSpacing:'-0.04em',lineHeight:1.06,margin:'0 0 12px'}}>Every Batch.<br/><em style={{fontStyle:'italic',opacity:0.45}}>Scientifically Verified.</em></h2>
          <p style={{fontFamily:SANS,fontSize:'clamp(13px,0.95vw,15px)',color:WARM_G,lineHeight:1.85,margin:'0 0 28px',maxWidth:340}}>NABL-accredited in-house lab runs 500+ compound analyses on every lot. No batch ships without a full Certificate of Analysis.</p>
          <div>{METRICS.map((m,i)=><MetricRow key={m.label} label={m.label} desc={m.desc} pct={m.pct} index={i}/>)}</div>
        </div>
      </div>
    </section>
  );
}

/* ── FACILITY NUMBERS ───────────────────────── */
function AnimatedCounter({val,suffix,duration=1.9}:{val:number;suffix:string;duration?:number}) {
  const spanRef=useRef<HTMLSpanElement>(null);
  const triggered=useRef(false);
  useEffect(()=>{
    if (typeof window==='undefined') return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches){if(spanRef.current)spanRef.current.textContent=val.toLocaleString()+suffix;return;}
    const ctx=gsap.context(()=>{
      ScrollTrigger.create({trigger:spanRef.current,start:'top 86%',once:true,onEnter:()=>{
        if(triggered.current)return;triggered.current=true;
        gsap.fromTo({n:0},{n:val},{duration,ease:'power2.out',onUpdate:function(){if(spanRef.current)spanRef.current.textContent=Math.round((this.targets()[0] as {n:number}).n).toLocaleString()+suffix;}});
      }});
    });
    return ()=>ctx.revert();
  },[val,suffix,duration]);
  return <span ref={spanRef}>0{suffix}</span>;
}

function FacilityNumbers() {
  const secRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    if (typeof window==='undefined') return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const ctx=gsap.context(()=>{
      gsap.utils.toArray<HTMLElement>('.fn-item').forEach((el,i)=>{gsap.fromTo(el,{y:48,opacity:0},{y:0,opacity:1,duration:0.75,ease:'power2.out',scrollTrigger:{trigger:secRef.current,start:'top 76%'},delay:i*0.1});});
    },secRef);
    return ()=>ctx.revert();
  },[]);
  return (
    <section ref={secRef} style={{background:CREAM,padding:'clamp(90px,11vw,160px) clamp(24px,5vw,88px)'}}>
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <div className="fn-item" style={{marginBottom:'clamp(44px,6vw,80px)',opacity:0}}><InkLabel text="Scale & Capacity"/></div>
        <div style={{display:'flex',flexWrap:'wrap',gap:'clamp(40px,7vw,100px)'}}>
          {NUMBERS.map(n=>(
            <div key={n.label} className="fn-item" style={{opacity:0}}>
              <div style={{fontFamily:SERIF,fontSize:'clamp(52px,7.5vw,120px)',fontWeight:800,color:INK,lineHeight:0.85,letterSpacing:'-0.05em'}}><AnimatedCounter val={n.val} suffix={n.suffix}/></div>
              <div style={{fontFamily:SERIF,fontSize:'clamp(16px,2vw,28px)',fontWeight:600,color:INK,fontStyle:'italic',marginTop:10,marginBottom:4,opacity:0.45}}>{n.label}</div>
              <div style={{fontFamily:SANS,fontSize:13,color:WARM_G}}>{n.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CERT WALL ──────────────────────────────── */
function CertWall() {
  const secRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    if (typeof window==='undefined') return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const ctx=gsap.context(()=>{
      gsap.fromTo('.cw-head',{y:32,opacity:0},{y:0,opacity:1,duration:0.9,scrollTrigger:{trigger:secRef.current,start:'top 80%'}});
      gsap.utils.toArray<HTMLElement>('.cw-tile').forEach((el,i)=>{gsap.fromTo(el,{y:36,opacity:0,scale:0.97},{y:0,opacity:1,scale:1,duration:0.65,ease:'power2.out',scrollTrigger:{trigger:secRef.current,start:'top 72%'},delay:i*0.055});});
    },secRef);
    return ()=>ctx.revert();
  },[]);
  return (
    <section ref={secRef} style={{background:'#fff',padding:'clamp(80px,10vw,130px) clamp(24px,4vw,80px)'}}>
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <div className="cw-head" style={{marginBottom:'clamp(36px,5vw,60px)',opacity:0}}>
          <InkLabel text="Certified Excellence"/>
          <h2 style={{fontFamily:SERIF,fontSize:'clamp(30px,4vw,58px)',fontWeight:800,color:INK,letterSpacing:'-0.04em',lineHeight:1.06,margin:0}}>Built To The<br/>Highest Standard.</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'clamp(10px,1.4vw,18px)'}} className="cw-grid">
          <style>{`@media(max-width:780px){.cw-grid{grid-template-columns:repeat(2,1fr)!important;}}.cw-tile{transition:transform .3s ease,box-shadow .3s ease;}.cw-tile:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(26,25,21,0.08)!important;}`}</style>
          {CERTS.map((c,i)=>(
            <div key={i} className="cw-tile" style={{background:CREAM,borderRadius:8,padding:'clamp(18px,2.5vw,30px)',opacity:0,border:'1px solid rgba(26,25,21,0.07)'}}>
              <div style={{fontFamily:SERIF,fontSize:'clamp(17px,2vw,25px)',fontWeight:800,color:INK,letterSpacing:'-0.03em',marginBottom:7}}>{c.name}</div>
              <div style={{fontFamily:SANS,fontSize:12,color:WARM_G,lineHeight:1.55}}>{c.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SUSTAINABILITY ──────────────────────────── */
function Sustainability() {
  const secRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    if (typeof window==='undefined') return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const ctx=gsap.context(()=>{
      gsap.fromTo('.sus-head',{y:32,opacity:0},{y:0,opacity:1,duration:0.9,scrollTrigger:{trigger:secRef.current,start:'top 80%'}});
      gsap.fromTo('.sus-vid',{scale:1.04,opacity:0},{scale:1,opacity:1,duration:1.2,ease:'power2.out',scrollTrigger:{trigger:secRef.current,start:'top 72%'}});
      gsap.utils.toArray<HTMLElement>('.sus-pin').forEach((el,i)=>{gsap.fromTo(el,{opacity:0,scale:0.8},{opacity:1,scale:1,duration:0.5,ease:'back.out(1.7)',scrollTrigger:{trigger:secRef.current,start:'top 60%'},delay:0.3+i*0.12});});
      gsap.utils.toArray<HTMLElement>('.sus-stat').forEach((el,i)=>{gsap.fromTo(el,{y:24,opacity:0},{y:0,opacity:1,duration:0.6,scrollTrigger:{trigger:el,start:'top 90%'},delay:i*0.1});});
    },secRef);
    return ()=>ctx.revert();
  },[]);

  const pins=[
    {label:'Solar Roof',x:'22%',y:'18%'},
    {label:'Rainwater Harvesting',x:'68%',y:'12%'},
    {label:'Zero Waste',x:'15%',y:'62%'},
    {label:'Water Recycling',x:'76%',y:'58%'},
    {label:'Energy Efficient',x:'47%',y:'76%'},
  ];

  return (
    <section ref={secRef} style={{background:CREAM,padding:'clamp(80px,10vw,130px) clamp(24px,4vw,80px)'}}>
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <div className="sus-head" style={{marginBottom:36,opacity:0}}>
          <InkLabel text="Sustainability"/>
          <h2 style={{fontFamily:SERIF,fontSize:'clamp(30px,4vw,58px)',fontWeight:800,color:INK,letterSpacing:'-0.04em',lineHeight:1.06,margin:0}}>Built For<br/><em style={{fontStyle:'italic',opacity:0.4}}>Tomorrow.</em></h2>
        </div>
        <div className="sus-vid" style={{position:'relative',borderRadius:10,overflow:'hidden',opacity:0}}>
          <SketchVideoSlot src="/videos/sketch/fac-c2-sustainability-wide.mp4" label="Sustainability — Campus Blueprint" aspectRatio="16/7" style={{borderRadius:10}}/>
          {pins.map((p,i)=>(
            <div key={i} className="sus-pin" style={{position:'absolute',left:p.x,top:p.y,transform:'translate(-50%,-50%)',opacity:0,zIndex:5}}>
              <div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(248,244,238,0.92)',backdropFilter:'blur(10px)',border:'1px solid rgba(26,25,21,0.18)',borderRadius:100,padding:'7px 14px',whiteSpace:'nowrap'}}>
                <div style={{width:5,height:5,borderRadius:'50%',background:INK,animation:'susPulse 2s ease-in-out infinite',animationDelay:`${i*0.4}s`}}/>
                <span style={{fontFamily:MONO,fontSize:9,letterSpacing:'0.16em',fontWeight:600,color:INK,textTransform:'uppercase'}}>{p.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'clamp(28px,4.5vw,72px)',marginTop:44}}>
          {[{v:'100%',l:'Renewable Energy Target'},{v:'Zero',l:'Effluent Discharge'},{v:'40%',l:'Water Recycled'},{v:'500KW',l:'Solar Capacity'}].map((s,i)=>(
            <div key={i} className="sus-stat" style={{textAlign:'center',opacity:0}}>
              <div style={{fontFamily:SERIF,fontSize:'clamp(24px,3vw,42px)',fontWeight:800,color:INK,letterSpacing:'-0.04em'}}>{s.v}</div>
              <div style={{fontFamily:SANS,fontSize:13,color:WARM_G,marginTop:6}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FACTORY VISIT CTA ──────────────────────── */
function FactoryVisit() {
  const secRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    if (typeof window==='undefined') return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const ctx=gsap.context(()=>{gsap.fromTo('.fv-content',{y:36,opacity:0},{y:0,opacity:1,duration:0.9,scrollTrigger:{trigger:secRef.current,start:'top 72%'}});},secRef);
    return ()=>ctx.revert();
  },[]);
  return (
    <section ref={secRef} style={{background:INK,padding:'clamp(80px,10vw,130px) clamp(24px,4vw,80px)'}}>
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <div className="fv-content" style={{textAlign:'center',opacity:0}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:10,marginBottom:20}}>
            <div style={{width:24,height:1,background:'rgba(255,255,255,0.25)'}}/>
            <span style={{fontFamily:MONO,fontSize:10,letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(255,255,255,0.35)'}}>Factory Visit</span>
          </div>
          <h2 style={{fontFamily:SERIF,fontSize:'clamp(38px,5.5vw,84px)',fontWeight:800,color:'#fff',letterSpacing:'-0.04em',lineHeight:1,margin:'0 0 18px'}}>See Where<br/><em style={{fontStyle:'italic',opacity:0.55}}>Quality Begins.</em></h2>
          <p style={{fontFamily:SANS,fontSize:'clamp(14px,1.1vw,17px)',color:'rgba(255,255,255,0.45)',lineHeight:1.8,maxWidth:440,margin:'0 auto 38px'}}>We welcome auditors, buyers, and partners to our plants. Experience the infrastructure behind every shipment.</p>
          <Link href="/contact" style={{display:'inline-flex',alignItems:'center',gap:12,background:CREAM,color:INK,fontFamily:SANS,fontWeight:700,fontSize:13,padding:'15px 38px',borderRadius:2,textDecoration:'none',letterSpacing:'0.08em',textTransform:'uppercase'}}>
            Book A Factory Visit
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── PAGE ASSEMBLY ──────────────────────────── */
export default function FacilitiesPage() {
  return (
    <main style={{background:CREAM,color:INK,overflowX:'hidden'}}>
      <Hero/>
      <TickerStrip/>
      <ProcessSteps/>
      <CurvedLoopBreak/>
      <VelocityMarquee dark={false}/>
      <SketchImageMarquee/>
      <Highlights/>
      <CurvedLoopBreak/>
      <QualityFirst/>
      <FacilityNumbers/>
      <CertWall/>
      <Sustainability/>
      <FactoryVisit/>
      <style>{`
        @keyframes facScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes susPulse{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:1;transform:scale(1.5)}}
      `}</style>
    </main>
  );
}
