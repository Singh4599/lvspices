'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';
import SketchVideoSlot from '@/components/ui/SketchVideoSlot';

const INK    = '#1A1915';
const CREAM  = '#F8F4EE';
const WARM_G = '#8A8580';
const BLUE   = '#1D6FE8';
const SERIF  = 'var(--font-display), Georgia, serif';
const MONO   = 'var(--font-mono), monospace';
const SANS   = 'var(--font-sans), Inter, sans-serif';

const SECTIONS = [
  { n:'01', title:'Research & Development', stat:'In-House R&D',
    desc:'Our dedicated R&D team continuously innovates to develop new spice blends, flavour profiles, and processing techniques. From new product ideation to prototype formulation, every innovation is backed by scientific testing and consumer insight.',
    mobileDesc: 'Our dedicated R&D team continuously innovates to develop new spice blends, flavour profiles, and processing techniques.',
    videos:[{src:'/videos/fac-01a-rd.mp4',label:'Product R&D'},{src:'/videos/fac-01b-rd.mp4',label:'Flavour Development'}]},
  { n:'02', title:'Analytical Lab', stat:'500+ Tests/Batch',
    desc:'Our ISO/IEC 17025 NABL-accredited analytical lab runs 500+ compound analyses on every batch — physical parameters, chemical compositions, moisture content, ash values, and ASTA colour measurements. Every lot gets a full Certificate of Analysis before dispatch.',
    mobileDesc: 'Our NABL-accredited lab runs 500+ compound analyses on every batch for physical and chemical parameters.',
    videos:[{src:'/videos/fac-02a-analytical.mp4',label:'Analytical Testing'},{src:'/videos/fac-02b-analytical.mp4',label:'Certificate of Analysis'}]},
  { n:'03', title:'Instrument Lab', stat:'LC-MS/MS & HPLC',
    desc:'Equipped with world-class instruments — LC-MS/MS, GC-MS, HPLC, AAS, and ICP-MS — our instrument lab detects pesticide residues, heavy metals, aflatoxins, and adulterants at parts-per-billion levels. Results are traceable and audit-ready.',
    mobileDesc: 'Equipped with LC-MS/MS and HPLC, our lab detects pesticides, heavy metals, and adulterants at parts-per-billion levels.',
    videos:[{src:'/videos/fac-03a-instrument.mp4',label:'HPLC Analysis'},{src:'/videos/fac-03b-instrument.mp4',label:'Pesticide Detection'}]},
  { n:'04', title:'Micro Lab', stat:'5-Log Kill Validated',
    desc:'Our microbiological lab performs total plate counts, yeast & mould, Salmonella, E. coli, Listeria, and Staphylococcus testing on every batch. Our validated HTST steam sterilisation process delivers a 5-log pathogen reduction without compromising flavour or colour.',
    mobileDesc: 'Our micro lab performs comprehensive pathogen testing, validating our 5-log pathogen reduction process.',
    videos:[{src:'/videos/fac-04a-microlab.mp4',label:'Microbial Testing'},{src:'/videos/fac-04b-microlab.mp4',label:'Pathogen Validation'}]},
  { n:'05', title:'Steam Sterilization', stat:'FDA-Compliant HTST',
    desc:'FDA-compliant Continuous Flow HTST steam sterilisation delivers a validated 5-log reduction in pathogens — Salmonella, E. coli, Listeria — without degrading flavour, colour, or essential-oil content. Every batch is logged with time, temperature, and pressure data.',
    mobileDesc: 'FDA-compliant HTST steam sterilisation delivers a 5-log reduction in pathogens without degrading flavour or colour.',
    videos:[{src:'/videos/fac-05a-steam.mp4',label:'Steam Tunnel'},{src:'/videos/fac-05b-steam.mp4',label:'Before & After'}]},
  { n:'06', title:'Private Labelling', stat:'Custom Solutions',
    desc:'End-to-end private label manufacturing for retail brands, foodservice chains, and export buyers. We handle everything — formulation, regulatory compliance, artwork design, packaging, and documentation — so your brand reaches shelves faster.',
    mobileDesc: 'End-to-end private label manufacturing for retail brands, covering formulation, packaging, and documentation.',
    videos:[{src:'/videos/fac-06a-private.mp4',label:'Label Application'},{src:'/videos/fac-06b-private.mp4',label:'Your Brand'}]},
  { n:'07', title:'Processing Unit', stat:'80,000 MT / Year',
    desc:'Our state-of-the-art processing unit spans 11,000+ sq ft with 7 specialized plants. Cryogenic grinding at −196°C, Class 100K HEPA clean room packaging, optical sorting, and automated FIFO warehousing ensure consistent quality at scale across all product lines.',
    mobileDesc: 'Our 11,000+ sq ft processing unit features cryogenic grinding, optical sorting, and automated warehousing.',
    videos:[{src:'/videos/fac-07a-processing.mp4',label:'Factory Floor'},{src:'/videos/fac-07b-processing.mp4',label:'Cryogenic Grinding'}]},
];



const METRICS = [
  { label:'Microbial Safety',    pct:99.999, desc:'5-Log Salmonella & E.coli kill. HTST validated.'     },
  { label:'Heavy Metal Testing', pct:100,    desc:'Lead, Cadmium, Arsenic — EU 2023/915 compliant.'     },
  { label:'Pesticide Residues',  pct:100,    desc:'500+ banned compounds screened via LC-MS/MS.'         },
  { label:'Moisture Control',    pct:98,     desc:'Inline NIR continuous monitoring — mold prevention.'  },
  { label:'Aflatoxin Detection', pct:99.5,   desc:'HPLC-FD — strictly below EU/USFDA limits.'           },
  { label:'Oil Retention',       pct:95,     desc:'40% higher vs conventional ambient grinding.'         },
];

const NUMBERS = [
  { val:11000, suffix:'+',  label:'Sq Ft',     sub:'Total built-up area' },
  { val:7,     suffix:'+',  label:'Plants',    sub:'Processing units'    },
  { val:80,    suffix:'K+', label:'MT / Year', sub:'Annual output'       },
  { val:500,   suffix:'+',  label:'Products',  sub:'SKUs produced'       },
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
  '/images/fac-marquee-1.jpg','/images/fac-marquee-2.jpg',
  '/images/fac-marquee-3.jpg','/images/fac-marquee-4.jpg',
  '/images/fac-marquee-5.jpg','/images/fac-marquee-6.jpg',
  '/images/fac-marquee-7.jpg','/images/fac-marquee-8.jpg',
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

/* ── VIDEO SLIDER ──────────────────────────────── */
function VideoSlider({ videos }: { videos: typeof SECTIONS[0]['videos'] }) {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const extendedVideos = useMemo(() => [...videos, videos[0]], [videos]);
  const N = videos.length;
  const pct = 100 / extendedVideos.length;

  const goToNext = useCallback(() => {
    if (isAnimating || !trackRef.current) return;
    setIsAnimating(true);
    
    const nextIdx = active + 1;
    setActive(nextIdx === N ? 0 : nextIdx);

    gsap.to(trackRef.current, { 
      x: `-${nextIdx * pct}%`, 
      duration: 0.52, 
      ease: 'power2.inOut',
      onComplete: () => {
        if (nextIdx === N) {
          gsap.set(trackRef.current, { x: 0 });
        }
        setIsAnimating(false);
      }
    });
  }, [active, isAnimating, N, pct]);

  const goToPrev = useCallback(() => {
    if (isAnimating || !trackRef.current) return;
    setIsAnimating(true);
    
    if (active === 0) {
      gsap.set(trackRef.current, { x: `-${N * pct}%` });
      const prevIdx = N - 1;
      setActive(prevIdx);
      gsap.to(trackRef.current, { 
        x: `-${prevIdx * pct}%`, 
        duration: 0.52, 
        ease: 'power2.inOut',
        onComplete: () => setIsAnimating(false)
      });
    } else {
      const prevIdx = active - 1;
      setActive(prevIdx);
      gsap.to(trackRef.current, { 
        x: `-${prevIdx * pct}%`, 
        duration: 0.52, 
        ease: 'power2.inOut',
        onComplete: () => setIsAnimating(false)
      });
    }
  }, [active, isAnimating, N, pct]);

  const goTo = useCallback((idx: number) => {
    if (isAnimating || !trackRef.current || idx === active) return;
    setIsAnimating(true);
    setActive(idx);
    gsap.to(trackRef.current, { 
      x: `-${idx * pct}%`, 
      duration: 0.52, 
      ease: 'power2.inOut',
      onComplete: () => setIsAnimating(false)
    });
  }, [active, isAnimating, pct]);

  useEffect(() => { setActive(0); if (trackRef.current) gsap.set(trackRef.current, { x: 0 }); }, [videos]);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 700, margin: '0 auto' }}>
      {/* Track wrapper — centered */}
      <div style={{ position:'relative', overflow:'hidden', width:'100%' }}>
        {/* Prev — Always show for loop */}
        {videos.length > 1 && (
          <button onClick={goToPrev} aria-label="Previous" style={{
            position:'absolute',left:8,top:'50%',transform:'translateY(-50%)',zIndex:10,
            width:36,height:36,borderRadius:'50%',border:`1.5px solid rgba(26,25,21,0.15)`,
            background:CREAM,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}

        {/* Track */}
        <div ref={trackRef} style={{ display:'flex', width:`${extendedVideos.length * 100}%`, willChange:'transform' }}>
          {extendedVideos.map((v, i) => (
            <div key={i} style={{ width:`${pct}%`, flexShrink:0, padding:'0 clamp(4px,0.8vw,10px)', boxSizing:'border-box' }}>
              <div style={{ position:'relative', overflow:'hidden', aspectRatio:'16/9', background:CREAM }}>
                <SketchVideoSlot
                  src={v.src} label={v.label} aspectRatio="16/9"
                  style={{ position:'absolute', inset:0, borderRadius:0, width:'100%', height:'100%' }}
                />
                {/* Oval vignette properly scaled and very light */}
                <div style={{
                  position:'absolute', inset:-2, pointerEvents:'none', zIndex:2,
                  background:`radial-gradient(ellipse 48% 58% at 50% 50%, transparent 48%, ${CREAM} 90%, ${CREAM} 100%)`,
                }}/>
                {/* Lighter blur mask */}
                <div style={{
                  position:'absolute', inset:-2, pointerEvents:'none', zIndex:3,
                  backdropFilter:'blur(4px)',
                  WebkitBackdropFilter:'blur(4px)',
                  mask:`radial-gradient(ellipse 48% 58% at 50% 50%, transparent 48%, black 90%)`,
                  WebkitMask:`radial-gradient(ellipse 48% 58% at 50% 50%, transparent 48%, black 90%)`,
                }}/>
              </div>
            </div>
          ))}
        </div>

        {/* Next — Always show for loop */}
        {videos.length > 1 && (
          <button onClick={goToNext} aria-label="Next" style={{
            position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',zIndex:10,
            width:36,height:36,borderRadius:'50%',border:`1.5px solid rgba(26,25,21,0.15)`,
            background:CREAM,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}
      </div>
      {/* Dots */}
      <div style={{ display:'flex',justifyContent:'center',gap:7,marginTop:14 }}>
        {videos.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i+1}`} style={{
            width: i===active ? 18 : 6, height:6, borderRadius:100,
            background: i===active ? INK : 'rgba(26,25,21,0.2)',
            border:'none',cursor:'pointer',padding:0,
            transition:'width 0.3s ease, background 0.25s ease',
          }}/>
        ))}
      </div>
    </div>
  );
}

/* ── ACCORDION ROW ─────────────────────────────── */
function AccordionRow({ section, isOpen, onToggle, index }: {
  section: typeof SECTIONS[0]; isOpen: boolean; onToggle: () => void; index: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const chevRef  = useRef<HTMLDivElement>(null);
  const rowRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current || !innerRef.current || !chevRef.current) return;
    if (isOpen) {
      panelRef.current.style.display = 'block';
      const h = innerRef.current.offsetHeight;
      gsap.fromTo(panelRef.current, { height:0, opacity:0 }, { height:h, opacity:1, duration:0.52, ease:'power2.inOut' });
      gsap.to(chevRef.current, { rotate:180, duration:0.38, ease:'power2.out' });
    } else {
      gsap.to(panelRef.current, { height:0, opacity:0, duration:0.42, ease:'power2.inOut',
        onComplete: () => { if (panelRef.current) panelRef.current.style.display='none'; }
      });
      gsap.to(chevRef.current, { rotate:0, duration:0.38, ease:'power2.out' });
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof window==='undefined') return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(rowRef.current, {y:18,opacity:0}, {y:0,opacity:1,duration:0.5,ease:'power2.out',
        scrollTrigger:{trigger:rowRef.current,start:'top 91%',once:true}, delay:index*0.04});
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={rowRef} style={{ opacity:0, borderBottom:'1px solid rgba(26,25,21,0.1)' }}>
      <style>{`
        .mobile-desc { display: none; }
        .desktop-desc { display: block; }
        @media(max-width:680px){ 
          .acc-stat { display:none!important; } 
          .desktop-desc { display: none !important; }
          .mobile-desc { display: block !important; }
        }
      `}</style>
      {/* Header */}
      <button onClick={onToggle} aria-expanded={isOpen} style={{
        width:'100%',background:'none',border:'none',cursor:'pointer',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'clamp(18px,2.4vw,30px) 0',gap:16,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'clamp(12px,2vw,28px)' }}>
          <span style={{
            fontFamily:SERIF,fontSize:'clamp(12px,1.2vw,16px)',fontWeight:800,fontStyle:'italic',
            color:INK,opacity:0.16,letterSpacing:'-0.04em',minWidth:24,flexShrink:0,
          }}>{section.n}</span>
          <span style={{
            fontFamily:SERIF,fontSize:'clamp(16px,1.9vw,26px)',fontWeight:800,
            color:isOpen ? BLUE : INK,letterSpacing:'-0.03em',
            transition:'color 0.22s',textAlign:'left',
          }}>{section.title}</span>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'clamp(10px,1.5vw,22px)', flexShrink:0 }}>
          <span className="acc-stat" style={{
            fontFamily:MONO,fontSize:10,letterSpacing:'0.16em',textTransform:'uppercase',
            color:isOpen ? BLUE : WARM_G,
            border:`1px solid ${isOpen ? 'rgba(29,111,232,0.28)' : 'rgba(26,25,21,0.12)'}`,
            borderRadius:100,padding:'3px 11px',whiteSpace:'nowrap',
            transition:'color 0.22s,border-color 0.22s',
          }}>{section.stat}</span>

          <div ref={chevRef} style={{
            width:36,height:36,borderRadius:'50%',
            border:`1.5px solid ${isOpen ? BLUE : 'rgba(26,25,21,0.15)'}`,
            background:isOpen ? 'rgba(29,111,232,0.07)' : 'transparent',
            display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
            transition:'border-color 0.22s,background 0.22s',
          }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke={isOpen ? BLUE : INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </button>

      {/* Panel */}
      <div ref={panelRef} style={{ height:0, overflow:'hidden', display:'none', opacity:0 }}>
        <div ref={innerRef} style={{ paddingBottom:'clamp(24px,3.5vw,44px)' }}>
          <div style={{ width: '100%' }}>
            {/* Text - Full width above slider */}
            <p className="desktop-desc" style={{fontFamily:SANS,fontSize:'clamp(13px,1.05vw,15px)',color:WARM_G,lineHeight:1.85,margin:'0 0 clamp(24px,4vw,48px) 0'}}>
              {section.desc}
            </p>
            {/* Mobile specific one-liner */}
            <p className="mobile-desc" style={{fontFamily:SANS,fontSize:'clamp(13px,1.05vw,15px)',color:WARM_G,lineHeight:1.6,margin:'0 0 clamp(24px,4vw,48px) 0'}}>
              {section.mobileDesc}
            </p>
            
            {/* Slider - Centered below */}
            <VideoSlider videos={section.videos}/>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── FACILITIES ACCORDION ──────────────────────── */
function FacilitiesAccordion() {
  const [openIdx, setOpenIdx] = useState<number|null>(null);
  const toggle = (i: number) => setOpenIdx(prev => prev===i ? null : i);

  return (
    <section id="process" style={{ background:CREAM, overflow:'hidden' }}>
      <div style={{ maxWidth:1300, margin:'0 auto', padding:'clamp(80px,10vw,120px) clamp(24px,5vw,80px) clamp(24px,3vw,40px)' }}>
        <InkLabel text="Core Process — 8 Steps"/>
        <h2 style={{ fontFamily:SERIF, fontSize:'clamp(34px,5vw,78px)', fontWeight:800, color:INK, letterSpacing:'-0.045em', lineHeight:0.96, margin:0 }}>
          From Raw<br/><em style={{fontStyle:'italic',opacity:0.3}}>To Remarkable.</em>
        </h2>
      </div>
      <div style={{ maxWidth:1300, margin:'0 auto', padding:'0 clamp(24px,5vw,80px) clamp(80px,10vw,120px)' }}>
        <div style={{ borderTop:'1px solid rgba(26,25,21,0.1)' }}/>
        {SECTIONS.map((sec, i) => (
          <AccordionRow key={sec.n} section={sec} isOpen={openIdx===i} onToggle={() => toggle(i)} index={i}/>
        ))}
      </div>
    </section>
  );
}

/* ── HERO ────────────────────────────────────── */
function Hero() {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef  = useRef<HTMLVideoElement>(null);
  const rafRef     = useRef<number>(0);
  const targetT    = useRef(0);

  useEffect(() => {
    if (typeof window==='undefined') return;
    const getActive = () => window.innerWidth<768 ? mobileRef.current : desktopRef.current;
    desktopRef.current?.load(); mobileRef.current?.load();
    const tick = () => {
      const v = getActive();
      if (v && v.readyState>=2) { const d=targetT.current-v.currentTime; if(Math.abs(d)>0.001)v.currentTime+=d*0.18; }
      rafRef.current=requestAnimationFrame(tick);
    };
    rafRef.current=requestAnimationFrame(tick);
    const ctx=gsap.context(()=>{
      ScrollTrigger.create({trigger:wrapRef.current,start:'top top',end:'+=220%',pin:true,scrub:true,
        onUpdate:(self)=>{ const dur=getActive()?.duration||4; targetT.current=self.progress*dur; }});
    });
    return ()=>{ cancelAnimationFrame(rafRef.current); ctx.revert(); };
  },[]);

  return (
    <div ref={wrapRef} style={{position:'relative',width:'100%',height:'100svh',background:CREAM,overflow:'hidden'}}>
      <video ref={desktopRef} src="/videos/fac-hero-scrub.mp4" muted playsInline preload="auto"
        style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',display:'block'}} className="fac-dv"/>
      <video ref={mobileRef} src="/videos/fac-hero-scrub.mp4" muted playsInline preload="auto"
        style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',display:'none'}} className="fac-mv"/>
      <div style={{position:'absolute',bottom:36,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:8,zIndex:10}}>
        <div style={{width:1,height:40,background:INK,opacity:0.2,position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,width:'100%',height:'40%',background:INK,opacity:0.5,animation:'fhSD 1.8s ease-in-out infinite'}}/>
        </div>
        <span style={{fontFamily:MONO,fontSize:9,letterSpacing:'0.22em',color:INK,opacity:0.3,textTransform:'uppercase'}}>scroll</span>
      </div>
      <style>{`@keyframes fhSD{0%{transform:translateY(-100%);opacity:1}80%{transform:translateY(250%);opacity:1}100%{transform:translateY(250%);opacity:0}} @media(max-width:767px){.fac-dv{display:none!important;}.fac-mv{display:block!important;}}`}</style>
    </div>
  );
}

/* ── TICKER ──────────────────────────────────── */
function TickerStrip() {
  const items=['ISO 22000:2018','FSSC 22000 v6','BRC Grade AA','NABL ISO/IEC 17025','FSSAI','Halal Certified','Kosher','APEDA','US FDA','EU Compliant','Spices Board India'];
  const d=[...items,...items];
  return (
    <div style={{background:INK,padding:'13px 0',overflow:'hidden',whiteSpace:'nowrap'}}>
      <div style={{display:'inline-flex',animation:'facS 28s linear infinite',willChange:'transform'}}>
        {d.map((c,i)=><span key={i} style={{fontFamily:MONO,fontSize:10,letterSpacing:'0.24em',color:'rgba(255,255,255,0.75)',textTransform:'uppercase',padding:'0 36px',flexShrink:0}}>✦ {c}</span>)}
      </div>
    </div>
  );
}

/* ── CURVED LOOP BREAK ───────────────────────── */
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

/* ── SKETCH IMAGE MARQUEE ────────────────────── */
function SketchImageMarquee() {
  const trackRef=useRef<HTMLDivElement>(null);
  const doubled=[...MARQUEE_IMGS,...MARQUEE_IMGS];
  useEffect(()=>{
    const el=trackRef.current; if(!el)return;
    let x=0; let raf:number;
    const totalW=el.scrollWidth/2;
    const tick=()=>{ x-=0.55; if(x<=-totalW)x=0; el.style.transform=`translateX(${x}px)`; raf=requestAnimationFrame(tick); };
    raf=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(raf);
  },[]);
  return (
    <div style={{overflow:'hidden',background:CREAM,padding:'clamp(36px,5vw,60px) 0'}}>
      <div ref={trackRef} style={{display:'flex',gap:14,width:'max-content',willChange:'transform'}}>
        {doubled.map((src,i)=>(
          <div key={i} style={{position:'relative',width:230,height:290,flexShrink:0,borderRadius:8,overflow:'hidden',border:'1px solid rgba(26,25,21,0.09)'}}>
            <div style={{position:'absolute',inset:0,background:CREAM,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',zIndex:0}}>
              <span style={{fontFamily:MONO,fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:INK,opacity:0.28,textAlign:'center',padding:'0 16px'}}>{MARQUEE_LABELS[i%8]}</span>
            </div>
            <img src={src} alt={MARQUEE_LABELS[i%8]} onError={e=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
              style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',zIndex:1}}/>
            <div style={{position:'absolute',bottom:12,left:12,zIndex:2}}>
              <span style={{fontFamily:MONO,fontSize:8,letterSpacing:'0.14em',textTransform:'uppercase',color:INK,opacity:0.5,background:'rgba(248,244,238,0.85)',padding:'3px 8px',borderRadius:4}}>{MARQUEE_LABELS[i%8]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── QUALITY FIRST ───────────────────────────── */
function MetricRow({label,desc,pct,index}:{label:string;desc:string;pct:number;index:number}) {
  const lineRef=useRef<SVGLineElement>(null); const dotRef=useRef<SVGCircleElement>(null); const rowRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(typeof window==='undefined')return; if(window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    const ctx=gsap.context(()=>{
      const W=180,target=(pct/100)*W; const st={trigger:rowRef.current!,start:'top 90%',once:true};
      gsap.fromTo(lineRef.current,{attr:{x2:0}},{attr:{x2:target},duration:1.4,ease:'power3.out',scrollTrigger:st});
      gsap.fromTo(dotRef.current,{attr:{cx:0}},{attr:{cx:target},duration:1.4,ease:'power3.out',scrollTrigger:st});
      gsap.fromTo(rowRef.current,{x:-20,opacity:0},{x:0,opacity:1,duration:0.6,ease:'power2.out',scrollTrigger:{trigger:rowRef.current!,start:'top 92%',once:true},delay:index*0.08});
    }); return ()=>ctx.revert();
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
  const secRef=useRef<HTMLElement>(null); const videoRef=useRef<HTMLDivElement>(null); const textRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(typeof window==='undefined')return; if(window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    const ctx=gsap.context(()=>{
      gsap.fromTo(videoRef.current,{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:1.4,ease:'power2.out',scrollTrigger:{trigger:secRef.current,start:'top 72%'}});
      gsap.fromTo(textRef.current,{x:48,opacity:0},{x:0,opacity:1,duration:0.9,ease:'power2.out',scrollTrigger:{trigger:secRef.current,start:'top 72%'},delay:0.2});
    },secRef); return ()=>ctx.revert();
  },[]);
  return (
    <section ref={secRef} style={{background:'#fff',overflow:'hidden'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'clamp(500px,58vw,760px)',alignItems:'stretch'}} className="qf-grid">
        <style>{`@media(max-width:860px){.qf-grid{grid-template-columns:1fr!important;}}`}</style>
        <div ref={videoRef} style={{position:'relative',minHeight:'clamp(340px,48vw,100%)',clipPath:'inset(0 100% 0 0)',overflow:'hidden'}}>
          <SketchVideoSlot src="/videos/inhouse-lab.mp4" label="Quality — NABL Lab" aspectRatio="unset" style={{position:'absolute',inset:0,aspectRatio:'unset',height:'100%',borderRadius:0}}/>
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

/* ── FACILITY NUMBERS ────────────────────────── */
function AnimatedCounter({val,suffix,duration=1.9}:{val:number;suffix:string;duration?:number}) {
  const spanRef=useRef<HTMLSpanElement>(null); const triggered=useRef(false);
  useEffect(()=>{
    if(typeof window==='undefined')return;
    if(window.matchMedia('(prefers-reduced-motion:reduce)').matches){if(spanRef.current)spanRef.current.textContent=val.toLocaleString()+suffix;return;}
    const ctx=gsap.context(()=>{
      ScrollTrigger.create({trigger:spanRef.current,start:'top 86%',once:true,onEnter:()=>{
        if(triggered.current)return; triggered.current=true;
        gsap.fromTo({n:0},{n:val},{duration,ease:'power2.out',onUpdate:function(){if(spanRef.current)spanRef.current.textContent=Math.round((this.targets()[0] as {n:number}).n).toLocaleString()+suffix;}});
      }});
    }); return ()=>ctx.revert();
  },[val,suffix,duration]);
  return <span ref={spanRef}>0{suffix}</span>;
}

function FacilityNumbers() {
  const secRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    if(typeof window==='undefined')return; if(window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    const ctx=gsap.context(()=>{
      gsap.utils.toArray<HTMLElement>('.fn-item').forEach((el,i)=>{gsap.fromTo(el,{y:48,opacity:0},{y:0,opacity:1,duration:0.75,ease:'power2.out',scrollTrigger:{trigger:secRef.current,start:'top 76%'},delay:i*0.1});});
    },secRef); return ()=>ctx.revert();
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

/* ── CERT WALL ───────────────────────────────── */
function CertWall() {
  const secRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    if(typeof window==='undefined')return; if(window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    const ctx=gsap.context(()=>{
      gsap.fromTo('.cw-head',{y:32,opacity:0},{y:0,opacity:1,duration:0.9,scrollTrigger:{trigger:secRef.current,start:'top 80%'}});
      gsap.utils.toArray<HTMLElement>('.cw-tile').forEach((el,i)=>{gsap.fromTo(el,{y:36,opacity:0,scale:0.97},{y:0,opacity:1,scale:1,duration:0.65,ease:'power2.out',scrollTrigger:{trigger:secRef.current,start:'top 72%'},delay:i*0.055});});
    },secRef); return ()=>ctx.revert();
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

/* ── FACTORY VISIT CTA ───────────────────────── */
function FactoryVisit() {
  const secRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    if(typeof window==='undefined')return; if(window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
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

/* ── PAGE ASSEMBLY ───────────────────────────── */
export default function FacilitiesPage() {
  return (
    <main style={{background:CREAM,color:INK,overflowX:'hidden'}}>
      <Hero/>
      <TickerStrip/>
      <FacilitiesAccordion/>
      <style>{`@keyframes facS{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </main>
  );
}


