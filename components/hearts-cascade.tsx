"use client"

import { useEffect, useState } from "react"

interface Heart {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  opacity: number
  emoji: string
}

const heartEmojis = ["❤️", "💖", "💕", "💗", "🩷", "💘", "🌹", "🩵"]

export function HeartsCascade() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 12,
      delay: Math.random() * 6,
      duration: Math.random() * 4 + 5,
      opacity: Math.random() * 0.5 + 0.3,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    }))
    setHearts(generated)

    const timer = setTimeout(() => setVisible(false), 12000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden transition-opacity duration-1000"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute animate-heart-fall"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            opacity: heart.opacity,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  )
}
