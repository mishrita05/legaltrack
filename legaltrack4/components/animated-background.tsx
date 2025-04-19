"use client"

import { useEffect, useRef } from "react"

interface Bubble {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export default function AnimatedBackground() {
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

    // Create bubbles
    const bubbles: Bubble[] = []
    const colors = [
      "rgba(33, 85, 164, 0.2)", // Primary blue
      "rgba(65, 105, 225, 0.15)", // Royal blue
      "rgba(100, 149, 237, 0.1)", // Cornflower blue
      "rgba(30, 144, 255, 0.12)", // Dodger blue
      "rgba(0, 191, 255, 0.08)", // Deep sky blue
    ]

    for (let i = 0; i < 20; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.2 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw bubbles
      bubbles.forEach((bubble) => {
        // Move bubble
        bubble.x += bubble.speedX
        bubble.y += bubble.speedY

        // Bounce off edges
        if (bubble.x < -bubble.size) bubble.x = canvas.width + bubble.size
        if (bubble.x > canvas.width + bubble.size) bubble.x = -bubble.size
        if (bubble.y < -bubble.size) bubble.y = canvas.height + bubble.size
        if (bubble.y > canvas.height + bubble.size) bubble.y = -bubble.size

        // Draw bubble
        ctx.beginPath()
        ctx.fillStyle = bubble.color
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2)
        ctx.fill()
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

