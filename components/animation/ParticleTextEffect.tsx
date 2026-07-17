"use client"

import { useEffect, useRef } from "react"

interface Vector2D {
  x: number
  y: number
}

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 100
  maxSpeed = 1.0
  maxForce = 0.1
  particleSize = 10
  isKilled = false

  startColor = { r: 0, g: 0, b: 0 }
  targetColor = { r: 0, g: 0, b: 0 }
  colorWeight = 0
  colorBlendRate = 0.01 

  move() {
    let proximityMult = 1
    const distance = Math.sqrt(
      Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2)
    )
    
    if (distance < 1.0) {
      this.pos.x = this.target.x
      this.pos.y = this.target.y
      this.vel.x = 0
      this.vel.y = 0
      return
    }

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }
    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    }
    const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
    }
    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    }
    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce
      steer.y = (steer.y / steerMagnitude) * this.maxForce
    }
    this.acc.x += steer.x
    this.acc.y += steer.y
    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D, drawAsPoints: boolean) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    }
    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    }
    if (drawAsPoints) {
      ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
      ctx.fillRect(this.pos.x, this.pos.y, 2, 2)
    } else {
      ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
      ctx.beginPath()
      ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      const randomPos = this.generateRandomPos(width / 2, height / 2, (width + height) / 2)
      this.target.x = randomPos.x
      this.target.y = randomPos.y
      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      }
      this.targetColor = { r: 0, g: 0, b: 0 }
      this.colorWeight = 0
      this.isKilled = true
    }
  }

  private generateRandomPos(x: number, y: number, mag: number): Vector2D {
    const randomX = Math.random() * 1000
    const randomY = Math.random() * 500
    const direction = { x: randomX - x, y: randomY - y }
    const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag
      direction.y = (direction.y / magnitude) * mag
    }
    return { x: x + direction.x, y: y + direction.y }
  }
}

// Curated color palettes — crimson/gold/white for LV Spices
const PALETTES = [
  { r: 172, g: 3, b: 59 },     // Crimson
  { r: 255, g: 255, b: 255 },  // Pure white
  { r: 212, g: 168, b: 67 },   // Gold
  { r: 220, g: 80, b: 60 },    // Red-orange
  { r: 200, g: 200, b: 200 },  // Silver
]

const GOLD_PALETTE = [
  { r: 255, g: 200, b: 60 },   // Bright gold
  { r: 212, g: 168, b: 67 },   // Deep gold
  { r: 255, g: 220, b: 100 },  // Light gold
  { r: 230, g: 180, b: 50 },   // Warm gold
]

interface ParticleTextEffectProps {
  words?: string[]
  className?: string
  height?: number
  intervalFrames?: number
  fullScreen?: boolean
  goldMode?: boolean
  subtitle?: string
  scrollProgressRef?: React.MutableRefObject<number>
}

const LV_WORDS = [
  "LV SPICES",
  "EST. 1975",
  "PURITY",
  "PRECISION",
  "CRYOGENIC",
  "40+ NATIONS",
  "500+ SKUS",
  "QUALITY",
]

export function ParticleTextEffect({
  words = LV_WORDS,
  className = "",
  height = 420,
  intervalFrames = 220,
  fullScreen = false,
  goldMode = false,
  subtitle,
  scrollProgressRef,
}: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const frameCountRef = useRef(0)
  const isVisibleRef = useRef(true) // Track visibility
  const wordIndexRef = useRef(0)
  const paletteIndexRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false, isRightClick: false })

  const pixelSteps = 6
  const drawAsPoints = false

  const generateRandomPos = (x: number, y: number, mag: number): Vector2D => {
    const randomX = Math.random() * 1000
    const randomY = Math.random() * 500
    const direction = { x: randomX - x, y: randomY - y }
    const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag
      direction.y = (direction.y / magnitude) * mag
    }
    return { x: x + direction.x, y: y + direction.y }
  }

  const nextWord = (word: string, canvas: HTMLCanvasElement) => {
    const offscreenCanvas = document.createElement("canvas")
    offscreenCanvas.width = canvas.width
    offscreenCanvas.height = canvas.height
    const offscreenCtx = offscreenCanvas.getContext("2d")!

    // Responsive font size — start large, then shrink to fit
    const isMobile = canvas.width < 768
    let fontSize = isMobile
      ? Math.min(Math.floor(canvas.width * 0.16), 80)
      : Math.min(Math.floor(canvas.width * 0.11), 110)
    
    offscreenCtx.fillStyle = "white"
    offscreenCtx.font = `bold ${fontSize}px Arial, sans-serif`
    offscreenCtx.textAlign = "center"
    offscreenCtx.textBaseline = "middle"

    // Auto-shrink font until word fits (12px padding each side on mobile)
    const padding = isMobile ? 12 : 40
    const maxWidth = canvas.width - padding
    while (fontSize > 12) {
      offscreenCtx.font = `bold ${fontSize}px Arial, sans-serif`
      const measured = offscreenCtx.measureText(word).width
      if (measured <= maxWidth) break
      fontSize -= 2
    }

    offscreenCtx.fillText(word, canvas.width / 2, canvas.height / 2)

    const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    // Pick next palette color
    const activePalette = goldMode ? GOLD_PALETTE : PALETTES
    paletteIndexRef.current = (paletteIndexRef.current + 1) % activePalette.length
    const newColor = activePalette[paletteIndexRef.current]

    const particles = particlesRef.current
    let particleIndex = 0

    // Collect all valid solid pixels at 1px resolution
    const allCoords: number[] = []
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] > 150) {
        allCoords.push(i)
      }
    }

    // Shuffle the array to randomize
    for (let i = allCoords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[allCoords[i], allCoords[j]] = [allCoords[j], allCoords[i]]
    }

    // Pick a limited number of particles so it doesn't become a massive unreadable blob
    // This creates an organic, grid-free, beautifully scattered sand/crystal effect
    const targetCount = isMobile ? 3000 : 6000
    // Prevent it from being too dense on small words
    const maxDensity = Math.floor(allCoords.length * 0.20)
    const count = Math.min(targetCount, maxDensity)
    
    const coordsIndexes = allCoords.slice(0, count)
    
    // The shuffle above already randomized them, no need for second shuffle

    for (const coordIndex of coordsIndexes) {
      const x = (coordIndex / 4) % canvas.width
      const y = Math.floor(coordIndex / 4 / canvas.width)

        let particle: Particle
        if (particleIndex < particles.length) {
          particle = particles[particleIndex]
          particle.isKilled = false
          particleIndex++
        } else {
          particle = new Particle()
          const randomPos = generateRandomPos(canvas.width / 2, canvas.height / 2, (canvas.width + canvas.height) / 2)
          particle.pos.x = randomPos.x
          particle.pos.y = randomPos.y
          // Extremely fast speed so they form the word instantly instead of flying around
          particle.maxSpeed = Math.random() * 40 + 40
          particle.maxForce = particle.maxSpeed * 0.4
          // Round particles that overlap to form a solid, readable crystal word
          const isMob = canvas.width < 768
          particle.particleSize = isMob
            ? Math.random() * 2 + 1.5 // 1.5-3.5px
            : Math.random() * 2 + 2   // 2.0-4.0px
          // Faster color blend so color snaps immediately too
          particle.colorBlendRate = Math.random() * 0.15 + 0.1
          particles.push(particle)
        }

        particle.startColor = {
          r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
          g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
          b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
        }
        particle.targetColor = newColor
        particle.colorWeight = 0
        particle.target.x = x
        particle.target.y = y
    }

    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill(canvas.width, canvas.height)
    }
  }

  const animate = () => {
    // Only continue animation loop if it is visible
    if (!isVisibleRef.current) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    const particles = particlesRef.current

    // Dark background with motion blur trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]
      particle.move()
      particle.draw(ctx, drawAsPoints)
      if (particle.isKilled) {
        if (
          particle.pos.x < 0 ||
          particle.pos.x > canvas.width ||
          particle.pos.y < 0 ||
          particle.pos.y > canvas.height
        ) {
          particles.splice(i, 1)
        }
      }
    }

    // Right-click to destroy nearby particles
    if (mouseRef.current.isPressed && mouseRef.current.isRightClick) {
      particles.forEach((particle) => {
        const distance = Math.sqrt(
          Math.pow(particle.pos.x - mouseRef.current.x, 2) +
          Math.pow(particle.pos.y - mouseRef.current.y, 2)
        )
        if (distance < 50) {
          particle.kill(canvas.width, canvas.height)
        }
      })
    }

    frameCountRef.current++

    if (scrollProgressRef) {
      // Scroll controlled mode
      const progress = scrollProgressRef.current
      // Clamp progress between 0 and 0.999 to avoid index out of bounds
      const clampedProgress = Math.max(0, Math.min(progress, 0.999))
      const targetIndex = Math.floor(clampedProgress * words.length)
      
      if (targetIndex !== wordIndexRef.current) {
        wordIndexRef.current = targetIndex
        nextWord(words[wordIndexRef.current], canvas)
      }
    } else {
      // Timer mode
      if (frameCountRef.current % intervalFrames === 0) {
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length
        nextWord(words[wordIndexRef.current], canvas)
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const setSize = () => {
      const w = container.clientWidth || 1000
      const h = fullScreen ? (container.clientHeight || window.innerHeight) : height
      // On mobile use exact container width, on desktop cap at 1400
      canvas.width = w < 768 ? w : Math.min(w, 1400)
      canvas.height = Math.max(h, 200)
      nextWord(words[wordIndexRef.current], canvas)
    }

    setSize()
    nextWord(words[0], canvas)
    
    // Setup Intersection Observer to pause animation when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting
        })
      },
      { threshold: 0.01 } // Pause as soon as it's < 1% visible
    )
    observer.observe(container)

    animate()

    // Use ResizeObserver for reliable size tracking (especially for fullScreen mode)
    const ro = new ResizeObserver(() => setSize())
    ro.observe(container)

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isPressed = true
      mouseRef.current.isRightClick = e.button === 2
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - rect.left) * (canvas.width / rect.width)
      mouseRef.current.y = (e.clientY - rect.top) * (canvas.height / rect.height)
    }
    const handleMouseUp = () => {
      mouseRef.current.isPressed = false
      mouseRef.current.isRightClick = false
    }
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - rect.left) * (canvas.width / rect.width)
      mouseRef.current.y = (e.clientY - rect.top) * (canvas.height / rect.height)
    }
    const handleContextMenu = (e: MouseEvent) => e.preventDefault()
    const handleResize = () => setSize()

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("contextmenu", handleContextMenu)
    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      ro.disconnect()
      observer.disconnect()
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("contextmenu", handleContextMenu)
      window.removeEventListener("resize", handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: fullScreen ? "100%" : `${height}px`,
        background: "transparent",
        display: "block",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
      {subtitle && (
        <div style={{
          position: 'absolute',
          bottom: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          pointerEvents: 'none',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'monospace', fontSize: 'clamp(10px,1.2vw,13px)', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{subtitle}</p>
          <div style={{ width: 32, height: 1, background: '#AC033B', margin: '8px auto 0' }} />
        </div>
      )}
    </div>
  )
}

export default ParticleTextEffect
