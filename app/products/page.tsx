'use client'

import { useState } from 'react'
import ProductGrid from '@/components/ProductGrid'
import { FiSearch } from 'react-icons/fi'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Our Products
      </h1>
      
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      <ProductGrid searchQuery={searchQuery} />
    </div>
  )
}

