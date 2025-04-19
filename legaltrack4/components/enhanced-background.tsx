"use client"

import { useEffect, useRef } from "react"

export default function EnhancedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Define colors with slightly reduced opacity
    const colors = [
      "rgba(33, 85, 164, 0.25)", // Primary blue - reduced opacity
      "rgba(65, 105, 225, 0.22)", // Royal blue - reduced opacity
      "rgba(30, 144, 255, 0.20)", // Dodger blue - reduced opacity
      "rgba(0, 71, 171, 0.18)", // Cobalt blue - reduced opacity
    ]

    // Define only the specific shapes we want
    const shapes = [
      { type: "scale", draw: (x, y, size, color, rotation) => drawScale(ctx, x, y, size, color, rotation) },
      { type: "book", draw: (x, y, size, color, rotation) => drawBook(ctx, x, y, size, color, rotation) },
      { type: "document", draw: (x, y, size, color, rotation) => drawDocument(ctx, x, y, size, color, rotation) },
      { type: "bubble", draw: (x, y, size, color, rotation) => drawBubble(ctx, x, y, size, color) },
    ]

    // Create particles - reduced count for less clutter
    const particles = []
    const particleCount = 40 // Reduced from 70 for less density

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 80 + 40
      const shapeIndex = Math.floor(Math.random() * shapes.length)
      const color = colors[Math.floor(Math.random() * colors.length)]

      // Create particle with pulsing effect
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        baseSize: size,
        speedX: (Math.random() - 0.5) * 0.2, // Slower movement
        speedY: (Math.random() - 0.5) * 0.2, // Slower movement
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01, // Slower rotation
        color: color,
        shape: shapes[shapeIndex],
        opacity: Math.random() * 0.4 + 0.3, // Slightly reduced opacity
        pulse: {
          active: Math.random() > 0.3, // 70% chance of pulsing
          speed: 0.01 + Math.random() * 0.015, // Slower pulse
          min: 0.8,
          max: 1.2,
          direction: 1,
        },
        colorShift: {
          active: Math.random() > 0.5, // 50% chance of color shifting
          hue: Math.random() * 30 - 15, // Reduced hue shift
          speed: 0.2 + Math.random() * 0.3,
        },
      })
    }

    // Animation loop
    let frameCount = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frameCount++

      // Draw particles
      particles.forEach((particle) => {
        // Move particle
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.rotation += particle.rotationSpeed

        // Pulse size if active
        if (particle.pulse.active) {
          const pulseAmount = Math.sin(frameCount * particle.pulse.speed) * 0.2 + 0.8
          particle.size = particle.baseSize * pulseAmount
        }

        // Color shift if active
        let color = particle.color
        if (particle.colorShift.active) {
          // Extract RGB from rgba string
          const rgba = particle.color.match(/rgba?$$(\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?$$/)
          if (rgba) {
            const r = Number.parseInt(rgba[1])
            const g = Number.parseInt(rgba[2])
            const b = Number.parseInt(rgba[3])

            // Apply subtle color shift based on time
            const shift = Math.sin(frameCount * particle.colorShift.speed * 0.01) * particle.colorShift.hue
            color = `rgba(${Math.min(255, Math.max(0, r + shift))}, ${Math.min(255, Math.max(0, g + shift))}, ${Math.min(255, Math.max(0, b + shift))}, ${particle.opacity})`
          }
        }

        // Wrap around edges
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size

        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity

        // Draw the shape
        particle.shape.draw(particle.x, particle.y, particle.size, color, particle.rotation)

        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" aria-hidden="true" />
  )
}

// Draw a scale of justice
function drawScale(ctx, x, y, size, color, rotation) {
  const s = size / 2

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.strokeStyle = color
  ctx.lineWidth = 3

  ctx.beginPath()
  // Base
  ctx.moveTo(-s * 0.8, s * 0.8)
  ctx.lineTo(s * 0.8, s * 0.8)
  // Stem
  ctx.moveTo(0, s * 0.8)
  ctx.lineTo(0, -s * 0.5)
  // Crossbar
  ctx.moveTo(-s * 0.7, -s * 0.5)
  ctx.lineTo(s * 0.7, -s * 0.5)
  // Left dish
  ctx.moveTo(-s * 0.7, -s * 0.5)
  ctx.bezierCurveTo(-s * 0.7, -s * 0.3, -s * 0.3, -s * 0.1, -s * 0.7, 0)
  // Right dish
  ctx.moveTo(s * 0.7, -s * 0.5)
  ctx.bezierCurveTo(s * 0.7, -s * 0.3, s * 0.3, -s * 0.1, s * 0.7, 0)

  ctx.stroke()
  ctx.restore()
}

// Draw a book
function drawBook(ctx, x, y, size, color, rotation) {
  const s = size / 2

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.strokeStyle = color
  ctx.lineWidth = 3

  ctx.beginPath()
  // Cover
  ctx.rect(-s * 0.7, -s * 0.5, s * 1.4, s)
  // Spine
  ctx.moveTo(-s * 0.7, -s * 0.5)
  ctx.lineTo(-s * 0.5, -s * 0.6)
  ctx.lineTo(s * 0.9, -s * 0.6)
  ctx.lineTo(s * 0.7, -s * 0.5)
  // Pages
  ctx.moveTo(-s * 0.5, -s * 0.6)
  ctx.lineTo(-s * 0.5, s * 0.6)
  ctx.lineTo(s * 0.9, s * 0.6)
  ctx.lineTo(s * 0.9, -s * 0.6)

  ctx.stroke()
  ctx.restore()
}

// Draw a document
function drawDocument(ctx, x, y, size, color, rotation) {
  const s = size / 2

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.strokeStyle = color
  ctx.lineWidth = 3

  ctx.beginPath()
  // Paper
  ctx.rect(-s * 0.6, -s * 0.7, s * 1.2, s * 1.4)
  // Lines
  ctx.moveTo(-s * 0.4, -s * 0.4)
  ctx.lineTo(s * 0.4, -s * 0.4)
  ctx.moveTo(-s * 0.4, -s * 0.1)
  ctx.lineTo(s * 0.4, -s * 0.1)
  ctx.moveTo(-s * 0.4, s * 0.2)
  ctx.lineTo(s * 0.4, s * 0.2)
  ctx.moveTo(-s * 0.4, s * 0.5)
  ctx.lineTo(s * 0.2, s * 0.5)

  ctx.stroke()
  ctx.restore()
}

// Draw a bubble (circle)
function drawBubble(ctx, x, y, size, color) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, size / 2, 0, Math.PI * 2)
  ctx.fill()
}

