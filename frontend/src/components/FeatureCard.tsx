// components/FeatureCard.tsx
import { useState, useEffect, useRef } from "react"

interface FeatureCardProps {
  icon: string
  title: string
  desc: string
  delay?: number
}

export default function FeatureCard({ icon, title, desc, delay = 0 }: FeatureCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={cardRef}
      className={`group bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:bg-accent/30 transition"></div>
        <div className="relative text-6xl transform group-hover:scale-110 transition duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
      
      {/* Hover Effect Line */}
      <div className="w-0 group-hover:w-12 h-0.5 bg-accent mx-auto mt-6 transition-all duration-300"></div>
    </div>
  )
}