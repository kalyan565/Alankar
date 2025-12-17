'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="bg-gradient-to-r from-gray-800 to-black text-white py-20 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-red-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-red-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-red-600 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            className={`text-5xl md:text-6xl font-bold mb-6 text-white ${
              isVisible ? 'hero-text-reveal' : ''
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            Alankar Cosmetics
          </h1>
          <p 
            className={`text-xl md:text-2xl mb-8 text-gray-300 hero-glow hero-float ${
              isVisible ? 'hero-text-reveal' : ''
            }`}
            style={{ 
              animationDelay: '0.6s',
              color: '#e5e7eb',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)'
            }}
          >
            Your trusted local store in Guntur - Your Salon&apos;s Secret Weapon
          </p>
          <div 
            className={`flex gap-4 justify-center ${
              isVisible ? 'hero-text-reveal' : ''
            }`}
            style={{ animationDelay: '1s' }}
          >
            <Link
              href="/products"
              className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-red-500/50 hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Shop Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

