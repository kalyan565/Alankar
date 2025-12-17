'use client'

import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

interface CategoryCardProps {
  name: string
  description: string
  image: string
  count: number
  href: string
}

export default function CategoryCard({ name, description, image, count, href }: CategoryCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-gray-300 opacity-20">
              {name.charAt(0)}
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{name}</h3>
            <p className="text-sm text-gray-600">{count} products</p>
          </div>
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Shop Now
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          <div className="flex items-center text-black font-semibold group-hover:gap-2 transition-all">
            <span>Explore {name}</span>
            <FiArrowRight className="ml-1 group-hover:translate-x-1 group-hover:text-red-600 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}

