'use client';

import { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture } from 'ogl';
import type { OGLRenderingContext } from 'ogl';
import './FlyingPosters.css';

type GL = OGLRenderingContext;

const vertexShader = `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uPosition;
uniform float uTime;
uniform float uSpeed;
uniform vec3 distortionAxis;
uniform vec3 rotationAxis;
uniform float uDistortion;
varying vec2 vUv;
float PI = 3.141592653589793238;
mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle); float c = cos(angle); float oc = 1.0 - c;
  return mat4(oc*axis.x*axis.x+c,oc*axis.x*axis.y-axis.z*s,oc*axis.z*axis.x+axis.y*s,0.0,oc*axis.x*axis.y+axis.z*s,oc*axis.y*axis.y+c,oc*axis.y*axis.z-axis.x*s,0.0,oc*axis.z*axis.x-axis.y*s,oc*axis.y*axis.z+axis.x*s,oc*axis.z*axis.z+c,0.0,0.0,0.0,0.0,1.0);
}
vec3 rotate(vec3 v, vec3 axis, float angle) { return (rotationMatrix(axis,angle)*vec4(v,1.0)).xyz; }
float qinticInOut(float t) { return t<0.5?16.0*pow(t,5.0):-0.5*abs(pow(2.0*t-2.0,5.0))+1.0; }
void main() {
  vUv = uv;
  float norm = 0.5;
  vec3 newpos = position;
  float offset = (dot(distortionAxis, position) + norm/2.) / norm;
  float localprogress = clamp((fract(uPosition*5.0*0.01)-0.01*uDistortion*offset)/(1.-0.01*uDistortion),0.,2.);
  localprogress = qinticInOut(localprogress) * PI;
  newpos = rotate(newpos, rotationAxis, localprogress);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}`;

const fragmentShader = `
precision highp float;
uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;
varying vec2 vUv;
void main() {
  vec2 imageAspect = uImageSize;
  vec2 planeAspect = uPlaneSize;
  float iA = imageAspect.x/imageAspect.y;
  float pA = planeAspect.x/planeAspect.y;
  vec2 scale = vec2(1.0,1.0);
  if(pA>iA) scale.x=iA/pA; else scale.y=pA/iA;
  vec2 uv = vUv*scale+(1.0-scale)*0.5;
  gl_FragColor = texture2D(tMap,uv);
}`;

function lerp(p1: number, p2: number, t: number) { return p1+(p2-p1)*t; }
function map(num: number, min1: number, max1: number, min2: number, max2: number) { return ((num-min1)/(max1-min1))*(max2-min2)+min2; }

interface ScrollState { position?: number; ease: number; current: number; target: number; last: number; }

class Media {
  gl!: GL; geometry!: Plane; scene!: Transform; screen!: {width:number;height:number};
  viewport!: {width:number;height:number}; image!: string; length!: number; index!: number;
  planeWidth!: number; planeHeight!: number; distortion!: number;
  program!: Program; plane!: Mesh;
  extra=0; padding=0; height=0; heightTotal=0; y=0;

  constructor(p: { gl: GL; geometry: Plane; scene: Transform; screen: {width:number;height:number}; viewport: {width:number;height:number}; image: string; length: number; index: number; planeWidth: number; planeHeight: number; distortion: number }) {
    Object.assign(this, p);
    this.createShader(); this.createMesh(); this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false, depthWrite: false, fragment: fragmentShader, vertex: vertexShader,
      uniforms: { tMap:{value:texture}, uPosition:{value:0}, uPlaneSize:{value:[0,0]}, uImageSize:{value:[0,0]}, uSpeed:{value:0}, rotationAxis:{value:[0,1,0]}, distortionAxis:{value:[1,1,0]}, uDistortion:{value:this.distortion}, uViewportSize:{value:[this.viewport.width,this.viewport.height]}, uTime:{value:0} },
      cullFace: false
    });
    const img = new Image(); img.crossOrigin='anonymous'; img.src=this.image;
    img.onload = () => { texture.image=img; this.program.uniforms.uImageSize.value=[img.naturalWidth,img.naturalHeight]; };
  }

  createMesh() { this.plane=new Mesh(this.gl,{geometry:this.geometry,program:this.program}); this.plane.setParent(this.scene); }

  setScale() {
    this.plane.scale.x=(this.viewport.width*this.planeWidth)/this.screen.width;
    this.plane.scale.y=(this.viewport.height*this.planeHeight)/this.screen.height;
    this.plane.position.x=0;
    this.program.uniforms.uPlaneSize.value=[this.plane.scale.x,this.plane.scale.y];
  }

  onResize({ screen, viewport }: { screen?: {width:number;height:number}; viewport?: {width:number;height:number} } = {}) {
    if (screen) this.screen=screen;
    if (viewport) { this.viewport=viewport; this.program.uniforms.uViewportSize.value=[viewport.width,viewport.height]; }
    this.setScale();
    this.padding=5; this.height=this.plane.scale.y+this.padding;
    this.heightTotal=this.height*this.length; this.y=-this.heightTotal/2+(this.index+0.5)*this.height;
  }

  update(scroll: ScrollState) {
    this.plane.position.y=this.y-scroll.current-this.extra;
    const position=map(this.plane.position.y,-this.viewport.height,this.viewport.height,5,15);
    this.program.uniforms.uPosition.value=position;
    this.program.uniforms.uTime.value+=0.04;
    this.program.uniforms.uSpeed.value=scroll.current;
    const ph=this.plane.scale.y, vh=this.viewport.height;
    if (this.plane.position.y+ph/2<-vh/2) this.extra-=this.heightTotal;
    else if (this.plane.position.y-ph/2>vh/2) this.extra+=this.heightTotal;
  }
}

class Canvas {
  container: HTMLElement; canvas: HTMLCanvasElement; items: string[];
  planeWidth: number; planeHeight: number; distortion: number; scroll: ScrollState;
  cameraFov: number; cameraZ: number;
  renderer!: Renderer; gl!: GL; camera!: Camera; scene!: Transform;
  planeGeometry!: Plane; medias!: Media[];
  screen!: {width:number;height:number}; viewport!: {width:number;height:number};
  isDown=false; start=0; raf=0;

  onResize: () => void;
  onWheel: (e: WheelEvent) => void;
  onTouchDown: (e: MouseEvent|TouchEvent) => void;
  onTouchMove: (e: MouseEvent|TouchEvent) => void;
  onTouchUp: () => void;
  update: () => void;

  constructor({ container, canvas, items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ }: { container: HTMLElement; canvas: HTMLCanvasElement; items: string[]; planeWidth: number; planeHeight: number; distortion: number; scrollEase: number; cameraFov: number; cameraZ: number }) {
    this.container=container; this.canvas=canvas; this.items=items;
    this.planeWidth=planeWidth; this.planeHeight=planeHeight; this.distortion=distortion;
    this.scroll={ease:scrollEase,current:0,target:0,last:0};
    this.cameraFov=cameraFov; this.cameraZ=cameraZ;

    this.onResize=this._onResize.bind(this); this.onWheel=this._onWheel.bind(this);
    this.onTouchDown=this._onTouchDown.bind(this); this.onTouchMove=this._onTouchMove.bind(this); this.onTouchUp=this._onTouchUp.bind(this);
    this.update=this._update.bind(this);

    this._createRenderer(); this._createCamera(); this._createScene(); this._onResize();
    this._createGeometry(); this._createMedias(); this._update(); this._addEventListeners();
  }

  _createRenderer() { this.renderer=new Renderer({canvas:this.canvas,alpha:true,antialias:true,dpr:Math.min(window.devicePixelRatio,2)}); this.gl=this.renderer.gl; }
  _createCamera() { this.camera=new Camera(this.gl); this.camera.fov=this.cameraFov; this.camera.position.z=this.cameraZ; }
  _createScene() { this.scene=new Transform(); }
  _createGeometry() { this.planeGeometry=new Plane(this.gl,{heightSegments:1,widthSegments:100}); }
  _createMedias() { this.medias=this.items.map((image,index)=>new Media({gl:this.gl,geometry:this.planeGeometry,scene:this.scene,screen:this.screen,viewport:this.viewport,image,length:this.items.length,index,planeWidth:this.planeWidth,planeHeight:this.planeHeight,distortion:this.distortion})); }

  _onResize() {
    const rect=this.container.getBoundingClientRect();
    this.screen={width:rect.width,height:rect.height};
    this.renderer.setSize(this.screen.width,this.screen.height);
    this.camera.perspective({aspect:this.gl.canvas.width/this.gl.canvas.height});
    const fov=(this.camera.fov*Math.PI)/180, height=2*Math.tan(fov/2)*this.camera.position.z;
    this.viewport={width:height*(this.screen.width/this.screen.height),height};
    this.medias?.forEach(m=>m.onResize({screen:this.screen,viewport:this.viewport}));
  }

  _onTouchDown(e: MouseEvent|TouchEvent) { this.isDown=true; this.scroll.position=this.scroll.current; this.start=e instanceof TouchEvent?e.touches[0].clientY:(e as MouseEvent).clientY; }
  _onTouchMove(e: MouseEvent|TouchEvent) { if(!this.isDown||!this.scroll.position)return; const y=e instanceof TouchEvent?e.touches[0].clientY:(e as MouseEvent).clientY; this.scroll.target=this.scroll.position+(this.start-y)*0.1; }
  _onTouchUp() { this.isDown=false; }
  _onWheel(e: WheelEvent) { this.scroll.target+=e.deltaY*0.005; }

  _update() {
    this.scroll.current=lerp(this.scroll.current,this.scroll.target,this.scroll.ease);
    this.medias?.forEach(m=>m.update(this.scroll));
    this.renderer.render({scene:this.scene,camera:this.camera});
    this.scroll.last=this.scroll.current;
    this.raf=requestAnimationFrame(this.update);
  }

  _addEventListeners() {
    window.addEventListener('resize',this.onResize); window.addEventListener('wheel',this.onWheel);
    window.addEventListener('mousedown',this.onTouchDown); window.addEventListener('mousemove',this.onTouchMove); window.addEventListener('mouseup',this.onTouchUp);
    window.addEventListener('touchstart',this.onTouchDown as EventListener); window.addEventListener('touchmove',this.onTouchMove as EventListener); window.addEventListener('touchend',this.onTouchUp as EventListener);
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize',this.onResize); window.removeEventListener('wheel',this.onWheel);
    window.removeEventListener('mousedown',this.onTouchDown); window.removeEventListener('mousemove',this.onTouchMove); window.removeEventListener('mouseup',this.onTouchUp);
    window.removeEventListener('touchstart',this.onTouchDown as EventListener); window.removeEventListener('touchmove',this.onTouchMove as EventListener); window.removeEventListener('touchend',this.onTouchUp as EventListener);
  }
}

interface FlyingPostersProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: string[]; planeWidth?: number; planeHeight?: number;
  distortion?: number; scrollEase?: number; cameraFov?: number; cameraZ?: number;
}

export default function FlyingPosters({ items=[], planeWidth=320, planeHeight=320, distortion=3, scrollEase=0.01, cameraFov=45, cameraZ=20, className, ...props }: FlyingPostersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<Canvas|null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    instanceRef.current = new Canvas({ container:containerRef.current, canvas:canvasRef.current, items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ });
    return () => { instanceRef.current?.destroy(); instanceRef.current=null; };
  }, [items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const el = canvasRef.current;
    const handleWheel = (e: WheelEvent) => { e.preventDefault(); instanceRef.current?.onWheel(e); };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div ref={containerRef} className={`posters-container ${className??''}`} {...props}>
      <canvas ref={canvasRef} className="posters-canvas" />
    </div>
  );
}
