"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  type: "bubble" | "blob" | "square"
  rotation: number
  rotationSpeed: number
  pulseSpeed: number
  pulseDirection: 1 | -1
  pulseAmount: number
}

export default function AdvancedAnimatedBackground() {
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

    // Create particles
    const particles: Particle[] = []
    const colors = [
      "rgba(33, 85, 164, 0.15)", // Primary blue
      "rgba(65, 105, 225, 0.12)", // Royal blue
      "rgba(100, 149, 237, 0.08)", // Cornflower blue
      "rgba(30, 144, 255, 0.1)", // Dodger blue
      "rgba(0, 191, 255, 0.06)", // Deep sky blue
    ]

    const types: ("bubble" | "blob" | "square")[] = ["bubble", "blob", "square"]

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 120 + 40,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.15 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        pulseSpeed: Math.random() * 0.01 + 0.005,
        pulseDirection: Math.random() > 0.5 ? 1 : -1,
        pulseAmount: Math.random() * 0.2 + 0.1,
      })
    }

    // Draw blob shape
    const drawBlob = (x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      ctx.beginPath()

      // Create a blob with 5-8 points
      const points = Math.floor(Math.random() * 4) + 5
      const angleStep = (Math.PI * 2) / points

      for (let i = 0; i < points; i++) {
        const angle = i * angleStep
        const radiusVariation = size * (0.8 + Math.sin(i * 2) * 0.2)
        const px = Math.cos(angle) * radiusVariation
        const py = Math.sin(angle) * radiusVariation

        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          // Use quadratic curves for smoother blob
          const prevAngle = (i - 1) * angleStep
          const cpX = Math.cos(prevAngle + angleStep / 2) * size * 1.2
          const cpY = Math.sin(prevAngle + angleStep / 2) * size * 1.2
          ctx.quadraticCurveTo(cpX, cpY, px, py)
        }
      }

      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    // Draw square with rounded corners
    const drawSquare = (x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      const cornerRadius = size * 0.2
      const halfSize = size / 2

      ctx.beginPath()
      ctx.moveTo(-halfSize + cornerRadius, -halfSize)
      ctx.lineTo(halfSize - cornerRadius, -halfSize)
      ctx.quadraticCurveTo(halfSize, -halfSize, halfSize, -halfSize + cornerRadius)
      ctx.lineTo(halfSize, halfSize - cornerRadius)
      ctx.quadraticCurveTo(halfSize, halfSize, halfSize - cornerRadius, halfSize)
      ctx.lineTo(-halfSize + cornerRadius, halfSize)
      ctx.quadraticCurveTo(-halfSize, halfSize, -halfSize, halfSize - cornerRadius)
      ctx.lineTo(-halfSize, -halfSize + cornerRadius)
      ctx.quadraticCurveTo(-halfSize, -halfSize, -halfSize + cornerRadius, -halfSize)
      ctx.closePath()

      ctx.fill()
      ctx.restore()
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

        // Pulse size
        particle.size += particle.pulseSpeed * particle.pulseDirection
        if (
          particle.size > particle.size * (1 + particle.pulseAmount) ||
          particle.size < particle.size * (1 - particle.pulseAmount)
        ) {
          particle.pulseDirection *= -1
        }

        // Bounce off edges
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size

        // Set fill style
        ctx.fillStyle = particle.color

        // Draw based on type
        if (particle.type === "bubble") {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else if (particle.type === "blob") {
          drawBlob(particle.x, particle.y, particle.size, particle.rotation)
        } else if (particle.type === "square") {
          drawSquare(particle.x, particle.y, particle.size, particle.rotation)
        }
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

