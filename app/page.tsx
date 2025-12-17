'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import CategoryGrid from '@/components/CategoryGrid'
import ProductGrid from '@/components/ProductGrid'
import { FiSearch } from 'react-icons/fi'
import { products } from '@/data/products'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Check if search matches any category
  const getMatchingCategory = () => {
    const categories = Array.from(new Set(products.map(p => p.category)))
    const query = searchQuery.toLowerCase().trim()
    
    if (!query) return null
    
    // Normalize query (remove common plural endings)
    const normalizedQuery = query.replace(/s$/, '').trim()
    
    // Check for exact or partial category match
    const matchedCategory = categories.find(cat => {
      const catLower = cat.toLowerCase()
      const catSingular = catLower.replace(/s$/, '')
      
      return (
        catLower === query ||
        catLower.includes(query) ||
        query.includes(catLower) ||
        catSingular === normalizedQuery ||
        normalizedQuery.includes(catSingular) ||
        catSingular.includes(normalizedQuery)
      )
    })
    
    return matchedCategory
  }

  const matchedCategory = getMatchingCategory()
  const showProducts = searchQuery.trim() && matchedCategory

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          {showProducts ? `${matchedCategory} Products` : 'Shop by Category'}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {showProducts 
            ? `Showing all ${matchedCategory} products`
            : 'Explore our wide range of professional salon products'
          }
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-red-600">
              <FiSearch className="w-5 h-5 text-gray-400 group-focus-within:text-red-600 transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Search by category (e.g., Trimmer, Hair Color, Oils, Blades)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl bg-white shadow-sm text-lg transition-all duration-300 focus:outline-none focus:border-transparent focus:shadow-lg focus:shadow-red-100 focus:bg-gray-50 hover:border-gray-300 hover:shadow-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 hover:scale-110 transition-all duration-200 rounded-full p-1 hover:bg-red-50"
              >
                ✕
              </button>
            )}
            {/* Animated underline effect */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 transform scale-x-0 group-focus-within:scale-x-100 origin-center"></div>
          </div>
        </div>

        {showProducts ? (
          <ProductGrid category={matchedCategory} />
        ) : (
          <CategoryGrid />
        )}
      </div>
    </div>
  )
}

