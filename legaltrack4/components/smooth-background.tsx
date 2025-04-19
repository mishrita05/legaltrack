"use client"

import { useEffect, useRef } from "react"

export default function SmoothBackground() {
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

    // Define colors
    const colors = [
      "rgba(33, 85, 164, 0.1)", // Primary blue
      "rgba(65, 105, 225, 0.08)", // Royal blue
      "rgba(169, 169, 169, 0.07)", // Grey
      "rgba(192, 192, 192, 0.06)", // Silver
      "rgba(212, 175, 55, 0.05)", // Gold
      "rgba(70, 130, 180, 0.07)", // Steel blue
      "rgba(100, 149, 237, 0.06)", // Cornflower blue
    ]

    // Define legal icons as paths
    const icons = [
      { draw: (x: number, y: number, size: number) => drawScale(ctx, x, y, size) },
      { draw: (x: number, y: number, size: number) => drawGavel(ctx, x, y, size) },
      { draw: (x: number, y: number, size: number) => drawBook(ctx, x, y, size) },
      { draw: (x: number, y: number, size: number) => drawDocument(ctx, x, y, size) },
      { draw: (x: number, y: number, size: number) => drawShield(ctx, x, y, size) },
      { draw: (x: number, y: number, size: number) => drawBubble(ctx, x, y, size) },
    ]

    // Create particles
    const particles = []
    const particleCount = 25

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 40 + 20
      const iconIndex = Math.floor(Math.random() * icons.length)

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        speedX: (Math.random() - 0.5) * 0.2, // Slower speed
        speedY: (Math.random() - 0.5) * 0.2, // Slower speed
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005, // Very slow rotation
        color: colors[Math.floor(Math.random() * colors.length)],
        icon: icons[iconIndex],
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.forEach((particle) => {
        // Move particle
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.rotation += particle.rotationSpeed

        // Wrap around edges
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size

        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.strokeStyle = particle.color

        // Draw the icon
        particle.icon.draw(particle.x, particle.y, particle.size)

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
function drawScale(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const s = size / 2

  ctx.beginPath()
  // Base
  ctx.moveTo(x - s * 0.8, y + s * 0.8)
  ctx.lineTo(x + s * 0.8, y + s * 0.8)
  // Stem
  ctx.moveTo(x, y + s * 0.8)
  ctx.lineTo(x, y - s * 0.5)
  // Crossbar
  ctx.moveTo(x - s * 0.7, y - s * 0.5)
  ctx.lineTo(x + s * 0.7, y - s * 0.5)
  // Left dish
  ctx.moveTo(x - s * 0.7, y - s * 0.5)
  ctx.bezierCurveTo(x - s * 0.7, y - s * 0.3, x - s * 0.3, y - s * 0.1, x - s * 0.7, y)
  // Right dish
  ctx.moveTo(x + s * 0.7, y - s * 0.5)
  ctx.bezierCurveTo(x + s * 0.7, y - s * 0.3, x + s * 0.3, y - s * 0.1, x + s * 0.7, y)

  ctx.stroke()
}

// Draw a gavel
function drawGavel(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const s = size / 2

  ctx.beginPath()
  // Handle
  ctx.moveTo(x - s * 0.2, y - s * 0.8)
  ctx.lineTo(x + s * 0.8, y + s * 0.2)
  // Head
  ctx.moveTo(x - s * 0.6, y - s * 0.4)
  ctx.lineTo(x - s * 0.2, y - s * 0.8)
  ctx.lineTo(x + s * 0.2, y - s * 0.4)
  ctx.lineTo(x - s * 0.2, y)
  ctx.lineTo(x - s * 0.6, y - s * 0.4)

  ctx.stroke()
}

// Draw a book
function drawBook(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const s = size / 2

  ctx.beginPath()
  // Cover
  ctx.rect(x - s * 0.7, y - s * 0.5, s * 1.4, s)
  // Spine
  ctx.moveTo(x - s * 0.7, y - s * 0.5)
  ctx.lineTo(x - s * 0.5, y - s * 0.6)
  ctx.lineTo(x + s * 0.9, y - s * 0.6)
  ctx.lineTo(x + s * 0.7, y - s * 0.5)
  // Pages
  ctx.moveTo(x - s * 0.5, y - s * 0.6)
  ctx.lineTo(x - s * 0.5, y + s * 0.6)
  ctx.lineTo(x + s * 0.9, y + s * 0.6)
  ctx.lineTo(x + s * 0.9, y - s * 0.6)

  ctx.stroke()
}

// Draw a document
function drawDocument(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const s = size / 2

  ctx.beginPath()
  // Paper
  ctx.rect(x - s * 0.6, y - s * 0.7, s * 1.2, s * 1.4)
  // Lines
  ctx.moveTo(x - s * 0.4, y - s * 0.4)
  ctx.lineTo(x + s * 0.4, y - s * 0.4)
  ctx.moveTo(x - s * 0.4, y - s * 0.1)
  ctx.lineTo(x + s * 0.4, y - s * 0.1)
  ctx.moveTo(x - s * 0.4, y + s * 0.2)
  ctx.lineTo(x + s * 0.4, y + s * 0.2)
  ctx.moveTo(x - s * 0.4, y + s * 0.5)
  ctx.lineTo(x + s * 0.2, y + s * 0.5)

  ctx.stroke()
}

// Draw a shield
function drawShield(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const s = size / 2

  ctx.beginPath()
  // Shield outline
  ctx.moveTo(x, y - s * 0.8)
  ctx.lineTo(x + s * 0.7, y - s * 0.4)
  ctx.lineTo(x + s * 0.5, y + s * 0.8)
  ctx.lineTo(x, y + s * 0.5)
  ctx.lineTo(x - s * 0.5, y + s * 0.8)
  ctx.lineTo(x - s * 0.7, y - s * 0.4)
  ctx.lineTo(x, y - s * 0.8)

  // Emblem
  ctx.moveTo(x - s * 0.2, y)
  ctx.lineTo(x, y - s * 0.2)
  ctx.lineTo(x + s * 0.2, y)
  ctx.lineTo(x, y + s * 0.2)
  ctx.lineTo(x - s * 0.2, y)

  ctx.stroke()
}

// Draw a simple bubble
function drawBubble(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath()
  ctx.arc(x, y, size / 2, 0, Math.PI * 2)
  ctx.fill()
}

