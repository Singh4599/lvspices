import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';
import './CircularGallery.css';

type GL = Renderer['gl'];

function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number) {
  let timeout: number;
  return function (this: unknown, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: unknown): void {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof (instance as Record<string,unknown>)[key] === 'function') {
      (instance as Record<string,unknown>)[key] = ((instance as Record<string,Function>)[key]).bind(instance);
    }
  });
}

const DEFAULT_FONT = 'bold 30px Figtree';
const DEFAULT_FONT_URL = 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;700&display=swap';

function deriveFontFamilyFromUrl(url: string): string {
  const fileName = (url.split('/').pop() || 'custom-font').split('?')[0];
  const base = fileName.replace(/\.(woff2?|ttf|otf|eot)$/i, '');
  return base.replace(/[^a-zA-Z0-9-_ ]/g, '').trim() || 'CircularGalleryFont';
}

async function loadFontFromStylesheet(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch font stylesheet (${response.status})`);
  const cssText = await response.text();
  const faceBlocks = cssText.match(/@font-face\s*{[^}]*}/g) || [];
  let family: string | null = null;
  const fontFaces: FontFace[] = [];
  for (const block of faceBlocks) {
    const familyMatch = block.match(/font-family:\s*['"]?([^;'"]+)['"]?/);
    const urlMatch = block.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/);
    if (!familyMatch || !urlMatch) continue;
    family = familyMatch[1].trim();
    const descriptors: FontFaceDescriptors = {};
    const weightMatch = block.match(/font-weight:\s*([^;]+);/);
    const styleMatch = block.match(/font-style:\s*([^;]+);/);
    const rangeMatch = block.match(/unicode-range:\s*([^;]+);/);
    if (weightMatch) descriptors.weight = weightMatch[1].trim();
    if (styleMatch) descriptors.style = styleMatch[1].trim();
    if (rangeMatch) descriptors.unicodeRange = rangeMatch[1].trim();
    fontFaces.push(new FontFace(family, `url(${urlMatch[1]})`, descriptors));
  }
  if (!family) throw new Error('No @font-face rule found in the stylesheet');
  await Promise.allSettled(fontFaces.map(async face => { await face.load(); document.fonts.add(face); }));
  return family;
}

async function loadFontFromFile(url: string): Promise<string> {
  const family = deriveFontFamilyFromUrl(url);
  const fontFace = new FontFace(family, `url(${url})`);
  await fontFace.load();
  document.fonts.add(fontFace);
  return family;
}

async function loadCustomFont(fontUrl: string): Promise<string> {
  const isStylesheet = fontUrl.includes('fonts.googleapis.com') || /\.css(\?.*)?$/i.test(fontUrl);
  return isStylesheet ? loadFontFromStylesheet(fontUrl) : loadFontFromFile(fontUrl);
}

async function resolveFont(font: string, fontUrl?: string): Promise<string> {
  const effectiveUrl = fontUrl || (font === DEFAULT_FONT ? DEFAULT_FONT_URL : null);
  if (!effectiveUrl) {
    if (document.fonts?.load) { try { await document.fonts.load(font); await document.fonts.ready; } catch { /* */ } }
    return font;
  }
  try {
    const family = await loadCustomFont(effectiveUrl);
    const sizeMatch = font.match(/^\s*(.*?\d+px)/);
    const prefix = sizeMatch ? sizeMatch[1].trim() : 'bold 30px';
    const resolved = `${prefix} "${family}"`;
    if (document.fonts?.load) { try { await document.fonts.load(resolved); } catch { /* */ } }
    return resolved;
  } catch (error) {
    console.error('CircularGallery: unable to load font from', fontUrl, error);
    return font;
  }
}

function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}

function createTextTexture(gl: GL, text: string, font = 'bold 30px monospace', color = 'white') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const fontSize = getFontSize(font);
  const textHeight = Math.ceil(fontSize * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  gl!: GL; plane!: Mesh; renderer!: Renderer; text!: string; textColor!: string; font!: string; mesh!: Mesh;
  constructor({ gl, plane, renderer, text, textColor = '#ffffff', font = '30px sans-serif' }: { gl: GL; plane: Mesh; renderer: Renderer; text: string; textColor?: string; font?: string }) {
    autoBind(this);
    Object.assign(this, { gl, plane, renderer, text, textColor, font });
    this.createMesh();
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragment: `precision highp float;uniform sampler2D tMap;varying vec2 vUv;void main(){vec4 color=texture2D(tMap,vUv);if(color.a<0.1)discard;gl_FragColor=color;}`,
      uniforms: { tMap: { value: texture } }, transparent: true
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeightScaled = this.plane.scale.y * 0.15;
    this.mesh.scale.set(textHeightScaled * aspect, textHeightScaled, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeightScaled * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  extra = 0; geometry!: Plane; gl!: GL; image!: string; index!: number; length!: number;
  renderer!: Renderer; scene!: Transform; screen!: {width:number;height:number}; text!: string;
  viewport!: {width:number;height:number}; bend!: number; originalBend!: number; textColor!: string; borderRadius!: number;
  font?: string; program!: Program; plane!: Mesh; title!: Title;
  scale!: number; padding!: number; width!: number; widthTotal!: number; x!: number;
  speed = 0; isBefore = false; isAfter = false;

  constructor(p: { geometry: Plane; gl: GL; image: string; index: number; length: number; renderer: Renderer; scene: Transform; screen: {width:number;height:number}; text: string; viewport: {width:number;height:number}; bend: number; textColor: string; borderRadius?: number; font?: string }) {
    Object.assign(this, p);
    this.originalBend = p.bend;
    this.borderRadius = p.borderRadius ?? 0;
    this.createShader(); this.createMesh(); this.createTitle(); this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false, depthWrite: false,
      vertex: `precision highp float;attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform float uTime;uniform float uSpeed;varying vec2 vUv;void main(){vUv=uv;vec3 p=position;p.z=(sin(p.x*4.0+uTime)*1.5+cos(p.y*2.0+uTime)*1.5)*(0.1+uSpeed*0.5);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
      fragment: `precision highp float;uniform vec2 uImageSizes;uniform vec2 uPlaneSizes;uniform sampler2D tMap;uniform float uBorderRadius;varying vec2 vUv;float roundedBoxSDF(vec2 p,vec2 b,float r){vec2 d=abs(p)-b;return length(max(d,vec2(0.0)))+min(max(d.x,d.y),0.0)-r;}void main(){vec2 ratio=vec2(min((uPlaneSizes.x/uPlaneSizes.y)/(uImageSizes.x/uImageSizes.y),1.0),min((uPlaneSizes.y/uPlaneSizes.x)/(uImageSizes.y/uImageSizes.x),1.0));vec2 uv=vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5,vUv.y*ratio.y+(1.0-ratio.y)*0.5);vec4 color=texture2D(tMap,uv);float d=roundedBoxSDF(vUv-0.5,vec2(0.5-uBorderRadius),uBorderRadius);float alpha=1.0-smoothstep(-0.002,0.002,d);gl_FragColor=vec4(color.rgb,alpha);}`,
      uniforms: { tMap: { value: texture }, uPlaneSizes: { value: [0,0] }, uImageSizes: { value: [0,0] }, uSpeed: { value: 0 }, uTime: { value: 100*Math.random() }, uBorderRadius: { value: this.borderRadius } },
      transparent: true
    });
    const img = new Image(); img.crossOrigin = 'anonymous'; img.src = this.image;
    img.onload = () => { texture.image = img; this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]; };
  }

  createMesh() { this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program }); this.plane.setParent(this.scene); }
  createTitle() { this.title = new Title({ gl: this.gl, plane: this.plane, renderer: this.renderer, text: this.text, textColor: this.textColor, font: this.font }); }

  update(scroll: {current:number;last:number}, direction: 'right'|'left') {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x, H = this.viewport.width / 2;
    if (this.bend === 0) { this.plane.position.y = 0; this.plane.rotation.z = 0; }
    else {
      const B_abs = Math.abs(this.bend), R = (H*H+B_abs*B_abs)/(2*B_abs), effectiveX = Math.min(Math.abs(x),H);
      const arc = R - Math.sqrt(R*R - effectiveX*effectiveX);
      if (this.bend > 0) { this.plane.position.y = -arc; this.plane.rotation.z = -Math.sign(x)*Math.asin(effectiveX/R); }
      else { this.plane.position.y = arc; this.plane.rotation.z = Math.sign(x)*Math.asin(effectiveX/R); }
    }
    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;
    const po = this.plane.scale.x/2, vo = this.viewport.width/2;
    this.isBefore = this.plane.position.x + po < -vo;
    this.isAfter = this.plane.position.x - po > vo;
    if (direction === 'right' && this.isBefore) { this.extra -= this.widthTotal; this.isBefore = this.isAfter = false; }
    if (direction === 'left' && this.isAfter) { this.extra += this.widthTotal; this.isBefore = this.isAfter = false; }
  }

  onResize({ screen, viewport }: { screen?: {width:number;height:number}; viewport?: {width:number;height:number} } = {}) {
    if (screen) this.screen = screen;
    if (viewport) { this.viewport = viewport; }
    this.scale = this.screen.height / 1500;
    // Shrink items on narrow screens so they don't overflow
    const mobileFactor = this.screen.width <= 768 ? 0.85 : 1;
    // Reduce bend on mobile so images stay centered in shorter container
    this.bend = this.screen.width <= 768 ? this.originalBend * 0.5 : this.originalBend;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale * mobileFactor)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale * mobileFactor)) / this.screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 2; this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length; this.x = this.width * this.index;
  }
}

class App {
  container: HTMLElement; scrollSpeed: number;
  scroll: { ease: number; current: number; target: number; last: number; position?: number };
  onCheckDebounce: (...args: unknown[]) => void;
  renderer!: Renderer; gl!: GL; camera!: Camera; scene!: Transform;
  planeGeometry!: Plane; medias: Media[] = []; mediasImages: {image:string;text:string}[] = [];
  screen!: {width:number;height:number}; viewport!: {width:number;height:number}; raf = 0;
  boundOnResize!: () => void; boundOnWheel!: (e: Event) => void;
  boundOnTouchDown!: (e: MouseEvent|TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent|TouchEvent) => void; boundOnTouchUp!: (e: MouseEvent|TouchEvent) => void;
  isDown = false; start = 0; startX = 0;
  onItemClick?: (index: number) => void;

  constructor(container: HTMLElement, { items, bend=1, textColor='#ffffff', borderRadius=0, font='bold 30px Figtree', scrollSpeed=2, scrollEase=0.05, onItemClick }: { items?: {image:string;text:string}[]; bend?: number; textColor?: string; borderRadius?: number; font?: string; scrollSpeed?: number; scrollEase?: number; onItemClick?: (index: number) => void }) {
    this.container = container; this.scrollSpeed = scrollSpeed;
    this.onItemClick = onItemClick;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.createRenderer(); this.createCamera(); this.createScene(); this.onResize();
    this.createGeometry(); this.createMedias(items, bend, textColor, borderRadius, font);
    this.update(); this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio||1,2) });
    this.gl = this.renderer.gl; this.gl.clearColor(0,0,0,0);
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }
  createCamera() { this.camera = new Camera(this.gl); this.camera.fov = 45; this.camera.position.z = 20; }
  createScene() { this.scene = new Transform(); }
  createGeometry() { this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 }); }

  createMedias(items: {image:string;text:string}[]|undefined, bend: number, textColor: string, borderRadius: number, font: string) {
    const galleryItems = items?.length ? items : [];
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => new Media({ geometry: this.planeGeometry, gl: this.gl, image: data.image, index, length: this.mediasImages.length, renderer: this.renderer, scene: this.scene, screen: this.screen, text: data.text, viewport: this.viewport, bend, textColor, borderRadius, font }));
  }

  onTouchDown(e: MouseEvent|TouchEvent) { this.isDown=true; this.scroll.position=this.scroll.current; this.startX='touches' in e?e.touches[0].clientX:e.clientX; this.start=this.startX; }
  onTouchMove(e: MouseEvent|TouchEvent) { if(!this.isDown)return; const x='touches' in e?e.touches[0].clientX:e.clientX; this.scroll.target=(this.scroll.position??0)+(this.startX-x)*(this.scrollSpeed*0.025); }
  onTouchUp(e: MouseEvent|TouchEvent) {
    this.isDown=false;
    const endX='touches' in e?(e as TouchEvent).changedTouches[0]?.clientX??this.startX:(e as MouseEvent).clientX;
    const dragDist=Math.abs(endX-this.startX);
    if(dragDist<8&&this.onItemClick&&this.medias.length>0){
      const w=this.medias[0].width;
      const idx=Math.round(Math.abs(this.scroll.current)/w);
      const realIdx=idx%(this.mediasImages.length/2||(this.mediasImages.length||1));
      this.onItemClick(realIdx);
    }
    this.onCheck();
  }
  onWheel(e: Event) { const we=e as WheelEvent; const delta=we.deltaY||(we as unknown as {wheelDelta:number}).wheelDelta; this.scroll.target+=(delta>0?this.scrollSpeed:-this.scrollSpeed)*0.2; this.onCheckDebounce(); }
  onCheck() { if(!this.medias?.[0])return; const w=this.medias[0].width; const idx=Math.round(Math.abs(this.scroll.target)/w); this.scroll.target=this.scroll.target<0?-(w*idx):w*idx; }

  onResize() {
    this.screen={width:this.container.clientWidth,height:this.container.clientHeight};
    this.renderer.setSize(this.screen.width,this.screen.height);
    this.camera.perspective({aspect:this.screen.width/this.screen.height});
    const fov=(this.camera.fov*Math.PI)/180, height=2*Math.tan(fov/2)*this.camera.position.z;
    this.viewport={width:height*(this.screen.width/this.screen.height),height};
    this.medias?.forEach(m=>m.onResize({screen:this.screen,viewport:this.viewport}));
  }

  update() {
    this.scroll.current=lerp(this.scroll.current,this.scroll.target,this.scroll.ease);
    const direction=this.scroll.current>this.scroll.last?'right':'left';
    this.medias?.forEach(m=>m.update(this.scroll,direction));
    this.renderer.render({scene:this.scene,camera:this.camera});
    this.scroll.last=this.scroll.current;
    this.raf=window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize=this.onResize.bind(this); this.boundOnWheel=this.onWheel.bind(this);
    this.boundOnTouchDown=this.onTouchDown.bind(this); this.boundOnTouchMove=this.onTouchMove.bind(this); this.boundOnTouchUp=this.onTouchUp.bind(this);
    this.container.addEventListener('mousedown',this.boundOnTouchDown); window.addEventListener('mousemove',this.boundOnTouchMove); this.container.addEventListener('mouseup',this.boundOnTouchUp);
    window.addEventListener('resize',this.boundOnResize); window.addEventListener('wheel',this.boundOnWheel);
    this.container.addEventListener('touchstart',this.boundOnTouchDown); window.addEventListener('touchmove',this.boundOnTouchMove); this.container.addEventListener('touchend',this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize',this.boundOnResize); window.removeEventListener('wheel',this.boundOnWheel);
    this.container.removeEventListener('mousedown',this.boundOnTouchDown); window.removeEventListener('mousemove',this.boundOnTouchMove); this.container.removeEventListener('mouseup',this.boundOnTouchUp);
    this.container.removeEventListener('touchstart',this.boundOnTouchDown); window.removeEventListener('touchmove',this.boundOnTouchMove); this.container.removeEventListener('touchend',this.boundOnTouchUp);
    if(this.renderer?.gl?.canvas?.parentNode) this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }
}

interface CircularGalleryProps {
  items?: {image:string;text:string}[];
  bend?: number; textColor?: string; borderRadius?: number;
  font?: string; fontUrl?: string; scrollSpeed?: number; scrollEase?: number;
  onItemClick?: (index: number) => void;
}

export default function CircularGallery({ items, bend=3, textColor='#ffffff', borderRadius=0.05, font='bold 30px Figtree', fontUrl, scrollSpeed=2, scrollEase=0.05, onItemClick }: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    let app: App|undefined, isMounted=true;
    resolveFont(font, fontUrl).then(resolvedFont => {
      if (!isMounted || !containerRef.current) return;
      app = new App(containerRef.current, { items, bend, textColor, borderRadius, font: resolvedFont, scrollSpeed, scrollEase, onItemClick });
    });
    return () => { isMounted=false; app?.destroy(); };
  }, [items, bend, textColor, borderRadius, font, fontUrl, scrollSpeed, scrollEase, onItemClick]);
  return <div className="circular-gallery" ref={containerRef} style={{ cursor: onItemClick ? 'pointer' : 'grab' }} />;
}
